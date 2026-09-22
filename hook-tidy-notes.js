(function(){
 function longest(nodes,test){
  var keep=null,drop=[];
  nodes.forEach(function(el){
   var t=el.textContent||'';
   if(!test(t))return;
   if(!keep||t.length>(keep.textContent||'').length){
    if(keep)drop.push(keep);
    keep=el;
   }else drop.push(el);
  });
  drop.forEach(function(el){if(el.parentNode)el.parentNode.removeChild(el);});
 }
 function tidy(){
  var box=document.getElementById('kindReadBox');
  if(!box)return;
  var nodes=[].slice.call(box.querySelectorAll('.hl-crit,.hl-warn,.hl-resolve,.teacher-note,.hm-hit-explain .hl-crit,.hm-hit-explain .hl-warn'));
  longest(nodes,function(t){return t.indexOf('五鬼')>=0&&t.indexOf('絕命')>=0&&(t.indexOf('絕症')>=0||t.indexOf('身體差')>=0);});
  longest(nodes,function(t){return t.indexOf('天醫')>=0&&t.indexOf('五鬼')>=0&&t.indexOf('大凶')>=0;});
  longest(nodes,function(t){return t.indexOf('延年')>=0&&t.indexOf('五鬼')>=0&&(t.indexOf('次凶')>=0||t.indexOf('腦梗')>=0);});
  [].slice.call(box.querySelectorAll('.teacher-note')).forEach(function(el){
   var t=el.textContent||'';
   if(t.indexOf('大絕命')>=0 && t.indexOf('大上大落')<0){
    var hit=(t.match(/\d{2}/g)||[]).filter(function(x,i,a){return a.indexOf(x)===i&&('12,21,69,96'.indexOf(x)>=0);});
    el.innerHTML='<p><strong>筆記：此組有大絕命</strong>（命中 '+(hit.join('、')||'—')+'；大絕命＝12、69，掉轉 21、96 同分）</p><p>絕命兩組能量裡最強的一級、二級，較 48／84、37／73 更易大上大落、衝動下注與突發衝突。</p>';
   }
  });
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__tidyNotes)return;
  var w=function(){impl();setTimeout(tidy,420);setTimeout(tidy,700);};
  w.__tidyNotes=true;
  w.__y2026=impl.__y2026;
  w.__copyWrapped=impl.__copyWrapped;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
