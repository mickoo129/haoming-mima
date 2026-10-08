(function(){
 function paint(){return;}
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__zeroNote)return;
  var w=function(){impl();setTimeout(paint,280);};
  w.__zeroNote=true;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
