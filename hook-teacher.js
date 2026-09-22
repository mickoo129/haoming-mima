(function(){
 function orderHas(fields,seq){
  var j=0,i;
  for(i=0;i<fields.length;i++){
   if(fields[i]===seq[j])j++;
   if(j===seq.length)return true;
  }
  return false;
 }
 function note(kind,digits,pairs){
  if(kind!=='plate'&&kind!=='other'&&kind!=='phone')return '';
  if(!pairs||!pairs.length)return '';
  var html='',fields=pairs.map(function(p){return p.field;}).filter(function(f){return f!=='fuwei';});
  var shows=pairs.map(function(p){return p.display;});
  if(orderHas(fields,['shengqi','tianyi','yannian'])){
   html+='<div class="hl-resolve teacher-note"><p><strong>筆記：生天延</strong></p><p>生氣（貴人，開心）→ 天醫（財富，感情）→ 延年（健康，事業，守財）。很多貴人，讓你開心及賺到錢，之後也能累積到財富及健康。</p></div>';
  }else if(fields.indexOf('tianyi')>=0&&fields.indexOf('yannian')>=0){
   html+='<div class="hl-resolve teacher-note"><p><strong>筆記：天醫+延年</strong></p><p>老師稱高能量：有財路且較守得住。</p></div>';
  }else if(fields.indexOf('shengqi')>=0&&fields.indexOf('tianyi')>=0){
   html+='<div class="hl-resolve teacher-note"><p><strong>筆記：生氣+天醫</strong></p><p>貴人為你帶來財富。</p></div>';
  }
  var hai=shows.filter(function(x){return x==='17'||x==='71'||x==='89'||x==='98';});
  if(hai.length){
   html+='<div class="hl-warn teacher-note"><p><strong>筆記：此組有大禍害</strong>（命中 '+hai.join('、')+'；大禍害＝17、89，掉轉 71、98 同分）</p><p>禍害兩組能量裡最強的一級、二級，較 46／64、23／32 更易口舌、官非與意外。車牌／出行：老師例中重複大禍害最容易出車禍。</p></div>';
  }
  var jue=shows.filter(function(x){return x==='12'||x==='21'||x==='69'||x==='96';});
  if(jue.length){
   html+='<div class="hl-warn teacher-note"><p><strong>筆記：此組有大絕命</strong>（命中 '+jue.join('、')+'；大絕命＝12、69，掉轉 21、96 同分）</p><p>絕命兩組能量裡最強的一級、二級，較 48／84、37／73 更易大上大落、衝動下注與突發衝突。同一組號碼若再疊多個大絕命，力道更重。</p></div>';
  }
  var bigT=shows.filter(function(x){return x==='13'||x==='31';});
  if(bigT.length){
   html+='<div class="hl-resolve teacher-note"><p><strong>筆記：此組有大天醫</strong>（命中 '+bigT.join('、')+'；13／31 最強）</p><p>天醫能量第一級，正財與正緣較明顯。</p></div>';
  }
  if((kind==='plate'||kind==='other') && fields.indexOf('wugui')>=0 && fields.indexOf('jueming')>=0){
   html+='<div class="hl-warn teacher-note"><p><strong>筆記：車牌五鬼+絕命</strong></p><p>老師例：事故車禍、血光。</p></div>';
  }else if((kind==='plate'||kind==='other') && fields.indexOf('wugui')>=0){
   html+='<div class="hl-warn teacher-note"><p><strong>筆記：車牌出現五鬼</strong></p><p>老師例：出現車禍。</p></div>';
  }
  return html;
 }
 function inject(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');
  var box=document.getElementById('kindReadBox');
  if(!box)return;
  var raw=document.getElementById('numInput');
  var digits='',pairs=[];
  try{
   if(kind==='birth'||kind==='id')return;
   if(kind==='plate')digits=plateToDigits((raw&&raw.value||'').trim());
   else {
    var s=(raw&&raw.value||'').trim();
    if(typeof expandLetters==='function')s=expandLetters(s);
    digits=(typeof extractDigits==='function')?extractDigits(s):s;
   }
   pairs=buildPairs(digits,kind);
  }catch(e){return;}
  var html=note(kind,digits,pairs);
  if(!html)return;
  if(box.innerHTML.indexOf('teacher-note')>=0)return;
  box.innerHTML+=html;
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<40)setTimeout(wrap,80);return;}
  if(impl.__teaWrapped)return;
  var wrapped=function(){impl();setTimeout(inject,120);};
  wrapped.__teaWrapped=true;
  wrapped.__expWrapped=impl.__expWrapped;
  wrapped.__restoreWrapped=impl.__restoreWrapped;
  wrapped.__copyWrapped=impl.__copyWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
