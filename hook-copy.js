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
   .replace(/呢組/g,'此組')
   .replace(/呢次/g,'本次')
   .replace(/呢個/g,'這個')
   .replace(/銀行[咋咆]密碼/g,'銀行卡密碼')
   .replace(/婚愛情/g,'婚外情')
   .replace(/資産/g,'資產')
   .replace(/六紥/g,'六煞')
   .replace(/六紮/g,'六煞')
   .replace(/六紳/g,'六煞')
   .replace(/毀耀/g,'煇耀')
   .replace(/毀耀/g,'煇耀')
   .replace(/拖葺/g,'拖垮')
   .replace(/優豫/g,'優豫')
   .replace(/孤注一撲/g,'孤注一擲')
   .replace(/得理不饜/g,'得理不饕')
   .replace(/得理不餜/g,'得理不饕')
   .replace(/得理不飼/g,'得理不饕');
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
 function lastStarName(){
  var flow=document.getElementById('pairFlow');
  if(!flow)return '';
  var rows=flow.querySelectorAll('.pair-row strong');
  return rows.length?(rows[rows.length-1].textContent||'').trim():'';
 }
 function phoneDigits(){
  var el=document.getElementById('numInput');
  return el?((el.value.match(/\d/g)||[]).join('')):'';
 }
 function shrinkPhoneRead(box){
  if(!box)return;
  [].slice.call(box.querySelectorAll('ol')).forEach(function(ol){
   var t=ol.textContent||'';
   if(t.indexOf('天醫')>=0&&t.indexOf('延年')>=0){
    var tip=document.createElement('p');
    tip.className='muted';
    tip.textContent='課堂閱讀次序：先天醫（婚姻／財運），再延年（事業／能力），再絕命（錢的來去）。後4位約佔八成。';
    ol.parentNode.replaceChild(tip,ol);
   }
  });
  [].slice.call(box.querySelectorAll('p')).forEach(function(p){
   var t=p.textContent||'';
   if(t.indexOf('分析手機')>=0&&t.indexOf('次序')>=0){p.parentNode.removeChild(p);return;}
   if(t.indexOf('結尾六條')>=0||(t.indexOf('不能以0結尾')>=0&&t.indexOf('不能以五鬼')>=0)){
    var last=lastStarName();
    var d=phoneDigits();
    var hits=[];
    if(d&&d.charAt(d.length-1)==='0')hits.push('以0結尾（結局一場空）');
    if(last.indexOf('五鬼')>=0)hits.push('以五鬼結尾（損財富，出意外）');
    if(last.indexOf('六煞')>=0)hits.push('以六煞結尾（損財富，傷婚姻）');
    if(last.indexOf('禍害')>=0)hits.push('以禍害結尾（招小人，傷身體）');
    if(last.indexOf('絕命')>=0)hits.push('以絕命結尾（損財富，出意外）');
    if(!hits.length){p.parentNode.removeChild(p);return;}
    p.textContent='課堂結尾：'+hits.join('；')+'。';
   }
  });
 }
 function cleanBoxes(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');
  ['kindReadBox','details','fixBox','storyBox','roleBox','wikiGrid','phoneRuleCard','pairFlow'].forEach(function(id){
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
   if(kind==='id'){
    [].slice.call(box.querySelectorAll('p')).forEach(function(p){
     if((p.textContent||'').indexOf('段會見到')>=0 && p.parentNode) p.parentNode.removeChild(p);
    });
   }
   if(kind==='phone')shrinkPhoneRead(box);
  }
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<30)setTimeout(wrap,80);return;}
  if(impl.__copyWrapped)return;
  var wrapped=function(){impl();setTimeout(cleanBoxes,0);setTimeout(cleanBoxes,120);};
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
 var v='?v=20260920d';
 var hx=document.createElement('script');hx.src='./hook-hitbox.js'+v;document.body.appendChild(hx);
 var hr=document.createElement('script');hr.src='./hook-restore.js'+v;document.body.appendChild(hr);
 var he=document.createElement('script');he.src='./hook-explain.js'+v;document.body.appendChild(he);
 var ht=document.createElement('script');ht.src='./hook-teacher.js'+v;document.body.appendChild(ht);
 var hs=document.createElement('script');hs.src='./hook-sales.js'+v;document.body.appendChild(hs);
 var hh=document.createElement('script');hh.src='./hook-note-health.js'+v;document.body.appendChild(hh);
 var hu=document.createElement('script');hu.src='./hook-ux.js'+v;document.body.appendChild(hu);
 var hg=document.createElement('script');hg.src='./hook-gap.js'+v;document.body.appendChild(hg);
 var hq=document.createElement('script');hq.src='./hook-seq.js'+v;document.body.appendChild(hq);
 var hk=document.createElement('script');hk.src='./hook-scope.js'+v;document.body.appendChild(hk);
})();
