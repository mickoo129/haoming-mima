function idCycles(pairs){var n=pairs.length,out=[];out.push({from:0,to:13,pair:pairs[0]});var age=13,i=1;while(age<98){var from=age,to=Math.min(age+5,98);out.push({from:from,to:to,pair:pairs[i%n]});age=to;i++;}return out;}
function srcTag(k){return '<span class="src src-'+k+'">'+(k==='c'?'課堂':k==='b'?'書':'筆記')+'</span>';}
function richStory(kind,pairs){var html='',good=pairs.filter(function(p){return FIELDS[p.field].pol==='吉';}).length,bad=pairs.filter(function(p){return FIELDS[p.field].pol==='凶';}).length,last=FIELDS[pairs[pairs.length-1].field];
if(kind==='id')html+='<p>身份證係流年。0–13歲之後每5年至98歲，星序重複。證件改唔到，用電話補。</p>';
else if(kind==='birth')html+='<p>先天命格出世就定，缺星用手機補。</p>';
else if(kind==='phone')html+='<p>手機係後天分身。尾段「'+last.name+'」。後4位決定約80%運勢；後面五位絕對不能有0。</p>';
else if(kind==='plate')html+='<p>車牌係交通磁場。尾段「'+last.name+'」。用車牌專頁講出行安危，唔好當成事業評語。</p>';
else if(kind==='account')html+='<p>銀行帳號睇錢進出。尾段「'+last.name+'」。</p>';
else if(kind==='address')html+='<p>門牌睇家宅同家人健康。尾段「'+last.name+'」。</p>';
else html+='<p>其他數字。尾段「'+last.name+'」：'+last.short+'。</p>';
html+='<p>吉 '+good+' 組、凶 '+bad+' 組。</p>';return html;}
function wikiCard(f){
 return '<div class="wiki-card"><h3><span class="ptag '+f.pol+'">'+f.rank+'</span> '+f.name+'</h3>'
  +'<p class="muted">組合：'+f.pairs.join('、')+'</p>'
  +'<p>'+srcTag('c')+'<strong>'+f.short+'</strong></p>'
  +'<div class="grid2"><div class="box g">'+srcTag('c')+'優點：'+f.pros.join('、')+'</div><div class="box b">'+srcTag('c')+'缺點：'+f.cons.join('、')+'</div></div>'
  +'<p>'+srcTag('c')+'<strong>事業</strong>：'+f.job+'</p>'
  +'<p>'+srcTag('c')+'<strong>錢財</strong>：'+f.wealth+'</p>'
  +'<p>'+srcTag('c')+'<strong>感情</strong>：'+f.love+'</p>'
  +'<p>'+srcTag('c')+'<strong>健康</strong>：'+f.health+'</p>'
  +(f.note?'<div class="hl-warn">'+srcTag('n')+f.note+'</div>':'')
  +(f.book?'<div class="hl-resolve">'+srcTag('b')+f.book+'</div>':'')
  +'</div>';
}
function compactStar(f){
 return '<div class="wiki-card" style="padding:12px;margin-bottom:10px"><h3 style="margin-bottom:6px"><span class="ptag '+f.pol+'">'+f.rank+'</span> '+f.name+'</h3>'
  +'<p>'+srcTag('c')+f.short+'。'+f.health+'</p>'
  +(f.book?'<p>'+srcTag('b')+f.book+'</p>':'')
  +'</div>';
}
function wikiAppendix(){
 var h='<div class="wiki-card"><h3>課堂附表（精簡，詳情見上頁六欄）</h3>';
 h+='<p>'+srcTag('c')+'化解：絕命→天醫；六煞→延年；禍害→生氣；五鬼→生氣＋天醫＋延年或延年；伏位→生氣／天醫／延年。</p>';
 h+='<p>'+srcTag('c')+'五鬼＋六煞：100%會離婚，單身。多鬼：95%婚姻不好。命＋害：肺，氣管。命＋鬼：精神病。命＋煞：腸，精神。命＋伏：頸椎，腰椎。鬼＋煞：大意外，血光。鬼＋害：基因遺傳病。</p>';
 h+='<p>'+srcTag('c')+'車牌：五鬼血光破財；六煞與另一半不和；禍害車上口角；絕命開快車意外。鬼＋煞易撞車；鬼＋絕自撞。</p>';
 h+='<p>'+srcTag('c')+'銀行卡：天醫帶財；延年工資／被動；五鬼破財；六煞花在感情；禍害衝動花；絕命投資漏。五鬼＋六煞大破財；五鬼＋絕命大進大出。唔好凶星或0／05結尾。</p></div>';
 return h;
}
function analyze(){try{if(window.currentKind)currentKind=window.currentKind;if(typeof window.currentProfile==='string')currentProfile=window.currentProfile;var digits='',birthMeta=null,preparedNote='';
if(currentKind==='birth'){var iso=document.getElementById('birthInput').value;if(!iso){alert('請擇出生日期');return;}birthMeta=birthCode(iso);digits=birthMeta.code;preparedNote=birthMeta.text;}
else{var raw=document.getElementById('numInput').value.trim();if(!raw){alert('請輸入數字');return;}
if(currentKind==='plate'){digits=plateToDigits(raw);preparedNote='車牌字母A=01…Z=26，號碼0已跳過 → '+digits;}
else {if(currentKind==='id'||currentKind==='address'||currentKind==='other'){var exp=expandLetters(raw);if(exp!==raw)preparedNote='字母已轉換（A=01…Z=26）→ '+extractDigits(exp);raw=exp;}digits=extractDigits(raw);}}
var pairs=buildPairs(digits,currentKind);if(!pairs.length){alert('有效位數唔夠');return;}
document.getElementById('results').style.display='block';
var roleHtml='<p><span class="tag">'+KIND_INFO[currentKind].tag+'</span>'+KIND_INFO[currentKind].text+'</p>';
if(currentKind==='phone'&&currentProfile){var pn={male:'男性',female:'女性',student:'學生',elder:'老年人'};roleHtml+='<p>身份：<strong>'+pn[currentProfile]+'</strong>（只用於手機教材分類提示）</p>';}
if(preparedNote)roleHtml+='<p class="muted">'+preparedNote+'</p>';
if(birthMeta)roleHtml+='<p>先天數：<strong>'+birthMeta.code+'</strong></p>';
document.getElementById('roleBox').innerHTML=roleHtml;
var counts={};pairs.forEach(function(p){counts[p.field]=(counts[p.field]||0)+1;});
document.getElementById('storyBox').innerHTML=richStory(currentKind,pairs);
var bar=document.getElementById('starBar');bar.innerHTML='';Object.keys(counts).forEach(function(k){var f=FIELDS[k];var chip=document.createElement('span');chip.className='star-chip '+f.pol;chip.textContent=f.name+' ×'+counts[k];bar.appendChild(chip);});
var titles={phone:'手機：點樣睇呢組號',id:'身份證流年解讀',birth:'先天命格解讀',plate:'車牌：出行安危',address:'門牌：家宅健康',account:'銀行帳號：錢財進出',other:'其他數字解讀'};
document.getElementById('kindReadTitle').textContent=titles[currentKind]||'類別解讀';
document.getElementById('kindReadBox').innerHTML=kindReadHtml(currentKind,pairs,digits);
var luckCard=document.getElementById('luckCard');
if(currentKind==='id'){luckCard.style.display='block';document.getElementById('luckGrid').innerHTML=idCycles(pairs).map(function(s){var p=s.pair,f=FIELDS[p.field];return '<div class="luck-item '+f.pol+'"><div><strong>'+s.from+'–'+s.to+'歲</strong></div><div>'+p.display+' · '+f.name+'（'+f.pol+'／'+f.rank+'）</div><div class="muted">'+srcTag('c')+'事業：'+JOB_TABLE[p.field]+'。感情：'+LOVE_TABLE[p.field]+'。健康：'+HEALTH_TABLE[p.field]+'</div></div>';}).join('');}else luckCard.style.display='none';
document.getElementById('pairFlow').innerHTML=pairs.map(function(p){var f=FIELDS[p.field];return '<div class="pair-row"><span class="pair-box">'+p.display+'</span> → <strong>'+f.name+'</strong> <span class="muted">'+f.pol+(p.note?'（'+p.note+'）':'')+'</span></div>';}).join('');
var oldPC=document.getElementById('phoneRuleCard');if(oldPC)oldPC.remove();
if(currentKind==='phone'){var zeroHits=checkPhoneZeros(digits);var ruleWarns=phoneTextbook(digits,pairs);
var extra='<div class="card" id="phoneRuleCard"><div class="card-title">手機定律／後五位0／身份組合</div>';
if(zeroHits.length){extra+='<p><strong>後五位0</strong></p><ul class="tight">';zeroHits.forEach(function(h){extra+='<li>倒數第'+h.pos+'位係0 → <strong>'+h.body+'</strong>｜'+h.palace+'：'+h.effect+'</li>';});extra+='</ul>';}
ruleWarns.forEach(function(w){extra+='<div class="'+(w.lv==='ok'?'hl-resolve':'hl-warn')+'">'+srcTag('c')+w.t+'</div>';});
extra+='</div>';
var tmp=document.createElement('div');tmp.innerHTML=extra;document.getElementById('fixCard').parentNode.insertBefore(tmp.firstChild,document.getElementById('fixCard'));}
var uniq=presentKeys(pairs);
document.getElementById('details').innerHTML='<p class="muted" style="margin-bottom:8px">完整六欄喺「八大磁場百科」。呢度只出出現過嘅星，避免重複。</p>'+uniq.map(function(k){return compactStar(FIELDS[k]);}).join('');
var missing=['tianyi','yannian','shengqi'].filter(function(k){return !counts[k];});
var fixCard=document.getElementById('fixCard');
fixCard.style.display='block';
var html='<p>'+srcTag('c')+'<strong>如何化解</strong></p><ul class="tight">';
html+='<li>絕命 → 天醫</li><li>六煞 → 延年</li><li>禍害 → 生氣</li><li>五鬼 → 生氣+天醫+延年或延年</li><li>伏位 → 生氣／天醫／延年</li></ul>';
html+='<p>先天同證件改唔到。用後天（電話最緊要）補<strong>生氣＋天醫＋延年</strong>。唔好用凶星去克凶星。</p>';
if(currentKind==='phone')html+='<p>手機本身就係用來補足。尾段優先生氣＋天醫＋延年；最後4位唔可以有0同凶星；後面五位唔可以有0。</p>';
if(currentKind==='birth')html+='<p>先天只可以喺電話補。</p>';
if(currentKind==='id')html+='<p>流年改唔到，行凶星嗰段用電話尾段蓋過。</p>';
if(currentKind==='plate')html+='<p>車牌尾段優先避開五鬼、絕命、禍害、六煞收尾。</p>';
if(missing.length)html+='<p>呢組缺：'+missing.map(function(k){return FIELDS[k].name;}).join('、')+'</p>';
html+='<p>老師4位「＋生天延」：</p><p><span class="num-sug">1491</span><span class="num-sug">4134</span><span class="num-sug">3943</span><span class="num-sug">9319</span><span class="num-sug">2862</span><span class="num-sug">8278</span><span class="num-sug">6726</span><span class="num-sug">7687</span></p>';
if(currentProfile==='female')html+='<p class="muted">女性唔好用含19／91／109／159等教材禁號。</p>';
document.getElementById('fixBox').innerHTML=html;
document.getElementById('results').scrollIntoView({behavior:'smooth',block:'start'});}catch(err){alert('解讀出錯：'+err.message);}}
document.getElementById('wikiGrid').innerHTML='<p class="muted" style="margin-bottom:14px">百科主文跟教材「八大命格解讀」六欄。'+srcTag('c')+'課堂原文　'+srcTag('n')+'之後課堂筆記　'+srcTag('b')+'愛德華書可借短句（唔改計法）。</p>'+Object.keys(FIELDS).map(function(k){return wikiCard(FIELDS[k]);}).join('')+wikiAppendix();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindUI);else bindUI();
window.analyze=analyze;
