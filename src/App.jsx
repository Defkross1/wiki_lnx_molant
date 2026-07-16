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

// Carga dinámica y limpia de los recursos gráficos de tu carpeta local[cite: 2]
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

// MAPEO EXCLUSIVO Y DIRIGIDO DE TU GALERÍA REAL DE CAPTURAS
const MODULES = {
  inicio: {
    title: "01. Portada",
    badge: "TOPOLOGÍA",
    color: "blue",
    gallery: [
      { file: "Terminos  y condiciones.png", desc: "Aprovisionamiento de hardware y configuración del entorno base en Oracle VirtualBox." }
    ]
  },
  licencias: {
    title: "02. Licencias",
    badge: "SOFTWARE LIBRE",
    color: "purple",
    gallery: [
      { file: "02_licencias.png", desc: "Hardening conceptual sobre directivas Copyleft y GNU/GPL." },
      { file: "licenses.png", desc: "Validación de cumplimiento de términos legales comerciales." }
    ]
  },
  instalacion: {
    title: "03. Red e IP",
    badge: "CONFIG CLI",
    color: "emerald",
    gallery: [
      { file: "Host name.png", desc: "Comando administrativo hostnamectl asignando el nodo srv-wiki." },
      { file: "03_ip_a.png", desc: "Auditoría de direccionamiento IP sobre la interfaz NAT." },
      { file: "apt_update.png", desc: "Sincronización core de llaves de seguridad y repositorios APT." },
      { file: "sudo_apt_update_upgrade.png", desc: "Mantención global del árbol de paquetes del sistema." }
    ]
  },
  permisos: {
    title: "04. Permisos",
    badge: "SEGURIDAD",
    color: "amber",
    gallery: [
      { file: "04_permisos.png", desc: "Manejo de máscaras octales chmod y reasignación chown." },
      { file: "Ls_completo.png", desc: "Inspección de directivas extendidas del sistema de archivos." },
      { file: "ls-l.png", desc: "Validación en bloque de bits de control local." }
    ]
  },
  paquetes: {
    title: "05. APT Pack",
    badge: "FACTIBILIDAD",
    color: "indigo",
    gallery: [
      { file: "apt install.png", desc: "Despliegue e instalación limpia de htop por consola." },
      { file: "apt_show_htop.png", desc: "Lectura y análisis de dependencias de htop mediante APT." },
      { file: "05_apt.png", desc: "Consola en tiempo real de htop analizando carga y subprocesos." }
    ]
  },
  nginx: {
    title: "06. Nginx Web",
    badge: "HTTP GLOBAL",
    color: "cyan",
    gallery: [
      { file: "06_sitio_en_linux.png", desc: "Validación del portal compilado y servido en el puerto 8080." },
      { file: "install_nginx.png", desc: "Descarga e instalación del motor web nativo." },
      { file: "install_nginx_status.png", desc: "Validación del estado active (running) del daemon web." },
      { file: "Openssh_80tcp.png", desc: "Hardening de puertos HTTP mediante cortafuegos UFW." }
    ]
  },
  bitacora: {
    title: "07. Bitácora",
    badge: "PROMPTS IA",
    color: "rose",
    gallery: []
  }
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
      {/* Cabecera Estilo Panel Corporativo */}
      <header className="tech-nav">
        <div className="nav-container">
          <div className="brand-group">
            <div className="pulse-indicator"></div>
            <div>
              <span className="sub-title">INACAP VALPARAÍSO // TI3V35</span>
              <h2>WIKI CONSOLE — ADMINISTRACIÓN LINUX SERVER</h2>
            </div>
          </div>
          <div className="sysadmin-card">
            <span className="user-tag">SYSADMIN: molant</span>
            <span className="status-tag">STATUS: OPERATIVO</span>
          </div>
        </div>
      </header>

      {/* TABS SUPERIORES DE SELECCIÓN DIDÁCTICA (Cambio radical de layout) */}
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

      {/* ÁREA DE TRABAJO EN FORMATO SPLIT-SCREEN COMPUESTO */}
      <div className="workspace-layout">
        
        {/* PANEL IZQUIERDO: Contenido Académico */}
        <section className="workspace-panel left-panel">
          <div className="panel-header-bar">
            <span className="file-path-indicator">📄 src/docs_molant/{activeTab}_molant.md</span>
          </div>
          <div className="panel-scroll-body prose-container">
            <h2 className="main-doc-title">{currentModule.title}</h2>
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

        {/* PANEL DERECHO: Centro Interactivo de Evidencias Gráficas */}
        <section className="workspace-panel right-panel">
          <div className="panel-header-bar">
            <span className="file-path-indicator">📷 ESTACIÓN DE INSPECCIÓN DE CAPTURAS</span>
          </div>
          
          <div className="panel-scroll-body flex-gallery-container">
            {galleryList.length > 0 ? (
              <div className="interactive-gallery-wrapper">
                {/* Selector Didáctico de Imágenes */}
                {galleryList.length > 1 && (
                  <div className="image-selector-strip">
                    {galleryList.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImgIdx(idx)}
                        className={`selector-btn ${selectedImgIdx === idx ? "selected" : ""}`}
                      >
                        Captura {idx + 1}
                      </button>
                    ))}
                  </div>
                )}

                {/* Contenedor Grande de la Imagen Seleccionada */}
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
                        alt="Evidencia" 
                        className="large-workspace-img"
                      />
                    ) : (
                      <div className="error-placeholder">
                        <p>⚠️ Archivo ausente en disco:</p>
                        <code>{galleryList[selectedImgIdx].file}</code>
                      </div>
                    )}
                    <div className="hover-zoom-overlay">Haz clic sobre la terminal para expandir vista</div>
                  </div>
                  
                  <div className="photo-caption-box">
                    <p className="photo-desc-text"><strong>Descripción Operativa:</strong> {galleryList[selectedImgIdx].desc}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-gallery-state">
                <div className="empty-icon">📁</div>
                <p className="empty-text">Este hito transversal está centrado en análisis procedimental.</p>
                <span className="empty-subtext">No requiere la carga de recursos gráficos de verificación.</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* MODAL INTERACTIVO DE ZOOM FLOTANTE (LIGHTBOX) */}
      {zoomImg && zoomImg.src && (
        <div className="lightbox-overlay" onClick={() => setZoomImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-top-bar">
              <span className="lightbox-title">Auditoría CLI: {zoomImg.file}</span>
              <button className="close-btn" onClick={() => setZoomImg(null)}>✖ Cerrar</button>
            </div>
            <div className="lightbox-image-container">
              <img src={zoomImg.src} alt="Evidencia ampliada" className="lightbox-scaled-image" />
            </div>
            <div className="lightbox-footer">
              <p>{zoomImg.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="tech-footer">
        <p>© 2026 INACAP Valparaíso · Escuela de Informática y Telecomunicaciones · Administración de Sistemas Linux.</p>
      </footer>
    </div>
  );
}