# Imagen base ligera de nginx
FROM nginx:alpine

# Copiar los archivos estáticos al directorio web de nginx
COPY index.html styles.css script.js /usr/share/nginx/html/
COPY data/ /usr/share/nginx/html/data/

# nginx escucha en el puerto 80 por defecto
EXPOSE 80
