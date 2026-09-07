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
(function(){
 var impl=window.analyze;
 if(!impl)return;
 window.analyze=function(){
  impl();
  try{
   var kind=window.currentKind||currentKind;
   if(kind==='plate'||kind==='account'||kind==='address')return;
   var box=document.getElementById('kindReadBox');
   if(!box||!box.innerHTML)return;
   var digits='';
   if(kind==='birth'){
    var iso=document.getElementById('birthInput').value;
    var m=birthCode(iso); digits=m?m.code:'';
   }else{
    var raw=document.getElementById('numInput').value.trim();
    if(kind==='id'||kind==='other') raw=expandLetters(raw);
    digits=extractDigits(raw);
   }
   var pairs=buildPairs(digits,kind);
   box.innerHTML+=industryReadHtml(presentKeys(pairs),digits);
  }catch(e){}
 };
 window.hmAnalyze=function(){ if(window.analyze)window.analyze(); else alert('解讀程式未載入，請重新整理頁面'); return false; };
})();
