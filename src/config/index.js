require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  metricsInterval: parseInt(process.env.METRICS_INTERVAL, 10) || 5000,
  dbPath: process.env.DB_PATH || './data/metrics.db',
  logLevel: process.env.LOG_LEVEL || 'info',
  alertThresholds: {
    cpu: parseInt(process.env.ALERT_CPU_THRESHOLD, 10) || 90,
    memory: parseInt(process.env.ALERT_MEM_THRESHOLD, 10) || 85,
  },
};
