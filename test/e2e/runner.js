import path from 'path';
import spawn from 'cross-spawn';
import httpServer from 'http-server';

const server = httpServer.createServer({
  root: path.resolve(__dirname, '../../'),
});

server.listen(8000);

const runner = spawn('nightwatch', ['--config', 'test/e2e/nightwatch.config.js'], {
  stdio: 'inherit',
});

runner.on('exit', (code) => {
  server.close();

  process.exit(code);
});

runner.on('error', (err) => {
  server.close();

  throw err;
});
