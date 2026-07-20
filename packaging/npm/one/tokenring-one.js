#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const platform = process.platform;
const arch = process.arch;
const platformArch = `${platform}-${arch}`;

const supportedPlatforms = new Set([
  'darwin-arm64',
  'darwin-x64',
  'linux-x64',
  'linux-arm64',
]);

if (!supportedPlatforms.has(platformArch)) {
  console.error(`Unsupported platform: ${platformArch}`);
  process.exit(1);
}

const binaryDir = path.join(__dirname, 'bin', platformArch);
const binaryPath = path.join(binaryDir, 'tokenring-one');
const env = { ...process.env };

env['FRONTEND_DIRECTORY'] = path.join(__dirname, 'frontend');

const child = spawn(binaryPath, process.argv.slice(2), { stdio: 'inherit', env });
child.on('error', (error) => {
  console.error(`Failed to start TokenRing One: ${error.message}`);
  process.exit(1);
});
child.on('exit', (code) => process.exit(code ?? 1));
