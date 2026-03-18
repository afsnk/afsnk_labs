#!/usr/bin/env bash
set -euo pipefail

echo "Migrating database..."

pnpm run --filter @afsnk/pay-server db:generate
pnpm run --filter @afsnk/pay-server db:migrate

# Execute the command passed to the container
exec "$@"
