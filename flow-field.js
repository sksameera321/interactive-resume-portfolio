/**
 * FlowField — Interactive Canvas Streamlines & Particle Flow
 * Pure Vanilla JavaScript implementation of Kokonut UI's FlowField / Wind component.
 * Features:
 * - Fluid noise-driven vector trajectories
 * - Interactive cursor repulsion & swirl wake
 * - Click scatter / burst shockwave
 * - Theme-reactive colors (Dark & Light modes)
 * - Automatic HiDPI / Retina canvas scaling
 * - Viewport pausing via IntersectionObserver for 60fps performance
 */

class FlowField {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.options = Object.assign({
      particleCount: 350,
      baseSpeed: 1.2,
      trailAlpha: 0.12,
      mouseRadius: 130,
      repulsionStrength: 2.5
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
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.observeTheme();
    this.observeVisibility();
    this.start();
  }

  getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
      bgClear: isDark ? 'rgba(9, 9, 11, 0.16)' : 'rgba(255, 255, 255, 0.18)',
      particleColors: isDark ? [
        'rgba(56, 189, 248, 0.45)', // Sky blue
        'rgba(129, 140, 248, 0.35)', // Indigo
        'rgba(161, 161, 170, 0.3)'   // Zinc
      ] : [
        'rgba(2, 132, 199, 0.35)',   // Deep sky blue
        'rgba(99, 102, 241, 0.3)',   // Indigo
        'rgba(113, 113, 122, 0.25)'  // Slate
      ]
    };
  }

  resize() {
    const parent = this.canvas.parentElement || document.body;
    this.width = parent.clientWidth;
    this.height = parent.clientHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    // Initial background wipe
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    this.ctx.fillStyle = isDark ? '#09090b' : '#ffffff';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  createParticles() {
    this.particles = [];
    const count = Math.min(this.options.particleCount, Math.floor((this.width * this.height) / 2500));
    const colors = this.getThemeColors().particleColors;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: 0,
        vy: 0,
        speed: (Math.random() * 0.8 + 0.6) * this.options.baseSpeed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.5 + 1.2,
        life: Math.random() * 200 + 100,
        maxLife: 300
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    const targetEl = this.canvas.parentElement || window;

    targetEl.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.active = true;
    });

    targetEl.addEventListener('mouseleave', () => {
      this.mouse.active = false;
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    });

    // Touch support for mobile devices
    targetEl.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.touches[0].clientX - rect.left;
        this.mouse.y = e.touches[0].clientY - rect.top;
        this.mouse.active = true;
      }
    }, { passive: true });

    targetEl.addEventListener('touchend', () => {
      this.mouse.active = false;
    });

    // Click scatter burst
    targetEl.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      this.clickShockwaves.push({
        x: clickX,
        y: clickY,
        radius: 10,
        maxRadius: 180,
        strength: 8
      });
    });
  }

  observeTheme() {
    const observer = new MutationObserver(() => {
      const colors = this.getThemeColors().particleColors;
      this.particles.forEach(p => {
        p.color = colors[Math.floor(Math.random() * colors.length)];
      });
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
    const { bgClear } = this.getThemeColors();

    // Semi-transparent background clear for trail streamline effect
    this.ctx.fillStyle = bgClear;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Update active click shockwaves
    for (let i = this.clickShockwaves.length - 1; i >= 0; i--) {
      const wave = this.clickShockwaves[i];
      wave.radius += 6;
      wave.strength *= 0.92;
      if (wave.radius >= wave.maxRadius || wave.strength <= 0.2) {
        this.clickShockwaves.splice(i, 1);
      }
    }

    const time = performance.now() * 0.0004;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Perlin-style curl vector calculation
      const angle = (Math.cos(p.x * 0.0025 + time) + Math.sin(p.y * 0.0025 + time * 0.7)) * Math.PI * 1.5;
      const targetVx = Math.cos(angle) * p.speed;
      const targetVy = Math.sin(angle) * p.speed;

      p.vx += (targetVx - p.vx) * 0.08;
      p.vy += (targetVy - p.vy) * 0.08;

      // Mouse repulsion & swirl wake
      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.options.mouseRadius && dist > 1) {
          const factor = (1 - dist / this.options.mouseRadius) * this.options.repulsionStrength;
          // Normal repulsive force
          p.vx += (dx / dist) * factor * 1.5;
          p.vy += (dy / dist) * factor * 1.5;
          // Slight rotational swirl wake
          p.vx += (-dy / dist) * factor * 0.8;
          p.vy += (dx / dist) * factor * 0.8;
        }
      }

      // Click shockwaves burst
      for (const wave of this.clickShockwaves) {
        const dx = p.x - wave.x;
        const dy = p.y - wave.y;
        const dist = Math.hypot(dx, dy);
        const diff = Math.abs(dist - wave.radius);

        if (diff < 35 && dist > 1) {
          const force = (1 - diff / 35) * wave.strength;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // Update position
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

      // Respawn out of bounds or dead particles
      if (p.x < -20 || p.x > this.width + 20 || p.y < -20 || p.y > this.height + 20 || p.life > p.maxLife) {
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

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('flowFieldCanvas')) {
    new FlowField('flowFieldCanvas', {
      particleCount: 320,
      baseSpeed: 1.1,
      trailAlpha: 0.14,
      mouseRadius: 140,
      repulsionStrength: 2.8
    });
  }
});
