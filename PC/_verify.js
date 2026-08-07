const fs = require('fs');
const nsis = 'dist-build/Cube3D-Studio-Setup-1.0.0-x64.exe';
const buf = fs.readFileSync(nsis);
const u16 = buf.toString('utf16le');
const targets = ['安装完成', '立即启动 立方三维设计工坊', '立方三维设计工坊', '已成功安装到你的电脑'];
targets.forEach(t => console.log('NSIS UTF16 [' + t + ']:', u16.includes(t)));

const asar = 'dist-build/win-unpacked/resources/app.asar';
const abuf = fs.readFileSync(asar);
const u8 = abuf.toString('utf8');
['场景恢复', '检测到上次未正常关闭的场景', 'webConfirm', 'D.dialog.message'].forEach(t =>
  console.log('ASAR UTF8 [' + t + ']:', u8.includes(t)));
