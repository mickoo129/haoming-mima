(function(){
 function topic(t){
  if(!t)return '';
  if(t.indexOf('銷售攻略')>=0)return 'sales';
  if(t.indexOf('適合的行業')>=0)return 'industry';
  if(t.indexOf('騙子號')>=0||t.indexOf('禍害夾0')>=0||t.indexOf('隱藏的傷口')>=0)return 'hai0';
  if(t.indexOf('疾病號')>=0||t.indexOf('燼夜傷身')>=0)return 'ye-wg';
  if(t.indexOf('五鬼')>=0&&t.indexOf('絕命')>=0&&(t.indexOf('絕症')>=0||t.indexOf('身體差')>=0||t.indexOf('精神病')>=0||t.indexOf('癌')>=0||t.indexOf('大凶')>=0))return 'wg-jue';
  if(t.indexOf('天醫')>=0&&t.indexOf('五鬼')>=0&&t.indexOf('六煞')<0)return 'ty-wg';
  if(t.indexOf('延年')>=0&&t.indexOf('五鬼')>=0&&t.indexOf('燼夜')<0)return 'yan-wg';
  if(t.indexOf('延年')>=0&&t.indexOf('六煞')>=0)return 'yan-liu';
  if(t.indexOf('天醫')>=0&&t.indexOf('六煞')>=0)return 'ty-liu';
  if(t.indexOf('五鬼')>=0&&t.indexOf('六煞')>=0&&(t.indexOf('離婚')>=0||t.indexOf('血光')>=0||t.indexOf('單身')>=0))return 'wg-liu';
  if(t.indexOf('不能以五鬼結尾')>=0||t.indexOf('尾段五鬼')>=0)return 'tail-wg';
  if(t.indexOf('不能以六煞結尾')>=0||t.indexOf('尾段六煞')>=0)return 'tail-ls';
  if(t.indexOf('不能以禍害結尾')>=0||t.indexOf('尾段禍害')>=0)return 'tail-hh';
  if(t.indexOf('不能以絕命結尾')>=0||t.indexOf('尾段絕命')>=0)return 'tail-jm';
  if(t.indexOf('大絕命')>=0)return 'big-jue';
  if(t.indexOf('大禍害')>=0)return 'big-hai';
  if(t.indexOf('大天醫')>=0)return 'big-ty';
  return '';
 }
 function tidy(){
  var roots=[document.getElementById('kindReadBox'),document.getElementById('details'),document.getElementById('phoneRuleCard')];
  var seen={};
  roots.forEach(function(root){
   if(!root)return;
   var nodes=[].slice.call(root.querySelectorAll('.hl-crit,.hl-warn,.hl-resolve,.teacher-note,.health-note,.sales-note,.hm-hit-explain > div'));
   nodes.forEach(function(el){
    var k=topic(el.textContent||'');
    if(!k)return;
    if(!seen[k]){seen[k]=el;return;}
    var a=seen[k],b=el;
    var la=(a.textContent||'').length,lb=(b.textContent||'').length;
    if(lb>la){if(a.parentNode)a.parentNode.removeChild(a);seen[k]=b;}
    else if(b.parentNode)b.parentNode.removeChild(b);
   });
  });
  var box=document.getElementById('kindReadBox');
  if(!box)return;
  [].slice.call(box.querySelectorAll('.teacher-note,.hl-warn')).forEach(function(el){
   var t=el.textContent||'';
   if(t.indexOf('大絕命')>=0 && t.indexOf('大上大落')<0){
    var hit=(t.match(/\d{2}/g)||[]).filter(function(x,i,a){return a.indexOf(x)===i&&'12,21,69,96'.indexOf(x)>=0;});
    el.innerHTML='<p><strong>筆記：此組有大絕命</strong>（命中 '+(hit.join('、')||'—')+'；大絕命＝12、69，掉轉 21、96 同分）</p><p>絕命兩組能量裡最強的一級、二級，較 48／84、37／73 更易大上大落、衝動下注與突發衝突。</p>';
   }
   if(t.indexOf('大禍害')>=0 && t.indexOf('能量裡最強')<0 && t.indexOf('車禍')>=0 && t.length<80){
    el.innerHTML='<p><strong>筆記：此組有大禍害</strong>（大禍害＝17、89，掉轉 71、98 同分）</p><p>禍害兩組能量裡最強的一級、二級，較 46／64、23／32 更易口舌、官非與意外。</p>';
   }
  });
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__tidyNotes)return;
  var w=function(){impl();setTimeout(tidy,450);setTimeout(tidy,800);};
  w.__tidyNotes=true;
  w.__y2026=impl.__y2026;
  w.__copyWrapped=impl.__copyWrapped;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
