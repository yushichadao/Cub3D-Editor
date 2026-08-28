<?php
/**
 * /api/geo.php —— 第一方 IP 归属地判定接口（内部消化）
 * 用途：Web 宣传页 / 编辑器加载时判断访客所在国家，用于境内外站点自动分流。
 * 替代原第三方接口（百度 / 太平洋 / ip-api / ipwho.is）：访客 IP 只发往本站自己的服务器，
 * 隐私政策「不会向外部传输您的个人信息」保持不变、无需改动。
 *
 * 部署步骤（境内服务器，站点根 /www/wwwroot/139.196.104.56/）：
 *   1. 本文件上传到站点根目录：/www/wwwroot/139.196.104.56/api/geo.php
 *   2. 下载 GeoLite2-Country.mmdb（MaxMind 免费库，注册账号 → License Key）：
 *        mkdir -p /www/wwwroot/geoip && cd /www/wwwroot/geoip
 *        curl -fsSL "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=你的KEY&suffix=tar.gz" -o g.tar.gz
 *        tar -xzf g.tar.gz --strip-components=1 && rm -f g.tar.gz
 *   3. 读取库二选一：
 *        A. 宝塔面板 → 软件商店 → PHP → 安装扩展 maxminddb（推荐）
 *        B. 纯 PHP 库：cd /www/wwwroot/geoip && composer require maxmind-db/reader
 *   4. nginx 站点配置中增加（不写访问日志，符合隐私政策「不收集个人信息」）：
 *        location = /api/geo.php {
 *            access_log off;
 *            log_not_found off;
 *            include enable-php-80.conf;   # 按宝塔实际 PHP 版本调整
 *        }
 *   5. 月度自动更新（crontab，每月 8 日 4 点）：
 *        0 4 8 * * * cd /www/wwwroot/geoip && curl -fsSL "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=你的KEY&suffix=tar.gz" -o g.tar.gz && tar -xzf g.tar.gz --strip-components=1 && rm -f g.tar.gz
 *
 * 隐私说明：仅接收访客 IP 用于国家判定，不落库、不写日志、判定后即弃；
 * 境外站（GitHub Pages）通过 CORS 跨域调用本接口。
 */
declare(strict_types=1);

// ① 取访客真实 IP（nginx 反代 / 前置 CDN 时取透传头）
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = trim(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0]);
}

// ② 非法 IP 直接拒绝（防注入 / 伪造）
if (!filter_var($ip, FILTER_VALIDATE_IP)) {
    http_response_code(400);
    exit('{"country":null}');
}

// ③ 保留 / 私网 / 回环地址 → null（本地预览、内网访问不触发跳转）
if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
    exit('{"country":null}');
}

// ④ 查询 GeoLite2 国家库（库缺失 / 损坏 / 查不到 → null，客户端安静留在当前站）
$country = null;
$db = '/www/wwwroot/geoip/GeoLite2-Country.mmdb';
if (is_file($db) && is_readable($db)) {
    // 兼容纯 PHP 库（部署步骤 3B）：有 autoload 则加载
    if (is_file('/www/wwwroot/geoip/vendor/autoload.php')) {
        require_once '/www/wwwroot/geoip/vendor/autoload.php';
    }
    try {
        if (class_exists('MaxMind\Db\Reader')) {   // PECL 扩展或 composer 库均可
            $reader = new MaxMind\Db\Reader($db);
            $record = $reader->get($ip);
            $reader->close();
            $country = $record['country']['iso_code'] ?? null;
        }
    } catch (Throwable $e) {
        $country = null;   // 任何异常 → 返回 null，不影响网站可用性
    }
}

// ⑤ 响应（跨域允许境外站 GitHub Pages 调用；1 小时缓存减少重复查询）
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=3600');
header('Access-Control-Allow-Origin: *');
echo json_encode(['country' => $country]);
