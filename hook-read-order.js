(function(){
 if(!document.getElementById('hm-read-css')){
  var st=document.createElement('style');
  st.id='hm-read-css';
  st.textContent=[
   '.hm-sec{margin:0 0 12px;border:1px solid #e0d8c8;border-radius:10px;background:#fff;overflow:hidden}',
   '.hm-sec > summary{cursor:pointer;list-style:none;padding:10px 12px;font-weight:700;color:#1a4a3a;background:#f7f4ee}',
   '.hm-sec > summary::-webkit-details-marker{display:none}',
   '.hm-sec > summary:after{content:"\5c55\958b";float:right;font-weight:500;color:#5a5a5a;font-size:.78rem}',
   '.hm-sec[open] > summary:after{content:"\6536\8d77"}',
   '.hm-sec .hm-sec-body{padding:8px 12px 12px}',
   '.hm-sec.hm-open{border-color:#1a4a3a}',
   '.hm-guide{font-size:.84rem;color:#5a5a5a;margin:0 0 10px}'
  ].join('');
  document.head.appendChild(st);
 }
 function txt(el){return (el&&el.textContent||'').replace(/\s+/g,'');}
 function bucket(el){
  var t=txt(el);
  if(!t)return 'drop';
  if(el.className&&String(el.className).indexOf('hl-legend')>=0)return 'legend';
  if(el.id==='hmSum'||t.indexOf('\u91cd\u9ede')===0||t.indexOf('\u91cd\u9ede\uff1a')>=0)return 'sum';
  if(t.indexOf('\u92b7\u552e\u653b\u7565')>=0)return 'sales';
  if(t.indexOf('\u9069\u5408\u7684\u884c\u696d')>=0)return 'job';
  if(t.indexOf('\u6d41\u901a\u7b46\u8a18')>=0||t.indexOf('\u5409\u661f\u5f8c\u63a5')>=0)return 'seq';
  if(t.indexOf('\u8ab2\u5802')>=0&&t.indexOf('\u7b46\u8a18')<0)return 'class';
  if(t.indexOf('\u7b46\u8a18')>=0||t.indexOf('2026')>=0)return 'note';
  if(t.indexOf('\u5f8c4\u4f4d')>=0||t.indexOf('\u5187\u5929\u91ab')>=0||t.indexOf('\u7121\u5929\u91ab')>=0)return 'class';
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
 function groupBox(box){
  if(!box)return;
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
  var guide=document.createElement('p');
  guide.className='hm-guide';
  guide.textContent='\u5148\u770b\u300c\u91cd\u9ede\u300d\uff0c\u518d\u770b\u300c\u672c\u6b21\u89f8\u767c\u300d\u3002\u92b7\u552e\u3001\u8ab2\u5802\u3001\u7b46\u8a18\u3001\u884c\u696d\u53ef\u5c55\u958b\u3002\u539f\u6587\u6c92\u6709\u522a\uff0c\u53ea\u662f\u5206\u7d44\u3002';
  box.insertBefore(guide, box.firstChild);
  function add(title, list, open){
   if(!list.length)return;
   var sec=section(title, open);
   list.forEach(function(el){sec.body.appendChild(el);});
   box.appendChild(sec.box);
  }
  add('1. \u5148\u770b\uff1a\u91cd\u9ede', groups.sum, true);
  add('2. \u672c\u6b21\u89f8\u767c', groups.seq.concat(groups.other), true);
  add('3. \u92b7\u552e\u653b\u7565', groups.sales, true);
  add('4. \u8ab2\u5802\u89e3\u8b80', groups.class, false);
  add('5. \u7b46\u8a18', groups.note, false);
  add('6. \u9069\u5408\u7684\u884c\u696d', groups.job, false);
  if(groups.legend.length){
   groups.legend.forEach(function(el){box.appendChild(el);});
  }
 }
 function collapseCard(card, title){
  if(!card||card.getAttribute('data-folded'))return;
  var head=card.querySelector('.card-title');
  var bodyKids=[].slice.call(card.children).filter(function(el){return el!==head;});
  if(!bodyKids.length)return;
  var sec=section(title|| (head?head.textContent:'\u8a73\u7d30'), false);
  bodyKids.forEach(function(el){sec.body.appendChild(el);});
  card.appendChild(sec.box);
  card.setAttribute('data-folded','1');
 }
 function run(){
  var box=document.getElementById('kindReadBox');
  if(box){
   var old=box.querySelectorAll('.hm-sec, .hm-guide');
   if(old.length){
    old.forEach(function(el){
     if(el.classList.contains('hm-guide')){el.parentNode.removeChild(el);return;}
     var body=el.querySelector('.hm-sec-body');
     if(body){while(body.firstChild)box.insertBefore(body.firstChild, el);}
     el.parentNode.removeChild(el);
    });
   }
   groupBox(box);
  }
  var detail=document.getElementById('details');
  if(detail&&detail.parentNode)collapseCard(detail.parentNode, '\u661f\u7684\u5b8c\u6574\u516d\u6b04\uff08\u6b64\u7d44\u51fa\u73fe\u904e\u7684\u661f\uff0c\u9810\u8a2d\u6536\u8d77\uff09');
  var phone=document.getElementById('phoneRuleCard');
  if(phone)collapseCard(phone, '\u624b\u6a5f\u5b9a\u5f8b\uff0f\u5f8c\u4e94\u4f4d 0\uff0f\u8eab\u4efd\u7d44\u5408\uff08\u9810\u8a2d\u6536\u8d77\uff09');
  var luck=document.getElementById('luckCard');
  if(luck&&luck.style.display==='none')luck.setAttribute('hidden','hidden');
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<50)setTimeout(wrap,80);return;}
  if(impl.__readOrder)return;
  var w=function(){impl();setTimeout(run,900);};
  w.__readOrder=true;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
