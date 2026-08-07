# -*- coding: utf-8 -*-
"""
参数化造型 —— Python 插件示例

展示三件事：
  1. 用数学公式批量生成三维结构（纯标准库，不需要装任何第三方包）
  2. 与用户交互（输入参数、确认）
  3. 把场景数据写成本地报告文件

若安装了 numpy，波场命令会自动改用 numpy 计算，用于演示第三方库的用法。
"""

import sys
import os
import math
import json
import datetime

sys.path.insert(0, os.environ.get("CUBE3D_SDK_DIR", ""))
from cube3d import Plugin  # noqa: E402

app = Plugin()


def hsl_hex(h, s=0.75, l=0.55):
    """HSL -> #RRGGBB"""
    h = h % 360
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs((h / 60.0) % 2 - 1))
    m = l - c / 2
    if h < 60:
        r, g, b = c, x, 0
    elif h < 120:
        r, g, b = x, c, 0
    elif h < 180:
        r, g, b = 0, c, x
    elif h < 240:
        r, g, b = 0, x, c
    elif h < 300:
        r, g, b = x, 0, c
    else:
        r, g, b = c, 0, x
    return "#%02x%02x%02x" % (int((r + m) * 255), int((g + m) * 255), int((b + m) * 255))


@app.on_init
def _init(params):
    app.log("参数化造型插件已加载，Python %s" % sys.version.split()[0])


# --------------------------------- 螺旋楼梯 ---------------------------------

@app.command("spiral")
def spiral(payload):
    text = app.ask("螺旋台阶数量（10 ~ 200）", "60")
    if text is None:
        return "已取消"
    try:
        steps = max(10, min(200, int(text)))
    except ValueError:
        steps = 60

    radius = 6.0
    turns = 3.0
    height = 18.0
    items = []
    for i in range(steps):
        t = i / float(steps)
        angle = t * turns * 2 * math.pi
        items.append({
            "shape": "box",
            "pos": [math.cos(angle) * radius, t * height, math.sin(angle) * radius],
            "color": hsl_hex(t * 300),
            "scale": 0.9,
            "rotY": -angle,
        })
        if i % 10 == 0:
            app.progress(int(t * 80), "生成第 %d 级台阶" % i)

    app.add_shapes(items)
    app.editor("setCamera", preset="persp")
    app.progress(100, "完成")
    return "已生成 %d 级螺旋楼梯" % steps


# --------------------------------- 正弦波场 ---------------------------------

@app.command("wave")
def wave(payload):
    n = 18
    amp = 3.0
    gap = 1.6
    items = []

    try:
        import numpy as np  # 若装了 numpy 就用它，演示第三方库
        xs = np.linspace(-n / 2.0, n / 2.0, n)
        zs = np.linspace(-n / 2.0, n / 2.0, n)
        xx, zz = np.meshgrid(xs, zs)
        yy = np.sin(np.sqrt(xx ** 2 + zz ** 2) * 0.8) * amp
        app.log("使用 numpy %s 计算波场" % np.__version__)
        for i in range(n):
            for j in range(n):
                y = float(yy[i][j])
                items.append({
                    "shape": "cylinder",
                    "pos": [float(xx[i][j]) * gap, y + amp, float(zz[i][j]) * gap],
                    "color": hsl_hex((y + amp) / (2 * amp) * 240),
                    "scale": 0.45,
                })
    except ImportError:
        app.log("未检测到 numpy，改用标准库计算（可在「运行时与库」中安装 numpy 体验差异）", "warn")
        for i in range(n):
            for j in range(n):
                x = (i - n / 2.0)
                z = (j - n / 2.0)
                y = math.sin(math.sqrt(x * x + z * z) * 0.8) * amp
                items.append({
                    "shape": "cylinder",
                    "pos": [x * gap, y + amp, z * gap],
                    "color": hsl_hex((y + amp) / (2 * amp) * 240),
                    "scale": 0.45,
                })

    app.add_shapes(items)
    return "已生成 %d 根波场立柱" % len(items)


# --------------------------------- 球面点阵 ---------------------------------

@app.command("sphere_points")
def sphere_points(payload):
    text = app.ask("球面上的点数（20 ~ 400）", "150")
    if text is None:
        return "已取消"
    try:
        count = max(20, min(400, int(text)))
    except ValueError:
        count = 150

    radius = 8.0
    golden = math.pi * (3 - math.sqrt(5))   # 黄金角，用于均匀分布
    items = []
    for i in range(count):
        y = 1 - (i / float(count - 1)) * 2
        r = math.sqrt(max(0.0, 1 - y * y))
        theta = golden * i
        items.append({
            "shape": "sphere",
            "pos": [math.cos(theta) * r * radius, y * radius + radius + 1, math.sin(theta) * r * radius],
            "color": hsl_hex(i * 360.0 / count),
            "scale": 0.35,
        })

    app.add_shapes(items)
    return "已在球面上均匀放置 %d 个点" % count


# -------------------------------- 场景报告 ---------------------------------

@app.command("report")
def report(payload):
    objs = app.list_objects()
    if not objs:
        return "场景为空，没有可导出的内容"

    kinds = {}
    shapes = {}
    for o in objs:
        kinds[o.get("kind")] = kinds.get(o.get("kind"), 0) + 1
        if o.get("shape"):
            shapes[o["shape"]] = shapes.get(o["shape"], 0) + 1

    xs = [o["pos"][0] for o in objs]
    ys = [o["pos"][1] for o in objs]
    zs = [o["pos"][2] for o in objs]

    data = {
        "生成时间": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "对象总数": len(objs),
        "类型分布": kinds,
        "图形分布": shapes,
        "包围盒": {
            "x": [round(min(xs), 3), round(max(xs), 3)],
            "y": [round(min(ys), 3), round(max(ys), 3)],
            "z": [round(min(zs), 3), round(max(zs), 3)],
        },
    }

    out = os.path.join(app.data_dir, "场景报告.json")
    app.host("writeFile", path=out, data=json.dumps(data, ensure_ascii=False, indent=2))
    app.toast("报告已导出：%s" % out)
    return "已导出报告，共统计 %d 个对象" % len(objs)


app.run()
