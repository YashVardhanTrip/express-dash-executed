const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const level = LEVELS[process.env.LOG_LEVEL] ?? LEVELS.info;

function log(lvl, ...args) {
  if (LEVELS[lvl] <= level) {
    const ts = new Date().toISOString();
    const msg = `[${ts}] [${lvl.toUpperCase()}] ${args.join(' ')}`;
    process.stderr.write(msg + '\n');
  }
}

module.exports = {
  error: (...args) => log('error', ...args),
  warn: (...args) => log('warn', ...args),
  info: (...args) => log('info', ...args),
  debug: (...args) => log('debug', ...args),
  stream: { write: (msg) => log('info', msg.trim()) },
};
