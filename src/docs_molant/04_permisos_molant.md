04. Gestión de Archivos y Directorios
Comandos y Lectura de Permisos
En Linux Server, la administración de la seguridad en disco se controla de manera estricta mediante la interfaz de consola:

Lectura de permisos (ls -l):
Ejemplo: -rw-rw-r-- representa 10 caracteres (tipo de archivo, permisos del dueño [rw-], del grupo [rw-] y de otros [r--]).

Configuración chmod octal:

    chmod 600 nota.txt

Configuración chmod simbólica:

    chmod u+x,go-rwx privado

Cambio de Propietario (chown):

    sudo chown root:root nota.txt

Permisos Especiales (SetGID y Sticky Bit):

    sudo chmod 2775 /srv/compartido
    sudo chmod +t /tmp








