#!/bin/bash
# Manual deployment instructions for Netlify

echo "🐒 Manual Netlify Deployment"
echo "=============================="
echo ""
echo "Since auto-login requires browser interaction, here's how to deploy:"
echo ""
echo "METHOD 1: Netlify Drop (Easiest)"
echo "---------------------------------"
echo "1. Go to https://app.netlify.com/drop"
echo "2. Drag and drop the 'dist' folder from:"
echo "   /Users/Shared/clawd/dashboard/dist"
echo "3. Your site will be live instantly!"
echo ""
echo "METHOD 2: Netlify CLI (With Login)"
echo "-----------------------------------"
echo "1. Run: netlify login"
echo "2. Complete login in your browser"
echo "3. Run: cd /Users/Shared/clawd/dashboard"
echo "4. Run: netlify init"
echo "5. Run: netlify deploy --prod"
echo ""
echo "METHOD 3: Create ZIP and Upload"
echo "--------------------------------"
echo "Creating dashboard.zip for you..."

# Create a zip file
zip -r dashboard.zip dist netlify netlify.toml package.json README.md DEPLOY.md 2>/dev/null

echo "✅ Created: /Users/Shared/clawd/dashboard/dashboard.zip"
echo ""
echo "Upload this zip at: https://app.netlify.com/drop"
echo ""
