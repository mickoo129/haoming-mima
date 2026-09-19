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
   '.hl-legend{margin:0 0 12px}'
  ].join('');
  document.head.appendChild(st);
 }
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
  if(t.indexOf('疾病號')>=0||t.indexOf('\u71ac\u591c')>=0)return 'ye-wg';
  if(t.indexOf('生天延')>=0)return 'sheng-tian-yan';
  if(t.indexOf('大凶')>=0&&t.indexOf('天醫')>=0&&t.indexOf('五鬼')>=0)return 'ty-wg';
  if(t.indexOf('大凶')>=0&&t.indexOf('五鬼')>=0&&t.indexOf('絕命')>=0)return 'wg-jue';
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
  var lastHits=['107','701','809','908','604','406','203','302'].filter(function(x){return last4.indexOf(x)>=0;});
  var allHits=['107','701','809','908','604','406','203','302'].filter(function(x){return (digits||'').indexOf(x)>=0;});
  var lab=(lastHits.length?lastHits:allHits).join('、');
  keep.className='hl-crit health-note hai0-merged';
  if(lastHits.length){
   keep.innerHTML=
    '<p><strong>筆記</strong>：禍害夾0（健康＋說話）'+(lab?'：'+lab:'')+'</p>'+
    '<p><strong>健康原文</strong>：1，容易有隱藏的傷口或者隱藏的疾病</p>'+
    '<p><strong>健康原文</strong>：2，嚴重的話，容易開刀，動手術</p>'+
    '<p><strong>健康原文</strong>：3，女性容易流產，墮胎，剖腹產等情況</p>'+
    '<p><strong>說話原文</strong>：不一定存心騙人，說話表裏不一，比較有城府，不一定會說出真實的話</p>';
  }else{
   keep.innerHTML=
    '<p><strong>筆記</strong>：禍害夾0（說話）'+(lab?'：'+lab:'')+'</p>'+
    '<p><strong>說話原文</strong>：不一定存心騙人，說話表裏不一，比較有城府，不一定會說出真實的話</p>';
  }
 }
 function dedupeRoots(roots){
  var seen={};
  roots.forEach(function(root){
   if(!root)return;
   [].slice.call(root.querySelectorAll('.hl-warn,.hl-resolve,.hl-crit,.hl-sales,.nature,.health-note,.teacher-note,.sales-note')).forEach(function(el){
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
  var hits=[];
  if(kind==='phone'&&tail&&tail.indexOf('0')>=0)hits.push('後四位有0');
  [['197','疾病號'],['918','疾病號'],['107','禍害夾0'],['701','禍害夾0'],['809','禍害夾0'],['908','禍害夾0'],['604','禍害夾0'],['406','禍害夾0'],['203','禍害夾0'],['302','禍害夾0']].forEach(function(p){
   if((kind==='phone')&&digits&&digits.indexOf(p[0])>=0&&hits.indexOf(p[1])<0)hits.push(p[1]);
  });
  try{
   var pairs=buildPairs(digits,kind);
   if(typeof adjacentHas==='function'){
    if(adjacentHas(pairs,'wugui','jueming'))hits.push('五鬼+絕命');
    if(adjacentHas(pairs,'tianyi','wugui'))hits.push('天醫+五鬼');
   }
  }catch(e){}
  var miss=[];
  try{
   var keys=presentKeys(buildPairs(digits,kind));
   ['tianyi','yannian','shengqi'].forEach(function(k){if(keys.indexOf(k)<0)miss.push(FIELDS[k].name);});
  }catch(e){}
  var h='<div class="hm-sum" id="hmSum">';
  h+='<p><strong>先睇呢句</strong>：尾段係「'+last+'」'+(kind==='phone'?'，尾四位 '+tail:'')+'。</p>';
  if(hits.length)h+='<p>今次觸發：'+hits.map(function(x){return '<span class="hit">'+x+'</span>';}).join('')+'</p>';
  else h+='<p class="muted">今次未見大凶／疾病號／後四位禍害夾0。</p>';
  if(miss.length)h+='<p class="muted">缺吉星：'+miss.join('、')+'</p>';
  if(kind==='phone'&&!profNow())h+='<p class="muted">\u672a\u64bf\u8eab\u4efd\u3002\u5973\u6027\uff0f\u7537\u6027\uff0f\u5b78\u751f\uff0f\u8001\u5e74\u4eba\u689d\u6587\u8981\u5148\u64bf\u8eab\u4efd\u5148\u51fa\u3002</p>';
  h+='</div>';
  return h;
 }
 function moveLegend(box){
  if(!box)return;
  var leg=box.querySelector('.hl-legend');
  if(leg)box.insertBefore(leg,box.firstChild);
 }
 function run(){
  var kind=kindNow();
  var digits=digitsNow();
  var box=document.getElementById('kindReadBox');
  var pc=document.getElementById('phoneRuleCard');
  mergeHai0(box,digits);
  mergeHai0(pc,digits);
  dedupeRoots([box,pc]);
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
    p.innerHTML='<i><span class="num-in">黃底</span> 呢組真係有呢個號</i><i><span class="num-def">綠邊</span> 星點組成（規則，唔等於你全部都有）</i><i><span class="num-ex">灰虛線</span> 課堂／筆記例子</i>';
    box.insertBefore(p,box.firstChild);
   }else moveLegend(box);
   box.insertBefore(document.createRange().createContextualFragment(summaryHtml(kind,digits)),box.firstChild);
  }
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<50)setTimeout(wrap,80);return;}
  if(impl.__uxWrapped)return;
  var wrapped=function(){impl();setTimeout(run,220);};
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
