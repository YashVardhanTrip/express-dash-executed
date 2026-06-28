const express = require('express');
const os = require('os');
const MetricsStore = require('../models/metrics-store');

const router = express.Router();
const store = new MetricsStore();

router.get('/', (req, res) => {
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  res.json({
    timestamp: Date.now(),
    cpu: {
      count: cpus.length,
      model: cpus[0]?.model || 'unknown',
      load: os.loadavg(),
    },
    memory: {
      total: totalMem,
      free: freeMem,
      used: totalMem - freeMem,
      percent: ((1 - freeMem / totalMem) * 100).toFixed(1),
    },
    uptime: os.uptime(),
    platform: os.platform(),
    hostname: os.hostname(),
  });
});

router.get('/history', async (req, res, next) => {
  try {
    const hours = parseInt(req.query.hours, 10) || 24;
    const data = await store.getHistory(hours);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
