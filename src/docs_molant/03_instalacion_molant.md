# 03. Instalación y Configuración Básica

## Procedimiento Inicial de Despliegue
Para asegurar el correcto aprovisionamiento de la máquina virtual e interfaces de comunicación del sistema operativo, se ejecutaron los siguientes comandos administrativos en la CLI:

- **Configuración del Hostname:**
  
  sudo hostnamectl set-hostname srv-wiki

Auditoría de Red:
  
  ip a

Actualización de Paquetes de Seguridad:

  sudo apt update && sudo apt upgrade -y

Hardening de Red con Cortafuegos (UFW):

sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw enable
sudo ufw status verbose






