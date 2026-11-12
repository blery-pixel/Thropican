(function(){
var PRICE={tropics:35,blend:30};          /* sample prices in DH, change freely */
var WHATSAPP="";                           /* your number with country code, e.g. "2126XXXXXXXX", to receive orders */
var KEY="thr_cart_v1",items=[],last=null,doneOn=false,opener=null,ord=null,raf=0;
try{items=JSON.parse(localStorage.getItem(KEY)||"[]")||[]}catch(e){items=[]}
try{ord=JSON.parse(localStorage.getItem("thr_order_v1")||"null")}catch(e){ord=null}
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function find(k){for(var i=0;i<items.length;i++)if(items[i].key===k)return items[i]}
function count(){return items.reduce(function(n,i){return n+i.qty},0)}
function total(){return items.reduce(function(t,i){return t+i.qty*i.price},0)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(items))}catch(e){}}
$("site").insertAdjacentHTML("beforeend",`
<button class="fab" id="cartFab" type="button" aria-label="Open basket"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span class="fabn" id="cartCount" hidden>0</span></button>
<div class="scrim" id="cartScrim"></div>
<aside class="cpanel" id="cartPanel" role="dialog" aria-modal="true" aria-labelledby="cartTitle" aria-hidden="true">
  <header class="chead"><h2 id="cartTitle">Your basket</h2><button type="button" id="cartClose" class="cclose" aria-label="Close basket">&times;</button></header>
  <div class="cbody">
    <div id="cList"></div>
    <form id="cForm" novalidate>
      <label>Name<input id="cName" autocomplete="name"></label>
      <label>Phone<input id="cPhone" type="tel" inputmode="tel" autocomplete="tel"></label>
      <fieldset><legend>Get it</legend><label class="rd"><input type="radio" name="cWay" value="Pickup" checked> Pickup</label><label class="rd"><input type="radio" name="cWay" value="Delivery"> Delivery</label></fieldset>
      <label id="cAddrL" hidden>Delivery address<input id="cAddr" autocomplete="street-address"></label>
      <fieldset id="cPayF" hidden><legend>Payment</legend><label class="rd"><input type="radio" name="cPay" value="Cash" checked> Cash on delivery</label><label class="rd"><input type="radio" name="cPay" value="Card"> Card (pay by QR)</label></fieldset>
      <label>Notes (optional)<textarea id="cNote" rows="2"></textarea></label>
      <p class="sm">Pay on pickup or delivery.</p>
      <div class="ctot"><span>Total</span><b id="cTot">0 DH</b></div>
      <p class="cerr" id="cErr" role="alert"></p>
      <button class="shop cplace" type="submit" id="cPlace">Place order</button>
    </form>
    <div id="cDone" hidden></div>
  </div>
</aside>`);
var ul=document.querySelector(".menu"),txt=$("cartTxt");
function bump(){var f=$("cartFab");f.classList.remove("bump");void f.offsetWidth;f.classList.add("bump")}
function renderList(){
  var L=$("cList"),F=$("cForm");
  L.hidden=doneOn;
  if(!items.length){L.innerHTML='<div class="cempty"><p><b>Your basket is empty.</b></p><p class="sm">Add juices with + in Classic, or tap Shop Now on a Tropics juice.</p><button class="shop" type="button" id="cBrowse">Browse the menu</button>'+(ord?'<p><button class="btn2" type="button" id="cTrack">Track my order</button></p>':'')+'</div>';F.hidden=true}
  else{L.innerHTML='<ul class="cl2">'+items.map(function(it){return'<li data-k="'+esc(it.key)+'"><div class="ci"><b>'+esc(it.name)+'</b>'+(it.sub?'<small>'+esc(it.sub)+'</small>':'')+'</div><div class="cq"><button type="button" data-a="dec" aria-label="Remove one">&minus;</button><span>'+it.qty+'</span><button type="button" data-a="inc" aria-label="Add one">+</button></div><b class="cp">'+it.qty*it.price+' DH</b><button type="button" class="cx" data-a="rm" aria-label="Remove '+esc(it.name)+'">&times;</button></li>'}).join("")+'</ul>';F.hidden=doneOn}
  $("cTot").textContent=total()+" DH";$("cPlace").textContent="Place order \u00b7 "+total()+" DH"}
