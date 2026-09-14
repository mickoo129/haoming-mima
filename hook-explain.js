(function(){
 var MEAN={
  '天醫+五鬼':'課堂列作「大凶」。附表未再寫呢組的具體後果。',
  '五鬼+絕命':'課堂：容易身體差、絕症。附表：命＋鬼—精神病。',
  '延年+六煞':'課堂列作「次凶」（嚴重程度低過大凶）。教材呢條沒再寫具體後果。',
  '延年+五鬼':'課堂列作「次凶」。筆記老年人：五鬼+延年（如819）容易突發腦梗。',
  '天醫+六煞':'課堂列作「次凶」（嚴重程度低過大凶）。教材呢條沒再寫具體後果。',
  '五鬼+六煞':'課堂附表：100%會離婚、單身。鬼＋煞：大意外、血光。',
  '絕命+禍害':'筆記：衝動，做事不計後果，得理不饕人。',
  '六煞+絕命':'筆記：容易有婦科病；絕命中有5概率更大；結尾更不好。',
  '五鬼+禍害':'筆記騙子號：容易說假話，存心騙人。',
  '延年+禍害':'筆記高級課程：對女性 痛經+臉色差。'
 };
 function tidy(t){
  return (t||'')
   .replace(/教材次凶：/g,'課堂次凶：')
   .replace(/教材大凶：/g,'課堂大凶：')
   .replace(/教材例子：/g,'課堂：')
   .replace(/教材感情：/g,'課堂感情：')
   .replace(/教材：/g,'課堂：');
 }
 function extraFor(t){
  var k,e='';
  Object.keys(MEAN).forEach(function(key){if(t.indexOf(key)>=0)e=MEAN[key];});
  if(!e && t.indexOf('次凶')>=0)e='「次凶」係課堂對呢個組合的等級，嚴重程度低過「大凶」。';
  if(!e && t.indexOf('大凶')>=0)e='「大凶」係課堂對呢個組合的等級。';
  return e;
 }
 function paint(root){
  if(!root)return;
  root.querySelectorAll('.hl-warn,.hl-resolve').forEach(function(el){
   if(el.getAttribute('data-explained'))return;
   var raw=el.textContent||'';
   var t=tidy(raw);
   var more=extraFor(t);
   el.innerHTML=t.replace(/課堂課堂/g,'課堂');
   if(more && el.innerHTML.indexOf(more)<0){
    el.innerHTML+='<div class="muted" style="margin-top:6px">'+more+'</div>';
   }
   el.setAttribute('data-explained','1');
  });
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<40)setTimeout(wrap,80);return;}
  if(impl.__expWrapped)return;
  var wrapped=function(){
   impl();
   setTimeout(function(){
    paint(document.getElementById('phoneRuleCard'));
    paint(document.getElementById('kindReadBox'));
    paint(document.getElementById('details'));
   },80);
  };
  wrapped.__expWrapped=true;
  wrapped.__restoreWrapped=impl.__restoreWrapped;
  wrapped.__storyWrapped=impl.__storyWrapped;
  wrapped.__copyWrapped=impl.__copyWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
