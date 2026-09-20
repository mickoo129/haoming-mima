(function(){
 var PAIRS={'16':1,'61':1,'47':1,'74':1,'38':1,'83':1,'29':1,'92':1};
 var GRADE={'16':'16 桃花，外遇','74':'74 異性知己','38':'38 人際關係好','29':'29 身邊的人對他都有好感'};
 function digits(){
  var el=document.getElementById('numInput');
  return el?((el.value.match(/\d/g)||[]).join('')):'';
 }
 function paint(){
  if((window.currentKind||(typeof currentKind!=='undefined'?currentKind:''))!=='phone')return;
  var box=document.getElementById('kindReadBox');
  if(!box)return;
  if(box.querySelector('[data-tail-liusha]'))return;
  var d=digits();
  if(!d||d.length<2)return;
  var tail=d.slice(-2);
  if(!PAIRS[tail])return;
  var h='<div class="hl-resolve" data-tail-liusha="1" style="margin-top:10px">';
  h+='<p><strong>筆記：手機尾號性格（六煞）</strong>（16、47、38、29）</p>';
  h+='<p><strong>關鍵詞：</strong>桃花，人際，騙財，優豫不決，自戀</p>';
  h+='<p><strong>尾2位特徵：</strong>異性緣好，桃花旺，異性貴人多，容易犯桃花，性格優豫不決，徘徊，舉棋不定，容易受到外界的影響和干擾，愛打扮，喜歡消費，男士比較有氣質，女士比較有魅力，喜歡照鏡子。</p>';
  h+='<p><strong>注意：</strong>男性要注意生殖泌尿系統，女性注意婦科子宮乳腺</p>';
  if(GRADE[tail]) h+='<p><strong>此組尾號：</strong>'+GRADE[tail]+'</p>';
  h+='</div>';
  box.insertAdjacentHTML('beforeend',h);
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
