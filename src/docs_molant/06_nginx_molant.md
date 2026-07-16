# 06. Instalación de Nginx y Despliegue Local

Configuración del Servidor Web Corporativo
Para publicar nuestra Wiki interactiva directamente desde el propio srv-wiki en el puerto virtualizado 8080, se ejecutó el siguiente plan de despliegue:

sudo apt install -y nginx nodejs npm git
git clone [https://github.com/Defkross1/wiki_lnx_molant.git](https://github.com/Defkross1/wiki_lnx_molant.git)
cd wiki_lnx_molant && npm install && npm run build
sudo mkdir -p /var/www/wiki
sudo cp -r dist/* /var/www/wiki/
sudo chown -R www-data:www-data /var/www/wiki

Archivo de Configuración de Nginx

Se editó la receta del servidor web /etc/nginx/sites-available/wiki para redireccionar de manera correcta el tráfico:

Nginx
server {
    listen 80 default_server;
    root /var/www/wiki;
    index index.html;
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}

Activamos el sitio web e iniciamos el motor:

sudo ln -s /etc/nginx/sites-available/wiki /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx