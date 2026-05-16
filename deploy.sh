#!/bin/bash

set -e # exit immediately if any command fails.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

git pull
npm install
npm run build

rsync -av --delete dist/ /var/www/lojeda/