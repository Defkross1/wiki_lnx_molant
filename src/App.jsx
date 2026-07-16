import { createElement, useState } from "react";
import "./App.css";

// Importación cruda de los archivos Markdown locales corporativos
import intro from "./docs_molant/01_inicio_molant.md?raw";
import licenses from "./docs_molant/02_licencias_molant.md?raw";
import installation from "./docs_molant/03_instalacion_molant.md?raw";
import permissions from "./docs_molant/04_permisos_molant.md?raw";
import packages from "./docs_molant/05_paquetes_molant.md?raw";
import nginx from "./docs_molant/06_nginx_molant.md?raw";
import prompts from "./docs_molant/07_prompts_molant.md?raw";

const markdownFiles = {
  "./docs_molant/01_inicio_molant.md": intro,
  "./docs_molant/02_licencias_molant.md": licenses,
  "./docs_molant/03_instalacion_molant.md": installation,
  "./docs_molant/04_permisos_molant.md": permissions,
  "./docs_molant/05_paquetes_molant.md": packages,
  "./docs_molant/06_nginx_molant.md": nginx,
  "./docs_molant/07_prompts_molant.md": prompts,
};

// Carga e indexación dinámica de la galería real en img_molant/
const imageFiles = import.meta.glob(
  "./docs_molant/img_molant/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
);

const imageAssets = Object.entries(imageFiles).reduce((map, [path, src]) => {
  const basename = path.split("/").pop();
  if (basename) {
    map[basename] = src;
    const decoded = decodeURIComponent(basename);
    if (decoded !== basename) {
      map[decoded] = src;
    }
  }
  return map;
}, {});

function getTitle(markdown) {
  const lines = markdown.split("\n");
  const firstLine = lines.find((line) => line.trim().startsWith("# "));
  return firstLine ? firstLine.trim().slice(2).trim() : "Módulo de Laboratorio";
}

