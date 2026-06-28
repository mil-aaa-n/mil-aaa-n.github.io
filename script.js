// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
// ============================================
// Active nav link on scroll
// ============================================
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-link');
function setActiveLink() {
  let current = sections[0].id;
  const scrollPos = window.scrollY + 140;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.id;
    }
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();
// ============================================
// Scroll-reveal for sections, cards, skill bars
// ============================================
const revealTargets = document.querySelectorAll(
  '.section-tag, .section-title, .section-intro, .card, .about-copy, .spec-table, .skill-block, .contact-form, .contact-side'
);
revealTargets.forEach(el => el.classList.add('reveal'));
const skillFills = document.querySelectorAll('.skill-fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => observer.observe(el));
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObserver.observe(el));
// ============================================
// Back-to-top button
// ============================================
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });
toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// ============================================
// Contact form (static front-end only — no backend wired up)
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = '> Message captured locally. Wire this form up to Formspree, EmailJS, or your own backend to actually send it.';
    contactForm.reset();
  });
}
// ============================================
// Navbar background intensity on scroll
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 18px rgba(0,0,0,0.3)' : 'none';
}, { passive: true });

// ============================================
// Certificate modal — opens image/PDF in an overlay
// instead of navigating away from the page
// ============================================
const certModal = document.getElementById('certModal');
const certModalBackdrop = document.getElementById('certModalBackdrop');
const certModalBody = document.getElementById('certModalBody');
const certModalTitle = document.getElementById('certModalTitle');
const certModalClose = document.getElementById('certModalClose');
const certModalDownload = document.getElementById('certModalDownload');

function openCertModal(card) {
  const url = card.getAttribute('data-cert');
  const type = card.getAttribute('data-cert-type') || 'image'; // 'image' or 'pdf'
  const title = card.getAttribute('data-cert-title') || 'Certificate';

  certModalTitle.textContent = title;
  certModalDownload.setAttribute('href', url);

  certModalBody.innerHTML = '';
  if (type === 'pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = title;
    certModalBody.appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = url;
    img.alt = title;
    certModalBody.appendChild(img);
  }

  certModal.classList.add('open');
  certModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModal.classList.remove('open');
  certModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  certModalBody.innerHTML = ''; // stop pdf/image loading once closed
}

document.querySelectorAll('.cert-card[data-cert]').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    openCertModal(card);
  });
});

certModalClose.addEventListener('click', closeCertModal);
certModalBackdrop.addEventListener('click', closeCertModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('open')) {
    closeCertModal();
  }
});
