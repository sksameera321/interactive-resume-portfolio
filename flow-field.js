/**
 * FlowField — Interactive Canvas Streamlines & Particle Flow (Kokonut UI Wind Component)
 * - Dynamic high-contrast streamlines (boldly visible in both dark & light modes)
 * - Interactive cursor repulsion & rotational wake
 * - Click scatter shockwaves
 * - ResizeObserver to guarantee 100% full-coverage behind hero content
 * - Frosted glass integration so particles swim underneath cards and text
 */

class FlowField {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.options = Object.assign({
      particleCount: 450,
      baseSpeed: 1.6,
      mouseRadius: 150,
      repulsionStrength: 3.2
    }, options);

    this.particles = [];
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.animationFrameId = null;
    this.isRunning = false;

    this.mouse = {
      x: -9999,
      y: -9999,
      active: false
    };

    this.clickShockwaves = [];

    this.init();
  }

  init() {
    this.setupResizeObserver();
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.observeTheme();
    this.observeVisibility();
    this.start();
  }

  getThemeConfig() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    if (isDark) {
      return {
        bgClear: 'rgba(19, 21, 25, 0.12)', // Matches Neumorphic dark surface #131519
        particleColors: [
          'rgba(56, 189, 248, 0.85)',  // Electric sky cyan
          'rgba(129, 140, 248, 0.80)', // Bright indigo
          'rgba(192, 132, 252, 0.75)', // Neon violet
          'rgba(255, 255, 255, 0.85)', // Crisp white wind streak
          'rgba(52, 211, 153, 0.70)'   // Emerald accent
        ]
      };
    } else {
      return {
        bgClear: 'rgba(230, 236, 244, 0.14)', // Matches Neumorphic light surface #e6ecf4
        particleColors: [
          'rgba(2, 132, 199, 0.85)',   // Deep cobalt blue
          'rgba(67, 56, 202, 0.80)',   // Deep indigo
          'rgba(30, 41, 59, 0.75)',    // Slate ink
          'rgba(14, 165, 233, 0.90)',  // Cyan highlight
          'rgba(79, 70, 229, 0.80)'    // Vivid purple
        ]
      };
    }
  }

  setupResizeObserver() {
    const parent = this.canvas.parentElement || document.body;
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        this.resize();
        this.createParticles();
      });
      ro.observe(parent);
    } else {
      window.addEventListener('resize', () => {
        this.resize();
        this.createParticles();
      });
    }
  }

  resize() {
    const parent = this.canvas.parentElement || document.body;
    const rect = parent.getBoundingClientRect();
    this.width = Math.max(rect.width, 320);
    this.height = Math.max(rect.height, 480);

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    // Initial clear
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    this.ctx.fillStyle = isDark ? '#09090b' : '#ffffff';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  createParticles() {
    this.particles = [];
    const minParticles = this.width < 768 ? 140 : 280;
    const count = Math.min(this.options.particleCount, Math.max(minParticles, Math.floor((this.width * this.height) / 2000)));
    const colors = this.getThemeConfig().particleColors;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: 0,
        vy: 0,
        speed: (Math.random() * 1.1 + 0.8) * this.options.baseSpeed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.6 + 1.2,
        life: Math.random() * 180 + 80,
        maxLife: 280
      });
    }
  }

  bindEvents() {
    const targetEl = this.canvas.parentElement || window;

    // Track mouse everywhere inside the hero section (over text, buttons, cards)
    const handleMove = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = clientX - rect.left;
      this.mouse.y = clientY - rect.top;
      this.mouse.active = true;
    };

    targetEl.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    targetEl.addEventListener('mouseleave', () => {
      this.mouse.active = false;
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    });

    targetEl.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    targetEl.addEventListener('touchend', () => {
      this.mouse.active = false;
    });

    // Click scatter shockwave
    targetEl.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.clickShockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 12,
        maxRadius: 220,
        strength: 10
      });
    });
  }

  observeTheme() {
    const observer = new MutationObserver(() => {
      const colors = this.getThemeConfig().particleColors;
      this.particles.forEach(p => {
        p.color = colors[Math.floor(Math.random() * colors.length)];
      });
      // Clear canvas with new theme background
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      this.ctx.fillStyle = isDark ? '#131519' : '#e6ecf4';
      this.ctx.fillRect(0, 0, this.width, this.height);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  observeVisibility() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.start();
        } else {
          this.stop();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.canvas);
  }

  update() {
    const { bgClear } = this.getThemeConfig();

    // Fade trail
    this.ctx.fillStyle = bgClear;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Shockwaves
    for (let i = this.clickShockwaves.length - 1; i >= 0; i--) {
      const wave = this.clickShockwaves[i];
      wave.radius += 7;
      wave.strength *= 0.93;
      if (wave.radius >= wave.maxRadius || wave.strength <= 0.2) {
        this.clickShockwaves.splice(i, 1);
      }
    }

    const time = performance.now() * 0.00045;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Wind Vector Field (Trigonometric curl field mimicking atmospheric wind)
      const angle = (Math.cos(p.x * 0.0022 + time) + Math.sin(p.y * 0.0022 + time * 0.8)) * Math.PI * 1.6;
      const targetVx = Math.cos(angle) * p.speed;
      const targetVy = Math.sin(angle) * p.speed;

      p.vx += (targetVx - p.vx) * 0.09;
      p.vy += (targetVy - p.vy) * 0.09;

      // Mouse repulsion and wake swirl
      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.options.mouseRadius && dist > 1) {
          const factor = (1 - dist / this.options.mouseRadius) * this.options.repulsionStrength;
          p.vx += (dx / dist) * factor * 1.8;
          p.vy += (dy / dist) * factor * 1.8;
          // Fluid rotational curl
          p.vx += (-dy / dist) * factor * 1.2;
          p.vy += (dx / dist) * factor * 1.2;
        }
      }

      // Click bursts
      for (const wave of this.clickShockwaves) {
        const dx = p.x - wave.x;
        const dy = p.y - wave.y;
        const dist = Math.hypot(dx, dy);
        const diff = Math.abs(dist - wave.radius);

        if (diff < 40 && dist > 1) {
          const force = (1 - diff / 40) * wave.strength;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // Position update
      const prevX = p.x;
      const prevY = p.y;
      p.x += p.vx;
      p.y += p.vy;

      // Draw streamline segment
      this.ctx.beginPath();
      this.ctx.moveTo(prevX, prevY);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.strokeStyle = p.color;
      this.ctx.lineWidth = p.size;
      this.ctx.lineCap = 'round';
      this.ctx.stroke();

      p.life++;

      // Respawn
      if (p.x < -30 || p.x > this.width + 30 || p.y < -30 || p.y > this.height + 30 || p.life > p.maxLife) {
        p.x = Math.random() * this.width;
        p.y = Math.random() * this.height;
        p.vx = 0;
        p.vy = 0;
        p.life = 0;
      }
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const render = () => {
      if (!this.isRunning) return;
      this.update();
      this.animationFrameId = requestAnimationFrame(render);
    };

    this.animationFrameId = requestAnimationFrame(render);
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('flowFieldCanvas')) {
    new FlowField('flowFieldCanvas', {
      particleCount: 480,
      baseSpeed: 1.5,
      mouseRadius: 160,
      repulsionStrength: 3.2
    });
  }
});
