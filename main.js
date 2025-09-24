/* main.js - small utility scripts, menu toggles, form validation, simple scroll reveal */

/* Helper: set year for copyright */
document.addEventListener('DOMContentLoaded', function () {
  const year = new Date().getFullYear();
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById('year' + (i === 1 ? '' : '-' + i));
    if (el) {
      el.textContent = year;
    }
  }
  const y = document.getElementById('year');
  if (y) y.textContent = year;
});

/* Nav toggle for all pages (progressive enhancement) */
function setupNavToggle(toggleId, navId) {
  const btn = document.getElementById(toggleId);
  const nav = document.getElementById(navId);
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (nav.style.display === 'block') {
      nav.style.display = '';
    } else {
      nav.style.display = 'block';
    }
  });
}
['nav-toggle','nav-toggle-2','nav-toggle-3','nav-toggle-4','nav-toggle-5'].forEach(id => {
  const navId = id.replace('toggle','nav');
  setupNavToggle(id, navId);
});

/* IntersectionObserver: simple reveal-on-scroll */
const reveals = document.querySelectorAll('.card, .work-card, .gallery-item, .price-card');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transform = 'translateY(0)';
        e.target.style.opacity = '1';
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(el => {
    el.style.transition = 'transform 600ms cubic-bezier(.2,.9,.3,1), opacity 600ms';
    el.style.transform = 'translateY(14px)';
    el.style.opacity = '0';
    io.observe(el);
  });
}

/* Contact form validation & fake submit */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.textContent = '';
    // simple validation
    const name = form.name;
    const email = form.email;
    const message = form.message;
    if (!name.value.trim() || name.value.length < 2) {
      status.textContent = 'Please enter your name (2+ characters).';
      name.focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      status.textContent = 'Please enter a valid email address.';
      email.focus();
      return;
    }
    if (!message.value.trim() || message.value.length < 10) {
      status.textContent = 'Please enter a longer message (10+ characters).';
      message.focus();
      return;
    }

    // Simulate async send (no backend) and show success.
    status.textContent = 'Sending…';
    setTimeout(() => {
      status.textContent = 'Thanks — your message looks great! I will get back to you shortly.';
      form.reset();
    }, 800);
  });
}
/* --- end of main.js --- */