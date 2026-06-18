// Native fetch is available in Node 18+


async function run() {
  const url = 'https://hackathon.bitgetops.com/v1/chat/completions';
  const apiKey = '8ivXppqCMrYAMcSj';
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'qwen3.6-plus',
        messages: [{ role: 'user', content: 'hello' }]
      })
    });
    
    console.log('Status:', res.status);
    const body = await res.text();
    console.log('Body:', body);
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
