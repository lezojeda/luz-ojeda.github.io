#!/bin/bash

export PATH="/home/lezojeda/.nvm/versions/node/v24.11.1/bin:$PATH"

cd /home/lezojeda/repositories/lojeda || exit

git pull
npm install
npm run build

rsync -av --delete dist/ /var/www/lojeda/