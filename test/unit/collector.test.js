describe('MetricsCollector', () => {
  test('should be importable', () => {
    const Collector = require('../../lib/metrics/collector');
    expect(Collector).toBeDefined();
  });

  test('should create instance with default interval', () => {
    const Collector = require('../../lib/metrics/collector');
    const c = new Collector();
    expect(c.interval).toBe(5000);
  });

  test('should create instance with custom interval', () => {
    const Collector = require('../../lib/metrics/collector');
    const c = new Collector(10000);
    expect(c.interval).toBe(10000);
  });
});