function classic(){
  [].forEach.call(ul.children,function(li){var f=find("c:"+li.dataset.n),k=f?f.qty:0;li.classList.toggle("has",k>0);li.querySelector("em").textContent=k});
  var n=count();txt.textContent=n?n+" item"+(n>1?"s":"")+" in your basket \u2014 total "+total()+" DH":"Tap + to add juices to your basket."}
function changed(){$("cartFab").classList.toggle("live",!!ord);save();var n=count(),c=$("cartCount");c.textContent=n;c.hidden=!n;renderList();classic()}
function add(it,openNow){var f=find(it.key);if(f)f.qty++;else{it.qty=1;items.push(it)}changed();if(openNow)open();else bump()}
function dec(k){var f=find(k);if(!f)return;f.qty--;if(f.qty<=0)items.splice(items.indexOf(f),1);changed()}
function open(from){
  opener=from||document.activeElement;$("cartScrim").classList.add("on");var p=$("cartPanel");p.classList.add("on");p.setAttribute("aria-hidden","false");
  document.documentElement.style.overflow="hidden";setTimeout(function(){$("cartClose").focus()},60)}
function close(){
  stopT();doneOn=false;$("cDone").hidden=true;renderList();$("cartScrim").classList.remove("on");var p=$("cartPanel");p.classList.remove("on");p.setAttribute("aria-hidden","true");
  document.documentElement.style.overflow="";if(opener&&opener.focus)opener.focus()}
function orderText(o){return"Thropican order #"+o.id+"\n"+o.items.map(function(i){return i.qty+" x "+i.name+(i.sub?" ("+i.sub+")":"")+" - "+i.qty*i.price+" DH"}).join("\n")+"\nTotal: "+o.total+" DH\n"+o.way+(o.way==="Delivery"?": "+o.addr:"")+(o.pay?"\nPayment: "+(o.pay==="Card"?"Card, code "+o.code:"Cash on delivery"):"")+"\nName: "+o.name+"\nPhone: "+o.phone+(o.note?"\nNotes: "+o.note:"")}
function renderDone(){
  var o=last,wa=WHATSAPP?"https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(orderText(o)):"";
  $("cDone").innerHTML='<div class="cok"><div class="tick" aria-hidden="true">\u2713</div><h3>Thank you, '+esc(o.name)+'!</h3><p>Your order <b>#'+o.id+'</b></p><ul class="cl2 small">'+o.items.map(function(i){return'<li><div class="ci"><b>'+i.qty+' \u00d7 '+esc(i.name)+'</b>'+(i.sub?'<small>'+esc(i.sub)+'</small>':'')+'</div><b class="cp">'+i.qty*i.price+' DH</b></li>'}).join("")+'</ul><div class="ctot"><span>Total</span><b>'+o.total+' DH</b></div><p class="sm">'+(o.way==="Delivery"?"Delivery to: "+esc(o.addr):"Pickup at the stand")+' \u00b7 Pay on '+o.way.toLowerCase()+'.</p>'+(wa?'':'<p class="sm">Preview: this order is not sent anywhere yet. Connect WhatsApp or email to receive orders.</p>')+'<div class="cact">'+(wa?'<a class="shop" href="'+wa+'" target="_blank" rel="noopener">Send on WhatsApp</a>':'')+'<button class="btn2" type="button" id="cCopy">Copy order</button><button class="btn2" type="button" id="cDoneClose">Done</button></div></div>';
  $("cDone").hidden=false}
$("cList").addEventListener("click",function(e){
  var b=e.target.closest("button");if(!b)return;
  if(b.id==="cTrack"){showTrack();return}
  if(b.id==="cBrowse"){close();var c=$("classic");if(c)c.scrollIntoView({behavior:"smooth"});return}
  var li=b.closest("li");if(!li)return;var k=li.dataset.k,a=b.dataset.a;
  if(a==="inc"){var f=find(k);if(f){f.qty++;changed()}}else if(a==="dec")dec(k);else if(a==="rm"){var g=find(k);if(g){items.splice(items.indexOf(g),1);changed()}}});
