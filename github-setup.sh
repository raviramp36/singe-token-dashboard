#!/bin/bash
# GitHub + Netlify Setup Script for Singe's Token Dashboard

echo "🐒 GitHub + Netlify Setup Guide"
echo "==============================="
echo ""
echo "✅ Git repository created locally"
echo "✅ All files committed"
echo ""
echo "NEXT STEPS:"
echo ""
echo "STEP 1: Create GitHub Repository"
echo "---------------------------------"
echo "1. Go to https://github.com/new"
echo "2. Repository name: singe-token-dashboard"
echo "3. Description: Singe's Token Command Center - AI usage dashboard"
echo "4. Make it Public or Private (your choice)"
echo "5. Click 'Create repository'"
echo ""
echo "STEP 2: Push Local Code to GitHub"
echo "----------------------------------"
echo "Run these commands:"
echo ""
echo "  cd /Users/Shared/clawd/dashboard"
echo "  git remote add origin https://github.com/YOUR_USERNAME/singe-token-dashboard.git"
echo "  git branch -M main"
echo "  git push -u origin main"
echo ""
echo "STEP 3: Connect to Netlify"
echo "---------------------------"
echo "1. Go to https://app.netlify.com"
echo "2. Click 'Add new site' → 'Import an existing project'"
echo "3. Choose 'GitHub' and authorize Netlify"
echo "4. Select your 'singe-token-dashboard' repo"
echo "5. Build settings:"
echo "     - Build command: (leave empty)"
echo "     - Publish directory: dist"
echo "6. Click 'Deploy site'"
echo ""
echo "Your site will be live at: https://singe-token-dashboard-XXXX.netlify.app"
echo ""

# Create a quick reference file
cat > GITHUB_SETUP.txt << 'EOF'
GITHUB + NETLIFY SETUP - QUICK REFERENCE
========================================

1. CREATE GITHUB REPO
   URL: https://github.com/new
   Name: singe-token-dashboard
   
2. PUSH CODE
   cd /Users/Shared/clawd/dashboard
   git remote add origin https://github.com/YOUR_USERNAME/singe-token-dashboard.git
   git push -u origin main
   
3. CONNECT NETLIFY
   URL: https://app.netlify.com
   Add new site → Import from Git → GitHub
   Select repo: singe-token-dashboard
   Build command: (empty)
   Publish directory: dist
   
4. DONE! 🎉
   Your dashboard will be live instantly!
EOF

echo "Quick reference saved to: GITHUB_SETUP.txt"
echo ""
echo "Want me to open the GitHub 'New Repository' page for you?"