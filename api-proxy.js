const express = require('express');
const fetch = require('node-fetch'); // Install with: npm install node-fetch
const app = express();
const port = process.env.PORT || 3001;

app.get('/api/otx', async (req, res) => {
  try {
    const r = await fetch('https://otx.alienvault.com/api/v1/pulses/subscribed');
    const data = await r.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch OTX" });
  }
});

app.get('/api/cisa', async (req, res) => {
  try {
    const r = await fetch('https://www.cisa.gov/sites/default/files/feeds/alerts.json');
    const data = await r.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch CISA" });
  }
});

app.listen(port, () => console.log(`Proxy running on port ${port}`));