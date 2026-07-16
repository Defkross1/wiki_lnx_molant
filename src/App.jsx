import { useState } from "react";
import "./App.css";

// Importación directa de la documentación técnica real de tu laboratorio
import intro from "./docs_molant/01_inicio_molant.md?raw";
import licenses from "./docs_molant/02_licencias_molant.md?raw";
import installation from "./docs_molant/03_instalacion_molant.md?raw";
import permissions from "./docs_molant/04_permisos_molant.md?raw";
import packages from "./docs_molant/05_paquetes_molant.md?raw";
import nginx from "./docs_molant/06_nginx_molant.md?raw";
import prompts from "./docs_molant/07_prompts_molant.md?raw";

// Descubrimiento dinámico de los recursos gráficos de tu carpeta local
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
  inicio: {
    title: "01. Portada y Topología",
    badge: "INFRAESTRUCTURA",
    color: "blue",
    rawContent: intro,
    gallery: [
      { file: "Terminos  y condiciones.png", desc: "Verificación de la carga inicial del entorno virtualizado en VirtualBox." }
    ]
  },
  licencias: {
    title: "02. Licenciamiento y Software Libre",
    badge: "AUDITORÍA",
    color: "purple",
    rawContent: licenses,
    gallery: [
      { file: "02_licencias.png", desc: "Análisis y lectura de las directivas de licenciamiento GNU/GPL." },
      { file: "licenses.png", desc: "Validación de los términos legales de uso comercial del servidor." }
    ]
  },
  instalacion: {
    title: "03. Configuración de Red e IP",
    badge: "HARDENING",
    color: "emerald",
    rawContent: installation,
    gallery: [
      { file: "Host name.png", desc: "Comando sudo hostnamectl aplicado para definir el nodo srv-wiki." },
      { file: "03_ip_a.png", desc: "Salida del comando 'ip a' auditando la interfaz de red direccionada por NAT." },
      { file: "apt_update.png", desc: "Ejecución de sincronización de repositorios de seguridad APT." },
      { file: "sudo_apt_update_upgrade.png", desc: "Actualización global de paquetes críticos del sistema operativo." }
    ]
  },
  permisos: {
    title: "04. Control de Accesos y Permisos",
    badge: "SEGURIDAD LOCAL",
    color: "amber",
    rawContent: permissions,
    gallery: [
      { file: "04_permisos.png", desc: "Auditoría de máscaras chmod octales y asignación de propietarios con chown." },
      { file: "Ls_completo.png", desc: "Estructura completa del listado de directorios con atributos de seguridad de usuario." },
      { file: "ls-l.png", desc: "Verificación en consola de bits de lectura, escritura y ejecución por bloque." }
    ]
  },
  paquetes: {
    title: "05. Gestión de Paquetes (APT)",
    badge: "MONITORIZACIÓN",
    color: "indigo",
    rawContent: packages,
    gallery: [
      { file: "apt install.png", desc: "Instalación automatizada de la herramienta de diagnóstico htop." },
      { file: "apt_show_htop.png", desc: "Inspección de metadatos, peso y árbol de dependencias antes del despliegue." },
      { file: "05_apt.png", desc: "Consola de htop activa verificando el uso de CPU y memoria de los hilos de Linux." },
      { file: "apt_show_htop.png", desc: "Validación del origen del paquete en los repositorios oficiales de Ubuntu." }
    ]
  },
  nginx: {
    title: "06. Motor Web Nginx",
    badge: "PRODUCCIÓN HTTP",
    color: "cyan",
    rawContent: nginx,
    gallery: [
      { file: "06_sitio_en_linux.png", desc: "Resultado del despliegue estático servido de forma nativa en el puerto 8080." },
      { file: "install_nginx.png", desc: "Aprovisionamiento del paquete oficial de nginx mediante el gestor core." },
      { file: "install_nginx_status.png", desc: "Comando systemctl status nginx ratificando el estado active (running)." },
      { file: "Openssh_80tcp.png", desc: "Apertura y mapeo del socket TCP en el Firewall para el tráfico web entrante." }
    ]
  },
  bitacora: {
    title: "07. Bitácora de Prompts e IA",
    badge: "RESOLUCIÓN",
    color: "rose",
    rawContent: prompts,
    gallery: []
  }
};

