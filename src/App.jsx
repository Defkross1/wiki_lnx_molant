import { createElement, useState } from "react";
import "./App.css";

// Importación directa de la documentación técnica real
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
  inicio: { title: "01. Portada", badge: "TOPOLOGÍA", color: "blue", gallery: [{ file: "Terminos  y condiciones.png", desc: "Aprovisionamiento de hardware y entorno de virtualización en VirtualBox." }] },
  licencias: { title: "02. Licencias", badge: "SOFTWARE LIBRE", color: "purple", gallery: [{ file: "02_licencias.png", desc: "Hardening conceptual sobre directivas Copyleft y GNU/GPL." }, { file: "licenses.png", desc: "Validación de cumplimiento de términos legales comerciales." }] },
  instalacion: { title: "03. Red e IP", badge: "CONFIG CLI", color: "emerald", gallery: [{ file: "Host name.png", desc: "Comando administrativo hostnamectl asignando el nodo srv-wiki." }, { file: "03_ip_a.png", desc: "Auditoría de direccionamiento IP sobre la interfaz NAT." }, { file: "apt_update.png", desc: "Sincronización core de llaves de seguridad y repositorios APT." }, { file: "sudo_apt_update_upgrade.png", desc: "Mantención global del árbol de paquetes del sistema." }] },
  permisos: { title: "04. Permisos", badge: "SEGURIDAD", color: "amber", gallery: [{ file: "04_permisos.png", desc: "Manejo de masks octales chmod y reasignación chown." }, { file: "Ls_completo.png", desc: "Inspección de directivas con formato extendido ls -l." }, { file: "ls-l.png", desc: "Validación en bloque de bits de control local." }] },
  paquetes: { title: "05. APT Pack", badge: "FACTIBILIDAD", color: "indigo", gallery: [{ file: "apt install.png", desc: "Despliegue e instalación limpia de htop por consola." }, { file: "apt_show_htop.png", desc: "Lectura y análisis de dependencias de htop mediante APT." }, { file: "05_apt.png", desc: "Consola en tiempo real de htop analizando carga y subprocesos." }] },
  nginx: { title: "06. Nginx Web", badge: "HTTP GLOBAL", color: "cyan", gallery: [{ file: "06_sitio_en_linux.png", desc: "Validación del portal compilado y servido en el puerto 8080." }, { file: "install_nginx.png", desc: "Descarga e instalación del motor web nativo." }, { file: "install_nginx_status.png", desc: "Validación del estado active (running) del daemon web." }, { file: "Openssh_80tcp.png", desc: "Hardening de puertos HTTP mediante cortafuegos UFW." }] },
  bitacora: { title: "07. Bitácora", badge: "PROMPTS IA", color: "rose", gallery: [] }
};

// Renderizador Didáctico de Celdas de Tabla con Barras de Progreso e insignias
function renderTableCell(text, colIdx) {
  const cleaned = text.replaceAll("**", "").replaceAll("`", "").trim();
  
  // Columna Factibilidad: Insignias de Colores Vivos
  if (colIdx === 4) {
    if (cleaned.includes("Alta (Elegido)")) {
      return <span className="table-badge-status status-success">Alta (Elegido)</span>;
    }
    if (cleaned.includes("Alta pero limitado")) {
      return <span className="table-badge-status status-warning">Alta pero limitado</span>;
    }
    return <span className="table-badge-status status-info">{cleaned}</span>;
  }

  // Columna Peso: Barra de Progreso Gráfica
  if (colIdx === 1) {
    const isHtop = cleaned.includes("~150KB");
    return (
      <div className="table-progress-container">
        <span className="table-progress-text">{cleaned}</span>
        <div className="table-progress-bar-bg">
          <div className={`table-progress-bar-fill ${isHtop ? "bg-emerald" : "bg-slate"}`} style={{ width: isHtop ? "35%" : "12%" }}></div>
        </div>
      </div>
    );
  }

  // Columna Dependencias y Soporte: Insignias de Texto
  if (colIdx === 2 || colIdx === 3) {
    const isMain = cleaned.includes("Main") || cleaned.includes("Ninguna");
    return <span className={`table-text-tag ${isMain ? "tag-accent" : "tag-muted"}`}>{cleaned}</span>;
  }

  return <strong>{cleaned}</strong>;
}

