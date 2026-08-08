import fs from 'fs';

const files = [
  'Android/index.html',
  'PC/index.html',
  'Web/index.html',
  'Android/www/index.html',
  'Android/android/app/src/main/assets/public/index.html'
];

// ---------- 正式法律文本（本地型 3D 编辑器：无账号系统，数据存本地） ----------
const TOS = `<h4>服务协议</h4>
<p>欢迎使用立方·三维图形设计工坊（以下简称“本软件”）。本软件是一款基于浏览器与本地设备运行的三维图形设计与编辑工具，<strong>您无需注册账号、无需登录，即可直接在本机打开并使用全部基础功能。</strong>请您在下载、安装或使用本软件前，务必仔细阅读并充分理解本协议的全部条款，特别是以加粗形式标注的免责与限制责任条款。一旦您开始使用本软件，即视为您已阅读、理解并同意接受本协议约束。</p>
<h4>第一条 协议的接受与效力</h4>
<p>（一）本协议是您与本软件开发运营方之间关于使用本软件所订立的协议，并连同《免责声明》《隐私政策》及相关补充说明共同构成完整约定。<strong>如您不同意任一文件的任何条款，请勿使用本软件。</strong></p>
<p>（二）您在使用本软件过程中点击确认、勾选同意或实际使用本软件的行为，均构成对本协议的接受，本协议自您开始使用之日起对您生效。</p>
<p>（三）<strong>若您为未成年人，请在监护人陪同并征得其同意后使用本软件，监护人应承担相应的监护与引导责任。</strong></p>
<h4>第二条 软件与服务说明</h4>
<p>（一）本软件提供三维图形创建、编辑、标注、便签、导出与导入等功能，主要运行于您的本地设备（浏览器、桌面端或移动端），<strong>其核心创作数据默认保存在您本机，并不依赖任何网络账号即可使用。</strong></p>
<p>（二）我们可能根据产品规划，在不同平台（Web、PC、Android 等）提供功能略有差异的版本，具体功能以您所使用版本为准。</p>
<p>（三）本软件可能包含或调用第三方开源库（如 Three.js、WebGL 相关组件），相关权利归属原权利人，并受其各自开源协议约束。</p>
<h4>第三条 使用授权</h4>
<p>（一）<strong>我们授予您一项非独占、不可转让、可撤销的有限许可，允许您为个人或非商业用途在本机安装、访问和使用本软件。</strong></p>
<p>（二）未经我们书面许可，您不得对本软件进行反向工程、反编译、破解、出租、出售、再许可或用于任何商业性提供服务的用途。</p>
<p>（三）您理解并同意，本软件按“现状”提供，我们保留随时修改、暂停或终止部分或全部功能的权利，且不就此向您承担额外责任。</p>
<h4>第四条 使用费用</h4>
<p>（一）在现行版本下，本软件的基础功能免费向您提供。<strong>如未来我们就特定高级功能收取费用，会提前以显著方式告知，并在您明确确认后生效，不会对已免费功能追溯收费。</strong></p>
<p>（二）您因使用本软件所产生的网络、设备、流量、存储等成本，由您自行承担。</p>
<h4>第五条 用户内容与知识产权</h4>
<p>（一）<strong>您在本软件中创建、绘制、导入、标注、导出的全部内容（包括但不限于三维模型、场景、便签、文字与图片），其知识产权与相关权益归您所有，或由您依法取得相应授权。</strong></p>
<p>（二）您应对您所创作与上传内容的合法性、真实性负责，确保不侵犯他人著作权、商标权、肖像权、隐私权等合法权益。</p>
<p>（三）您授予我们一项非独占、免费、全球范围内的许可，仅为向您提供、维护与改进本软件之目的，在您本机及必要的技术处理范围内使用您的上述内容；我们不会将您的创作内容用于与上述目的无关的对外公开或商业利用。</p>
<h4>第六条 使用规范与禁止行为</h4>
<p>（一）您承诺在使用本软件时遵守所在国家与地区的法律法规，不得利用本软件制作、复制、发布、传播任何违法、侵权或违背公序良俗的内容。</p>
<p>（二）<strong>您不得利用本软件从事下列行为，否则我们保留在不事先通知的情况下限制、暂停或终止您使用本软件的权利：</strong>（1）制作或传播危害国家安全、煽动暴力、恐怖主义或仇恨言论的内容；（2）制作或传播色情、赌博、诈骗或侵犯他人权益的内容；（3）干扰、攻击、逆向破解本软件或第三方服务；（4）以任何方式规避本软件的技术限制或安全机制。</p>
<h4>第七条 数据与本地存储</h4>
<p>（一）<strong>本软件以本地存储为主，您创作的数据通常保存在您的设备本地（如浏览器本地存储、应用沙盒或您指定的导出文件）。本软件不依赖云端账号同步您的核心创作数据。</strong></p>
<p>（二）您应自行对重要创作内容进行备份与导出。<strong>因设备损坏、浏览器清理、应用卸载、系统重置或操作失误导致的本地数据丢失，我们无法保证恢复，相关风险与损失由您自行承担。</strong></p>
<p>（三）您主动导出的文件由您自行保管，导出的完整性与后续可用性取决于您的设备与文件管理。</p>
<h4>第八条 第三方服务与开源组件</h4>
<p>（一）本软件可能包含或链接至第三方网站、服务、资源或开源组件。<strong>我们对第三方的可用性、内容、隐私政策及服务质量不作任何保证，您与第三方的交互风险由您自行承担。</strong></p>
<p>（二）第三方开源组件按其各自许可协议提供，您使用相关功能即视为接受相应开源协议的约束。</p>
<h4>第九条 免责与责任限制</h4>
<p>（一）在适用法律允许的最大范围内，本软件按“现状”提供，我们对因使用或无法使用本软件而产生的任何间接、附带、特殊或惩罚性损失不承担责任，亦不保证本软件不间断、无错误或完全满足您的特定需求。</p>
<p>（二）<strong>三维渲染效果受设备性能、显卡、驱动、系统环境与浏览器差异影响，我们不对渲染结果的一致性、精度或适用性作出明示或默示担保。</strong></p>
<h4>第十条 协议变更</h4>
<p><strong>我们可能根据法律法规或业务调整适时修订本协议。修订后的协议将在本软件内公示，若您继续使用，即视为接受修订内容；若您不同意，请停止使用本软件。</strong></p>
<h4>第十一条 终止</h4>
<p>（一）您可随时停止使用并卸载本软件，您在本机的数据可依据《隐私政策》与本地设置进行处理。</p>
<p>（二）<strong>如您违反本协议，我们可依据情节终止或限制您对本软件的使用，由此产生的不便或损失由您自行承担。</strong></p>
<h4>第十二条 争议解决与适用法律</h4>
<p>（一）本协议的订立、效力、解释及争议解决，适用您所在国家与地区的相关法律法规。</p>
<p>（二）因本协议产生的争议，双方应友好协商解决；协商不成的，您同意提交有管辖权的人民法院诉讼解决。</p>
<h4>第十三条 联系与其他</h4>
<p>（一）如您对本协议有任何疑问，可通过本软件“关于”页面提供的联系方式与我们沟通。</p>
<p>（二）<strong>本协议任一条款被认定为无效或不可执行的，不影响其余条款的效力。</strong></p>
<p>（三）本协议以简体中文版本为准；如提供其他语言版本，仅供参考，以中文版本为准。</p>`;

