(function(){
 var C={
  shengqi:{
   title:'與生氣星合作',
   points:[
    '第一點：好溝通，不對抗。（核心優點）合作體驗很舒服。',
    '第二點：穩定，不折騰。不容易出大問題。',
    '第三點：缺乏主動性。（關鍵風險）很多事需要你推。',
    '第四點：關鍵時刻不夠果斷。容易錯失窗口。'
   ],
   suggest:'建議：適合做穩定執行的位置，但關鍵決策，需要更果斷。'
  },
  tianyi:{
   title:'與天醫星合作',
   points:[
    '第一點：自帶資源和機會。（核心優點）很多專案，是他帶進來的。',
    '第二點：容易成交、容易出結果。',
    '第三點：容易情面用事，判斷不夠理性。（關鍵風險）',
    '第四點：財務觀念不強，容易大進大出。'
   ],
   suggest:'建議：適合做資源整合、機會型角色，必須搭配「能管錢、能控節奏」的人。'
  },
  yannian:{
   title:'與延年星合作',
   points:[
    '第一點：靠譜，能扛事。（核心優點）你交給他的事，大概率能落地。',
    '第二點：有責任心，不輕易放棄。',
    '第三點：不容易放權，容易卡住團隊效率。（關鍵風險）',
    '第四點：溝通上偏強勢，容易壓人。'
   ],
   suggest:'建議：適合做負責人，但一定要搭配「會溝通會潤滑的人」。'
  }
 };
 function block(k){
  var c=C[k],f=FIELDS[k];
  if(!c||!f)return '';
  return '<div class="hl-warn"><span class="src src-n">筆記</span><strong>'+f.name+'</strong>：合作與風險<br>'+c.points.join('<br>')+'<br><strong>'+c.suggest+'</strong></div>';
 }
 function injectWiki(){
  var grid=document.getElementById('wikiGrid');
  if(!grid||grid.getAttribute('data-coop'))return;
  var cards=grid.querySelectorAll('.wiki-card');
  Object.keys(C).forEach(function(k){
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
  grid.setAttribute('data-coop','1');
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
  if(!box||box.querySelector('[data-coop-read]'))return;
  var has=presentFields();
  var html='';
  Object.keys(C).forEach(function(k){
   if(!has[k])return;
   html+=block(k).replace('class="hl-warn"','class="hl-warn" data-coop-read="1"');
  });
  if(html)box.insertAdjacentHTML('beforeend',html);
 }
 function start(){setTimeout(injectWiki,0);setTimeout(injectWiki,500);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);
 else start();
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__coopWrapped)return;
  var w=function(){impl();setTimeout(injectRead,400);setTimeout(injectRead,1100);};
  w.__coopWrapped=true;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 setTimeout(wrap,0);
})();
