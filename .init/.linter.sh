#!/bin/bash
cd /home/kavia/workspace/code-generation/storychain-collaborative-writing-179168-179189/storychain_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