function getSummary(markdown) {
  const blocks = markdown
    .split("\n")
    .map((block) => block.trim())
    .filter(
      (block) =>
        block && !block.startsWith("#") && !block.startsWith("![") && !block.startsWith("```"),
    );

  const firstParagraph = blocks.find((block) => !block.startsWith("-") && !block.startsWith("*"));
  if (!firstParagraph) return "Documentación técnica del sistema.";
  
  return firstParagraph.replaceAll(/[*_`#]/g, "").slice(0, 80) + "...";
}

function resolveAssetPath(url, assetMap) {
  const trimmed = (url || "").trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("data:") || trimmed.startsWith("/")) {
    return trimmed;
  }

  const decoded = decodeURIComponent(trimmed).replaceAll("\\", "/");
  const basename = decoded.split("/").pop() || decoded;
  
  const candidates = [
    basename,
    basename.replaceAll("%20", " "),
  ];

  for (const candidate of candidates) {
    if (assetMap[candidate]) return assetMap[candidate];
  }
  return encodeURI(decoded);
}

// Parseo lineal seguro sin expresiones regulares anidadas (Cero SonarQube Backtracking)
function renderInline(text, assetMap, textKey) {
  if (!text) return [];

  const codeParts = text.split("`");
  return codeParts.flatMap((codeChunk, codeIdx) => {
    if (codeIdx % 2 !== 0) {
      return [<code key={`code-${textKey}-${codeIdx}`}>{codeChunk}</code>];
    }

    const boldParts = codeChunk.split("**");
    return boldParts.flatMap((boldChunk, boldIdx) => {
      if (boldIdx % 2 !== 0) {
        return [<strong key={`bold-${textKey}-${codeIdx}-${boldIdx}`}>{boldChunk}</strong>];
      }

      const finalParts = [];
      let remainder = boldChunk;
      let loopGuard = 0;

      while (remainder.includes("[") && remainder.includes(")") && loopGuard < 30) {
        loopGuard++;
        const openBracket = remainder.indexOf("[");
        const closeBracket = remainder.indexOf("]");
        const openParen = remainder.indexOf("(");
        const closeParen = remainder.indexOf(")");

        if (closeBracket > openBracket && openParen === closeBracket + 1 && closeParen > openParen) {
          if (openBracket > 0) {
            const isImg = openBracket > 0 && remainder[openBracket - 1] === "!";
            const textBefore = isImg ? remainder.slice(0, openBracket - 1) : remainder.slice(0, openBracket);
            if (textBefore) finalParts.push(textBefore);
          }

          const label = remainder.slice(openBracket + 1, closeBracket);
          const linkPath = remainder.slice(openParen + 1, closeParen);
          const src = resolveAssetPath(linkPath, assetMap);
          const currentKey = `${textKey}-${loopGuard}`;

          if (openBracket > 0 && remainder[openBracket - 1] === "!") {
            finalParts.push(
              <img key={`img-in-${currentKey}`} src={src} alt={label || "evidencia"} className="inline-image" />
            );
          } else {
            finalParts.push(
              <a key={`link-in-${currentKey}`} href={src} target="_blank" rel="noreferrer" className="article-link">
                {label}
              </a>
            );
          }
          remainder = remainder.slice(closeParen + 1);
        } else {
          break;
        }
      }

      if (remainder) finalParts.push(remainder);
      return finalParts;
    });
  });
}

function renderMarkdown(markdown, assetMap, docId) {
  const blocks = [];
  const lines = markdown.split(/\r?\n/);
  let paragraphLines = [];
  let listItems = [];
  let inCodeBlock = false;
  let codeLines = [];

  const flushParagraph = (lineId) => {
    if (paragraphLines.length) {
      const contentText = paragraphLines.join(" ").trim();
      blocks.push(
        <p key={`p-${docId}-${lineId}`} className="article-paragraph">
          {renderInline(contentText, assetMap, `${docId}-${lineId}`)}
        </p>,
      );
      paragraphLines = [];
    }
  };

  const flushList = (lineId) => {
    if (listItems.length) {
      blocks.push(
        <ul key={`ul-${docId}-${lineId}`} className="article-list">
          {listItems}
        </ul>,
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        blocks.push(
          <pre key={`codeblock-${docId}-${index}`}>
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
      } else {
        flushParagraph(index);
        flushList(index);
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (!trimmed) {
      flushParagraph(index);
      flushList(index);
      return;
    }

    if (trimmed.startsWith("#")) {
      flushParagraph(index);
      flushList(index);
      
      let level = 1;
      if (trimmed.startsWith("### ")) level = 3;
      else if (trimmed.startsWith("## ")) level = 2;
      
      const content = trimmed.replace(/^#+\s+/, "");
      const headingTag = `h${Math.min(level + 1, 3)}`;
      
      blocks.push(
        createElement(
          headingTag,
          { key: `h-${docId}-${index}` },
          renderInline(content, assetMap, `${docId}-${index}`),
        ),
      );
      return;
    }

    if (trimmed.startsWith("![") && trimmed.endsWith(")")) {
      flushParagraph(index);
      flushList(index);
      const openBracket = trimmed.indexOf("[");
      const closeBracket = trimmed.indexOf("]");
      const openParenthesis = trimmed.indexOf("(");
      const closeParenthesis = trimmed.indexOf(")");
      
      if (openBracket !== -1 && closeBracket > openBracket && openParenthesis > closeBracket) {
        const altText = trimmed.slice(openBracket + 1, closeBracket);
        const imagePath = trimmed.slice(openParenthesis + 1, closeParenthesis);
        const src = resolveAssetPath(imagePath, assetMap);
        blocks.push(
          <img
            key={`img-block-${docId}-${index}`}
            src={src}
            alt={altText || "evidencia"}
            className="article-image"
          />,
        );
      }
      return;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph(index);
      const content = trimmed.slice(2);
      listItems.push(
        <li key={`li-${docId}-${index}`}>
          {renderInline(content, assetMap, `${docId}-${index}`)}
        </li>,
      );
      return;
    }

    paragraphLines.push(trimmed);
  });

  flushParagraph(lines.length);
  flushList(lines.length);

  return blocks;
}

const docs = Object.entries(markdownFiles)
  .map(([path, content]) => {
    const docId = path.split("/").pop()?.replace(/\.md$/, "") ?? "doc";
    return {
      id: docId,
      title: getTitle(content),
      summary: getSummary(content),
      content,
      path,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

export default function App() {
  const initialDocId = docs[0]?.id ?? "";
  const [activeDoc, setActiveDoc] = useState(initialDocId);
  const selectedDoc = docs.find((doc) => doc.id === activeDoc) ?? docs[0];

  return (
    <div className="wiki-shell">
      {/* Navbar con Colores Corporativos Vivos */}
      <header className="hero-panel">
        <div className="hero-content-wrapper">
          <span className="eyebrow">Área de Informática y Telecomunicaciones</span>
          <h1>e-Portafolio: Administración Linux Server</h1>
          <p className="hero-text">
            Portal interactivo de evidencias para la Unidad 3 de Sistemas Operativos. Documentación técnica de hardening, direccionamiento IP y despliegue de servicios.
          </p>
          <div className="hero-meta-strip">
            <div className="meta-badge student">
              <span className="badge-dot"></span> Administrador: Molina Antolin (molant)
            </div>
            <div className="meta-badge version">
              Entorno: Ubuntu Server 24.04 LTS
            </div>
          </div>
        </div>
      </header>

      {/* Grid del Dashboard */}
      <div className="content-grid">
        
        {/* Panel del Índice Didáctico Lateral */}
        <aside className="sidebar">
          <h2>Módulos Técnicos</h2>
          <p>Navega a través de los hitos evaluados por el profesor Rubén Schnettler.</p>
          <nav>
            {docs.map((doc) => (
              <button
                key={`nav-btn-${doc.id}`}
                type="button"
                className={`sidebar-link ${doc.id === selectedDoc?.id ? "active" : ""}`}
                onClick={() => setActiveDoc(doc.id)}
              >
                <strong>{doc.title}</strong>
                <span>{doc.summary}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Visualizador de Documentación Central */}
        <section className="article-card">
          <div className="article-header">
            <span className="article-kicker">Reporte Operativo Conforme</span>
            <h2>{selectedDoc?.title}</h2>
          </div>
          <div className="article-body">
            {selectedDoc ? renderMarkdown(selectedDoc.content, imageAssets, selectedDoc.id) : null}
          </div>
        </section>
      </div>
    </div>
  );
}