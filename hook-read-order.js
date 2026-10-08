(function(){
 if(!document.getElementById('hm-read-css')){
  var st=document.createElement('style');
  st.id='hm-read-css';
  st.textContent=[
   '.hm-sec{margin:0 0 12px;border:1px solid #e0d8c8;border-radius:10px;background:#fff;overflow:hidden}',
   '.hm-sec > summary{cursor:pointer;list-style:none;padding:10px 12px;font-weight:700;color:#1a4a3a;background:#f7f4ee}',
   '.hm-sec > summary::-webkit-details-marker{display:none}',
   '.hm-sec > summary:after{content:"展開";float:right;font-weight:500;color:#5a5a5a;font-size:.78rem}',
   '.hm-sec[open] > summary:after{content:"收起"}',
   '.hm-sec .hm-sec-body{padding:8px 12px 12px}',
   '.hm-sec.hm-open{border-color:#1a4a3a}',
   '.hm-guide{font-size:.84rem;color:#5a5a5a;margin:0 0 10px}',
   '#hmSpine{border-color:#1a4a3a}',
   '#hmSpine ol{margin:8px 0 0 1.2em}',
   '#detailsCard details, #phoneRuleCard details, #fixCard details, #roleCard details{margin-top:8px}'
  ].join('');
  document.head.appendChild(st);
 }
 function txt(el){return (el&&el.textContent||'').replace(/\s+/g,'');}
 function bucket(el){
  var t=txt(el);
  if(!t)return 'drop';
  if(el.className&&String(el.className).indexOf('hl-legend')>=0)return 'legend';
  if(el.id==='hmSum'||t.indexOf('重點')===0||t.indexOf('重點：')>=0)return 'sum';
  if(t.indexOf('銷售攻略')>=0||(el.className&&String(el.className).indexOf('sales-note')>=0))return 'sales';
  if(t.indexOf('適合的行業')>=0)return 'job';
  if(t.indexOf('流通筆記')>=0||t.indexOf('吉星後接')>=0)return 'seq';
  if(t.indexOf('課堂')>=0&&t.indexOf('筆記')<0)return 'class';
  if(t.indexOf('筆記')>=0||t.indexOf('2026')>=0)return 'note';
  if(t.indexOf('後4位')>=0||t.indexOf('後四位')>=0||t.indexOf('冇天醫')>=0||t.indexOf('無天醫')>=0)return 'class';
  return 'other';
 }
 function section(title, open){
  var d=document.createElement('details');
  d.className='hm-sec'+(open?' hm-open':'');
  if(open)d.open=true;
  var s=document.createElement('summary');
  s.textContent=title;
  var b=document.createElement('div');
  b.className='hm-sec-body';
  d.appendChild(s);
  d.appendChild(b);
  return {box:d, body:b};
 }
 function dedupe(list){
  var seen={}, out=[];
  list.forEach(function(el){
   var k=txt(el).slice(0,180);
   if(!k||seen[k])return;
   seen[k]=1;
   out.push(el);
  });
  return out;
 }
 function unwrap(box){
  var old=box.querySelectorAll(':scope > .hm-sec, :scope > .hm-guide');
  old.forEach(function(el){
   if(el.classList.contains('hm-guide')){el.parentNode.removeChild(el);return;}
   var body=el.querySelector('.hm-sec-body');
   if(body){while(body.firstChild)box.insertBefore(body.firstChild, el);}
   el.parentNode.removeChild(el);
  });
 }
 function groupBox(box){
  if(!box)return;
  unwrap(box);
  var kids=[].slice.call(box.children).filter(function(el){
   return !el.classList || !el.classList.contains('hm-sec');
  });
  if(!kids.length)return;
  var groups={sum:[],sales:[],seq:[],note:[],class:[],job:[],other:[],legend:[]};
  kids.forEach(function(el){
   var k=bucket(el);
   if(k==='drop'){if(el.parentNode)el.parentNode.removeChild(el);return;}
   groups[k].push(el);
  });
  Object.keys(groups).forEach(function(k){groups[k]=dedupe(groups[k]);});
  var guide=document.createElement('p');
  guide.className='hm-guide';
  guide.textContent='先看上面「先看這裡」同「數組拆解」。這裡只放今次觸發。銷售、課堂、筆記、行業可展開。原文沒有刪，只是分組；完全相同的一段只留一次。';
  box.insertBefore(guide, box.firstChild);
  function add(title, list, open){
   if(!list.length)return;
   var sec=section(title, open);
   list.forEach(function(el){sec.body.appendChild(el);});
   box.appendChild(sec.box);
  }
  add('1. 先看：重點', groups.sum, true);
  add('2. 本次觸發', groups.seq.concat(groups.other), true);
  add('3. 銷售攻略', groups.sales, false);
  add('4. 課堂解讀', groups.class, false);
  add('5. 筆記', groups.note, false);
  add('6. 適合的行業', groups.job, false);
  groups.legend.forEach(function(el){box.appendChild(el);});
 }
 function collapseCard(card, title){
  if(!card||card.getAttribute('data-folded'))return;
  var head=card.querySelector('.card-title');
  var bodyKids=[].slice.call(card.children).filter(function(el){return el!==head && !el.classList.contains('hm-sec');});
  if(!bodyKids.length)return;
  var sec=section(title|| (head?head.textContent:'詳細'), false);
  bodyKids.forEach(function(el){sec.body.appendChild(el);});
  card.appendChild(sec.box);
  card.setAttribute('data-folded','1');
 }
 function spine(){
  var res=document.getElementById('results');
  if(!res)return;
  var old=document.getElementById('hmSpine');
  if(old)old.parentNode.removeChild(old);
  var kind=(document.getElementById('kindReadTitle')||{}).textContent||'今次解讀';
  var raw='';
  var birth=document.getElementById('birthInput');
  var inp=document.getElementById('numInput');
  if(birth && birth.parentNode && birth.parentNode.parentNode && birth.parentNode.parentNode.style.display!=='none' && birth.value) raw=birth.value;
  else if(inp) raw=inp.value.trim();
  var rows=document.querySelectorAll('#pairFlow .pair-row');
  var last=rows.length?rows[rows.length-1].textContent.replace(/\s+/g,' ').trim():'';
  var chips=[].map.call(document.querySelectorAll('#starBar .star-chip'), function(c){return c.textContent;}).filter(Boolean);
  var card=document.createElement('div');
  card.className='card';
  card.id='hmSpine';
  card.innerHTML='<div class="card-title">先看這裡</div>'
   +'<p>今次看的是「'+kind+'」。輸入：<strong>'+(raw||'—')+'</strong>。</p>'
   +(last?'<p>收尾：'+last+'。</p>':'')
   +(chips.length?'<p>出現過的星：'+chips.join('、')+'。</p>':'')
   +'<ol><li>先對下面「數組拆解」，確認每一組星。</li><li>再看「本次觸發」同重點。</li><li>銷售、課堂、筆記、行業、化解、完整六欄都收起，需要才展開。</li></ol>';
  res.insertBefore(card, res.firstChild);
 }
 function reorder(){
  var res=document.getElementById('results');
  if(!res)return;
  var cards=[].slice.call(res.querySelectorAll(':scope > .card'));
  var map={};
  cards.forEach(function(c){
   if(c.id==='hmSpine')return;
   var t=(c.querySelector('.card-title')||{}).textContent||'';
   if(c.id==='kindReadCard')map.kind=c;
   else if(c.id==='luckCard')map.luck=c;
   else if(c.id==='fixCard')map.fix=c;
   else if(c.id==='phoneRuleCard')map.phone=c;
   else if(t.indexOf('角色')>=0||t.indexOf('分析類型')>=0||t.indexOf('睇乜類')>=0)map.role=c;
   else if(t.indexOf('故事')>=0||t.indexOf('由頭')>=0||t.indexOf('從頭')>=0)map.story=c;
   else if(t.indexOf('磁場')>=0||t.indexOf('拆解')>=0||t.indexOf('點拆')>=0)map.flow=c;
   else if(t.indexOf('詳細')>=0)map.detail=c;
  });
  if(map.luck && map.luck.style.display==='none')map.luck.setAttribute('hidden','hidden');
  else if(map.luck)map.luck.removeAttribute('hidden');
  [map.flow,map.kind,map.story,map.luck,map.fix,map.phone,map.role,map.detail].forEach(function(c){if(c)res.appendChild(c);});
  if(map.flow){var b=map.flow.querySelector('.card-title');if(b)b.textContent='數組拆解';}
  if(map.story){var c=map.story.querySelector('.card-title');if(c)c.textContent='從頭至尾';}
  if(map.role){var a=map.role.querySelector('.card-title');if(a)a.textContent='本次分析類型';}
 }
 function run(){
  var box=document.getElementById('kindReadBox');
  if(box)groupBox(box);
  var detail=document.getElementById('details');
  if(detail&&detail.parentNode)collapseCard(detail.parentNode, '星的完整六欄（今次出現過的星，預設收起）');
  var phone=document.getElementById('phoneRuleCard');
  if(phone)collapseCard(phone, '手機定律／後五位 0／身份組合（預設收起）');
  var fix=document.getElementById('fixCard');
  if(fix && fix.style.display!=='none')collapseCard(fix, '化解／補足建議（預設收起）');
  var role=document.getElementById('roleBox');
  if(role&&role.parentNode)collapseCard(role.parentNode, '這組數字屬於哪一類（預設收起）');
  reorder();
  spine();
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<50)setTimeout(wrap,80);return;}
  if(impl.__readOrder)return;
  var w=function(){impl();setTimeout(run,1100);};
  w.__readOrder=true;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
