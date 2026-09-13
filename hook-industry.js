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
function findLiushaJueming(digits,pairs){
 var L={'16':1,'61':1,'47':1,'74':1,'38':1,'83':1,'29':1,'92':1};
 var J={'12':1,'21':1,'69':1,'96':1,'48':1,'84':1,'37':1,'73':1};
 var found=[],has5=false,atEnd=false,i,a,b,tri;
 if(digits){
  for(i=0;i<digits.length-2;i++){
   a=digits.substr(i,2);b=digits.substr(i+1,2);tri=digits.substr(i,3);
   if((L[a]&&J[b])||(J[a]&&L[b])){
    if(found.indexOf(tri)<0)found.push(tri);
    if(tri.indexOf('5')>=0)has5=true;
    if(i===digits.length-3)atEnd=true;
   }
  }
 }
 if(pairs&&pairs.length){
  for(i=1;i<pairs.length;i++){
   var x=pairs[i-1].field,y=pairs[i].field;
   if((x==='liusha'&&y==='jueming')||(x==='jueming'&&y==='liusha')){
    var lab=(pairs[i-1].display||pairs[i-1].pair)+'/'+(pairs[i].display||pairs[i].pair);
    if(found.indexOf(lab)<0)found.push(lab);
    var jpair=x==='jueming'?pairs[i-1]:pairs[i];
    if((jpair.display&&jpair.display.indexOf('5')>=0)||(jpair.pair&&jpair.pair.indexOf('5')>=0))has5=true;
    if(i===pairs.length-1)atEnd=true;
   }
  }
 }
 return {found:found,has5:has5,atEnd:atEnd};
}
function findJuemingHuohai(digits,pairs){
 var J={'12':1,'21':1,'69':1,'96':1,'48':1,'84':1,'37':1,'73':1};
 var H={'17':1,'71':1,'89':1,'98':1,'46':1,'64':1,'23':1,'32':1};
 var found=[],i,a,b,tri;
 if(digits){
  for(i=0;i<digits.length-2;i++){
   a=digits.substr(i,2);b=digits.substr(i+1,2);tri=digits.substr(i,3);
   if((J[a]&&H[b])||(H[a]&&J[b])){
    if(found.indexOf(tri)<0)found.push(tri);
   }
  }
 }
 if(pairs&&pairs.length){
  for(i=1;i<pairs.length;i++){
   var x=pairs[i-1].field,y=pairs[i].field;
   if((x==='jueming'&&y==='huohai')||(x==='huohai'&&y==='jueming')){
    var lab=(pairs[i-1].display||pairs[i-1].pair)+'/'+(pairs[i].display||pairs[i].pair);
    if(found.indexOf(lab)<0)found.push(lab);
   }
  }
 }
 return found;
}
function juemingScore(digits){
 var pts={'12':100,'21':100,'69':75,'96':75,'48':50,'84':50,'37':25,'73':25};
 var hits=[],total=0,i,p;
 if(!digits)return {total:0,hits:hits};
 for(i=0;i<digits.length-1;i++){
  p=digits.substr(i,2);
  if(pts[p]){hits.push(p+' '+pts[p]+'分');total+=pts[p];}
 }
 return {total:total,hits:hits};
}
function extraCourseNotes(digits,pairs,kind){
 var html='',hit;
 var person=kind==='phone'||kind==='birth'||kind==='id'||kind==='other'||!kind;
 var speech=kind==='phone'||kind==='other'||kind==='birth'||!kind;
 var drive=kind==='plate';
 if(speech){
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
 }
 var jh=findJuemingHuohai(digits,pairs);
 if(jh.length&&(person||drive)){
  var lead=drive?'出行亦可參照：開車衝動、不計後果。':'';
  html+='<div class="hl-warn"><strong>教材筆記</strong>：凡絕命（12、69、48、37）+禍害（17、89、46、23） — 衝動，做事不計後果，得理不饒人。呢組見到：'+jh.join('、')+'。712、217、698、896 只係例子。'+lead+'</div>';
 }
 if(person){
  var lj=findLiushaJueming(digits,pairs);
  if(lj.found.length){
   var extra='';
   if(lj.has5)extra+='；絕命中有5，概率更大';
   if(lj.atEnd)extra+='；如果係結尾更不好';
   html+='<div class="hl-warn"><strong>教材筆記</strong>：凡六煞（16、47、38、29）+絕命（12、69、48、37）都容易有婦科病。呢組見到：'+lj.found.join('、')+extra+'。612、169、473、692 只係例子。</div>';
  }
  var js=juemingScore(digits);
  if(js.hits.length){
   var over=js.total>100;
   html+='<div class="'+(over?'hl-warn':'hl-resolve')+'"><strong>教材筆記</strong>：絕命計分 12＝100、69＝75、48＝50、37＝25（掉轉同分）。呢組：'+js.hits.join('＋')+' ＝ <strong>'+js.total+'分</strong>';
   if(over)html+='。男人絕命過多（超過100分就過多）：性功能下降';
   html+='。</div>';
  }
  if(digits&&digits.indexOf('121')>=0){
   html+='<div class="hl-warn"><strong>教材筆記</strong>：121 — 腰不太好；如果是女性，容易冷淡</div>';
  }
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
  var jh=findJuemingHuohai(digits,pairs);
  if(jh.length)w.push({lv:'warn',t:'教材筆記：凡絕命+禍害 — 衝動，做事不計後果，得理不饒人（'+jh.join('、')+'）。712、217、698、896 只係例子'});
  var lj=findLiushaJueming(digits,pairs);
  if(lj.found.length){
   var extra='';
   if(lj.has5)extra+='；絕命中有5，概率更大';
   if(lj.atEnd)extra+='；如果係結尾更不好';
   w.push({lv:'warn',t:'教材筆記：凡六煞+絕命都容易有婦科病（'+lj.found.join('、')+'）'+extra});
  }
  var js=juemingScore(digits);
  if(js.hits.length){
   var t='教材筆記：絕命計分 '+js.hits.join('＋')+' ＝ '+js.total+'分';
   if(js.total>100)t+='。男人絕命過多（超過100分就過多）：性功能下降';
   w.push({lv:js.total>100?'bad':'warn',t:t});
  }
  if(digits.indexOf('121')>=0)w.push({lv:'warn',t:'教材筆記：121 — 腰不太好；如果是女性，容易冷淡'});
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
   box.innerHTML+=extraCourseNotes(digits,pairs,kind);
  }catch(e){}
 };
 window.hmAnalyze=function(){ if(window.analyze)window.analyze(); else alert('解讀程式未載入，請重新整理頁面'); return false; };
})();
