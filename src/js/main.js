// ============================================
//  MAISON PHET — main.js
// ============================================

// --- NAV SCROLL ---
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// --- NAV MOBILE TOGGLE ---
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Fermer au clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// --- FILTER MENUS ---
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards  = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    menuCards.forEach(card => {
      const show = filter === 'all' || card.dataset.type === filter;
      card.style.display = show ? '' : 'none';
      if (show) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      }
    });
  });
});

// --- FORM FORMSPREE ---
const form       = document.getElementById('reservation-form');
const submitBtn  = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        const json = await res.json();
        const errMsg = json?.errors?.map(e => e.message).join(', ')
          || 'Une erreur est survenue. Veuillez réessayer.';
        alert(errMsg);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer ma demande';
      }
    } catch {
      alert('Problème réseau. Vérifiez votre connexion et réessayez.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer ma demande';
    }
  });
}

// --- SCROLL REVEAL (léger, sans lib) ---
const revealEls = document.querySelectorAll(
  '.menu-card, .blog-card, .testimonial-card, .stat, .about-text'
);
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    io.observe(el);
  });
}

// --- MESSAGE MERCI URL PARAM ---
const params = new URLSearchParams(window.location.search);
if (params.get('merci') === '1') {
  const section = document.getElementById('reservation');
  const f = document.getElementById('reservation-form');
  const s = document.getElementById('form-success');
  if (f && s) { f.style.display = 'none'; s.style.display = 'block'; }
  if (section) section.scrollIntoView({ behavior: 'smooth' });
}
