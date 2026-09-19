(function(){
 var HAI0_HEALTH=['107','701','809','908','604','406','203','302'];
 var HAI0_SPEECH=['107','170','701','710','809','890','908','980','406','460','604','640','203','230','302','320'];
 var YE_WG=['197','918','781','879','342','436','263','624'];
 function kindNow(){return window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');}
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
 function listHits(str,list){return list.filter(function(x){return str&&str.indexOf(x)>=0;});}
 function comboHits(digits,kind){
  var out=[];
  try{
   var pairs=buildPairs(digits,kind);
   if(typeof adjacentHas!=='function'||!pairs)return out;
   if(adjacentHas(pairs,'tianyi','wugui'))out.push('天醫+五鬼');
   if(adjacentHas(pairs,'wugui','jueming'))out.push('五鬼+絕命');
   if(adjacentHas(pairs,'yannian','wugui'))out.push('延年+五鬼');
   if(adjacentHas(pairs,'yannian','liusha'))out.push('延年+六煞');
   if(adjacentHas(pairs,'tianyi','liusha'))out.push('天醫+六煞');
   if(adjacentHas(pairs,'wugui','liusha'))out.push('五鬼+六煞');
  }catch(e){}
  return out;
 }
 function explainHtml(kind,digits){
  if(!digits)return '';
  var last4=digits.slice(-4);
  var lastHits=listHits(last4,HAI0_HEALTH);
  var speechHits=listHits(digits,HAI0_SPEECH);
  var yeHits=listHits(digits,YE_WG);
  var combos=comboHits(digits,kind);
  var html='';
  function card(cls,title,lines){
   html+='<div class="'+cls+'"><p><strong>'+title+'</strong></p>';
   (lines||[]).forEach(function(line){html+='<p>'+line+'</p>';});
   html+='</div>';
  }
  if(kind==='phone'&&lastHits.length){
   card('hl-crit','筆記：後四位禍害夾0（'+lastHits.join('、')+'）',[
    '筆記原文例：107、701、809、604、406、203、302。',
    '筆記原文：1，容易有隱藏的傷口或者隱藏的疾病',
    '筆記原文：2，嚴重的話，容易開刀，動手術',
    '筆記原文：3，女性容易流產，墮胎，剖腹產等情況',
    '騙子號：禍害夾0 — 不一定存心騙人，說話表裏不一，比較有城府，不一定會說出真實的話'
   ]);
  }else if(kind==='phone'&&speechHits.length){
   card('hl-warn','騙子號：號碼中禍害夾0（'+speechHits.join('、')+'）',[
    '不一定存心騙人，說話表裏不一，比較有城府，不一定會說出真實的話',
    '此組出現在末四位以外。筆記健康三條只適用於手機號後四位。'
   ]);
  }
  if(kind==='phone'&&yeHits.length){
   card('hl-warn','筆記：疾病號（延年+五鬼，'+yeHits.join('、')+'）',[
    '筆記原文例：197／918、781／879、342／436、263／624。',
    '筆記原文：容易出現熬夜失眠、頸椎病、心腦血管疾病。'
   ]);
  }
  if(combos.indexOf('天醫+五鬼')>=0){
   card('hl-crit','課堂：天醫+五鬼',[
    '課堂原文：大凶：天醫+五鬼。',
    '此為課堂八星相鄰組合中的「大凶」等級（高於「次凶」）。',
    '課堂附表未另寫此組的具體病症或後果，僅定等級，故此處不加推演。'
   ]);
  }
  if(combos.indexOf('五鬼+絕命')>=0){
   card('hl-crit','課堂：五鬼+絕命',[
    '課堂原文：五鬼+絕命（如218、812）：容易身體差、絕症。',
    '課堂附表：命＋鬼—精神病。',
    '五鬼原文：高能量五鬼＋絕命極容易癌症；病多突發。'
   ]);
  }
  if(combos.indexOf('延年+五鬼')>=0){
   card('hl-warn','課堂：延年+五鬼',[
    '課堂原文：次凶：延年+五鬼。',
    '筆記老年人：五鬼+延年（如819）容易突發腦梗。'
   ]);
  }
  if(combos.indexOf('延年+六煞')>=0){
   card('hl-warn','課堂：延年+六煞',[
    '課堂原文：次凶：延年+六煞。',
    '課堂附表未另寫此組的具體後果，僅定等級為次凶（低於大凶）。'
   ]);
  }
  if(combos.indexOf('天醫+六煞')>=0){
   card('hl-warn','課堂：天醫+六煞',[
    '課堂原文：次凶：天醫+六煞。',
    '課堂附表未另寫此組的具體後果，僅定等級為次凶（低於大凶）。'
   ]);
  }
  if(combos.indexOf('五鬼+六煞')>=0){
   card('hl-crit','課堂：五鬼+六煞',[
    '課堂原文：五鬼+六煞（離婚、單身）。',
    '課堂附表：100%會離婚、單身。',
    '課堂：鬼＋煞：大意外、血光。'
   ]);
  }
  try{
   var pairs=buildPairs(digits,kind);
   var lastP=pairs&&pairs.length?pairs[pairs.length-1]:null;
   if(kind==='phone'&&lastP){
    if(lastP.field==='wugui')card('hl-warn','課堂：尾段五鬼',['課堂原文：手機號碼不能以五鬼結尾，損財富，出意外。']);
    if(lastP.field==='liusha')card('hl-warn','課堂：尾段六煞',['課堂原文：手機號碼不能以六煞結尾，損財富，傷婚姻。']);
    if(lastP.field==='huohai')card('hl-warn','課堂：尾段禍害',['課堂原文：手機號碼不能以禍害結尾，招小人，傷身體。']);
    if(lastP.field==='jueming')card('hl-warn','課堂：尾段絕命',['課堂原文：手機號碼不能以絕命結尾，損財富，出意外。']);
   }
  }catch(e){}
  return html;
 }
 function patchHits(sum,kind,digits){
  if(!sum)return;
  var combos=comboHits(digits,kind);
  var p=null;
  [].slice.call(sum.querySelectorAll('p')).forEach(function(el){
   if((el.textContent||'').indexOf('本次觸發')>=0)p=el;
  });
  if(!p)return;
  var have=p.textContent;
  combos.forEach(function(x){
   if(have.indexOf(x)>=0)return;
   var s=document.createElement('span');
   s.className='hit';
   s.textContent=x;
   p.appendChild(s);
  });
 }
 function run(){
  var kind=kindNow();
  var digits=digitsNow();
  var box=document.getElementById('kindReadBox');
  if(!box||!digits)return;
  var old=box.querySelector('.hm-gap-explain');
  if(old&&old.parentNode)old.parentNode.removeChild(old);
  var html=explainHtml(kind,digits);
  if(!html)return;
  var wrap=document.createElement('div');
  wrap.className='hm-hit-explain hm-gap-explain';
  wrap.innerHTML=html;
  var sum=box.querySelector('#hmSum');
  patchHits(sum,kind,digits);
  if(sum&&sum.nextSibling)box.insertBefore(wrap,sum.nextSibling);
  else if(sum)box.appendChild(wrap);
  else box.insertBefore(wrap,box.firstChild);
 }
 var tries=0;
 function wrapFn(){
  var impl=window.analyze;
  if(!impl){if(tries++<60)setTimeout(wrapFn,80);return;}
  if(impl.__gapWrapped)return;
  var wrapped=function(){impl();setTimeout(run,380);};
  wrapped.__gapWrapped=true;
  wrapped.__uxWrapped=impl.__uxWrapped;
  wrapped.__copyWrapped=impl.__copyWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrapFn,0);});
 else setTimeout(wrapFn,0);
})();
