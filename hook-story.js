(function(){
 var FLOW={
  tianyi:'有正財路與貴人，錢財與機會較易到來，但花費大方、守財不穩。',
  shengqi:'人緣開闊、有人協助、心境較鬆，但容易滿足，亦容易信錯人。',
  yannian:'須靠自己承擔、責任重，賺來的相對守得住。',
  fuwei:'此段尚無自身方向，氣場跟隨前面一段。',
  huohai:'易口舌、身體虛、為小事爭執，開口有時有財，但亦易因口破財。',
  liusha:'人情桃花多，錢容易花在人際與感情上。',
  wugui:'變數大，機會與錢來得快、去得也快，承諾不穩。',
  jueming:'起伏大，博得就上、失手就空，決定要三思。'
 };
 function linkWords(prevPol,pol){
  if(prevPol==='吉'&&pol==='凶')return '接著轉弱：';
  if(prevPol==='凶'&&pol==='吉')return '之後有轉機：';
  if(prevPol==='凶'&&pol==='凶')return '再疊加一層：';
  return '再接：';
 }
 function phoneStoryHtml(pairs,digits){
  if(!pairs||!pairs.length)return '';
  var html='<div class="story" style="margin-bottom:12px"><p><strong>電話＝後天第二人生</strong>。不必理會使用多久，課堂皆由頭至尾看氣場如何衔接；<strong>最尾四個位大約佔八成</strong>。</p>';
  var i,p,f,prev=null,bits=[];
  for(i=0;i<pairs.length;i++){
   p=pairs[i];f=FIELDS[p.field];
   var phrase=FLOW[p.field]||f.short;
   if(i===0) bits.push('開頭「'+p.display+'」'+f.name+'：'+phrase);
   else bits.push(linkWords(prev.pol,f.pol)+'「'+p.display+'」'+f.name+'：'+phrase);
   prev=f;
  }
  html+='<p>'+bits.join(' ')+'</p>';
  var tail=digits?digits.slice(-4):'';
  var last=pairs[pairs.length-1];
  var lf=FIELDS[last.field];
  html+='<p><strong>尾四位 '+tail+'</strong>收在「'+lf.name+'」。課堂：尾段決定大部分現時運勢——';
  if(lf.pol==='吉') html+='收尾吉，較易把前面的勢留住。';
  else if(lf.pol==='平') html+='收尾跟隨前一段，自身沒有新方向。';
  else html+='收尾為凶，前面即使順利，現時仍須小心口舌、錢財與感情洩漏。';
  html+='</p></div>';
  return html;
 }
 function birthLeadHtml(){return '<p><strong>出世日期＝先天命格</strong>，出生即定，一世不改號。以下先說明底子，不要當作改電話建議。</p>';}
 function idLeadHtml(){return '<p><strong>身份證＝流年</strong>。0–13歲第一段，之後每五年一段，行完再由頭至98歲。證件無法更改，較差的年段以電話末段補足。</p>';}
 function otherLead(kind){
  if(kind==='plate')return '<p><strong>車牌＝出行安危</strong>。課堂筆記：0要解（弱化前一組）；5自身不成星、跟隨相鄰。不要當作事業發達。</p>';
  if(kind==='address')return '<p><strong>門牌＝家宅</strong>，講住屋氣場與家人健康。</p>';
  if(kind==='account')return '<p><strong>銀行帳號＝錢財如何流入流出</strong>，能否守住。</p>';
  if(kind==='other')return '<p><strong>其他數字</strong>：與車牌同一套拆法。0貼前則減弱；5為伏位跟隨前一組。</p>';
  return '';
 }
 function digitsOf(kind){
  if(kind==='birth'){var iso=document.getElementById('birthInput').value;var m=birthCode(iso);return m?m.code:'';}
  if(kind==='plate')return plateToDigits(document.getElementById('numInput').value.trim());
  var raw=document.getElementById('numInput').value.trim();
  if(kind==='id'||kind==='address'||kind==='other') raw=expandLetters(raw);
  return extractDigits(raw);
 }
 function attach(){
  var impl=window.analyze;
  if(!impl||impl.__storyWrapped)return;
  var wrapped=function(){
   impl();
   try{
    var kind=window.currentKind||currentKind;
    var box=document.getElementById('kindReadBox');
    if(!box)return;
    var digits=digitsOf(kind);
    var pairs=buildPairs(digits,kind);
    var lead='';
    if(kind==='phone') lead=phoneStoryHtml(pairs,digits);
    else if(kind==='birth') lead=birthLeadHtml();
    else if(kind==='id') lead=idLeadHtml();
    else lead=otherLead(kind);
    if(lead&&box.innerHTML.indexOf('後天第二人生')<0&&box.innerHTML.indexOf('先天命格')<0&&box.innerHTML.indexOf('身份證＝流年')<0){
     box.innerHTML=lead+box.innerHTML;
    }
   }catch(e){}
  };
  wrapped.__storyWrapped=true;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(attach,0);});
 else setTimeout(attach,0);
 var v='?v=20260921b';
 var s=document.createElement('script');s.src='./hook-plate.js'+v;document.body.appendChild(s);
 var s2=document.createElement('script');s2.src='./hook-hl.js'+v;document.body.appendChild(s2);
 var s3=document.createElement('script');s3.src='./hook-layout.js'+v;document.body.appendChild(s3);
 var s4=document.createElement('script');s4.src='./hook-copy.js'+v;document.body.appendChild(s4);
 var s5=document.createElement('script');s5.src='./hook-phone-tail.js'+v;document.body.appendChild(s5);
 var s6=document.createElement('script');s6.src='./hook-sales-fix.js'+v;document.body.appendChild(s6);
})();
