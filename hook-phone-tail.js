(function(){
 var LIUSHA={'16':1,'61':1,'47':1,'74':1,'38':1,'83':1,'29':1,'92':1};
 var LIUSHA_GRADE={'16':'16 桃花，外遇','74':'74 異性知己','38':'38 人際關係好','29':'29 身邊的人對他都有好感'};
 var HUOHAI={'17':1,'71':1,'89':1,'98':1,'46':1,'64':1,'23':1,'32':1};
 var HUOHAI_GRADE={'17':'17 官司','89':'89 經常爭吵','46':'46 經常和身邊人鬧矛盾','23':'23 雙方都在心裡對彼此不滿、暗自吐槽，但嘴上都不說出來'};
 function digits(){
  var el=document.getElementById('numInput');
  return el?((el.value.match(/\d/g)||[]).join('')):'';
 }
 function cardLiusha(tail){
  var h='<div class="hl-resolve" data-tail-xing="1" style="margin-top:10px">';
  h+='<p><strong>筆記：手機尾號性格（六煞）</strong>（16、47、38、29）</p>';
  h+='<p><strong>關鍵詞：</strong>桃花，人際，騙財，優豫不決，自戀</p>';
  h+='<p><strong>尾2位特徵：</strong>異性緣好，桃花旺，異性貴人多，容易犯桃花，性格優豫不決，徘徊，舉棋不定，容易受到外界的影響和干擾，愛打扮，喜歡消費，男士比較有氣質，女士比較有魅力，喜歡照鏡子。</p>';
  h+='<p><strong>注意：</strong>男性要注意生殖泌尿系統，女性注意婦科子宮乳腺</p>';
  if(LIUSHA_GRADE[tail]) h+='<p><strong>此組尾號：</strong>'+LIUSHA_GRADE[tail]+'</p>';
  return h+'</div>';
 }
 function cardHuohai(tail){
  var h='<div class="hl-resolve" data-tail-xing="1" style="margin-top:10px">';
  h+='<p><strong>筆記：手機尾號性格（禍害）</strong>（17、89、46、23）</p>';
  h+='<p><strong>關鍵詞：</strong>口舌，官司，意外，疾病，口才</p>';
  h+='<p><strong>尾2位特徵：</strong>心直口快，脾氣暴躁，說話傷人，挑剚，要求高，喜歡挑毛病，適合做短平快的業務，性子急，沒耐心，招病，不適合和人合作，容易得罪人。</p>';
  h+='<p><strong>常見疾病：</strong>皮炎、咽炎、呼吸系統疾病</p>';
  h+='<p><strong>嚴重情況：</strong>容易有血光之災，如開刀、動手術、車禍</p>';
  h+='<p><strong>女性注意：</strong>容易有流產、小產的風險；進入生育期的女性，後四位尤其是結尾，不要配置禍害磁場</p>';
  if(HUOHAI_GRADE[tail]) h+='<p><strong>此組尾號：</strong>'+HUOHAI_GRADE[tail]+'</p>';
  return h+'</div>';
 }
 function paint(){
  if((window.currentKind||(typeof currentKind!=='undefined'?currentKind:''))!=='phone')return;
  var box=document.getElementById('kindReadBox');
  if(!box)return;
  if(box.querySelector('[data-tail-xing]'))return;
  var d=digits();
  if(!d||d.length<2)return;
  var tail=d.slice(-2);
  var html='';
  if(LIUSHA[tail]) html=cardLiusha(tail);
  else if(HUOHAI[tail]) html=cardHuohai(tail);
  if(html) box.insertAdjacentHTML('beforeend',html);
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__tailLiusha)return;
  var w=function(){impl();setTimeout(paint,160);};
  w.__tailLiusha=true;
  w.__copyWrapped=impl.__copyWrapped;
  w.__storyWrapped=impl.__storyWrapped;
  w.__expWrapped=impl.__expWrapped;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
