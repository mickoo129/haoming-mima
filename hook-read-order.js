(function(){
 function flatten(){
  var spine=document.getElementById('hmSpine');
  if(spine&&spine.parentNode)spine.parentNode.removeChild(spine);
  document.querySelectorAll('.hm-guide').forEach(function(el){if(el.parentNode)el.parentNode.removeChild(el);});
  document.querySelectorAll('.hm-sec').forEach(function(el){
   var body=el.querySelector('.hm-sec-body');
   var parent=el.parentNode;
   if(!parent)return;
   if(body){while(body.firstChild)parent.insertBefore(body.firstChild, el);}
   parent.removeChild(el);
  });
  document.querySelectorAll('[data-folded]').forEach(function(el){el.removeAttribute('data-folded');});
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<50)setTimeout(wrap,80);return;}
  if(impl.__readOrderFlat)return;
  var w=function(){impl();setTimeout(flatten,400);setTimeout(flatten,1200);};
  w.__readOrderFlat=true;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
