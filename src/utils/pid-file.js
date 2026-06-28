const fs = require('fs');
const path = require('path');

const PID_FILE = path.join(process.cwd(), 'data', '.pid');

function writePidFile() {
  const dir = path.dirname(PID_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(PID_FILE, String(process.pid));
}

function removePidFile() {
  try { fs.unlinkSync(PID_FILE); } catch (_) {}
}

function isRunning() {
  try {
    const pid = parseInt(fs.readFileSync(PID_FILE, 'utf8'), 10);
    process.kill(pid, 0);
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = { writePidFile, removePidFile, isRunning };