export default function App() {
  const [activeKey, setActiveKey] = useState("inicio");
  const [zoomImg, setZoomImg] = useState(null);

  const currentModule = MODULES[activeKey];

  // Limpiador básico para simular el renderizado de texto del Markdown sin Regex anidadas
  const cleanLine = (line) => {
    if (line.startsWith("#")) return "";
    if (line.startsWith("![")) return "";
    return line.replaceAll("**", "").replaceAll("`", "").trim();
  };

  return (
    <div className="wiki-shell">
      {/* Header Estilo Consola de Control de Red */}
      <header className="tech-nav">
        <div className="nav-container">
          <div className="brand-group">
            <div className="pulse-indicator"></div>
            <div>
              <span className="sub-title">INACAP VALPARAÍSO · TI3V35</span>
              <h2>CONSOLE MONITOR // INFRAESTRUCTURA LINUX</h2>
            </div>
          </div>
          <div className="sysadmin-card">
            <span className="user-tag">SYSADMIN: molant</span>
            <span className="status-tag">STATUS: ONLINE</span>
          </div>
        </div>
      </header>

      {/* Layout de Dos Columnas Dinámicas */}
      <div className="dashboard-grid">
        
        {/* Barra Lateral Interactiva (Botones de Control) */}
        <aside className="control-panel">
          <h3 className="panel-title">Módulos de Auditoría</h3>
          <div className="button-stack">
            {Object.entries(MODULES).map(([key, item]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveKey(key);
                }}
                className={`tab-trigger ${activeKey === key ? `active-${item.color}` : ""}`}
              >
                <div className="trigger-header">
                  <span className={`badge bg-${item.color}`}>{item.badge}</span>
                </div>
                <span className="trigger-title">{item.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Monitor de Visualización Central */}
        <main className="display-monitor">
          <div className="monitor-header">
            <span className="terminal-path">/var/log/sysadmin/docs_molant/{activeKey}_molant.md</span>
            <span className="window-dot"></span>
          </div>

          <div className="monitor-body">
            {/* Texto del Documento */}
            <div className="document-content">
              <h2 className="doc-heading">{currentModule.title}</h2>
              <div className="text-container">
                {currentModule.rawContent.split("\n").map((line, idx) => {
                  const cleaned = cleanLine(line);
                  if (!cleaned) return null;
                  if (line.trim().startsWith("##")) {
                    return <h3 key={idx} className="section-subheading">{cleaned}</h3>;
                  }
                  return <p key={idx} className="text-paragraph">{cleaned}</p>;
                })}
              </div>
            </div>

            {/* SECCIÓN INTERACTIVA DE GALERÍA DIDÁCTICA CON ZOOM */}
            {currentModule.gallery.length > 0 && (
              <div className="interactive-gallery">
                <h3 className="gallery-section-title">🖼️ Evidencias Gráficas del Módulo (Haz clic para ampliar)</h3>
                <div className="gallery-layout">
                  {currentModule.gallery.map((img, idx) => {
                    const src = imageAssets[img.file];
                    return (
                      <div 
                        key={idx} 
                        className="screenshot-card"
                        onClick={() => setZoomImg(src ? { src, desc: img.desc, file: img.file } : null)}
                      >
                        <div className="card-top">
                          <span className="file-name-label">🔍 {img.file}</span>
                        </div>
                        {src ? (
                          <div className="img-wrapper">
                            <img src={src} alt={img.file} className="thumbnail" />
                          </div>
                        ) : (
                          <div className="missing-file-alert">
                            <p>⚠️ Archivo ausente en /img_molant:</p>
                            <code>{img.file}</code>
                          </div>
                        )}
                        <p className="card-description">{img.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODAL INTERACTIVO FLOTANTE DE ZOOM (Petición de Máxima Visibilidad) */}
      {zoomImg && (
        <div className="lightbox-overlay" onClick={() => setZoomImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-top-bar">
              <span className="lightbox-title">Visor de Evidencia de Consola: {zoomImg.file}</span>
              <button className="close-btn" onClick={() => setZoomImg(null)}>✖ Cerrar</button>
            </div>
            <img src={zoomImg.src} alt="Evidencia ampliada" className="lightbox-scaled-image" />
            <div className="lightbox-footer">
              <p>{zoomImg.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="tech-footer">
        <p>© 2026 INACAP Valparaíso · Escuela de Informática y Telecomunicaciones · Proyecto de Evidencias Integradas.</p>
      </footer>
    </div>
  );
}