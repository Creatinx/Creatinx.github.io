(function(){
// Mobile menu toggle
const btn=document.getElementById('mobile-menu-btn');
const menu=document.getElementById('mobile-menu');
if(btn&&menu){btn.addEventListener('click',()=>menu.classList.toggle('hidden'));}
// Docs sidebar mobile toggle
const dsbtn=document.getElementById('docs-sidebar-toggle');
const dsmenu=document.getElementById('docs-sidebar-mobile');
if(dsbtn&&dsmenu){dsbtn.addEventListener('click',()=>dsmenu.classList.toggle('hidden'));}
// Hero canvas particle animation
const canvas=document.getElementById('hero-canvas');
if(canvas){
const ctx=canvas.getContext('2d');
let particles=[];
const PARTICLE_COUNT=80;
const CONNECTION_DIST=120;
function resize(){canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;}
function createParticles(){particles=[];for(let i=0;i<PARTICLE_COUNT;i++){particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5)*0.5,vy:(Math.random()-0.5)*0.5,radius:Math.random()*2+1});}}
function getAccent(){const style=getComputedStyle(document.documentElement);const p=style.getPropertyValue('--accent-primary').trim();return p||'#6366f1';}
function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
const accent=getAccent();
particles.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;
if(p.x<0||p.x>canvas.width)p.vx*=-1;
if(p.y<0||p.y>canvas.height)p.vy*=-1;
ctx.beginPath();ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
ctx.fillStyle=accent;ctx.globalAlpha=0.4;ctx.fill();
for(let j=i+1;j<particles.length;j++){
const q=particles[j];const dx=p.x-q.x;const dy=p.y-q.y;const dist=Math.sqrt(dx*dx+dy*dy);
if(dist<CONNECTION_DIST){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
ctx.strokeStyle=accent;ctx.globalAlpha=0.08*(1-dist/CONNECTION_DIST);ctx.stroke();}}
ctx.globalAlpha=1;});
requestAnimationFrame(draw);}
window.addEventListener('resize',()=>{resize();createParticles();});
resize();createParticles();draw();
}
// GSAP ScrollTrigger animations
if(typeof gsap!=='undefined'&&typeof ScrollTrigger!=='undefined'){
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.feature-card').forEach((card,i)=>{
gsap.from(card,{scrollTrigger:{trigger:card,start:'top 85%'},y:40,opacity:0,duration:0.6,delay:i*0.08,ease:'power2.out'});});
gsap.utils.toArray('.arch-box').forEach((box,i)=>{
gsap.from(box,{scrollTrigger:{trigger:box,start:'top 90%'},scale:0.9,opacity:0,duration:0.5,delay:i*0.1,ease:'back.out(1.2)'});});
gsap.from('.code-window',{scrollTrigger:{trigger:'.code-window',start:'top 80%'},y:60,opacity:0,duration:1,ease:'power3.out'});
gsap.utils.toArray('.quickstart-step').forEach((step,i)=>{
gsap.from(step,{scrollTrigger:{trigger:step,start:'top 85%'},x:-30,opacity:0,duration:0.5,delay:i*0.1,ease:'power2.out'});});
}
})();