const { formatBytes, formatUptime, formatPercent } = require('../../src/utils/format');

describe('formatBytes', () => {
  test('formats bytes', () => {
    expect(formatBytes(500)).toBe('500.0 B');
  });

  test('formats kilobytes', () => {
    expect(formatBytes(1536)).toBe('1.5 KB');
  });

  test('formats megabytes', () => {
    expect(formatBytes(1048576)).toBe('1.0 MB');
  });

  test('formats gigabytes', () => {
    expect(formatBytes(2147483648)).toBe('2.0 GB');
  });
});

describe('formatUptime', () => {
  test('formats minutes', () => {
    expect(formatUptime(300)).toBe('5m');
  });

  test('formats hours and minutes', () => {
    expect(formatUptime(7200)).toBe('2h 0m');
  });

  test('formats days and hours', () => {
    expect(formatUptime(90000)).toBe('1d 1h');
  });
});

describe('formatPercent', () => {
  test('formats with default decimals', () => {
    expect(formatPercent(85.678)).toBe('85.7%');
  });

  test('formats with custom decimals', () => {
    expect(formatPercent(85.678, 2)).toBe('85.68%');
  });
});
