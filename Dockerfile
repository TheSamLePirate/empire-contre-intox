FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="Empire contre Intox"
LABEL org.opencontainers.image.description="Site statique Empire contre Intox servi par Nginx"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

RUN find /usr/share/nginx/html -name '.DS_Store' -delete \
  && rm -rf /usr/share/nginx/html/.git /usr/share/nginx/html/.pi

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
