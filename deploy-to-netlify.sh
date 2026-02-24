#!/bin/bash
# Deploy Singe's Token Command Center to Netlify

echo "🐒 Deploying Token Command Center to Netlify..."
echo "================================================"

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Navigate to dashboard
cd /Users/Shared/clawd/dashboard

# Check if already initialized
if [ ! -d ".netlify" ]; then
    echo ""
    echo "🔧 First time setup - initializing Netlify site..."
    echo "Follow the prompts:"
    echo "  - Choose 'Create & configure a new site'"
    echo "  - Choose your team"
    echo "  - Enter a site name (optional)"
    echo ""
    netlify init
fi

# Deploy to production
echo ""
echo "🚀 Deploying to production..."
netlify deploy --prod

echo ""
echo "================================================"
echo "✅ Deployment complete!"
echo "Your dashboard should be live at the URL above."
echo "================================================"