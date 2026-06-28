const express = require('express');
const router = express.Router();

// In-memory alert store (would use DB in production)
const alerts = [];

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 50;
  res.json(alerts.slice(-limit));
});

router.post('/', (req, res) => {
  const { metric, value, threshold, message } = req.body;
  if (!metric || value === undefined) {
    return res.status(400).json({ error: 'metric and value required' });
  }
  const alert = {
    id: alerts.length + 1,
    timestamp: Date.now(),
    metric,
    value,
    threshold: threshold || null,
    message: message || `${metric} alert: ${value}`,
    acknowledged: false,
  };
  alerts.push(alert);
  res.status(201).json(alert);
});

router.patch('/:id/acknowledge', (req, res) => {
  const alert = alerts.find(a => a.id === parseInt(req.params.id, 10));
  if (!alert) return res.status(404).json({ error: 'Alert not found' });
  alert.acknowledged = true;
  alert.acknowledgedAt = Date.now();
  res.json(alert);
});

module.exports = router;
