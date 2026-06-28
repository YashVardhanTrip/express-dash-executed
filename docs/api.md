# API Reference

## GET /api/metrics

Returns current system metrics.

### Response

```json
{
  "timestamp": 1719000000000,
  "cpu": {
    "count": 8,
    "model": "Apple M1",
    "load": [1.5, 1.2, 1.0]
  },
  "memory": {
    "total": 17179869184,
    "free": 8589934592,
    "used": 8589934592,
    "percent": "50.0"
  },
  "uptime": 86400,
  "platform": "darwin",
  "hostname": "dev-machine"
}
```

## GET /api/metrics/history

Returns historical metrics.

### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| hours | number | 24 | Hours of history to return |

## GET /api/health

Health check endpoint.

### Response

```json
{
  "status": "ok",
  "uptime": 3600.5,
  "timestamp": 1719000000000
}
```

## WebSocket /ws

Real-time metric stream. Connects and receives metric updates at the configured interval.
