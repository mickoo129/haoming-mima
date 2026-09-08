function industryReadHtml(keys,digits){
 var html='<div class="hl-resolve" style="margin-top:12px"><p><strong>教材適合的行業</strong>（呢組出現的星）</p>';
 keys.forEach(function(k){html+='<p><strong>'+FIELDS[k].name+'：</strong>'+FIELDS[k].job+'</p>';});
 if(typeof pairJobNotes==='function'){
  var pj=pairJobNotes(digits||'');
  if(pj.length)html+='<p>'+pj.join('；')+'</p>';
 }
 html+='</div>';
 return html;
}
function advancedCourseNotes(digits){
 var hit=['917','871','198','789'].filter(function(x){return digits&&digits.indexOf(x)>=0;});
 if(!hit.length)return '';
 return '<div class="hl-warn"><strong>高級課程</strong>：高能量延年+禍害（'+hit.join('、')+'） → 對女性來說：痛經+臉色差</div>';
}
if(typeof phoneTextbook==='function'){
 var _pt=phoneTextbook;
 phoneTextbook=function(digits,pairs){
  var w=_pt(digits,pairs);
  var hit=['917','871','198','789'].filter(function(x){return digits.indexOf(x)>=0;});
  if(hit.length)w.push({lv:'warn',t:'高級課程：高能量延年+禍害（'+hit.join('、')+'） → 對女性來說：痛經+臉色差'});
  return w;
 };
}
(function(){
 var impl=window.analyze;
 if(!impl)return;
 window.analyze=function(){
  impl();
  try{
   var kind=window.currentKind||currentKind;
   var box=document.getElementById('kindReadBox');
   if(!box||!box.innerHTML)return;
   var digits='';
   if(kind==='birth'){
    var iso=document.getElementById('birthInput').value;
    var m=birthCode(iso); digits=m?m.code:'';
   }else if(kind==='plate'){
    digits=plateToDigits(document.getElementById('numInput').value.trim());
   }else{
    var raw=document.getElementById('numInput').value.trim();
    if(kind==='id'||kind==='address'||kind==='other') raw=expandLetters(raw);
    digits=extractDigits(raw);
   }
   if(kind!=='plate'&&kind!=='account'&&kind!=='address'){
    var pairs=buildPairs(digits,kind);
    box.innerHTML+=industryReadHtml(presentKeys(pairs),digits);
   }
   box.innerHTML+=advancedCourseNotes(digits);
  }catch(e){}
 };
 window.hmAnalyze=function(){ if(window.analyze)window.analyze(); else alert('解讀程式未載入，請重新整理頁面'); return false; };
})();
