/**
 * CardStack — Interactive 3D Throw Deck (Flutter-Free & Buttery Smooth)
 * Pure Vanilla JavaScript implementation of Kokonut UI's CardStack component.
 * Fixes:
 * - Eliminates animation flutter/jitter by managing discrete z-index layers
 * - Smooth simultaneous forward/backward glide without flash
 * - Animation lock (isAnimating) to prevent rapid-click collision
 * - Fluid drag & touch release physics
 */

class CardStack {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.cards = Array.from(this.container.querySelectorAll('.stack-card'));
    this.total = this.cards.length;
    if (this.total === 0) return;

    this.currentIndex = 0;
    this.isAnimating = false;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.throwThreshold = 80;

    this.prevBtn = document.getElementById('stackPrevBtn');
    this.nextBtn = document.getElementById('stackNextBtn');
    this.dotsContainer = document.getElementById('stackDots');
    this.counter = document.getElementById('stackCounter');

    this.init();
  }

  init() {
    this.renderDots();
    this.applyDeckLayout(false);
    this.bindEvents();
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.total; i++) {
      const dot = document.createElement('button');
      dot.className = `stack-dot ${i === this.currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to project card ${i + 1}`);
      dot.addEventListener('click', () => {
        if (!this.isAnimating && i !== this.currentIndex) {
          const dir = i > this.currentIndex ? 'right' : 'left';
          this.nextCard(dir, i);
        }
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  /**
   * Defines exact resting transform and styles for each slot in the 3D deck.
   */
  getSlotStyle(slotIndex) {
    switch (slotIndex) {
      case 0:
        return {
          transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
          opacity: '1',
          zIndex: 30,
          pointerEvents: 'auto'
        };
      case 1:
        return {
          transform: 'translate3d(0, 16px, -40px) scale(0.95) rotate(1.5deg)',
          opacity: '0.85',
          zIndex: 20,
          pointerEvents: 'none'
        };
      case 2:
        return {
          transform: 'translate3d(0, 32px, -80px) scale(0.90) rotate(-1.5deg)',
          opacity: '0.65',
          zIndex: 10,
          pointerEvents: 'none'
        };
      default:
        return {
          transform: 'translate3d(0, 44px, -120px) scale(0.85)',
          opacity: '0',
          zIndex: 5,
          pointerEvents: 'none'
        };
    }
  }

  applyDeckLayout(animate = true) {
    this.cards.forEach((card, i) => {
      const slot = (i - this.currentIndex + this.total) % this.total;
      const style = this.getSlotStyle(slot);

      card.style.transition = animate 
        ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease' 
        : 'none';

      card.style.transform = style.transform;
      card.style.opacity = style.opacity;
      card.style.zIndex = style.zIndex;
      card.style.pointerEvents = style.pointerEvents;

      card.classList.toggle('is-active', slot === 0);
    });

    this.updateControls();
  }

  updateControls() {
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

  /**
   * Throw top card off screen and smoothly elevate the deck underneath
   */
  nextCard(direction = 'right', targetIndex = null) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const currentCard = this.cards[this.currentIndex];
    const nextIndex = targetIndex !== null 
      ? targetIndex 
      : (this.currentIndex + 1) % this.total;

    // 1. Animate current card smoothly off screen
    const flyX = direction === 'right' ? 380 : -380;
    const flyRotate = direction === 'right' ? 14 : -14;

    currentCard.style.transition = 'transform 0.36s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.32s ease';
    currentCard.style.transform = `translate3d(${flyX}px, 20px, 0) rotate(${flyRotate}deg)`;
    currentCard.style.opacity = '0';
    currentCard.style.pointerEvents = 'none';

    // 2. Simultaneously animate cards in deck advancing forward
    this.cards.forEach((card, i) => {
      if (i === this.currentIndex) return;
      const newSlot = (i - nextIndex + this.total) % this.total;
      const style = this.getSlotStyle(newSlot);

      card.style.transition = 'transform 0.36s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.36s ease';
      card.style.transform = style.transform;
      card.style.opacity = style.opacity;
      card.style.zIndex = style.zIndex;
      card.style.pointerEvents = style.pointerEvents;
      card.classList.toggle('is-active', newSlot === 0);
    });

    // 3. When thrown card is fully offscreen, silently move it to bottom of deck without flying back
    setTimeout(() => {
      const bottomSlot = (this.currentIndex - nextIndex + this.total) % this.total;
      const bottomStyle = this.getSlotStyle(bottomSlot);

      currentCard.style.transition = 'none';
      currentCard.style.transform = bottomStyle.transform;
      currentCard.style.zIndex = bottomStyle.zIndex;
      currentCard.style.pointerEvents = bottomStyle.pointerEvents;
      currentCard.classList.remove('is-active');

      // Force style flush
      void currentCard.offsetWidth;

      // Gentle fade into bottom slot
      currentCard.style.transition = 'opacity 0.25s ease';
      currentCard.style.opacity = bottomStyle.opacity;

      this.currentIndex = nextIndex;
      this.updateControls();
      this.isAnimating = false;
    }, 360);
  }

  /**
   * Bring previous card from outside directly onto top of deck
   */
  prevCard() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const prevIndex = (this.currentIndex - 1 + this.total) % this.total;
    const prevCard = this.cards[prevIndex];

    // 1. Prepare previous card off-screen to the left (instantly without transition)
    prevCard.style.transition = 'none';
    prevCard.style.transform = 'translate3d(-340px, 15px, 0) rotate(-12deg)';
    prevCard.style.opacity = '0';
    prevCard.style.zIndex = 35; // Above all cards during entry

    void prevCard.offsetWidth; // Force reflow

    // 2. Slide prevCard in to Top Slot
    prevCard.style.transition = 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease';
    prevCard.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
    prevCard.style.opacity = '1';
    prevCard.style.pointerEvents = 'auto';
    prevCard.classList.add('is-active');

    // 3. Simultaneously push existing cards back one slot
    this.cards.forEach((card, i) => {
      if (i === prevIndex) return;
      const newSlot = (i - prevIndex + this.total) % this.total;
      const style = this.getSlotStyle(newSlot);

      card.style.transition = 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease';
      card.style.transform = style.transform;
      card.style.opacity = style.opacity;
      card.style.zIndex = style.zIndex;
      card.style.pointerEvents = style.pointerEvents;
      card.classList.remove('is-active');
    });

    setTimeout(() => {
      this.currentIndex = prevIndex;
      this.updateControls();
      this.isAnimating = false;
    }, 380);
  }

  bindEvents() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.nextCard('right');
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.prevCard();
      });
    }

    // Keyboard navigation when section in view
    document.addEventListener('keydown', (e) => {
      const rect = this.container.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowRight') {
          this.nextCard('right');
        } else if (e.key === 'ArrowLeft') {
          this.prevCard();
        }
      }
    });

    // Touch & Drag Handling on the Active Card with gesture disambiguation (vertical scroll vs horizontal swipe)
    this.cards.forEach((card) => {
      let isCardDragging = false;
      let startX = 0;
      let startY = 0;
      let currentX = 0;
      let currentY = 0;
      let touchIntent = null; // 'horizontal' | 'vertical' | null

      const startDrag = (clientX, clientY) => {
        if (this.isAnimating || !card.classList.contains('is-active')) return;
        isCardDragging = true;
        this.isDragging = true;
        startX = clientX;
        startY = clientY;
        currentX = 0;
        currentY = 0;
        touchIntent = null;
        card.style.transition = 'none';
      };

      const moveDrag = (clientX, clientY, isTouchEvent = false) => {
        if (!isCardDragging || !card.classList.contains('is-active')) return;
        const diffX = clientX - startX;
        const diffY = clientY - startY;

        if (isTouchEvent) {
          // If gesture intent not resolved yet, determine whether it's page scroll or card swipe
          if (!touchIntent) {
            const absX = Math.abs(diffX);
            const absY = Math.abs(diffY);
            if (absY > 8 && absY >= absX) {
              touchIntent = 'vertical';
              // Abandon card drag so user can naturally scroll the page vertically without jitter
              isCardDragging = false;
              this.isDragging = false;
              card.style.transition = 'transform 0.2s ease';
              card.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
              return;
            } else if (absX > 8 && absX > absY) {
              touchIntent = 'horizontal';
            } else {
              return; // Wait for directional threshold
            }
          }

          if (touchIntent === 'vertical') {
            return;
          }
        }

        currentX = diffX;
        currentY = diffY;
        this.currentX = currentX;

        const rotation = (currentX / 18);
        card.style.transform = `translate3d(${currentX}px, ${currentY * 0.25}px, 0) rotate(${rotation}deg)`;
      };

      const endDrag = (isTouchEvent = false) => {
        if (!isCardDragging && !this.isDragging) return;
        if (!card.classList.contains('is-active')) return;

        isCardDragging = false;
        this.isDragging = false;

        if (isTouchEvent && touchIntent === 'vertical') {
          touchIntent = null;
          return;
        }
        touchIntent = null;

        const effectiveThreshold = window.innerWidth < 480 ? 60 : this.throwThreshold;
        if (Math.abs(currentX) > effectiveThreshold) {
          const dir = currentX > 0 ? 'right' : 'left';
          this.nextCard(dir);
        } else {
          // Smooth snap back
          card.style.transition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
        }
      };

      card.addEventListener('mousedown', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        startDrag(e.clientX, e.clientY);
      });

      window.addEventListener('mousemove', (e) => {
        moveDrag(e.clientX, e.clientY, false);
      });

      window.addEventListener('mouseup', () => {
        endDrag(false);
      });

      card.addEventListener('touchstart', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        if (e.touches.length > 0) {
          startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          moveDrag(e.touches[0].clientX, e.touches[0].clientY, true);
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        endDrag(true);
      });

      window.addEventListener('touchcancel', () => {
        endDrag(true);
      });
    });
  }
}

// Auto-initialize CardStack
document.addEventListener('DOMContentLoaded', () => {
  new CardStack('projectCardStack');
});
