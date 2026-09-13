function idCycles(pairs){var n=pairs.length,out=[];out.push({from:0,to:13,pair:pairs[0]});var age=13,i=1;while(age<98){var from=age,to=Math.min(age+5,98);out.push({from:from,to:to,pair:pairs[i%n]});age=to;i++;}return out;}
function srcTag(k){return '<span class="src src-'+k+'">'+(k==='c'?'課堂':k==='b'?'書':'筆記')+'</span>';}
function richStory(kind,pairs){var html='',good=pairs.filter(function(p){return FIELDS[p.field].pol==='吉';}).length,bad=pairs.filter(function(p){return FIELDS[p.field].pol==='凶';}).length,last=FIELDS[pairs[pairs.length-1].field];
if(kind==='id')html+='<p>身份證係流年。0–13歲之後每5年至98歲，星序重複。證件改唔到，用電話補。</p>';
else if(kind==='birth')html+='<p>先天命格出世就定，缺星用手機補。</p>';
else if(kind==='phone')html+='<p>手機係後天分身。尾段「'+last.name+'」。後4位決定約80%運勢；後面五位絕對不能有0。</p>';
else if(kind==='plate')html+='<p>車牌係交通磁場。尾段「'+last.name+'」。用車牌專頁講出行安危，唔好當成事業評語。</p>';
else if(kind==='account')html+='<p>銀行帳號睇錢進出。尾段「'+last.name+'」。</p>';
else if(kind==='address')html+='<p>門牌睇家宅同家人健康。尾段「'+last.name+'」。</p>';
else html+='<p>其他數字。尾段「'+last.name+'」：'+last.short+'。</p>';
html+='<p>吉 '+good+' 組、凶 '+bad+' 組。</p>';return html;}
function wikiCard(f){
 return '<div class="wiki-card"><h3><span class="ptag '+f.pol+'">'+f.rank+'</span> '+f.name+'</h3>'
  +'<p class="muted">組合：'+f.pairs.join('、')+'</p>'
  +'<p>'+srcTag('c')+'<strong>'+f.short+'</strong></p>'
  +'<div class="grid2"><div class="box g">'+srcTag('c')+'優點：'+f.pros.join('、')+'</div><div class="box b">'+srcTag('c')+'缺點：'+f.cons.join('、')+'</div></div>'
  +'<p>'+srcTag('c')+'<strong>事業</strong>：'+f.job+'</p>'
  +'<p>'+srcTag('c')+'<strong>錢財</strong>：'+f.wealth+'</p>'
  +'<p>'+srcTag('c')+'<strong>感情</strong>：'+f.love+'</p>'
  +'<p>'+srcTag('c')+'<strong>健康</strong>：'+f.health+'</p>'
  +(f.note?'<div class="hl-warn">'+srcTag('n')+f.note+'</div>':'')
  +(f.book?'<div class="hl-resolve">'+srcTag('b')+f.book+'</div>':'')
  +'</div>';
}
function compactStar(f){
 return '<div class="wiki-card" style="padding:12px;margin-bottom:10px"><h3 style="margin-bottom:6px"><span class="ptag '+f.pol+'">'+f.rank+'</span> '+f.name+'</h3>'
  +'<p>'+srcTag('c')+f.short+'。'+f.health+'</p>'
  +(f.book?'<p>'+srcTag('b')+f.book+'</p>':'')
  +'</div>';
}
function wikiAppendix(){
 var h='<div class="wiki-card"><h3>課堂附表（精簡，詳情見上頁六欄）</h3>';
 h+='<p>'+srcTag('c')+'化解：絕命→天醫；六煞→延年；禍害→生氣；五鬼→生氣＋天醫＋延年或延年；伏位→生氣／天醫／延年。</p>';
 h+='<p>'+srcTag('c')+'五鬼＋六煞：100%會離婚，單身。多鬼：95%婚姻不好。命＋害：肺，氣管。命＋鬼：精神病。命＋煞：腸，精神。命＋伏：頸椎，腰椎。鬼＋煞：大意外，血光。鬼＋害：基因遺傳病。</p>';
 h+='<p>'+srcTag('c')+'車牌：五鬼血光破財；六煞與另一半不和；禍害車上口角；絕命開快車意外。鬼＋煞易撞車；鬼＋絕自撞。</p>';
 h+='<p>'+srcTag('c')+'銀行卡：天醫帶財；延年工資／被動；五鬼破財；六煞花在感情；禍害衝動花；絕命投資漏。五鬼＋六煞大破財；五鬼＋絕命大進大出。唔好凶星或0／05結尾。</p></div>';
 return h;
}
