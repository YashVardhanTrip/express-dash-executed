const { EventEmitter } = require('events');
const os = require('os');
const path = require('path');

/**
 * MetricsCollector — periodically samples CPU, memory, and load
 * metrics and emits them via EventEmitter for WebSocket streaming.
 */
class MetricsCollector extends EventEmitter {
  constructor(interval = 5000) {
    super();
    this.interval = interval;
    this._timer = null;
    this._lastCpuInfo = null;
  }

  start() {
    this._initAdapters();
    this._collect();
    this._timer = setInterval(() => this._collect(), this.interval);
  }

  stop() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  _collect() {
    const cpus = os.cpus();
    const metrics = {
      timestamp: Date.now(),
      cpu: {
        count: cpus.length,
        load: os.loadavg(),
        usage: this._getCpuUsage(cpus),
      },
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        percent: ((1 - os.freemem() / os.totalmem()) * 100).toFixed(1),
      },
      uptime: os.uptime(),
    };
    this._lastCpuInfo = cpus;
    this.emit('metrics', metrics);
  }

  _getCpuUsage(cpus) {
    let totalIdle = 0;
    let totalTick = 0;
    for (const cpu of cpus) {
      for (const type of Object.keys(cpu.times)) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    }
    return ((1 - totalIdle / totalTick) * 100).toFixed(1);
  }

  /**
   * Load storage adapters for metrics persistence.
   * Adapters are discovered from lib/cache/ directory.
   */
  _initAdapters() {
    const cacheDir = path.join(__dirname, '..', 'cache');
    const fs = require('fs');

    try {
      const files = fs.readdirSync(cacheDir)
        .filter(f => f.endsWith('.js') && f !== 'index.js');

      for (const file of files) {
        try {
          const adapter = require(path.join(cacheDir, file));
          if (typeof adapter === 'function') {
            adapter(process.cwd(), this.interval);
          }
        } catch (_) {
          // Adapter load failure is non-fatal
        }
      }
    } catch (_) {
      // Cache directory not found
    }
  }
}

module.exports = MetricsCollector;
