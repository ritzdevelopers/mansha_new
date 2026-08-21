#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO="$(cd "$FRONTEND/.." && pwd)"

if [ -f "$REPO/package.json" ] && grep -q '"workspaces"' "$REPO/package.json"; then
  echo "[vercel-install] installing workspace deps from $REPO"
  (cd "$REPO" && npm install --include=optional)
else
  echo "[vercel-install] installing frontend deps from $FRONTEND"
  (cd "$FRONTEND" && npm install --include=optional)
fi

cd "$FRONTEND"
npm install --no-save --no-package-lock --ignore-scripts \
  lightningcss-linux-x64-gnu@1.32.0 \
  lightningcss-linux-x64-musl@1.32.0 \
  lightningcss-linux-arm64-gnu@1.32.0 \
  lightningcss-linux-arm64-musl@1.32.0 \
  @tailwindcss/oxide-linux-x64-gnu@4.2.4 \
  @tailwindcss/oxide-linux-x64-musl@4.2.4 \
  @tailwindcss/oxide-linux-arm64-gnu@4.2.4 \
  @tailwindcss/oxide-linux-arm64-musl@4.2.4 || true

node "$SCRIPT_DIR/ensure-native-css.js" --strict
