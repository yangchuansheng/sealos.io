#!/bin/bash

app_env=${1:-development}

if [ \"$app_env\" = \"production\" ] || [ \"$app_env\" = \"prod\" ] ; then
    export NODE_ENV=production
    export NEXT_TELEMETRY_DISABLED=1
    npm install
    npm run build
    npm start -- --hostname 0.0.0.0 --port 3000
else
    export NEXT_TELEMETRY_DISABLED=1
    npm install
    npm run dev -- --hostname 0.0.0.0 --port 3000
fi
