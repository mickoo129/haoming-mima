(function(){
 var MEAN={
  '天醫+五鬼':'課堂列作「大凶」。附表未另寫此組的具體後果，僅定等級。',
  '五鬼+絕命':'課堂：容易身體差、絕症。附表：命＋鬼—精神病。',
  '延年+六煞':'課堂列作「次凶」（低於大凶）。附表未另寫此組的具體後果。',
  '延年+五鬼':'課堂列作「次凶」。筆記老年人：五鬼+延年（如819）容易突發腦梗。',
  '天醫+六煞':'課堂列作「次凶」（低於大凶）。附表未另寫此組的具體後果。',
  '五鬼+六煞':'課堂附表：100%會離婚、單身。鬼＋煞：大意外、血光。',
  '絕命+禍害':'筆記：衝動，做事不計後果，得理不饜人。',
  '六煞+絕命':'筆記：容易有婦科病。',
  '五鬼+禍害':'筆記：容易說假話，存心騙人。',
  '延年+禍害':'筆記：對女性痛經+臉色差。'
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
  var e='';
  Object.keys(MEAN).forEach(function(key){if(t.indexOf(key)>=0)e=MEAN[key];});
  if(!e && t.indexOf('次凶')>=0)e='「次凶」為課堂等級，嚴重程度低於「大凶」。';
  if(!e && t.indexOf('大凶')>=0)e='「大凶」為課堂對此組合所定的等級。';
  return e;
 }
 function paint(root){
  if(!root)return;
  root.querySelectorAll('.hl-warn,.hl-resolve,.hl-crit').forEach(function(el){
   if(el.getAttribute('data-explained'))return;
   if(el.querySelectorAll('p').length>1)return;
   if((el.textContent||'').indexOf('適合的行業')>=0)return;
   var t=tidy(el.innerHTML);
   var more=extraFor(el.textContent||'');
   el.innerHTML=t;
   if(more && el.innerHTML.indexOf(more)<0){
    el.innerHTML+='<div class="muted" style="margin-top:6px">'+more+'</div>';
   }
   el.setAttribute('data-explained','1');
  });
 }
 function jobLine(k,f){
  if(window.CLASS_JOB&&CLASS_JOB[k])return CLASS_JOB[k];
  if(typeof JOB_TABLE!=='undefined'&&JOB_TABLE[k])return JOB_TABLE[k];
  return f.job;
 }
 function splitIndustry(){
  var box=document.getElementById('kindReadBox');
  if(!box)return;
  var nodes=box.querySelectorAll('.hl-resolve');
  nodes.forEach(function(el){
   var txt=el.textContent||'';
   if(txt.indexOf('適合的行業')<0)return;
   if(el.getAttribute('data-split'))return;
   var keys=[];
   try{
    var flow=document.getElementById('pairFlow');
    if(flow){
     flow.querySelectorAll('.pair-row strong').forEach(function(s){
      var name=s.textContent.trim();
      Object.keys(FIELDS).forEach(function(k){if(FIELDS[k].name===name&&keys.indexOf(k)<0)keys.push(k);});
     });
    }
   }catch(e){}
   if(!keys.length)return;
   var h='<p><strong>課堂：適合的行業</strong>（此組出現過的星）</p>';
   keys.forEach(function(k){
    var f=FIELDS[k];
    h+='<p style="margin:8px 0 10px"><strong>'+f.name+'</strong><br>'+jobLine(k,f)+'</p>';
   });
   el.className='nature';
   el.innerHTML=h;
   el.setAttribute('data-split','1');
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
    splitIndustry();
    paint(document.getElementById('phoneRuleCard'));
    paint(document.getElementById('kindReadBox'));
    paint(document.getElementById('details'));
   },90);
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
