const { EventEmitter } = require('events');

class AlertEngine extends EventEmitter {
  constructor(thresholds = {}) {
    super();
    this.thresholds = {
      cpu: thresholds.cpu || 90,
      memory: thresholds.memory || 85,
      disk: thresholds.disk || 90,
    };
    this._cooldowns = new Map();
  }

  check(metrics) {
    const cpuPct = parseFloat(metrics.cpu?.usage || 0);
    const memPct = parseFloat(metrics.memory?.percent || 0);

    if (cpuPct > this.thresholds.cpu && !this._inCooldown('cpu')) {
      this._alert('cpu', cpuPct, this.thresholds.cpu);
    }
    if (memPct > this.thresholds.memory && !this._inCooldown('memory')) {
      this._alert('memory', memPct, this.thresholds.memory);
    }
  }

  _alert(metric, value, threshold) {
    this._cooldowns.set(metric, Date.now() + 300000); // 5 min cooldown
    this.emit('alert', { metric, value, threshold, timestamp: Date.now() });
  }

  _inCooldown(metric) {
    const until = this._cooldowns.get(metric);
    return until && Date.now() < until;
  }
}

module.exports = AlertEngine;
