(function(){
 if(!document.getElementById('hm-layout-css')){
  var st=document.createElement('style');
  st.id='hm-layout-css';
  st.textContent=[
   '#results .card{margin-bottom:14px}',
   '#results .card-title{font-size:1.02rem;letter-spacing:.02em}',
   '.pair-row{align-items:flex-start;gap:10px;padding:8px 0}',
   '.pair-box{font-size:1.05rem;padding:6px 12px;background:#fff8e6;border-color:#d4a017}',
   '.pair-row strong{min-width:3em;display:inline-block}',
   '#pairFlow{background:#fbfaf6;border-radius:8px;padding:4px 8px}',
   '.hl-warn,.hl-resolve{margin-top:12px}',
   '#kindReadBox p,#details p{margin:8px 0}',
   '#kindReadBox .muted{display:block;margin-top:4px}'
  ].join('');
  document.head.appendChild(st);
 }
 function reorder(){
  var res=document.getElementById('results');
  if(!res||res.getAttribute('data-reordered'))return;
  var cards=res.querySelectorAll(':scope > .card');
  if(cards.length<6)return;
  var map={};
  cards.forEach(function(c){
   var t=c.querySelector('.card-title');
   var id=c.id||'';
   if(id==='kindReadCard')map.kind=c;
   else if(id==='luckCard')map.luck=c;
   else if(id==='fixCard')map.fix=c;
   else if(t){
    var tx=t.textContent||'';
    if(tx.indexOf('角色')>=0)map.role=c;
    else if(tx.indexOf('故事')>=0)map.story=c;
    else if(tx.indexOf('磁場走勢')>=0)map.flow=c;
    else if(tx.indexOf('詳細')>=0)map.detail=c;
   }
  });
  if(!map.role||!map.flow||!map.story)return;
  var order=[map.role,map.flow,map.story,map.kind,map.luck,map.detail,map.fix];
  order.forEach(function(c){if(c)res.appendChild(c);});
  if(map.role){
   var tit=map.role.querySelector('.card-title');
   if(tit)tit.textContent='呢次睇乜類';
  }
  if(map.flow){
   var tit2=map.flow.querySelector('.card-title');
   if(tit2)tit2.textContent='呢組點拆（磁場走勢）';
  }
  if(map.story){
   var tit3=map.story.querySelector('.card-title');
   if(tit3)tit3.textContent='由頭講到尾';
  }
  res.setAttribute('data-reordered','1');
 }
 function tidyRole(){
  var role=document.getElementById('roleBox');
  if(!role)return;
  role.innerHTML=role.innerHTML.replace('號碼0已跳過','0留低要解，5夾中當伏');
 }
 function wrap(){
  reorder();
  var impl=window.analyze;
  if(!impl||impl.__layWrapped){
   if(!impl)setTimeout(wrap,80);
   return;
  }
  var wrapped=function(){
   impl();
   tidyRole();
  };
  wrapped.__layWrapped=true;
  wrapped.__storyWrapped=impl.__storyWrapped;
  wrapped.__hlWrapped=impl.__hlWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
