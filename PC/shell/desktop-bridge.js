/* ==========================================================================
   插件 ↔ 编辑器 桥接层
   主进程把插件发来的 editor.* 调用转发到这里，这里在页面上下文中真正操作场景，
   再把结果回执给主进程，最终返回给插件进程。
   ========================================================================== */
(function () {
  'use strict';

  var D = window.desktop;
  if (!D || !D.isDesktop) return;

  var K = null;   // window.__cube3d 内核引用

  /* ------------------------------- 工具函数 ------------------------------- */

  function toColorInt(c, dft) {
    if (c === undefined || c === null) return dft;
    if (typeof c === 'number') return c;
    var s = String(c).trim();
    if (/^#?[0-9a-f]{6}$/i.test(s)) return parseInt(s.replace('#', ''), 16);
    if (/^#?[0-9a-f]{3}$/i.test(s)) {
      var t = s.replace('#', '');
      return parseInt(t[0] + t[0] + t[1] + t[1] + t[2] + t[2], 16);
    }
    var n = Number(s);
    return isNaN(n) ? dft : n;
  }

  function hex(n) {
    return '#' + (n >>> 0 & 0xffffff).toString(16).padStart(6, '0');
  }

  function findObj(id) {
    var list = K.state.objects;
    for (var i = 0; i < list.length; i++) {
      if (list[i].data && list[i].data.id === id) return list[i];
    }
    return null;
  }

  function briefOf(o, index) {
    var m = o.mesh, d = o.data || {};
    return {
      id: d.id != null ? d.id : index,
      kind: d.kind || (d.isBrush ? 'brush' : 'unknown'),
      shape: d.shape || d.type || null,
      text: d.text || null,
      color: typeof d.color === 'number' ? hex(d.color) : d.color,
      opacity: d.opacity != null ? d.opacity : 1,
      visible: !!m.visible,
      pos: [+m.position.x.toFixed(4), +m.position.y.toFixed(4), +m.position.z.toFixed(4)],
      rot: [+m.rotation.x.toFixed(4), +m.rotation.y.toFixed(4), +m.rotation.z.toFixed(4)],
      scale: [+m.scale.x.toFixed(4), +m.scale.y.toFixed(4), +m.scale.z.toFixed(4)]
    };
  }

  /** 简易输入框（Electron 不支持 window.prompt） */
  function domPrompt(title, defaultValue) {
    return new Promise(function (resolve) {
      var mask = document.createElement('div');
      mask.className = 'dk-mask show';
      mask.style.zIndex = 980;
      mask.innerHTML =
        '<div class="dk-panel" style="width:420px;height:auto">' +
        '<div class="dk-head"><span class="dk-title"></span></div>' +
        '<div class="dk-body" style="padding:16px">' +
        '<input class="dk-input" style="width:100%" />' +
        '</div>' +
        '<div class="dk-foot"><span class="sp" style="flex:1"></span>' +
        '<button class="dk-btn" data-a="cancel">取消</button>' +
        '<button class="dk-btn primary" data-a="ok">确定</button></div></div>';
      mask.querySelector('.dk-title').textContent = title || '请输入';
      var input = mask.querySelector('input');
      input.value = defaultValue == null ? '' : String(defaultValue);
      document.body.appendChild(mask);
      input.focus();
      input.select();
      function done(v) { mask.remove(); resolve(v); }
      mask.addEventListener('click', function (e) {
        var a = e.target.getAttribute && e.target.getAttribute('data-a');
        if (a === 'ok') done(input.value);
        else if (a === 'cancel' || e.target === mask) done(null);
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') done(input.value);
        if (e.key === 'Escape') done(null);
      });
    });
  }

  /* ------------------------------ 接口实现表 ------------------------------ */

  var handlers = {

    'editor.getInfo': function () {
      return {
        version: K.version,
        objectCount: K.state.objects.length,
        selectedCount: K.state.selectedList.length,
        lang: K.getLang(),
        theme: K.getTheme(),
        shapes3d: Object.keys(K.SHAPES_3D),
        shapes2d: Object.keys(K.SHAPES_2D)
      };
    },

    'editor.listShapes': function () {
      return { '3d': Object.keys(K.SHAPES_3D), '2d': Object.keys(K.SHAPES_2D) };
    },

    /**
     * 添加图形
     * params: { shape, kind?, pos:[x,y,z], color, scale, rotY, opacity, pattern, noHistory }
     */
    'editor.addShape': function (p) {
      var shape = p.shape;
      if (!shape) throw new Error('缺少 shape 参数');
      var kind = p.kind;
      if (!kind) kind = K.SHAPES_3D[shape] ? '3d' : (K.SHAPES_2D[shape] ? '2d' : null);
      if (!kind) throw new Error('未知图形: ' + shape + '（可用图形见 editor.listShapes）');

      var pos = Array.isArray(p.pos) ? p.pos : [0, 0, 0];
      var obj = K.createObject({
        kind: kind,
        shape: shape,
        color: toColorInt(p.color, K.state.defaultColor),
        pattern: p.pattern,
        pos: [Number(pos[0]) || 0, Number(pos[1]) || 0, Number(pos[2]) || 0],
        rotY: Number(p.rotY) || 0,
        scale: p.scale == null ? 1 : Number(p.scale),
        opacity: p.opacity == null ? 1 : Number(p.opacity)
      });
      if (!p.noHistory) K.pushHistory();
      return briefOf(obj, K.state.objects.length - 1);
    },

    /** 批量添加，只压一次历史，适合脚本生成大量对象 */
    'editor.addShapes': function (p) {
      var items = Array.isArray(p.items) ? p.items : [];
      var out = [];
      for (var i = 0; i < items.length; i++) {
        out.push(handlers['editor.addShape'](Object.assign({}, items[i], { noHistory: true })));
      }
      if (items.length) K.pushHistory();
      return out;
    },

    'editor.addText': function (p) {
      if (!p.text) throw new Error('缺少 text 参数');
      var pos = Array.isArray(p.pos) ? p.pos : [0, 0, 0];
      var obj = K.createObject({
        kind: 'text',
        text: String(p.text),
        color: toColorInt(p.color, 0x000000),
        fontSize: p.fontSize == null ? 80 : Number(p.fontSize),
        bold: p.bold !== false,
        direction: p.direction === 'v' ? 'v' : 'h',
        font: p.font,
        pos: [Number(pos[0]) || 0, Number(pos[1]) || 0, Number(pos[2]) || 0],
        rotY: Number(p.rotY) || 0,
        scale: p.scale == null ? 1 : Number(p.scale),
        opacity: p.opacity == null ? 1 : Number(p.opacity)
      });
      if (!p.noHistory) K.pushHistory();
      return briefOf(obj, K.state.objects.length - 1);
    },

    'editor.listObjects': function () {
      return K.state.objects.map(briefOf);
    },

    'editor.getObject': function (p) {
      var o = findObj(p.id);
      if (!o) throw new Error('对象不存在: ' + p.id);
      return briefOf(o, 0);
    },

    'editor.updateObject': function (p) {
      var o = findObj(p.id);
      if (!o) throw new Error('对象不存在: ' + p.id);
      var m = o.mesh;
      if (Array.isArray(p.pos)) m.position.set(+p.pos[0] || 0, +p.pos[1] || 0, +p.pos[2] || 0);
      if (Array.isArray(p.rot)) m.rotation.set(+p.rot[0] || 0, +p.rot[1] || 0, +p.rot[2] || 0);
      if (Array.isArray(p.scale)) m.scale.set(+p.scale[0] || 1, +p.scale[1] || 1, +p.scale[2] || 1);
      else if (typeof p.scale === 'number') m.scale.setScalar(p.scale);
      if (p.color !== undefined && m.material && m.material.color) {
        var c = toColorInt(p.color, null);
        if (c !== null) { m.material.color.setHex(c); o.data.color = c; }
      }
      if (p.opacity !== undefined && m.material) {
        m.material.opacity = Number(p.opacity);
        m.material.transparent = Number(p.opacity) < 1;
        m.material.needsUpdate = true;
        o.data.opacity = Number(p.opacity);
      }
      if (p.visible !== undefined) m.visible = !!p.visible;
      m.updateMatrixWorld(true);
      K.refreshUI();
      if (!p.noHistory) K.pushHistory();
      return briefOf(o, 0);
    },

    'editor.removeObject': function (p) {
      var ids = Array.isArray(p.ids) ? p.ids : (p.id != null ? [p.id] : []);
      if (!ids.length) throw new Error('缺少 id 或 ids');
      var targets = ids.map(findObj).filter(Boolean);
      if (!targets.length) return { removed: 0 };
      K.deselectAll();
      K.state.selectedList = targets;
      K.deleteSelected();
      return { removed: targets.length };
    },

    'editor.clearScene': function () {
      var all = K.state.objects.slice();
      if (!all.length) return { removed: 0 };
      K.deselectAll();
      K.state.selectedList = all;
      K.deleteSelected();
      return { removed: all.length };
    },

    'editor.getScene': function () {
      return K.snapshot();
    },

    'editor.setScene': function (p) {
      if (!Array.isArray(p.data)) throw new Error('data 必须是 snapshot 数组');
      K.restore(p.data);
      K.pushHistory();
      return { count: K.state.objects.length };
    },

    'editor.select': function (p) {
      var ids = Array.isArray(p.ids) ? p.ids : (p.id != null ? [p.id] : []);
      var objs = ids.map(findObj).filter(Boolean);
      K.deselectAll();
      if (objs.length === 1) K.selectOnly(objs[0], true);
      else if (objs.length > 1) { K.selectOnly(objs[0], true); K.state.selectedList = objs; K.refreshUI(); }
      return { selected: objs.length };
    },

    'editor.getSelection': function () {
      return K.state.selectedList.map(briefOf);
    },

    'editor.deselectAll': function () { K.deselectAll(); return true; },

    'editor.undo': function () { K.undo(); return true; },
    'editor.redo': function () { K.redo(); return true; },
    'editor.pushHistory': function () { K.pushHistory(); return true; },

    /** 静默截图并落盘，返回文件路径 */
    'editor.screenshot': function (p) {
      K.renderer.render(K.scene, K.camera);
      var dataURL = K.renderer.domElement.toDataURL('image/png');
      return D.file.writeImage(dataURL, p && p.path).then(function (r) {
        if (!r.ok) throw new Error(r.message || '截图保存失败');
        return { path: r.path };
      });
    },

    'editor.toast': function (p) {
      K.toast(String(p.message == null ? '' : p.message));
      return true;
    },

    'editor.setCamera': function (p) {
      if (p.preset) { K.setView(p.preset); return true; }
      if (Array.isArray(p.position)) K.camera.position.set(+p.position[0], +p.position[1], +p.position[2]);
      if (Array.isArray(p.target) && K.controls) K.controls.target.set(+p.target[0], +p.target[1], +p.target[2]);
      if (K.controls) K.controls.update();
      return true;
    },

    'editor.getCamera': function () {
      var c = K.camera, t = K.controls ? K.controls.target : { x: 0, y: 0, z: 0 };
      return {
        position: [c.position.x, c.position.y, c.position.z],
        target: [t.x, t.y, t.z],
        fov: c.fov
      };
    },

    'editor.prompt': function (p) {
      return domPrompt(p.title || p.message, p.defaultValue);
    },

    'editor.confirm': function (p) {
      return D.dialog.message({
        type: 'question',
        message: p.message || '确认执行？',
        detail: p.detail,
        buttons: ['取消', '确定'],
        defaultId: 1,
        cancelId: 0
      }).then(function (r) { return r.ok && r.response === 1; });
    },

    'editor.setPanel': function (p) {
      // 插件自定义面板：以浮动按钮的形式挂到右下角快捷区
      window.dispatchEvent(new CustomEvent('cube3d:plugin-panel', { detail: p }));
      return true;
    }
  };

  /* ------------------------------- 事件接线 ------------------------------- */

  function boot() {
    K = window.__cube3d;
    if (!K) { console.error('[bridge] 内核未导出，插件桥无法工作'); return; }

    D.plugin.onEditorInvoke(function (msg) {
      var fn = handlers[msg.method];
      if (!fn) {
        D.plugin.replyEditor({ rid: msg.rid, error: '未实现的接口: ' + msg.method });
        return;
      }
      Promise.resolve()
        .then(function () { return fn(msg.params || {}); })
        .then(function (result) { D.plugin.replyEditor({ rid: msg.rid, result: result === undefined ? null : result }); })
        .catch(function (err) { D.plugin.replyEditor({ rid: msg.rid, error: String(err && err.message || err) }); });
    });

    window.__cube3dBridge = { handlers: handlers, call: function (m, p) { return handlers[m](p || {}); } };
    console.log('[desktop] 插件桥已就绪，开放接口', Object.keys(handlers).length, '个');
  }

  if (window.__cube3d) boot();
  else window.addEventListener('cube3d:ready', boot, { once: true });
})();
