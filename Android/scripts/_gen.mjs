import fs from 'fs';
let code = fs.readFileSync('_mod_extract.mjs', 'utf8');
code = code
  .replace(/import \* as THREE from 'three';/, '')
  .replace(/import \{ OrbitControls \} from ['"]three\/addons\/controls\/OrbitControls\.js[^'"]*['"];/, '')
  .replace(/import \{ TransformControls \} from ['"]three\/addons\/controls\/TransformControls\.js[^'"]*['"];/, '');

const header = `
function __mp(){
  const fn = function(){ return __mp(); };
  return new Proxy(fn, {
    get(t, prop){
      if(prop === Symbol.toPrimitive) return ()=>0;
      if(prop === 'valueOf') return ()=>0;
      if(prop === 'toString') return ()=>'';
      if(prop === Symbol.iterator) return function*(){};
      if(prop === 'then') return undefined;
      if(prop === 'length') return 0;
      return __mp();
    },
    set(){ return true; },
    apply(){ return __mp(); },
    construct(){ return __mp(); }
  });
}
const THREE = __mp();
const OrbitControls = function(){ return __mp(); };
const TransformControls = function(){ return __mp(); };
const __el = __mp();
const document = {
  getElementById: () => __el,
  querySelector: () => __el,
  querySelectorAll: () => [],
  createElement: () => __el,
  createElementNS: () => __el,
  addEventListener: () => {},
  body: __el,
  documentElement: __el,
  head: __el
};
const location = { search: '', href: '' };
const matchMedia = () => ({ matches: false, addEventListener(){}, addListener(){} });
const requestAnimationFrame = () => 0;
const performance = { now: () => 0 };
const navigator = { userAgent: 'node' };
const getComputedStyle = () => __el;
const window = {
  devicePixelRatio: 1, innerWidth: 1280, innerHeight: 720,
  addEventListener(){}, removeEventListener(){}, matchMedia,
  location, navigator, getComputedStyle, requestAnimationFrame,
  performance, document, localStorage: { getItem:()=>null, setItem(){} },
  sessionStorage: { getItem:()=>null, setItem(){} },
  __THREE__: '160'
};
function gset(k,v){ try{ globalThis[k]=v; }catch(e){ try{ Object.defineProperty(globalThis,k,{value:v,configurable:true}); }catch(e2){} } }
gset('window', window);
gset('document', document);
gset('location', location);
gset('matchMedia', matchMedia);
gset('requestAnimationFrame', requestAnimationFrame);
gset('performance', performance);
gset('navigator', navigator);
gset('getComputedStyle', getComputedStyle);
gset('localStorage', window.localStorage);
gset('alert', (m)=>console.log('ALERT:', m));
gset('addEventListener', window.addEventListener);
gset('removeEventListener', window.removeEventListener);
try {
`;
const footer = `
  console.log('INIT_OK: module executed to end without throwing');
} catch (e) {
  console.log('RUNTIME_ERROR:', e && e.stack ? e.stack : e);
}
`;
fs.writeFileSync('_run_mod.mjs', header + code + footer);
console.log('generated _run_mod.mjs');
