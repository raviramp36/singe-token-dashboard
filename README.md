# 🐒 Singe's Token Command Center

Monitor, manage, and optimize AI model usage across all agents and cron jobs.

![Dashboard Preview](https://via.placeholder.com/800x400/1a1a2e/e94560?text=Singe's+Token+Command+Center)

## Features

- 📊 **Real-time Stats**: Track daily token spend, costs, usage
- 🤖 **Agent Management**: View and change models for all 8 agents
- ⏰ **Cron Job Control**: Manage 27 cron jobs, their schedules, and models
- 💰 **Cost Comparison**: See savings vs all-premium setup
- 🎯 **One-Click Changes**: Update models and restart gateway instantly

## Tech Stack

- **Frontend**: Vanilla HTML/JS with modern CSS
- **Backend**: Netlify Functions (Node.js)
- **Hosting**: Netlify

## Local Development

### Option 1: Flask Backend (Full Functionality)

```bash
cd dashboard
pip3 install flask flask-cors
python3 token_server.py
```

Open http://localhost:8765

### Option 2: Netlify Dev (For Testing Netlify Functions)

```bash
cd dashboard
npm install -g netlify-cli
netlify dev
```

## Deployment to Netlify

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

### Step 3: Initialize & Deploy

```bash
cd /Users/Shared/clawd/dashboard
netlify init
# Follow prompts - choose "Create & configure a new site"

netlify deploy --prod
```

### Step 4: Get Your URL

After deployment, Netlify will give you a URL like:
`https://singe-token-dashboard-abc123.netlify.app`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/.netlify/functions/agents` | GET | List all agents |
| `/.netlify/functions/crons` | GET | List all cron jobs |
| `/.netlify/functions/models` | GET | List models with pricing |
| `/.netlify/functions/stats` | GET | Token usage stats |
| `/.netlify/functions/summary` | GET | Cost summary |

## Model Pricing

| Model | Input $/M | Output $/M | Tier |
|-------|-----------|------------|------|
| Qwen2.5 7B | $0.04 | $0.10 | 🟢 Low |
| Kimi K2.5 | $0.45 | $2.20 | 🟡 Medium |
| Claude Sonnet 4.5 | $3.00 | $15.00 | 🔴 High |
| Claude Opus 4.5 | $15.00 | $75.00 | 🔴 High |
| Gemini 3.1 Pro | $2.00 | $12.00 | 🔴 High |

## Current Config

- **Agents**: 8 (Singe, Max, Maya, Arjun, Artha, Remo, Vayu, Kala)
- **Cron Jobs**: 27 (20 enabled)
- **Daily Cost**: ~$2.50 (with Qwen for crons)
- **Savings**: ~70% vs all-premium

## Files Structure

```
dashboard/
├── dist/
│   └── index.html          # Frontend
├── netlify/
│   └── functions/          # Serverless functions
│       ├── agents.js       # GET /api/agents
│       ├── crons.js        # GET /api/crons
│       ├── models.js       # GET /api/models
│       ├── stats.js        # GET /api/stats
│       └── summary.js      # GET /api/summary
├── netlify.toml            # Netlify config
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## ⚠️ Important Notes

1. **Netlify Functions Limitation**: The serverless functions can't access your local `~/.openclaw/` files. For full functionality (changing models), use the local Flask server.

2. **Read-Only Mode**: The Netlify hosted version is read-only for stats. To make changes, use the local version.

3. **CORS**: Configured to allow requests from any origin.

## Custom Domain (Optional)

To use your own domain:

```bash
netlify domains:add yourdomain.com
```

Or configure in Netlify Dashboard → Domain Settings.

## Troubleshooting

### Functions not working?
Check that `netlify.toml` is in the root and functions are in `netlify/functions/`.

### CORS errors?
Make sure headers are set in each function:
```javascript
'Access-Control-Allow-Origin': '*'
```

### Changes not reflecting?
Netlify deploys are atomic. Wait for the deploy to finish or check Deploys tab in Netlify Dashboard.

---

Built with 🐒 chaos by Singe