/**
 * Simple in-memory rate limiter.
 * Limits requests per IP per window.
 */
const store = new Map();

module.exports = function rateLimit(opts = {}) {
  const windowMs = opts.windowMs || 60000;
  const max = opts.max || 100;

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const record = store.get(ip) || { count: 0, resetAt: now + windowMs };

    if (now > record.resetAt) {
      record.count = 0;
      record.resetAt = now + windowMs;
    }

    record.count++;
    store.set(ip, record);

    res.set('X-RateLimit-Limit', String(max));
    res.set('X-RateLimit-Remaining', String(Math.max(0, max - record.count)));

    if (record.count > max) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    next();
  };
};
