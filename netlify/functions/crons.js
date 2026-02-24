const fs = require('fs');
const path = require('path');

const OPENCLAW_DIR = path.join(require('os').homedir(), '.openclaw');
const CRON_JOBS_JSON = path.join(OPENCLAW_DIR, 'cron', 'jobs.json');

const MODELS = {
  "qwen/qwen-2.5-7b-instruct": { name: "Qwen2.5 7B", input: 0.04, output: 0.10, tier: "low" },
  "openrouter/moonshotai/kimi-k2.5": { name: "Kimi K2.5", input: 0.45, output: 2.20, tier: "med" },
  "anthropic/claude-sonnet-4-20250514": { name: "Claude Sonnet 4.5", input: 3.00, output: 15.00, tier: "high" },
  "anthropic/claude-opus-4-5": { name: "Claude Opus 4.5", input: 15.00, output: 75.00, tier: "high" }
};

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return { jobs: [] };
  }
}

function estimateCronCost(schedule, model) {
  const modelInfo = MODELS[model] || MODELS['openrouter/moonshotai/kimi-k2.5'];
  let runsPerDay = 1;
  
  if (schedule.includes('30min') || schedule.includes('*/30')) runsPerDay = 32;
  else if (schedule.includes('15min') || schedule.includes('*/15')) runsPerDay = 64;
  else if (schedule.includes('hour')) runsPerDay = 24;
  else if (schedule.includes('8,14,22')) runsPerDay = 3;
  else if (schedule.includes('10,12,14')) runsPerDay = 3;
  
  const costPerRun = (modelInfo.input + modelInfo.output * 2) / 1000;
  return Math.round(costPerRun * runsPerDay * 10000) / 10000;
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const config = loadJson(CRON_JOBS_JSON);
  const jobs = config.jobs || [];

  const result = jobs.map(job => {
    const schedule = job.schedule || {};
    const payload = job.payload || {};
    const state = job.state || {};
    
    let scheduleStr = 'unknown';
    if (schedule.kind === 'cron') scheduleStr = schedule.expr || 'unknown';
    else if (schedule.kind === 'every') {
      const mins = (schedule.everyMs || 0) / 60000;
      scheduleStr = `Every ${mins}min`;
    }
    
    const model = payload.model || 'default';
    const modelInfo = model === 'default' 
      ? { name: 'Default (kimi)', input: 0.45, output: 2.20, tier: 'med' }
      : (MODELS[model] || { name: model, input: 0.45, output: 2.20, tier: 'med' });
    
    return {
      id: job.id,
      name: job.name,
      enabled: job.enabled !== false,
      schedule: scheduleStr,
      model: model,
      model_name: modelInfo.name,
      cost_input: modelInfo.input,
      cost_output: modelInfo.output,
      tier: modelInfo.tier,
      daily_cost: estimateCronCost(scheduleStr, model),
      last_status: state.lastStatus || 'unknown',
      last_error: state.lastError,
      consecutive_errors: state.consecutiveErrors || 0
    };
  });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(result)
  };
};