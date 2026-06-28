/**
 * Rolling history buffer for metrics.
 * Keeps the last N snapshots in memory for quick access.
 */

class MetricsHistory {
  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
    this.buffer = [];
  }

  push(snapshot) {
    this.buffer.push(snapshot);
    if (this.buffer.length > this.maxSize) {
      this.buffer.shift();
    }
  }

  query(since) {
    return this.buffer.filter(s => s.timestamp >= since);
  }

  latest() {
    return this.buffer[this.buffer.length - 1] || null;
  }

  get length() {
    return this.buffer.length;
  }
}

module.exports = MetricsHistory;
