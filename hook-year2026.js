(function(){
 var JUEMING={'12':1,'21':1,'69':1,'96':1,'48':1,'84':1,'37':1,'73':1};
 var WUGUI={'18':1,'81':1,'79':1,'97':1,'36':1,'63':1,'24':1,'42':1};
 var SENS={
  '21':'21：情緒＋關係衝突放大：容易煩躁、說話衝、得罪人、合作卡頓',
  '96':'96：壓制＋情緒＋突發事件：睡眠差，心火旺，壓力積累大。',
  '37':'37：激進＋衝動＋過度消耗：行動力強，但容易衝動投資。'
 };
 function digits(){
  var el=document.getElementById('numInput');
  return el?((el.value.match(/\d/g)||[]).join('')):'';
 }
 function paint(){
  if((window.currentKind||(typeof currentKind!=='undefined'?currentKind:''))!=='phone')return;
  var box=document.getElementById('kindReadBox');
  if(!box||box.querySelector('[data-y2026]'))return;
  var d=digits();
  if(!d||d.length<2)return;
  var tail=d.slice(-2);
  var zeroN=(d.match(/0/g)||[]).length;
  var parts=[];
  if(JUEMING[tail]){
   parts.push('<p><strong>第一：尾號絕命</strong>（12、21、69、96、48、84、37、73）</p>');
   parts.push('<p>2026 火旺年，絕命數組容易出現：情緒走低、容易煩躁；做事被打斷、計劃反覆；人際關係突然低谷；小事不斷、容易心累；睡眠、壓力問題明顯；做什麼都覺得「不順手」。</p>');
   parts.push('<p>尤其注意人際衝突與突發狀況。絕命在火年最怕被點燃，一點就炸。</p>');
  }
  var seen={},i,p,sens=[];
  for(i=0;i<d.length-1;i++){
   p=d.substr(i,2);
   if(SENS[p]&&!seen[p]){seen[p]=1;sens.push(SENS[p]);}
  }
  if(sens.length){
   parts.push('<p><strong>第二：2026 火年特別敏感的絕命組合</strong></p>');
   sens.forEach(function(s){parts.push('<p>'+s+'</p>');});
  }
  if(/0$/.test(d)||zeroN>=2){
   parts.push('<p><strong>第三：尾號 0 或號碼中 0 多於 1 個</strong></p>');
   parts.push('<p>「0」代表弱、虛、空、耗洩。火旺（丙午年）遇到號碼弱氣時：特別累、容易倦怠；睡眠不好；情緒容易受影響；做事提不起勁；事情拖延；想改變但力不從心。</p>');
   parts.push('<p>0 多的人在火年最需要調整號碼，否則整年都容易疲憊。</p>');
  }
  if(WUGUI[tail]){
   parts.push('<p><strong>第四：尾號五鬼</strong>（18、81、79、97、36、63、24、42）</p>');
   parts.push('<p>2026 火旺年，五鬼數組表現特別明顯：情緒起伏特別明顯；覺得「心裡急、身體跟不上」；人際誤會、衝突增加；家庭關係容易緊繃；做事不穩定、反覆；投資情緒波動大，容易衝動決策。</p>');
  }
  if(!parts.length)return;
  var h='<div class="hl-warn" data-y2026="1" style="margin-top:10px">';
  h+='<p><strong>筆記：2026 年必須警惕的手機號碼</strong>（丙午火旺年）</p>';
  box.insertAdjacentHTML('beforeend',h+parts.join('')+'</div>');
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__y2026)return;
  var w=function(){impl();setTimeout(paint,200);};
  w.__y2026=true;
  w.__pairRank=impl.__pairRank;
  w.__salesFix=impl.__salesFix;
  w.__copyWrapped=impl.__copyWrapped;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
