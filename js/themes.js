(function(){
  const STORAGE_KEY = 'gryce-theme';
  const DEFAULT_THEME = 'dark';
  const THEMES = ['dark', 'light'];
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(STORAGE_KEY, t);
    // Update prism theme
    const prismLink = document.getElementById('prism-theme');
    if (prismLink) {
      prismLink.href = t === 'light' ? '../css/prism-light.css' : '../css/prism-dark.css';
    }
  }
  function getTheme() { return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME; }
  function init() {
    const t = getTheme();
    setTheme(t);
    const themeBtn = document.getElementById('theme-btn');
    const themeMenu = document.getElementById('theme-menu');
    if (themeBtn && themeMenu) {
      themeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        themeMenu.classList.toggle('hidden');
      });
      document.querySelectorAll('.theme-option').forEach(function(btn) {
        btn.addEventListener('click', function() {
          setTheme(this.dataset.theme);
          themeMenu.classList.add('hidden');
        });
      });
      document.addEventListener('click', function() {
        themeMenu.classList.add('hidden');
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();