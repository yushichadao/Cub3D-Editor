// 后台门户系统接口（账户 / 鉴权 / 改密）
// 挂载前缀：/admin/api/portal  （nginx 子路径自适配，代码内统一以 /api/portal 注册）
// 密码与令牌的安全存储统一由 auth.mjs 负责（scrypt 加盐哈希 / tokenHash 摘要）
import { readAdmin, requireAuth, login, changePassword } from './auth.mjs';

export function registerPortalRouter(app) {
  const fs = global.__fs;
  const DOWNLOADS_DIR = global.__DOWNLOADS_DIR;

  // 登录验证（门户入口）：成功签发随机会话令牌（旧明文格式首次登录自动升级迁移）
  app.post('/api/portal/login', (req, res) => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { user, pass } = JSON.parse(body || '{}');
        const r = login(user, pass);
        if (r.ok) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, token: r.token }));
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

  // 修改管理密码（门户账户安全）：改密后旧令牌立即失效，返回新令牌
  app.post('/api/portal/passwd', (req, res) => {
    const ok = requireAuth(req, res);
    if (!ok) return;
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { old, next } = JSON.parse(body || '{}');
        if (!old || !next) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'bad_request' }));
          return;
        }
        const r = changePassword(old, next);
        if (!r.ok) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: r.error || 'old_mismatch' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, token: r.token }));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'bad_request' }));
      }
    });
  });
}
