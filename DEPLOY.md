# 🚀 One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/raviramp36/singe-token-dashboard)

## Manual Deploy Instructions

If the button doesn't work, follow these steps:

### 1. Push to GitHub (Optional but recommended)

```bash
cd /Users/Shared/clawd/dashboard
git init
git add .
git commit -m "Initial dashboard commit"
git remote add origin https://github.com/raviramp36/singe-token-dashboard.git
git push -u origin main
```

### 2. Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd /Users/Shared/clawd/dashboard
netlify init
netlify deploy --prod
```

### 3. Or use the deploy script

```bash
/Users/Shared/clawd/dashboard/deploy-to-netlify.sh
```

## After Deployment

Your dashboard will be available at:
`https://[your-site-name].netlify.app`

## Note on Functionality

⚠️ **Important**: The Netlify hosted version has limited functionality:

- ✅ **Works**: View agents, cron jobs, models, pricing
- ✅ **Works**: Cost calculations and comparisons
- ❌ **Limited**: Cannot read live data from `~/.openclaw/` (files are local)
- ❌ **Limited**: Cannot modify configs or restart gateway

**For full functionality** (changing models, saving configs), use the local Flask server:

```bash
python3 /Users/Shared/clawd/dashboard/token_server.py
```

Then open http://localhost:8765