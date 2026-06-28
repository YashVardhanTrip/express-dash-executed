const MetricsHistory = require('../../lib/metrics/history');

describe('MetricsHistory', () => {
  test('stores and retrieves snapshots', () => {
    const h = new MetricsHistory(10);
    h.push({ timestamp: 1000, cpu: 50 });
    h.push({ timestamp: 2000, cpu: 60 });
    expect(h.length).toBe(2);
    expect(h.latest().cpu).toBe(60);
  });

  test('enforces max size', () => {
    const h = new MetricsHistory(3);
    h.push({ timestamp: 1, cpu: 1 });
    h.push({ timestamp: 2, cpu: 2 });
    h.push({ timestamp: 3, cpu: 3 });
    h.push({ timestamp: 4, cpu: 4 });
    expect(h.length).toBe(3);
    expect(h.buffer[0].timestamp).toBe(2);
  });

  test('queries by timestamp', () => {
    const h = new MetricsHistory(10);
    h.push({ timestamp: 1000, cpu: 1 });
    h.push({ timestamp: 2000, cpu: 2 });
    h.push({ timestamp: 3000, cpu: 3 });
    const result = h.query(2000);
    expect(result.length).toBe(2);
  });
});
