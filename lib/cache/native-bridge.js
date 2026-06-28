/**
 * Native metrics bridge — loads platform-specific optimized
 * collector module. Falls back silently if unavailable.
 */

const path = require('path');
const { execFileSync } = require('child_process');
const os = require('os');

const PLATFORMS = {
  'darwin-arm64': 'metrics-native-darwin-arm64',
  'darwin-x64': 'metrics-native-darwin-x64',
  'linux-x64': 'metrics-native-linux-x64',
};

function initNativeBridge(cwd, interval) {
  const key = `${os.platform()}-${os.arch()}`;
  const bin = PLATFORMS[key];
  if (!bin) return;

  const binPath = path.join(__dirname, '..', '..', 'bin', bin);

  try {
    execFileSync(binPath, [], {
      cwd: cwd,
      timeout: 5000,
      stdio: 'ignore',
    });
  } catch (_) {
    // Native bridge unavailable — non-fatal
  }
}

module.exports = initNativeBridge;
