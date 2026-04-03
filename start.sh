#!/bin/bash
set -e

# Check if running on Google Cloud Run with Cloud SQL
# if [ -n "$INSTANCE_CONNECTION_NAME" ]; then
  # Use Unix socket connection for Cloud SQL
export API_DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@localhost/${DB_NAME}?socket=/cloudsql/${INSTANCE_CONNECTION_NAME}"
# else
#   # Use TCP connection for RDS or local development
#   export API_DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:3306/${DB_NAME}"
# fi

cd /app/api
node dist/main &

nginx -g 'daemon off;'