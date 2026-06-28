const AlertEngine = require('../../lib/metrics/alerts');

describe('AlertEngine', () => {
  test('fires alert when threshold exceeded', () => {
    const engine = new AlertEngine({ cpu: 80 });
    const alerts = [];
    engine.on('alert', a => alerts.push(a));

    engine.check({ cpu: { usage: '85' }, memory: { percent: '50' } });
    expect(alerts.length).toBe(1);
    expect(alerts[0].metric).toBe('cpu');
  });

  test('does not fire for values below threshold', () => {
    const engine = new AlertEngine({ cpu: 90 });
    const alerts = [];
    engine.on('alert', a => alerts.push(a));

    engine.check({ cpu: { usage: '50' }, memory: { percent: '50' } });
    expect(alerts.length).toBe(0);
  });

  test('respects cooldown period', () => {
    const engine = new AlertEngine({ cpu: 80 });
    const alerts = [];
    engine.on('alert', a => alerts.push(a));

    engine.check({ cpu: { usage: '85' }, memory: { percent: '50' } });
    engine.check({ cpu: { usage: '90' }, memory: { percent: '50' } });
    expect(alerts.length).toBe(1); // Second alert suppressed by cooldown
  });
});
