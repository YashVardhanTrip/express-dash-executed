/**
 * Simple API key authentication middleware.
 * Set DASH_API_KEY in .env to enable.
 */
module.exports = function auth(req, res, next) {
  const apiKey = process.env.DASH_API_KEY;
  if (!apiKey) return next(); // Auth disabled

  const provided = req.headers['x-api-key'] || req.query.api_key;
  if (provided !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};
