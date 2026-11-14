<div align="center">

# Sameera Bhanu — Interactive Developer Portfolio & ATS Resume

[![Live Deployment](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-38bdf8?style=for-the-badge&logo=github&logoColor=white)](https://sksameera321.github.io/interactive-resume-portfolio/)
[![ATS Resume](https://img.shields.io/badge/ATS%20Resume-Printable%20PDF-10b981?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://sksameera321.github.io/interactive-resume-portfolio/resume.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<p align="center">
  A high-craft developer portfolio and ATS-compliant resume showcase built with <strong>zero external frontend framework bloat</strong>.<br>
  Engineered with <strong>Neumorphic (Soft UI) dual-shadow styling</strong>, <strong>Kokonut UI 3D CardStack</strong>, and <strong>HTML5 Canvas FlowField particle streamlines</strong>.
</p>

[Explore Live Portfolio](https://sksameera321.github.io/interactive-resume-portfolio/) • [View ATS Resume](https://sksameera321.github.io/interactive-resume-portfolio/resume.html) • [GitHub Profile](https://github.com/sksameera321)

</div>

---

## Key Architecture & Features

### 1. Tactile Neumorphic (Soft UI) Design System
- **Off-Surface Dual Lighting**: Directional specular highlights (top-left) and deep shadow drops (bottom-right) engineered on calibrated surfaces (`#131519` dark mode / `#e6ecf4` light mode).
- **Physical Extrusions**: Embossed cards (`.focus-card`, `.skill-category`, `.neu-contact-card`, `.neu-faq-card`) and debossed insets (`--neu-pressed`).
- **Zero-FOUC Theme Resolution**: Synchronous `<head>` theme script and transition suppression eliminates color flicker on page load.

### 2. Kokonut UI Animated SwitchButton
- **Tactile Toggle Control**: Features a sunken/pressed slot track (`var(--neu-pressed)`) and an embossed puck thumb (`var(--neu-subtle)`).
- **Smooth Circular Reveal**: Integrated with the native browser View Transitions API for radial page wipes.

### 3. Kokonut UI CardStack (3D Throw Deck)
- **Discrete 3D Layering**: Perspective-transformed physical card deck with mouse and touch drag physics.
- **Flutter-Free Animation Engine**: Layer-isolated transitions prevent visual clipping and snapping when cycling through projects.

### 4. Interactive HTML5 Canvas FlowField
- **Particle Wind Streamlines**: High-contrast particle flow simulating wind currents behind the hero section.
- **Interactive Cursor Wake & Shockwaves**: Repels particles with cursor velocity and triggers radial shockwaves on user click.

### 5. ATS-Compliant Printable Resume (`resume.html`)
- Dedicated single-column, standard semantic HTML format optimized for ATS parsers (Workday, Greenhouse, Taleo) and print-to-PDF (`@media print` and `@page` rules).

### 6. Full SEO, GEO & AEO Architecture
- **SEO**: Complete Open Graph, Twitter Cards, canonical links, and XML sitemap (`sitemap.xml`).
- **GEO (Generative Engine Optimization & Local SEO)**: Schema.org JSON-LD graph (`Person`, `WebSite`, `ProfilePage`, `ItemList`), geographic coordinates metadata, and standardized `llms.txt` for AI crawlers.
- **AEO (Answer Engine Optimization)**: Schema.org `FAQPage` paired with an accessible, interactive Neumorphic accordion for Featured Snippets and conversational AI queries.

---

## Featured Engineering Projects

| # | Project | Description | Tech Stack | Repository | Live Demo |
|:---:|:---|:---|:---|:---:|:---:|
| 00 | **[Interactive Portfolio](https://sksameera321.github.io/interactive-resume-portfolio/)** | Tactile Neumorphic developer portfolio with Kokonut UI CardStack, FlowField wind canvas, and printable ATS resume | Vanilla JS, CSS3, HTML5, Canvas | [Code](https://github.com/sksameera321/interactive-resume-portfolio) | [Live Site](https://sksameera321.github.io/interactive-resume-portfolio/) |
| 01 | **[LEARNOVA LMS](https://sksameera321.github.io/learnova-lms/)** | Next-gen LMS featuring video theatre, note scratchpad, quiz engine (75% pass mark), and diploma generator | React 19, Vite, React Router, LocalStorage | [Code](https://github.com/sksameera321/learnova-lms) | [Live App](https://sksameera321.github.io/learnova-lms/) |
| 02 | **[NOVA Atelier](https://sksameera321.github.io/nova-ecommerce/)** | Luxury digital salon e-commerce application with DummyJSON API, INR (₹) currency, and physical UI controls | React 19, Vite, Context API, CSS3 | [Code](https://github.com/sksameera321/nova-ecommerce) | [Live App](https://sksameera321.github.io/nova-ecommerce/) |
| 03 | **[Savoria Culinary](https://sksameera321.github.io/recipe-discovery/)** | Recipe discovery platform with dynamic serving scaler, interactive prep checklist, and fullscreen Cook Mode | HTML5, CSS3, Vanilla JS, DummyJSON | [Code](https://github.com/sksameera321/recipe-discovery) | [Live App](https://sksameera321.github.io/recipe-discovery/) |
| 04 | **[Atmosphere](https://sksameera321.github.io/weather-application/)** | Real-time weather explorer querying Open-Meteo REST API live with dynamic solar arcs and extended forecasts | HTML5, CSS Grid, Vanilla JS Modules | [Code](https://github.com/sksameera321/weather-application) | [Live App](https://sksameera321.github.io/weather-application/) |
| 05 | **[FocusFlow OS](https://sksameera321.github.io/personal-productivity-dashboard/)** | Academic productivity OS with Frosted Glassmorphism, Pomodoro timer, Eisenhower matrix, and habit tracking | HTML5, CSS3, Vanilla JS, LocalStorage | [Code](https://github.com/sksameera321/personal-productivity-dashboard) | [Live App](https://sksameera321.github.io/personal-productivity-dashboard/) |
| 06 | **Overview Reel** | Multi-project video walkthrough demonstrating UI components, animations, and dynamic state management | UI/UX & Web Development | — | [0:37 Reel](https://drive.google.com/file/d/1OWFJUhRv1ZI_E-PanuBKt-h2xUL3qeXV/view) |

---

## Education & Development Journey

- **B.Tech in Information Technology**: [Shri Vishnu Engineering College for Women (SVECW)](https://www.linkedin.com/school/15124808/), Bhimavaram &mdash; *1st Year (Expected Graduation: 2029–30)*
- **Intermediate (MPC)**: VIT Junior College &mdash; *98% (982/1000), AP EAMCET Qualified*
- **4-Month Intensive Sprint**: Started frontend development four months ago (July 2026) building [`project-1`](https://github.com/sksameera321/project-1), rapidly expanding into 6+ complete web applications exploring responsive architecture, Neumorphism, and canvas graphics.

---

## Directory Architecture

```text
interactive-resume-portfolio/
├── index.html           # Main Neumorphic portfolio with FlowField, CardStack & FAQ
├── resume.html          # ATS-compliant semantic printable resume
├── resume.css           # Clean high-contrast typography and print styles
├── style.css            # Neumorphic design system, dual shadows, responsive layout
├── flow-field.js        # Vanilla JS particle streamlines and cursor wake physics
├── card-stack.js        # Kokonut UI 3D card throw deck implementation
├── app.js               # Theme switching, mobile menu, navigation observers
├── sitemap.xml          # XML sitemap for search crawlers
├── robots.txt           # Search and AI crawler directives
├── llms.txt             # Standardized markdown specification for LLMs/GEO
├── .nojekyll            # Bypasses Jekyll on GitHub Pages
└── server.js            # Zero-dependency local development server
```

---

## Local Development

Clone the repository and run the local development server:

```bash
# Clone the repository
git clone https://github.com/sksameera321/interactive-resume-portfolio.git
cd interactive-resume-portfolio

# Start the zero-dependency local server
node server.js
```

Open `http://localhost:3000` in your browser.

---

## Contact & Inquiries

- **Author**: Sameera Bhanu (Shaik Sameera Bhanu)
- **Role**: Frontend Developer & UI Engineer
- **LinkedIn**: [shaik-sameera-bhanu](http://linkedin.com/in/shaik-sameera-bhanu-86b67341a/)
- **GitHub**: [@sksameera321](https://github.com/sksameera321)
- **Email**: [sksameera321s@gmail.com](mailto:sksameera321s@gmail.com)
- **Live Portfolio**: [https://sksameera321.github.io/interactive-resume-portfolio/](https://sksameera321.github.io/interactive-resume-portfolio/)
