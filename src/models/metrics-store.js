const path = require('path');
const fs = require('fs');

class MetricsStore {
  constructor(dbPath) {
    this.dbPath = dbPath || path.join(process.cwd(), 'data', 'metrics.db');
    this._ensureDir();
  }

  _ensureDir() {
    const dir = path.dirname(this.dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  async record(metrics) {
    // In production, this would use better-sqlite3
    // For development, we append to a JSON log
    const logPath = this.dbPath.replace('.db', '.jsonl');
    const line = JSON.stringify({ ...metrics, recorded_at: Date.now() }) + '\n';
    fs.appendFileSync(logPath, line);
  }

  async getHistory(hours = 24) {
    const logPath = this.dbPath.replace('.db', '.jsonl');
    if (!fs.existsSync(logPath)) return [];

    const cutoff = Date.now() - hours * 3600 * 1000;
    return fs
      .readFileSync(logPath, 'utf8')
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .filter((entry) => entry.recorded_at >= cutoff);
  }
}

module.exports = MetricsStore;
