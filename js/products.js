var IMG={
  "mango-coast": "assets/images/products/mango-coast.jpg",
  "papaya-dawn": "assets/images/products/papaya-dawn.jpg",
  "papaya-island": "assets/images/products/papaya-island.jpg",
  "peach-mango": "assets/images/products/peach-mango.jpg",
  "pitaya-passion": "assets/images/products/pitaya-passion.jpg",
  "pitaya-sunrise": "assets/images/products/pitaya-sunrise.jpg",
  "sunny-pineapple": "assets/images/products/sunny-pineapple.jpg",
  "signature": "assets/images/products/signature.jpg",
  "tropical-passion": "assets/images/products/tropical-passion.jpg"
};
var P=[
{id:"peach-mango",n:"Peach Mango Glow",short:"Peach Mango",fx:["peach","oval"],c1:"#ff9a4a",bg:"#ffe6d2",d:"Juicy peach meets sweet mango over a fresh orange base. Soft, fruity and easy to love.",ing:["Orange","Peach","Mango","Peach purée","Peach flavor"]},
{id:"mango-coast",n:"Mango Coast",short:"Mango Coast",fx:["oval","pine"],c1:"#ffc21a",bg:"#fff4c9",d:"Sunny mango and pineapple with a creamy piña colada note. A beach-day favorite.",ing:["Orange","Mango","Pineapple","Mango purée","Piña colada flavor"]},
{id:"pitaya-passion",n:"Pitaya Passion",short:"Pitaya Passion",fx:["drag","pass","oval"],c1:"#e63f8f",bg:"#fde0ee",d:"Vibrant dragon fruit and bold passion fruit, balanced with mango and orange. Bright in color, brighter in taste.",ing:["Orange","Dragon fruit","Mango","Passion fruit purée","Passion fruit flavor"]},
{id:"papaya-dawn",n:"Papaya Dawn",short:"Papaya Dawn",fx:["papaya","oval","peach"],c1:"#ff7a2f",bg:"#ffe3d0",d:"Ripe papaya and mango with a touch of peach. Warm, smooth and naturally golden.",ing:["Orange","Papaya","Mango","Peach","Peach purée","Peach flavor"]},
{id:"sunny-pineapple",n:"Sunny Pineapple",short:"Sunny Pineapple",fx:["pine","peach"],c1:"#ffd83a",bg:"#fff8c9",d:"Golden pineapple and peach with a piña colada twist. Tangy, juicy and refreshing.",ing:["Orange","Pineapple","Peach","Pineapple purée","Piña colada flavor"]},
{id:"signature",n:"Thropican Signature",short:"Signature",fx:["oval","drag","pine"],c1:"#ff8a00",bg:"#ffe9c7",d:"Our signature: mango, dragon fruit and pineapple with passion fruit and a piña colada finish. The full tropical experience.",ing:["Orange","Mango","Dragon fruit","Pineapple","Passion fruit purée","Piña colada flavor"]},
{id:"pitaya-sunrise",n:"Pitaya Sunrise",short:"Pitaya Sunrise",fx:["drag","pass","peach"],c1:"#d6328a",bg:"#fbd9ec",d:"Dragon fruit and peach with a passion fruit lift. A sunrise in a glass.",ing:["Orange","Dragon fruit","Peach","Peach purée","Passion fruit flavor"]},
{id:"papaya-island",n:"Papaya Island",short:"Papaya Island",fx:["papaya","pine"],c1:"#ff9a1f",bg:"#ffe8c4",d:"Papaya and pineapple with a smooth piña colada note. Easygoing and tropical.",ing:["Orange","Papaya","Pineapple","Pineapple purée","Piña colada flavor"]},
{id:"tropical-passion",n:"Tropical Passion",short:"Tropical Passion",fx:["oval","papaya","pine"],c1:"#ffb300",bg:"#fff0c2",d:"Mango, papaya and pineapple topped with passion fruit. All the tropics in one sip.",ing:["Orange","Mango","Papaya","Pineapple","Passion fruit purée","Passion fruit flavor"]}
];
var FC={oval:["#ffb300","#ff7a00"],pine:["#ffd83a","#c98a00"],pass:["#ff9a1f","#7a1f5c"],peach:["#ffa07a","#e8553a"],drag:["#e91e8c","#fff"],papaya:["#ff8a3d","#b84a00"]};
function fr(k,x,y,z){
  var c=FC[k],c1=c[0],c2=c[1],g='';
  if(k==="oval")g='<ellipse rx="26" ry="36" fill="'+c1+'" transform="rotate(-22)"/><ellipse cx="-9" cy="-10" rx="7" ry="13" fill="#fff" fill-opacity=".35" transform="rotate(-22)"/><path d="M4-34c10-14 26-12 30-6-10 4-20 8-30 6z" fill="#2e8b3a"/>';
  else if(k==="pine")g='<ellipse rx="26" ry="34" fill="'+c1+'"/><path d="M-20-16l40 32M-24 0l36 28M-10-28l34 30M20-16l-40 32M24 0l-36 28M10-28l-34 30" stroke="'+c2+'" stroke-width="2.5" opacity=".6"/><path d="M0-34l-14-24 14 8 14-8z M0-34l-24-12 22 2z M0-34l24-12-22 2z" fill="#2e8b3a"/>';
  else if(k==="pass")g='<circle r="32" fill="'+c2+'"/><circle r="23" fill="'+c1+'"/><g fill="#5a3a00"><circle cx="-8" cy="-6" r="3"/><circle cx="6" cy="-9" r="3"/><circle cx="0" cy="3" r="3"/><circle cx="-10" cy="9" r="3"/><circle cx="9" cy="8" r="3"/></g>';
  else if(k==="peach")g='<circle r="30" fill="'+c1+'"/><path d="M0-28c-9 14-9 40 0 56" fill="none" stroke="'+c2+'" stroke-width="3" opacity=".6"/><circle cx="-10" cy="-10" r="7" fill="#fff" fill-opacity=".35"/><path d="M2-29c8-14 24-14 28-8-9 4-18 9-28 8z" fill="#2e8b3a"/>';
  else if(k==="drag")g='<path d="M-30-4l-16-12 14 20zM30-4l16-12-14 20z" fill="#2e8b3a"/><ellipse rx="30" ry="34" fill="'+c1+'"/><ellipse rx="22" ry="26" fill="#fff"/><g fill="#222"><circle cx="-8" cy="-8" r="1.8"/><circle cx="6" cy="-12" r="1.8"/><circle cx="0" cy="2" r="1.8"/><circle cx="-12" cy="8" r="1.8"/><circle cx="10" cy="6" r="1.8"/><circle cx="-2" cy="14" r="1.8"/></g>';
  else g='<ellipse rx="24" ry="36" fill="'+c1+'" transform="rotate(25)"/><ellipse rx="14" ry="26" fill="'+c2+'" opacity=".7" transform="rotate(25)"/><g fill="#222" transform="rotate(25)"><circle cx="-4" cy="-10" r="2.4"/><circle cx="4" cy="-4" r="2.4"/><circle cx="-3" cy="3" r="2.4"/><circle cx="4" cy="10" r="2.4"/><circle cx="-2" cy="15" r="2.4"/></g>';
  return '<g transform="translate('+x+' '+y+') scale('+z+')">'+g+'</g>';
}
function art(p){
  var pos=[[62,218,1.1],[238,232,.88],[70,112,.62]],a='';
  p.fx.forEach(function(k,i){a+=fr(k,pos[i][0],pos[i][1],pos[i][2])});
  var lab=p.short.length>9?p.short.split(" "):[p.short];
  var t='';lab.forEach(function(w,i){t+='<text x="150" y="'+(196+i*13)+'" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" font-size="12" fill="#0b3d0b">'+w+'</text>'});
  return '<svg viewBox="0 0 300 300" role="img" aria-label="'+p.n+' sample illustration" preserveAspectRatio="xMidYMid meet"><rect width="300" height="300" rx="16" fill="'+p.bg+'"/>'+a+
   '<rect x="126" y="40" width="48" height="24" rx="6" fill="#0b3d0b"/><path d="M130 64h40v34c0 10 24 16 24 44v118c0 8-6 12-12 12h-64c-6 0-12-4-12-12V142c0-28 24-34 24-44z" fill="'+p.c1+'" stroke="#0b3d0b" stroke-width="3"/>'+
   '<path d="M118 150v100" stroke="#fff" stroke-opacity=".4" stroke-width="7" stroke-linecap="round"/><rect x="118" y="172" width="64" height="58" rx="8" fill="#fff" fill-opacity=".93"/>'+t+
   '<text x="150" y="'+(lab.length>1?224:214)+'" text-anchor="middle" font-family="system-ui,sans-serif" font-size="7" letter-spacing="1" fill="#e8730c">THROPICAN</text></svg>';
}
var $=function(i){return document.getElementById(i)},list=$("list"),jump=$("jump"),toast=$("toast"),tt;
var calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
function say(m){toast.textContent=m;toast.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove("on")},2600)}
function go(id){var el=$(id);if(el)el.scrollIntoView({behavior:calm?"auto":"smooth",block:"start"})}
P.forEach(function(p){
  var rating=p.r?'<div class="stars" aria-label="Rated '+p.r+' out of 5">★★★★★<small>'+p.r+' ('+p.c+')</small></div>':'';
  var sizes='<p><strong>Size:</strong> 400 ml</p>';
  var row=document.createElement("article");row.className="prod";row.id=p.id;
  row.innerHTML='<div class="pic" style="background:'+p.bg+'">'+'<img src="'+IMG[p.id]+'" alt="'+p.n+'" width="720" height="819" loading="lazy"></div>'+
   '<div><h3>'+p.n+'</h3>'+rating+'<p>'+p.d+'</p>'+sizes+
   '<details class="nf"><summary>Show Ingredients</summary><ul class="ing"><li>'+p.ing.join('</li><li>')+'</li></ul></details>'+
   '<button class="shop" type="button" data-add="'+p.id+'" data-name="'+p.n+'">Shop Now</button></div>';
  list.appendChild(row);
  var li=document.createElement("li");li.innerHTML='<a href="#'+p.id+'" data-go="'+p.id+'">'+p.short+'</a>';jump.appendChild(li);
});
list.addEventListener("toggle",function(e){var s=e.target.querySelector&&e.target.querySelector("summary");if(s)s.textContent=e.target.open?"Hide Ingredients":"Show Ingredients"},true);
$("blendArt").innerHTML='<img src="'+IMG.signature+'" alt="Thropican Signature" width="720" height="819">';
var dds=document.querySelectorAll(".dd");
function closeDD(){dds.forEach(function(d){d.classList.remove("open");d.firstElementChild.setAttribute("aria-expanded","false")})}
document.addEventListener("click",function(e){
  var b=e.target.closest(".dd>button");
  if(b){var d=b.parentNode,was=d.classList.contains("open");closeDD();if(!was){d.classList.add("open");b.setAttribute("aria-expanded","true")}return}
  if(!e.target.closest(".dd"))closeDD();
  var g=e.target.closest("[data-go]");
  if(g){e.preventDefault();go(g.dataset.go);return}
  var a=e.target.closest("[data-soon]");
  if(a){e.preventDefault();closeDD();say("“"+a.dataset.soon.replace(/&amp;/g,"&")+"” is a placeholder link in this preview.")}
});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeDD()});
// highlight current section in pill nav and jump chips
var navA=document.querySelectorAll(".pillnav a"),chips=jump.querySelectorAll("a");
function spy(){
  var y=window.scrollY+140,cur="home";
  ["home","make","products","classic"].forEach(function(id){if($(id)&&$(id).getBoundingClientRect().top+window.scrollY<=y)cur=id});
  // order on page: home, story, recipes, products
  var order=["classic","products","make","home"];cur="home";
  for(var i=0;i<order.length;i++){if($(order[i]).getBoundingClientRect().top+window.scrollY<=y){cur=order[i];break}}
  navA.forEach(function(a){a.classList.toggle("on",a.dataset.go===cur)});
  var pc=null;P.forEach(function(p){if($(p.id).getBoundingClientRect().top+window.scrollY<=y+200)pc=p.id});
  chips.forEach(function(a){a.classList.toggle("on",a.dataset.go===pc)});
}
var spyT=0;addEventListener("scroll",function(){if(spyT)return;spyT=requestAnimationFrame(function(){spyT=0;spy()})},{passive:true});spy();
// newsletter dialog
var d=$("dlg");
$("open").onclick=function(){d.showModal();$("em").focus()};
$("close").onclick=function(){d.close()};
d.addEventListener("click",function(e){if(e.target===d)d.close()});
$("f").onsubmit=function(e){e.preventDefault();d.close();$("f").reset();say("Thanks! You’re signed up for updates.")};
