function buildPairs(digits,kind){if(kind==='birth'||kind==='plate'){var out=[];for(var i=0;i<digits.length-1;i++){var pair=digits.charAt(i)+digits.charAt(i+1);var key=PAIR_MAP[pair];var field=key||'fuwei';var note=key?'':(pair.indexOf('0')>=0?'含0當伏位':'非標準當伏位');if(field==='fuwei'&&out.length){field=out[out.length-1].field;note+=(note?'；':'')+'伏位延續「'+FIELDS[field].name+'」';}out.push({pair:pair,display:pair,field:field,note:note});}return out;}
var source=digits,core=[],pending='';
for(var i=0;i<source.length;i++){var ch=source.charAt(i);if(ch==='0'||(kind==='phone'&&ch==='5'))pending+=ch;else{core.push({d:ch,bridge:pending});pending='';}}
var trailing=pending,out=[];
for(var j=1;j<core.length;j++){var a=core[j-1].d,b=core[j].d,bridge=core[j].bridge;var pair=a+b,key=PAIR_MAP[pair];if(!key)continue;var note='';if(kind==='phone'&&bridge.indexOf('5')>=0)note='夾5顯性';if(bridge.indexOf('0')>=0)note+=(note?'；':'')+'夾0隱性弱化';if(key==='fuwei'&&out.length){key=out[out.length-1].field;note+=(note?'；':'')+'伏位延續「'+FIELDS[key].name+'」';}out.push({pair:pair,display:a+bridge+b,field:key,note:note});}
if(out.length&&trailing&&trailing.indexOf('0')>=0){out[out.length-1].display+=trailing;out[out.length-1].note=(out[out.length-1].note||'')+'；尾0放大';}
return out;}
var BODY_POS=['腿腳','腰腹','腸胃','胸腔','腦袋'];
var PALACE_POS=[{name:'子女宮',effect:'下屬或孩子不聽話，或孩子身體差'},{name:'夫妻宮',effect:'夫妻宮空：感情不好、兩地分離，或對方身體不好'},{name:'自己宮',effect:'自己付出多都沒有收穫'},{name:'兄弟朋友宮',effect:'人際不佳，遇事外力無助'},{name:'父母宮',effect:'與父母感情不好，或父母身體欠佳／離世'}];
function checkPhoneZeros(digits){var last5=digits.slice(-5),hits=[];for(var i=0;i<last5.length;i++){if(last5.charAt(i)==='0'){var fromEnd=last5.length-1-i;if(fromEnd<5)hits.push({pos:fromEnd+1,body:BODY_POS[fromEnd],palace:PALACE_POS[fromEnd].name,effect:PALACE_POS[fromEnd].effect});}}return hits;}
function hasSeq(digits,list){return list.filter(function(x){return digits.indexOf(x)>=0;});}
function adjacentHas(pairs,a,b){for(var i=1;i<pairs.length;i++){if((pairs[i-1].field===a&&pairs[i].field===b)||(pairs[i-1].field===b&&pairs[i].field===a))return true;}return false;}
function presentKeys(pairs){var s={},a=[];pairs.forEach(function(p){if(!s[p.field]){s[p.field]=1;a.push(p.field);}});return a;}
function phoneTextbook(digits,pairs){
 var warns=[],last4=digits.slice(-4),last5=digits.slice(-5),last=pairs.length?pairs[pairs.length-1]:null;
 var counts={};pairs.forEach(function(p){counts[p.field]=(counts[p.field]||0)+1;});
 if(last5.indexOf('0')>=0)warns.push({lv:'bad',t:'教材：手機號碼後面五位絕對不能有0'});
 if(last4.indexOf('0')>=0)warns.push({lv:'bad',t:'絕對定律：最後4個位不可以為0'});
 for(var i=0;i<last4.length-1;i++){var pp=last4.charAt(i)+last4.charAt(i+1);var fk=PAIR_MAP[pp];if(fk&&FIELDS[fk].pol==='凶'){warns.push({lv:'bad',t:'絕對定律：最後4個位絕對不可以是凶星（'+pp+' '+FIELDS[fk].name+'）'});break;}}
 var zeroCount=(digits.match(/0/g)||[]).length;
if(zeroCount>=2)warns.push({lv:'warn',t:'教材：手機號碼多個2個0（出現兩個或以上的0），成為別人踏腳石；付出與收入不成正比'});
 if(!counts.tianyi)warns.push({lv:'warn',t:'號碼沒有天醫：財運不理想，賺錢辛苦，婚姻不和諧'});
 if(!counts.shengqi||!counts.tianyi)warns.push({lv:'warn',t:'沒有生氣和天醫：缺乏貴人運，凡事靠自己'});
 if(counts.tianyi>=3)warns.push({lv:'bad',t:'絕對定律：天醫太多，容易引發心臟、血管問題'});
 if((counts.wugui&&counts.jueming)||hasSeq(digits,['218','812']).length)warns.push({lv:'bad',t:'五鬼+絕命（如218、812）：容易身體差、絕症'});
 if(digits.slice(-1)==='0')warns.push({lv:'warn',t:'教材：手機號碼不能以0結尾，結局一場空；尾數是0留不住錢財'});
 if(last&&last.field==='wugui')warns.push({lv:'bad',t:'教材：手機號碼不能以五鬼結尾，損財富，出意外'});
 if(last&&last.field==='liusha')warns.push({lv:'bad',t:'教材：手機號碼不能以六煞結尾，損財富，傷婚姻'});
 if(last&&last.field==='huohai')warns.push({lv:'bad',t:'教材：手機號碼不能以禍害結尾，招小人，傷身體'});
 if(last&&last.field==='jueming')warns.push({lv:'bad',t:'教材：手機號碼不能以絕命結尾，損財富，出意外'});
 if(last&&last.field!=='yannian')warns.push({lv:'warn',t:'教材：凡不是以延年結尾，都花錢太快、存不住錢'});
 var badN=(counts.huohai||0)+(counts.liusha||0)+(counts.wugui||0)+(counts.jueming||0);
 if(badN>=2)warns.push({lv:'warn',t:'教材：四大凶星太多，出錢更厲害'});
 if(last&&last.field==='shengqi')warns.push({lv:'warn',t:'教材：手機尾號有生氣，容易受騙'});
 if(adjacentHas(pairs,'tianyi','wugui'))warns.push({lv:'bad',t:'教材大凶：天醫+五鬼'});
 if(adjacentHas(pairs,'wugui','jueming'))warns.push({lv:'bad',t:'教材大凶：五鬼+絕命'});
 if(adjacentHas(pairs,'yannian','liusha'))warns.push({lv:'bad',t:'教材次凶：延年+六煞'});
 if(adjacentHas(pairs,'yannian','wugui'))warns.push({lv:'bad',t:'教材次凶：延年+五鬼'});
 if(adjacentHas(pairs,'tianyi','liusha'))warns.push({lv:'bad',t:'教材次凶：天醫+六煞'});
 if(adjacentHas(pairs,'wugui','liusha'))warns.push({lv:'bad',t:'教材：五鬼+六煞（離婚、單身）'});
 var hit=hasSeq(digits,['103','301']);if(hit.length)warns.push({lv:'warn',t:'教材：'+hit.join('、')+' 可能有地下情，資金被套住'});
 var liusha5=hasSeq(digits,['156','457','358','259']);
 if(liusha5.length)warns.push({lv:'warn',t:'教材感情：六煞中有5（'+liusha5.join('、')+'）——桃花特別旺，有人主動喜歡或機會多，可轉成有效結果、不容易被人知道；亦可能追求者多／多段感情／一腳踏兩船，自身桃花容易被配偶或另一半知道；喜歡主動展示魅力，釋放曖昧氣質或感情持續甜蜜'});
 else if(hasSeq(digits,['16','47','38','29']).length)warns.push({lv:'warn',t:'教材感情：六煞（16、47、38、29）代表爛桃花'});
 if(currentProfile==='female'){
  var bans=FEMALE_BAN.filter(function(x){return digits.indexOf(x)>=0;});
  if(bans.length)warns.push({lv:'bad',t:'教材女性絕對不能用：'+bans.join('、')});
  hit=hasSeq(digits,['2108','1082','8102','2018']);if(hit.length)warns.push({lv:'bad',t:'教材女性：五鬼+絕命 '+hit.join('、')+'，易滑胎流產'});
  hit=hasSeq(digits,['817','971']);if(hit.length)warns.push({lv:'bad',t:'教材女性：五鬼+禍害 '+hit.join('、')});
  hit=hasSeq(digits,['871','917']);if(hit.length)warns.push({lv:'warn',t:'教材女性：延年+禍害 '+hit.join('、')+'，貧血氣血虛痛經'});
  if(digits.indexOf('612')>=0)warns.push({lv:'warn',t:'教材女性：六煞+絕命 612，婦科病嚴重'});
  if(digits.indexOf('691')>=0)warns.push({lv:'warn',t:'教材女性：絕命+延年 691，宮寒體質'});
  if(digits.indexOf('4058')>=0)warns.push({lv:'warn',t:'教材女性：4058 子宮切除打胎流產'});
 }
 if(currentProfile==='elder'){
  if(counts.tianyi>=2)warns.push({lv:'bad',t:'教材老年人：不適用天醫太多的號碼（富貴病、心腦血管）'});
  warns.push({lv:'warn',t:'教材老年人：適用生氣+延年，但不宜太大，二至三級磁場最佳'});
  if(digits.indexOf('819')>=0||adjacentHas(pairs,'wugui','yannian'))warns.push({lv:'bad',t:'教材老年人：五鬼+延年（如819）容易突發腦梗'});
 }
 if(currentProfile==='student'){
  hit=hasSeq(digits,['341914','678','934','826']);if(hit.length)warns.push({lv:'ok',t:'教材學生可用生氣+延年：'+hit.join('、')});
  if(counts.tianyi>=2||counts.liusha||counts.jueming)warns.push({lv:'warn',t:'教材學生：大天醫、六煞、絕命不利學業'});
 }
 if(currentProfile==='male'){
  hit=hasSeq(digits,['912','917']);if(hit.length)warns.push({lv:'warn',t:'教材男性：延年+絕命／延年+禍害 '+hit.join('、')+'，腎功能不好'});
  if(digits.indexOf('199')>=0)warns.push({lv:'warn',t:'教材男性：199 大延年，地中海或禿頂組合'});
  if(digits.indexOf('298')>=0)warns.push({lv:'warn',t:'教材男性：六煞+禍害 298，前列腺有問題'});
  hit=hasSeq(digits,['609','102']);if(hit.length)warns.push({lv:'warn',t:'教材男性：絕命夾0 '+hit.join('、')+'，腎結石組合'});
 }
 return warns;
}
function kindReadHtml(kind,pairs,digits){
 var keys=presentKeys(pairs),last=pairs.length?pairs[pairs.length-1]:null,html='';
 if(kind==='phone'){
  html+='<p><strong>教材「分析手機號碼」次序</strong></p><ol class="tight" style="margin-left:18px"><li>先看<strong>天醫</strong>：婚姻——為什麼結婚，感情如何？財運——錢從哪裡來，錢從哪裡去？</li><li>再看<strong>延年</strong>：事業工作——做什麼工作，工作的態度？專業技能——能力來自什麼，能力的態度？</li><li>再看<strong>絕命</strong>：錢從哪裡來，錢做哪裡去？</li></ol>';
  html+='<p>教材：後4位決定80%運勢。呢組尾段係「'+(last?FIELDS[last.field].name:'—')+'」。</p>';
  if(keys.indexOf('tianyi')>=0)html+='<p><strong>天醫（婚姻／財運）：</strong>'+FIELDS.tianyi.love+' '+FIELDS.tianyi.wealth+'</p>';
  else html+='<p>冇天醫：教材話財運不理想，賺錢辛苦，婚姻不和諧。</p>';
  if(keys.indexOf('yannian')>=0)html+='<p><strong>延年（事業／專業）：</strong>'+FIELDS.yannian.job+'</p>';
  if(keys.indexOf('jueming')>=0)html+='<p><strong>絕命（錢來去）：</strong>'+FIELDS.jueming.wealth+'</p>';
  html+='<p>教材結尾六條：不能以0結尾（結局一場空）；不能以五鬼結尾（損財富，出意外）；不能以六煞結尾（損財富，傷婚姻）；不能以禍害結尾（招小人，傷身體）；不能以絕命結尾（損財富，出意外）。</p>';
 }else if(kind==='plate'){
  html+='<p><strong>教材「車牌」專頁</strong>——睇開車、出行、車上人事同安危，唔係用來睇事業發達。</p>';
  keys.forEach(function(k){if(PLATE_TXT[k])html+='<p><strong>'+FIELDS[k].name+'：</strong>'+PLATE_TXT[k]+'</p>';});
  if(!keys.filter(function(k){return PLATE_TXT[k];}).length)html+='<p>呢組未見教材車牌四凶專條。吉星收尾，出行相對穩陣，但仍要跟實際駕駛。</p>';
  if(adjacentHas(pairs,'wugui','liusha')|| (keys.indexOf('wugui')>=0&&keys.indexOf('liusha')>=0))html+='<div class="hl-warn">教材：鬼+煞——車禍，容易撞車</div>';
  if(adjacentHas(pairs,'wugui','huohai')|| (keys.indexOf('wugui')>=0&&keys.indexOf('huohai')>=0))html+='<div class="hl-warn">教材：鬼+禍——車上吵架，下車就沒事了。鬼+害——車上有夫妻的會吵架（不用誰在前誰在後，只要這種組合）</div>';
  if(adjacentHas(pairs,'wugui','jueming')|| (keys.indexOf('wugui')>=0&&keys.indexOf('jueming')>=0))html+='<div class="hl-warn">教材：鬼+絕——自撞，開快車</div>';
 }else if(kind==='account'){
  html+='<p><strong>教材「銀行卡」專頁</strong>——睇錢點入、點出、守唔守得住。</p>';
  keys.forEach(function(k){if(BANK_TXT[k])html+='<p><strong>'+FIELDS[k].name+'：</strong>'+BANK_TXT[k]+'</p>';});
  if(keys.indexOf('wugui')>=0&&keys.indexOf('liusha')>=0)html+='<div class="hl-warn">教材：五鬼+六煞——大破財</div>';
  if(keys.indexOf('wugui')>=0&&keys.indexOf('jueming')>=0)html+='<div class="hl-warn">教材：五鬼+絕命——大進大出</div>';
  html+='<p>教材「不好的銀行咋密碼結尾」：四大凶星；凶星+生氣；0或05結尾。</p>';
  if(digits&&(/[0]$/.test(digits)||/05$/.test(digits)))html+='<div class="hl-warn">呢組尾係0或05，教材列作不好的銀行結尾。</div>';
  if(last&&last.field!=='yannian')html+='<p>教材守財：凡不是以延年結尾，都花錢太快、存不住錢。</p>';
 }else if(kind==='address'){
  html+='<p><strong>門牌／家宅</strong>——教材用磁場睇住屋氣場同家人健康，唔係睇開車或者手機尾段定律。</p>';
  keys.forEach(function(k){html+='<p><strong>'+FIELDS[k].name+' · 健康：</strong>'+HEALTH_TABLE[k]+'</p><p>'+FIELDS[k].name+' · 感情／人事：'+LOVE_TABLE[k]+'</p>';});
 }else if(kind==='id'){
  html+='<p><strong>身份證＝流年</strong>。0–13歲第一段，之後每5年至98歲，行完再由頭。證件改唔到，凶段用電話尾段蓋。</p>';
  keys.forEach(function(k){html+='<p><strong>'+FIELDS[k].name+'段會見到：</strong>事業「'+JOB_TABLE[k]+'」；感情「'+LOVE_TABLE[k]+'」；健康「'+HEALTH_TABLE[k]+'」。</p>';});
 }else if(kind==='birth'){
  html+='<p><strong>出生年月日＝先天命格</strong>，出世就定，一世唔改。呢度講底子，唔好當改號建議。</p>';
  keys.forEach(function(k){var f=FIELDS[k];html+='<p><strong>'+f.name+'：</strong>'+f.job+' '+f.wealth+' '+f.love+'</p>';});
 }else{
  html+='<p><strong>其他數字</strong>——輸入咩就計咩。跟八星講事業、感情、健康同錢財，唔套用手機後五位0或者車牌交通專條。</p>';
  keys.forEach(function(k){html+='<p><strong>'+FIELDS[k].name+'</strong>｜事業：'+JOB_TABLE[k]+'｜感情：'+LOVE_TABLE[k]+'｜健康：'+HEALTH_TABLE[k]+'｜錢財：'+FIELDS[k].wealth+'</p>';});
 }
 return html;
}
