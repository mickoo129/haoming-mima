(function(){
 if(!document.getElementById('hm-seq-css')){
  var st=document.createElement('style');
  st.id='hm-seq-css';
  st.textContent=[
   '.seq-note{margin-top:10px;background:#f4eef8;border-left:4px solid #7b1fa2;border-radius:8px;padding:10px 12px}',
   '.seq-note strong{color:#4a148c}',
   '.seq-note .seq-group{margin:8px 0 4px}',
   '.hm-sum .hit-seq{background:#f4eef8;border-color:#7b1fa2;color:#4a148c}'
  ].join('');
  document.head.appendChild(st);
 }
 var JI=['tianyi','yannian','shengqi','fuwei'];
 var XIONG=['jueming','wugui','huohai','liusha'];
 var GROUP={
  tianyi:{head:'天醫（財富、正桃花）後接凶星',intro:'天醫代表賺到的錢與正緣感情。後面接凶星，代表「財與情最後的下場」。'},
  yannian:{head:'延年（事業、能力、守財）後接凶星',intro:'延年代表大將之風、責任感與守財庫。後面接凶星，代表「事業決策失誤、守不住財、壓力爆煲」。'},
  shengqi:{head:'生氣（貴人、人脈、樂觀）後接凶星',intro:'生氣代表貴人、朋友與隨緣心態。後面接凶星，代表「好心沒好報、貴人轉為禍害」。'},
  fuwei:{head:'伏位（延續、等待、被動）後接凶星',intro:'伏位代表蓄力、被動與無主見。後面接凶星，代表「原本的隱患持續積累，最終全面爆發」。'}
 };
 var SEQ={
  'tianyi|jueming':{star:'tianyi',title:'天醫＋絕命',ex:'312、684、496、273',problem:'錢財瞬間虧空、盲目投資、感情一刀切。',meaning:'天醫賺到的錢，因絕命的衝動、敢拼與好賭性格，直接投入高風險項目或借給他人，導致血本無歸；感情上容易衝動分手或因利益翻臉。'},
  'tianyi|wugui':{star:'tianyi',title:'天醫＋五鬼',ex:'318、681、497、279',problem:'錢財暗耗、突發破財、感情生變與猜忌。',meaning:'錢不是明著虧，而是暗中流走（非正常開銷、投機、突發意外花掉）；感情上出現私心、不信任、劈腿或第三者介入，防不勝防。'},
  'tianyi|huohai':{star:'tianyi',title:'天醫＋禍害',ex:'317、689、498、271',problem:'因財惹是非、有錢招小人、吃喝花光。',meaning:'賺到了錢就容易燬耀、說話得罪人，錢財大部分花在應酬、吃喝或因身體生病而花掉；感情上天天吵架、口舌不斷。'},
  'tianyi|liusha':{star:'tianyi',title:'天醫＋六煞',ex:'316、683、492、274',problem:'錢花在女人／家庭／情緒、偏桃花耗財。',meaning:'錢財流向了不正常的異性交往、過度的打扮消費，或者因家庭沉重負擔而耗盡；感情上多愁善感、容易出現爛桃花與三角戀。'},
  'yannian|jueming':{star:'yannian',title:'延年＋絕命',ex:'192、876、348、261',problem:'過度自負導致暴敗、官非訴訟、衝動轉型。',meaning:'自以為能力很強，做生意或投資時過於冒進、獨斷專行，最終引來官司或全盤皆輸；脾氣極其暴躁。'},
  'yannian|wugui':{star:'yannian',title:'延年＋五鬼',ex:'197、879、342、263',problem:'工作多變、事業暗藏危機、突發跳槽／改行。',meaning:'才華與能力很強，但心思極端不定，對現有事業容易產生厭倦，愛走偏鋒或暗箱操作，最終突發變故，守不住事業成果；心臟及血液循環易出問題。'},
  'yannian|huohai':{star:'yannian',title:'延年＋禍害',ex:'198、871、346、264',problem:'鐵齒好辯惹小人、壓力大成疾、抱怨連連。',meaning:'在事業上能力強但嘴硬不服輸，極易在職場得罪人或引發下屬背叛；因長期承擔過重壓力而引發呼吸道或慢性疾病。'},
  'yannian|liusha':{star:'yannian',title:'延年＋六煞',ex:'194、872、347、268',problem:'抗壓不足、情緒失控、因私情影響事業。',meaning:'表面強勢但內心脆弱焦慮，事業容易被家庭瑣事或感情糾葛拖葷，容易在關鍵決策時優豫不決而錯失良機。'},
  'shengqi|jueming':{star:'shengqi',title:'生氣＋絕命',ex:'148、412、673、769',problem:'因朋友破大財、仗義遭坑騙。',meaning:'太講義氣、耳根軟，朋友叫投資就投資，叫擔保就擔保，最後被朋友拖累而背負債務或招致官非。'},
  'shengqi|wugui':{star:'shengqi',title:'生氣＋五鬼',ex:'142、418、679、763',problem:'交友不慎、被朋友暗算、心思浮躁。',meaning:'身邊看似朋友極多、社交熱絡，但多是各懷鬼胎的酒肉之交，容易在關鍵時刻被身邊信任的人暗中出賣或借錢不還。'},
  'shengqi|huohai':{star:'shengqi',title:'生氣＋禍害',ex:'146、417、671、764',problem:'好心惹口舌、朋友變小人、背後遭詆毀。',meaning:'對朋友熱心，但最後常常吃力不討好，容易因為言語交流引發朋友之間的誤會與中傷，引來一堆是非。'},
  'shengqi|liusha':{star:'shengqi',title:'生氣＋六煞',ex:'147、416、674、761',problem:'沉溺社交玩樂、因人情引發爛桃花、人際內耗。',meaning:'過於隨性、愛交際，導致把時間精力耗費在無意義的情感周旋與異性曖昧上，缺乏上進心與目標感。'},
  'fuwei|jueming':{star:'fuwei',title:'伏位＋絕命',ex:'112、221、884、996',problem:'優豫之後做出最衝動的錯誤決策、暗藏官非。',meaning:'前面一直不敢動，拖到最後失去理智，孤注一撲而全盤崩潰；健康上容易有突然引發的意外傷害。'},
  'fuwei|wugui':{star:'fuwei',title:'伏位＋五鬼',ex:'118、224、881、997',problem:'思慮過度引發失眠、突發暗疾、暗盤操作暴雷。',meaning:'內心長久處於猜疑與不安中，表面不動聲色但暗地裡動歪心思，最終招致突發性損失或慢性精神疾病。'},
  'fuwei|huohai':{star:'fuwei',title:'伏位＋禍害',ex:'117、223、889、998',problem:'壓抑不滿最後爆發大吵、頑固慢性病。',meaning:'平時隱忍不言，累積到一定程度就會爆發極嚴重的口舌爭端；身體上的小毛病因拖延而演變成難以根治的問題。'},
  'fuwei|liusha':{star:'fuwei',title:'伏位＋六煞',ex:'116、229、883、992',problem:'長期抑鬱內耗、感情拖泥帶水、隱私外洩。',meaning:'性格過於被動膽怯，容易在一段不健康的情感關係中深陷泥潭無法自拔，情緒長期鬱悶。'}
 };
 function kindNow(){return window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');}
 function digitsNow(){
  var kind=kindNow();
  try{
   if(kind==='birth'){var iso=document.getElementById('birthInput').value;var m=birthCode(iso);return m?m.code:'';}
   if(kind==='plate')return plateToDigits(document.getElementById('numInput').value.trim());
   var raw=document.getElementById('numInput').value.trim();
   if(typeof expandLetters==='function') raw=expandLetters(raw);
   return (typeof extractDigits==='function')?extractDigits(raw):(raw.match(/\d/g)||[]).join('');
  }catch(e){return '';}
 }
 function norm(t){return (t||'').replace(/＋/g,'+').replace(/\s+/g,'');}
 function scanSeq(digits){
  var map={},order=[];
  if(!digits||typeof PAIR_MAP==='undefined')return [];
  for(var i=0;i<=digits.length-3;i++){
   var tri=digits.substr(i,3);
   var a=PAIR_MAP[tri.substr(0,2)];
   var b=PAIR_MAP[tri.substr(1,2)];
   if(!a||!b)continue;
   if(JI.indexOf(a)<0||XIONG.indexOf(b)<0)continue;
   var key=a+'|'+b;
   if(!SEQ[key])continue;
   if(!map[key]){map[key]={hits:[]};order.push(key);}
   if(map[key].hits.indexOf(tri)<0)map[key].hits.push(tri);
  }
  return order.map(function(k){return {key:k,def:SEQ[k],hits:map[k].hits};});
 }
 function explain(rows){
  if(!rows.length)return '';
  var h='<div class="seq-note">';
  h+='<p><strong>流通筆記：吉星後接凶星</strong>（詳細原版；與課堂「大凶／次凶」分列）</p>';
  var last='';
  rows.forEach(function(row){
   var g=GROUP[row.def.star];
   if(g&&row.def.star!==last){
    h+='<p class="seq-group"><strong>'+g.head+'</strong></p>';
    h+='<p>'+g.intro+'</p>';
    last=row.def.star;
   }
   h+='<p><strong>'+row.def.title+'</strong>　命中：'+row.hits.join('、')+'　書例：'+row.def.ex+'</p>';
   h+='<p>批斷問題：'+row.def.problem+'</p>';
   h+='<p>愛德華原義：'+row.def.meaning+'</p>';
  });
  h+='<p class="muted">此表只計「吉星在前、凶星在後」的連續三碼。前後對調不套用本表。</p>';
  h+='</div>';
  return h;
 }
 function tidyHits(sum){
  if(!sum)return null;
  var p=null;
  [].slice.call(sum.querySelectorAll('p')).forEach(function(el){
   if((el.textContent||'').indexOf('本次觸發')>=0)p=el;
  });
  if(!p)return null;
  var seen={};
  [].slice.call(p.querySelectorAll('.hit')).forEach(function(sp){
   var k=norm(sp.textContent);
   if(!k)return;
   if(seen[k]){if(sp.parentNode)sp.parentNode.removeChild(sp);}
   else seen[k]=sp;
  });
  return p;
 }
 function addHits(sum,rows){
  if(!sum||!rows.length)return;
  var p=tidyHits(sum);
  if(!p){
   p=document.createElement('p');
   p.innerHTML='本次觸發：';
   sum.appendChild(p);
  }
  var have=norm(p.textContent||'');
  if(have.indexOf('吉星後接凶星')<0){
   var s=document.createElement('span');
   s.className='hit hit-seq';
   s.textContent='吉星後接凶星';
   p.appendChild(s);
  }else{
   [].slice.call(p.querySelectorAll('.hit')).forEach(function(sp){
    if(norm(sp.textContent)==='吉星後接凶星')sp.className='hit hit-seq';
   });
  }
 }
 function run(){
  var kind=kindNow();
  var digits=digitsNow();
  var box=document.getElementById('kindReadBox');
  if(!box)return;
  var old=box.querySelector('.seq-note');
  if(old&&old.parentNode){
   var wrapOld=old.closest?old.closest('.hm-seq-explain'):old.parentNode;
   if(wrapOld&&wrapOld.className&&String(wrapOld.className).indexOf('hm-seq-explain')>=0)wrapOld.parentNode.removeChild(wrapOld);
   else old.parentNode.removeChild(old);
  }
  if(kind!=='phone'||!digits)return;
  var rows=scanSeq(digits);
  var sum=box.querySelector('#hmSum');
  tidyHits(sum);
  if(!rows.length)return;
  addHits(sum,rows);
  var wrap=document.createElement('div');
  wrap.className='hm-seq-explain';
  wrap.innerHTML=explain(rows);
  if(sum&&sum.nextSibling)box.insertBefore(wrap,sum.nextSibling);
  else if(sum)box.appendChild(wrap);
  else box.insertBefore(wrap,box.firstChild);
 }
 var tries=0;
 function wrapFn(){
  var impl=window.analyze;
  if(!impl){if(tries++<60)setTimeout(wrapFn,80);return;}
  if(impl.__seqWrapped)return;
  var wrapped=function(){impl();setTimeout(run,420);};
  wrapped.__seqWrapped=true;
  wrapped.__gapWrapped=impl.__gapWrapped;
  wrapped.__uxWrapped=impl.__uxWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrapFn,0);});
 else setTimeout(wrapFn,0);
})();
