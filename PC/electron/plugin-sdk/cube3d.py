"""
立方三维设计工坊 · Python 插件 SDK

用法::

    import sys, os
    sys.path.insert(0, os.environ["CUBE3D_SDK_DIR"])
    from cube3d import Plugin

    app = Plugin()

    @app.command("run")
    def run(payload):
        app.editor("addShape", shape="cube", pos=[0, 0, 0])
        return "完成"

    app.run()

协议说明：宿主与插件之间用「一行一条 JSON」通过 stdin/stdout 通信。
注意：插件代码中不要直接 print()，那会污染协议通道；请用 app.log()。
"""

import sys
import os
import json
import threading

__all__ = ["Plugin", "PluginError"]

API_VERSION = 1


class PluginError(Exception):
    """插件主动抛出的错误，会被宿主捕获并显示给用户。"""
    pass


class Plugin(object):
    def __init__(self):
        self.plugin_id = os.environ.get("CUBE3D_PLUGIN_ID", "unknown")
        self.plugin_dir = os.environ.get("CUBE3D_PLUGIN_DIR", os.getcwd())
        self.data_dir = os.environ.get("CUBE3D_DATA_DIR", "")
        self.lang = "zh-CN"
        self.config = {}

        self._commands = {}
        self._on_init = None
        self._on_shutdown = None
        self._seq = 0
        self._pending_inbox = []      # 等待处理的宿主消息
        self._lock = threading.Lock()
        self._running = True

        # 兜底：把 print 重定向到 stderr，避免用户误用 print 打断协议
        self._stdout = sys.stdout
        sys.stdout = sys.stderr

    # ------------------------------ 注册装饰器 ------------------------------

    def command(self, name):
        """注册一个可在界面上点击执行的命令。"""
        def deco(fn):
            self._commands[name] = fn
            return fn
        return deco

    def on_init(self, fn):
        self._on_init = fn
        return fn

    def on_shutdown(self, fn):
        self._on_shutdown = fn
        return fn

    # -------------------------------- 底层 IO -------------------------------

    def _write(self, obj):
        with self._lock:
            self._stdout.write(json.dumps(obj, ensure_ascii=False) + "\n")
            self._stdout.flush()

    def _read_line(self):
        line = sys.stdin.readline()
        if not line:
            return None
        line = line.strip()
        if not line:
            return {}
        try:
            return json.loads(line)
        except ValueError:
            return {}

    # ------------------------------ 调用宿主能力 ----------------------------

    def _request(self, method, params):
        """发起一次需要回执的调用，阻塞直到拿到结果。"""
        self._seq += 1
        rid = self._seq
        self._write({"id": rid, "method": method, "params": params or {}})

        while True:
            msg = self._read_line()
            if msg is None:
                raise PluginError("与宿主的连接已断开")
            if msg.get("id") == rid and ("result" in msg or "error" in msg):
                if "error" in msg and msg["error"]:
                    raise PluginError(msg["error"].get("message", "未知错误"))
                return msg.get("result")
            # 处理期间收到的其它消息先攒着，交还给主循环
            if msg.get("method"):
                self._pending_inbox.append(msg)

    def editor(self, method, **params):
        """调用编辑器接口，例如 editor("addShape", shape="cube")。"""
        if not method.startswith("editor."):
            method = "editor." + method
        return self._request(method, params)

    def host(self, method, **params):
        if not method.startswith("host."):
            method = "host." + method
        return self._request(method, params)

    # -------------------------------- 便捷方法 ------------------------------

    def log(self, message, level="info"):
        self._write({"method": "host.log", "params": {"level": level, "message": str(message)}})

    def warn(self, message):
        self.log(message, "warn")

    def error(self, message):
        self.log(message, "error")

    def progress(self, percent, message=""):
        self._write({"method": "host.progress", "params": {"percent": percent, "message": message}})

    def toast(self, message):
        return self.editor("toast", message=str(message))

    def get_config(self):
        self.config = self.host("getConfig") or {}
        return self.config

    def set_config(self, config):
        self.config = config
        return self.host("setConfig", config=config)

    def ask(self, title, default=""):
        """弹出输入框，返回用户输入的字符串；用户取消时返回 None。"""
        return self.editor("prompt", title=title, defaultValue=default)

    def confirm(self, message, detail=""):
        return self.editor("confirm", message=message, detail=detail)

    # 常用场景操作的语法糖
    def add_shape(self, shape, pos=(0, 0, 0), color=None, scale=1, rot_y=0, opacity=1, no_history=False):
        return self.editor("addShape", shape=shape, pos=list(pos), color=color,
                           scale=scale, rotY=rot_y, opacity=opacity, noHistory=no_history)

    def add_shapes(self, items):
        return self.editor("addShapes", items=items)

    def add_text(self, text, pos=(0, 0, 0), color=None, font_size=80, direction="h"):
        return self.editor("addText", text=text, pos=list(pos), color=color,
                           fontSize=font_size, direction=direction)

    def list_objects(self):
        return self.editor("listObjects")

    def clear_scene(self):
        return self.editor("clearScene")

    # --------------------------------- 主循环 -------------------------------

    def _dispatch(self, msg):
        method = msg.get("method")
        params = msg.get("params") or {}
        mid = msg.get("id")

        if method == "plugin.init":
            self.config = params.get("config") or {}
            self.lang = params.get("lang", "zh-CN")
            self.plugin_dir = params.get("pluginDir", self.plugin_dir)
            self.data_dir = params.get("dataDir", self.data_dir)
            if self._on_init:
                try:
                    self._on_init(params)
                except Exception as e:
                    self.error("初始化失败: %s" % e)
            self._write({"method": "plugin.ready"})
            return

        if method == "plugin.shutdown":
            if self._on_shutdown:
                try:
                    self._on_shutdown()
                except Exception:
                    pass
            self._running = False
            return

        if method == "plugin.invoke":
            cmd = params.get("command")
            payload = params.get("payload") or {}
            fn = self._commands.get(cmd)
            if not fn:
                if mid is not None:
                    self._write({"id": mid, "error": {"message": "未注册的命令: %s" % cmd}})
                return
            try:
                result = fn(payload)
                if mid is not None:
                    self._write({"id": mid, "result": result})
            except PluginError as e:
                if mid is not None:
                    self._write({"id": mid, "error": {"message": str(e)}})
            except Exception as e:
                import traceback
                self.error(traceback.format_exc())
                if mid is not None:
                    self._write({"id": mid, "error": {"message": "%s: %s" % (type(e).__name__, e)}})
            return

    def run(self):
        """进入消息循环，阻塞直到宿主要求退出。"""
        while self._running:
            while self._pending_inbox:
                self._dispatch(self._pending_inbox.pop(0))
                if not self._running:
                    return
            msg = self._read_line()
            if msg is None:
                break
            if msg.get("method"):
                self._dispatch(msg)
