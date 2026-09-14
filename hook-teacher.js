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
   html+='<div class="hl-resolve teacher-note"><strong>筆記</strong>：生天延。生氣（貴人，開心）→ 天醫（財富，感情）→ 延年（健康，事業，守財）。很多貴人，讓你開心及賺到錢，之後也能累積到財富及健康。</div>';
  }else if(fields.indexOf('tianyi')>=0&&fields.indexOf('yannian')>=0){
   html+='<div class="hl-resolve teacher-note"><strong>筆記</strong>：天醫+延年，老師稱高能量。</div>';
  }else if(fields.indexOf('shengqi')>=0&&fields.indexOf('tianyi')>=0){
   html+='<div class="hl-resolve teacher-note"><strong>筆記</strong>：生氣+天醫—貴人為你帶來財富。</div>';
  }
  var hai=shows.filter(function(x){return x==='17'||x==='71'||x==='89'||x==='98';});
  if(hai.length){
   html+='<div class="hl-warn teacher-note"><strong>筆記</strong>：呢組有大禍害（'+hai.join('、')+'；大禍害＝17、89）。車牌／出行：老師例中重複大禍害最容易出車禍。</div>';
  }
  var jue=shows.filter(function(x){return x==='12'||x==='21'||x==='69'||x==='96';});
  if(jue.length){
   html+='<div class="hl-warn teacher-note"><strong>筆記</strong>：呢組有大絕命（'+jue.join('、')+'；大絕命＝12、69）。</div>';
  }
  var bigT=shows.filter(function(x){return x==='13'||x==='31';});
  if(bigT.length){
   html+='<div class="hl-resolve teacher-note"><strong>筆記</strong>：呢組有大天醫（'+bigT.join('、')+'；13／31最強）。</div>';
  }
  if((kind==='plate'||kind==='other') && fields.indexOf('wugui')>=0 && fields.indexOf('jueming')>=0){
   html+='<div class="hl-warn teacher-note"><strong>筆記</strong>：車牌五鬼+絕命—老師例：事故車輝、血光。</div>';
  }else if((kind==='plate'||kind==='other') && fields.indexOf('wugui')>=0){
   html+='<div class="hl-warn teacher-note"><strong>筆記</strong>：車牌出現五鬼—老師例：出現車禍。</div>';
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
