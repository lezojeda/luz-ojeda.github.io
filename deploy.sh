#!/bin/bash

set -e

export PATH="/usr/local/bin:/usr/bin:/bin"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

git pull
npm install
npm run build

rsync -av --delete dist/ /var/www/lojeda/