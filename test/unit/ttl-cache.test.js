const TTLCache = require('../../lib/cache/ttl-cache');

describe('TTLCache', () => {
  test('stores and retrieves values', () => {
    const cache = new TTLCache(60000);
    cache.set('key', 'value');
    expect(cache.get('key')).toBe('value');
  });

  test('returns null for expired entries', () => {
    const cache = new TTLCache(1); // 1ms TTL
    cache.set('key', 'value');
    // Wait for expiry
    const start = Date.now();
    while (Date.now() - start < 5) {} // busy wait 5ms
    expect(cache.get('key')).toBeNull();
  });

  test('cleanup removes expired entries', () => {
    const cache = new TTLCache(1);
    cache.set('a', 1);
    cache.set('b', 2);
    const start = Date.now();
    while (Date.now() - start < 5) {}
    cache.cleanup();
    expect(cache.store.size).toBe(0);
  });
});
