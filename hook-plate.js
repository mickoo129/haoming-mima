(function(){
 plateToDigits=function(s){
  var out='',i,ch;
  for(i=0;i<s.length;i++){
   ch=s.charAt(i);
   if(/[A-Za-z]/.test(ch))out+=String(ch.toUpperCase().charCodeAt(0)-64).padStart(2,'0');
   else if(/\d/.test(ch))out+=ch;
  }
  return out;
 };
 window.plateToDigits=plateToDigits;
 if(typeof KIND_INFO!=='undefined'&&KIND_INFO.plate){
  KIND_INFO.plate.text='課堂車牌筆記：0要解（會弱化前一組）；5自己唔成星、跟隔離喺粒。字母A=01…Z=26。用嚟睇開車同出行安危。';
 }
 var oldExtra=window.extraCourseNotes;
 function wrapExtra(digits,pairs,kind){
  var html=(typeof oldExtra==='function')?oldExtra(digits,pairs,kind):'';
  if(kind!=='plate'||!digits)return html;
  var sheng0=['140','410','670','760','390','930','280','820'];
  var hit=sheng0.filter(function(x){return digits.indexOf(x)>=0;});
  if(hit.length){
   html+='<div class="hl-warn"><strong>課堂車牌筆記</strong>：生氣後面為0（'+hit.join('、')+'）— 貴人越來越少，人際關係不長久，感情來得快去得快，感情友誼慢慢平淡，有重複被欺騙和傷害；貴人不給力，幫不上忙。</div>';
  }
  if(digits.indexOf('409')>=0){
   html+='<div class="hl-warn"><strong>課堂車牌筆記</strong>：409 — 資產被套或沒法變現。</div>';
  }
  if(digits.indexOf('0')>=0){
   html+='<div class="hl-warn"><strong>課堂車牌筆記</strong>：車牌見0 — 有隱藏地下情／隱藏婚姻，婚姻中易有第三者；男性易有婚外情，女性易被小三；亦易被朋友捅刀子、插足。</div>';
  }
  if(pairs&&pairs.length){
   var has={};
   pairs.forEach(function(p){has[p.field]=1;});
   if(has.shengqi&&has.tianyi&&has.yannian){
    html+='<div class="hl-resolve"><strong>課堂車牌筆記</strong>：有齊生氣、天醫、延年三個吉星。';
    var yn=pairs.filter(function(p){return p.field==='yannian';}).map(function(p){return p.pair;});
    if(yn.indexOf('19')>=0||yn.indexOf('91')>=0) html+='延年收到19／91，能量較43／34一類強。';
    html+='</div>';
   }
   var allTian=true;
   pairs.forEach(function(p){if(p.field!=='tianyi')allTian=false;});
   if(allTian){
    html+='<div class="nature"><strong>課堂車牌筆記</strong>：全程天醫（5／0跟前、唔另開星），冇生氣同延年磁場。</div>';
   }
  }
  return html;
 }
 extraCourseNotes=wrapExtra;
 window.extraCourseNotes=wrapExtra;
})();
