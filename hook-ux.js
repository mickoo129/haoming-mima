(function(){
 if(!document.getElementById('hm-ux-css')){
  var st=document.createElement('style');
  st.id='hm-ux-css';
  st.textContent=[
   '.hl-crit{margin-top:10px;background:#fdecea;border-left:4px solid #c62828;border-radius:8px;padding:10px 12px}',
   '.hl-sales{margin-top:10px;background:#eef3f8;border-left:4px solid #546e7a;border-radius:8px;padding:10px 12px}',
   '.hm-sum{background:#fff;border:1.5px solid #1a4a3a;border-radius:10px;padding:12px 14px;margin-bottom:12px}',
   '.hm-sum strong{color:#1a4a3a}',
   '.hm-sum .hit{display:inline-block;background:#fff3cd;border:1px solid #d4a017;border-radius:6px;padding:1px 8px;margin:2px 4px 2px 0;font-size:.86rem}',
   '.hl-legend{margin:0 0 12px}',
   '.hm-hit-explain{margin:0 0 12px}'
  ].join('');
  document.head.appendChild(st);
 }
 var HAI0_HEALTH=['107','701','809','908','604','406','203','302'];
 var HAI0_SPEECH=['107','170','701','710','809','890','908','980','406','460','604','640','203','230','302','320'];
 var YE_WG=['197','918','781','879','342','436','263','624'];
 function kindNow(){return window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');}
 function profNow(){return window.currentProfile||(typeof currentProfile!=='undefined'?currentProfile:'');}
 function digitsNow(){
  var kind=kindNow();
  try{
   if(kind==='birth'){var iso=document.getElementById('birthInput').value;var m=birthCode(iso);return m?m.code:'';}
   if(kind==='plate')return plateToDigits(document.getElementById('numInput').value.trim());
   var raw=document.getElementById('numInput').value.trim();
   if(typeof expandLetters==='function') raw=expandLetters(raw);
   return (typeof extractDigits==='function')?extractDigits(raw):(raw.match(/\d/g)||[]).join('');
  }catch(e){return '';}
 }
 function lastField(digits,kind){
  try{
   var pairs=buildPairs(digits,kind);
   if(!pairs||!pairs.length)return '';
   return FIELDS[pairs[pairs.length-1].field].name;
  }catch(e){return '';}
 }
 function listHits(str,list){return list.filter(function(x){return str&&str.indexOf(x)>=0;});}
 function keyOf(el){
  var t=(el.textContent||'').replace(/\s+/g,'');
  if(t.indexOf('絕命計分')>=0)return 'jue-score';
  if(t.indexOf('121')>=0&&t.indexOf('腰')>=0)return 'jue-121';
  if(t.indexOf('婦科')>=0&&(t.indexOf('六煞')>=0||t.indexOf('絕命')>=0))return 'liu-jue';
  if(t.indexOf('得理不')>=0)return 'jue-hai';
  if(t.indexOf('痛經')>=0)return 'yan-hai';
  if(t.indexOf('禍害夾0')>=0||t.indexOf('隱藏的傷口')>=0)return 'hai0';
  if(t.indexOf('後五位')>=0&&t.indexOf('0')>=0&&t.indexOf('不能')>=0)return 'last5-0';
  if(t.indexOf('適合的行業')>=0)return 'industry';
  if(t.indexOf('銷售攻略')>=0)return 'sales';
  if(t.indexOf('疾病號')>=0||t.indexOf('熬夜傷身')>=0)return 'ye-wg';
  if(t.indexOf('生天延')>=0)return 'sheng-tian-yan';
  if(t.indexOf('大凶')>=0&&t.indexOf('天醫')>=0&&t.indexOf('五鬼')>=0)return 'ty-wg';
  if(t.indexOf('容易身體差')>=0||(t.indexOf('五鬼')>=0&&t.indexOf('絕命')>=0&&(t.indexOf('絕症')>=0||t.indexOf('大凶')>=0)))return 'wg-jue';
  return '';
 }
 function paintLevel(el){
  var t=el.textContent||'';
  if(el.className.indexOf('sales-note')>=0||t.indexOf('銷售攻略')>=0){
   el.className=el.className.replace(/hl-resolve|hl-warn|hl-crit/g,'hl-sales');
   if(el.className.indexOf('hl-sales')<0)el.className+=' hl-sales';
   return;
  }
  var crit=/大凶|後五位絕對不能|女性絕對不能|絕症|開刀|流產|腦梗/.test(t);
  if(crit){
   el.className=el.className.replace(/hl-warn|hl-resolve/g,'hl-crit');
   if(el.className.indexOf('hl-crit')<0)el.className+=' hl-crit';
  }
 }
 function mergeHai0(root,digits){
  if(!root)return;
  var nodes=[].slice.call(root.querySelectorAll('.hl-warn,.hl-crit,.health-note'));
  var keep=null,drop=[];
  nodes.forEach(function(el){
   var t=el.textContent||'';
   if(t.indexOf('禍害夾0')>=0||t.indexOf('隱藏的傷口')>=0){
    if(!keep)keep=el;else drop.push(el);
   }
  });
  drop.forEach(function(el){if(el.parentNode)el.parentNode.removeChild(el);});
  if(!keep)return;
  var last4=(digits||'').slice(-4);
  var lastHits=listHits(last4,HAI0_HEALTH);
  var speechHits=listHits(digits,HAI0_SPEECH);
  keep.className=(lastHits.length?'hl-crit':'hl-warn')+' health-note hai0-merged';
  if(lastHits.length){
   keep.innerHTML=
    '<p><strong>筆記</strong>：手機號後四位出現禍害夾0：'+lastHits.join('、')+'</p>'+
    '<p>筆記原文例：107、701、809、604、406、203、302。</p>'+
    '<p>筆記原文：1，容易有隱藏的傷口或者隱藏的疾病</p>'+
    '<p>筆記原文：2，嚴重的話，容易開刀，動手術</p>'+
    '<p>筆記原文：3，女性容易流產，墮胎，剖腹產等情況</p>'+
    '<p><strong>騙子號</strong>：禍害夾0（'+lastHits.join('、')+'） — 不一定存心騙人，說話表裏不一，比較有城府，不一定會說出真實的話</p>';
  }else if(speechHits.length){
   keep.innerHTML=
    '<p><strong>騙子號</strong>：禍害夾0（'+speechHits.join('、')+'） — 不一定存心騙人，說話表裏不一，比較有城府，不一定會說出真實的話</p>'+
    '<p class="muted">此組出現在末四位以外。筆記健康三條（隱藏傷口／開刀／流產）只適用於手機號後四位。</p>';
  }
 }
 function dedupeRoots(roots){
  var seen={};
  roots.forEach(function(root){
   if(!root)return;
   [].slice.call(root.querySelectorAll('.hl-warn,.hl-resolve,.hl-crit,.hl-sales,.nature,.health-note,.teacher-note,.sales-note,.hm-hit-explain')).forEach(function(el){
    var k=keyOf(el);
    if(!k)return;
    if(seen[k]){if(el.parentNode)el.parentNode.removeChild(el);}
    else seen[k]=1;
   });
  });
 }
 function summaryHtml(kind,digits){
  var last=lastField(digits,kind)||'—';
  var tail=(digits||'').slice(-4);
  var lastHits=listHits(tail,HAI0_HEALTH);
  var midHealth=listHits(digits,HAI0_HEALTH).filter(function(x){return lastHits.indexOf(x)<0;});
  var speechHits=listHits(digits,HAI0_SPEECH);
  var yeHits=listHits(digits,YE_WG);
  var hits=[];
  if(kind==='phone'&&tail&&tail.indexOf('0')>=0)hits.push('後四位有0');
  if(kind==='phone'&&lastHits.length)hits.push('後四位禍害夾0（健康）');
  if(kind==='phone'&&speechHits.length&&!lastHits.length)hits.push('號碼中禍害夾0（說話）');
  else if(kind==='phone'&&speechHits.length&&lastHits.length)hits.push('禍害夾0（說話）');
  if(kind==='phone'&&yeHits.length)hits.push('疾病號（延年+五鬼）');
  try{
   var pairs=buildPairs(digits,kind);
   if(typeof adjacentHas==='function'){
    if(adjacentHas(pairs,'wugui','jueming'))hits.push('五鬼+絕命');
    if(adjacentHas(pairs,'tianyi','wugui'))hits.push('天醫+五鬼');
    if(adjacentHas(pairs,'yannian','wugui'))hits.push('延年+五鬼');
   }
   if(kind==='phone'&&pairs&&pairs.length)hits.push('尾段銷售攻略');
  }catch(e){}
  var miss=[];
  try{
   var keys=presentKeys(buildPairs(digits,kind));
   ['tianyi','yannian','shengqi'].forEach(function(k){if(keys.indexOf(k)<0)miss.push(FIELDS[k].name);});
  }catch(e){}
  var h='<div class="hm-sum" id="hmSum">';
  h+='<p><strong>重點</strong>：尾段為「'+last+'」'+(kind==='phone'?'，末四位 '+tail:'')+'。</p>';
  if(hits.length)h+='<p>本次觸發：'+hits.map(function(x){return '<span class="hit">'+x+'</span>';}).join('')+'</p>';
  else h+='<p class="muted">本次未見大凶、疾病號或後四位禍害夾0。</p>';
  if(yeHits.length)h+='<p class="muted">疾病號命中：'+yeHits.join('、')+'（筆記例：197／918、781／879、342／436、263／624）</p>';
  if(kind==='phone'&&midHealth.length)h+='<p class="muted">禍害夾0出現在末四位以外（'+midHealth.join('、')+'），健康三條不套用。</p>';
  if(miss.length)h+='<p class="muted">缺少吉星：'+miss.join('、')+'</p>';
  if(kind==='phone'&&!profNow())h+='<p class="muted">尚未選擇身份。女性禁號、滑胎、男性腎結石、學生學業、老年人腦梗等條文，須先選擇身份後才會顯示。</p>';
  h+='</div>';
  return h;
 }
 function explainHtml(kind,digits){
  if(kind!=='phone'||!digits)return '';
  var last4=digits.slice(-4);
  var lastHits=listHits(last4,HAI0_HEALTH);
  var speechHits=listHits(digits,HAI0_SPEECH);
  var yeHits=listHits(digits,YE_WG);
  var html='';
  if(lastHits.length){
   html+='<div class="hl-crit health-note hai0-merged"><p><strong>筆記</strong>：手機號後四位出現禍害夾0：'+lastHits.join('、')+'</p>';
   html+='<p>筆記原文例：107、701、809、604、406、203、302。</p>';
   html+='<p>筆記原文：1，容易有隱藏的傷口或者隱藏的疾病</p>';
   html+='<p>筆記原文：2，嚴重的話，容易開刀，動手術</p>';
   html+='<p>筆記原文：3，女性容易流產，墮胎，剖腹產等情況</p>';
   html+='<p><strong>騙子號</strong>：禍害夾0（'+lastHits.join('、')+'） — 不一定存心騙人，說話表裏不一，比較有城府，不一定會說出真實的話</p></div>';
  }else if(speechHits.length){
   html+='<div class="hl-warn health-note hai0-merged"><p><strong>騙子號</strong>：禍害夾0（'+speechHits.join('、')+'） — 不一定存心騙人，說話表裏不一，比較有城府，不一定會說出真實的話</p>';
   html+='<p class="muted">此組出現在末四位以外。筆記健康三條（隱藏傷口／開刀／流產）只適用於手機號後四位。</p></div>';
  }
  if(yeHits.length){
   html+='<div class="hl-warn health-note"><p><strong>筆記</strong>：疾病號：熬夜傷身：延年+五鬼（'+yeHits.join('、')+'）</p>';
   html+='<p>筆記原文例：197／918、781／879、342／436、263／624。</p>';
   html+='<p>筆記原文：容易出現熬夜失眠、頸椎病、心腦血管疾病。</p></div>';
  }
  try{
   var pairs=buildPairs(digits,kind);
   if(typeof adjacentHas==='function'&&adjacentHas(pairs,'wugui','jueming')){
    html+='<div class="hl-crit"><p><strong>課堂</strong>：五鬼+絕命（如218、812）：容易身體差、絕症</p></div>';
   }
   if(typeof adjacentHas==='function'&&adjacentHas(pairs,'tianyi','wugui')){
    html+='<div class="hl-crit"><p><strong>課堂</strong>：大凶：天醫+五鬼</p></div>';
   }
   if(typeof adjacentHas==='function'&&adjacentHas(pairs,'yannian','wugui')){
    html+='<div class="hl-warn"><p><strong>課堂</strong>：次凶：延年+五鬼。筆記老年人：五鬼+延年（如819）容易突發腦梗。</p></div>';
   }
  }catch(e){}
  return html;
 }
 function placeExplain(box,html){
  if(!box||!html)return;
  var old=box.querySelector('.hm-hit-explain');
  if(old&&old.parentNode)old.parentNode.removeChild(old);
  var wrap=document.createElement('div');
  wrap.className='hm-hit-explain';
  wrap.innerHTML=html;
  var sum=box.querySelector('#hmSum');
  var leg=box.querySelector('.hl-legend');
  var ref=leg||sum;
  if(ref&&ref.nextSibling)box.insertBefore(wrap,ref.nextSibling);
  else if(ref)box.appendChild(wrap);
  else box.insertBefore(wrap,box.firstChild);
 }
 function promoteBlocks(box){
  if(!box)return;
  var sum=box.querySelector('#hmSum');
  var leg=box.querySelector('.hl-legend');
  var exp=box.querySelector('.hm-hit-explain');
  var sales=[].slice.call(box.querySelectorAll('.sales-note'));
  var industry=[].slice.call(box.querySelectorAll('.hl-resolve,.nature')).filter(function(el){
   return (el.textContent||'').indexOf('適合的行業')>=0;
  });
  var head=[];
  if(sum)head.push(sum);
  if(leg)head.push(leg);
  if(exp)head.push(exp);
  sales.forEach(function(el){head.push(el);});
  industry.forEach(function(el){head.push(el);});
  for(var i=head.length-1;i>=0;i--) box.insertBefore(head[i],box.firstChild);
 }
 function run(){
  var kind=kindNow();
  var digits=digitsNow();
  var box=document.getElementById('kindReadBox');
  var pc=document.getElementById('phoneRuleCard');
  mergeHai0(box,digits);
  mergeHai0(pc,digits);
  [box,pc,document.getElementById('details')].forEach(function(root){
   if(!root)return;
   root.querySelectorAll('.hl-warn,.hl-resolve,.health-note,.sales-note,.hl-crit').forEach(paintLevel);
  });
  if(box){
   var old=box.querySelector('#hmSum');
   if(old&&old.parentNode)old.parentNode.removeChild(old);
   var legs=box.querySelectorAll('.hl-legend');
   if(legs.length>1){for(var i=1;i<legs.length;i++)legs[i].parentNode.removeChild(legs[i]);}
   var showLeg=(kind==='phone'||kind==='plate'||kind==='other');
   var leg=box.querySelector('.hl-legend');
   if(!showLeg&&leg)leg.parentNode.removeChild(leg);
   if(showLeg&&!box.querySelector('.hl-legend')){
    var p=document.createElement('p');
    p.className='hl-legend';
    p.innerHTML='<i><span class="num-in">黃底</span> 此組號碼確實出現</i><i><span class="num-def">綠邊</span> 星曜組合規則（不代表全部皆有）</i><i><span class="num-ex">灰虛線</span> 課堂／筆記例子</i>';
    box.insertBefore(p,box.firstChild);
   }else if(leg) box.insertBefore(leg,box.firstChild);
   box.insertBefore(document.createRange().createContextualFragment(summaryHtml(kind,digits)),box.firstChild);
   placeExplain(box,explainHtml(kind,digits));
   promoteBlocks(box);
  }
  dedupeRoots([box,pc]);
  var t=document.getElementById('kindReadTitle');
  if(t){
   var s=t.textContent||'';
   if(s.indexOf('點樣')>=0||s.indexOf('呢組')>=0)t.textContent='手機：如何分析此組號碼';
  }
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<50)setTimeout(wrap,80);return;}
  if(impl.__uxWrapped)return;
  var wrapped=function(){impl();setTimeout(run,260);};
  wrapped.__uxWrapped=true;
  wrapped.__healthWrapped=impl.__healthWrapped;
  wrapped.__salesWrapped=impl.__salesWrapped;
  wrapped.__teaWrapped=impl.__teaWrapped;
  wrapped.__copyWrapped=impl.__copyWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