$("cDone").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
  if(b.id==="cDoneClose"){last=null;close()}
  if(b.id==="cCopy"){var t=orderText(last);if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){say("Order copied.")},function(){say("Couldn\u2019t copy. Select and copy it manually.")})}else say("Couldn\u2019t copy. Select and copy it manually.")}});
[].forEach.call(document.querySelectorAll('input[name="cWay"]'),function(r){r.onchange=function(){var dl=document.querySelector('input[name="cWay"]:checked').value==="Delivery";$("cAddrL").hidden=!dl;$("cPayF").hidden=!dl}});
$("cForm").addEventListener("submit",function(e){
  e.preventDefault();var name=$("cName").value.trim(),phone=$("cPhone").value.trim(),way=document.querySelector('input[name="cWay"]:checked').value,addr=$("cAddr").value.trim(),pay=(document.querySelector('input[name="cPay"]:checked')||{}).value||"Cash",err=$("cErr");
  if(!items.length){err.textContent="Your basket is empty.";return}
  if(!name){err.textContent="Please enter your name.";$("cName").focus();return}
  if(phone.replace(/\D/g,"").length<8){err.textContent="Please enter a valid phone number.";$("cPhone").focus();return}
  if(way==="Delivery"&&!addr){err.textContent="Please enter your delivery address.";$("cAddr").focus();return}
  err.textContent="";
  last={id:"T-"+(1000+Math.floor(Math.random()*9000)),items:items.map(function(i){return{name:i.name,sub:i.sub,qty:i.qty,price:i.price}}),total:total(),name:name,phone:phone,way:way,addr:addr,note:$("cNote").value.trim()};
  doneOn=true;items=[];last.t0=Date.now();if(way==="Delivery"){last.pay=pay;if(pay==="Card"){last.code=payCode();last.qr=payPayload(last)}ord={o:last,t0:last.t0,paid:false};saveOrd();changed();showTrack()}else{changed();renderDone()}$("cartPanel").querySelector(".cbody").scrollTop=0});
var PATH="M30 110 C 90 20, 150 140, 200 80 S 320 20, 370 90",SN=["Order received","Preparing your juices","Out for delivery","Delivered. Enjoy!"],TD=45,ETA=25;
function saveOrd(){try{if(ord)localStorage.setItem("thr_order_v1",JSON.stringify(ord));else localStorage.removeItem("thr_order_v1")}catch(e){}}
function stage(e){return e<5?0:e<15?1:e<TD?2:3}
function prog(e){return e<15?0:Math.min((e-15)/(TD-15),1)}
function stopT(){cancelAnimationFrame(raf);raf=0}
var PAY_URL="";   /* your payment page link (CMI, Stripe, PayPal...). Empty = demo QR with plain text */
function payCode(){var a="ABCDEFGHJKMNPQRSTUVWXYZ23456789",r=new Uint8Array(8),s="",i;(window.crypto||{getRandomValues:function(x){for(var k=0;k<x.length;k++)x[k]=Math.random()*256}}).getRandomValues(r);for(i=0;i<8;i++){s+=a[r[i]%a.length];if(i===3)s+="-"}return"PAY-"+s}
function payPayload(o){var q="order="+o.id+"&code="+o.code+"&amount="+o.total+"&currency=MAD";return PAY_URL?PAY_URL+(PAY_URL.indexOf("?")>-1?"&":"?")+q:"THROPICAN-PAY|"+q}
function copyTxt(t,msg){if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){say(msg)},function(){say("Couldn\u2019t copy.")})}else say("Couldn\u2019t copy.")}
function ticketHTML(o){
  if(o.pay==="Card")return'<div class="ticket"><div class="tkh"><b>Payment ticket</b><span class="chip" id="tChip">Waiting for payment</span></div><div class="tkb"><div class="qr" id="tQr">'+qrSvg(o.qr)+'</div><div class="tki"><p class="sm" style="margin:0">Pay by card: scan the QR with your banking app, or use this code.</p><p class="code" id="tCode">'+esc(o.code)+'</p><p class="amt">'+o.total+' DH</p><div class="cact" style="justify-content:flex-start;margin-top:8px"><button class="btn2 sm2" type="button" id="tCodeCopy">Copy code</button><button class="btn2 sm2" type="button" id="tSim">Simulate payment (demo)</button></div></div></div></div>';
  return'<div class="ticket"><div class="tkh"><b>Cash on delivery</b></div><p style="margin:6px 0 0">Please have <b>'+o.total+' DH</b> ready for the courier.</p></div>'}
