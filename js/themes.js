(function(){
  var STORAGE_KEY = 'gryce-theme';
  var DEFAULT_THEME = 'dark';
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(STORAGE_KEY, t);
    var link = document.getElementById('prism-theme');
    if (link) {
      var idx = link.href.lastIndexOf('/');
      var dir = link.href.substring(0, idx + 1);
      link.href = dir + (t === 'light' ? 'prism-light.css' : 'prism-dark.css');
    }
  }
  function getTheme() { return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME; }
  function init() {
    setTheme(getTheme());
    var btn = document.getElementById('theme-btn');
    var menu = document.getElementById('theme-menu');
    if (btn && menu) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('hidden');
      });
      document.querySelectorAll('.theme-option').forEach(function(b) {
        b.addEventListener('click', function() {
          setTheme(this.dataset.theme);
          menu.classList.add('hidden');
        });
      });
      document.addEventListener('click', function() {
        menu.classList.add('hidden');
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();