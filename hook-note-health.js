(function(){
 var YE_WG=['197','918','781','879','342','436','263','624'];
 var HAI0=['107','701','809','908','604','406','203','302'];
 function hits(str,list){return list.filter(function(x){return str.indexOf(x)>=0;});}
 function block(kind,digits){
  if(kind!=='phone'||!digits)return '';
  var html='',h;
  h=hits(digits,YE_WG);
  if(h.length){
   html+='<div class="hl-warn health-note"><p><strong>筆記</strong>：疾病號：敞夜傷身：延年+五鬼（'+h.join('、')+'）</p>';
   html+='<p>筆記原文例：197／918、781／879、342／436、263／624。</p>';
   html+='<p>筆記原文：容易出現敞夜失眠、頸椎病、心腦血管疾病。</p></div>';
  }
  var last4=digits.slice(-4);
  h=hits(last4,HAI0);
  if(h.length){
   html+='<div class="hl-warn health-note"><p><strong>筆記</strong>：手機號後四位出現：'+h.join('、')+'</p>';
   html+='<p>筆記原文例：107／701、809／908、604／406、203／302。</p>';
   html+='<p>筆記原文：1. 容易有隱藏的傷口或者隱藏的疾病</p>';
   html+='<p>筆記原文：2. 嚴重容易開刀動手術</p>';
   html+='<p>筆記原文：3. 女性容易流產、墮胎、剖腹產等情況</p></div>';
  }
  return html;
 }
 function inject(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');
  var box=document.getElementById('kindReadBox');
  if(!box||kind!=='phone'||box.innerHTML.indexOf('health-note')>=0)return;
  var raw=document.getElementById('numInput');
  var s=(raw&&raw.value||'').trim();
  if(typeof expandLetters==='function')s=expandLetters(s);
  var digits=(typeof extractDigits==='function')?extractDigits(s):s;
  var html=block(kind,digits);
  if(html)box.innerHTML+=html;
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<40)setTimeout(wrap,80);return;}
  if(impl.__healthWrapped)return;
  var wrapped=function(){impl();setTimeout(inject,150);};
  wrapped.__healthWrapped=true;
  wrapped.__salesWrapped=impl.__salesWrapped;
  wrapped.__teaWrapped=impl.__teaWrapped;
  wrapped.__copyWrapped=impl.__copyWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
