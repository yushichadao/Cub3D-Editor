// 后台门户系统接口（账户 / 鉴权 / 改密）
// 挂载前缀：/admin/api/portal  （nginx 子路径自适配，代码内统一以 /api/portal 注册）
import crypto from 'crypto';

// 读取当前管理账号密码（与 releaseRouter 共用 admin.json）
function readAdmin() {
  const fs = global.__fs;
  const ADMIN_JSON = global.__ADMIN_JSON;
  try { return JSON.parse(fs.readFileSync(ADMIN_JSON, 'utf8')); }
  catch { return { user: 'yushichadao', pass: 'admin123' }; }
}
function writeAdmin(obj) {
  const fs = global.__fs;
  const ADMIN_JSON = global.__ADMIN_JSON;
  fs.writeFileSync(ADMIN_JSON, JSON.stringify(obj, null, 2));
}
// 令牌即当前密码（与 releaseRouter 同源），保证改密后全系统会话一致失效
function tokenOf(req) { return req.headers['x-admin-token'] || ''; }
function requireAuth(req, res) {
  const a = readAdmin();
  if (tokenOf(req) !== a.pass) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: 'unauthorized' }));
    return false;
  }
  return true;
}

export function registerPortalRouter(app) {
  const fs = global.__fs;
  const DOWNLOADS_DIR = global.__DOWNLOADS_DIR;

  // 登录验证（门户入口）
  app.post('/api/portal/login', (req, res) => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { user, pass } = JSON.parse(body || '{}');
        const a = readAdmin();
        if (user === a.user && pass === a.pass) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, token: pass }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'invalid_credentials' }));
        }
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'bad_request' }));
      }
    });
  });

  // 令牌有效性校验（门户 / 各子系统共享登录态）
  app.get('/api/portal/auth-check', (req, res) => {
    const ok = requireAuth(req, res);
    if (!ok) return;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
  });

  // 修改管理密码（门户账户安全）
  app.post('/api/portal/passwd', (req, res) => {
    const ok = requireAuth(req, res);
    if (!ok) return;
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { old, next } = JSON.parse(body || '{}');
        const a = readAdmin();
        if (old !== a.pass) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'old_mismatch' }));
          return;
        }
        a.pass = next;
        writeAdmin(a);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, token: next }));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'bad_request' }));
      }
    });
  });
}