const DIS = `<h4>免责声明</h4>
<p>本《免责声明》为《服务协议》不可分割的组成部分。<strong>您使用本软件即表示已知悉并同意以下全部免责内容。本软件无需注册账号，所有创作数据默认保存在您本地设备。</strong></p>
<h4>第一条 服务按“现状”提供</h4>
<p>本软件及其功能按“现状”与“可用”基础提供。<strong>我们已尽力确保其准确与稳定，但不对其正确性、时效性、适用性、无中断性或无错误性作出任何明示或默示担保。</strong>您应独立判断并自行承担据此作出决策与创作的风险。</p>
<h4>第二条 渲染与结果不保证</h4>
<p>本软件涉及三维建模、图形渲染与动画预览等操作，<strong>因设备性能、显卡型号、驱动版本、系统环境、浏览器差异或第三方图形接口不同，实际显示与导出效果可能与预览存在差异。我们不保证渲染结果的一致性、精度或满足特定用途。</strong></p>
<h4>第三条 本地数据丢失风险</h4>
<p><strong>您创作的内容默认保存在本地设备。因设备故障、系统崩溃、浏览器清理缓存、应用卸载、系统重置、存储损坏或您的误操作导致的数据丢失、损坏或无法读取，我们不承担责任，亦不保证可恢复。</strong>请您务必定期导出与备份重要作品。</p>
<h4>第四条 用户内容责任</h4>
<p>您在本软件中创建、导入、上传或分享的全部内容，其合法性、真实性由您负责。<strong>因您的内容侵犯他人权利、违反法律法规或造成任何第三方损害而引发的纠纷与责任，均由您自行承担，我们不承担任何连带责任。</strong></p>
<h4>第五条 第三方组件与链接</h4>
<p>本软件可能包含、调用或链接至第三方开源库、网站、服务或资源（如 Three.js 及相关 WebGL 组件）。<strong>我们对第三方的内容、隐私政策、许可条款及服务可用性不作任何保证，亦不承担任何责任，您与第三方的交互风险自行承担。</strong></p>
<h4>第六条 导出文件与兼容性</h4>
<p><strong>您导出的工程文件、图片或模型，其后续在其他设备、其他软件或更高版本中的打开与兼容情况，我们无法保证。请保留原始文件并自行验证可用性。</strong></p>
<h4>第七条 不可抗力</h4>
<p>对于因自然灾害、战争、政府行为、网络攻击、电力或通信中断、平台政策变更等不可抗力或不可归责于我们的原因导致的服务中断、功能受限或数据损失，我们不承担违约责任。</p>
<h4>第八条 未成年人</h4>
<p><strong>若您为未成年人，请在监护人陪同下阅读本声明并在其同意下使用本软件。监护人应引导未成年人健康、合法地使用本软件，并承担相应监护责任。</strong></p>
<h4>第九条 责任限制</h4>
<p>在适用法律允许的最大范围内，<strong>我们对因使用或无法使用本软件所产生的任何直接、间接、附带、特殊、惩罚性或后果性损失（包括数据丢失、利润损失、设备损害）不承担责任，</strong>即使我们已被告知此类损害的可能性。</p>
<h4>第十条 声明变更</h4>
<p><strong>本声明可能随软件更新而调整，更新后将通过本软件公示。您继续使用即视为接受更新后的内容；若您不同意，请停止使用本软件。</strong></p>`;

