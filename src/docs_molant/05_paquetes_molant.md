05. Gestores de Paquetes (APT)
Criterio de Factibilidad Tecnológica

Para monitorear el rendimiento en tiempo real del servidor srv-wiki, se evaluaron soluciones técnicas nativas mediante el gestor APT:

apt search htop
apt show htop
sudo apt install -y htop tree

## Tabla de Factibilidad

| Herramienta |        Peso        |      Dependencias     |        Soporte Oficial      |    Factibilidad    |
|-------------|--------------------|-----------------------|-----------------------------|--------------------|
| htop        | Muy Bajo (~150KB)  | Ninguna (Stand-alone) | Repositorio Main (Total)    | Alta (Elegido)     |
| top         | Preinstalado       | Nativo del kernel     | Nativo                      | Alta pero limitado |


