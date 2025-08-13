export default async function handler(req, res) {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, retries = 3, delay = 1000 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          return res.status(200).json({ 
            success: true, 
            content: result.candidates[0].content.parts[0].text 
          });
        } else {
          throw new Error("Invalid response structure from Gemini API");
        }
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error);
        if (i === retries - 1) {
          return res.status(500).json({ 
            error: "AI分析时遇到问题，请稍后再试。",
            details: error.message 
          });
        }
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  } catch (error) {
    console.error('API handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}