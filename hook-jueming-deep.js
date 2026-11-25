(function(){
 function block(){
  var f=FIELDS.jueming;
  if(!f)return '';
  return '<div class="hl-warn"><span class="src src-n">筆記</span><strong>絕命</strong>：分析要點<br>'
   +'數字易經初級課程，能夠看到手機號碼，了解對方情況，準確率可達到80分。高級親傳班可達到95%以上精準率。<br>'
   +'舉例：12、69為一、二級高能量；47、38為三、四級低能量。分析絕命數字時，必須結合年齡、職業、城市三項資訊綜合判斷。<br>'
   +'1，年齡：不同年齡段承受風險與投資的能力不同。<br>'
   +'2，職業：區分上班族與做生意者，體制內與體制外差異明顯。<br>'
   +'3，城市：需明確是一線、二線還是三線城市，城市經濟狀況直接影響判斷。<br><br>'
   +'<strong>衝動極端與能量的大小關係</strong><br>'
   +'核心規律：能量小則容易發生，但後果較輕；能量大則不易發生，但後果嚴重。<br>'
   +'大城市表現：48在一線城市容易衝動、脾氣急、易走極端，但極端風險小於12、69。12、69在大城市更敢於極端和衝動。<br>'
   +'小城市表現：四、五線城市中，48與37已算很極端，可能出現37較極端衝動，而48反而沒那麼極端。<br>'
   +'12、69這類人往往不在小城市待，或項目在外地大城市；在小城市反而顯得有城府和閱歷，在北京等大城市，37、12、69都會很衝動。<br><br>'
   +'<strong>城市經濟決定絕命財運表現</strong><br>'
   +'大城市12、69：肯定沒錢，但外表呈現不一定沒錢，分析需針對本人看本質。<br>'
   +'五線城市：12、69依然沒錢，缺現金流、資金緊張；48、37可能有錢，有現金流，只是有保守意識、稍微省一點，可能有結餘，屬於漏財而非完全缺現金流。<br>'
   +'結論：斷財運必須瞭解當地城市經濟發展，不能盲目。<br><br>'
   +'<strong>高能量的絕命：12與69投資大膽，金額大</strong><br>'
   +'第一反應：看到12與69，首先想到此人喜歡投資，核心動機是追求金錢。<br>'
   +'投資特徵：敢投資，且投資金額較大，追求高風險與高回報。<br>'
   +'城市放大效應：一線城市（如深圳），有100萬就敢借1000萬來投；五線城市，同樣100萬，可能只敢撬動500萬（原因：100萬在五線城市已屬富有家庭，放大五倍已非常冒險，投資相對保守）。<br>'
   +'城市差異表現：大城市100萬敢撬動500萬；小城市100萬最多撬動200萬到300萬。精細化區分：48與37之間不必過度細分，大與小的區分已足夠。<br><br>'
   +'<strong>職業年齡影響投資膽量</strong><br>'
   +'職業差異舉例：同為絕命69結尾的，45歲。房地產老闆：不敢投資。跨境電商老闆敢投資（原因：傳統行業與新興電子商務產業不同）。體制內現象：體制內的人69結尾可能真有錢，但帳戶裏的錢可能是借來的，表面有50萬，實際還在為另外50萬發愁。<br>'
   +'總結：能量大小、年齡、職業、城市都是必須抓取的資訊點。</div>';
 }
 function injectWiki(){
  var grid=document.getElementById('wikiGrid');
  if(!grid||grid.getAttribute('data-jueming-deep'))return;
  var cards=grid.querySelectorAll('.wiki-card');
  for(var i=0;i<cards.length;i++){
   var h=cards[i].querySelector('h3');
   if(h&&h.textContent.indexOf('絕命')>=0){
    cards[i].insertAdjacentHTML('beforeend',block());
    break;
   }
  }
  grid.setAttribute('data-jueming-deep','1');
 }
 function digitsNow(){
  var kind=window.currentKind|| (typeof currentKind!=='undefined'?currentKind:'phone');
  try{
   if(kind==='birth'){
    var iso=document.getElementById('birthInput').value;
    var m=typeof birthCode==='function'?birthCode(iso):null;
    return m?m.code:'';
   }
   if(kind==='plate'&&typeof plateToDigits==='function'){
    return plateToDigits(document.getElementById('numInput').value.trim());
   }
   var raw=document.getElementById('numInput').value.trim();
   if(kind==='id'||kind==='address'||kind==='other'){
    raw=typeof expandLetters==='function'?expandLetters(raw):raw;
   }
   return typeof extractDigits==='function'?extractDigits(raw):raw.replace(/\D/g,'');
  }catch(e){return '';}
 }
 function hasJueming(){
  var kind=window.currentKind|| (typeof currentKind!=='undefined'?currentKind:'phone');
  var digits=digitsNow();
  if(typeof buildPairs!=='function'||!digits)return false;
  var pairs=buildPairs(digits,kind)||[];
  for(var i=0;i<pairs.length;i++){
   if(pairs[i]&&pairs[i].field==='jueming')return true;
  }
  return false;
 }
 function injectRead(){
  var box=document.getElementById('kindReadBox');
  if(!box||box.querySelector('[data-jueming-deep]'))return;
  if(!hasJueming())return;
  var html=block().replace('class="hl-warn"','class="hl-warn" data-jueming-deep="1"');
  box.insertAdjacentHTML('beforeend',html);
 }
 function start(){setTimeout(injectWiki,0);setTimeout(injectWiki,700);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);
 else start();
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__juemingDeepWrapped)return;
  var w=function(){impl();setTimeout(injectRead,500);setTimeout(injectRead,1300);};
  w.__juemingDeepWrapped=true;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 setTimeout(wrap,0);
})();
