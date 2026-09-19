(function(){
 if(!document.getElementById('hm-layout-css')){
  var st=document.createElement('style');
  st.id='hm-layout-css';
  st.textContent=[
   '#results,#results .card,#kindReadBox,#details,#pairFlow,#storyBox{max-width:100%;overflow-x:hidden;overflow-wrap:anywhere;word-break:break-word}',
   '.pair-row{display:flex;flex-wrap:wrap;align-items:flex-start;gap:8px;padding:8px 0;max-width:100%}',
   '.pair-box{font-size:1rem;padding:6px 10px;background:#fff8e6;border-color:#d4a017;flex:0 0 auto}',
   '.hl-warn,.hl-resolve,.nature{max-width:100%;overflow-wrap:anywhere}',
   '.num-in,.num-ex,.num-def{max-width:100%;white-space:normal}',
   '#hitCard{display:none !important}',
   '#toTop{position:fixed;right:16px;bottom:18px;z-index:40;border:0;border-radius:22px;background:#1a4a3a;color:#fff;padding:10px 14px;font-size:.82rem;box-shadow:0 4px 14px rgba(26,74,58,.25);display:none}',
   '#toTop.show{display:block}'
  ].join('');
  document.head.appendChild(st);
 }
 function reorder(){
  var res=document.getElementById('results');
  if(!res||res.getAttribute('data-reordered'))return;
  var cards=res.querySelectorAll(':scope > .card');
  var map={};
  cards.forEach(function(c){
   var t=c.querySelector('.card-title');
   var id=c.id||'';
   if(id==='kindReadCard')map.kind=c;
   else if(id==='luckCard')map.luck=c;
   else if(id==='fixCard')map.fix=c;
   else if(id==='hitCard')c.style.display='none';
   else if(t){
    var tx=t.textContent||'';
    if(tx.indexOf('角色')>=0||tx.indexOf('分析類型')>=0||tx.indexOf('睇乜類')>=0)map.role=c;
    else if(tx.indexOf('故事')>=0||tx.indexOf('由頭')>=0)map.story=c;
    else if(tx.indexOf('磁場')>=0||tx.indexOf('拆解')>=0||tx.indexOf('點拆')>=0)map.flow=c;
    else if(tx.indexOf('詳細')>=0)map.detail=c;
   }
  });
  var order=[map.role,map.flow,map.story,map.kind,map.luck,map.detail,map.fix];
  order.forEach(function(c){if(c)res.appendChild(c);});
  if(map.role){var a=map.role.querySelector('.card-title');if(a)a.textContent='本次分析類型';}
  if(map.flow){var b=map.flow.querySelector('.card-title');if(b)b.textContent='數組拆解';}
  if(map.story){var c=map.story.querySelector('.card-title');if(c)c.textContent='從頭至尾';}
  res.setAttribute('data-reordered','1');
 }
 function tidyRole(){
  var role=document.getElementById('roleBox');
  if(!role)return;
  role.innerHTML=role.innerHTML.replace('號碼0已跳過','0保留須解析，5夾於中間視為伏位');
 }
 function topBtn(){
  if(document.getElementById('toTop'))return;
  var b=document.createElement('button');
  b.id='toTop';
  b.type='button';
  b.textContent='↑ 回頂部';
  b.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  document.body.appendChild(b);
  window.addEventListener('scroll',function(){
   if(window.scrollY>400)b.classList.add('show');else b.classList.remove('show');
  });
 }
 var tries=0;
 function wrap(){
  reorder();topBtn();
  var impl=window.analyze;
  if(!impl){if(tries++<30)setTimeout(wrap,80);return;}
  if(impl.__layWrapped)return;
  var wrapped=function(){impl();tidyRole();};
  wrapped.__layWrapped=true;
  wrapped.__storyWrapped=impl.__storyWrapped;
  wrapped.__hlWrapped=impl.__hlWrapped;
  wrapped.__copyWrapped=impl.__copyWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
