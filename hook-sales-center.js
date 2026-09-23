(function(){
 var PTS={4:100,3:75,2:50,1:25};
 var POWER={'14':4,'41':4,'67':3,'76':3,'39':2,'93':2,'28':1,'82':1,'13':4,'31':4,'68':3,'86':3,'49':2,'94':2,'27':1,'72':1,'19':4,'91':4,'78':3,'87':3,'34':2,'43':2,'26':1,'62':1,'11':4,'22':4,'99':3,'88':3,'66':2,'77':2,'33':1,'44':1,'16':4,'61':4,'47':3,'74':3,'38':2,'83':2,'29':1,'92':1,'17':4,'71':4,'89':3,'98':3,'46':2,'64':2,'23':1,'32':1,'18':4,'81':4,'79':3,'97':3,'36':2,'63':2,'24':1,'42':1,'12':4,'21':4,'69':3,'96':3,'48':2,'84':2,'37':1,'73':1};
 var SALES={
  yannian:'延年：專業致勝，只喜歡懂行的人。在他的領域要比他更全面細致，切忌高傲。有主見，不要替他作主，給兩套方案二選一。極其固執，不要起爭執，順從他當領導的心理。相對較難成交。',
  wugui:'五鬼：聰明但疑心重。用客戶回饋、熟人見證、實際案例，眼見為實。講完即止，說多錯多。展示價值後可適度冷淡，製造緊迫感，欲擒故縱。',
  huohai:'禍害：要面子、喜歡發表見解、虛榮心強。越挑剚代表越在意。做聆聽者，認同他、給足面子，原則內可承諾。順著他，不要對著幹。要求超出原則時先尊重再說明限制。',
  liusha:'六煞：喜歡被讚美與認同，愛編織夢想，優豫不決。盡情讚美。要給確切保障，拿不定主意時可替他拍板。屬較易成交類型。',
  jueming:'絕命：感情用事、講義氣、決定衝動。打感情牌，表現大氣仗義。認同你就一衝而上，不認同再好都沒用。屬較易成交類型。',
  shengqi:'生氣：善良好說話，關係好就會再買，但有選擇困難。用高價值方案加情感連結建信賴，並明確幫他做決定。',
  tianyi:'天醫：忠厚老實、有原則、購買力較強。給專業、正規、正直的感覺，循序漸進用價值與人品成交。屬較易成交類型。'
 };
 function blue(n){return '<strong style="color:#2563eb">'+n+'</strong>';}
 function scoreAll(d){
  if(typeof buildPairs!=='function')return null;
  var pairs=buildPairs(d,'phone');
  var sum={},detail={},i,p,raw,lv,pt,k,label;
  for(i=0;i<pairs.length;i++){
   p=pairs[i];k=p.field;
   if(!k||k==='fuwei')continue;
   raw=p.pair||'';
   lv=POWER[raw]||0;
   if(!lv)continue;
   pt=PTS[lv]||0;
   sum[k]=(sum[k]||0)+pt;
   if(!detail[k])detail[k]=[];
   label=(p.display||raw)+'＝'+pt;
   if((p.note||'').indexOf('伏位延續')>=0)label+='（伏位延續）';
   detail[k].push(label);
  }
  var keys=Object.keys(sum);if(!keys.length)return null;
  keys.sort(function(a,b){return sum[b]-sum[a];});
  return {win:keys[0],sum:sum,detail:detail,keys:keys};
 }
 function innerHtml(sc,tailK){
  var lines=[];
  sc.keys.forEach(function(k){
   lines.push('<strong>'+FIELDS[k].name+'</strong> '+sc.sum[k]+'分（'+(sc.detail[k]||[]).join('、')+'）');
  });
  var h='<p data-sales-center="1"><strong>接著看全號八位中心磁場</strong>（一級100／二級75／三級50／四級25；掉轉同分）</p>';
  h+='<p>全號各星合計：'+lines.join('；')+'。</p>';
  h+='<p><strong>中心磁場：</strong>'+blue(FIELDS[sc.win].name)+'（'+sc.sum[sc.win]+'分）</p>';
  if(sc.win===tailK) h+='<p>中心磁場與尾兩位相同，成交術見上文。</p>';
  else if(SALES[sc.win]) h+='<p>'+SALES[sc.win]+'</p>';
  else h+='<p>此星無獨立成交術，仍以尾兩位為主。</p>';
  h+='<p class="muted">課堂總結：較易成交為六煞、天醫、絕命；相對難搞為延年。</p>';
  return h;
 }
 function colorTitle(host){
  var p=host.querySelector('p');
  if(!p)return;
  if((p.textContent||'').indexOf('銷售攻略')<0)return;
  if((p.innerHTML||'').indexOf('#2563eb')>=0)return;
  var names=['禍害','絕命','五鬼','六煞','天醫','延年','生氣'];
  var i,n;
  for(i=0;i<names.length;i++){
   n=names[i];
   if(p.textContent.indexOf(n)>=0){
    p.innerHTML=p.innerHTML.replace(n,blue(n));
    break;
   }
  }
 }
 function paint(){
  if((window.currentKind||'')!=='phone')return;
  var box=document.getElementById('kindReadBox');
  if(!box)return;
  var host=box.querySelector('.sales-note');
  if(!host)return;
  colorTitle(host);
  if(host.querySelector('[data-sales-center]'))return;
  var el=document.getElementById('numInput');
  var d=el?((el.value.match(/\d/g)||[]).join('')):'';
  if(!d||d.length<2)return;
  var sc=scoreAll(d);if(!sc)return;
  var tailK=PAIR_MAP[d.slice(-2)]||'';
  host.insertAdjacentHTML('beforeend',innerHtml(sc,tailK));
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__salesCenter)return;
  var w=function(){impl();setTimeout(paint,260);setTimeout(paint,540);};
  w.__salesCenter=true;
  w.__salesFix=impl.__salesFix;
  w.__copyWrapped=impl.__copyWrapped;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
