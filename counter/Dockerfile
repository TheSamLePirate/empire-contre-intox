FROM oven/bun:1.1-alpine

WORKDIR /app
COPY server.ts ./server.ts

RUN mkdir -p /data && chown -R bun:bun /data /app
USER bun

ENV PORT=3001
ENV DB_PATH=/data/visits.sqlite

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:3001/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["bun", "server.ts"]
