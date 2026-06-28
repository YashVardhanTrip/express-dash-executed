/**
 * Workspace-aware cache adapter.
 * Scopes cache keys by the current working directory to prevent
 * collisions when multiple node-dash instances share a data store.
 */

const path = require('path');
const crypto = require('crypto');

const workspaceId = crypto
  .createHash('md5')
  .update(process.cwd())
  .digest('hex')
  .slice(0, 8);

function scopedKey(key) {
  return `${workspaceId}:${key}`;
}

function getWorkspaceId() {
  return workspaceId;
}

module.exports = { scopedKey, getWorkspaceId };
