(function(){
  if (window.__blvdLangSwitch) return;
  window.__blvdLangSwitch = true;
  function pageKey(){
    var p = location.pathname.replace(/\/+$/,'') || '/';
    if (/^\/(en|es|it)(\/|$)/.test(p)) {
      p = p.replace(/^\/(en|es|it)/,'') || '/';
    }
    if (p === '/plaza') return 'plaza/';
    if (p === '/simulate') return 'simulate/';
    return '';
  }
  function currentLang(){
    var m = location.pathname.match(/^\/(en|es|it)(\/|$)/);
    return m ? m[1] : 'ar';
  }
  function urlFor(code, key){
    if (code === 'ar') return '/' + key;
    return '/' + code + '/' + key;
  }
  function mount(){
    if (document.querySelector('.blvd-lang-switch')) return;
    var lang = currentLang();
    var key = pageKey();
    var nav = document.createElement('nav');
    nav.className = 'blvd-lang-switch';
    nav.setAttribute('aria-label', 'Language');
    var items = [['ar','عربي'],['en','EN'],['es','ES'],['it','IT']];
    items.forEach(function(it){
      var a = document.createElement('a');
      a.href = urlFor(it[0], key);
      a.textContent = it[1];
      a.setAttribute('hreflang', it[0]);
      a.setAttribute('lang', it[0]);
      if (it[0] === lang) a.setAttribute('aria-current','page');
      nav.appendChild(a);
    });
    var headerNav = document.querySelector('header nav');
    if (headerNav && headerNav.parentNode) {
      headerNav.parentNode.insertBefore(nav, headerNav.nextSibling);
      return;
    }
    var flex = document.querySelector('header .flex.gap-2');
    if (flex && flex.parentNode) {
      flex.parentNode.insertBefore(nav, flex);
      return;
    }
    var header = document.querySelector('header');
    if (header) header.appendChild(nav);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  // remount after hydration settles
  setTimeout(mount, 50);
  setTimeout(mount, 500);
  setTimeout(mount, 1500);
})();
(function(){
  var m=location.pathname.match(/^\/(en|es|it)(\/|$)/);
  if(!m) return;
  var lang=m[1];
  function apply(){
    document.documentElement.lang=lang;
    document.documentElement.dir='ltr';
  }
  apply();
  setTimeout(apply,0);
  setTimeout(apply,100);
  setTimeout(apply,500);
  setTimeout(apply,1500);
  new MutationObserver(function(){
    if(document.documentElement.lang!==lang||document.documentElement.dir!=='ltr') apply();
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
})();
