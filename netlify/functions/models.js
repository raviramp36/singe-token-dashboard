exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const MODELS = {
    "qwen/qwen-2.5-7b-instruct": { name: "Qwen2.5 7B", input: 0.04, output: 0.10, tier: "low" },
    "openrouter/moonshotai/kimi-k2.5": { name: "Kimi K2.5", input: 0.45, output: 2.20, tier: "med" },
    "anthropic/claude-sonnet-4-20250514": { name: "Claude Sonnet 4.5", input: 3.00, output: 15.00, tier: "high" },
    "anthropic/claude-opus-4-5": { name: "Claude Opus 4.5", input: 15.00, output: 75.00, tier: "high" },
    "openrouter/google/gemini-3.1-pro-preview": { name: "Gemini 3.1 Pro", input: 2.00, output: 12.00, tier: "high" },
    "openrouter/anthropic/claude-opus-4": { name: "Claude Opus 4", input: 15.00, output: 75.00, tier: "high" },
    "openrouter/anthropic/claude-opus-4.6": { name: "Claude Opus 4.6", input: 15.00, output: 75.00, tier: "high" }
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(MODELS)
  };
};