const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { WebSocketServer } = require('ws');
const http = require('http');

const config = require('./config');
const metricsRouter = require('./routes/metrics');
const healthRouter = require('./routes/health');
const { errorHandler } = require('./middleware/errors');
const { requestLogger } = require('./middleware/logging');
const MetricsCollector = require('../lib/metrics/collector');
const logger = require('../lib/logger');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));
app.use(requestLogger);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/api/metrics', metricsRouter);
app.use('/api/health', healthRouter);

app.get('/', (req, res) => {
  res.render('dashboard', { title: 'node-dash' });
});

// Error handling
app.use(errorHandler);

// WebSocket for real-time metrics
const wss = new WebSocketServer({ server, path: '/ws' });
const collector = new MetricsCollector(config.metricsInterval);

wss.on('connection', (ws) => {
  logger.info('WebSocket client connected');

  const handler = (metrics) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(metrics));
    }
  };

  collector.on('metrics', handler);
  ws.on('close', () => {
    collector.removeListener('metrics', handler);
    logger.info('WebSocket client disconnected');
  });
});

collector.start();

const port = config.port;
server.listen(port, () => {
  logger.info(`node-dash running on :${port}`);
});

module.exports = app;
