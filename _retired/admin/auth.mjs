/**
 * admin/auth.mjs — 管理账号与鉴权（portal / release / packer 三子系统统一使用）
 *
 * 安全要点：
 *   1) 密码不落明文：admin.json 仅存 scrypt 加盐哈希（salt + hash），不存原始密码
 *   2) 令牌不落明文：登录/改密签发 32B 随机令牌，落盘仅存 sha256 摘要（tokenHash）
 *   3) 恒时比较：密码 / 令牌校验均经 crypto.timingSafeEqual，避免时序侧信道
 *   4) 旧格式兼容：存量 admin.json 若为明文 pass，首次登录成功后自动升级迁移为哈希
 *
 * admin.json 最终 schema：
 *   { user: string, salt: string, hash: string, tokenHash: string }
 */
import crypto from 'crypto';

const DEFAULT_ADMIN = { user: 'yushichadao', pass: 'admin123' };

function fs() { return global.__fs; }
function adminFile() { return global.__ADMIN_JSON; }

export function readAdmin() {
  try { return JSON.parse(fs().readFileSync(adminFile(), 'utf8')); }
  catch { return { ...DEFAULT_ADMIN }; }
}
export function writeAdmin(obj) {
  fs().writeFileSync(adminFile(), JSON.stringify(obj, null, 2));
}

// ---------- 密码哈希（scrypt + 随机盐） ----------
export function hashPassword(pass, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(String(pass), salt, 64).toString('hex');
  return { salt, hash };
}
export function verifyPassword(pass, admin) {
  if (!admin || !admin.hash || !admin.salt) return false;
  const hash = crypto.scryptSync(String(pass), admin.salt, 64).toString('hex');
  return timingSafe(hash, admin.hash);
}
export function isHashed(admin) { return !!(admin && admin.hash && admin.salt); }

// ---------- 会话令牌（仅存摘要） ----------
export function makeToken() { return crypto.randomBytes(32).toString('hex'); }
export function tokenDigest(token) { return crypto.createHash('sha256').update(String(token)).digest('hex'); }

export function tokenOf(req) { return req.headers['x-admin-token'] || ''; }

export function timingSafe(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// 令牌校验：优先 tokenHash；旧格式（token=明文密码）仅作迁移前过渡兼容
export function verifyToken(token, admin) {
  if (!token || !admin) return false;
  // 多会话：tokens 数组中的任一摘要命中即通过（旧 tokenHash 字段作为兼容一并纳入）
  const list = admin.tokens || (admin.tokenHash ? [admin.tokenHash] : []);
  const d = tokenDigest(token);
  return list.some(t => timingSafe(d, t));
}

export function requireAuth(req, res) {
  if (verifyToken(tokenOf(req), readAdmin())) return true;
  res.writeHead(401, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'unauthorized' }));
  return false;
}

// ---------- 登录 / 改密（均自动完成旧明文升级迁移） ----------
export function login(user, pass) {
  const a = readAdmin();
  if (user !== a.user) return { ok: false };
  if (isHashed(a)) {
    if (!verifyPassword(pass, a)) return { ok: false };
  } else {
    if (!a.pass || !timingSafe(String(pass), a.pass)) return { ok: false };
    const ph = hashPassword(pass);
    a.salt = ph.salt; a.hash = ph.hash; delete a.pass; // 升级：移除明文
  }
  const token = makeToken();
  a.tokens = a.tokens || [];
  if (a.tokenHash && !a.tokens.includes(a.tokenHash)) a.tokens.push(a.tokenHash); // 迁移旧字段
  a.tokens.push(tokenDigest(token));
  if (a.tokens.length > 12) a.tokens = a.tokens.slice(-12); // 限制并发会话数
  delete a.tokenHash;
  writeAdmin(a);
  return { ok: true, token };
}

export function changePassword(oldPass, nextPass) {
  const a = readAdmin();
  if (isHashed(a)) {
    if (!verifyPassword(oldPass, a)) return { ok: false, error: 'old_mismatch' };
  } else {
    if (!a.pass || !timingSafe(String(oldPass), a.pass)) return { ok: false, error: 'old_mismatch' };
  }
  const ph = hashPassword(nextPass);
  a.salt = ph.salt; a.hash = ph.hash; delete a.pass;
  const token = makeToken();
  a.tokens = [tokenDigest(token)]; // 改密清空所有旧会话，强制重新登录
  delete a.tokenHash;
  writeAdmin(a);
  return { ok: true, token };
}
