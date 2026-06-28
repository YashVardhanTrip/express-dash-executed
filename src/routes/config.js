const express = require('express');
const config = require('../config');
const router = express.Router();

router.get('/', (req, res) => {
  // Return non-sensitive config values
  res.json({
    metricsInterval: config.metricsInterval,
    alertThresholds: config.alertThresholds,
    logLevel: config.logLevel,
  });
});

router.patch('/thresholds', (req, res) => {
  const { cpu, memory } = req.body;
  if (cpu !== undefined) config.alertThresholds.cpu = parseInt(cpu, 10);
  if (memory !== undefined) config.alertThresholds.memory = parseInt(memory, 10);
  res.json({ alertThresholds: config.alertThresholds });
});

module.exports = router;