const PRI = `<h4>隐私政策</h4>
<p>我们高度重视您的个人信息与隐私保护。<strong>本软件无需注册账号，不收集您的账号名、密码或登录凭证。请您仔细阅读本政策，了解我们如何（以及在何种有限范围内）处理相关信息。</strong>使用本软件即表示您同意本政策的约定。</p>
<h4>第一条 我们是否收集账号信息</h4>
<p><strong>本软件不提供账号系统，您无需注册或登录即可使用。我们不会收集、存储您的用户名、密码、邮箱、手机号等账号类个人信息，也不会建立与您身份绑定的用户档案。</strong></p>
<h4>第二条 本地存储的创作数据</h4>
<p>（一）<strong>您在本软件中创建的三维模型、场景、便签、标注、文字与图片等创作内容，默认保存在您的本地设备（浏览器本地存储、应用沙盒或您导出的文件），而非上传至我们的服务器。</strong></p>
<p>（二）除为向您提供本机功能所必需的技术处理外，我们通常不会主动读取、上传或传输您的创作内容。</p>
<h4>第三条 我们可能收集的信息</h4>
<p>为改进产品与保障安全，在您使用本软件时，我们可能在本地或经您授权后收集有限的以下信息：<strong>（1）设备与运行信息，如设备型号、操作系统与版本、浏览器类型；（2）技术诊断与崩溃日志，用于定位故障；（3）匿名化的使用统计（如功能使用频次），如您未关闭相关诊断选项。</strong>上述信息的收集以必要为限，且我们尽量进行去标识化处理。</p>
<h4>第四条 信息的使用目的</h4>
<p>上述有限信息仅用于：为您提供、维护与改进本软件；定位与修复故障；保障安全与稳定；以及经您授权或法律要求的其他目的。<strong>我们不会将您的个人信息用于与上述目的无关的商业营销，除非获得您的明确同意。</strong></p>
<h4>第五条 信息共享与披露</h4>
<p><strong>我们不向任何第三方出售您的个人信息。仅在下列情形下，我们才会在必要范围内共享：</strong>（1）为遵守适用法律法规、司法或监管要求；（2）为保护本软件、您或公众的安全与合法权益；（3）经您事先明确同意。对于共享的信息，我们会要求接收方履行相应的保密义务。</p>
<h4>第六条 数据存储与安全</h4>
<p>（一）您的核心创作数据主要存储于本地设备。<strong>我们采取合理的技术与管理措施保护所接触的信息安全，但任何本地存储与网络传输均无法保证绝对安全，您亦应妥善保管自身设备、及时备份并避免在不信任环境中使用。</strong></p>
<p>（二）如我们因诊断需要临时收集崩溃日志等信息，将在合理期限后删除或匿名化处理。</p>
<h4>第七条 您的权利与控制</h4>
<p>（一）<strong>您始终掌控自己的数据：您可随时在本地清除缓存、删除作品、卸载应用，或关闭诊断/统计选项。</strong></p>
<p>（二）如您对已收集的诊断信息有疑问，可通过本软件“关于”页面提供的联系方式与我们沟通，我们将在合理范围内配合处理。</p>
<h4>第八条 未成年人保护</h4>
<p><strong>我们不直接面向未成年人收集个人信息。如发生未成年人误触发诊断信息收集的情形，我们将在知晓后尽快删除相关数据，并建议未成年人在监护人指导下使用本软件。</strong></p>
<h4>第九条 跨境与地区</h4>
<p>本软件可能在不同地区提供。您使用本软件即表示理解并同意，我们依据所在地区的法律要求处理相关信息，并尽力符合当地关于个人信息保护的规范。</p>
<h4>第十条 政策变更</h4>
<p><strong>本政策可能随软件调整而更新，更新后将通过本软件公示。您继续使用即视为接受更新后的政策；若您不同意，请停止使用本软件。</strong></p>
<h4>第十一条 联系我们</h4>
<p>如您对隐私保护有任何疑问或行使权利的要求，可通过本软件“关于”页面提供的联系方式与我们沟通，我们将在合理时间内回复。</p>`;

