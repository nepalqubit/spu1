#!/bin/bash

# RevX AI Assistant Deployment Script

echo "🚀 Starting RevX AI Assistant deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linter checks..."
npm run lint

# Build the app
echo "🛠️ Building the application..."
npm run build

# Deploy to Vercel (if Vercel CLI is installed)
if command -v vercel &> /dev/null; then
    echo "🌐 Deploying to Vercel..."
    read -p "Deploy to production? (y/n): " PROD
    if [[ $PROD == "y" || $PROD == "Y" ]]; then
        vercel --prod
    else
        vercel
    fi
    echo "✅ Deployment complete!"
else
    echo "⚠️ Vercel CLI not found. To deploy to Vercel, please:"
    echo "1. Install Vercel CLI: npm install -g vercel"
    echo "2. Login to Vercel: vercel login"
    echo "3. Deploy with: vercel (for preview) or vercel --prod (for production)"
    echo ""
    echo "Alternatively, connect your GitHub repository to Vercel dashboard for automatic deployments."
fi 