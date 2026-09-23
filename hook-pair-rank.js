(function(){
 var PTS={4:100,3:75,2:50,1:25};
 var POWER={'14':4,'41':4,'67':3,'76':3,'39':2,'93':2,'28':1,'82':1,'13':4,'31':4,'68':3,'86':3,'49':2,'94':2,'27':1,'72':1,'19':4,'91':4,'78':3,'87':3,'34':2,'43':2,'26':1,'62':1,'11':4,'22':4,'99':3,'88':3,'66':2,'77':2,'33':1,'44':1,'16':4,'61':4,'47':3,'74':3,'38':2,'83':2,'29':1,'92':1,'17':4,'71':4,'89':3,'98':3,'46':2,'64':2,'23':1,'32':1,'18':4,'81':4,'79':3,'97':3,'36':2,'63':2,'24':1,'42':1,'12':4,'21':4,'69':3,'96':3,'48':2,'84':2,'37':1,'73':1};
 var GRADE={4:'最強',3:'次強',2:'次弱',1:'最弱'};
 function shortRank(f){
  if(!f)return '';
  if(f.rank){
   if(f.rank.indexOf('大吉')>=0)return '大吉';
   if(f.rank.indexOf('小吉')>=0)return '小吉';
   if(f.rank.indexOf('大凶')>=0)return '大凶';
   if(f.rank.indexOf('小凶')>=0)return '小凶';
  }
  if(f.pol==='吉')return '吉';
  if(f.pol==='凶')return '凶';
  return '平';
 }
 function rawPair(disp){
  var d=((disp||'').match(/\d/g)||[]).join('');
  var core=d.replace(/[05]/g,'');
  if(core.length>=2)return core.charAt(0)+core.charAt(core.length-1);
  if(d.length>=2)return d.slice(0,2);
  return '';
 }
 function paint(){
  var flow=document.getElementById('pairFlow');
  if(!flow||typeof FIELDS==='undefined')return;
  flow.querySelectorAll('.pair-row').forEach(function(row){
   if(row.getAttribute('data-pts'))return;
   var strong=row.querySelector('strong');
   if(!strong)return;
   var name=(strong.textContent||'').trim();
   var k='';
   Object.keys(FIELDS).forEach(function(x){if(FIELDS[x].name===name)k=x;});
   if(!k)return;
   var f=FIELDS[k];
   var pol=f.pol==='平'?'平':(f.pol+'星');
   var rank=shortRank(f);
   var extra=f.rank&&f.rank.indexOf('依附')>=0?'（依附）':'';
   var box=row.querySelector('.pair-box');
   var pair=rawPair(box?box.textContent:'');
   var lv=POWER[pair]||0;
   var pts=lv?PTS[lv]:0;
   var grade=lv?GRADE[lv]:'';
   var muted=row.querySelector('.muted');
   var note='';
   if(muted){
    var t=muted.textContent||'';
    var m=t.match(/（(.+)）/);
    if(m && t.indexOf('分')<0)note=m[1];
   }
   var html='<span class="muted">'+pol+' · <strong>'+rank+extra+'</strong>';
   if(pts)html+=' · '+pts+'分（'+grade+'）';
   html+='</span>';
   if(note)html+=' <span class="muted">（'+note+'）</span>';
   if(muted) muted.outerHTML=html;
   else row.insertAdjacentHTML('beforeend',' '+html);
   row.setAttribute('data-pts','1');
   row.setAttribute('data-rank','1');
  });
 }
 var n=0;
 function wrap(){
  var impl=window.analyze;
  if(!impl){if(n++<40)setTimeout(wrap,80);return;}
  if(impl.__pairRank)return;
  var w=function(){impl();setTimeout(paint,80);setTimeout(paint,220);};
  w.__pairRank=true;
  w.__storyWrapped=impl.__storyWrapped;
  w.__copyWrapped=impl.__copyWrapped;
  window.analyze=w;
  window.hmAnalyze=function(){window.analyze();return false;};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(wrap,0);});
 else setTimeout(wrap,0);
})();
