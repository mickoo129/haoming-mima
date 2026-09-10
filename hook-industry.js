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
function findLiushaJueming(digits){
 var L={'16':1,'61':1,'47':1,'74':1,'38':1,'83':1,'29':1,'92':1};
 var J={'12':1,'21':1,'69':1,'96':1,'48':1,'84':1,'37':1,'73':1};
 var found=[],has5=false,atEnd=false,i,a,b,tri,jp;
 if(!digits)return {found:found,has5:false,atEnd:false};
 for(i=0;i<digits.length-2;i++){
  a=digits.substr(i,2);b=digits.substr(i+1,2);tri=digits.substr(i,3);
  if((L[a]&&J[b])||(J[a]&&L[b])){
   if(found.indexOf(tri)<0)found.push(tri);
   jp=J[a]?a:b;
   if(tri.indexOf('5')>=0||jp.indexOf('5')>=0)has5=true;
   if(i===digits.length-3)atEnd=true;
  }
 }
 ['612','169','473','692'].forEach(function(x){if(digits.indexOf(x)>=0&&found.indexOf(x)<0)found.push(x);});
 if(/[1569]5[1269378]|5(12|21|69|96|48|84|37|73)|(12|21|69|96|48|84|37|73)5/.test(digits)){
  if(found.length)has5=true;
 }
 if(found.length&&found.some(function(x){return digits.slice(-x.length)===x;}))atEnd=true;
 return {found:found,has5:has5,atEnd:atEnd};
}
function extraCourseNotes(digits,pairs){
 var html='',hit;
 hit=['917','871','198','789'].filter(function(x){return digits&&digits.indexOf(x)>=0;});
 if(hit.length)html+='<div class="hl-warn"><strong>高級課程</strong>：高能量延年+禍害（'+hit.join('、')+'） → 對女性來說：痛經+臉色差</div>';
 hit=['189','817','798','971','364','637','246','423'].filter(function(x){return digits&&digits.indexOf(x)>=0;});
 if(hit.length)html+='<div class="hl-warn"><strong>騙子號</strong>：五鬼+禍害（'+hit.join('、')+'） — 容易說假話，存心騙人，鬼話連篇，花言巧語，說話的目的性強</div>';
 hit=['123','217','698','964','489','846','371','732'].filter(function(x){return digits&&digits.indexOf(x)>=0;});
 if(hit.length)html+='<div class="hl-warn"><strong>騙子號</strong>：絕命+禍害（'+hit.join('、')+'） — 容易說大話，不靠譜，愛吹牛，說話水份大，會包裝</div>';
 var h0=['107','170','701','710','809','890','908','980','406','460','604','640','203','230','302','320'];
 hit=h0.filter(function(x){return digits&&digits.indexOf(x)>=0;});
 var clip=false;
 if(pairs&&pairs.length){
  pairs.forEach(function(p){
   if(p.field==='huohai'&&((p.display&&p.display.indexOf('0')>=0)||(p.note&&p.note.indexOf('0')>=0)))clip=true;
  });
 }
 if(hit.length||clip)html+='<div class="hl-warn"><strong>騙子號</strong>：禍害夾0'+(hit.length?'（'+hit.join('、')+'）':'')+' — 不一定存心騙人，說話表里不一，比較有城府，不一定會說出真實的話</div>';
 var lj=findLiushaJueming(digits);
 if(lj.found.length){
  var extra='';
  if(lj.has5)extra+='；絕命中有5，概率更大';
  if(lj.atEnd)extra+='；收尾更不好';
  html+='<div class="hl-warn"><strong>教材筆記</strong>：六煞+絕命（'+lj.found.join('、')+'） — 容易有婦科病'+extra+'。例如 612、169、473、692。</div>';
 }
 return html;
}
if(typeof phoneTextbook==='function'){
 var _pt=phoneTextbook;
 phoneTextbook=function(digits,pairs){
  var w=_pt(digits,pairs);
  var hit=['189','817','798','971','364','637','246','423'].filter(function(x){return digits.indexOf(x)>=0;});
  if(hit.length)w.push({lv:'warn',t:'騙子號：五鬼+禍害（'+hit.join('、')+'） — 容易說假話，存心騙人，鬼話連篇，花言巧語，說話的目的性強'});
  hit=['123','217','698','964','489','846','371','732'].filter(function(x){return digits.indexOf(x)>=0;});
  if(hit.length)w.push({lv:'warn',t:'騙子號：絕命+禍害（'+hit.join('、')+'） — 容易說大話，不靠譜，愛吹牛，說話水份大，會包裝'});
  hit=['917','871','198','789'].filter(function(x){return digits.indexOf(x)>=0;});
  if(hit.length)w.push({lv:'warn',t:'高級課程：高能量延年+禍害（'+hit.join('、')+'） → 對女性來說：痛經+臉色差'});
  var lj=findLiushaJueming(digits);
  if(lj.found.length){
   var extra='';
   if(lj.has5)extra+='；絕命中有5，概率更大';
   if(lj.atEnd)extra+='；收尾更不好';
   w.push({lv:'warn',t:'教材筆記：六煞+絕命（'+lj.found.join('、')+'） — 容易有婦科病'+extra});
  }
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
   var pairs=buildPairs(digits,kind);
   if(kind!=='plate'&&kind!=='account'&&kind!=='address'){
    box.innerHTML+=industryReadHtml(presentKeys(pairs),digits);
   }
   box.innerHTML+=extraCourseNotes(digits,pairs);
  }catch(e){}
 };
 window.hmAnalyze=function(){ if(window.analyze)window.analyze(); else alert('解讀程式未載入，請重新整理頁面'); return false; };
})();
