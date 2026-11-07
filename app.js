// ==========================================================================
// Theme Management (Dark / Light)
// ==========================================================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Initialize Theme
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

  // Close mobile menu on clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
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
// Interactive Resume Tabs Switcher
// ==========================================================================
const resumeTabs = document.querySelectorAll('.resume-tab');
const timelinePanes = document.querySelectorAll('.timeline-pane');

resumeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = `pane-${tab.getAttribute('data-target')}`;

    // Update active tab button
    resumeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Switch active timeline pane
    timelinePanes.forEach(pane => {
      if (pane.id === targetId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  });
});

// ==========================================================================
// Project Filter Tabs
// ==========================================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter project cards
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ==========================================================================
// Interactive Contact Form Handling
// ==========================================================================
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && formFeedback) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    formFeedback.textContent = `Thank you, ${name}! Your message has been prepared. You can also reach out directly to sksameera321s@gmail.com.`;
    formFeedback.className = 'form-feedback success';

    contactForm.reset();

    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 6000);
  });
}
