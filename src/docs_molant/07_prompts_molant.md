# 07. Bitácora de Procesos y Uso de IA

## Registro de Decisiones de Administración
Durante el ciclo de desarrollo de la infraestructura y el portal wiki, se registraron y mitigaron las siguientes incidencias críticas:

* **Resolución de Kernel Panic:** Configuración de VirtualBox aumentando a 4 procesadores, paravirtualización Hyper-V y deshabilitando la integridad de memoria en el sistema anfitrión de Windows.
* **Configuración de Firewall:** Aseguramiento de reglas UFW con `ufw allow OpenSSH` previo a la activación del Firewall para prevenir la pérdida de conexión por el puerto 2222.
* **Redireccionamiento en Nginx:** Migración correcta de los archivos construidos de `/dist` a `/var/www/wiki` y asignación de propietario `www-data` para evitar errores HTTP 403 Forbidden.

## Herramientas y Fuentes Utilizadas
Para el desarrollo de este proyecto se utilizaron las siguientes herramientas y fuentes:

| Herramienta / Fuente | Paso / Etapa | Propósito |
| :--- | :--- | :--- |
| **Gemini AI** | Frontend (App.jsx / App.css) | Asistencia en la lógica de renderizado React, diseño de componentes didácticos y depuración de errores sintácticos. |
| **Documentación Oficial Nginx** | Configuración Web | Consulta de directivas de configuración de bloques `server` y `root` para el despliegue del sitio. |
| **Comandos CLI Linux (`man`)** | Administración de Sistema | Consulta de sintaxis para `chmod`, `chown` y configuración de permisos especiales (Sticky Bit). |
| **Git / GitHub** | Control de versiones | Gestión de cambios progresivos y respaldo del código fuente. |

## Uso de Prompts de IA (Ejemplos)
Se utilizaron prompts para estructurar el desarrollo del portal interactivo:
1. *"Ayúdame a crear un componente en React que renderice tablas Markdown de forma interactiva, convirtiendo las celdas de factibilidad en barras de progreso visuales."*
2. *"Genera una estructura de CSS que simule una consola de administración de Linux con paneles divididos (split-screen) y que sea responsiva."*
3. *"Explícame por qué recibo un error 403 Forbidden al servir contenido con Nginx y cómo aplicar permisos de usuario www-data correctamente."*

## Reflexión Final
El proceso de trabajo me permitió comprender que, si bien la inteligencia artificial actúa como un facilitador altamente eficiente para la maquetación de interfaces y la resolución de errores de código complejos, no sustituye la capacidad de resolución de problemas a nivel de kernel y redes. La configuración de VirtualBox y el direccionamiento de puertos fueron desafíos que requirieron una comprensión profunda de la infraestructura real, demostrando que la IA complementa pero no reemplaza el criterio técnico del ingeniero en informática.