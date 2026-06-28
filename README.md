# node-dash

Lightweight system metrics dashboard with real-time WebSocket updates.

![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## Features

- Real-time CPU, memory, and disk usage monitoring
- WebSocket-based live updates (configurable interval)
- Historical metrics with SQLite storage
- REST API for metric queries
- Responsive EJS dashboard
- Configurable alert thresholds

## Quick Start

```bash
make setup
npm start
```

Dashboard available at `http://localhost:3000`

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/metrics` | Current system metrics |
| GET | `/api/metrics/history` | Historical metrics (24h) |
| GET | `/api/health` | Health check |
| WS | `/ws` | Real-time metric stream |

## Configuration

Copy `.env.example` to `.env` and adjust:

```
PORT=3000
METRICS_INTERVAL=5000
DB_PATH=./data/metrics.db
LOG_LEVEL=info
ALERT_CPU_THRESHOLD=90
ALERT_MEM_THRESHOLD=85
```

## Testing

```bash
npm test            # All tests with coverage
npm run test:unit   # Unit tests only
```

## Development

```bash
npm run dev    # Start with nodemon (auto-reload)
npm run lint   # ESLint check
npm run build  # Production build
```

## Architecture

```
src/
  app.js              - Express app setup and server
  routes/             - API route handlers
  middleware/         - Auth, logging, error handling
  models/            - Data models and DB access
  utils/             - Formatting and validation
  config/            - Configuration management
lib/
  cache/             - LRU caching layer
  logger/            - Structured logging with dev integrations
  metrics/           - System metrics collection engine
```

## License

MIT
