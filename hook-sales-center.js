(function(){
 var PTS={4:100,3:75,2:50,1:25};
 var SALES={
  yannian:'延年：專業致勝，只喜歡懂行的人。在他的領域要比他更全面細致，切忌高傲。有主見，不要替他作主，給兩套方案二選一。極其固執，不要起爭執，順從他當領導的心理。相對較難成交。',
  wugui:'五鬼：聰明但疑心重。用客戶回饋、熟人見證、實際案例，眼見為實。講完即止，說多錯多。展示價值後可適度冷淡，製造緊迫感，欲擒故縱。',
  huohai:'禍害：要面子、喜歡發表見解、虛榮心強。越挑剚代表越在意。做聆聽者，認同他、給足面子，原則內可承諾。順著他，不要對著幹。要求超出原則時先尊重再說明限制。',
  liusha:'六煞：喜歡被讚美與認同，愛編織夢想，優豫不決。盡情讚美。要給確切保障，拿不定主意時可替他拍板。屬較易成交類型。',
  jueming:'絕命：感情用事、講義氣、決定衝動。打感情牌，表現大氣仗義。認同你就一衝而上，不認同再好都沒用。屬較易成交類型。',
  shengqi:'生氣：善良好說話，關係好就會再買，但有選擇困難。用高價值方案加情感連結建信賴，並明確幫他做決定。',
  tianyi:'天醫：忠厚老實、有原則、購買力較強。給專業、正規、正直的感覺，循序漸進用價值與人品成交。屬較易成交類型。'
 };
 function power(p){
  if(typeof PAIR_POWER!=='undefined'&&PAIR_POWER[p])return PAIR_POWER[p];
  return 0;
 }
 function digits(){
  var el=document.getElementById('numInput');
  return el?((el.value.match(/\d/g)||[]).join('')):'';
 }
 function scoreAll(d){
  var sum={},detail={},i,p,k,lv,pt;
  for(i=0;i<d.length-1;i++){
   p=d.substr(i,2);k=PAIR_MAP[p];
   if(!k||k==='fuwei')continue;
   lv=power(p);if(!lv)continue;
   pt=PTS[lv]||0;
   sum[k]=(sum[k]||0)+pt;
   if(!detail[k])detail[k]=[];
   detail[k].push(p+'＝'+pt);
  }
  var keys=Object.keys(sum);if(!keys.length)return null;
  keys.sort(function(a,b){return sum[b]-sum[a];});
  return {win:keys[0],sum:sum,detail:detail,keys:keys};
 }
 function paint(){
  if((window.currentKind||'')!=='phone')return;
  var box=document.getElementById('kindReadBox');
  if(!box||box.querySelector('[data-sales-center]'))return;
  var d=digits();if(!d||d.length<2)return;
  var sc=scoreAll(d);if(!sc)return;
  var tail=d.slice(-2);
  var tailK=PAIR_MAP[tail]||'';
  var lines=[];
  sc.keys.forEach(function(k){
   lines.push(FIELDS[k].name+' '+sc.sum[k]+'分（'+(sc.detail[k]||[]).join('、')+'）');
  });
  var h='<div class="hl-sales" data-sales-center="1" style="margin-top:10px">';
  h+='<p><strong>筆記：八位中心磁場</strong>（一級100／二級75／三級50／四級25；掉轉同分）</p>';
  h+='<p>除尾兩位外，全號各星合計：'+lines.join('；')+'。</p>';
  h+='<p><strong>中心磁場：'+FIELDS[sc.win].name+'</strong>（'+sc.sum[sc.win]+'分）</p>';
  if(sc.win===tailK){
   h+='<p>中心磁場與尾兩位相同，成交術見上段尾號攻略。</p>';
  }else if(SALES[sc.win]){
   h+='<p>'+SALES[sc.win]+'</p>';
  }else{
   h+='<p>此星無獨立成交術，仍以尾兩位為主。</p>';
  }
  h+='<p class="muted">課堂總結：較易成交為六煞、天醫、絕命；相對難搞為延年。</p></div>';
  var host=box.querySelector('.sales-note');
  if(host)host.insertAdjacentHTML('afterend',h);
  else box.insertAdjacentHTML('beforeend',h);
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__salesCenter)return;
  var w=function(){impl();setTimeout(paint,240);setTimeout(paint,520);};
  w.__salesCenter=true;
  w.__salesFix=impl.__salesFix;
  w.__copyWrapped=impl.__copyWrapped;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
