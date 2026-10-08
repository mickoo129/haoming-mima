(function(){
 var HUOHAI={'17':1,'71':1,'89':1,'98':1,'46':1,'64':1,'23':1,'32':1};
 var YANNIAN={'19':1,'91':1,'78':1,'87':1,'34':1,'43':1,'26':1,'62':1};
 function digits(){
  var el=document.getElementById('numInput');
  return el?((el.value.match(/\d/g)||[]).join('')):'';
 }
 function afterZero(d){
  var hits=[],seen={},i,pair;
  for(i=0;i<d.length-2;i++){
   pair=d.substr(i,2);
   if(HUOHAI[pair]&&d.charAt(i+2)==='0'){
    var show=d.substr(i,3);
    if(!seen[show]){seen[show]=1;hits.push(show);}
   }
  }
  return hits;
 }
 function midZero(d){
  var hits=[],seen={},i,a,b,pair,show;
  for(i=0;i<d.length-2;i++){
   if(d.charAt(i)==='0'||d.charAt(i)==='5')continue;
   var j=i+1,zeros='';
   while(j<d.length&&d.charAt(j)==='0'){zeros+=d.charAt(j);j++;}
   if(!zeros||j>=d.length)continue;
   b=d.charAt(j);
   if(b==='0'||b==='5')continue;
   a=d.charAt(i);
   pair=a+b;
   if(!YANNIAN[pair])continue;
   show=a+zeros+b;
   if(!seen[show]){seen[show]=1;hits.push(show+' → '+pair);}
  }
  return hits;
 }
 function paint(){
  if((window.currentKind||'')!=='phone')return;
  var box=document.getElementById('kindReadBox');
  if(!box||box.querySelector('[data-zero-note]'))return;
  var d=digits();
  if(!d||d.length<3)return;
  var hz=afterZero(d),yz=midZero(d);
  if(!hz.length&&!yz.length)return;
  var h='<div class="hl-resolve" data-zero-note="1" style="margin-top:10px">';
  h+='<p><strong>筆記：夾 0</strong></p>';
  if(hz.length){
   h+='<p><strong>禍害後面為 0</strong>（例如 980；命中 '+hz.join('、')+'）</p>';
   h+='<p>表達力不夠，說話底氣不足或找不到重點，說話沒辦法兌現，也代表說話出而反而。</p>';
   h+='<p>身體虛弱，容易有慢性病或生病時間長。</p>';
   h+='<p>有破財訊息。</p>';
  }
  if(yz.length){
   h+='<p><strong>延年中有 0</strong>（例如 304；命中 '+yz.join('、')+'）</p>';
   h+='<p>主能力發揮不出，發揮得不好或對自己不滿意，達不到自身預期，付出多回報少，達不到自己想要的，總是自我責怪、自我懷疑，有點懷才不遇、生不逢時的感覺，心有餘而力不足，做的真實際差距很大，付出很難得到相應回報或很難達到預期，一般不太自信。</p>';
  }
  h+='</div>';
  box.insertAdjacentHTML('beforeend',h);
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__zeroNote)return;
  var w=function(){impl();setTimeout(paint,280);setTimeout(paint,520);};
  w.__zeroNote=true;
  w.__tailLiusha=impl.__tailLiusha;
  w.__salesCenter=impl.__salesCenter;
  w.__copyWrapped=impl.__copyWrapped;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
