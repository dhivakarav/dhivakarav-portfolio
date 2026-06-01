// Nav: darken on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 8
    ? 'rgba(0,0,0,0.9)'
    : 'rgba(29,29,31,0.72)';
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (parseFloat(e.target.dataset.delay || 0)) + 'ms';
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 6) * 55;
  io.observe(el);
});

// Highlight active nav link
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 60) current = s.id; });
  navAs.forEach(a => { a.style.opacity = a.getAttribute('href') === `#${current}` ? '1' : ''; });
}, { passive: true });
