(function(){
// Mobile menu toggle
const btn=document.getElementById('mobile-menu-btn');
const menu=document.getElementById('mobile-menu');
if(btn&&menu){btn.addEventListener('click',()=>menu.classList.toggle('hidden'));}
// Docs sidebar mobile toggle
const dsbtn=document.getElementById('docs-sidebar-toggle');
const dsmenu=document.getElementById('docs-sidebar-mobile');
if(dsbtn&&dsmenu){dsbtn.addEventListener('click',()=>dsmenu.classList.toggle('hidden'));}
// Hero canvas — interactive perspective grid
const canvas=document.getElementById('hero-canvas');
if(canvas){
const ctx=canvas.getContext('2d');
let w,h,cx,cy,mx=0,my=0,time=0;
function resize(){w=canvas.width=canvas.offsetWidth;h=canvas.height=canvas.offsetHeight;cx=w/2;cy=h/2;}
function getGridPrimary(){const t=document.documentElement.getAttribute('data-theme');return t==='light'?'rgba(0,0,0,0.2)':'rgba(255,255,255,0.12)';}
function getGridSecondary(){const t=document.documentElement.getAttribute('data-theme');return t==='light'?'rgba(0,0,0,0.1)':'rgba(255,255,255,0.06)';}
window.addEventListener('resize',resize);
resize();
document.addEventListener('mousemove',e=>{mx=(e.clientX-cx)/w;my=(e.clientY-cy)/h;});
function draw(){
ctx.clearRect(0,0,w,h);
const primary=getGridPrimary(),secondary=getGridSecondary();
const gridSize=60,vanishX=cx+mx*120,vanishY=cy+my*80+80;
const rows=Math.ceil(h/gridSize)+2,cols=Math.ceil(w/gridSize)+2;
ctx.lineWidth=1;
for(let r=-2;r<rows;r++){
const yBase=(r*gridSize)+((time*0.5)%gridSize);
const perspective=(yBase-vanishY)/(h-vanishY);
const y=vanishY+(yBase-vanishY)*Math.max(0.1,Math.min(1,1-perspective*0.3));
const wave=Math.sin((yBase*0.02)+time*0.03)*2;
ctx.beginPath();
ctx.moveTo(0,y+wave);
ctx.lineTo(w,y+wave);
ctx.strokeStyle=((r+Math.floor(time*0.5/gridSize))%5===0)?primary:secondary;
ctx.stroke();
}
for(let c=-2;c<cols;c++){
const xBase=(c*gridSize)+((time*0.3)%gridSize);
const distFromCenter=(xBase-cx)/w;
const x=xBase+distFromCenter*60+mx*40;
const wave=Math.sin((xBase*0.015)+time*0.025)*2;
ctx.beginPath();
ctx.moveTo(x+wave,0);
ctx.lineTo(x+wave,h);
ctx.strokeStyle=((c+Math.floor(time*0.3/gridSize))%5===0)?primary:secondary;
ctx.stroke();
}
// draw a faint accent glow at vanishing point
const accent=document.documentElement.getAttribute('data-theme')==='light'?'rgba(0,0,0,0.04)':'rgba(255,255,255,0.04)';
const grad=ctx.createRadialGradient(vanishX,vanishY,0,vanishX,vanishY,300);
grad.addColorStop(0,accent);grad.addColorStop(1,'transparent');
ctx.fillStyle=grad;
ctx.fillRect(vanishX-300,vanishY-300,600,600);
time++;
requestAnimationFrame(draw);}
draw();}
// GSAP ScrollTrigger animations — opacity kept at 1 so elements are always visible
if(typeof gsap!=='undefined'&&typeof ScrollTrigger!=='undefined'){
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.feature-card').forEach((card,i)=>{
gsap.from(card,{scrollTrigger:{trigger:card,start:'top 85%'},y:40,opacity:1,duration:0.6,delay:i*0.08,ease:'power2.out'});});
gsap.utils.toArray('.arch-box').forEach((box,i)=>{
gsap.from(box,{scrollTrigger:{trigger:box,start:'top 90%'},scale:0.95,opacity:1,duration:0.5,delay:i*0.1,ease:'back.out(1.2)'});});
gsap.from('.code-window',{scrollTrigger:{trigger:'.code-window',start:'top 80%'},y:60,opacity:1,duration:1,ease:'power3.out'});
gsap.utils.toArray('.quickstart-step').forEach((step,i)=>{
gsap.from(step,{scrollTrigger:{trigger:step,start:'top 85%'},x:-30,opacity:1,duration:0.5,delay:i*0.1,ease:'power2.out'});});
}
})();