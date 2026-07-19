FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="Empire contre Intox"
LABEL org.opencontainers.image.description="Site statique Empire contre Intox servi par Nginx"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# empire-calendrier is an independent, framework-free Git repository. It is
# deliberately absent from Astro's public manifest and is added only to the
# Portainer image, under the route linked by the main site.
COPY empire-calendrier/index.html \
     empire-calendrier/background.png \
     empire-calendrier/Logo-ECI.jpg \
     empire-calendrier/og-image.png \
     /usr/share/nginx/html/empire-calendrier/
COPY empire-calendrier/*.jpeg /usr/share/nginx/html/empire-calendrier/
COPY empire-calendrier/data/events.json /usr/share/nginx/html/empire-calendrier/data/events.json

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
