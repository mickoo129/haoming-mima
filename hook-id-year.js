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
 function isFuRaw(p){
  if(!p)return false;
  if(!PAIR_MAP[p.pair]||PAIR_MAP[p.pair]==='fuwei')return true;
  return p.pair.indexOf('0')>=0||p.pair.indexOf('5')>=0;
 }
 function followPair(src,prev){
  var o={pair:src.pair,display:src.display,field:src.field,note:src.note||''};
  if(isFuRaw(src)&&prev){
   o.field=prev.field;
   o.note='伏位跟隨「'+FIELDS[o.field].name+'」';
  }
  return o;
 }
 window.idCycles=function(pairs){
  var n=pairs.length,out=[],age,i,from,to,src,used;
  if(!n)return out;
  out.push({from:0,to:13,pair:pairs[0]});
  age=13;i=1;
  while(age<98){
   from=age;to=Math.min(age+5,98);
   src=pairs[i%n];
   used=(i>=n)?followPair(src,out[out.length-1].pair):src;
   out.push({from:from,to:to,pair:used});
   age=to;i++;
  }
  return out;
 };
 function noteHtml(starName){
  var list=NOTES[starName]||NOTES['伏位'];
  return '<div class="luck-year-note" style="margin:8px 0;font-size:.84rem;line-height:1.65"><strong>流年運勢</strong>（筆記）：'+list.map(function(x,i){return (i+1)+'. '+x;}).join('　')+'</div>';
 }
 function itemHtml(s){
  var p=s.pair,f=FIELDS[p.field],star=f.name;
  var title=p.display+' · '+star+'\uff08'+f.pol+'／'+f.rank+'）';
  if(p.note)title+=' <span class="muted">'+p.note+'</span>';
  return '<div class="luck-item '+f.pol+'">'
   +'<div><strong>'+s.from+'–'+s.to+'歲</strong></div>'
   +'<div>'+title+'</div>'
   +noteHtml(star)
   +'<div class="muted"><span class="src src-c">課堂</span>'
   +'<strong>事業</strong>：'+JOB_TABLE[p.field]
   +'。 <strong>感情</strong>：'+LOVE_TABLE[p.field]
   +'。 <strong>健康</strong>：'+HEALTH_TABLE[p.field]
   +'</div></div>';
 }
 function paint(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'');
  var grid=document.getElementById('luckGrid');
  if(!grid||kind!=='id')return;
  var raw='',digits='',pairs;
  try{raw=document.getElementById('numInput').value;}catch(e){}
  if(typeof window.prepareIdDigits==='function')digits=window.prepareIdDigits(raw);
  else digits=extractDigits(expandLetters(raw||''));
  pairs=buildPairs(digits,'id');
  if(!pairs||!pairs.length)return;
  grid.innerHTML='<p class="muted">交界歲（如13、18、23）按虛齡、中秋前後決定仍屬上一段或下一段。0／5與11等伏位組跟隨上一組；流年走完一輪從頭再行時同樣跟隨上一段。</p>'
   +window.idCycles(pairs).map(itemHtml).join('');
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<40)setTimeout(wrap,80);return;}
  if(impl.__yearNoteWrapped)return;
  var wrapped=function(){impl();setTimeout(paint,60);};
  wrapped.__yearNoteWrapped=true;
  ['__restoreWrapped','__scopeWrapped','__seqWrapped','__gapWrapped','__uxWrapped','__copyWrapped','__storyWrapped','__hlWrapped','__layWrapped'].forEach(function(k){wrapped[k]=impl[k];});
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