// 去除换行，保证作为单引号 JS 字符串合法
const clean = s => s.replace(/\n+/g, '').replace(/\s+/g, ' ').trim();

function replaceKey(src, key, value) {
  const re = new RegExp(key + ":'[^']*'");
  if (!re.test(src)) throw new Error('未找到键: ' + key);
  return src.replace(re, key + ":'" + value + "'");
}

// ---------- 强制协议弹窗：浮窗 + 链接形式（点链接在站内 terms-modal 看全文） ----------
const GATE_BLOCK = `
<style id="tos-gate-style">
.toast { z-index: 99000 !important; }
.manual-toast { z-index: 99000 !important; }
/* 让站内条款弹窗显示在本浮窗之上 */
#terms-modal { z-index: 100020 !important; }
.tos-gate { position:fixed; inset:0; z-index:100000; display:none; background:rgba(8,10,18,.55); align-items:center; justify-content:center; padding:22px; }
.tos-gate.show { display:flex; }
.tos-gate-inner { width:min(440px, 94vw); max-height:88vh; display:flex; flex-direction:column; background:var(--bg-panel-solid); color:var(--text); border:1px solid var(--border); border-radius:18px; box-shadow:0 24px 70px rgba(0,0,0,.55); animation:tosIn .25s ease; overflow:hidden; }
@keyframes tosIn { from{opacity:0; transform:translateY(10px) scale(.98);} to{opacity:1; transform:none;} }
.tos-gate-head { padding:20px 20px 12px; border-bottom:1px solid var(--border); }
.tos-gate-head h2 { margin:0 0 8px; font-size:18px; }
.tos-gate-head p { margin:0; font-size:12.5px; color:var(--text-dim); line-height:1.7; }
.tos-gate-links { display:flex; flex-direction:column; gap:10px; padding:16px 20px; overflow-y:auto; }
.tos-gate-link { display:flex; align-items:center; gap:10px; width:100%; text-align:left; cursor:pointer; padding:13px 14px; border:1px solid var(--border); border-radius:12px; background:var(--control-bg); color:var(--text); font-size:14px; font-family:inherit; transition:border-color .18s, background .18s; }
.tos-gate-link:hover { border-color:var(--accent); background:color-mix(in srgb, var(--accent) 8%, var(--bg-panel)); }
.tos-gate-link:active { transform:scale(.99); }
.tos-gate-link-ico { color:var(--accent); width:18px; flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; }
.tos-gate-link-title { flex:1; font-weight:600; }
.tos-gate-link-arrow { color:var(--text-dim); font-size:15px; }
.tos-gate-actions { display:flex; gap:12px; padding:14px 20px calc(14px + env(safe-area-inset-bottom)); border-top:1px solid var(--border); }
.tos-gate-btn { flex:1; padding:12px; border-radius:10px; border:1px solid var(--border); background:var(--control-bg); color:var(--text); font-size:15px; cursor:pointer; font-family:inherit; }
.tos-gate-btn.primary { background:var(--accent); border-color:var(--accent); color:#fff; }
.tos-gate-btn.exit { background:transparent; }
.tos-gate-blocked { position:absolute; inset:0; display:none; flex-direction:column; align-items:center; justify-content:center; gap:18px; padding:30px; text-align:center; background:var(--bg-panel-solid); border-radius:18px; }
.tos-gate-blocked p { max-width:420px; font-size:14px; line-height:1.8; color:var(--text); }
</style>
<div id="tos-gate" class="tos-gate">
  <div class="tos-gate-inner">
    <div class="tos-gate-head">
      <h2 data-i18n="tosGateTitle">服务协议与隐私政策</h2>
      <p data-i18n="tosGateSub">请您先阅读以下文件（点击链接查看全文），确认理解并同意全部条款后，点击下方“同意并继续”。如不同意，请选择“不同意并退出”，将无法使用本软件。</p>
    </div>
    <div class="tos-gate-links">
      <button type="button" class="tos-gate-link" data-term="tos">
        <span class="tos-gate-link-ico"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8M8 9h2"/></svg></span>
        <span class="tos-gate-link-title" data-i18n="tosLink">服务协议</span>
        <span class="tos-gate-link-arrow">›</span>
      </button>
      <button type="button" class="tos-gate-link" data-term="disclaimer">
        <span class="tos-gate-link-ico"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
        <span class="tos-gate-link-title" data-i18n="disclaimerLink">免责声明</span>
        <span class="tos-gate-link-arrow">›</span>
      </button>
      <button type="button" class="tos-gate-link" data-term="privacy">
        <span class="tos-gate-link-ico"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
        <span class="tos-gate-link-title" data-i18n="privacyLink">隐私政策</span>
        <span class="tos-gate-link-arrow">›</span>
      </button>
    </div>
    <div class="tos-gate-actions">
      <button class="tos-gate-btn primary" id="tos-gate-accept" data-i18n="tosGateAccept">同意并继续</button>
      <button class="tos-gate-btn exit" id="tos-gate-exit" data-i18n="tosGateExit">不同意并退出</button>
    </div>
    <div class="tos-gate-blocked">
      <p data-i18n="tosGateBlocked">您尚未同意《服务协议》《免责声明》《隐私政策》，无法使用本软件。请点击下方按钮重新阅读并同意，或手动关闭本页面 / 退出应用。</p>
      <button class="tos-gate-btn primary" id="tos-gate-reread" data-i18n="tosGateReread">重新阅读</button>
    </div>
  </div>
</div>`;

