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
const JOB_TABLE={fuwei:'適合經營小本生意，小販，小攮',shengqi:'適合從事服務行業，飲食行業',tianyi:'財運好，適合任何行業，尤其保險、金融或以口為業',yannian:'智商好，思想正統，組織紀律勝強，適合上班族或領導工作',wugui:'非正常職業，運動員，宗教，命理，餐飲酒店飯館茶館，娛樂，別人休息自己忙',liusha:'不喜歡固定職業；飲食、美髮、化妝品、以女性為服務、娛樂、公關、政府官員',huohai:'口才好，以口為業：律師，教師，記者，歌手，演講家，銷售',jueming:'冒險、風險大、賭博、投機；也可經營大型公司、大門面生意'};
const PAIR_JOB={'14':'14比較多的，適合從事開發工作','67':'67比較多的，容易從事設計工作','93':'93比較多的，容易從事廣告行業','82':'82比較多的，易從事營銷行業','11':'11，22 從事長期確定工作','22':'11，22 從事長期確定工作','88':'99，88 從事行政管理工作','99':'99，88 從事行政管理工作','66':'66，77 從事用研究分析工作','77':'66，77 從事用研究分析工作','33':'33，44 從事固定單一工作','44':'33，44 從事固定單一工作'};
function pairJobNotes(digits){var seen={},out=[],i,p,c;Object.keys(PAIR_JOB).forEach(function(p){c=0;i=0;while((i=digits.indexOf(p,i))>=0){c++;i++;}if(c>=1&&!seen[PAIR_JOB[p]]){seen[PAIR_JOB[p]]=1;out.push(PAIR_JOB[p]+(c>=2?'（出現'+c+'次）':''));}});return out;}
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
