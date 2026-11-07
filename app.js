// ==========================================================================
// Theme Management (Dark / Light)
// ==========================================================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// ==========================================================================
// Mobile Navigation
// ==========================================================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      navMenu.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ==========================================================================
// Active Navigation on Scroll
// ==========================================================================
const sections = document.querySelectorAll('section[id]');

function highlightActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', highlightActiveNav);

// ==========================================================================
// Contact Form Feedback
// ==========================================================================
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && formFeedback) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;

    formFeedback.textContent = `Thanks, ${name}. Message received! You can also email sksameera321s@gmail.com directly.`;
    formFeedback.className = 'form-feedback success';

    contactForm.reset();

    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 6000);
  });
}