// ---------- 强制协议弹窗：JS（注入主 IIFE 内，可访问 T / termsMap / backEntry） ----------
const GATE_JS = `
  // ===== 首次打开：强制阅读并确认协议，未确认不得关闭 / 不得使用 =====
  function tosGateOpen(){ var g=document.getElementById('tos-gate'); return !!(g && g.classList.contains('show')); }
  function showTosGate(){
    var g=document.getElementById('tos-gate'); if(!g) return;
    g.classList.add('show');
    document.body.style.overflow='hidden';
  }
  function acceptTos(){
    try{ localStorage.setItem('tosAccepted','1'); }catch(e){}
    var g=document.getElementById('tos-gate'); if(g) g.classList.remove('show');
    document.body.style.overflow='';
  }
  function exitTos(){
    if(window.AndroidExit && typeof window.AndroidExit.finish==='function'){ try{ window.AndroidExit.finish(); return; }catch(e){} }
    var g=document.getElementById('tos-gate'); if(!g) return;
    var blocked=g.querySelector('.tos-gate-blocked'); if(blocked) blocked.style.display='flex';
    var actions=g.querySelector('.tos-gate-actions'); if(actions) actions.style.display='none';
    var links=g.querySelector('.tos-gate-links'); if(links) links.style.display='none';
  }
  function rereadTos(){
    var g=document.getElementById('tos-gate'); if(!g) return;
    var blocked=g.querySelector('.tos-gate-blocked'); if(blocked) blocked.style.display='none';
    var actions=g.querySelector('.tos-gate-actions'); if(actions) actions.style.display='flex';
    var links=g.querySelector('.tos-gate-links'); if(links) links.style.display='flex';
  }
  // 从浮窗内点击链接，打开站内条款详情查看全文
  function tosOpenTerm(key){
    if(typeof termsMap==='undefined' || !termsMap || !termsModal) return;
    var m = termsMap[key]; if(!m) return;
    try{
      termsModalTitle.textContent = T(m.title);
      termsModalBody.innerHTML = T(m.body);
      termsModal.classList.add('show');
    }catch(e){}
  }
  function initTosGate(){
    var accepted=false; try{ accepted=localStorage.getItem('tosAccepted')==='1'; }catch(e){}
    if(accepted) return;
    var g=document.getElementById('tos-gate'); if(!g) return;
    document.getElementById('tos-gate-accept').addEventListener('click', acceptTos);
    document.getElementById('tos-gate-exit').addEventListener('click', exitTos);
    document.getElementById('tos-gate-reread').addEventListener('click', rereadTos);
    g.querySelectorAll('.tos-gate-link').forEach(function(btn){
      btn.addEventListener('click', function(){ tosOpenTerm(btn.getAttribute('data-term')); });
    });
    showTosGate();
    // 阻止 ESC / 系统返回键关闭本协议弹窗（未做选择不得退出）
    window.addEventListener('keydown', function(e){
      if(!tosGateOpen()) return;
      if(e.key==='Escape'){ e.preventDefault(); e.stopPropagation(); return; }
      var allow=['Tab','Enter',' ','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','PageUp','PageDown','Home','End'];
      if(allow.indexOf(e.key)<0){ e.preventDefault(); }
    }, true);
    var _be=backEntry; backEntry=function(){ if(tosGateOpen()) return; _be(); };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initTosGate); else initTosGate();`;

