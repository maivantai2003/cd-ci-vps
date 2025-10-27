#!/bin/sh
set -e

echo "⏳ Running migrations..."
npm run migration:run:prod
echo "✅ Migrations done!"

echo "🚀 Starting application..."
node dist/index.js
