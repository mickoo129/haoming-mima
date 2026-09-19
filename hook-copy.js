(function(){
 function relabel(s){
  if(!s)return s;
  return s
   .replace(/課堂車牌筆記/g,'筆記')
   .replace(/課堂睇號筆記/g,'筆記')
   .replace(/教材筆記/g,'筆記')
   .replace(/高級課程/g,'筆記')
   .replace(/教材次凶：/g,'課堂次凶：')
   .replace(/教材大凶：/g,'課堂大凶：')
   .replace(/教材感情：/g,'課堂感情：')
   .replace(/教材例子：/g,'課堂：')
   .replace(/教材適合的行業/g,'課堂：適合的行業')
   .replace(/百科主文跟教材/g,'百科主文跟課堂')
   .replace(/手機教材分類提示/g,'課堂手機分類提示')
   .replace(/教材禁號/g,'課堂禁號')
   .replace(/教材例子/g,'課堂例子')
   .replace(/教材：/g,'課堂：')
   .replace(/銀行[咋咅]密碼/g,'銀行卡密碼')
   .replace(/婚愛情/g,'婚外情')
   .replace(/資産/g,'資產');
 }
 if(typeof KIND_INFO!=='undefined'){
  Object.keys(KIND_INFO).forEach(function(k){
   if(KIND_INFO[k]&&KIND_INFO[k].text) KIND_INFO[k].text=relabel(KIND_INFO[k].text);
  });
 }
 var oldExtra=window.extraCourseNotes;
 extraCourseNotes=function(digits,pairs,kind){
  if(kind==='id')return '';
  var html=(typeof oldExtra==='function')?oldExtra(digits,pairs,kind):'';
  return relabel(html);
 };
 window.extraCourseNotes=extraCourseNotes;
 function cleanBoxes(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');
  ['kindReadBox','details','fixBox','storyBox','roleBox','wikiGrid','phoneRuleCard'].forEach(function(id){
   var el=document.getElementById(id);
   if(!el||!el.innerHTML)return;
   el.innerHTML=relabel(el.innerHTML);
  });
  var hint=document.getElementById('kindHint');
  if(hint)hint.innerHTML=relabel(hint.innerHTML);
  var showLeg=(kind==='phone'||kind==='plate'||kind==='other');
  var box=document.getElementById('kindReadBox');
  if(box){
   var leg=box.querySelector('.hl-legend');
   if(!showLeg&&leg)leg.parentNode.removeChild(leg);
   if(showLeg&&box.innerHTML&&!box.querySelector('.hl-legend')){
    box.innerHTML+='<p class="hl-legend"><i><span class="num-in">黃底</span> 此組號碼確實出現</i><i><span class="num-def">綠邊</span> 星曜組合規則（不代表全部皆有）</i><i><span class="num-ex">灰虛線</span> 課堂／筆記例子</i></p>';
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
  setTimeout(cleanBoxes,0);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
 var hx=document.createElement('script');hx.src='./hook-hitbox.js';document.body.appendChild(hx);
 var hr=document.createElement('script');hr.src='./hook-restore.js';document.body.appendChild(hr);
 var he=document.createElement('script');he.src='./hook-explain.js';document.body.appendChild(he);
 var ht=document.createElement('script');ht.src='./hook-teacher.js';document.body.appendChild(ht);
 var hs=document.createElement('script');hs.src='./hook-sales.js';document.body.appendChild(hs);
 var hh=document.createElement('script');hh.src='./hook-note-health.js';document.body.appendChild(hh);
 var hu=document.createElement('script');hu.src='./hook-ux.js';document.body.appendChild(hu);
})();
