#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const platformArch = `${process.platform}-${process.arch}`;
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

const binaryPath = path.join(__dirname, 'bin', platformArch, 'tokenring');
const env = { ...process.env };

// Make the native backend from the npm dependency discoverable by the CLI.
// Point directly at the child binary so the Rust process owns its lifecycle.
const onePackageDirectory = path.dirname(require.resolve('@tokenring/one/package.json'));
env.TOKENRING_ONE_BINARY ??= path.join(
  onePackageDirectory,
  'bin',
  platformArch,
  'tokenring-one',
);
env.FRONTEND_DIRECTORY ??= path.join(onePackageDirectory, 'frontend');

const child = spawn(binaryPath, process.argv.slice(2), { stdio: 'inherit', env });
child.on('error', (error) => {
  console.error(`Failed to start TokenRing CLI: ${error.message}`);
  process.exit(1);
});
child.on('exit', (code) => process.exit(code ?? 1));