let ok = 0;
for (const f of files) {
  let src = fs.readFileSync(f, 'utf8');
  const before = src;

  // 1) 法律文本（仅 ZH_CN 中有，T() 回退到此）—— 无账号系统，数据存本地
  src = replaceKey(src, 'tosBody', clean(TOS));
  src = replaceKey(src, 'disclaimerBody', clean(DIS));
  src = replaceKey(src, 'privacyBody', clean(PRI));
  src = replaceKey(src, 'tosGateSub', clean('请您先阅读以下文件（点击链接查看全文），确认理解并同意全部条款后，点击下方“同意并继续”。如不同意，请选择“不同意并退出”，将无法使用本软件。'));

  // 2) 新增 i18n 键（仅首次）
  if (!src.includes("tosGateTitle:")) {
    src = src.replace(
      "manNoteQuoteTip:'点击折叠/展开引用原文',",
      "manNoteQuoteTip:'点击折叠/展开引用原文', tosGateTitle:'服务协议与隐私政策', tosGateSub:'请您先阅读以下文件（点击链接查看全文），确认理解并同意全部条款后，点击下方“同意并继续”。如不同意，请选择“不同意并退出”，将无法使用本软件。', tosGateExit:'不同意并退出', tosGateAccept:'同意并继续', tosGateBlocked:'您尚未同意《服务协议》《免责声明》《隐私政策》，无法使用本软件。请点击下方按钮重新阅读并同意，或手动关闭本页面 / 退出应用。', tosGateReread:'重新阅读', manExportFail:'导出失败',"
    );
  }

  // 3) 导出：增加失败反馈（避免“无声失败”，仅首次）
  const oldExport = "saveJsonViaSystem(name, data).then(function(ok){ if(ok!==false) toast(T('manExported')); });";
  if (src.includes(oldExport)) {
    src = src.split(oldExport).join(
      "saveJsonViaSystem(name, data).then(function(ok){ if(ok===true||ok==null) toast(T('manExported')); else toast(T('manExportFail')); });"
    );
  }

  // 4) 注入/替换 浮窗式强制协议弹窗（</body> 之前，幂等）
  if (src.includes('<style id="tos-gate-style">')) {
    src = src.replace(/<style id="tos-gate-style">[\s\S]*<\/div>\s*<\/body>/, GATE_BLOCK + '\n</body>');
  } else {
    src = src.replace('</body>', GATE_BLOCK + '\n</body>');
  }

  // 5) 注入/替换 浮窗式强制协议弹窗 JS（主 IIFE 结束前，幂等）
  if (src.includes('function tosGateOpen()')) {
    src = src.replace(/function tosGateOpen\(\)\{[\s\S]*?if\(document\.readyState==='loading'\) document\.addEventListener\('DOMContentLoaded', initTosGate\); else initTosGate\(\);/, GATE_JS);
  } else {
    src = src.replace(/\}\)\(\);\s*<\/script>/, GATE_JS + '\n})();\n</script>');
  }

  if (src === before) { console.error('无改动:', f); continue; }
  fs.writeFileSync(f, src, 'utf8');
  ok++;
  console.log('已更新:', f);
}
console.log('完成，更新文件数:', ok);
