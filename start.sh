#!/bin/bash
set -e

export API_DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:3306/${DB_NAME}"

cd /app/api
node dist/main &

nginx -g 'daemon off;'