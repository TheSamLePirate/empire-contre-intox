#!/usr/bin/env bash
set -Eeuo pipefail

STACK_NAME="empire-contre-intox-site"
DOMAIN="https://empire-contre-intox.com"
MANAGER_DIR="../devServerTest"
TIMEOUT_SECONDS=180
CHECK_ONLY=0
GENERATE_RSS=1
HTTP_CHECKS=1

usage() {
  cat <<'EOF'
Usage: scripts/deploy-portainer.sh [options]

Déploie le site statique Empire contre Intox sur Portainer via ../devServerTest.

Options:
  --check                 Valide seulement (RSS, compose, prérequis), sans déployer.
  --stack <name>          Nom de stack Portainer (défaut: empire-contre-intox-site).
  --domain <url>          Domaine public à vérifier (défaut: https://empire-contre-intox.com).
  --manager-dir <path>    Chemin vers devServerTest/port-manager (défaut: ../devServerTest).
  --timeout <seconds>     Temps max d'attente du healthcheck (défaut: 180).
  --no-rss                Ne régénère pas rss.xml avant déploiement.
  --no-http-check         Ne fait pas les vérifications HTTP finales.
  -h, --help              Affiche cette aide.

Exemples:
  scripts/deploy-portainer.sh --check
  scripts/deploy-portainer.sh
  scripts/deploy-portainer.sh --stack empire-contre-intox-site --domain https://empire-contre-intox.com
EOF
}

log() { printf '\033[1;34m▶\033[0m %s\n' "$*"; }
ok() { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!\033[0m %s\n' "$*"; }
err() { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    err "Commande introuvable: $1"
    exit 1
  }
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --check) CHECK_ONLY=1; shift ;;
    --stack) STACK_NAME="${2:?--stack nécessite une valeur}"; shift 2 ;;
    --domain) DOMAIN="${2:?--domain nécessite une valeur}"; shift 2 ;;
    --manager-dir) MANAGER_DIR="${2:?--manager-dir nécessite une valeur}"; shift 2 ;;
    --timeout) TIMEOUT_SECONDS="${2:?--timeout nécessite une valeur}"; shift 2 ;;
    --no-rss) GENERATE_RSS=0; shift ;;
    --no-http-check) HTTP_CHECKS=0; shift ;;
    -h|--help) usage; exit 0 ;;
    *) err "Option inconnue: $1"; usage; exit 1 ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MANAGER_ABS="$(cd "$REPO_ROOT/$MANAGER_DIR" 2>/dev/null && pwd || true)"

if [[ -z "$MANAGER_ABS" || ! -d "$MANAGER_ABS" ]]; then
  err "Dossier port-manager introuvable: $REPO_ROOT/$MANAGER_DIR"
  exit 1
fi

cd "$REPO_ROOT"

log "Préflight"
require_cmd python3
require_cmd docker
require_cmd bun
require_cmd curl

[[ -f Dockerfile ]] || { err "Dockerfile manquant"; exit 1; }
[[ -f docker-compose.yml ]] || { err "docker-compose.yml manquant"; exit 1; }
[[ -f nginx.conf ]] || { err "nginx.conf manquant"; exit 1; }
[[ -f .dockerignore ]] || { err ".dockerignore manquant"; exit 1; }
[[ -f "$MANAGER_ABS/package.json" ]] || { err "package.json introuvable dans $MANAGER_ABS"; exit 1; }

if [[ "$GENERATE_RSS" -eq 1 ]]; then
  log "Régénération du RSS"
  python3 scripts/generate-rss.py
else
  warn "Régénération RSS ignorée (--no-rss)"
fi

log "Validation RSS XML"
python3 - <<'PY'
import xml.dom.minidom
xml.dom.minidom.parse('rss.xml')
print('rss.xml valide')
PY

log "Validation Docker Compose"
docker compose config >/tmp/eci-docker-compose.config.yml
ok "docker compose config OK"

if [[ "$CHECK_ONLY" -eq 1 ]]; then
  ok "Mode --check terminé : aucun déploiement lancé."
  exit 0
fi

log "Déploiement Portainer: stack=$STACK_NAME"
(
  cd "$MANAGER_ABS"
  bun run port-manager deploy "$REPO_ROOT" --name "$STACK_NAME"
)

log "Attente du container healthy"
start_ts="$(date +%s)"
last_line=""
while true; do
  line="$( (cd "$MANAGER_ABS" && bun run port-manager ps --all) 2>/dev/null | grep -i "${STACK_NAME}.*site" || true)"
  [[ -n "$line" ]] && last_line="$line"
  if printf '%s' "$line" | grep -qi 'healthy'; then
    ok "$line"
    break
  fi
  now_ts="$(date +%s)"
  if (( now_ts - start_ts >= TIMEOUT_SECONDS )); then
    err "Timeout healthcheck après ${TIMEOUT_SECONDS}s"
    [[ -n "$last_line" ]] && err "Dernier état: $last_line"
    exit 1
  fi
  [[ -n "$line" ]] && printf '  %s\n' "$line" || printf '  container non visible encore…\n'
  sleep 6
done

if [[ "$HTTP_CHECKS" -eq 1 ]]; then
  log "Vérifications HTTP publiques"
  urls=(
    "$DOMAIN/"
    "$DOMAIN/rss.xml"
    "$DOMAIN/LICENCE-CONTENU.md"
    "$DOMAIN/api/count?path=/"
  )
  for url in "${urls[@]}"; do
    code="$(curl -L -s -o /tmp/eci-deploy-check -w '%{http_code}' "$url")"
    if [[ "$code" != "200" ]]; then
      err "$url -> HTTP $code"
      exit 1
    fi
    ok "$url -> 200"
  done

  index_tmp="$(mktemp /tmp/eci-index-public.XXXXXX)"
  curl -L -s "$DOMAIN/" -o "$index_tmp"

  grep -q 'CC BY-NC-ND 4.0' "$index_tmp" || {
    rm -f "$index_tmp"
    err "Licence CC BY-NC-ND 4.0 non trouvée sur l'index public"
    exit 1
  }
  ok "Licence visible sur l'index"

  grep -q 'visites sur cette page' "$index_tmp" || {
    rm -f "$index_tmp"
    err "Emplacement du compteur par page non trouvé sur l'index public"
    exit 1
  }
  rm -f "$index_tmp"
  ok "Compteur par page présent sur l'index"
else
  warn "Vérifications HTTP ignorées (--no-http-check)"
fi

ok "Déploiement terminé: $DOMAIN"
