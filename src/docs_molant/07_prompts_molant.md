07. Bitácora de Procesos y Uso de IA
Registro de Decisiones de Administración
Durante el ciclo de desarrollo de la infraestructura y el portal wiki, se registraron y mitigaron las siguientes incidencias críticas:

Resolución de Kernel Panic: Configuración de VirtualBox aumentando a 4 procesadores, paravirtualización Hyper-V y deshabilitando la integridad de memoria en el sistema anfitrión de Windows.

Configuración de Firewall: Aseguramiento de reglas UFW con ufw allow OpenSSH previo a la activación del Firewall para prevenir la pérdida de conexión por el puerto 2222.

Redireccionamiento en Nginx: Migración correcta de los archivos construidos de /dist a /var/www/wiki y asignación de propietario www-data para evitar errores HTTP 403 Forbidden.

Reflexión de Ingeniería
La inteligencia artificial actuó como asistente de desarrollo para agilizar la maquetación interactiva y el control de errores sintácticos en React. No obstante, la depuración a nivel de hardware, configuración del kernel Linux y redes NAT de VirtualBox requirieron exclusivamente del análisis crítico y de la intervención operativa humana.