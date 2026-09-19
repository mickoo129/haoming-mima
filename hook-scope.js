(function(){
 function kindNow(){return window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');}
 function strip(){
  var kind=kindNow();
  var box=document.getElementById('kindReadBox');
  if(!box)return;
  if(kind==='phone')return;
  ['.seq-note','.hm-seq-explain','.hm-gap-explain','.hm-hit-explain','#hmSum','.hm-sum'].forEach(function(sel){
   [].slice.call(box.querySelectorAll(sel)).forEach(function(el){
    if(el&&el.parentNode)el.parentNode.removeChild(el);
   });
  });
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
