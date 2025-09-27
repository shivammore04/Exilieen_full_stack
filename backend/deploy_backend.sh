#!/bin/bash
set -e

APP_DIR="$HOME/Exilieen_full_stack/backend"

echo "🚀 Starting backend deployment..."

# Go to backend folder
cd $APP_DIR

# Make sure repo is up to date
echo "📥 Pulling latest code from GitHub..."
git reset --hard
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build step (only if needed, otherwise skip)
# echo "🏗️ Building project..."
# npm run build

# Restart app with PM2
echo "🔄 Restarting backend with PM2..."
pm2 stop backend || true
pm2 start server.js --name backend

echo "✅ Backend deployed successfully!"
