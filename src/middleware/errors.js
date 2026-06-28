const logger = require('../../lib/logger');

function errorHandler(err, req, res, _next) {
  logger.error('Unhandled error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
}

module.exports = { errorHandler };
