(function(){
var b=document.getElementById("roadBtn"),w=document.getElementById("roadWrap");if(!b||!w)return;
b.onclick=function(){var o=!w.classList.contains("open");w.classList.toggle("open",o);w.setAttribute("aria-hidden",o?"false":"true");b.setAttribute("aria-expanded",o?"true":"false");b.setAttribute("aria-label",o?"Hide the road from Pick to Deliver":"Show the road from Pick to Deliver");
  if(o)requestAnimationFrame(function(){w.scrollIntoView({behavior:"smooth",block:"center"})})}})();
