import fs from 'fs';
const s = fs.readFileSync('c:/Users/yushi/Documents/trae_projects/3d-editor/index.html', 'utf8');

function countKeys(obj) {
  const m = s.match(new RegExp('(?:const|var)\\s+' + obj + '\\s*=\\s*\\{([\\s\\S]*?)\\n\\s*\\};'));
  if (!m) return 'NOTFOUND';
  const body = m[1];
  return (body.match(/\n\s*[A-Za-z0-9_]+\s*:/g) || []).length;
}
console.log('SHAPES_3D keys:', countKeys('SHAPES_3D'));
console.log('SHAPES_2D keys:', countKeys('SHAPES_2D'));

const pc = s.match(/PRESET_COLORS\s*=\s*\[([\s\S]*?)\];/);
console.log('PRESET_COLORS entries:', pc ? (pc[1].match(/0x[0-9a-fA-F]{6}/g) || []).length : 'NOTFOUND');

const pat = s.match(/PATTERNS\s*=\s*\[([\s\S]*?)\];/);
console.log('PATTERNS entries:', pat ? (pat[1].match(/\n\s*['"][^'"]+['"]\s*:/g) || []).length : 'NOTFOUND');

const fonts = s.match(/FONT_LIST\s*=\s*\[([\s\S]*?)\];/);
console.log('FONT_LIST entries:', fonts ? (fonts[1].match(/\n\s*['"][^'"]+['"]/g) || []).length : 'NOTFOUND');
