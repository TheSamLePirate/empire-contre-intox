FROM oven/bun:1.3.14
USER root
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app/lives-service
COPY lives-service/package.json lives-service/bun.lock ./
RUN bun install --frozen-lockfile --production
COPY lives-service/*.ts ./
COPY counter/lib.ts /app/counter/lib.ts
RUN mkdir -p /tmp/eci-lives-media /data && chown -R bun:bun /app /tmp/eci-lives-media /data
USER bun
ENV PORT=3003
EXPOSE 3003
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 CMD bun -e "fetch('http://127.0.0.1:3003/api/lives/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["bun","server.ts"]
