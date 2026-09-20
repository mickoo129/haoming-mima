(function(){
 var old=window.buildPairs||buildPairs;
 function expandOne(ch){
  return String(String(ch).toUpperCase().charCodeAt(0)-64).padStart(2,'0');
 }
 function prepareIdDigits(raw){
  var s=String(raw||'').toUpperCase().replace(/[()\s-]/g,'');
  var m=s.match(/^([A-Z]{1,2})([0-9]*)([A-Z0-9])?$/);
  if(!m){
   var d=(typeof extractDigits==='function'&&typeof expandLetters==='function')?extractDigits(expandLetters(s)):s.replace(/\D/g,'');
   if(d.length<=2)return d;
   return d.charAt(0)+d.slice(1,-1).replace(/5/g,'')+d.charAt(d.length-1);
  }
  var head=m[1].split('').map(expandOne).join('');
  var mid=(m[2]||'').replace(/5/g,'');
  var tail=m[3]||'';
  if(/[A-Z]/.test(tail))tail=expandOne(tail);
  return head+mid+tail;
 }
 window.prepareIdDigits=prepareIdDigits;
 function keep05(digits){
  var out=[],i,pair,key,field,note;
  for(i=0;i<digits.length-1;i++){
   pair=digits.charAt(i)+digits.charAt(i+1);
   key=PAIR_MAP[pair];
   field=key||'fuwei';
   note='';
   if(!key){
    if(pair.indexOf('0')>=0||pair.indexOf('5')>=0) note='書：0／5本身不成星，當作伏位';
    else note='書：非八星組合當伏';
   }
   if(field==='fuwei'&&out.length){
    field=out[out.length-1].field;
    note+=(note?'；':'')+'跟前「'+FIELDS[field].name+'」';
   }
   out.push({pair:pair,display:pair,field:field,note:note});
  }
  return out;
 }
 function idPairs(digits){
  if(!digits||digits.length<2)return [];
  var src=digits;
  var out=[],i,pair,key,field,note;
  for(i=0;i<src.length-1;i++){
   pair=src.substr(i,2);
   key=PAIR_MAP[pair];
   field=key||'fuwei';
   note='';
   if(!key){
    if(pair.indexOf('0')>=0||pair.indexOf('5')>=0) note='課堂：0／5不成星，當作伏位';
    else note='課堂：非八星組合當伏位';
   }
   if(field==='fuwei'&&out.length){
    field=out[out.length-1].field;
    note+=(note?'；':'')+'伏位跟隨「'+FIELDS[field].name+'」';
   }
   out.push({pair:pair,display:pair,field:field,note:note});
  }
  return out;
 }
 function followPair(src,prev){
  var o={pair:src.pair,display:src.display,field:src.field,note:src.note||''};
  var rawFu=!PAIR_MAP[src.pair]||PAIR_MAP[src.pair]==='fuwei';
  if(rawFu&&prev){
   o.field=prev.field;
   o.note='伏位跟隨「'+FIELDS[o.field].name+'」';
  }
  return o;
 }
 window.idCycles=function(pairs){
  var n=pairs.length,out=[];
  if(!n)return out;
  out.push({from:0,to:13,pair:pairs[0]});
  var age=13,i=1;
  while(age<98){
   var from=age,to=Math.min(age+5,98);
   var src=pairs[i%n];
   var used=(i>=n)?followPair(src,out[out.length-1].pair):src;
   out.push({from:from,to:to,pair:used});
   age=to;i++;
  }
  return out;
 };
 function wrapped(digits,kind){
  if(kind==='id'){
   var raw='';
   try{raw=document.getElementById('numInput').value;}catch(e){}
   var d=prepareIdDigits(raw);
   if(!d)d=digits;
   return idPairs(d);
  }
  if(kind==='address'||kind==='account'||kind==='other') return keep05(digits);
  return old(digits,kind);
 }
 window.buildPairs=wrapped;
 buildPairs=wrapped;
 var ys=document.createElement('script');
 ys.src='./hook-id-year.js?v=20260920c';
 if(document.body)document.body.appendChild(ys);
 else document.addEventListener('DOMContentLoaded',function(){document.body.appendChild(ys);});
})();
