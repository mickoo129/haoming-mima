(function(){
 function fullStar(f){
  if(!f)return '';
  var h='<div class="wiki-card" style="padding:12px;margin-bottom:10px"><h3 style="margin-bottom:6px"><span class="ptag '+f.pol+'">'+f.rank+'</span> '+f.name+'</h3>';
  h+='<p>'+srcTag('c')+f.short+'</p>';
  if(f.pros&&f.pros.length)h+='<p>'+srcTag('c')+'<strong>優點</strong>：'+f.pros.join('、')+'</p>';
  if(f.cons&&f.cons.length)h+='<p>'+srcTag('c')+'<strong>缺點</strong>：'+f.cons.join('、')+'</p>';
  if(f.job)h+='<p>'+srcTag('c')+'<strong>事業</strong>：'+f.job+'</p>';
  if(f.wealth)h+='<p>'+srcTag('c')+'<strong>財運</strong>：'+f.wealth+'</p>';
  if(f.love)h+='<p>'+srcTag('c')+'<strong>感情</strong>：'+f.love+'</p>';
  if(f.health)h+='<p>'+srcTag('c')+'<strong>健康</strong>：'+f.health+'</p>';
  if(f.note)h+='<p>'+srcTag('n')+f.note+'</p>';
  if(f.book)h+='<p>'+srcTag('b')+f.book+'</p>';
  h+='</div>';
  return h;
 }
 function juemingBlock(digits){
  if(typeof juemingScore!=='function'||!digits)return '';
  var js=juemingScore(digits);
  if(!js.hits.length)return '';
  var over=js.total>100;
  var html='<div class="'+(over?'hl-warn':'hl-resolve')+'"><strong>筆記</strong>：絕命計分 12／21＝100、69／96＝75、48／84＝50、37／73＝25。呢組：'+js.hits.join('＋')+' ＝ <strong>'+js.total+'分</strong>。';
  html+='筆記：男人絕命過多（超過100分就過多）：性功能下降。';
  if(over)html+='呢組已超過100分。';
  else html+='呢組未超過100分。';
  if(digits.indexOf('121')>=0)html+='121 — 腰不太好；如果是女性，容易冷淡。';
  html+='</div>';
  return html;
 }
 function restore(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');
  var det=document.getElementById('details');
  if(det){
   var keys=[];
   try{
    var flow=document.getElementById('pairFlow');
    if(flow){
     flow.querySelectorAll('.pair-row strong').forEach(function(s){
      var name=s.textContent.trim();
      Object.keys(FIELDS).forEach(function(k){if(FIELDS[k].name===name&&keys.indexOf(k)<0)keys.push(k);});
     });
    }
   }catch(e){}
   if(keys.length){
    det.innerHTML='<p class="muted" style="margin-bottom:8px">以下係呢組出現過的星，課堂／筆記／書全文。八星百科有全部六欄。</p>'+keys.map(function(k){return fullStar(FIELDS[k]);}).join('');
   }
  }
  var box=document.getElementById('kindReadBox');
  if(box){
   var raw=document.getElementById('numInput');
   var digits='';
   try{
    if(kind==='birth'){var iso=document.getElementById('birthInput').value;var m=birthCode(iso);digits=m?m.code:'';}
    else if(kind==='plate')digits=plateToDigits((raw&&raw.value||'').trim());
    else {
     var s=(raw&&raw.value||'').trim();
     if(typeof expandLetters==='function')s=expandLetters(s);
     digits=(typeof extractDigits==='function')?extractDigits(s):s;
    }
   }catch(e){}
   if(box.innerHTML.indexOf('絕命計分')<0 && kind!=='id'){
    box.innerHTML+=juemingBlock(digits);
   }else if(box.innerHTML.indexOf('絕命計分')>=0 && box.innerHTML.indexOf('性功能')<0){
    box.innerHTML=box.innerHTML.replace(/(絕命計分[\s\S]*?分<\/strong>)/,'$1。筆記：男人絕命過多（超過100分就過多）：性功能下降。');
   }
  }
  var pc=document.getElementById('phoneRuleCard');
  var kindCard=document.getElementById('kindReadCard');
  if(pc&&kindCard&&kindCard.parentNode){
   pc.style.display=(kind==='phone')?'block':'none';
   if(kind==='phone'){
    var tit=pc.querySelector('.card-title');
    if(tit)tit.textContent='手機定律';
    kindCard.parentNode.insertBefore(pc, kindCard.nextSibling);
   }
  }
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<40)setTimeout(wrap,80);return;}
  if(impl.__restoreWrapped)return;
  var wrapped=function(){impl();setTimeout(restore,50);};
  wrapped.__restoreWrapped=true;
  wrapped.__storyWrapped=impl.__storyWrapped;
  wrapped.__hlWrapped=impl.__hlWrapped;
  wrapped.__layWrapped=impl.__layWrapped;
  wrapped.__copyWrapped=impl.__copyWrapped;
  wrapped.__hitWrapped=impl.__hitWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
