(function(){
 var M={
  jueming:{core:'衝動、極端、投資',tiers:'12/21（100分）、69/96（75分）、48/84（50分）、37/73（25分）'},
  wugui:{core:'變化、熬夜、意外',tiers:'18/81（100分）、79/97（75分）、36/63（50分）、24/42（25分）'},
  huohai:{core:'口才、口舌是非、病痛',tiers:'17/71（100分）、89/98（75分）、46/64（50分）、23/32（25分）'},
  liusha:{core:'異性緣、爛桃花',tiers:'16/61（100分）、47/74（75分）、38/83（50分）、29/92（25分）'},
  tianyi:{core:'正財、桃花',tiers:'13/31（100分）、68/86（75分）、49/94（50分）、27/72（25分）'},
  shengqi:{core:'貴人、人緣好',tiers:'14/41（100分）、67/76（75分）、39/93（50分）、28/82（25分）'},
  yannian:{core:'能力、領導、壓力',tiers:'19/91（100分）、78/87（75分）、34/43（50分）、26/62（25分）'},
  fuwei:{core:'等待、依附',tiers:'11/22（100分）、88/99（75分）、66/77（50分）、33/44（25分）'}
 };
 function block(k){
  var m=M[k],f=FIELDS[k];
  if(!m||!f)return '';
  return '<div class="hl-warn"><span class="src src-n">筆記</span><strong>'+f.name+'</strong>：核心象意：'+m.core+'<br>數字分值檔：'+m.tiers+'</div>';
 }
 function injectWiki(){
  var grid=document.getElementById('wikiGrid');
  if(!grid||grid.getAttribute('data-meaning'))return;
  var cards=grid.querySelectorAll('.wiki-card');
  Object.keys(M).forEach(function(k){
   var f=FIELDS[k];
   if(!f)return;
   for(var i=0;i<cards.length;i++){
    var h=cards[i].querySelector('h3');
    if(h&&h.textContent.indexOf(f.name)>=0){
     cards[i].insertAdjacentHTML('beforeend',block(k));
     break;
    }
   }
  });
  grid.setAttribute('data-meaning','1');
 }
 function digitsNow(){
  var kind=window.currentKind|| (typeof currentKind!=='undefined'?currentKind:'phone');
  try{
   if(kind==='birth'){
    var iso=document.getElementById('birthInput').value;
    var m=typeof birthCode==='function'?birthCode(iso):null;
    return m?m.code:'';
   }
   if(kind==='plate'&&typeof plateToDigits==='function'){
    return plateToDigits(document.getElementById('numInput').value.trim());
   }
   var raw=document.getElementById('numInput').value.trim();
   if(kind==='id'||kind==='address'||kind==='other'){
    raw=typeof expandLetters==='function'?expandLetters(raw):raw;
   }
   return typeof extractDigits==='function'?extractDigits(raw):raw.replace(/\D/g,'');
  }catch(e){return '';}
 }
 function presentFields(){
  var has={};
  var kind=window.currentKind|| (typeof currentKind!=='undefined'?currentKind:'phone');
  var digits=digitsNow();
  if(typeof buildPairs==='function'&&digits){
   var pairs=buildPairs(digits,kind)||[];
   pairs.forEach(function(p){if(p&&p.field)has[p.field]=1;});
  }
  return has;
 }
 function injectRead(){
  var box=document.getElementById('kindReadBox');
  if(!box||box.querySelector('[data-meaning-read]'))return;
  var has=presentFields();
  var html='';
  Object.keys(M).forEach(function(k){
   if(!has[k])return;
   html+=block(k).replace('class="hl-warn"','class="hl-warn" data-meaning-read="1"');
  });
  if(html)box.insertAdjacentHTML('beforeend',html);
 }
 function start(){setTimeout(injectWiki,0);setTimeout(injectWiki,600);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);
 else start();
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__meaningWrapped)return;
  var w=function(){impl();setTimeout(injectRead,450);setTimeout(injectRead,1200);};
  w.__meaningWrapped=true;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 setTimeout(wrap,0);
})();
