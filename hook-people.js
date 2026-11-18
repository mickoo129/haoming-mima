(function(){
 var P={
  fuwei:{names:'劉德華',trait:'穩守、堅持、慢熱、謹慎、喜歡維持現狀、忍耐力強，比較被動，不喜歡亂冒險',text:'圈內出名長青、持之以恆幾十年，作風穩陣，做事步步為營，守成力極強，很少走極端冒險路線，符合伏位「持續、固守」特質。伏位不是不進步，是慢慢累積、長期堅持。'},
  shengqi:{names:'周潤發',trait:'開朗隨和、人緣好、樂觀、貴人運強、豁達、不愛計較',text:'為人隨性親民、沒有架子，心胸闊達，樂善好施，人緣極佳，許多圈內人都敬重他，很有生氣星那種隨緣、廣結善緣的氣場。'},
  tianyi:{names:'古天樂、馮裕博',trait:'心地善良、體貼、有同理心、頭腦聰明、包容性強；弱點有時太單純容易信人',text:'為人低調默默行善，有仁心，有擔當，重情義。天醫重點是仁厚、能助人、帶來福澤。'},
  yannian:{names:'成龍、鄭裕玲',trait:'責任心重、有主見、專業、領導力、意志力強、做事有原則，較強勢、勞祿',text:'對事業極度有追求，親力親為，意志力強，有帶領團隊的魄力，對自己專業要求極高，是典型延年「有擔當、專注事業、扛責」特質。'},
  huohai:{names:'黃子華',trait:'口才強、表現力強、以口生財；說話直率，容易惹口舌爭執，硬頸不認輸',text:'棟篤笑大師，以言語表達為才華，口才鋒利，善於用說話表達看法，正是禍害星「以口為業、言語有力量」的特質（禍害正向就是超強表達口才）。'},
  liusha:{names:'梅艷芳',trait:'情感豐富、心思細膩、社交魅力強、感染力強；容易情緒糾結、多愁善感、易被情緒困擾',text:'風情與舞台感染力獨一無二，重情重義，對身邊人非常有心，情感層次豐厚；六煞重點是情緒、人際魅力、細膩感性。'},
  wugui:{names:'張國榮、周杰倫',trait:'腦轉得快、創意強、想法前衛、洞察力強；情緒多變、心思敏感、多慮，喜歡突破常規',text:'藝術觸覺非常前衛，演繹充滿靈氣，勇於打破當時娛樂圈許多固有框架，思維、美感有獨特洞察力，是五鬼最強的「創意、破格、敏銳感知」特質。'},
  jueming:{names:'謝霆鋒（年輕時期風格參考）',trait:'膽色過人、反應快、重情重義、敢衝敢賭；性格極端、情緒大起大落，不愛受束縛',text:'年輕作風敢衝敢突破，敢於冒險，有強烈反叛、不願被框住的特質。絕命優點是膽識、果斷，缺點是容易過於衝動。'}
 };
 function block(k){
  var p=P[k],f=FIELDS[k];
  if(!p||!f)return '';
  return '<div class="hl-warn"><span class="src src-n">筆記</span><strong>模擬代表人物</strong>：'+p.names+'<br>特質：'+p.trait+'<br>'+p.text+'</div>';
 }
 function injectWiki(){
  var grid=document.getElementById('wikiGrid');
  if(!grid||grid.getAttribute('data-people'))return;
  var cards=grid.querySelectorAll('.wiki-card');
  Object.keys(P).forEach(function(k){
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
  grid.setAttribute('data-people','1');
 }
 function injectRead(){
  var box=document.getElementById('kindReadBox');
  if(!box||box.querySelector('[data-people-read]'))return;
  var html='';
  Object.keys(P).forEach(function(k){
   var name=FIELDS[k]&&FIELDS[k].name;
   if(!name)return;
   if(box.textContent.indexOf(name)>=0){
    html+=block(k).replace('class="hl-warn"','class="hl-warn" data-people-read="1"');
   }
  });
  if(html)box.insertAdjacentHTML('beforeend',html);
 }
 function start(){setTimeout(injectWiki,0);setTimeout(injectWiki,400);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);
 else start();
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__peopleWrapped)return;
  var w=function(){impl();setTimeout(injectRead,350);setTimeout(injectRead,1000);};
  w.__peopleWrapped=true;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 setTimeout(wrap,0);
})();
