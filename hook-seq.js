(function(){
 var JI=['tianyi','yannian','shengqi','fuwei'];
 var XIONG=['jueming','wugui','huohai','liusha'];
 var SEQ={
  'tianyi|jueming':{title:'天醫＋絕命',problem:'瞬間虧空、盲目投資、感情一刀切。',meaning:'天醫賺到的資金，因絕命好賭、衝動與敢拼個性，投入高風險項目或輕信借貸，導致血本無歸；感情衝動破裂。'},
  'tianyi|wugui':{title:'天醫＋五鬼',problem:'錢財暗耗、突發破財、感情生變猜忌。',meaning:'財富非正常流失（突發開銷、私下投機暗耗）；感情易生私心、不信任、劈腿或第三者介入，防不勝防。'},
  'tianyi|huohai':{title:'天醫＋禍害',problem:'因財惹禍、有錢招小人、吃喝花光。',meaning:'賺錢後易燬耀、說話得罪人，資金多耗於應酬吃喝或生病醫療；感情口舌是非不斷。'},
  'tianyi|liusha':{title:'天醫＋六煞',problem:'偏桃花耗財、為情所困、家累破耗。',meaning:'資金流向不正當異性交往、外在過度包裝或家庭拖累；感情多愁善感、易惹爛桃花與三角糾紛。'},
  'yannian|jueming':{title:'延年＋絕命',problem:'過度自負暴敗、官非訴訟、衝動轉型。',meaning:'自恃能力強而獨斷專行，投資或擴張過於激進，引致訴訟官司或滿盤皆輸；脾氣暴躁。'},
  'yannian|wugui':{title:'延年＋五鬼',problem:'工作多變、事業暗藏危機、突發跳槽改行。',meaning:'具備才華但心思不定，對現有工作易生倦怠，喜走偏門或暗箱操作，最終成果破散；易引發心腦血管問題。'},
  'yannian|huohai':{title:'延年＋禍害',problem:'鐵齒好辯惹小人、壓力成疾、抱怨連連。',meaning:'事業能力強但嘴硬不服輸，極易在職場得罪人或遭屬下背叛；長期超負荷工作引發呼吸道及慢性病。'},
  'yannian|liusha':{title:'延年＋六煞',problem:'抗壓不足、情緒失控、私情拖葷事業。',meaning:'外強中乾，內心脆弱憂慮，事業決策易因家庭瑣事或感情問題牽制而優豫不決，錯失良機。'},
  'shengqi|jueming':{title:'生氣＋絕命',problem:'因友破財、仗義遭坑、盲目作保。',meaning:'過於講義氣、耳根軟，輕信朋友邀請投資或代為擔保，最終被朋友拖累背負債務或官非。'},
  'shengqi|wugui':{title:'生氣＋五鬼',problem:'交友不慎、遭人暗算、朋黨各懷鬼胎。',meaning:'身邊社交熱絡但多屬酒肉之交，關鍵時刻易被信任之人出賣、暗算或借款不還。'},
  'shengqi|huohai':{title:'生氣＋禍害',problem:'好心引口舌、貴人變小人、背後中傷。',meaning:'熱心待人卻吃力不討好，易因言語溝通引發朋友誤會與非議，惹來一身是非。'},
  'shengqi|liusha':{title:'生氣＋六煞',problem:'沉溺社交玩樂、人情爛桃花、失去鬥志。',meaning:'態度過於隨性，過多時間耗費於無益情感周旋與曖昧社交，精神內耗嚴重且不思進取。'},
  'fuwei|jueming':{title:'伏位＋絕命',problem:'優豫後孤注一撲、突發崩盤、隱藏官非。',meaning:'長期被動不敢行動，積累到極限時失去理智衝動下注，導致全盤皆輸；易引發突發意外之災。'},
  'fuwei|wugui':{title:'伏位＋五鬼',problem:'思慮過度失眠、暗疾突發、暗盤暴雷。',meaning:'長久隱忍多疑，表面不動聲色但私下動歪心思，最終招致突發性財務崩盤或精神官能症。'},
  'fuwei|huohai':{title:'伏位＋禍害',problem:'積怨爆發大吵、頑固慢性病發。',meaning:'平時隱忍不滿，積壓過深終至猛烈口舌爆發；健康上的小毛病因長期拖延轉為難以根治之重疾。'},
  'fuwei|liusha':{title:'伏位＋六煞',problem:'長期抑鬱內耗、感情拖泥帶水、隱私敗露。',meaning:'個性膽怯消極，在不良情感關係中深陷無法自拔，情緒長期鬱悶不展。'}
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
  return order.map(function(k){return {def:SEQ[k],hits:map[k].hits};});
 }
 function explain(rows){
  if(!rows.length)return '';
  var h='<div class="hl-warn seq-note">';
  h+='<p><strong>流通筆記：吉星後接凶星</strong>（前因後果斷語，與課堂「大凶／次凶」分列）</p>';
  rows.forEach(function(row){
   h+='<p><strong>'+row.def.title+'</strong>　命中：'+row.hits.join('、')+'</p>';
   h+='<p>斷語問題：'+row.def.problem+'</p>';
   h+='<p>原義解析：'+row.def.meaning+'</p>';
  });
  h+='<p class="muted">此表只計「吉星在前、凶星在後」的連續三碼。前後對調不套用本表。</p>';
  h+='</div>';
  return h;
 }
 function addHits(sum,rows){
  if(!sum||!rows.length)return;
  var p=null;
  [].slice.call(sum.querySelectorAll('p')).forEach(function(el){
   if((el.textContent||'').indexOf('本次觸發')>=0)p=el;
  });
  if(!p){
   p=document.createElement('p');
   p.innerHTML='本次觸發：';
   sum.appendChild(p);
  }
  var have=p.textContent||'';
  if(have.indexOf('吉星後接凶星')<0){
   var s=document.createElement('span');s.className='hit';s.textContent='吉星後接凶星';p.appendChild(s);
  }
  rows.forEach(function(row){
   if(have.indexOf(row.def.title)>=0)return;
   var s=document.createElement('span');s.className='hit';s.textContent=row.def.title;p.appendChild(s);
  });
 }
 function run(){
  var digits=digitsNow();
  var box=document.getElementById('kindReadBox');
  if(!box||!digits)return;
  var old=box.querySelector('.seq-note');
  if(old&&old.parentNode){
   var wrapOld=old.closest?old.closest('.hm-seq-explain'):old.parentNode;
   if(wrapOld&&wrapOld.className&&String(wrapOld.className).indexOf('hm-seq-explain')>=0)wrapOld.parentNode.removeChild(wrapOld);
   else old.parentNode.removeChild(old);
  }
  var rows=scanSeq(digits);
  if(!rows.length)return;
  var sum=box.querySelector('#hmSum');
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
