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

## 🌟 Key Architecture & Features

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

## 🚀 Featured Projects & Verified Video Demos

| # | Project | Description | Tech Stack | Repository | Video Demo |
|:---:|:---|:---|:---|:---:|:---:|
| 🌟 | **[Interactive Portfolio](https://sksameera321.github.io/interactive-resume-portfolio/)** | Tactile Neumorphic developer portfolio with Kokonut UI CardStack, FlowField wind canvas, and printable ATS resume | Vanilla JS, CSS3, HTML5, Canvas | [Code](https://github.com/sksameera321/interactive-resume-portfolio) | [Live Site](https://sksameera321.github.io/interactive-resume-portfolio/) |
| 01 | **Amazon Storefront Clone** | High-fidelity e-commerce clone featuring product grids, search filtering, LocalStorage cart state, and checkout flows | HTML5, CSS3, JS, LocalStorage | [Code](https://github.com/sksameera321/my-amazon-project) | [0:15 Demo](https://drive.google.com/file/d/1vBxMT2haRQDCjNWgYsZ4KhKN909NZv04/view) |
| 02 | **Restaurant Menu & Ordering System** | Interactive dining menu platform with food category navigation, dietary filtering, and dynamic pricing | HTML5, CSS Grid, JavaScript | [Code](https://github.com/sksameera321/my-kiya.in) | [0:24 Demo](https://drive.google.com/file/d/12rQlzYPinf89SOhVtE6lbwoPuD80IWwC/view) |
| 03 | **Game Hub Arcade Portal** | Curated browser gaming portal with state tracking, interactive canvas/DOM rendering, and high scores | HTML5, CSS3, JavaScript | [Code](https://github.com/sksameera321/hub) | [0:21 Demo](https://drive.google.com/file/d/1Ia3XCRzb9veiDdnWv--5ELKrrxatajaT/view) |
| 04 | **AI Tools Directory Hub** | Curated developer directory aggregating modern AI tools with dynamic search and model capabilities | HTML5, CSS3, JavaScript | [Code](https://github.com/sksameera321/Ai-hub) | [0:20 Demo](https://drive.google.com/file/d/1sZB9c1j2Q6eUAvfUvzlQ_1pTnuAzO-9f/view) |
| 05 | **Interactive Rock Paper Scissors Game** | Interactive browser game featuring algorithmic move randomization, score persistence, and CSS animations | HTML5, CSS3, JavaScript | [Code](https://github.com/sksameera321/my-game-project) | [0:31 Demo](https://drive.google.com/file/d/10ZMaAQo4xXNs3P36zQYvPwB21Pd2r3Fh/view) |
| 🎬 | **Multi-Project Walkthrough Reel** | Comprehensive walkthrough video covering multiple frontend projects and UI engineering workflows | UI/UX & Web Development | — | [0:37 Reel](https://drive.google.com/file/d/1OWFJUhRv1ZI_E-PanuBKt-h2xUL3qeXV/view) |

---

## 📂 Project Directory Structure

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

## 💻 Local Development

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

## 📬 Contact & Connect

- **Author**: Sameera Bhanu (Shaik Sameera Bhanu)
- **Role**: Frontend Developer & UI Engineer
- **LinkedIn**: [shaik-sameera-bhanu](http://linkedin.com/in/shaik-sameera-bhanu-86b67341a/)
- **GitHub**: [@sksameera321](https://github.com/sksameera321)
- **Email**: [sksameera321s@gmail.com](mailto:sksameera321s@gmail.com)
- **Live Portfolio**: [https://sksameera321.github.io/interactive-resume-portfolio/](https://sksameera321.github.io/interactive-resume-portfolio/)
