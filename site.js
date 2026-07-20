/* Segment — shared nav + footer.
   Edit the markup here once and it updates on every page.
   Each page just needs <div id="site-nav"></div>, <div id="site-footer"></div>,
   and <script src="[../]js/site.js"></script> before </body>. */
(function () {
  // Pages inside /projects/ sit one level down, so links need a ../ prefix.
  var sub = location.pathname.indexOf('/projects/') !== -1;
  var p = sub ? '../' : '';

  // Work out which nav item should be marked active.
  var file = location.pathname.split('/').pop() || 'index.html';
  var active = '';
  if (sub || file === 'projects.html') active = 'projects';
  else if (file.indexOf('fieldnotes') === 0) active = 'fieldnotes';
  else if (file === 'team.html') active = 'team';
  else if (file === 'contact.html') active = 'contact';
  else if (file === 'index.html' || file === '') active = 'home';

  function navLink(href, label, key) {
    var cls = 'nav__link' + (active === key ? ' nav__link--active' : '');
    return '<li><a href="' + p + href + '" class="' + cls + '">' + label + '</a></li>';
  }

  var navHTML =
    '<nav class="nav" id="nav">' +
      '<div class="nav__inner">' +
        '<a href="' + p + 'index.html" class="nav__logo"><span>Segment</span></a>' +
        '<button class="nav__toggle" aria-label="Menu" onclick="document.querySelector(\'.nav__links\').classList.toggle(\'open\')">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<ul class="nav__links">' +
          navLink('index.html', 'Home', 'home') +
          navLink('projects.html', 'Projects', 'projects') +
          navLink('fieldnotes.html', 'Fieldnotes', 'fieldnotes') +
          navLink('team.html', 'Team', 'team') +
          navLink('contact.html', 'Contact', 'contact') +
          '<li><a href="' + p + 'contact.html" class="nav__cta">Get in touch</a></li>' +
        '</ul>' +
      '</div>' +
    '</nav>';

  var footerHTML =
    '<footer class="footer">' +
      '<div class="container">' +
        '<div class="footer__inner">' +
          '<a href="' + p + 'index.html" class="footer__logo">Segment</a>' +
          '<ul class="footer__links">' +
            '<li><a href="' + p + 'index.html" class="footer__link">Home</a></li>' +
            '<li><a href="' + p + 'projects.html" class="footer__link">Projects</a></li>' +
            '<li><a href="' + p + 'fieldnotes.html" class="footer__link">Fieldnotes</a></li>' +
            '<li><a href="' + p + 'team.html" class="footer__link">Team</a></li>' +
            '<li><a href="' + p + 'contact.html" class="footer__link">Contact</a></li>' +
            '<li><a href="https://www.linkedin.com/in/sophie-lucassen/" class="footer__link" target="_blank">LinkedIn</a></li>' +
          '</ul>' +
          '<p class="footer__copy">Segment \u00B7 Marketing and design studio \u00B7 St Peter Port, Guernsey \u00A9 2026</p>' +
        '</div>' +
      '</div>' +
    '</footer>';

  function inject() {
    var navMount = document.getElementById('site-nav');
    var footMount = document.getElementById('site-footer');
    if (navMount) navMount.outerHTML = navHTML;
    if (footMount) footMount.outerHTML = footerHTML;

    var nav = document.getElementById('nav');
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
