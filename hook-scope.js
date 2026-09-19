(function(){
 function kindNow(){return window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');}
 function kill(box,sels){
  if(!box)return;
  sels.forEach(function(sel){
   [].slice.call(box.querySelectorAll(sel)).forEach(function(el){
    if(el&&el.parentNode)el.parentNode.removeChild(el);
   });
  });
 }
 function stripDupCatalog(box,kind){
  if(!box)return;
  var stars=['天醫','延年','生氣','伏位','絕命','五鬼','禍害','六煞'];
  [].slice.call(box.querySelectorAll('p')).forEach(function(p){
   var t=(p.textContent||'').replace(/\s+/g,'');
   if(!t)return;
   if(t.indexOf('段會見到')>=0){if(p.parentNode)p.parentNode.removeChild(p);return;}
   if(kind!=='birth')return;
   if(t.indexOf('先天命格')>=0||t.indexOf('出生年月日')>=0||t.indexOf('此組出現')>=0)return;
   var i;
   for(i=0;i<stars.length;i++){
    if(t.indexOf(stars[i]+'：')===0||t.indexOf(stars[i]+':')===0){
     if(p.parentNode)p.parentNode.removeChild(p);
     return;
    }
   }
  });
 }
 function strip(){
  var kind=kindNow();
  var box=document.getElementById('kindReadBox');
  if(!box)return;
  if(kind==='birth'||kind==='id'){
   kill(box,['.seq-note','.hm-seq-explain','.hm-gap-explain','.hm-hit-explain','#hmSum','.hm-sum','.hl-legend']);
   stripDupCatalog(box,kind);
  }
  if(kind!=='phone'&&kind!=='birth'&&kind!=='id'){
   kill(box,['.hm-gap-explain','.hm-hit-explain']);
  }
 }
 var tries=0;
 function wrapFn(){
  var impl=window.analyze;
  if(!impl){if(tries++<60)setTimeout(wrapFn,80);return;}
  if(impl.__scopeWrapped)return;
  var wrapped=function(){impl();setTimeout(strip,520);};
  wrapped.__scopeWrapped=true;
  wrapped.__seqWrapped=impl.__seqWrapped;
  wrapped.__gapWrapped=impl.__gapWrapped;
  wrapped.__uxWrapped=impl.__uxWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrapFn,0);});
 else setTimeout(wrapFn,0);
})();
