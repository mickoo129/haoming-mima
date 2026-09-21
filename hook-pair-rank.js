(function(){
 function shortRank(f){
  if(!f)return '';
  if(f.rank){
   if(f.rank.indexOf('大吉')>=0)return '大吉';
   if(f.rank.indexOf('小吉')>=0)return '小吉';
   if(f.rank.indexOf('大凶')>=0)return '大凶';
   if(f.rank.indexOf('小凶')>=0)return '小凶';
  }
  if(f.pol==='吉')return '吉';
  if(f.pol==='凶')return '凶';
  return '平';
 }
 function paint(){
  var flow=document.getElementById('pairFlow');
  if(!flow||typeof FIELDS==='undefined')return;
  flow.querySelectorAll('.pair-row').forEach(function(row){
   if(row.getAttribute('data-rank'))return;
   var strong=row.querySelector('strong');
   if(!strong)return;
   var name=(strong.textContent||'').trim();
   var k='';
   Object.keys(FIELDS).forEach(function(x){if(FIELDS[x].name===name)k=x;});
   if(!k)return;
   var f=FIELDS[k];
   var pol=f.pol==='平'?'平':(f.pol+'星');
   var rank=shortRank(f);
   var extra=f.rank&&f.rank.indexOf('依附')>=0?'（依附）':'';
   var muted=row.querySelector('.muted');
   var note='';
   if(muted){
    var t=muted.textContent||'';
    var m=t.match(/（(.+)）/);
    if(m)note=m[1];
   }
   var html='<span class="muted">'+pol+' · <strong>'+rank+extra+'</strong></span>';
   if(note)html+=' <span class="muted">（'+note+'）</span>';
   if(muted) muted.outerHTML=html;
   else row.insertAdjacentHTML('beforeend',' '+html);
   row.setAttribute('data-rank','1');
  });
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__pairRank)return;
  var w=function(){impl();setTimeout(paint,80);setTimeout(paint,220);};
  w.__pairRank=true;
  w.__storyWrapped=impl.__storyWrapped;
  w.__copyWrapped=impl.__copyWrapped;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