function payUI(){if(!ord||ord.o.pay!=="Card")return;var c=$("tChip"),q=$("tQr"),s=$("tSim");if(!c)return;c.textContent=ord.paid?"Paid \u2713":"Waiting for payment";c.classList.toggle("ok",!!ord.paid);q.classList.toggle("paid",!!ord.paid);if(s)s.hidden=!!ord.paid}
function trackHTML(o){
  return'<div class="trk"><p class="sm" style="margin:6px 0 0">Order <b>#'+o.id+'</b> \u00b7 Delivery</p><h3 id="tStatus">'+SN[0]+'</h3><p class="trketa" id="tEta"></p>'
  +'<svg class="road" viewBox="0 0 400 150" role="img" aria-label="Delivery route from the stand to your address"><path id="tRoad" d="'+PATH+'" fill="none" stroke="#3a2a1e" stroke-width="18" stroke-linecap="round"/><path d="'+PATH+'" fill="none" stroke="#6b5645" stroke-width="13" stroke-linecap="round"/><path d="'+PATH+'" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="1.8" stroke-dasharray="6 9"/><path id="tTrail" d="'+PATH+'" fill="none" stroke="#ff9f1c" stroke-width="4.5" stroke-linecap="round"/>'
  +'<g transform="translate(30 110)"><rect x="-13" y="-8" width="26" height="18" rx="3" fill="#ff9f1c"/><path d="M-17 -8L0 -22L17 -8Z" fill="#2b1d12"/><rect x="-4" y="0" width="8" height="10" fill="#fff"/></g><text x="30" y="136" text-anchor="middle" font-size="11" font-weight="700" fill="#2b1d12">Stand</text>'
  +'<g transform="translate(370 90)"><circle class="pin" r="20" fill="none" stroke="#e63946" stroke-width="2"/><path d="M-14 4L0 -14L14 4V16H-14Z" fill="#fff" stroke="#2b1d12" stroke-width="2" stroke-linejoin="round"/><rect x="-4" y="6" width="8" height="10" fill="#2b1d12"/></g><text x="370" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#2b1d12">You</text>'
  +'<g id="tMk"><circle r="16" fill="#fff" stroke="#ff9f1c" stroke-width="3"/><image id="tImg" x="-11" y="-11" width="22" height="22"/></g></svg>'
  +'<ol class="steps2" id="tSteps"><li>Order received</li><li>Preparing your juices</li><li>Out for delivery</li><li>Delivered</li></ol>'+ticketHTML(o)
  +'<p class="sm">Delivery to: '+esc(o.addr)+' \u00b7 Total '+o.total+' DH \u00b7 Pay on delivery.</p>'
  +'<p class="sm">Demo: tracking is simulated at fast speed. Live GPS tracking needs a delivery backend or courier app.</p>'
  +'<div class="cact"><button class="btn2" type="button" id="cTrkCopy">Copy order</button><button class="btn2" type="button" id="cTrkClose">Close</button></div></div>'}
function startT(){
  stopT();var path=$("tRoad"),trail=$("tTrail"),mk=$("tMk"),L=path.getTotalLength(),lg=document.querySelector(".hlogo");
  trail.style.strokeDasharray=L;if(lg)$("tImg").setAttribute("href",lg.src);
  function tick(){
    var e=(Date.now()-ord.t0)/1000,s=stage(e),t=prog(e),pt=path.getPointAtLength(L*t);
    mk.setAttribute("transform","translate("+pt.x+" "+pt.y+")");trail.style.strokeDashoffset=L*(1-t);
    $("tStatus").textContent=SN[s];
    $("tEta").textContent=s<3?"Arriving in about "+Math.max(1,Math.ceil(ETA*(1-e/TD)))+" min":"Delivered at the address you gave us.";
    [].forEach.call(document.querySelectorAll("#tSteps li"),function(li,i){li.className=(i<s||s===3)?"done":i===s?"now":""});
    raf=s<3?requestAnimationFrame(tick):0}
  tick()}
