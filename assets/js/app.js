let currentScene=1;
let giftOpened=false;
let soundOn=false;

const family=[
"Ch Shahbaz Ahmed Bajwa",
"Shahida Parveen",
"Ch Kaleemullah Bajwa",
"Aqsa Shahbaz",
"Ch Abdullah Bajwa",
"Maryem Shahbaz"
];

const familyBox=document.getElementById("family");
family.forEach((name,i)=>{
 const item=document.createElement("div");
 item.className="family-member";
 item.textContent=name;
 item.style.animationDelay=(i*.15)+"s";
 familyBox.appendChild(item);
});

function nextScene(){
 if(currentScene>=6)return;
 document.getElementById("scene"+currentScene).classList.remove("active");
 currentScene++;
 document.getElementById("scene"+currentScene).classList.add("active");
 document.getElementById("chapter").textContent=
 ["","THE BEGINNING","YOUR SPECIAL DAY","WITH LOVE","A SPECIAL PRAYER","THE SECRET GIFT","GRAND SURPRISE"][currentScene];
}

function unlockGift(){
 const code=document.getElementById("giftCode").value;
 const error=document.getElementById("error");
 if(code!=="1234"){
  error.textContent="Incorrect code. Try again!";
  return;
 }
 error.textContent="";
 nextScene();
 fireworks();
}

function revealGift(){
 if(giftOpened)return;
 giftOpened=true;
 const box=document.getElementById("giftBox");
 box.classList.add("open");
 document.getElementById("gift-instruction").textContent="YOUR SURPRISE IS ARRIVING...";
 setTimeout(()=>{
  box.style.transform="scale(.1)";
  box.style.opacity="0";
  document.getElementById("giftReveal").innerHTML=
  "A World of Happiness Awaits You! ✨<br><span style='font-family:Outfit;font-size:13px;color:#fff'>May every dream of yours come true. Happy Birthday, Zainab!</span>";
  fireworks(150);
 },1300);
}

const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
let particles=[];
function resize(){
 canvas.width=innerWidth*devicePixelRatio;
 canvas.height=innerHeight*devicePixelRatio;
 ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
resize();
window.addEventListener("resize",resize);

function createParticle(x,y,type="star"){
 particles.push({
  x,y,vx:(Math.random()-.5)*5,
  vy:(Math.random()-.5)*5-2,
  life:1,size:Math.random()*3+1,
  type
 });
}

function fireworks(count=65){
 const x=Math.random()*innerWidth;
 const y=Math.random()*innerHeight*.55;
 for(let i=0;i<count;i++){
  const angle=Math.PI*2*i/count;
  const speed=1+Math.random()*5;
  particles.push({
   x,y,vx:Math.cos(angle)*speed,
   vy:Math.sin(angle)*speed,
   life:1,size:Math.random()*3+1,type:"fire"
  });
 }
}

function animate(){
 ctx.clearRect(0,0,innerWidth,innerHeight);
 if(Math.random()<.22){
  createParticle(Math.random()*innerWidth,innerHeight+5);
 }
 particles.forEach((p,i)=>{
  p.x+=p.vx;p.y+=p.vy;
  p.vy+=p.type==="fire"?.025:-.006;
  p.life-=p.type==="fire"?.009:.004;
  ctx.globalAlpha=Math.max(0,p.life);
  ctx.fillStyle=p.type==="fire"?"#f6d58a":"#ffd8ef";
  ctx.beginPath();
  ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
  ctx.fill();
  if(p.life<=0)particles.splice(i,1);
 });
 ctx.globalAlpha=1;
 requestAnimationFrame(animate);
}
animate();

document.getElementById("sound").addEventListener("click",()=>{
 soundOn=!soundOn;
 document.getElementById("sound").textContent=
 soundOn?"♪ SOUND ON":"♪ SOUND OFF";
});

// FINAL CINEMATIC GIFT EXPERIENCE
const giftBox=document.getElementById("giftBox");

// Four separate falling gift panels
["left","right","front","back"].forEach(side=>{
 const panel=document.createElement("div");
 panel.className="gift-side "+side;
 giftBox.appendChild(panel);
});

function confettiBlast(){
 const colors=["#f6d58a","#ff91c8","#ffffff","#bba0ff","#ffda79"];
 for(let i=0;i<120;i++){
  const piece=document.createElement("div");
  piece.className="confetti";
  piece.style.left=Math.random()*100+"vw";
  piece.style.background=colors[Math.floor(Math.random()*colors.length)];
  piece.style.setProperty("--drift",(Math.random()-.5)*400+"px");
  piece.style.animationDelay=Math.random()*2+"s";
  document.body.appendChild(piece);
  setTimeout(()=>piece.remove(),6500);
 }
}

function revealGift(){
 if(giftOpened)return;
 giftOpened=true;

 giftBox.classList.add("explode");
 document.getElementById("gift-instruction").textContent=
 "A MAGICAL SURPRISE FOR ZAINAB ✨";

 fireworks(150);
 confettiBlast();

 setTimeout(()=>{
  giftBox.style.display="none";
  document.getElementById("gift-instruction").textContent="";

  document.getElementById("giftReveal").innerHTML=`
   <div style="font-size:75px;animation:giftFloat 2s infinite">🧸</div>
   <div style="font-size:35px;margin:12px">🌸 💝 🌷</div>
   <div style="font-family:'Great Vibes',cursive;font-size:48px">
    A Little Gift for Zainab
   </div>
   <span class="gift-surprise">
    May your world always be filled with happiness,
    beautiful dreams, love and endless smiles.
    <br><br>
    <span style="font-size:25px">✨ Happy Birthday Zainab ✨</span>
   </span>
   <button class="primary-btn" style="margin-top:25px"
   onclick="celebrateAgain()">CELEBRATE AGAIN ✨</button>
  `;

  fireworks(180);
  confettiBlast();
 },1300);
}

function celebrateAgain(){
 fireworks(180);
 confettiBlast();
}

