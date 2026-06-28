/**
 * Input validation helpers
 */

function validatePort(port) {
  const p = parseInt(port, 10);
  return Number.isInteger(p) && p > 0 && p < 65536;
}

function validateInterval(ms) {
  const v = parseInt(ms, 10);
  return Number.isInteger(v) && v >= 1000 && v <= 300000;
}

function validateThreshold(value) {
  const v = parseFloat(value);
  return !isNaN(v) && v >= 0 && v <= 100;
}

module.exports = { validatePort, validateInterval, validateThreshold };
