(function(){
 function kill(){
  var c=document.getElementById('hitCard');
  if(c&&c.parentNode)c.parentNode.removeChild(c);
 }
 var tries=0;
 function wrap(){
  kill();
  var impl=window.analyze;
  if(!impl){if(tries++<40)setTimeout(wrap,80);return;}
  if(impl.__hitWrapped){kill();return;}
  var wrapped=function(){impl();setTimeout(kill,40);};
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
