#!/bin/bash
set -e

APP_DIR="$HOME/Exilieen_full_stack/frontend"
BUILD_DIR="$APP_DIR/build"
DEPLOY_DIR="/var/www/html"

echo "🚀 Starting frontend deployment..."

# Go to frontend folder
cd $APP_DIR

# Make sure repo is up to date
echo "📥 Pulling latest code from GitHub..."
git reset --hard
git pull origin main

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build the frontend
echo "🏗️ Building frontend..."
npm run build

# Deploy build to web server directory
echo "📂 Deploying build to $DEPLOY_DIR ..."
sudo rm -rf $DEPLOY_DIR/*
sudo cp -r $BUILD_DIR/* $DEPLOY_DIR/

echo "✅ Frontend deployed successfully!"
