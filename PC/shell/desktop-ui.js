/* ==========================================================================
   桌面版界面层
   · 无边框窗口的自绘控制区（最小化 / 最大化 / 关闭）
   · 本地文件的新建 / 打开 / 保存 / 另存为 / 最近文件 / 拖放导入
   · 自动保存与崩溃恢复
   · 关闭前的未保存提醒
   ========================================================================== */
(function () {
  'use strict';

  var D = window.desktop;
  if (!D || !D.isDesktop) return;

  var K = null;
  var currentPath = null;      // 当前场景文件路径
  var savedMark = -1;          // 上次保存时的历史指针
  var autosaveTimer = null;

  /* -------------------------------- 小工具 -------------------------------- */

  function $(sel) { return document.querySelector(sel); }
  function clickAny(ids) {
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el) { el.click(); return true; }
    }
    return false;
  }
  function say(msg) { if (K && K.toast) K.toast(msg); }

  function isDirty() { return K ? K.state.hIndex !== savedMark : false; }

  /* 网页风格确认弹窗，替代 Windows 原生 dialog；返回 { ok, response }
     样式全部引用主题 CSS 变量（与界面其他控件同一套机制），自动跟随当时主题 */
  function webConfirm(opts) {
    opts = opts || {};
    var buttons = opts.buttons || ['确定'];
    var cancelIndex = (opts.cancelId != null) ? opts.cancelId : -1;
    var resolved = false;
    var mask = document.createElement('div');
    mask.className = 'modal-mask';
    mask.style.cssText = 'position:fixed;inset:0;z-index:6000;display:flex;align-items:center;justify-content:center;background:var(--modal-mask,rgba(8,10,18,0.72));font-family:-apple-system,"Segoe UI","Microsoft YaHei",sans-serif;';
    var box = document.createElement('div');
    box.className = 'modal-box';
    box.style.cssText = 'background:var(--bg-panel-solid,#fff);border-radius:14px;padding:24px 26px;min-width:340px;max-width:90vw;box-shadow:none;color:var(--text,#1b2440);';
    if (opts.title) {
      var title = document.createElement('div');
      title.className = 'modal-title';
      title.textContent = opts.title;
      title.style.cssText = 'font-size:18px;font-weight:700;margin-bottom:10px;';
      box.appendChild(title);
    }
    if (opts.message) {
      var msg = document.createElement('div');
      msg.className = 'modal-msg';
      msg.textContent = opts.message;
      msg.style.cssText = 'font-size:16px;font-weight:600;margin-bottom:6px;';
      box.appendChild(msg);
    } else if (!opts.title) {
      var msg = document.createElement('div');
      msg.className = 'modal-msg';
      msg.textContent = '确认';
      msg.style.cssText = 'font-size:18px;font-weight:700;margin-bottom:10px;';
      box.appendChild(msg);
    }
    if (opts.detail) {
      var detail = document.createElement('div');
      detail.style.cssText = 'font-size:14px;color:var(--text-dim,#4b5675);line-height:1.6;margin:4px 0;white-space:pre-line;';
      detail.textContent = opts.detail;
      box.appendChild(detail);
    }
    var actions = document.createElement('div');
    actions.className = 'modal-actions';
    actions.style.cssText = 'margin-top:20px;display:flex;gap:10px;justify-content:flex-end;';
    box.appendChild(actions);
    mask.appendChild(box);
    var promise = new Promise(function (resolve) {
      function finish(result) {
        if (resolved) return;
        resolved = true;
        document.removeEventListener('keydown', onKey, true);
        mask.classList.remove('show');
        if (mask.parentNode) mask.parentNode.removeChild(mask);
        resolve(result);
      }
      function onKey(e) {
        if (e.key === 'Escape') { e.preventDefault(); finish({ ok: false, response: cancelIndex < 0 ? 0 : cancelIndex }); }
      }
      buttons.forEach(function (label, i) {
        var btn = document.createElement('button');
        btn.className = (i === opts.defaultId ? 'primary' : '');
        btn.textContent = label;
        var primary = (i === opts.defaultId);
        btn.style.cssText = primary
          ? 'padding:9px 20px;border:none;border-radius:9px;cursor:pointer;font-size:14px;background:var(--accent,#2e6bff);color:var(--primary-btn-text,#fff);'
          : 'padding:9px 20px;border:1px solid var(--border,rgba(110,231,255,0.18));border-radius:9px;cursor:pointer;font-size:14px;background:var(--control-bg,rgba(255,255,255,0.05));color:var(--text,#1b2440);';
        btn.onclick = function () { finish({ ok: true, response: i }); };
        actions.appendChild(btn);
      });
      mask.addEventListener('click', function (e) {
        if (e.target === mask) finish({ ok: false, response: cancelIndex < 0 ? 0 : cancelIndex });
      });
      document.addEventListener('keydown', onKey, true);
      document.body.appendChild(mask);
      requestAnimationFrame(function () { mask.classList.add('show'); });
      var pf = actions.querySelector('.primary') || actions.querySelector('button');
      if (pf) pf.focus();
    });
    return promise;
  }

  function updateTitle() {
    var name = currentPath ? currentPath.replace(/^.*[\\/]/, '') : '';
    var base = name || '立方·3D设计工坊';
    D.window.setTitle((isDirty() ? '● ' : '') + base + (name ? ' — 立方·3D设计工坊' : ''));
  }

  /* ---------------------------- 自绘标题栏注入 ---------------------------- */

  function buildTitlebar() {
    var bar = $('.topbar');
    if (!bar) return;

    document.body.classList.add('desktop');

    // 窗口控制区（最右）：最小化 / 最大化 / 关闭
    var ctl = document.createElement('div');
    ctl.className = 'win-ctl';
    ctl.innerHTML =
      '<button data-w="min" title="最小化">\uE921</button>' +
      '<button data-w="max" title="最大化">\uE922</button>' +
      '<button data-w="close" class="close" title="关闭">\uE8BB</button>';

    // 功能按钮组与窗口控制之间加分隔线，二者成组靠右
    var divider = document.createElement('div');
    divider.className = 'win-divider';
    var actions = bar.querySelector('.top-actions');
    if (actions) {
      actions.insertAdjacentElement('afterend', divider);
      divider.insertAdjacentElement('afterend', ctl);
    } else {
      bar.appendChild(divider);
      bar.appendChild(ctl);
    }

    ctl.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var w = b.getAttribute('data-w');
      if (w === 'min') D.window.minimize();
      else if (w === 'max') {
        // 最大化按钮只负责「最大化 / 还原」；全屏由顶栏全屏按钮(btn-fs)独占控制，
        // 避免两个按钮逻辑冲突。全屏状态下该按钮会被禁用。
        if (!document.body.classList.contains('fullscreen')) D.window.toggleMaximize();
      }
      else if (w === 'close') D.window.close();
    });

    // 双击顶栏空白处（非按钮 / 分隔线）= 最大化 / 还原
    bar.addEventListener('dblclick', function (e) {
      if (e.target === bar || (e.target.classList && e.target.classList.contains('win-divider'))) {
        D.window.toggleMaximize();
      }
    });

    D.window.onState(function (st) {
      document.body.classList.toggle('maximized', !!st.maximized);
      document.body.classList.toggle('fullscreen', !!st.fullScreen);
      document.body.classList.toggle('win-blur', !st.focused);
      var maxBtn = ctl.querySelector('[data-w="max"]');
      if (maxBtn) {
        // 最大化按钮仅负责「最大化 / 还原」。全屏由 btn-fs 独占控制，
        // 全屏状态下最大化无意义，故禁用该按钮，避免两个按钮逻辑冲突。
        if (st.fullScreen) {
          maxBtn.textContent = '\uE922';
          maxBtn.title = _t('titleMax');
          maxBtn.disabled = true;
        } else {
          maxBtn.textContent = st.maximized ? '\uE923' : '\uE922';
          maxBtn.title = _t(st.maximized ? 'titleRestore' : 'titleMax');
          maxBtn.disabled = false;
        }
      }
    });
  }

  /* ------------------------------- 文件操作 ------------------------------- */

  function sceneDoc() {
    var c = K.camera, t = K.controls ? K.controls.target : null;
    return {
      version: 2,
      objects: K.snapshot(),
      camera: {
        position: [c.position.x, c.position.y, c.position.z],
        quaternion: [c.quaternion.x, c.quaternion.y, c.quaternion.z, c.quaternion.w],
        target: t ? [t.x, t.y, t.z] : [0, 0, 0],
        fov: c.fov,
        aspect: c.aspect,
        near: c.near,
        far: c.far
      },
      lang: K.getLang(),
      theme: K.getTheme(),
      savedAt: new Date().toISOString()
    };
  }

  function applyDoc(doc) {
    var arr = Array.isArray(doc) ? doc : (doc && (doc.objects || doc.scene));
    if (!Array.isArray(arr)) { say('文件格式无法识别'); return false; }
    K.restore(arr);
    K.pushHistory();
    // 恢复相机视角（与导出/自动保存的 version:2 格式一致）
    if (doc && doc.camera) {
      var c = doc.camera;
      try {
        if (c.position && c.position.length === 3) K.camera.position.set(c.position[0], c.position[1], c.position[2]);
        if (c.quaternion && c.quaternion.length === 4) K.camera.quaternion.set(c.quaternion[0], c.quaternion[1], c.quaternion[2], c.quaternion[3]);
        if (c.target && c.target.length === 3 && K.controls) K.controls.target.set(c.target[0], c.target[1], c.target[2]);
        if (typeof c.fov === 'number') K.camera.fov = c.fov;
        if (typeof c.near === 'number' && c.near > 0) K.camera.near = c.near;
        if (typeof c.far === 'number' && c.far > K.camera.near) K.camera.far = c.far;
        K.camera.updateProjectionMatrix();
        if (K.controls) K.controls.update();
      } catch (err) { /* 相机恢复失败不影响对象恢复 */ }
    }
    if (typeof K.refreshUI === 'function') K.refreshUI();
    savedMark = K.state.hIndex;
    return true;
  }

  function doNew() {
    if (isDirty() && !window.confirm('当前场景尚未保存，确定要新建吗？')) return;
    if (!clickAny(['btn-new', 'new-btn'])) {
      K.deselectAll();
      K.state.selectedList = K.state.objects.slice();
      if (K.state.selectedList.length) K.deleteSelected();
    }
    currentPath = null;
    D.file.setCurrent(null);
    savedMark = K.state.hIndex;
    updateTitle();
  }

  function doOpen(presetPath) {
    D.file.openScene(presetPath).then(function (r) {
      if (!r.ok) { if (!r.canceled) say(r.message || '打开失败'); return; }
      if (applyDoc(r.data)) {
        currentPath = r.path;
        updateTitle();
        say('已打开：' + r.name);
      }
    });
  }

  function defaultJsonName(prefix) { var d = new Date(); var p = function (x) { return String(x).padStart(2, '0'); }; return prefix + '_' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '_' + p(d.getHours()) + p(d.getMinutes()) + '.json'; }
  function doSave(saveAs) {
    var payload = {
      data: sceneDoc(),
      saveAs: !!saveAs,
      path: saveAs ? null : currentPath,
      suggestName: (currentPath ? currentPath.replace(/^.*[\\/]/, '') : defaultJsonName('scene'))
    };
    return D.file.saveScene(payload).then(function (r) {
      if (!r.ok) { if (!r.canceled) say(r.message || '保存失败'); return false; }
      currentPath = r.path;
      savedMark = K.state.hIndex;
      updateTitle();
      say('已保存：' + r.name);
      return true;
    });
  }

  /* ------------------------------- 拖放导入 ------------------------------- */

  function setupDragDrop() {
    var overlayShown = false;
    function toggleHint(on) {
      if (on === overlayShown) return;
      overlayShown = on;
      document.body.style.outline = on ? '2px dashed var(--accent)' : '';
      document.body.style.outlineOffset = on ? '-8px' : '';
    }

    window.addEventListener('dragenter', function () { toggleHint(true); });
    window.addEventListener('dragleave', function (e) { if (e.clientX === 0 && e.clientY === 0) toggleHint(false); });
    window.addEventListener('drop', function (e) {
      toggleHint(false);
      var files = e.dataTransfer && e.dataTransfer.files;
      if (!files || !files.length) return;
      var p = D.file.pathOf(files[0]);
      if (!p) return;
      D.file.readDropped(p).then(function (r) {
        if (!r.ok) { say(r.message || '无法读取该文件'); return; }
        if (r.kind === 'scene') {
          if (applyDoc(r.data)) { currentPath = r.path; updateTitle(); say('已载入场景'); }
        } else if (r.kind === 'image') {
          window.dispatchEvent(new CustomEvent('cube3d:drop-image', { detail: r }));
          say('图片已就绪，请在画布上点击放置');
        }
      });
    });
  }

  /* ------------------------------- 自动保存 ------------------------------- */

  function setupAutosave() {
    D.config.get('editor.autosaveEnabled', true).then(function (r) {
      if (r.value === false) return;
      return D.config.get('editor.autosaveInterval', 120);
    }).then(function (r) {
      var sec = (r && r.value) || 120;
      if (autosaveTimer) clearInterval(autosaveTimer);
      autosaveTimer = setInterval(function () {
        if (!isDirty()) return;
        try { D.file.autosave(sceneDoc()); } catch (_) {}
      }, Math.max(30, sec) * 1000);
    });
  }

  function offerRestore() {
    D.file.lastSession().then(function (r) {
      // 兼容两种返回结构：{ok, session:{time,file,data}} 或 {time,file,data}
      var s = (r && r.session) ? r.session : r;
      if (!s || !s.data) return;
      // 只在非正常退出（存在残留会话）且当前场景为空时询问
      if (K.state.objects.length > 0) return;
      var when = new Date(s.time).toLocaleString();
      webConfirm({
        title: '场景恢复',
        message: '检测到上次未正常关闭的场景',
        detail: '时间：' + when + '\n是否恢复该场景？',
        buttons: ['放弃', '恢复'],
        defaultId: 1, cancelId: 0
      }).then(function (res) {
        if (res && res.ok && res.response === 1) {
          if (applyDoc(s.data)) {
            currentPath = s.file || null;
            updateTitle();
            if (typeof K.refreshUI === 'function') K.refreshUI();
            say('已恢复上次会话');
          }
        } else {
          D.file.clearLastSession();
        }
      });
    });
  }

  /* --------------------------------- 启动 --------------------------------- */

  function boot() {
    K = window.__cube3d;
    if (!K) return;

    buildTitlebar();
    setupDragDrop();
    setupAutosave();
    updateTitle();
    setInterval(updateTitle, 1000);

    // 文件关联 / 命令行传入
    D.file.onOpenRequest(function (p) { doOpen(p); });

    // 关闭前确认
  D.app.onBeforeClose(function () {
    // 已有弹窗在等待用户时，不再重复弹出
    if (window.__closing) return;
    if (!isDirty() || (K && K.state && K.state.objects && !K.state.objects.length)) { D.window.forceClose(); return; }
    window.__closing = true;
    webConfirm({
      message: '场景有未保存的修改',
      detail: '关闭前是否保存？',
      buttons: ['取消', '不保存', '保存'],
      defaultId: 2, cancelId: 0
    }).then(function (r) {
      window.__closing = false;
      if (!r.ok || r.response === 0) return;
      if (r.response === 1) { D.file.clearLastSession(); D.window.forceClose(); return; }
      doSave(false).then(function (done) { if (done) { D.file.clearLastSession(); D.window.forceClose(); } });
    });
  });

    // 键盘补充：Ctrl+S / Ctrl+O 保存与打开
    window.addEventListener('keydown', function (e) {
      if (!e.ctrlKey || e.altKey) return;
      var k = e.key.toLowerCase();
      if (k === 's') { e.preventDefault(); doSave(e.shiftKey); }
      else if (k === 'o') { e.preventDefault(); doOpen(); }
    }, true);

    offerRestore();
    D.file.current().then(function (r) { if (r.ok && r.path) { currentPath = r.path; updateTitle(); } });

    window.__dkUI = {
      save: doSave, open: doOpen, newScene: doNew,
      sceneDoc: sceneDoc, applyDoc: applyDoc,
      get currentPath() { return currentPath; }
    };
  }

  if (window.__cube3d) boot();
  else window.addEventListener('cube3d:ready', boot, { once: true });
})();
