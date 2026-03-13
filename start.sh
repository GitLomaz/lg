#!/bin/bash
set -e

# Start NestJS API in background
cd /app/api
node dist/main &

# Start nginx in foreground
nginx -g 'daemon off;'
