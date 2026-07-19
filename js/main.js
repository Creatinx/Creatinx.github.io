(function(){
  // Mobile menu toggle
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) { btn.addEventListener('click', function() { menu.classList.toggle('hidden'); }); }
  // Docs sidebar mobile toggle
  const dsbtn = document.getElementById('docs-sidebar-toggle');
  const dsmenu = document.getElementById('docs-sidebar-mobile');
  if (dsbtn && dsmenu) { dsbtn.addEventListener('click', function() { dsmenu.classList.toggle('hidden'); }); }
})();