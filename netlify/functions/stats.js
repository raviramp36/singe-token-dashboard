exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Return mock stats for now - in real implementation this would read from a log file
  const today = new Date().toISOString().split('T')[0];
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      today: {
        date: today,
        total_input_tokens: 0,
        total_output_tokens: 0,
        total_tokens: 0,
        total_cost: 0,
        by_model: {}
      },
      cron_daily_estimate: 0.15
    })
  };
};