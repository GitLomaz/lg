#!/bin/bash
set -e

# Construct database URL from individual variables
export API_DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:3306/${DB_NAME}?schema=public"

# Start NestJS API in background
cd /app/api
node dist/main &

# Start nginx in foreground
nginx -g 'daemon off;'
