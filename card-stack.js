/**
 * CardStack — Interactive 3D Throw Deck
 * Pure Vanilla JavaScript implementation of Kokonut UI's CardStack component.
 * Features:
 * - 3D stacked card deck with perspective layering
 * - Mouse drag & mobile touch swipe with realistic throw physics
 * - Smooth flick / throw off deck animation, cycling to back of stack
 * - Keyboard navigation (ArrowLeft / ArrowRight)
 * - Navigation buttons and progress dot indicators
 */

class CardStack {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.cards = Array.from(this.container.querySelectorAll('.stack-card'));
    this.total = this.cards.length;
    if (this.total === 0) return;

    this.currentIndex = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.throwThreshold = 90; // Pixels required to trigger a throw

    this.prevBtn = document.getElementById('stackPrevBtn');
    this.nextBtn = document.getElementById('stackNextBtn');
    this.dotsContainer = document.getElementById('stackDots');
    this.counter = document.getElementById('stackCounter');

    this.init();
  }

  init() {
    this.renderDots();
    this.updateCardPositions(false);
    this.bindEvents();
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.total; i++) {
      const dot = document.createElement('button');
      dot.className = `stack-dot ${i === this.currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to project card ${i + 1}`);
      dot.addEventListener('click', () => this.goToCard(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateCardPositions(animate = true) {
    this.cards.forEach((card, i) => {
      // Calculate offset relative to currentIndex (with cyclic wrap)
      const offset = (i - this.currentIndex + this.total) % this.total;

      card.style.transition = animate ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, box-shadow 0.4s ease' : 'none';

      if (offset === 0) {
        // Top Active Card
        card.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
        card.style.opacity = '1';
        card.style.zIndex = '30';
        card.style.pointerEvents = 'auto';
        card.classList.add('is-active');
      } else if (offset === 1) {
        // Second Card in Deck
        card.style.transform = 'translate3d(0, 16px, -40px) scale(0.95) rotate(1deg)';
        card.style.opacity = '0.85';
        card.style.zIndex = '20';
        card.style.pointerEvents = 'none';
        card.classList.remove('is-active');
      } else if (offset === 2) {
        // Third Card in Deck
        card.style.transform = 'translate3d(0, 32px, -80px) scale(0.90) rotate(-1deg)';
        card.style.opacity = '0.65';
        card.style.zIndex = '10';
        card.style.pointerEvents = 'none';
        card.classList.remove('is-active');
      } else {
        // Hidden deep in deck
        card.style.transform = 'translate3d(0, 48px, -120px) scale(0.85)';
        card.style.opacity = '0';
        card.style.zIndex = '5';
        card.style.pointerEvents = 'none';
        card.classList.remove('is-active');
      }
    });

    // Update Dots & Counter
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.stack-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
      });
    }

    if (this.counter) {
      this.counter.textContent = `${this.currentIndex + 1} / ${this.total}`;
    }
  }

  throwCard(direction = 'right') {
    const activeCard = this.cards[this.currentIndex];
    if (!activeCard) return;

    // Fly off screen animation
    const flyX = direction === 'right' ? window.innerWidth * 0.7 : -window.innerWidth * 0.7;
    const rotate = direction === 'right' ? 24 : -24;

    activeCard.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease';
    activeCard.style.transform = `translate3d(${flyX}px, 40px, 0) rotate(${rotate}deg)`;
    activeCard.style.opacity = '0';

    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.total;
      this.updateCardPositions(true);
    }, 280);
  }

  prevCard() {
    this.currentIndex = (this.currentIndex - 1 + this.total) % this.total;
    const newActiveCard = this.cards[this.currentIndex];

    // Slide in from side
    newActiveCard.style.transition = 'none';
    newActiveCard.style.transform = 'translate3d(-200px, 0, 0) scale(0.95) rotate(-10deg)';
    newActiveCard.style.opacity = '0';

    requestAnimationFrame(() => {
      this.updateCardPositions(true);
    });
  }

  goToCard(index) {
    if (index === this.currentIndex) return;
    this.currentIndex = index;
    this.updateCardPositions(true);
  }

  bindEvents() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.throwCard('right'));
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevCard());
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      const rect = this.container.getBoundingClientRect();
      // Only react if projects section is roughly in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowRight') {
          this.throwCard('right');
        } else if (e.key === 'ArrowLeft') {
          this.prevCard();
        }
      }
    });

    // Drag / Touch Interactions on Cards
    this.cards.forEach((card) => {
      const startDrag = (clientX, clientY) => {
        if (!card.classList.contains('is-active')) return;
        this.isDragging = true;
        this.startX = clientX;
        this.startY = clientY;
        this.currentX = 0;
        this.currentY = 0;
        card.style.transition = 'none';
      };

      const moveDrag = (clientX, clientY) => {
        if (!this.isDragging || !card.classList.contains('is-active')) return;
        this.currentX = clientX - this.startX;
        this.currentY = clientY - this.startY;

        const rotation = (this.currentX / 15);
        card.style.transform = `translate3d(${this.currentX}px, ${this.currentY * 0.4}px, 0) rotate(${rotation}deg)`;
      };

      const endDrag = () => {
        if (!this.isDragging || !card.classList.contains('is-active')) return;
        this.isDragging = false;

        if (Math.abs(this.currentX) > this.throwThreshold) {
          const direction = this.currentX > 0 ? 'right' : 'left';
          this.throwCard(direction);
        } else {
          // Snap back
          card.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
        }
      };

      // Mouse listeners
      card.addEventListener('mousedown', (e) => {
        // Ignore if clicking directly on a button or link
        if (e.target.closest('a') || e.target.closest('button')) return;
        startDrag(e.clientX, e.clientY);
      });

      window.addEventListener('mousemove', (e) => {
        moveDrag(e.clientX, e.clientY);
      });

      window.addEventListener('mouseup', () => {
        endDrag();
      });

      // Touch listeners for mobile
      card.addEventListener('touchstart', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        if (e.touches.length > 0) {
          startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          moveDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        endDrag();
      });
    });
  }
}

// Auto-initialize CardStack
document.addEventListener('DOMContentLoaded', () => {
  new CardStack('projectCardStack');
});
