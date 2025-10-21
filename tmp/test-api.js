const fetch = globalThis.fetch || require('node-fetch');

(async () => {
  const endpoint = 'http://localhost:3000/public/chatbot/chat';
  const apiKey = '82899d8e-9c9a-4b67-8bc3-c6ff1d351b0b';
  const chatbotUuid = 'afe993fc-cadb-4b53-84d6-c697e7cbf595';
  const sessionUuid = 'test-session-' + Date.now();

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mind13-chatbot-api-key': apiKey,
      },
      body: JSON.stringify({ chatbot_uuid: chatbotUuid, session_uuid: sessionUuid, message: 'hello from test' }),
    });

    const text = await res.text();
    console.log('HTTP', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Request failed:', err);
  }
})();
