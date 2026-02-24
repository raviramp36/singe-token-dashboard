const fs = require('fs');
const path = require('path');

const OPENCLAW_DIR = path.join(require('os').homedir(), '.openclaw');
const CLAWDBOT_JSON = path.join(OPENCLAW_DIR, 'clawdbot.json');
const CRON_JOBS_JSON = path.join(OPENCLAW_DIR, 'cron', 'jobs.json');

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return {};
  }
}

function estimateCronCost(schedule, model) {
  const MODELS = {
    "qwen/qwen-2.5-7b-instruct": { input: 0.04, output: 0.10 },
    "openrouter/moonshotai/kimi-k2.5": { input: 0.45, output: 2.20 }
  };
  const modelInfo = MODELS[model] || { input: 0.45, output: 2.20 };
  let runsPerDay = 1;
  
  if (schedule.includes('30min') || schedule.includes('*/30')) runsPerDay = 32;
  else if (schedule.includes('15min') || schedule.includes('*/15')) runsPerDay = 64;
  else if (schedule.includes('hour')) runsPerDay = 24;
  else if (schedule.includes('8,14,22')) runsPerDay = 3;
  
  const costPerRun = (modelInfo.input + modelInfo.output * 2) / 1000;
  return costPerRun * runsPerDay;
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const clawdbot = loadJson(CLAWDBOT_JSON);
  const cronConfig = loadJson(CRON_JOBS_JSON);
  
  const agents = clawdbot.agents?.list || [];
  const crons = cronConfig.jobs || [];
  
  const enabledCrons = crons.filter(c => c.enabled !== false);
  const cronDaily = enabledCrons.reduce((sum, c) => {
    const schedule = c.schedule?.kind === 'cron' ? c.schedule.expr : 'daily';
    const model = c.payload?.model || 'default';
    return sum + estimateCronCost(schedule, model);
  }, 0);
  
  const agentDaily = 2.0 + (agents.length - 1) * 0.5;
  
  const usingQwen = crons.filter(c => (c.payload?.model || '').includes('qwen')).length;
  const usingPremium = crons.filter(c => {
    const m = c.payload?.model || '';
    return m.includes('opus') || m.includes('sonnet');
  }).length;

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      agents_count: agents.length,
      crons_count: crons.length,
      enabled_crons: enabledCrons.length,
      estimated_daily_cost: Math.round((cronDaily + agentDaily) * 100) / 100,
      estimated_monthly_cost: Math.round((cronDaily + agentDaily) * 30 * 100) / 100,
      cron_daily_cost: Math.round(cronDaily * 100) / 100,
      agent_daily_cost: Math.round(agentDaily * 100) / 100,
      using_qwen: usingQwen,
      using_premium: usingPremium
    })
  };
};