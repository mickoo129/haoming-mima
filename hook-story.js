(function(){
 var FLOW={
  tianyi:'有正財路同貴人，錢同機會較易到，但花得大方、守得唔穩。',
  shengqi:'人緣開、有人幫手、心境較鬆，不過容易滿足、亦容易信錯人。',
  yannian:'要自己掉、責任重，賺嚟的相對守得住。',
  fuwei:'呢段未有自己方向，氣場跟住前面喺段。',
  huohai:'易口舌、身體虛、為小事噶，開口有時有財但亦易因口破財。',
  liusha:'人情桃花多，錢容易花喺人同感情度。',
  wugui:'變數大，機會同錢來得快、去得亦快，承諾唔穩。',
  jueming:'起伏大，博得就上、失手就空，決定要三思。'
 };
 function linkWords(prevPol,pol){
  if(prevPol==='吉'&&pol==='凶')return '跟住轉弱：';
  if(prevPol==='凶'&&pol==='吉')return '之後有轉機：';
  if(prevPol==='凶'&&pol==='凶')return '再疊多一層：';
  return '再接：';
 }
 function phoneStoryHtml(pairs,digits){
  if(!pairs||!pairs.length)return '';
  var html='<div class="story" style="margin-bottom:12px"><p><strong>電話＝後天第二人生</strong>。唔使理用咗幾耐，課堂都係由頭行到尾睇氣場點接；<strong>最尾四個位大約佔八成</strong>。</p>';
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
  html+='<p><strong>尾四位 '+tail+'</strong>收喺「'+lf.name+'」。課堂：尾段決定大部分而家運勢——';
  if(lf.pol==='吉') html+='收尾吉，較易把前面的勢留住。';
  else if(lf.pol==='平') html+='收尾跟住前一段，自己無新方向。';
  else html+='收尾凶，前面就算好，而家都要小心口舌、錢同感情漏。';
  html+='</p></div>';
  return html;
 }
 function birthLeadHtml(){return '<p><strong>出世日期＝先天命格</strong>，出世就定，一世唔改號。下面先講底子，唔好當改電話建議。</p>';}
 function idLeadHtml(){return '<p><strong>身份證＝流年</strong>。0–13歲第一段，之後每五年一段，行完再由頭至98歲。證件改唔到，差的年段用電話尾段補。</p>';}
 function otherLead(kind){
  if(kind==='plate')return '<p><strong>車牌＝出行安危</strong>。課堂筆記：0要解（弱化前一組）；5自己唔成星、跟隔離。唔好當事業發達。</p>';
  if(kind==='address')return '<p><strong>門牌＝家宅</strong>，講住屋氣場同家人健康。</p>';
  if(kind==='account')return '<p><strong>銀行帳號＝錢點入點出</strong>，守唔守得住。</p>';
  if(kind==='other')return '<p><strong>其他數字</strong>：跟車牌同套拆法。0黐前減弱；5伏跟前。</p>';
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
 var s=document.createElement('script');s.src='./hook-plate.js';document.body.appendChild(s);
 var s2=document.createElement('script');s2.src='./hook-hl.js';document.body.appendChild(s2);
 var s3=document.createElement('script');s3.src='./hook-layout.js';document.body.appendChild(s3);
})();
