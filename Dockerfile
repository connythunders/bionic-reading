# Dockerfile för NGINX frontend
FROM nginx:alpine

# Kopiera alla statiska filer till NGINX
COPY index.html /usr/share/nginx/html/
COPY adaptivt-prov.html /usr/share/nginx/html/
COPY quiz-standalone.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY *.md /usr/share/nginx/html/

# Exponera port 80
EXPOSE 80

# NGINX startar automatiskt med default CMD
