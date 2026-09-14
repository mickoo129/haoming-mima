(function(){
 function showFor(kind){return kind==='phone'||kind==='plate'||kind==='other'||kind==='birth';}
 function ensure(){
  if(document.getElementById('hitCard'))return document.getElementById('hitCard');
  var flow=document.getElementById('pairFlow');
  if(!flow)return null;
  var host=flow.closest?flow.closest('.card'):flow.parentNode;
  var card=document.createElement('div');
  card.className='card';
  card.id='hitCard';
  card.innerHTML='<div class="card-title">呢組命中</div><p class="muted" style="margin-bottom:8px">只列套中你呢組的條文。下面仍係完整課堂／筆記／書原文。</p><div id="hitBox"></div>';
  if(host&&host.parentNode)host.parentNode.insertBefore(card,host.nextSibling);
  return card;
 }
 function fill(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');
  var card=ensure();
  var box=document.getElementById('hitBox');
  if(!card||!box)return;
  if(!showFor(kind)){card.style.display='none';return;}
  card.style.display='block';
  var html='';
  var flow=document.getElementById('pairFlow');
  var lastTxt='';
  if(flow){
   var rows=flow.querySelectorAll('.pair-row');
   if(rows.length){
    var last=rows[rows.length-1];
    lastTxt=(last.textContent||'').replace(/\s+/g,' ').trim();
    html+='<p><strong>收尾</strong>：'+last.innerHTML+'</p>';
   }
  }
  var seen={};
  function addNode(el){
   var t=(el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();
   if(!t||t.length<8)return;
   if(seen[t])return;
   seen[t]=1;
   html+=el.outerHTML;
  }
  ['kindReadBox','details','fixBox'].forEach(function(id){
   var root=document.getElementById(id);
   if(!root)return;
   root.querySelectorAll('.hl-warn,.hl-resolve').forEach(addNode);
  });
  var pr=document.getElementById('phoneRuleCard');
  if(pr)pr.querySelectorAll('p,li,div.hl-warn,div.hl-resolve').forEach(addNode);
  if(!Object.keys(seen).length){
   html+='<p class="muted">呢組未見課堂／筆記嘅特殊組合條。下面詳細仍係完整解讀。</p>';
  }
  box.innerHTML=html;
 }
 var tries=0;
 function wrap(){
  ensure();
  var impl=window.analyze;
  if(!impl){if(tries++<40)setTimeout(wrap,80);return;}
  if(impl.__hitWrapped)return;
  var wrapped=function(){impl();setTimeout(fill,30);};
  wrapped.__hitWrapped=true;
  wrapped.__storyWrapped=impl.__storyWrapped;
  wrapped.__hlWrapped=impl.__hlWrapped;
  wrapped.__layWrapped=impl.__layWrapped;
  wrapped.__copyWrapped=impl.__copyWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
