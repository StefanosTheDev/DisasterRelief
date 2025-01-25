#!/bin/sh
set -e

until pg_isready -h postgres -p 5432 -U app_user; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

echo "PostgreSQL is ready!"
exec "$@"
