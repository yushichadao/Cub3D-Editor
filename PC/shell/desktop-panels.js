/* ==========================================================================
   桌面版管理面板：插件 / 运行时与库 / 语言包 / 开发指南
   全部由脚本动态构建，不侵入 index.html 既有 DOM 结构。
   ========================================================================== */
(function () {
  'use strict';

  var D = window.desktop;
  if (!D || !D.isDesktop) return;

  var K = null, mask = null, body = null, subEl = null, cur = 'plugins';
  var logBuf = [];

  /* --------------------------------- 骨架 --------------------------------- */

  var TABS = [
    { id: 'plugins', label: '插件', sub: '用任意编程语言扩展编辑器' },
    { id: 'runtimes', label: '运行时与库', sub: '安装语言运行时与第三方库' },
    { id: 'langpacks', label: '语言包', sub: '安装与切换界面语言' },
    { id: 'guide', label: '开发指南', sub: '插件接口速查' }
  ];

  function build() {
    mask = document.createElement('div');
    mask.className = 'dk-mask';
    mask.innerHTML =
      '<div class="dk-panel">' +
        '<div class="dk-head">' +
          '<span class="dk-title">扩展中心</span>' +
          '<span class="dk-sub" id="dk-sub"></span>' +
          '<span class="sp"></span>' +
          '<button class="dk-x" title="关闭">✕</button>' +
        '</div>' +
        '<div class="dk-tabs"></div>' +
        '<div class="dk-body"></div>' +
      '</div>';
    document.body.appendChild(mask);

    var tabs = mask.querySelector('.dk-tabs');
    TABS.forEach(function (t) {
      var b = document.createElement('button');
      b.className = 'dk-tab';
      b.textContent = t.label;
      b.setAttribute('data-tab', t.id);
      b.addEventListener('click', function () { open(t.id); });
      tabs.appendChild(b);
    });

    body = mask.querySelector('.dk-body');
    subEl = mask.querySelector('#dk-sub');
    mask.querySelector('.dk-x').addEventListener('click', close);
    mask.addEventListener('click', function (e) { if (e.target === mask) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mask.classList.contains('show')) close();
    });
  }

  function open(tab) {
    if (!mask) build();
    cur = tab || cur;
    mask.classList.add('show');
    var t = TABS.find(function (x) { return x.id === cur; });
    subEl.textContent = t ? t.sub : '';
    mask.querySelectorAll('.dk-tab').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-tab') === cur);
    });
    render();
  }

  function close() { if (mask) mask.classList.remove('show'); }

  function render() {
    if (cur === 'plugins') renderPlugins();
    else if (cur === 'runtimes') renderRuntimes();
    else if (cur === 'langpacks') renderLangpacks();
    else renderGuide();
  }

  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function say(m) { if (K && K.toast) K.toast(m); }

  /* -------------------------------- 插件页 -------------------------------- */

  function statusText(s) { return { running: '运行中', starting: '启动中', stopped: '未运行', error: '异常' }[s] || s; }
  var STATUS_CLS = { running: 'run', starting: 'warn', stopped: '', error: 'err' };

  function renderPlugins() {
    body.innerHTML = '<div class="dk-tip">插件运行在独立进程中，通过标准输入输出与编辑器通信，' +
      '因此 <b>任何能读写 stdio 的语言都可以写插件</b>。放入插件目录后点击「重新扫描」即可加载。</div>' +
      '<div class="row" style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">' +
      '<button class="dk-btn primary" id="p-install">安装插件（文件夹）</button>' +
      '<button class="dk-btn" id="p-folder">打开插件目录</button>' +
      '<button class="dk-btn" id="p-rescan">重新扫描</button>' +
      '<button class="dk-btn" id="p-console">插件控制台</button>' +
      '</div><div id="p-list"></div>';

    body.querySelector('#p-install').onclick = function () {
      D.plugin.installDir().then(function (r) {
        if (r.ok) { say('已安装：' + r.pluginId); renderPlugins(); }
        else if (!r.canceled) say(r.message || '安装失败');
      });
    };
    body.querySelector('#p-folder').onclick = function () { D.plugin.openFolder(); };
    body.querySelector('#p-rescan').onclick = function () { renderPlugins(); say('已重新扫描'); };
    body.querySelector('#p-console').onclick = function () { D.plugin.openConsole(); };

    var list = body.querySelector('#p-list');
    D.plugin.list().then(function (r) {
      var items = (r && r.list) || [];
      if (!items.length) {
        list.innerHTML = '<div class="dk-empty">还没有安装任何插件<br>可以先看看<b>「开发指南」</b>，十几行代码就能写出第一个插件</div>';
        return;
      }
      list.innerHTML = '';
      items.forEach(function (p) { list.appendChild(pluginCard(p)); });
    });
  }

  function pluginCard(p) {
    var card = el('<div class="dk-card"></div>');
    var st = statusText(p.status) || p.status;
    var cls = STATUS_CLS[p.status] || '';
    card.innerHTML =
      '<div class="row">' +
        '<span class="name">' + esc(p.name) + '</span>' +
        '<span class="badge">' + esc(p.language) + '</span>' +
        '<span class="badge">v' + esc(p.version) + '</span>' +
        '<span class="badge ' + cls + '">' + esc(st) + '</span>' +
        (p.runtimeReady ? '' : '<span class="badge err">运行时缺失</span>') +
        (p.builtin ? '<span class="badge">内置</span>' : '') +
        '<span class="sp"></span>' +
        '<button class="dk-btn" data-a="toggle">' + (p.status === 'running' ? '停止' : '启动') + '</button>' +
        '<button class="dk-btn" data-a="log">日志</button>' +
        '<button class="dk-btn" data-a="dir">目录</button>' +
        '<button class="dk-btn" data-a="enable">' + (p.enabled ? '禁用' : '启用') + '</button>' +
        (p.builtin ? '' : '<button class="dk-btn danger" data-a="del">删除</button>') +
      '</div>' +
      (p.description ? '<div class="desc">' + esc(p.description) + '</div>' : '') +
      '<div class="meta">' + esc(p.dir) + (p.error ? '　⚠ ' + esc(p.error) : '') + '</div>' +
      '<div class="dk-cmds"></div>' +
      '<div class="dk-log" style="display:none;height:150px;margin-top:10px"></div>';

    var cmds = card.querySelector('.dk-cmds');
    (p.commands || []).forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'dk-cmd';
      b.textContent = '▶ ' + (c.title || c.id);
      b.onclick = function () {
        b.disabled = true;
        b.textContent = '⏳ ' + (c.title || c.id);
        D.plugin.invoke(p.id, c.id, {}).then(function (r) {
          b.disabled = false;
          b.textContent = '▶ ' + (c.title || c.id);
          if (r.ok) say('已执行：' + (c.title || c.id));
          else say('执行失败：' + (r.message || 'unknown error'));
        });
      };
      cmds.appendChild(b);
    });
    if (!(p.commands || []).length) {
      cmds.innerHTML = '<span style="font-size:12px;color:var(--text-dim)">该插件未声明命令</span>';
    }

    var logBox = card.querySelector('.dk-log');
    card.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-a]');
      if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'toggle') {
        var fn = p.status === 'running' ? D.plugin.stop : D.plugin.start;
        fn(p.id).then(function (r) {
          if (r && r.ok === false) say(r.message || '操作失败：');
          setTimeout(renderPlugins, 400);
        });
      } else if (a === 'log') {
        if (logBox.style.display === 'none') {
          D.plugin.logs(p.id).then(function (r) {
            logBox.innerHTML = ((r && r.logs) || []).map(function (x) {
              return '<div class="l-' + (x.level === 'error' ? 'error' : x.level === 'warn' ? 'warn' : '') + '">' +
                new Date(x.time).toLocaleTimeString() + '  ' + esc(x.message) + '</div>';
            }).join('') || '<div style="color:#666">（暂无日志）</div>';
            logBox.style.display = 'block';
            logBox.scrollTop = logBox.scrollHeight;
          });
        } else logBox.style.display = 'none';
      } else if (a === 'dir') {
        D.plugin.openFolder(p.id);
      } else if (a === 'enable') {
        D.plugin.enable(p.id, !p.enabled).then(function () { renderPlugins(); });
      } else if (a === 'del') {
        if (!window.confirm('确定删除插件「' + p.name + '」？该操作会移除其文件夹。')) return;
        D.plugin.remove(p.id).then(function (r) {
          if (r.ok) { say('已删除'); renderPlugins(); }
          else say(r.message || '操作失败：');
        });
      }
    });

    return card;
  }

  /* ------------------------------ 运行时与库 ------------------------------ */

  function renderRuntimes() {
    body.innerHTML = '<div class="dk-tip">这里管理各编程语言的<b>解释器</b>与<b>第三方库</b>。' +
      '完全离线的电脑，可把 <code>.whl</code> / <code>.tgz</code> 等安装包放进离线目录后勾选「离线安装」。' +
      '<br>JavaScript 已内置，无需任何安装即可写插件。</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center">' +
        '<button class="dk-btn" id="r-refresh">重新探测</button>' +
        '<label style="font-size:12.5px;display:flex;align-items:center;gap:6px;cursor:pointer">' +
          '<input type="checkbox" id="r-offline"> 离线安装模式</label>' +
        '<span class="sp" style="flex:1"></span>' +
        '<button class="dk-btn" id="r-offdir">打开离线包目录</button>' +
        '<button class="dk-btn" id="r-libdir">打开库目录</button>' +
      '</div>' +
      '<div id="r-list"></div>' +
      '<div style="margin-top:12px"><div style="font-size:12.5px;color:var(--text-dim);margin-bottom:6px">安装输出</div>' +
      '<div class="dk-log" id="r-log">等待操作…</div></div>';

    var logEl = body.querySelector('#r-log');
    function push(line, cls) {
      var d = document.createElement('div');
      if (cls) d.className = 'l-' + cls;
      d.textContent = line;
      logEl.appendChild(d);
      logEl.scrollTop = logEl.scrollHeight;
    }
    logBuf.forEach(function (l) { push(l.line, l.cls); });

    D.config.get('offlineMode', false).then(function (r) {
      body.querySelector('#r-offline').checked = !!r.value;
    });
    body.querySelector('#r-offline').onchange = function (e) {
      D.config.set('offlineMode', e.target.checked);
      say(e.target.checked ? '已开启离线安装模式' : '已关闭离线安装模式');
    };
    body.querySelector('#r-refresh').onclick = function () { renderRuntimes(); };
    body.querySelector('#r-offdir').onclick = function () { D.runtime.openOfflineFolder(''); };
    body.querySelector('#r-libdir').onclick = function () { D.runtime.openLibFolder(''); };

    var list = body.querySelector('#r-list');
    D.runtime.list(true).then(function (r) {
      var runtimes = (r && r.list) || [];
      var metas = (r && r.languages) || [];
      list.innerHTML = '';
      runtimes.forEach(function (rt) {
        var meta = metas.find(function (m) { return m.id === rt.id; }) || {};
        list.appendChild(runtimeCard(rt, meta, push));
      });
    });
  }

  function sourceText(src) { return { builtin: '内置', portable: '便携', path: '系统 PATH', system: '系统安装', custom: '手动指定' }[src] || src; }

  function runtimeCard(rt, meta, push) {
    var card = el('<div class="dk-card"></div>');
    card.innerHTML =
      '<div class="row">' +
        '<span class="name">' + esc(rt.name) + '</span>' +
        (rt.available
          ? '<span class="badge ok">可用</span><span class="badge">' + esc(sourceText(rt.source) || rt.source) + '</span>'
          : '<span class="badge warn">未安装</span>') +
        '<span class="sp"></span>' +
        '<button class="dk-btn" data-a="bin">指定路径</button>' +
        '<button class="dk-btn" data-a="portable">导入便携包</button>' +
      '</div>' +
      (rt.version ? '<div class="meta">' + esc(rt.version) + '　' + esc(rt.bin || '') + '</div>' : '') +
      (meta.hasPkgManager
        ? '<div class="row" style="margin-top:10px">' +
            '<input class="dk-input" placeholder="要安装的库，空格分隔，例如：numpy pillow" data-i="pkg">' +
            '<button class="dk-btn primary" data-a="install">安装</button>' +
            '<button class="dk-btn" data-a="lib">库目录</button>' +
          '</div>'
        : '<div class="desc">该语言暂无自动装库支持，可手动把依赖放进库目录</div>');

    card.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-a]');
      if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'bin') {
        D.runtime.setBin(rt.id, null).then(function (r) {
          if (r.ok) { say('已更新解释器路径'); renderRuntimes(); }
          else if (!r.canceled) say(r.message || '设置失败');
        });
      } else if (a === 'portable') {
        push('[' + rt.id + '] 开始导入便携运行时…', 'cmd');
        D.runtime.importPortable(rt.id).then(function (r) {
          if (r.ok) { push('[' + rt.id + '] 导入成功', 'ok'); renderRuntimes(); }
          else if (!r.canceled) push('[' + rt.id + '] 导入失败：' + (r.message || ''), 'error');
        });
      } else if (a === 'lib') {
        D.runtime.openLibFolder(rt.id);
      } else if (a === 'install') {
        var input = card.querySelector('[data-i="pkg"]');
        var pkgs = (input.value || '').trim().split(/\s+/).filter(Boolean);
        if (!pkgs.length) { say('请先填写要安装的库名'); return; }
        b.disabled = true; b.textContent = '安装中…';
        var offline = body.querySelector('#r-offline').checked;
        push('[' + rt.id + '] 安装 ' + pkgs.join(', ') + (offline ? '（离线）' : ''), 'cmd');
        D.runtime.installPackages(rt.id, pkgs, offline).then(function (r) {
          b.disabled = false; b.textContent = '安装';
          if (r.ok) { push('[' + rt.id + '] 安装完成 → ' + r.dir, 'ok'); input.value = ''; }
          else push('[' + rt.id + '] 安装失败：' + (r.message || 'see output above'), 'error');
        });
      }
    });

    return card;
  }

  /* -------------------------------- 语言包 -------------------------------- */

  function renderLangpacks() {
    body.innerHTML = '<div class="dk-tip">界面语言以<b>语言包</b>形式安装，一个语言包就是一个 ' +
      '<code>langpack.json</code>（可附带自己的说明书）。' +
      '想做新语言？点「导出模板」拿到全部词条，翻译完再装回来即可。</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">' +
        '<button class="dk-btn primary" id="l-install">安装语言包（.json）</button>' +
        '<button class="dk-btn" id="l-installdir">安装语言包（文件夹）</button>' +
        '<button class="dk-btn" id="l-export">导出模板</button>' +
        '<button class="dk-btn" id="l-folder">打开语言包目录</button>' +
      '</div><div id="l-list"></div>';

    body.querySelector('#l-install').onclick = function () {
      D.langpack.install().then(afterInstall);
    };
    body.querySelector('#l-installdir').onclick = function () {
      D.langpack.installDir().then(afterInstall);
    };
    body.querySelector('#l-export').onclick = function () {
      var dict = (K.I18N && K.I18N['zh-CN']) || {};
      D.langpack.exportTemplate(dict, 'my-lang').then(function (r) {
        if (r.ok) say('模板已导出（共 ' + Object.keys(dict).length + ' 条）');
        else if (!r.canceled) say(r.message || '导出失败');
      });
    };
    body.querySelector('#l-folder').onclick = function () { D.langpack.openFolder(); };

    function afterInstall(r) {
      if (r.ok) {
        say('语言包已安装：' + (r.label || r.code) + '，重启后生效');
        D.dialog.message({
          type: 'info', message: '语言包安装成功',
          detail: (r.label || r.code) + ' 已就位。\n界面语言列表需要重新载入页面才会刷新，是否立即重载？',
          buttons: ['稍后', '立即重载'], defaultId: 1
        }).then(function (res) { if (res.ok && res.response === 1) location.reload(); });
        renderLangpacks();
      } else if (!r.canceled) say(r.message || '安装失败');
    }

    var list = body.querySelector('#l-list');
    D.langpack.list().then(function (r) {
      var items = (r && r.list) || [];
      list.innerHTML = '';
      var current = K.getLang();
      items.forEach(function (p) {
        var card = el('<div class="dk-card"></div>');
        card.innerHTML =
          '<div class="row">' +
            '<span class="name">' + esc(p.label) + '</span>' +
            '<span class="badge">' + esc(p.code) + '</span>' +
            (p.builtin ? '<span class="badge">内置</span>' : '<span class="badge">v' + esc(p.version) + '</span>') +
            (p.keys ? '<span class="badge">' + p.keys + ' 词条</span>' : '') +
            (p.code === current ? '<span class="badge ok">使用中</span>' : '') +
            '<span class="sp"></span>' +
            (p.code === current ? '' : '<button class="dk-btn" data-a="use">切换</button>') +
            (p.removable ? '<button class="dk-btn danger" data-a="del">卸载</button>' : '') +
          '</div>' +
          (p.description ? '<div class="desc">' + esc(p.description) + '</div>' : '') +
          (p.author ? '<div class="meta">作者：' + esc(p.author) + '</div>' : '');

        card.addEventListener('click', function (e) {
          var b = e.target.closest('button[data-a]');
          if (!b) return;
          if (b.getAttribute('data-a') === 'use') {
            if (K.setLang(p.code)) { say('已切换到 ' + p.label); renderLangpacks(); }
            else say('切换失败：语言包未载入，请重载页面');
          } else {
            if (!window.confirm('确定卸载语言包「' + p.label + '」？')) return;
            D.langpack.remove(p.code).then(function (rr) {
              if (rr.ok) { say('已卸载，重载后生效'); renderLangpacks(); }
              else say(rr.message || '卸载失败');
            });
          }
        });
        list.appendChild(card);
      });
    });
  }

  /* -------------------------------- 开发指南 ------------------------------- */

  function renderGuide() {
    body.innerHTML =
      '<div class="dk-tip">插件 = 一个文件夹 + 一个 <code>plugin.json</code> + 一个入口脚本。' +
      '编辑器通过标准输入输出与它对话，<b>用什么语言写完全自由</b>。</div>' +

      '<div class="dk-card"><div class="name">1. 目录结构</div><div class="dk-log" style="height:auto">' +
      esc('我的插件/\n  plugin.json      清单\n  main.py          入口（任意语言）') +
      '</div></div>' +

      '<div class="dk-card"><div class="name">2. plugin.json</div><div class="dk-log" style="height:auto">' +
      esc(JSON.stringify({
        id: 'my-plugin',
        name: '我的插件',
        version: '1.0.0',
        description: '一句话说明',
        language: 'python',
        entry: 'main.py',
        commands: [{ id: 'run', title: '生成图形' }],
        runtime: { packages: ['numpy'] },
        permissions: ['scene:write']
      }, null, 2)) +
      '</div><div class="desc">language 可填：' +
      'javascript / python / lua / ruby / php / perl / powershell / deno / bun / java / dotnet / go / r</div></div>' +

      '<div class="dk-card"><div class="name">3. 通信协议（每行一条 JSON）</div><div class="dk-log" style="height:auto">' +
      esc('宿主 -> 插件   {"method":"plugin.init","params":{...}}\n' +
          '宿主 -> 插件   {"id":1,"method":"plugin.invoke","params":{"command":"run"}}\n' +
          '插件 -> 宿主   {"method":"plugin.ready"}\n' +
          '插件 -> 宿主   {"id":9,"method":"editor.addShape","params":{"shape":"box","pos":[0,0,0]}}\n' +
          '宿主 -> 插件   {"id":9,"result":{...}}\n' +
          '插件 -> 宿主   {"id":1,"result":"完成"}') +
      '</div><div class="desc">SDK 已封装好这套协议：Python 用 <code>cube3d.py</code>，' +
      'JavaScript 用 <code>cube3d.js</code>，直接 import 即可。</div></div>' +

      '<div class="dk-card"><div class="name">4. 可调用的编辑器接口</div><div class="dk-log" style="height:auto">' +
      esc([
        'editor.getInfo()                          场景与环境信息',
        'editor.listShapes()                       可用图形清单',
        'editor.addShape({shape,pos,color,scale})  添加图形',
        'editor.addShapes({items:[...]})           批量添加（只压一次历史）',
        'editor.addText({text,pos,color,fontSize}) 添加文本',
        'editor.listObjects()                      列出全部对象',
        'editor.getObject({id})                    读取单个对象',
        'editor.updateObject({id,pos,rot,scale})   修改对象',
        'editor.removeObject({id|ids})             删除对象',
        'editor.clearScene()                       清空场景',
        'editor.getScene() / setScene({data})      场景快照读写',
        'editor.select({ids}) / getSelection()     选择操作',
        'editor.undo() / redo() / pushHistory()    历史记录',
        'editor.screenshot({path})                 截图落盘',
        'editor.setCamera({preset|position})       视角控制',
        'editor.toast({message})                   界面提示',
        'editor.prompt({title}) / confirm({...})   向用户提问',
        '',
        'host.log({level,message})                 写插件日志',
        'host.getConfig() / setConfig({config})    插件自身配置',
        'host.readFile / writeFile({path})         读写文件',
        'host.pickFile({title,filters})            弹出文件选择框',
        'host.progress({percent,message})          汇报进度'
      ].join('\n')) + '</div></div>' +

      '<div class="dk-card"><div class="name">5. 最小示例（Python）</div><div class="dk-log" style="height:auto">' +
      esc('import sys, os\n' +
          'sys.path.insert(0, os.environ["CUBE3D_SDK_DIR"])\n' +
          'from cube3d import Plugin\n\n' +
          'app = Plugin()\n\n' +
          '@app.command("run")\n' +
          'def run(payload):\n' +
          '    for i in range(10):\n' +
          '        app.editor("addShape", shape="box", pos=[i*1.5, 0, 0])\n' +
          '    return "已生成 10 个立方体"\n\n' +
          'app.run()') +
      '</div></div>' +

      '<div style="display:flex;gap:8px;margin-top:4px">' +
        '<button class="dk-btn primary" id="g-sdk">打开 SDK 目录</button>' +
        '<button class="dk-btn" id="g-dir">打开插件目录</button>' +
      '</div>';

    body.querySelector('#g-sdk').onclick = function () {
      D.plugin.sdkPath().then(function (r) { if (r.ok) D.shell.openExternal('file:///' + r.path.replace(/\\/g, '/')); });
      D.plugin.openFolder();
    };
    body.querySelector('#g-dir').onclick = function () { D.plugin.openFolder(); };
  }

  /* --------------------------------- 启动 --------------------------------- */

  function boot() {
    K = window.__cube3d;
    build();

    // 运行时安装日志缓冲，切换标签页后仍可见
    D.runtime.onLog(function (m) {
      var cls = /失败|error|ERROR/.test(m.line) ? 'error' : (/完成|Successfully|✔/.test(m.line) ? 'ok' : '');
      logBuf.push({ line: '[' + m.id + '] ' + m.line, cls: cls });
      if (logBuf.length > 300) logBuf.shift();
      var logEl = body && body.querySelector('#r-log');
      if (logEl && mask.classList.contains('show') && cur === 'runtimes') {
        var d = document.createElement('div');
        if (cls) d.className = 'l-' + cls;
        d.textContent = '[' + m.id + '] ' + m.line;
        logEl.appendChild(d);
        logEl.scrollTop = logEl.scrollHeight;
      }
    });

    D.plugin.onStatus(function () { if (mask.classList.contains('show') && cur === 'plugins') renderPlugins(); });
    D.plugin.onChanged(function () { if (mask.classList.contains('show') && cur === 'plugins') renderPlugins(); });
    D.langpack.onChanged(function () { if (mask.classList.contains('show') && cur === 'langpacks') renderLangpacks(); });

    window.__dkPanels = { open: open, close: close, refresh: render };
  }

  if (window.__cube3d) boot();
  else window.addEventListener('cube3d:ready', boot, { once: true });
})();
