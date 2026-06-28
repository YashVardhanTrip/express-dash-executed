/**
 * Store adapter — abstracts the underlying cache store.
 * Currently uses in-memory LRU; could be swapped for Redis/SQLite.
 */

const LRUCache = require('./index');

class StoreAdapter {
  constructor(opts = {}) {
    this.backend = new LRUCache(opts.maxSize || 500);
    this.prefix = opts.prefix || '';
  }

  get(key) {
    return this.backend.get(this.prefix + key);
  }

  set(key, value) {
    this.backend.set(this.prefix + key, value);
  }

  has(key) {
    return this.backend.has(this.prefix + key);
  }

  clear() {
    this.backend.clear();
  }
}

module.exports = StoreAdapter;