function showTrack(){if(!ord)return;doneOn=true;renderList();$("cDone").innerHTML=trackHTML(ord.o);$("cDone").hidden=false;payUI();startT()}
$("cDone").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
  if(b.id==="cTrkClose"){if(ord&&(Date.now()-ord.t0)/1000>=TD){ord=null;saveOrd();changed()}close()}
  if(b.id==="cPrevClose")close();
  if(b.id==="cPrevStart"){close();var c0=$("classic");if(c0)c0.scrollIntoView({behavior:"smooth"})}
  if(b.id==="tCodeCopy"&&ord)copyTxt(ord.o.code,"Code copied.");
  if(b.id==="tSim"&&ord){ord.paid=true;saveOrd();payUI();say("Payment received (demo).")}
  if(b.id==="cTrkCopy"&&ord){var t=orderText(ord.o);if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){say("Order copied.")},function(){say("Couldn\u2019t copy.")})}}});
$("cartFab").onclick=function(){open(this)};$("cartClose").onclick=close;$("cartScrim").onclick=close;
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&$("cartPanel").classList.contains("on"))close()});
ul.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var li=b.closest("li"),nm=li.dataset.n;
  if(b.classList.contains("qp"))add({key:"c:"+nm,name:nm,sub:"Classic \u00b7 400 ml",price:+li.dataset.p});else if(b.classList.contains("qm"))dec("c:"+nm)});
$("cartShop").onclick=function(){open(this)};
document.addEventListener("click",function(e){var b=e.target.closest("[data-add]");if(!b)return;e.preventDefault();add({key:"p:"+b.dataset.add,name:b.dataset.name,sub:"Tropics \u00b7 400 ml",price:PRICE.tropics},true)});
function previewHTML(){
  return'<div class="trk"><h3 style="margin-top:12px">Delivery road map</h3><p class="trketa">This is how your order travels from the stand to your door.</p>'
  +'<svg class="road" viewBox="0 0 400 150" role="img" aria-label="Delivery route from the stand to your address"><path d="'+PATH+'" fill="none" stroke="#3a2a1e" stroke-width="18" stroke-linecap="round"/><path d="'+PATH+'" fill="none" stroke="#6b5645" stroke-width="13" stroke-linecap="round"/><path d="'+PATH+'" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="1.8" stroke-dasharray="6 9"/>'
  +'<g transform="translate(30 110)"><rect x="-13" y="-8" width="26" height="18" rx="3" fill="#ff9f1c"/><path d="M-17 -8L0 -22L17 -8Z" fill="#2b1d12"/><rect x="-4" y="0" width="8" height="10" fill="#fff"/></g><text x="30" y="136" text-anchor="middle" font-size="11" font-weight="700" fill="#2b1d12">Stand</text>'
  +'<g transform="translate(370 90)"><circle class="pin" r="20" fill="none" stroke="#e63946" stroke-width="2"/><path d="M-14 4L0 -14L14 4V16H-14Z" fill="#fff" stroke="#2b1d12" stroke-width="2" stroke-linejoin="round"/><rect x="-4" y="6" width="8" height="10" fill="#2b1d12"/></g><text x="370" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#2b1d12">You</text>'
  +'<g transform="translate(30 110)"><circle r="16" fill="#fff" stroke="#ff9f1c" stroke-width="3"/><image id="pImg" x="-11" y="-11" width="22" height="22"/></g></svg>'
  +'<ol class="steps2"><li>Order received</li><li>Preparing your juices</li><li>Out for delivery</li><li>Delivered</li></ol>'
  +'<p class="sm">You have no active delivery yet. Choose <b>Delivery</b> at checkout (pay by cash or card QR) and this road map shows your order live.</p>'
  +'<div class="cact"><button class="shop" type="button" id="cPrevStart">Start an order</button><button class="btn2" type="button" id="cPrevClose">Close</button></div></div>'}
function showSummary(from){
  open(from);
  if(ord){showTrack();return}
  doneOn=true;renderList();$("cDone").innerHTML=previewHTML();$("cDone").hidden=false;
  var lg=document.querySelector(".hlogo"),im=$("pImg");if(lg&&im)im.setAttribute("href",lg.src)}
var hs=$("homeSum");if(hs)hs.onclick=function(){showSummary(this)};
window.Cart={add:add,open:open,summary:showSummary,PRICE:PRICE};
changed();
})();