function renderMarkdown(markdown, assetMap, docId) {
  const blocks = [];
  const lines = markdown.split(/\r?\n/);
  let paragraphLines = [];
  let listItems = [];
  let inCodeBlock = false;
  let codeLines = [];
  let tableRows = [];

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

  const flushTable = (lineId) => {
    if (tableRows.length) {
      blocks.push(
        <div key={`table-wrapper-${docId}-${lineId}`} className="didactic-table-container">
          <table className="didactic-table">
            <thead>
              <tr>
                {tableRows[0].map((cell, idx) => (
                  <th key={`th-${idx}`}>{cell.replaceAll("**", "").trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, rowIdx) => (
                <tr key={`tr-${rowIdx}`}>
                  {row.map((cell, colIdx) => (
                    <td key={`td-${colIdx}`}>{renderTableCell(cell, colIdx)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Procesamiento de Bloques de Código de Consola
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

    // Procesamiento y Estructuración de Tablas Markdown Didácticas
    if (trimmed.startsWith("|")) {
      flushParagraph(index);
      flushList(index);
      
      // Ignorar líneas divisorias del Markdown como |--|--|
      if (!trimmed.includes("---")) {
        const cells = trimmed.split("|").map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
        tableRows.push(cells);
      }
      return;
    } else {
      flushTable(index);
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
  flushTable(lines.length);

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
      {/* Cabecera Estilo Consola */}
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
            <span className={`tab-badge bg-${item.color}`}>{item.badge}</span>
            <span className="tab-title-text">{item.title}</span>
          </button>
        ))}
      </div>

      {/* ÁREA DE TRABAJO SPLIT-SCREEN */}
      <div className="workspace-layout">
        
        {/* PANEL IZQUIERDO: Contenido Escrito */}
        <section className="workspace-panel left-panel">
          <div className="panel-header-bar">
            <span className="file-path-indicator">📄 src/docs_molant/{activeTab}_molant.md</span>
          </div>
          <div className="panel-scroll-body prose-container">
            {selectedDoc ? renderMarkdown(selectedDoc.content, imageAssets, selectedDoc.id) : null}
          </div>
        </section>

        {/* PANEL DERECHO: Visor de Capturas */}
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
                        Evidencia {idx + 1}
                      </button>
                    ))}
                  </div>
                )}

                <div className="active-photo-display-card">
                  <div className="photo-info-top">
                    <span className="photo-filename">📌 Archivo: {galleryList[selectedImgIdx].file}</span>
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
                        alt="Evidencia de Consola" 
                        className="large-workspace-img"
                      />
                    ) : (
                      <div className="error-placeholder">
                        <p>⚠️ Archivo ausente en /img_molant:</p>
                        <code>{galleryList[selectedImgIdx].file}</code>
                      </div>
                    )}
                    <div className="hover-zoom-overlay">Haz clic para expandir terminal</div>
                  </div>
                  
                  <div className="photo-caption-box">
                    <p className="photo-desc-text"><strong>Descripción Operativa:</strong> {galleryList[selectedImgIdx].desc}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-gallery-state">
                <div className="empty-icon">📁</div>
                <p className="empty-text">Hito enfocado en análisis conceptual.</p>
                <span className="empty-subtext">No requiere captura de verificación.</span>
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
              <span className="lightbox-title">Revisión CLI: {zoomImg.file}</span>
              <button className="close-btn" onClick={() => setZoomImg(null)}>✖ Cerrar</button>
            </div>
            <div className="lightbox-image-container">
              <img src={zoomImg.src} alt="Evidencia" className="lightbox-scaled-image" />
            </div>
            <div className="lightbox-footer">
              <p>{zoomImg.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* PIE DE PÁGINA CORREGIDO: Solución a tu requerimiento exacto */}
      <footer className="tech-footer">
        <p>© 2026 INACAP Valparaíso · Ingeniería en Informática · Administración de Sistemas Linux.</p>
      </footer>
    </div>
  );
}