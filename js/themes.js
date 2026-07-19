(function(){
  const STORAGE_KEY = 'gryce-theme';
  const DEFAULT_THEME = 'dark';
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(STORAGE_KEY, t);
    var prismLink = document.getElementById('prism-theme');
    if (prismLink) {
      var href = prismLink.href;
      var dir = href.substring(0, href.lastIndexOf('/') + 1);
      prismLink.href = dir + (t === 'light' ? 'prism-light.css' : 'prism-dark.css');
    }
  }
  function getTheme() { return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME; }
  function init() {
    var t = getTheme();
    setTheme(t);
    var themeBtn = document.getElementById('theme-btn');
    var themeMenu = document.getElementById('theme-menu');
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