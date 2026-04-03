const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.post('/roll', function(req, res) {
  var webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) return res.status(500).json({ error: 'Webhook not configured' });

  fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  })
  .then(function(r) { res.json({ ok: true, status: r.status }); })
  .catch(function(e) { res.status(500).json({ error: e.message }); });
});

app.get('/health', function(req, res) { res.json({ ok: true }); });

app.listen(process.env.PORT || 3000, function() {
  console.log('AiME proxy running');
});