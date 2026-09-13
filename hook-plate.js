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
 if(typeof KIND_INFO!=='undefined'){
  if(KIND_INFO.plate) KIND_INFO.plate.text='課堂車牌筆記：拆法似電話（0／5夾中間）。0黐住前一組會減弱（生氣即貴人越來越少）。5當伏跟前，課堂未講增強。字母A=01…Z=26。';
  if(KIND_INFO.other) KIND_INFO.other.text='老師見號（未指明類別）跟車牌同套：0／5夾中間。0黐前減弱；5當伏跟前（未講增強）。輸入咧計咧，字母A=01…Z=26。';
 }
 var oldBP=window.buildPairs;
 function sandwichNotes(pairs,kind){
  if(!pairs)return pairs;
  var tag=kind==='plate'?'車牌':'講號';
  var i,p,n;
  for(i=0;i<pairs.length;i++){
   p=pairs[i];n='';
   if(p.display&&p.display.indexOf('0')>=0){
    n=tag+'：0黐住前一組，減弱該組能量';
    if(i>0&&pairs[i-1].field==='shengqi') n+='（前面生氣：貴人越來越少）';
    else if(p.field==='shengqi') n+='（生氣：貴人越來越少）';
   }
   if(p.display&&p.display.indexOf('5')>=0){
    n+=(n?'；':'')+tag+'：5夾中間當伏、跟前，課堂未講會增強';
   }
   if(p.note&&p.note.indexOf('伏位延續')>=0){
    n+=(n?'；':'')+'伏跟前「'+FIELDS[p.field].name+'」';
   }
   if(n)p.note=n;
  }
  return pairs;
 }
 function wrappedBP(digits,kind){
  if(kind==='plate'||kind==='other'){
   var pairs=(typeof oldBP==='function')?oldBP(digits,'phone'):[];
   return sandwichNotes(pairs,kind);
  }
  return (typeof oldBP==='function')?oldBP(digits,kind):[];
 }
 buildPairs=wrappedBP;
 window.buildPairs=wrappedBP;
 var oldExtra=window.extraCourseNotes;
 function wrapExtra(digits,pairs,kind){
  var html=(typeof oldExtra==='function')?oldExtra(digits,pairs,kind):'';
  if((kind!=='plate'&&kind!=='other')||!digits)return html;
  var label=kind==='plate'?'課堂車牌筆記':'課堂睇號筆記';
  var sheng0=['140','410','670','760','390','930','280','820'];
  var hit=sheng0.filter(function(x){return digits.indexOf(x)>=0;});
  if(hit.length){
   html+='<div class="hl-warn"><strong>'+label+'</strong>：生氣後面黐0（'+hit.join('、')+'）— 貴人越來越少，人際不長久，感情來得快去得快，友誼漾漾平淡，重複被騙；貴人唔給力。</div>';
  }
  var has409=false;
  if(pairs)pairs.forEach(function(p){if(p.display&&p.display.indexOf('409')>=0)has409=true;});
  if(has409||digits.indexOf('409')>=0){
   html+='<div class="hl-warn"><strong>'+label+'</strong>：409（天醫中間夾0）— 資產被套或沒法變現。</div>';
  }
  if(digits.indexOf('0')>=0){
   html+='<div class="hl-warn"><strong>'+label+'</strong>：號入面見0 — 隱藏地下情／隱藏婚姻，婚姻易有第三者；男易婚外情，女易被小三；亦易被朋友捅刀子。</div>';
  }
  if(pairs&&pairs.length){
   var has={};
   pairs.forEach(function(p){has[p.field]=1;});
   if(has.shengqi&&has.tianyi&&has.yannian){
    html+='<div class="hl-resolve"><strong>'+label+'</strong>：有齊生氣、天醫、延年三吉。';
    var yn=pairs.filter(function(p){return p.field==='yannian';}).map(function(p){return p.pair;});
    if(yn.indexOf('19')>=0||yn.indexOf('91')>=0) html+='延年收到19／91，能量較43／34強。';
    html+='</div>';
   }
   var allTian=true;
   pairs.forEach(function(p){if(p.field!=='tianyi')allTian=false;});
   if(allTian){
    html+='<div class="nature"><strong>'+label+'</strong>：全程天醫（5夾中當伏跟前，未講增強），冇生氣同延年磁場。</div>';
   }
  }
  return html;
 }
 extraCourseNotes=wrapExtra;
 window.extraCourseNotes=wrapExtra;
})();
