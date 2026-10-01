#!/bin/bash
# SNAIRK - local dev server (Vite)
# Usage: ./dev-server.sh [port] [--no-dev-mode]
#   port            default: 5173
#   --no-dev-mode   don't force DEV_MODE on for this run (no dev banner)
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

DEV_MODE=1
ARGS=()
for arg in "$@"; do
    case "$arg" in
        --no-dev-mode) DEV_MODE=0 ;;
        ''|*[!0-9]*) echo "Unknown option: $arg" >&2; exit 1 ;;
        *) ARGS+=(--port "$arg") ;;
    esac
done

[ -d node_modules ] || npm install

if [ "$DEV_MODE" = 1 ]; then
    export VITE_DEV_MODE=1
else
    unset VITE_DEV_MODE
fi
exec npx vite "${ARGS[@]}"
