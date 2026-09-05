const FIELDS={
tianyi:{name:'天醫',pol:'吉',rank:'大吉星',pairs:['13','31','68','86','49','94','27','72'],short:'正財路、貴人、正桃花',
pros:['聰明','睿智','善解人意','心胸開闊','學習能力強','喜歡幫助人'],
cons:['善良','單純','沒心機','沒主見','容易被騙'],
job:'能成就一番大事業，成為老闆或老闆的得力助手，總能帶來連續不斷的財富與業績，在任何行業都能做出不錯的成績。教材事業表：所有行業，成大事，業績好。',
wealth:'正財、偏財、橫財、八方財運，但不會守財，花錢比較大方。',
love:'正桃花，正姻緣，婚姻美滿，女性旺夫。教材感情表：正桃花，正婚姻。',
health:'容易引發血壓、血液循環、及眼耳鼻方面的疾病。教材健康表：血壓，血液循環，腦，皮膚。',
note:'教材：天醫太多，容易引發心臟、血管問題。老年人唔宜天醫太多（富貴病、心腦血管）。'},
shengqi:{name:'生氣',pol:'吉',rank:'大吉星',pairs:['14','41','67','76','39','93','28','82'],short:'貴人多、人緣好、逢凶化吉',
pros:['貴人多','樂天派','思維活躍','看得開','隨緣','溝通能力強','願意接受新事物'],
cons:['企圖心不強','懶散拖延','沒主見','缺乏上進心','容易滿足','三分鐘熱度','容易相信別人而受騙'],
job:'貴人多，逢凶化吉；特別適合做公關、銷售業務及服務業，但容易滿足，對事不強求，導致上進心不足。教材事業表：服務，公關。',
wealth:'貴人來財，升官顯貴，意外之財（中彩、投資等財運）；不善理財（錢花在朋友身上）。',
love:'隨緣，不強求。若已婚，非常和諧，溝通協調，婚姻甜蜜。教材感情表：樂觀，和諧。',
health:'容易有眼耳鼻五官系統疾病或腸胃疾病，容易肥胖。',
note:'教材：手機尾號有生氣，容易受騙。'},
yannian:{name:'延年',pol:'吉',rank:'小吉星',pairs:['19','91','78','87','34','43','26','62'],short:'領導、守財、專一',
pros:['領導','領袖格局','責任心強','自主','有分寸','懂守財','懂得經營運營'],
cons:['自作主張','不易聽勸','閒不住','忙碌','反抗','固執','死板','不圓滑'],
job:'工作能力強，專業能力強，專注，容易成為領導或自己開公司，忙碌奔波，也適合做專業技術類工作。教材事業表：領導，決策，專業能力。',
wealth:'靠自己的辛苦努力付出獲得錢財，懂得理財，生財有道，喜歡精打細算，有「鐵公雞」的稱號。',
love:'善於處理關係，厚道，固執，專一，高期待，高標準，對感情要求忠誠，一旦出軌，絕對沒有挽回的餘地。教材感情表：專一，主導。',
health:'積勞成疾，壓力大，容易引發肩頸腰病痛、睡眠不好，脫髮掉髮或神經及心臟系統方面的疾病。教材健康表：心臟，肩頸，四肢關節，精神系統，失眠。',
note:'教材：大延年19／91至陽至剛，女性一定不能使用。凡不是以延年結尾，都花錢太快、存不住錢。'},
fuwei:{name:'伏位',pol:'平',rank:'依附',pairs:['11','22','33','44','66','77','88','99'],short:'跟前面嗰粒星，隨吉則吉隨凶則凶',
pros:['教材：號碼中能量高低起伏越大，能量就越強和越活躍，起到的效果也越好和越快'],
cons:['被動，平淡（教材感情表）'],
job:'教材事業表：按部就班，打工。永遠跟前面一粒星。',
wealth:'跟前面嗰粒星。銀行卡教材：持平。',
love:'教材感情表：被動，平淡。',
health:'教材健康表：心臟，腦部，慢性病，失眠，頭部。',
note:'教材伏位頁：人生經歷一些曲折並非壞事，過程越是曲折，越是坎埪，前進的速度就越快，彈性就越足。化解：生氣／天醫／延年。'},
huohai:{name:'禍害',pol:'凶',rank:'小凶星',pairs:['17','71','89','98','46','64','23','32'],short:'口舌是非、開刀意外',
pros:['教材未見獨立優缺點大頁；事業表：以口為業'],
cons:['教材感情：吵架，離婚'],
job:'教材事業表：以口為業，老師，飲食，娛樂。',
wealth:'銀行卡教材：因衝動，情緒花錢。',
love:'教材感情表：吵架，離婚。',
health:'教材健康表：氣管，呼吸，口腔，淋巴，體質差。',
note:'車牌教材：與人不和，衝動，吵架。化解：生氣。高能量禍害17、89主口舌爭執。'},
liusha:{name:'六煞',pol:'凶',rank:'小凶星',pairs:['16','61','47','74','38','83','29','92'],short:'偏桃花、情緒、破財',
pros:['教材未見獨立優缺點大頁；事業表：服務業'],
cons:['教材感情：偏桃花，外遇'],
job:'教材事業表：服務業，女性行業，店舖。',
wealth:'銀行卡教材：因感情問題漏財，花在異性、家人。',
love:'教材：六煞（16、47、38、29）代表爛桃花。教材感情表：偏桃花，外遇。流年遇鬼會離婚。五鬼+六煞：100%會離婚，單身。六煞中有5（156、457、358、259）：桃花特別旺，有人主動喜歡，或遇到機會多，主動把桃花也轉化成有效的結果，不容易被人知道；追求者多或者有多段感情，自身桃花容易被配偶知道，或者有兩段感情，同時一腳踏兩船，容易被另一半知道；喜歡主動展示自己的魅力，釋放曖昧的氣質或感情持續甜蜜。',
health:'教材健康表：腸胃，皮膚，精神病。',
note:'車牌教材：與另一半或親密友人不和。化解：延年。'},
wugui:{name:'五鬼',pol:'凶',rank:'大凶星',pairs:['18','81','79','97','36','63','24','42'],short:'起落快、血光、婚姻差',
pros:['教材事業表：策劃，宗教，偏門，創新'],
cons:['教材感情：外遇，離婚；多鬼95%婚姻不好'],
job:'教材事業表：策劃，宗教，偏門，創新，時間長。',
wealth:'銀行卡教材：破財。五鬼+六煞：大破財。五鬼+絕命：大進大出。',
love:'教材感情表：外遇，離婚。流年遇煞會離婚。',
health:'教材五鬼專頁：心臟病，血光之災，突發隱性疾病，尤其要注意血液循環系統疾病。若是高能量的五鬼+絕命數字：極容易引發癌症。健康方面多是突發性無先兆的隱形疾病，一旦發作起來都不只是一般的小毛病。請特別注意五鬼磁場所產生的病狀，都會是突發性的。心臟病絕對是五鬼磁場的代名詞。健康表：心臟，血光，女性婦科，男性心肺。',
note:'車牌教材：血光之災，破財；愛亂鑽，易被划花，被偷。化解：生氣+天醫+延年或延年。'},
jueming:{name:'絕命',pol:'凶',rank:'大凶星',pairs:['12','21','69','96','48','84','37','73'],short:'大上大落、易負債',
pros:['頭腦反應快','有才華','毅力驚人','善良豪爽','講義氣','善於謀略','拼命積極','有超強企劃能力和判斷力'],
cons:['衝動','情緒難控','易暴躁','極端自我','性格偏激','容易被騙','賭性較強','容易有官司'],
job:'策劃能力強，有軍師特質，敢冒險，適合自己創業或當企業老大，做投資、股票、金融理財等工作。教材事業表：金融，投資。',
wealth:'愛投資，辦企業、開公司、買固定資産（如房、車）等；賺錢不難，但也開銷大、錢財來得快去得也快，容易有固定資産但缺現金、容易負債，不會守財，易破財。教材：絕命無制約：投資易虧本，易負債。銀行卡：因投資漏財。',
love:'難有結果，易分手，家庭協調性差，愛恨分明，易離婚，容易一拍兩散，想法極端（閃婚，閃離），有時重視朋友甚於親人。教材感情表：激情，離婚。',
health:'容易出現肝腎膽問題，糖尿病，膀胱、泌尿系統及生殖器官方面的疾病，年輕人則視力不好，或性功能障礙。教材健康表：肝，膽，腎，糖尿病，泌尿系統。',
note:'絕命連號：官司牢獄。絕命夾0如609、102屬腎結石組合。化解：天醫。'}
};
const PAIR_MAP={};Object.keys(FIELDS).forEach(function(k){FIELDS[k].pairs.forEach(function(p){PAIR_MAP[p]=k;});});
const KIND_INFO={
phone:{tag:'後天分身',text:'影響而家運勢。教材：手機號碼重前更重後，後4位決定80%運勢。',ph:'例如 98764321'},
id:{tag:'流年運程',text:'第一段0–13歲，之後每5年一段，星序行完再由頭再行，直至98歲。證件本身唔能改。',ph:'例如 A123456(7)'},
birth:{tag:'先天命格',text:'出世就定，只講底子，唔用嚟改號。缺星用電話補。',ph:''},
plate:{tag:'交通磁場',text:'教材用車牌睇開車、出行同路上安危。英文字母一齊計（A=01…Z=26）。車牌唔計0。',ph:'例如 AB1234'},
address:{tag:'家宅磁場',text:'門牌睇家宅、家人健康、居住氣場。字母同樣轉換。',ph:'例如 8A'},
account:{tag:'財運磁場',text:'帳號睇財富進出同守財。跟教材「銀行卡」專頁。',ph:'例如 0123456789'},
other:{tag:'後天磁場',text:'輸入咩就計咩。英文字母一齊計（A=01…Z=26）。用八星事業／感情／健康去講呢組數字。',ph:'例如 AB88 或 VIP123'}
};
const FEMALE_BAN=['19','91','109','159','901','951','911','191','87','78','857','758','877','887','1559','9551','8557','7558'];
const JOB_TABLE={fuwei:'按部就班，打工',shengqi:'服務，公關',tianyi:'所有行業，成大事，業績好',yannian:'領導，決策，專業能力',wugui:'策劃，宗教，偏門，創新，時間長',liusha:'服務業，女性行業，店舖',huohai:'以口為業，老師，飲食，娛樂',jueming:'金融，投資'};
const LOVE_TABLE={fuwei:'被動，平淡',shengqi:'樂觀，和諧',tianyi:'正桃花，正婚姻',yannian:'專一，主導',wugui:'外遇，離婚',liusha:'偏桃花，外遇',huohai:'吵架，離婚',jueming:'激情，離婚'};
const HEALTH_TABLE={fuwei:'心臟，腦部，慢性病，失眠，頭部',shengqi:'腸胃，眼耳鼻',tianyi:'血壓，血液循環，腦，皮膚',yannian:'心臟，肩頸，四肢關節，精神系統，失眠',wugui:'心臟，血光，女性婦科，男性心肺',liusha:'腸胃，皮膚，精神病',huohai:'氣管，呼吸，口腔，淋巴，體質差',jueming:'肝，膽，腎，糖尿病，泌尿系統'};
const RESOLVE_MAP={jueming:'天醫',liusha:'延年',huohai:'生氣',wugui:'生氣+天醫+延年或延年',fuwei:'生氣／天醫／延年'};
const PLATE_TXT={wugui:'血光之災，破財；愛亂鑽，易被划花，被偷',liusha:'與另一半或親密友人不和',huohai:'與人不和，衝動，吵架',jueming:'開快車，意外'};
const BANK_TXT={fuwei:'持平',shengqi:'轉賬，轉入',tianyi:'帶財，享受，老闆，生意人',yannian:'員工，老闆，被動收入，工資卡',wugui:'破財',liusha:'因感情問題漏財，花在異性、家人',huohai:'因衝動，情緒花錢',jueming:'因投資漏財'};
let currentKind='phone',currentProfile='';
function setKindUI(kind){
 currentKind=kind;
 document.getElementById('kindHint').innerHTML='<span class="tag">'+KIND_INFO[kind].tag+'</span>'+KIND_INFO[kind].text;
 document.getElementById('inputText').style.display=kind==='birth'?'none':'block';
 document.getElementById('inputBirth').style.display=kind==='birth'?'block':'none';
 if(KIND_INFO[kind].ph)document.getElementById('numInput').placeholder=KIND_INFO[kind].ph;
 document.getElementById('profileWrap').style.display=kind==='phone'?'block':'none';
 if(kind!=='phone'){
  currentProfile='';
  document.querySelectorAll('#profilePills .pill').forEach(function(b){b.classList.remove('active');});
 }
}
function bindUI(){
 if(window.__hmBound)return; window.__hmBound=true;
 if(!window.hmPickTab){
  document.querySelectorAll('.tab').forEach(function(t){t.addEventListener('click',function(){document.querySelectorAll('.tab').forEach(function(x){x.classList.remove('active');});t.classList.add('active');document.querySelectorAll('.section').forEach(function(s){s.classList.remove('active');});document.getElementById('sec-'+t.getAttribute('data-sec')).classList.add('active');});});
  document.querySelectorAll('#kindPills .pill').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('#kindPills .pill').forEach(function(b){b.classList.remove('active');});btn.classList.add('active');setKindUI(btn.getAttribute('data-kind'));});});
  document.querySelectorAll('#profilePills .pill').forEach(function(btn){btn.addEventListener('click',function(){var on=btn.classList.contains('active');document.querySelectorAll('#profilePills .pill').forEach(function(b){b.classList.remove('active');});if(on){currentProfile='';window.currentProfile='';}else{btn.classList.add('active');currentProfile=btn.getAttribute('data-profile');window.currentProfile=currentProfile;}});});
 }
 var ab=document.getElementById('analyzeBtn'); if(ab)ab.addEventListener('click',analyze);
 var cb=document.getElementById('clearBtn'); if(cb)cb.addEventListener('click',function(){document.getElementById('numInput').value='';document.getElementById('birthInput').value='';document.getElementById('results').style.display='none';});
 var ni=document.getElementById('numInput'); if(ni)ni.addEventListener('keydown',function(e){if(e.key==='Enter')analyze();});
}
function expandLetters(s){return s.replace(/[A-Za-z]/g,function(ch){return String(ch.toUpperCase().charCodeAt(0)-64).padStart(2,'0');});}
function plateToDigits(s){var out='';for(var i=0;i<s.length;i++){var ch=s.charAt(i);if(/[A-Za-z]/.test(ch))out+=String(ch.toUpperCase().charCodeAt(0)-64).padStart(2,'0');else if(/[1-9]/.test(ch))out+=ch;}return out;}
function extractDigits(s){return (s.match(/\d/g)||[]).join('');}
function birthCode(iso){if(!iso)return null;var p=iso.split('-');var y=+p[0],m=+p[1],d=+p[2];var base=y<=2000?1911:1971;var yearNum=y-base;var lm=m,ld=d,usedLunar=false,lunarText='';try{var fn=solarLunar&&(solarLunar.solar2lunar||(solarLunar.default&&solarLunar.default.solar2lunar));if(fn){var L=fn(y,m,d);if(L&&(L.lMonth||L.month)){lm=L.lMonth||L.month;ld=L.lDay||L.day;usedLunar=true;lunarText='農曆'+(L.isLeap||L.isLeapMonth?'閏':'')+lm+'月'+ld+'日';}}}catch(e){}
var code=String(yearNum)+String(lm)+String(ld).padStart(2,'0');
return {code:code,text:y+'年'+m+'月'+d+'日（新曆）→ '+(usedLunar?lunarText:'暫用新曆月日')+'；'+y+'−'+base+'='+yearNum+' + '+lm+String(ld).padStart(2,'0')+' → '+code};}
