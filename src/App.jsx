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

// ESTRUCTURACIÓN Y ENLAZADO EXACTO DE TU GALERÍA REAL DE CAPTURAS
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
    .filter(line => line && !line.startsWith("#") && !line.startsWith("![") && !line.startsWith("```"));
}

export default function App() {
  const [activeTab, setActiveKey] = useState("inicio");
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [zoomImg, setZoomImg] = useState(null);

  const currentModule = MODULES[activeTab];
  const markdownText = markdownFiles[activeTab] || "";
  const galleryList = currentModule.gallery;

  return (
    <div className="wiki-shell">
      {/* DISEÑO CENTRALIZADO MULTIPANEL */}
      <div className="workspace-layout">
        
        {/* PANEL IZQUIERDO: Índice Técnico con Símbolos de Linux */}
        <aside className="control-panel">
          <div className="sidebar-header">
            <span className="terminal-prompt">root@srv-wiki:~#</span>
            <div className="window-controls">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
          </div>
          <div className="sidebar-meta">
            <p className="admin-title">👤 ADMIN: <span className="text-emerald">molant</span></p>
            <p className="admin-sub">🐧 OS: Ubuntu 24.04 LTS</p>
          </div>
          <nav className="button-stack">
            {Object.entries(MODULES).map(([key, item]) => (
              <button
                key={`nav-${key}`}
                onClick={() => {
                  setActiveKey(key);
                  setSelectedImgIdx(0);
                }}
                className={`tab-link ${activeTab === key ? `active-${item.color}` : ""}`}
              >
                <span className="linux-icon">{item.icon}</span>
                <div className="tab-text-group">
                  <span className="tab-title-main">{item.title}</span>
                  <span className="tab-sub-badge">{item.badge}</span>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* PANEL CENTRAL: Contenido Académico Formal */}
        <section className="workspace-panel left-panel">
          <div className="panel-header-bar">
            <span className="file-path-indicator">📁 cat /var/log/docs_molant/{activeTab}_molant.md</span>
          </div>
          <div className="panel-scroll-body prose-container">
            <h2 className="main-doc-title">{currentModule.title}</h2>
            
            {/* VISTA TOTALMENTE INTERACTIVA PARA LA TABLA DE FACTIBILIDAD (MÓDULO 05) */}
            {activeTab === "paquetes" && (
              <div className="didactic-table-view animate-fade">
                <h3 className="doc-subtitle">📊 Matriz de Factibilidad Técnica</h3>
                <div className="comparison-grid">
                  <div className="metric-card selected">
                    <div className="card-badge success">MÉTRICA ÓPTIMA</div>
                    <h4 className="card-tool-title">📦 htop</h4>
                    <div className="progress-group">
                      <label>Peso en Disco (Muy Bajo ~150KB):</label>
                      <div className="progress-bar-bg"><div className="progress-bar-fill fill-emerald" style={{width: "25%"}}></div></div>
                    </div>
                    <p className="metric-stat"><strong>Dependencias:</strong> Ninguna (Stand-alone)</p>
                    <p className="metric-stat"><strong>Soporte:</strong> Repositorio Main (Total)</p>
                    <div className="factibility-tag high">ALTA FACTIBILIDAD (ELEGIDO)</div>
                  </div>
                  <div className="metric-card passive">
                    <div className="card-badge gray">MÉTRICA BASE</div>
                    <h4 className="card-tool-title">📦 top</h4>
                    <div className="progress-group">
                      <label>Peso en Disco (Preinstalado):</label>
                      <div className="progress-bar-bg"><div className="progress-bar-fill fill-slate" style={{width: "5%"}}></div></div>
                    </div>
                    <p className="metric-stat"><strong>Dependencias:</strong> Nativo del kernel</p>
                    <p className="metric-stat"><strong>Soporte:</strong> Nativo</p>
                    <div className="factibility-tag limited">ALTA PERO LIMITADO</div>
                  </div>
                </div>
              </div>
            )}

            {getCleanText(markdownText).map((line, idx) => {
              const cleaned = line.replaceAll("**", "").replaceAll("`", "").trim();
              if (line.startsWith("##")) {
                return <h3 key={`h2-${idx}`} className="doc-subtitle">{cleaned}</h3>;
              }
              if (line.startsWith("###")) {
                return <h4 key={`h3-${idx}`} className="doc-section-title">{cleaned}</h4>;
              }
              return <p key={`p-${idx}`} className="doc-paragraph">{cleaned}</p>;
            })}
          </div>
        </section>

        {/* PANEL DERECHO: Centro de Inspección de Capturas */}
        <section className="workspace-panel right-panel">
          <div className="panel-header-bar">
            <span className="file-path-indicator">📷 DISPLAY // INSPECTOR DE EVIDENCIAS</span>
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
                    <span className="photo-filename">💾 CLI_SNAPSHOT: {galleryList[selectedImgIdx].file}</span>
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
                    <div className="hover-zoom-overlay">Haz clic para expandir terminal (Fullscreen)</div>
                  </div>
                  
                  <div className="photo-caption-box">
                    <p className="photo-desc-text"><strong>Output de Consola:</strong> {galleryList[selectedImgIdx].desc}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-gallery-state">
                <div className="empty-icon">📂</div>
                <p className="empty-text">Módulo enfocado en análisis procedimental conceptual.</p>
                <span className="empty-subtext">No requiere registro gráfico complementario.</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* VISOR FLOTANTE GIGANTE (LIGHTBOX) */}
      {zoomImg && zoomImg.src && (
        <div className="lightbox-overlay" onClick={() => setZoomImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-top-bar">
              <span className="lightbox-title">Revisión CLI Remota: {zoomImg.file}</span>
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

      {/* PIE DE PÁGINA INSTITUCIONAL CORREGIDO */}
      <footer className="tech-footer">
        <p>© 2026 INACAP Valparaíso · Ingeniería en Informática · Administración de Sistemas Linux.</p>
      </footer>
    </div>
  );
}