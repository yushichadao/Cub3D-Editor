const http = require('http');
const net = require('net');
const crypto = require('crypto');
function getList(cb){http.get('http://127.0.0.1:9333/json/list',r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>cb(null,JSON.parse(d)));}).on('error',e=>cb(e));}
function wsConnect(p,onMsg,onOpen){const key=crypto.randomBytes(16).toString('base64');const sock=net.connect(9333,'127.0.0.1',()=>{sock.write(`GET ${p} HTTP/1.1\r\nHost: 127.0.0.1:9333\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`);});let hs=true,buf=Buffer.alloc(0);sock.on('data',chunk=>{buf=Buffer.concat([buf,chunk]);if(hs){const i=buf.indexOf('\r\n\r\n');if(i===-1)return;const h=buf.slice(0,i).toString();if(!/101/.test(h)){console.log('HSFAIL',h);return;}buf=buf.slice(i+4);hs=false;onOpen&&onOpen();}while(buf.length>=2){const b0=buf[0],b1=buf[1];const op=b0&0x0f,mk=(b1&0x80)!==0;let len=b1&0x7f,off=2;if(len===126){if(buf.length<4)return;len=buf.readUInt16BE(2);off=4;}else if(len===127){if(buf.length<10)return;len=Number(buf.readBigUInt64BE(2));off=10;}let m=null;if(mk){if(buf.length<off+4)return;m=buf.slice(off,off+4);off+=4;}if(buf.length<off+len)return;let pl=buf.slice(off,off+len);if(mk){const q=Buffer.alloc(len);for(let i=0;i<len;i++)q[i]=pl[i]^m[i&3];pl=q;}buf=buf.slice(off+len);if(op===0x1){try{onMsg(JSON.parse(pl.toString('utf8')));}catch(e){}}else if(op===0x8)sock.end();}});return{send(o){const data=Buffer.from(JSON.stringify(o),'utf8');const len=data.length;let hdr;if(len<126)hdr=Buffer.from([0x81,0x80|len]);else if(len<65536){hdr=Buffer.alloc(4);hdr[0]=0x81;hdr[1]=0x80|126;hdr.writeUInt16BE(len,2);}else{hdr=Buffer.alloc(10);hdr[0]=0x81;hdr[1]=0x80|127;hdr.writeBigUInt64BE(BigInt(len),2);}const mask=crypto.randomBytes(4);const md=Buffer.alloc(len);for(let i=0;i<len;i++)md[i]=data[i]^mask[i&3];sock.write(Buffer.concat([hdr,mask,md]));}};}
const t0 = Date.now();
const stamp = () => ((Date.now()-t0)/1000).toFixed(1)+'s';
getList((err,list)=>{
  if(err){console.log('LIST ERR',err.message);process.exit(1);}
  const page=list.find(t=>t.type==='page')||list[0];
  const ws=wsConnect(new URL(page.webSocketDebuggerUrl).pathname,msg=>{
    if(msg.method==='Page.lifecycleEvent'){console.log(stamp()+' LIFECYCLE '+msg.params.name);}
    else if(msg.method==='Page.domContentEventFired'){console.log(stamp()+' >> DOMContentLoaded');}
    else if(msg.method==='Page.loadEventFired'){console.log(stamp()+' >> loadEvent');}
    else if(msg.method==='Runtime.exceptionThrown'){const d=msg.params.exceptionDetails;console.log(stamp()+' EXCEPTION '+(d.exception&&(d.exception.description||d.exception.value)||d.text));}
  },()=>{
    ws.send({id:1,method:'Page.enable'});
    ws.send({id:2,method:'Runtime.enable'});
    console.log(stamp()+' connected, monitoring lifecycle...');
  });
  setTimeout(()=>process.exit(0),38000);
});
