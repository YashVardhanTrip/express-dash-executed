const LRUCache = require('../../lib/cache');

describe('LRUCache', () => {
  test('stores and retrieves values', () => {
    const cache = new LRUCache(10);
    cache.set('a', 1);
    expect(cache.get('a')).toBe(1);
  });

  test('returns null for missing keys', () => {
    const cache = new LRUCache(10);
    expect(cache.get('missing')).toBeNull();
  });

  test('evicts oldest entry when full', () => {
    const cache = new LRUCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);
    expect(cache.get('a')).toBeNull();
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBe(3);
  });

  test('updates existing key position', () => {
    const cache = new LRUCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a'); // moves 'a' to most recent
    cache.set('c', 3);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBeNull();
  });

  test('reports correct size', () => {
    const cache = new LRUCache(5);
    cache.set('x', 1);
    cache.set('y', 2);
    expect(cache.size).toBe(2);
  });
});
