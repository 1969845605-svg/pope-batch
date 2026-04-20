export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, model, endpoint } = req.body;

  if (!process.env.api_minimax_key) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(endpoint || 'https://api.minimaxi.com/v1/text/chatcompletion_v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.api_minimax_key}`
      },
      body: JSON.stringify({
        model: model || 'MiniMax-M2.5-highspeed',
        messages
      })
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}