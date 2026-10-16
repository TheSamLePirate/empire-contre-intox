FROM oven/bun:1.3.14
WORKDIR /app/calendar-service
COPY calendar-service/package.json calendar-service/bun.lock ./
RUN bun install --frozen-lockfile --production
COPY calendar-service/app.ts calendar-service/store.ts calendar-service/images.ts \
     calendar-service/validation.ts calendar-service/lives.ts calendar-service/server.ts calendar-service/manage.ts ./
COPY counter/lib.ts /app/counter/lib.ts
COPY empire-calendrier/data/events.json /app/seed/events.json
RUN mkdir -p /data && chown -R bun:bun /data /app
USER bun
ENV PORT=3002 CALENDAR_DATA_DIR=/data CALENDAR_SEED=/app/seed/events.json
EXPOSE 3002
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:3002/api/calendar/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["bun", "server.ts"]
