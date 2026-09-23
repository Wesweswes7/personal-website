import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const option = (flag, fallback) =>
  args.includes(flag) ? args[args.indexOf(flag) + 1] : fallback;
const port = Number(option('--port', '4173'));
const base = option('--base', process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(
  /\/$/,
  '',
);
const root = path.resolve('out');
if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('Build the site first: npm run build');
  process.exit(1);
}
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};
http
  .createServer((req, res) => {
    let url;
    try {
      url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      res.writeHead(400);
      res.end();
      return;
    }
    if (url === base && base) {
      res.writeHead(302, { Location: `${base}/` });
      res.end();
      return;
    }
    if (base && !url.startsWith(`${base}/`)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    url = url.slice(base.length);
    let target = path.resolve(root, `.${url}`);
    if (target !== root && !target.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      if (!url.endsWith('/')) {
        res.writeHead(302, { Location: `${base}${url}/` });
        res.end();
        return;
      }
      target = path.join(target, 'index.html');
    }
    let code = 200;
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      target = path.join(root, '404.html');
      code = 404;
    }
    if (!fs.existsSync(target)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(code, {
      'Content-Type': types[path.extname(target)] ?? 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    if (req.method === 'HEAD') res.end();
    else fs.createReadStream(target).pipe(res);
  })
  .listen(port, '127.0.0.1', () =>
    console.log(`Local preview: http://127.0.0.1:${port}${base}/`),
  );
