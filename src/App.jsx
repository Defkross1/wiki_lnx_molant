import { createElement, useState } from "react";
import "./App.css";

// Importación directa de la documentación técnica real[cite: 1]
import intro from "./docs_molant/01_inicio_molant.md?raw";
import licenses from "./docs_molant/02_licencias_molant.md?raw";
import installation from "./docs_molant/03_instalacion_molant.md?raw";
import permissions from "./docs_molant/04_permisos_molant.md?raw";
import packages from "./docs_molant/05_paquetes_molant.md?raw";
import nginx from "./docs_molant/06_nginx_molant.md?raw";
import prompts from "./docs_molant/07_prompts_molant.md?raw";

const markdownFiles = {
  "inicio": intro,
  "licencias": licenses,
  "instalacion": installation,
  "permisos": permissions,
  "paquetes": packages,
  "nginx": nginx,
  "bitacora": prompts,
};

// Carga dinámica limpia de los recursos gráficos de tu carpeta local
const imageFiles = import.meta.glob(
  "./docs_molant/img_molant/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

const imageAssets = Object.entries(imageFiles).reduce((map, [path, src]) => {
  const basename = path.split("/").pop();
  if (basename) {
    map[basename] = src;
    const decoded = decodeURIComponent(basename);
    if (decoded !== basename) map[decoded] = src;
  }
  return map;
}, {});

// MAPEO Y DISTRIBUCIÓN DIRIGIDA DE TU GALERÍA REAL DE CAPTURAS
const MODULES = {
  inicio: { title: "01. Portada", badge: "SYS-INIT", icon: "🐧", color: "blue", gallery: [{ file: "Terminos  y condiciones.png", desc: "Aprovisionamiento de hardware y entorno de virtualización en VirtualBox." }] },
  licencias: { title: "02. Licencias", badge: "LEGAL", icon: "⚖️", color: "purple", gallery: [{ file: "02_licencias.png", desc: "Hardening conceptual sobre directivas Copyleft y GNU/GPL." }, { file: "licenses.png", desc: "Validación de cumplimiento de términos legales comerciales." }] },
  instalacion: { title: "03. Red e IP", badge: "NET-CONF", icon: "🖧", color: "emerald", gallery: [{ file: "Host name.png", desc: "Comando administrativo hostnamectl asignando el nodo srv-wiki." }, { file: "03_ip_a.png", desc: "Auditoría de direccionamiento IP sobre la interfaz NAT." }, { file: "apt_update.png", desc: "Sincronización core de llaves de seguridad y repositorios APT." }, { file: "sudo_apt_update_upgrade.png", desc: "Mantención global del árbol de paquetes del sistema." }] },
  permisos: { title: "04. Permisos", badge: "SECURITY", icon: "🔒", color: "amber", gallery: [{ file: "04_permisos.png", desc: "Manejo de masks octales chmod y reasignación chown." }, { file: "Ls_completo.png", desc: "Inspección de directivas con formato extendido ls -l." }, { file: "ls-l.png", desc: "Validación en bloque de bits de control local." }] },
  paquetes: { title: "05. APT Pack", badge: "PKG-MGMT", icon: "📦", color: "indigo", gallery: [{ file: "apt install.png", desc: "Despliegue e instalación limpia de htop por consola." }, { file: "apt_show_htop.png", desc: "Lectura y análisis de dependencias de htop mediante APT." }, { file: "05_apt.png", desc: "Consola en tiempo real de htop analizando carga y subprocesos." }] },
  nginx: { title: "06. Nginx Web", badge: "SERVER-HTTP", icon: "🌐", color: "cyan", gallery: [{ file: "06_sitio_en_linux.png", desc: "Validación del portal compilado y servido en el puerto 8080." }, { file: "install_nginx.png", desc: "Descarga e instalación del motor web nativo." }, { file: "install_nginx_status.png", desc: "Validación del estado active (running) del daemon web." }, { file: "Openssh_80tcp.png", desc: "Hardening de puertos HTTP mediante cortafuegos UFW." }] },
  bitacora: { title: "07. Bitácora", badge: "AI-PROMPT", icon: "🤖", color: "rose", gallery: [] }
};

function getCleanText(markdown) {
  return markdown.split("\n")
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#") && !line.startsWith("![") && !line.startsWith("```") && !line.startsWith("|"));
}

// COMPONENTE INTERACTIVO DIDÁCTICO DE TABLA DE FACTIBILIDAD (Reemplazo Total de la Foto)
function FactibilityTable() {
  const [hoveredRow, setHoveredRow] = useState(null);

  const data = [
    { name: "htop", weight: "Muy Bajo (~150KB)", deps: "Ninguna (Stand-alone)", support: "Repositorio Main (Total)", status: "Alta (Elegido)", chosen: true },
    { name: "top", weight: "Preinstalado", deps: "Nativo del kernel", support: "Nativo", status: "Alta pero limitado", chosen: false }
  ];

  return (
    <div className="factibility-interactive-container animate-fade">
      <div className="table-header-meta">
        <span className="table-terminal-prompt">admin@srv-wiki:~$ cat factibility_matrix.db</span>
        <p className="table-instruction-text">Pasa el cursor sobre las herramientas para analizar el diagnóstico de factibilidad tecnológica:</p>
      </div>

      <div className="table-responsive-wrapper">
        <table className="custom-interactive-table">
          <thead>
            <tr>
              <th>Herramienta</th>
              <th>Peso</th>
              <th>Dependencias</th>
              <th>Soporte Oficial</th>
              <th>Factibilidad</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr 
                key={idx}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`${row.chosen ? "row-chosen" : "row-standard"} ${hoveredRow === idx ? "row-hovered" : ""}`}
              >
                <td className="cell-bold-title">
                  <span className="bullet-indicator"></span> {row.name}
                </td>
                <td>
                  <div className="progress-cell-wrapper">
                    <span className="progress-value-label">{row.weight}</span>
                    <div className="progress-track-bg">
                      <div className={`progress-bar-fill ${row.chosen ? "fill-emerald" : "fill-slate"}`} style={{ width: row.chosen ? "35%" : "10%" }}></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-pill ${row.chosen ? "pill-emerald" : "pill-slate"}`}>{row.deps}</span>
                </td>
                <td>
                  <span className={`status-pill ${row.chosen ? "pill-blue" : "pill-slate"}`}>{row.support}</span>
                </td>
                <td>
                  <span className={`action-badge ${row.chosen ? "badge-success" : "badge-warning"}`}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderMarkdown(markdown, assetMap, docId, activeTab) {
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

    // Saltar el procesamiento plano de la tabla del Markdown viejo
    if (trimmed.startsWith("|")) {
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
      
      // Inyectar de manera exacta la tabla didáctica interactiva justo debajo del encabezado correspondiente
      if (activeTab === "paquetes" && trimmed.includes("Tabla de Factibilidad")) {
        blocks.push(<FactibilityTable key="interactive-factibility-table" />);
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
      return [boldChunk];
    });
  });
}

const docs = Object.entries(markdownFiles)
  .map(([key, content]) => {
    return {
      id: key,
      title: getTitle(content),
      summary: getSummary(content),
      content,
    };
  });

export default function App() {
  const [activeTab, setActiveKey] = useState("inicio");
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [zoomImg, setZoomImg] = useState(null);

  const currentModule = MODULES[activeTab];
  const selectedDoc = docs.find((doc) => doc.id === activeTab);
  const galleryList = currentModule.gallery;

  return (
    <div className="wiki-shell">
      {/* Cabecera Estilo Terminal Multipanel Linux */}
      <header className="tech-nav">
        <div className="nav-container">
          <div className="brand-group">
            <div className="pulse-indicator"></div>
            <div>
              <span className="sub-title">INACAP VALPARAÍSO // EVALUACIÓN DE COMPETENCIAS</span>
              <h2>ESTACIÓN DE CONTROL — AUDITORÍA DE INFRAESTRUCTURA</h2>
            </div>
          </div>
          <div className="sysadmin-card">
            <span className="user-tag">SYSADMIN: molant</span>
            <span className="status-tag">STATUS: OPERATIVO</span>
          </div>
        </div>
      </header>

      {/* TABS SUPERIORES DE SELECCIÓN DIDÁCTICA */}
      <div className="tabs-container">
        {Object.entries(MODULES).map(([key, item]) => (
          <button
            key={`tab-${key}`}
            onClick={() => {
              setActiveKey(key);
              setSelectedImgIdx(0);
            }}
            className={`tab-link tab border-${item.color} ${activeTab === key ? `active-${item.color}` : ""}`}
          >
            <span className="linux-icon">{item.icon}</span>
            <div className="tab-text-group">
              <span className="tab-title-text">{item.title}</span>
              <span className={`tab-badge bg-${item.color}`}>{item.badge}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ÁREA DE TRABAJO SPLIT-SCREEN */}
      <div className="workspace-layout">
        
        {/* PANEL IZQUIERDO: Contenido Escrito Formal (Lectura Optimizada de Alto Contraste) */}
        <section className="workspace-panel left-panel">
          <div className="panel-header-bar">
            <span className="file-path-indicator">📄 src/docs_molant/{activeTab}_molant.md</span>
          </div>
          <div className="panel-scroll-body prose-container">
            {selectedDoc ? renderMarkdown(selectedDoc.content, imageAssets, selectedDoc.id, activeTab) : null}
          </div>
        </section>

        {/* PANEL DERECHO: Visor de Capturas de Pantalla con Zoom */}
        <section className="workspace-panel right-panel">
          <div className="panel-header-bar">
            <span className="file-path-indicator">📷 ESTACIÓN DE INSPECCIÓN DE CAPTURAS</span>
          </div>
          
          <div className="panel-scroll-body flex-gallery-container">
            {galleryList.length > 0 ? (
              <div className="interactive-gallery-wrapper">
                {galleryList.length > 1 && (
                  <div className="image-selector-strip">
                    {galleryList.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImgIdx(idx)}
                        className={`selector-btn ${selectedImgIdx === idx ? "selected" : ""}`}
                      >
                        Terminal {idx + 1}
                      </button>
                    ))}
                  </div>
                )}

                <div className="active-photo-display-card">
                  <div className="photo-info-top">
                    <span className="photo-filename">📌 SNAPSHOT_CLI: {galleryList[selectedImgIdx].file}</span>
                  </div>
                  
                  <div 
                    className="photo-frame"
                    onClick={() => {
                      const activeFile = galleryList[selectedImgIdx].file;
                      setZoomImg({ src: imageAssets[activeFile], file: activeFile, desc: galleryList[selectedImgIdx].desc });
                    }}
                  >
                    {imageAssets[galleryList[selectedImgIdx].file] ? (
                      <img 
                        src={imageAssets[galleryList[selectedImgIdx].file]} 
                        alt="Evidencia" 
                        className="large-workspace-img"
                      />
                    ) : (
                      <div className="error-placeholder">
                        <p>⚠️ Archivo ausente en /img_molant:</p>
                        <code>{galleryList[selectedImgIdx].file}</code>
                      </div>
                    )}
                    <div className="hover-zoom-overlay">Haz clic sobre la terminal para pantalla completa</div>
                  </div>
                  
                  <div className="photo-caption-box">
                    <p className="photo-desc-text"><strong>Output de Consola:</strong> {galleryList[selectedImgIdx].desc}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-gallery-state">
                <div className="empty-icon">📂</div>
                <p className="empty-text">Hito enfocado en análisis procedimental conceptual.</p>
                <span className="empty-subtext">No requiere registro gráfico de verificación.</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* MODAL INTERACTIVO DE PANTALLA COMPLETA */}
      {zoomImg && zoomImg.src && (
        <div className="lightbox-overlay" onClick={() => setZoomImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-top-bar">
              <span className="lightbox-title">Revisión Remota CLI: {zoomImg.file}</span>
              <button className="close-btn" onClick={() => setZoomImg(null)}>✖ Cerrar</button>
            </div>
            <div className="lightbox-image-container">
              <img src={zoomImg.src} alt="Evidencia Ampliada" className="lightbox-scaled-image" />
            </div>
            <div className="lightbox-footer">
              <p>{zoomImg.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* PIE DE PÁGINA INSTITUCIONAL */}
      <footer className="tech-footer">
        <p>© 2026 INACAP Valparaíso · Ingeniería en Informática · Administración de Sistemas Linux.</p>
      </footer>
    </div>
  );
}