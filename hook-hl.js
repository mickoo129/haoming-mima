(function(){
 if(!document.getElementById('hm-hl-css')){
  var st=document.createElement('style');
  st.id='hm-hl-css';
  st.textContent='.num-in{display:inline-block;background:#fff3cd;border:1.5px solid #d4a017;color:#5c4300;font-weight:700;font-family:ui-monospace,Menlo,monospace;padding:0 6px;margin:0 1px;border-radius:5px;letter-spacing:.05em}.num-ex{display:inline-block;background:#eee;border:1px dashed #bbb;color:#888;font-family:ui-monospace,Menlo,monospace;padding:0 6px;margin:0 1px;border-radius:5px;font-size:.86em}.num-def{display:inline-block;background:#f4f6f5;border:1px solid #c5d9ce;color:#4a5c54;font-family:ui-monospace,Menlo,monospace;padding:0 6px;margin:0 1px;border-radius:5px;font-size:.86em}.ex-tag{display:inline-block;font-size:.68rem;color:#777;background:#f3f3f3;border-radius:4px;padding:1px 6px;margin-left:4px;vertical-align:middle}.hl-legend{font-size:.78rem;color:#5a5a5a;margin:8px 0 0;line-height:1.7}.hl-legend i{font-style:normal;margin-right:12px}';
  document.head.appendChild(st);
 }
 function chip(n,cls,title){
  return '<span class="'+cls+'" title="'+title+'">'+n+'</span>';
 }
 function paintList(body,digits){
  return body.split('、').map(function(raw){
   var n=raw.trim();
   if(!n)return raw;
   if(/<span/.test(n))return n;
   var inHere=digits&&digits.indexOf(n.replace(/\s/g,''))>=0;
   return chip(n,inHere?'num-in':'num-def',inHere?'此組確實出現此號碼':'星曜組合規則，不代表此組全部皆有');
  }).join('、');
 }
 function paint(html,digits){
  if(!html)return html;
  digits=digits||'';
  html=html.replace(/612、169、473、692/g,function(){
   return ['612','169','473','692'].map(function(n){return chip(n,'num-ex','教材例子，不代表此組皆有');}).join('、');
  });
  html=html.replace(/712、217、698、896/g,function(){
   return ['712','217','698','896'].map(function(n){return chip(n,'num-ex','教材例子，不代表此組皆有');}).join('、');
  });
  html=html.replace(/只是例子/g,'<span class="ex-tag">只是例子，不是此組號碼</span>');
  html=html.replace(/此組見到：([^ 。<]+)/g,function(_,body){
   return '此組見到：'+body.split('、').map(function(p){return chip(p.trim(),'num-in','此組確實出現此號碼');}).join('、');
  });
  html=html.replace(/（([0-9]{2,4}(?:、[0-9]{2,4})+)）/g,function(_,body){
   return '（'+paintList(body,digits)+'）';
  });
  return html;
 }
 function digitsNow(){
  var kind=window.currentKind||(typeof currentKind!=='undefined'?currentKind:'phone');
  try{
   if(kind==='birth'){var iso=document.getElementById('birthInput').value;var m=birthCode(iso);return m?m.code:'';}
   if(kind==='plate')return plateToDigits(document.getElementById('numInput').value.trim());
   var raw=document.getElementById('numInput').value.trim();
   if(typeof expandLetters==='function') raw=expandLetters(raw);
   return (typeof extractDigits==='function')?extractDigits(raw):(raw.match(/\d/g)||[]).join('');
  }catch(e){return '';}
 }
 function run(){
  var digits=digitsNow();
  ['kindReadBox','details','fixBox','storyBox','pairFlow','roleBox'].forEach(function(id){
   var el=document.getElementById(id);
   if(!el||!el.innerHTML)return;
   el.innerHTML=paint(el.innerHTML,digits);
  });
  var box=document.getElementById('kindReadBox');
  if(box&&box.innerHTML&&box.innerHTML.indexOf('hl-legend')<0){
   box.innerHTML+='<p class="hl-legend"><i><span class="num-in">黃底</span> 此組號碼確實出現</i><i><span class="num-def">綠邊</span> 星曜組合規則（不代表全部皆有）</i><i><span class="num-ex">灰虛線</span> 教材例子</i></p>';
  }
 }
 var tries=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(tries++<30)setTimeout(wrap,80);return;}
  if(impl.__hlWrapped)return;
  var wrapped=function(){impl();setTimeout(run,0);};
  wrapped.__hlWrapped=true;
  wrapped.__storyWrapped=impl.__storyWrapped;
  window.analyze=wrapped;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
