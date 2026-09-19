(function(){
 var old=window.buildPairs||buildPairs;
 function keep05(digits,kind){
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
 function wrapped(digits,kind){
  if(kind==='id'||kind==='address'||kind==='account'||kind==='other') return keep05(digits,kind);
  return old(digits,kind);
 }
 window.buildPairs=wrapped;
 buildPairs=wrapped;
})();
