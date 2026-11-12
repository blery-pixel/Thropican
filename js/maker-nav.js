(function(){
var F=[["Mango", "🥭", "#ffb300"], ["Pineapple", "🍍", "#ffe14d"], ["Orange", "🍊", "#ff8c1a"], ["Papaya", "🧡", "#ff7a45"], ["Passion Fruit", "🌸", "#f7a21b"], ["Dragon Fruit", "🐉", "#e0397a"], ["Peach", "🍑", "#ffa07a"], ["Strawberry", "🍓", "#e63950"], ["Banana", "🍌", "#f5e08a"], ["Kiwi", "🥝", "#8bc34a"], ["Avocado", "🥑", "#a5c85a"], ["Lemon", "🍋", "#fff176"]],sel=[],sweet="Light",ice=true;
var $=function(i){return document.getElementById(i)},box=$("mkFruits"),liq=$("mkLiq"),icg=$("mkIce"),nm=$("mkName"),toast=$("toast"),tt;
function say(m){toast.textContent=m;toast.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove("on")},2600)}
F.forEach(function(f,i){var b=document.createElement("button");b.type="button";b.className="fchip";b.setAttribute("aria-pressed","false");b.textContent=f[0];
  b.onclick=function(){var k=sel.indexOf(i);if(k>-1)sel.splice(k,1);else if(sel.length>=3){say("Up to 3 fruits. Tap one to remove it.");return}else sel.push(i);draw()};box.appendChild(b)});
function shade(hx,f){var n=parseInt(hx.slice(1),16);function m(c){return Math.max(0,Math.min(255,Math.round(c*(1+f))))}return"#"+((1<<24)+(m(n>>16)<<16)+(m(n>>8&255)<<8)+m(n&255)).toString(16).slice(1)}
function band(y,c,d){return '<path class="wv" style="animation-delay:'+d+'s" d="M-100 '+y+' q25 -5 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 V330 H-100Z" fill="'+c+'"/>'}
var CH=[[86,80,-12],[102,74,10],[118,78,-6],[136,72,14],[152,80,-10],[110,86,6],[130,86,-14]];
function draw(){
  var n=sel.length,yTop=112,yBot=306,seg=(yBot-yTop)/Math.max(n,1),gr="",out="",tp="",j;
  for(j=n-1;j>=0;j--){var c=F[sel[j]][2];
    gr+='<linearGradient id="mkg'+j+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+shade(c,.12)+'"/><stop offset="1" stop-color="'+shade(c,-.22)+'"/></linearGradient>';
    out+=band(yBot-seg*(j+1),"url(#mkg"+j+")",-j*.8)}
  $("mkGrads").innerHTML=gr;liq.innerHTML=out;
  icg.innerHTML=ice&&n?'<g transform="rotate(-14 84 130)"><rect x="70" y="116" width="28" height="28" rx="7" fill="#fff" fill-opacity=".4" stroke="#fff" stroke-opacity=".75" stroke-width="1.5"/><path d="M75 122h9" stroke="#fff" stroke-opacity=".9" stroke-width="2" stroke-linecap="round"/></g><g transform="rotate(12 124 134)"><rect x="110" y="122" width="26" height="26" rx="7" fill="#fff" fill-opacity=".32" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/><path d="M115 128h8" stroke="#fff" stroke-opacity=".9" stroke-width="2" stroke-linecap="round"/></g><g transform="rotate(-6 154 128)"><rect x="142" y="114" width="24" height="24" rx="6" fill="#fff" fill-opacity=".36" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/></g>':"";
  if(n){CH.forEach(function(k,i){var cc=F[sel[i%n]][2];tp+='<rect x="'+(k[0]-9)+'" y="'+(k[1]-9)+'" width="18" height="18" rx="4" fill="'+cc+'" stroke="'+shade(cc,-.25)+'" stroke-width="1.2" transform="rotate('+k[2]+' '+k[0]+' '+k[1]+')"/>'});
    tp+='<path d="M122 72c-10-14-26-10-28-4 8 6 18 8 28 4z" fill="#2e8b3a"/><path d="M122 72c10-14 26-10 28-4-8 6-18 8-28 4z" fill="#3aa04a"/>'}
  $("mkTop").innerHTML=tp;
  [].forEach.call(box.children,function(b,i){b.setAttribute("aria-pressed",sel.indexOf(i)>-1?"true":"false")});
  nm.textContent=!n?"Pick your fruits":n===1?"Pure "+F[sel[0]][0]:sel.map(function(i){return F[i][0]}).join(" + ");sum();
}
function sum(){var n=sel.length;$("mkSum").innerHTML='<h3>Your blend</h3><dl><dt>Fruits</dt><dd>'+(n?sel.map(function(i){return'<span class="dot" style="background:'+F[i][2]+'"></span>'+F[i][0]}).join("<br>"):"None yet")+'</dd><dt>Size</dt><dd>400 ml</dd><dt>Sweetness</dt><dd>'+sweet+'</dd><dt>Ice</dt><dd>'+(ice?"With ice":"No ice")+'</dd></dl>'}
function seg(id,cb){var g=$(id);[].forEach.call(g.children,function(b){b.onclick=function(){[].forEach.call(g.children,function(x){x.setAttribute("aria-pressed","false")});b.setAttribute("aria-pressed","true");cb(b.textContent)}})}
seg("mkSweet",function(v){sweet=v;sum()});seg("mkIceSel",function(v){ice=v==="With ice";draw()});
$("mkAdd").onclick=function(){if(!sel.length){say("Pick at least one fruit first.");return}Cart.add({key:"m:"+nm.textContent+"|"+sweet+"|"+(ice?1:0),name:"Custom: "+nm.textContent,sub:sweet+", "+(ice?"with ice":"no ice")+" \u00b7 400 ml",price:Cart.PRICE.blend},true)};
var lg=document.querySelector(".hlogo"),wd=document.querySelector(".hword");if(lg)$("cupLogo").setAttribute("href",lg.src);if(wd)$("cupWord").setAttribute("href",wd.src);
draw();
})();
