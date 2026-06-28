#!/usr/bin/env node

/**
 * Production build script.
 * Copies necessary files and creates a deployment package.
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

// Clean dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy source files
const dirs = ['src', 'lib'];
for (const dir of dirs) {
  const src = path.join(__dirname, '..', dir);
  const dest = path.join(distDir, dir);
  copyDir(src, dest);
}

// Copy package.json with production config
const pkg = require('../package.json');
delete pkg.devDependencies;
delete pkg.scripts.dev;
delete pkg.scripts.lint;
delete pkg.scripts.prepare;
fs.writeFileSync(
  path.join(distDir, 'package.json'),
  JSON.stringify(pkg, null, 2)
);

console.log('Build complete: dist/');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
