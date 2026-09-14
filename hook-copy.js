(function(){
 var oldExtra=window.extraCourseNotes;
 extraCourseNotes=function(digits,pairs,kind){
  if(kind==='id')return '';
  var html=(typeof oldExtra==='function')?oldExtra(digits,pairs,kind):'';
  return html.replace(/教材筆記/g,'筆記').replace(/高級課程/g,'筆記');
 };
 window.extraCourseNotes=extraCourseNotes;
 function cleanBoxes(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');
  ['kindReadBox','details','fixBox','storyBox','roleBox'].forEach(function(id){
   var el=document.getElementById(id);
   if(!el||!el.innerHTML)return;
   el.innerHTML=el.innerHTML.replace(/教材筆記/g,'筆記').replace(/高級課程/g,'筆記').replace(/教材：/g,'');
  });
  var showLeg=(kind==='phone'||kind==='plate'||kind==='other');
  var box=document.getElementById('kindReadBox');
  if(box){
   var leg=box.querySelector('.hl-legend');
   if(!showLeg&&leg)leg.parentNode.removeChild(leg);
   if(showLeg&&box.innerHTML&&!box.querySelector('.hl-legend')){
    box.innerHTML+='<p class="hl-legend"><i><span class="num-in">黃底</span> 呢組真係有呢個號</i><i><span class="num-def">綠邊</span> 星點組成（規則，唔等於你全部都有）</i><i><span class="num-ex">灰虛線</span> 教材例子</i></p>';
   }
  }
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<30)setTimeout(wrap,80);return;}
  if(impl.__copyWrapped)return;
  var wrapped=function(){impl();setTimeout(cleanBoxes,0);};
  wrapped.__copyWrapped=true;
  wrapped.__storyWrapped=impl.__storyWrapped;
  wrapped.__hlWrapped=impl.__hlWrapped;
  wrapped.__layWrapped=impl.__layWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
