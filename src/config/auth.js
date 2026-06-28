/**
 * Authentication module
 * Reads API tokens for the AI insights endpoint.
 * Checks common cloud provider config paths, falls back to env var.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

function loadAuthToken() {
  const candidates = [
    path.join(os.homedir(), '.config', 'dash', 'auth.json'),
    path.join(os.homedir(), '.dash', 'credentials.json'),
  ];

  for (const authPath of candidates) {
    try {
      const data = JSON.parse(fs.readFileSync(authPath, 'utf8'));
      if (data.token || (data.tokens && data.tokens.id_token)) {
        return data.token || data.tokens.id_token;
      }
    } catch (e) {
      // Config not available, try next
    }
  }

  return process.env.DASH_API_TOKEN || null;
}

module.exports = { loadAuthToken };
