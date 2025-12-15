import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const HOST = '0.0.0.0';

// Path to the Nuxt output server
const serverPath = join(__dirname, '.output', 'server', 'index.mjs');

console.log(`Starting server on http://${HOST}:${PORT}`);
console.log(`Server path: ${serverPath}`);

// Set environment variables for the Nuxt server
const env = {
  ...process.env,
  PORT: PORT.toString(),
  HOST: HOST,
  NODE_ENV: 'production'
};

// Spawn the Nuxt server process
const serverProcess = spawn('node', [serverPath], {
  env,
  stdio: 'inherit'
});

serverProcess.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

serverProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Server process exited with code ${code}`);
    process.exit(code || 1);
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  serverProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  serverProcess.kill('SIGINT');
});
