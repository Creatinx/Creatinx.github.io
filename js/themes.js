(function(){
const STORAGE_KEY='gryce-theme';
const DEFAULT_THEME='dark';
const THEMES=['dark','light','ocean','forest','sunset'];
function setTheme(t){document.documentElement.setAttribute('data-theme',t);localStorage.setItem(STORAGE_KEY,t);}
function getTheme(){return localStorage.getItem(STORAGE_KEY)||DEFAULT_THEME;}
function init(){const t=getTheme();setTheme(t);
document.querySelectorAll('[data-theme]').forEach(el=>{
if(el.dataset.theme===t)el.classList.add('font-semibold');});
document.getElementById('theme-btn').addEventListener('click',function(e){e.stopPropagation();
document.getElementById('theme-menu').classList.toggle('hidden');});
document.querySelectorAll('.theme-option').forEach(btn=>{
btn.addEventListener('click',function(){setTheme(this.dataset.theme);
document.getElementById('theme-menu').classList.add('hidden');});});
document.addEventListener('click',function(){document.getElementById('theme-menu').classList.add('hidden');});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();