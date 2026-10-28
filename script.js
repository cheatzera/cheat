/* CheatOptimizer: interações */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  var fab = document.querySelector('.fab');

  /* Ano no rodapé */
  var year = document.getElementById('ano');
  if (year) year.textContent = new Date().getFullYear();

  /* Nav com fundo ao rolar + botão flutuante */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('scrolled', y > 24);
    if (fab) fab.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    links.classList.toggle('open', open);
  }
  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* Revelar elementos ao rolar (com pequeno atraso escalonado) */
  var items = document.querySelectorAll('.reveal');
  items.forEach(function (el) {
    var siblings = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.classList.contains('reveal');
    }) : [];
    el.style.setProperty('--d', Math.max(0, siblings.indexOf(el)) * 90 + 'ms');
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* Brilho que acompanha o mouse nos cards */
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* FAQ: abre um por vez */
  var details = document.querySelectorAll('.faq details');
  details.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) details.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
