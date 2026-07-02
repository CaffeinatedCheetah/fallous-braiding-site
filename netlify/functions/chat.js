// netlify/functions/chat.js
//
// Serverless endpoint that powers the website chat widget.
// Requires an environment variable set in the Netlify dashboard:
//   ANTHROPIC_API_KEY = sk-ant-...
//
// Site settings → Build & deploy → Environment → Environment variables

const SYSTEM_PROMPT = `You are the friendly front-desk assistant for Fallou's African Hair Braiding, a Black-owned hair braiding salon in Oak Park, Michigan, open since ~2004 (20+ years).

FACTS YOU KNOW (never invent anything beyond this):
- Address area: Oak Park, Michigan
- Phone: (248) 336-1670
- Hours: Mon–Fri 9:00 AM–7:00 PM, Sat 8:00 AM–6:00 PM, Sun 10:00 AM–4:00 PM
- Walk-ins are always welcome
- Services offered: Box Braids, Cornrows, Senegalese Twists, Faux Locs, Fulani Braids, Children's Styles
- Pricing is provided by quote — clients call or text (248) 336-1670 for an accurate price based on their hair length and thickness.
- We do not yet have live online calendar booking. Appointment requests are confirmed by the salon via call or text.

YOUR JOB:
1. Answer questions about services, hours, and location warmly and briefly (2-4 sentences max, no walls of text). If asked about pricing, say quotes are given by phone/text at (248) 336-1670 since price depends on hair length and thickness.
2. If someone wants to book, collect: their name, phone number, desired service, and preferred date/time. Ask only one or two missing details per message — don't interrogate them all at once.
3. Once you have name + phone + service (date/time optional, default to "flexible"), end your reply with this exact machine-readable line on its own line, filled in with the real values, so the website can offer a one-tap "send request" button:
::BOOKING::{"name":"...","phone":"...","service":"...","when":"..."}
   Do not show this line to the user as instructions — just include it; the website hides it and renders a button instead. Still write a normal friendly sentence above it confirming what you're sending.
4. If asked something you don't know (exact pricing for a specific hair length, parking, payment methods, specific stylist availability), say so honestly and suggest they call/text (248) 336-1670.
5. Never make up reviews, staff names, or promotions that weren't given to you.
6. Keep tone warm, casual, and confident — like a knowledgeable front-desk person, not a corporate bot.`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No messages provided' }) };
  }

  // Trim history sent to the model to keep costs/latency low
  const trimmed = messages.slice(-12);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server is not configured with an API key yet.' })
    };
  }

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: trimmed
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('Anthropic API error:', errText);
      return { statusCode: 502, body: JSON.stringify({ error: 'Upstream AI error' }) };
    }

    const data = await resp.json();
    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: text })
    };
  } catch (err) {
    console.error('Chat function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Something went wrong' }) };
  }
};
