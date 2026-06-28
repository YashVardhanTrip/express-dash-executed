const { execSync } = require('child_process');
const os = require('os');

function getDiskUsage() {
  try {
    if (os.platform() === 'win32') {
      return { available: null, total: null, percent: null };
    }
    const output = execSync('df -k /', { encoding: 'utf8' });
    const lines = output.trim().split('\n');
    if (lines.length < 2) return null;
    const parts = lines[1].split(/\s+/);
    const total = parseInt(parts[1], 10) * 1024;
    const used = parseInt(parts[2], 10) * 1024;
    const available = parseInt(parts[3], 10) * 1024;
    return {
      total,
      used,
      available,
      percent: ((used / total) * 100).toFixed(1),
    };
  } catch (e) {
    return null;
  }
}

module.exports = { getDiskUsage };
