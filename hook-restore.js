(function(){
 function fullStar(f){
  if(!f)return '';
  var h='<div class="wiki-card" style="padding:12px;margin-bottom:10px"><h3 style="margin-bottom:6px"><span class="ptag '+f.pol+'">'+f.rank+'</span> '+f.name+'</h3>';
  h+='<p>'+srcTag('c')+f.short+'</p>';
  if(f.pros&&f.pros.length)h+='<p>'+srcTag('c')+'<strong>優點</strong>：'+f.pros.join('、')+'</p>';
  if(f.cons&&f.cons.length)h+='<p>'+srcTag('c')+'<strong>缺點</strong>：'+f.cons.join('、')+'</p>';
  if(f.job)h+='<p>'+srcTag('c')+'<strong>事業</strong>：'+f.job+'</p>';
  if(f.wealth)h+='<p>'+srcTag('c')+'<strong>財運</strong>：'+f.wealth+'</p>';
  if(f.love)h+='<p>'+srcTag('c')+'<strong>感情</strong>：'+f.love+'</p>';
  if(f.health)h+='<p>'+srcTag('c')+'<strong>健康</strong>：'+f.health+'</p>';
  if(f.note)h+='<p>'+srcTag('n')+f.note+'</p>';
  if(f.book)h+='<p>'+srcTag('b')+f.book+'</p>';
  h+='</div>';
  return h;
 }
 function juemingBlock(digits){
  if(typeof juemingScore!=='function'||!digits)return '';
  var js=juemingScore(digits);
  if(!js.hits.length)return '';
  var prof=window.currentProfile||(typeof currentProfile!=='undefined'?currentProfile:'');
  var over=js.total>100;
  var html='<div class="'+(over?'hl-warn':'nature')+'">';
  html+='<p><strong>筆記</strong>：絕命計分 12／21＝100、69／96＝75、48／84＝50、37／73＝25（掉轉同分）。此組：'+js.hits.join('＋')+' ＝ <strong>'+js.total+'分</strong>。</p>';
  html+='<p><strong>筆記原文</strong>：男人絕命過多（超過100分就過多）：性功能下降。</p>';
  html+='<p><strong>筆記原文</strong>：121 — 腰不太好；如果是女性，容易冷淡。'+(digits.indexOf('121')>=0?'此組有121。':'')+'</p>';
  html+='<p><strong>筆記原文</strong>：六煞+絕命：容易有婦科病；絕命中有5，概率更大；如果是結尾更不好。</p>';
  if(prof==='female')html+='<p class="muted">已選女性：記上面「女性容易冷淡」「婦科病」兩條原文。筆記無另寫女性絕命計分過多的後果。</p>';
  html+='</div>';
  return html;
 }
 function rebuildPhoneCard(digits,pairs){
  var pc=document.getElementById('phoneRuleCard');
  if(!pc){
   pc=document.createElement('div');
   pc.className='card';
   pc.id='phoneRuleCard';
   var kindCard=document.getElementById('kindReadCard');
   if(kindCard&&kindCard.parentNode)kindCard.parentNode.insertBefore(pc,kindCard.nextSibling);
  }
  var last5=(digits||'').slice(-5);
  var zeroHits=(typeof checkPhoneZeros==='function')?checkPhoneZeros(digits||''):[];
  var warns=(typeof phoneTextbook==='function')?phoneTextbook(digits||'',pairs||[]):[];
  var law=[],prof=[];
  warns.forEach(function(w){
   var t=w.t||'';
   if(/女性|老年人|學生|男性/.test(t))prof.push(w);else law.push(w);
  });
  var h='<div class="card-title">手機定律 ／ 後五位0 ／ 身份組合</div>';
  h+='<p><strong>手機定律</strong>（套中此組先出）</p>';
  if(law.length)law.forEach(function(w){h+='<div class="'+(w.lv==='ok'?'hl-resolve':'hl-warn')+'">'+(typeof srcTag==='function'?srcTag('c'):'')+w.t+'</div>';});
  else h+='<p class="muted">此組未觸發課堂手機定律條文。</p>';
  h+='<p style="margin-top:12px"><strong>後五位0</strong>（尾五位 '+last5+'）</p>';
  if(zeroHits.length){
   h+='<ul class="tight">';
   zeroHits.forEach(function(x){h+='<li>倒數第'+x.pos+'位是0 → <strong>'+x.body+'</strong>｜'+x.palace+'：'+x.effect+'</li>';});
   h+='</ul>';
  }else h+='<p class="muted">尾五位未見0。課堂：後五位絕對不能有0。</p>';
  var pn={male:'男性',female:'女性',student:'學生',elder:'老年人'};
  var profNow=window.currentProfile||(typeof currentProfile!=='undefined'?currentProfile:'');
  h+='<p style="margin-top:12px"><strong>身份組合</strong>'+(profNow?'（已選 '+pn[profNow]+'）':'')+'</p>';
  if(!profNow)h+='<p class="muted">未選身份。上面選女性／男性／學生／老年人再解讀，先出課堂對應禁號與組合。</p>';
  else if(prof.length)prof.forEach(function(w){h+='<div class="'+(w.lv==='ok'?'hl-resolve':'hl-warn')+'">'+(typeof srcTag==='function'?srcTag('c'):'')+w.t+'</div>';});
  else h+='<p class="muted">此身份下，此組未見課堂列明的禁號／特殊組合。</p>';
  pc.innerHTML=h;
  pc.style.display='block';
  return pc;
 }
 function restore(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');
  var det=document.getElementById('details');
  if(det){
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
   if(keys.length){
    det.innerHTML='<p class="muted" style="margin-bottom:8px">以下是此組出現過的星，課堂／筆記／書全文。</p>'+keys.map(function(k){return fullStar(FIELDS[k]);}).join('');
   }
  }
  var raw=document.getElementById('numInput');
  var digits='',pairs=[];
  try{
   if(kind==='birth'){var iso=document.getElementById('birthInput').value;var m=birthCode(iso);digits=m?m.code:'';}
   else if(kind==='plate')digits=plateToDigits((raw&&raw.value||'').trim());
   else {
    var s=(raw&&raw.value||'').trim();
    if(typeof expandLetters==='function')s=expandLetters(s);
    digits=(typeof extractDigits==='function')?extractDigits(s):s;
   }
   pairs=buildPairs(digits,kind);
  }catch(e){}
  var box=document.getElementById('kindReadBox');
  if(box&&kind!=='id'&&kind!=='birth'){
   var fresh=juemingBlock(digits);
   if(fresh){
    if(box.innerHTML.indexOf('絕命計分')>=0){
     box.innerHTML=box.innerHTML.replace(/<div class="hl-(?:warn|resolve)"[^>]*>[\s\S]*?絕命計分[\s\S]*?<\/div>/,fresh);
    }else box.innerHTML+=fresh;
   }
  }
  var pc=document.getElementById('phoneRuleCard');
  if(kind==='phone'){
   pc=rebuildPhoneCard(digits,pairs);
   var kindCard=document.getElementById('kindReadCard');
   if(pc&&kindCard&&kindCard.parentNode)kindCard.parentNode.insertBefore(pc,kindCard.nextSibling);
  }else if(pc)pc.style.display='none';
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<40)setTimeout(wrap,80);return;}
  if(impl.__restoreWrapped)return;
  var wrapped=function(){impl();setTimeout(restore,50);};
  wrapped.__restoreWrapped=true;
  wrapped.__storyWrapped=impl.__storyWrapped;
  wrapped.__hlWrapped=impl.__hlWrapped;
  wrapped.__layWrapped=impl.__layWrapped;
  wrapped.__copyWrapped=impl.__copyWrapped;
  wrapped.__hitWrapped=impl.__hitWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
