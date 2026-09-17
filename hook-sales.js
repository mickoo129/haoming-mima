(function(){
 var SALES={
  shengqi:'生氣：心地善良好說話，只要關係好，不要欺騙他，會一直跟你買單。生氣的人會有選擇困難症，適合給他出方案，他很難自己決定或容易徘徊。適合用非常有效的產品或方案加上情感上的連接建立信賴感，給他決定或建議成交。',
  tianyi:'天醫：比較忠厚老實，有原則，需要給他專業、正規、正直的感覺。天醫的人一般有購買力，要循序漸進，用常規的、正規的價值，人品成交法。',
  yannian:'延年：專業致勝，用專業成交。在他的領域要比他更加全面細緻，專業是建立信任最快的方法。有主見，用二選一讓他自己選，同時要懂得順從，不要起爭執，是專業品質營。',
  wugui:'五鬼：疑心病重，不能急躁，多疑，對你說的不信任。容易通過客戶見證，比較信任信得過的人說的話。用案例見證、事實見證、熟人見證，通過結果事實建立信任，不斷輸出價值，欲擒故縱成交法。',
  liusha:'六煞：喜歡被讚美，不喜歡評論指責，喜歡編織夢想，喜歡活在美好的，喜歡被欣賞。需要給他絕對重要的保證；必要時用霸王硬上弓強勢成交保證，即使是假的，在信任的情況下可以強勢成交。',
  huohai:'禍害：要面子，喜歡發表評論、見解，自認為很專業或表現得很專業。當他越挑剔代表他越重視。只需認同並且按照他提出的需求做調整，做最好的聆聽者，服從他、認同他，讓他找到被人重視、給他老大的感覺，就會被成交。喜歡被承諾、被保證的感覺。',
  jueming:'絕命：感情用事，感覺對了就買單，感覺不對就要翻臉。絕命喜歡講哥們、講義氣，適合情感聯絡進而成交。做決定快，要表演出大氣仗義，有情感的感情和狀態。喜歡自己作主，只要認同你都不是問題，不認同你再好都不要。'
 };
 function birthStar(digits){
  if(!digits||digits.length<2)return null;
  var counts={},bestP={},i,p,k,lv;
  for(i=0;i<digits.length-1;i++){
   p=digits.substr(i,2);k=PAIR_MAP[p];if(!k||k==='fuwei')continue;
   counts[k]=(counts[k]||0)+1;
   lv=(typeof PAIR_POWER!=='undefined'&&PAIR_POWER[p])||0;
   if(!bestP[k]||lv>bestP[k])bestP[k]=lv;
  }
  var keys=Object.keys(counts);if(!keys.length)return null;
  var max=0;keys.forEach(function(x){if(counts[x]>max)max=counts[x];});
  var top=keys.filter(function(x){return counts[x]===max;});
  var win=top[0];
  if(top.length>1){
   var hi=-1;
   top.forEach(function(x){var v=bestP[x]||0;if(v>hi){hi=v;win=x;}});
  }
  return win;
 }
 function block(kind,key,via){
  if(!SALES[key])return '';
  var f=FIELDS[key];
  return '<div class="hl-resolve sales-note"><p><strong>筆記：銷售攻略</strong>（'+via+' → <strong>'+f.name+'</strong>）</p><p>'+SALES[key]+'</p></div>';
 }
 function inject(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');
  if(kind!=='phone'&&kind!=='birth')return;
  var box=document.getElementById('kindReadBox');
  if(!box||box.innerHTML.indexOf('sales-note')>=0)return;
  var html='',pairs=[],digits='';
  try{
   if(kind==='birth'){
    var iso=document.getElementById('birthInput').value;
    var m=birthCode(iso);digits=m?m.code:'';
    var win=birthStar(digits);
    if(win)html=block(kind,win,'出世命格');
   }else{
    var raw=document.getElementById('numInput');
    var s=(raw&&raw.value||'').trim();
    if(typeof expandLetters==='function')s=expandLetters(s);
    digits=(typeof extractDigits==='function')?extractDigits(s):s;
    pairs=buildPairs(digits,'phone');
    if(!pairs.length)return;
    var last=pairs[pairs.length-1];
    html=block(kind,last.field,'手機尾兩位 '+last.display);
   }
  }catch(e){return;}
  if(html)box.innerHTML+=html;
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<40)setTimeout(wrap,80);return;}
  if(impl.__salesWrapped)return;
  var wrapped=function(){impl();setTimeout(inject,140);};
  wrapped.__salesWrapped=true;
  wrapped.__teaWrapped=impl.__teaWrapped;
  wrapped.__copyWrapped=impl.__copyWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
