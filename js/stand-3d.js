(function(){
var $=function(i){return document.getElementById(i)};
var root=document.documentElement,hero=$("hero"),site=$("site"),cv=$("gl"),veil=$("veil"),spot=$("spot"),load=$("load"),still=matchMedia("(prefers-reduced-motion:reduce)").matches;
root.classList.add("intro");
function enter(){veil.classList.add("on");setTimeout(function(){hero.hidden=true;site.hidden=false;root.classList.remove("intro");window.scrollTo(0,0);spy();veil.classList.remove("on")},still?0:520)}
var COL=["#ff9f1c","#ffb52e","#ffd23f","#ff7b00","#ffe08a"];
function dropEls(){return [".hlogo",".hword",".hcopy h2",".hcopy>p:not(.htag)",".hpress",".htag"].map(function(s){return hero.querySelector(s)}).filter(Boolean)}
function splash(el,n){
  var sp=$("splash"),r=el.getBoundingClientRect(),by=r.bottom-2,i,pw=document.createElement("div");
  pw.className="jd";pw.style.cssText="left:"+(r.left+r.width*.04)+"px;top:"+(by-8)+"px;width:"+(r.width*.92)+"px;height:16px;background:radial-gradient(ellipse at center,#ffb52e,#ff9f1c 60%,rgba(255,159,28,0) 72%)";
  /* no puddle */
  pw.animate([{transform:"scale(.15,.2)",opacity:.9},{transform:"scale(1,1)",opacity:.85,offset:.35},{transform:"scale(1.08,.6)",opacity:0}],{duration:900,easing:"ease-out"}).onfinish=function(){pw.remove()};
  for(i=0;i<n;i++){
    var d=document.createElement("div"),sz=5+Math.random()*10,x0=r.left+Math.random()*r.width,vx=((x0-(r.left+r.width/2))/r.width)*420+(Math.random()-.5)*160,vy=-(260+Math.random()*420),T=.95,kf=[],s;
    d.className="jd";d.style.cssText="left:"+(x0-sz/2)+"px;top:"+(by-sz)+"px;width:"+sz+"px;height:"+(sz*1.25)+"px;background:"+COL[(Math.random()*COL.length)|0];
    for(s=0;s<=10;s++){var t=s/10*T;kf.push({transform:"translate("+(vx*t)+"px,"+(vy*t+800*t*t)+"px) scale("+(1-s/14)+")",opacity:s>8?1-(s-8)/2:1})}
    sp.appendChild(d);(function(d){d.animate(kf,{duration:T*1000,easing:"linear"}).onfinish=function(){d.remove()}})(d)
  }
}
function dropIn(cb){
  var els=dropEls(),DUR=1300,last=0;
  els.forEach(function(el,i){
    var dl=i*140,nn=(el.classList.contains("hlogo")||el.classList.contains("hword"))?14:10;
    el.style.transformOrigin="center bottom";
    var a=el.animate([
      {transform:"translateY(-125vh) scale(1,1.06)",opacity:1,easing:"cubic-bezier(.55,0,1,.55)"},
      {transform:"translateY(0) scale(1,1)",opacity:1,offset:.6,easing:"ease-out"},
      {transform:"translateY(0) scale(1.1,.82)",opacity:1,offset:.7,easing:"ease-out"},
      {transform:"translateY(-12px) scale(.97,1.05)",opacity:1,offset:.83,easing:"ease-in"},
      {transform:"translateY(0) scale(1.02,.97)",opacity:1,offset:.93},
      {transform:"translateY(0) scale(1,1)",opacity:1}
    ],{duration:DUR,delay:dl,fill:"both"});
    setTimeout(function(){splash(el,nn)},dl+DUR*.6);
    a.onfinish=function(){el.style.opacity="";el.style.transformOrigin="";a.cancel()};
    last=Math.max(last,dl+DUR)
  });
  setTimeout(cb,last+50)
}
function leave(){
  site.hidden=true;hero.hidden=false;root.classList.add("intro");hero.classList.add("nt");resetOutro();resize();
  if(still){hero.classList.remove("nt");if(reset)reset();return}
  busy=true;spot.style.display="none";
  dropEls().forEach(function(e){e.style.opacity="0"});
  veil.style.transition="none";veil.classList.add("on");void veil.offsetWidth;veil.style.transition="";
  requestAnimationFrame(function(){veil.classList.remove("on")});
  var after=function(){dropIn(function(){hero.classList.remove("nt");busy=false;spot.style.display="block"})};
  if(zoomOut)zoomOut(after);else after()
}
var busy=false,tmr=null;
function resetOutro(){clearTimeout(tmr);busy=false;hero.classList.remove('outro')}
function play(){
  if(busy||hero.hidden)return;
  if(still){zoomIn();return}
  busy=true;spot.style.display='none';
  var cs=hero.querySelectorAll('.ch'),n=cs.length,t0=360,win=900,i,ar=hero.querySelectorAll('.harrow svg');
  for(i=0;i<n;i++){cs[i].style.setProperty('--d',Math.round(t0+i/n*win)+'ms');cs[i].style.setProperty('--r',((i*37)%41-20)+'deg')}
  for(i=0;i<ar.length;i++)ar[i].style.setProperty('--d',(t0+win+120+i*140)+'ms');
  hero.classList.add('outro');
  tmr=setTimeout(function(){zoomIn()},t0+win+120+140+700+100);
}
(function(){var els=hero.querySelectorAll('.hsplit');for(var k=0;k<els.length;k++){var el=els[k],out='',sr='',nodes=el.childNodes;for(var j=0;j<nodes.length;j++){var nd=nodes[j];if(nd.nodeType===3){sr+=nd.textContent;var toks=nd.textContent.split(/(\s+)/);for(var q=0;q<toks.length;q++){var tk=toks[q];if(!tk)continue;if(/^\s+$/.test(tk)){out+=' '}else{out+='<span class="wd">'+tk.split('').map(function(c){return '<span class="ch">'+c+'</span>'}).join('')+'</span>'}}}else if(nd.nodeName==='BR'){sr+=' ';out+='<br>'}}el.innerHTML='<span class="sr">'+sr+'</span><span aria-hidden="true">'+out+'</span>'}})();
$("back").onclick=leave;spot.onclick=function(){play()};
addEventListener("keydown",function(e){if(e.key==="Enter"&&!hero.hidden&&e.target===document.body)play()});
var reset=null,resize=function(){},zoomIn=enter,zoomOut=null;
try{
  var renderer=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
  renderer.outputEncoding=THREE.sRGBEncoding;renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
  var scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,200);
  scene.add(new THREE.HemisphereLight(0xffffff,0xc9b49c,1.25));
  var sun=new THREE.DirectionalLight(0xffffff,0.9);sun.position.set(80,160,120);scene.add(sun);
  var ctr=new THREE.Vector3(),base=new THREE.Vector3(),right=new THREE.Vector3(),up=new THREE.Vector3(),dir=new THREE.Vector3(.8,.45,1).normalize(),dist=1,A=0,px=0,py=0,tx=0,ty=0,tween=null,framed=false;
  function frame(){
    var k=RA<1?Math.min(2,.85/RA):1;
    base.copy(ctr).addScaledVector(dir,dist*k);A=still?0:dist*k*.22;
    cam.position.copy(base);cam.lookAt(ctr);cam.updateMatrixWorld();
    right.setFromMatrixColumn(cam.matrixWorld,0);up.setFromMatrixColumn(cam.matrixWorld,1)}
  var reg={x:.24,y:0,w:.76,h:1},RA=1,CW=1,CH=1,ve=0;
  var DK=false,hc=hero.querySelector(".hcopy"),hn=$("hint");
  function layout(){
    var W=hero.clientWidth||innerWidth,Hh=hero.clientHeight||innerHeight;
    DK=!matchMedia("(max-width:820px)").matches;
    if(!DK){reg={x:0,y:.5,w:1,h:.5};hc.style.left=hc.style.width=hc.style.padding="";hn.style.left="";return}
    var av=W*.92,gap=Math.min(132,Math.max(113,W*.1)),tw=Math.min(520,av*.36),full=.58*Hh,sw=Math.max(200,Math.min(av-tw-gap,full)),rh=Math.min(1,sw/full),tot=tw+gap+sw,x0=(W-tot)/2,sx=x0+tw+gap;
    hc.style.left=x0+"px";hc.style.width=tw+"px";hc.style.padding="0";
    hn.style.left=(sx+sw/2)+"px";
    reg={x:(sx-gap/2)/W,y:(1-rh)/2,w:(gap+sw)/W,h:rh}}
  function vo(e){ve=e;var sx=(reg.x+reg.w/2-.5)*CW*(1-e),sy=(reg.y+reg.h/2-.5)*CH*(1-e);cam.setViewOffset(CW,CH,-sx,-sy,CW,CH);
    var horiz=reg.x>0,edge=(horiz?reg.x:reg.y)*100,m=edge?((edge-8)*(1-e)-10*e):-20,g="linear-gradient("+(horiz?"to right":"to bottom")+",transparent "+m+"%,#000 "+(m+8)+"%)";cv.style.webkitMaskImage=g;cv.style.maskImage=g}
  resize=function(){layout();CW=cv.clientWidth||hero.clientWidth||innerWidth;CH=cv.clientHeight||hero.clientHeight||innerHeight;renderer.setSize(CW,CH,false);RA=(DK?.76:reg.w)*CW/(reg.h*CH);cam.aspect=CW/CH;cam.fov=2*Math.atan(Math.tan(20*Math.PI/180)/reg.h)*180/Math.PI;vo(ve);if(framed)frame()};
  addEventListener("resize",resize);resize();
  hero.addEventListener("pointermove",function(e){tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1});
  hero.addEventListener("pointerleave",function(){tx=ty=0});
  var u=null;
  var cib=window.createImageBitmap;
  fetch("assets/model/stand.glb").then(function(r){if(!r.ok)throw new Error(r.status);return r.arrayBuffer()}).then(function(buf){window.createImageBitmap=undefined;new THREE.GLTFLoader().parse(buf,"",function(g){
    var m=g.scene,rab=[];scene.add(m);
    m.traverse(function(o){if(o.isMesh){
      [].concat(o.material).forEach(function(x){x.metalness=0;x.metalnessMap=null;x.transparent=false;x.opacity=1;x.alphaTest=0;x.side=THREE.DoubleSide;if(x.roughness>.9)x.roughness=.85});
      if(/Conejos/.test(o.name))rab.push(o)}});
    var pts=[[],[],[]],vv=new THREE.Vector3();m.updateMatrixWorld(true);
    m.traverse(function(o){if(o.isMesh){var a=o.geometry.attributes.position;for(var i=0;i<a.count;i+=5){vv.fromBufferAttribute(a,i).applyMatrix4(o.matrixWorld);pts[0].push(vv.x);pts[1].push(vv.y);pts[2].push(vv.z)}}});
    var pc=function(a,q){a.sort(function(x,y){return x-y});return a[Math.floor((a.length-1)*q)]};
    var bs=new THREE.Box3(new THREE.Vector3(pc(pts[0],.04),pc(pts[1],.04),pc(pts[2],.04)),new THREE.Vector3(pc(pts[0],.96),pc(pts[1],.96),pc(pts[2],.96))),size=bs.getSize(new THREE.Vector3());
    ctr.set(-1.101,1.978,2.455);dir.set(-0.465,0.235,0.853).normalize();dist=6.423;
    framed=true;frame();cam.updateProjectionMatrix();
    // split cats into pieces, then find the seller cat by what is visible at that spot of the view
    rab.forEach(function(o){
      var G=o.geometry,n=G.attributes.position.count,ix=G.index?G.index.array:null,par=new Int32Array(n),i;
      for(i=0;i<n;i++)par[i]=i;
      function f(x){while(par[x]!==x){par[x]=par[par[x]];x=par[x]}return x}
      var tc=ix?ix.length:n;
      for(i=0;i<tc;i+=3){var a=ix?ix[i]:i,b=ix?ix[i+1]:i+1,c=ix?ix[i+2]:i+2;par[f(a)]=f(b);par[f(b)]=f(c)}
      var roots=new Int32Array(n);for(i=0;i<n;i++)roots[i]=f(i);
      o.userData.roots=roots});
    var best=null,cat=ctr.clone(),offs=[],ray0=new THREE.Raycaster();
    for(var ax=-4;ax<=4;ax++)for(var ay=-4;ay<=4;ay++)offs.push([ax*.008,ay*.008]);
    offs.sort(function(p,q){return Math.hypot(p[0],p[1])-Math.hypot(q[0],q[1])});
    for(var k=0;k<offs.length&&!best;k++){
      var qx=(-.041+offs[k][0])*2/RA,qy=(-.092+offs[k][1])*2;ray0.setFromCamera({x:(reg.x+(qx+1)/2*reg.w)*2-1,y:1-2*(reg.y+(1-qy)/2*reg.h)},cam);
      var hs=ray0.intersectObjects(rab,false);
      if(hs.length){var ro=hs[0].object.userData.roots;best={mesh:hs[0].object,root:ro[hs[0].face.a],roots:ro};cat=hs[0].point.clone()}
    }
    cat.set(-0.29,0.84,0.46);reset=function(){tween=null;tx=ty=px=py=0;vo(0);frame();veil.classList.remove("on");spot.style.display="block"};
    reset();load.style.display="none";
    var ray=new THREE.Raycaster();
    function hit(e){var r=cv.getBoundingClientRect();ray.setFromCamera({x:(e.clientX-r.left)/r.width*2-1,y:-((e.clientY-r.top)/r.height)*2+1},cam);
      var h=ray.intersectObjects(rab,false);return !!(best&&h.length&&h[0].object===best.mesh&&best.roots[h[0].face.a]===best.root)}
    cv.addEventListener("pointerup",function(e){if(hit(e))play()});
    cv.addEventListener("pointermove",function(e){cv.style.cursor=hit(e)?"pointer":"default"});
    zoomIn=function(){
      if(still||tween){if(still)enter();return}
      spot.style.display="none";
      var p0=cam.position.clone(),t0=ctr.clone(),p1=cat.clone().add(p0.clone().sub(cat).normalize().multiplyScalar(dist*.22)),t=performance.now(),tg=new THREE.Vector3();
      tween=function(now){var k=Math.min((now-t)/900,1),e=k*k*(3-2*k);vo(e);cam.position.lerpVectors(p0,p1,e);tg.lerpVectors(t0,cat,e);cam.lookAt(tg);if(k>.6)veil.classList.add("on");if(k>=1){tween=null;enter()}}
    };
    zoomOut=function(cb){
      var p0,t0=ctr.clone(),p1,t=performance.now(),tg=new THREE.Vector3();
      tx=ty=px=py=0;frame();p0=base.clone();p1=cat.clone().add(p0.clone().sub(cat).normalize().multiplyScalar(dist*.22));
      cam.position.copy(p1);cam.lookAt(cat);vo(1);
      tween=function(now){var k=Math.min((now-t)/1100,1),e=1-(k*k*(3-2*k));vo(e);cam.position.lerpVectors(p0,p1,e);tg.lerpVectors(t0,cat,e);cam.lookAt(tg);if(k>=1){tween=null;vo(0);frame();cb()}}
    };
    var v=new THREE.Vector3();
    (function loop(now){requestAnimationFrame(loop);if(hero.hidden)return;
      if(tween)tween(now);else{px+=(tx-px)*.09;py+=(ty-py)*.09;cam.position.copy(base).addScaledVector(right,px*A).addScaledVector(up,-py*A*.8);cam.lookAt(ctr)}
      renderer.render(scene,cam);
      v.copy(cat).project(cam);spot.style.left=(cv.offsetLeft+(v.x+1)/2*cv.clientWidth)+"px";spot.style.top=(cv.offsetTop+(1-v.y)/2*cv.clientHeight)+"px"})(0);
  },function(e){load.textContent="Couldn’t load the 3D stand ("+((e&&e.message)||e)+"). Use “Press Enter”.";console.error(e)});
  window.createImageBitmap=cib;
  }).catch(function(e){window.createImageBitmap=cib;load.textContent="Couldn’t load the 3D model ("+((e&&e.message)||e)+"). If you opened index.html directly, run a local server (see README). Use “Press Enter”.";console.error(e)});
}catch(err){load.textContent="3D isn’t available on this device. Use “Press Enter”."}
})();
