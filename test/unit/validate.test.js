const { validatePort, validateInterval, validateThreshold } = require('../../src/utils/validate');

describe('validatePort', () => {
  test('accepts valid ports', () => {
    expect(validatePort(3000)).toBe(true);
    expect(validatePort(8080)).toBe(true);
    expect(validatePort(443)).toBe(true);
  });

  test('rejects invalid ports', () => {
    expect(validatePort(0)).toBe(false);
    expect(validatePort(-1)).toBe(false);
    expect(validatePort(70000)).toBe(false);
    expect(validatePort('abc')).toBe(false);
  });
});

describe('validateInterval', () => {
  test('accepts valid intervals', () => {
    expect(validateInterval(1000)).toBe(true);
    expect(validateInterval(5000)).toBe(true);
  });

  test('rejects too small intervals', () => {
    expect(validateInterval(500)).toBe(false);
  });

  test('rejects too large intervals', () => {
    expect(validateInterval(500000)).toBe(false);
  });
});

describe('validateThreshold', () => {
  test('accepts valid thresholds', () => {
    expect(validateThreshold(50)).toBe(true);
    expect(validateThreshold(0)).toBe(true);
    expect(validateThreshold(100)).toBe(true);
  });

  test('rejects out of range', () => {
    expect(validateThreshold(-1)).toBe(false);
    expect(validateThreshold(101)).toBe(false);
  });
});
