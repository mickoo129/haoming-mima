(function(){
 var NOTES={
  '天醫':['財富','桃花','婚姻','事業','健康'],
  '延年':['主管','升遷','創業','老闆','延續生命'],
  '生氣':['貴人','人際關係佳','轉介紹','心情穩定','逢凶化吉'],
  '伏位':['平穩','沉潛','儲存','緩慢成長','逢凶化吉'],
  '六煞':['與家人感情問題','與另一半感情問題','桃花／婚姻','情緒不穩','債務問題'],
  '禍害':['小人','身體毛病','雜事多','與人口角','易衝動'],
  '絕命':['上下起伏／辛苦','意外／突發事件','回到原點','賺錢／找項目','與人爭／官司問題'],
  '五鬼':['財富','事業','感情','家庭','生命']
 };
 var ORDER=['天醫','延年','生氣','伏位','六煞','禍害','絕命','五鬼'];
 function starOf(item){
  var t=item.textContent||'';
  var i,n;
  for(i=0;i<ORDER.length;i++){
   n=ORDER[i];
   if(t.indexOf('· '+n)>=0||t.indexOf(' '+n)>=0||t.indexOf(n+'（')>=0)return n;
  }
  return '';
 }
 function paint(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'');
  var grid=document.getElementById('luckGrid');
  if(!grid||kind!=='id')return;
  [].slice.call(grid.querySelectorAll('.luck-item')).forEach(function(item){
   if(item.querySelector('.luck-year-note'))return;
   var name=starOf(item);
   if(!name||!NOTES[name])return;
   var box=document.createElement('div');
   box.className='luck-year-note';
   box.style.cssText='margin-top:8px;padding-top:8px;border-top:1px dashed #ddd;font-size:.84rem;line-height:1.7';
   box.innerHTML='<strong>流年運勢</strong>（筆記）<br>'+NOTES[name].map(function(x,i){return (i+1)+'. '+x;}).join('<br>');
   item.appendChild(box);
  });
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<40)setTimeout(wrap,80);return;}
  if(impl.__yearNoteWrapped)return;
  var wrapped=function(){impl();setTimeout(paint,80);};
  wrapped.__yearNoteWrapped=true;
  ['__restoreWrapped','__scopeWrapped','__seqWrapped','__gapWrapped','__uxWrapped','__copyWrapped','__storyWrapped','__hlWrapped','__layWrapped'].forEach(function(k){wrapped[k]=impl[k];});
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
