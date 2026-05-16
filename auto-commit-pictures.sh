#!/bin/bash

export HOME="/home/lezojeda"
export PATH="/usr/bin:/bin"
export GIT_SSH_COMMAND="ssh -i /home/lezojeda/.ssh/github -o StrictHostKeyChecking=no"

cd /home/lezojeda/repositories/lojeda

if [[ -n $(/usr/bin/git status -s src/content/pictures/) ]]; then
    /usr/bin/git add src/content/pictures/
    /usr/bin/git commit -m "Auto-commit pictures: $(date +'%Y-%m-%d %H:%M')"
    /usr/bin/git push origin master
    echo "$(date): pushed"
else
    echo "$(date): no changes"
fi
