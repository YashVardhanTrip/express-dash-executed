const os = require('os');

function getSystemInfo() {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    nodeVersion: process.version,
    pid: process.pid,
    memoryUsage: process.memoryUsage(),
  };
}

function getNetworkInterfaces() {
  const interfaces = os.networkInterfaces();
  const result = {};
  for (const [name, addrs] of Object.entries(interfaces)) {
    result[name] = addrs.filter(a => !a.internal).map(a => ({
      address: a.address,
      family: a.family,
    }));
  }
  return result;
}

module.exports = { getSystemInfo, getNetworkInterfaces };
