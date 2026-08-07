const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

const port = 8090;

// 触屏版后缀：访问这些路径会重定向到 /?touch，强制启用应用的移动/触屏布局
// （index.html 内 FORCE_TOUCH 已支持 ?touch / ?touch=1 / ?mobile）
const TOUCH_PREFIXES = ['/touch', '/m', '/mobile'];

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function lanIp() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return null;
}

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, 'http://localhost');
  let pathname = parsed.pathname;

  // 触屏版后缀 -> 重定向到 /?touch
  if (TOUCH_PREFIXES.includes(pathname.toLowerCase())) {
    res.writeHead(302, { 'Location': '/?touch' });
    return res.end();
  }

  let urlPath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(__dirname, urlPath.split('?')[0]);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found: ' + req.url);
    } else {
      res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
      res.end(data);
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Port ' + port + ' is already in use.');
    console.log('Please stop the process occupying port ' + port + ' and try again.');
    console.log('  You can find it with:  netstat -ano | findstr :' + port);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

server.listen(port, '0.0.0.0', () => {
  const ip = lanIp();
  console.log('===== 3D 编辑器本地服务已启动 =====');
  console.log('电脑版（主站）:  http://localhost:' + port + '/');
  console.log('手机版（触屏版）: http://localhost:' + port + '/touch   (主站后加后缀 /touch)');
  if (ip) {
    console.log('--- 手机通过同一 WiFi/局域网访问 ---');
    console.log('电脑版:  http://' + ip + ':' + port + '/');
    console.log('手机版:  http://' + ip + ':' + port + '/touch');
  }
  console.log('==================================');
});
