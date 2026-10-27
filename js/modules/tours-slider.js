/* ============================================================
   MOBILE TOURS SLIDER
   Activates only on mobile (≤680px). Scroll-snap + arrow buttons.
   Infinite loop: last → first, first → last.
   ============================================================ */
(function () {
  'use strict';

  const MOBILE_BP = 680;
  const LOOP_DELAY = 800; // ms pause at last card before looping back

  const grid = document.getElementById('toursGrid');
  const dotsEl = document.getElementById('toursDots');
  const btnPrev = document.querySelector('.tours-arrow-prev');
  const btnNext = document.querySelector('.tours-arrow-next');

  if (!grid || !dotsEl || !btnPrev || !btnNext) return;

  let cards = [];
  let currentIdx = 0;
  let loopTimeout = null;
  let programmaticScroll = false; // guard: prevent observer from overriding goTo()

  /* ─── Build dots ─────────────────────────────────────────── */
  function buildDots() {
    dotsEl.innerHTML = '';
    cards.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'tours-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Sản phẩm ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsEl.appendChild(dot);
    });
  }

  /* ─── Cards per view (desktop = 3, mobile = 1) ───────────── */
  function cardsPerView() {
    return window.innerWidth >= MOBILE_BP ? 3 : 1;
  }

  /* ─── Update active dot + active card ───────────────────── */
  function updateUI(idx) {
    currentIdx = idx;
    var perView = cardsPerView();

    /* dots: highlight perView consecutive dots */
    dotsEl.querySelectorAll('.tours-dot').forEach(function (d, i) {
      d.classList.toggle('active', i >= idx && i < idx + perView);
    });

    /* cards: all visible cards get is-active (no dimming on desktop) */
    cards.forEach(function (card, i) {
      card.classList.toggle('is-active', i >= idx && i < idx + perView);
    });

    btnPrev.disabled = false;
    btnNext.disabled = false;
  }

  /* ─── Animate incoming active cards ─────────────────────── */
  function animateActiveCards(idx, dir) {
    var perView = cardsPerView();
    var animName = dir === 'prev' ? 'tourCardInPrev' : 'tourCardInNext';
    for (var i = idx; i < idx + perView; i++) {
      (function (c) {
        if (!c) return;
        c.style.animation = 'none';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            c.style.animation = animName + ' 0.42s cubic-bezier(0.25,0.46,0.45,0.94) both';
          });
        });
      })(cards[i]);
    }
  }

  /* ─── Silk-smooth rAF scroll for mobile (zero latency, momentum feel) ─── */
  var scrollAnimId = null;

  function smoothScrollTo(element, targetLeft, duration) {
    if (scrollAnimId) cancelAnimationFrame(scrollAnimId);

    var startLeft = element.scrollLeft;
    var distance = targetLeft - startLeft;

    if (Math.abs(distance) < 1) {
      element.scrollLeft = targetLeft;
      return;
    }

    var startTime = performance.now();

    function step(now) {
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out: smooth, elegant deceleration matching classic feel
      var ease = 1 - Math.pow(1 - progress, 3);

      element.scrollLeft = startLeft + distance * ease;

      if (progress < 1) {
        scrollAnimId = requestAnimationFrame(step);
      } else {
        element.scrollLeft = targetLeft;
        scrollAnimId = null;
      }
    }

    scrollAnimId = requestAnimationFrame(step);
  }

  /* ─── Scroll to card by index ────────────────────────────── */
  function goTo(idx, instant, dir, customDuration) {
    clearTimeout(loopTimeout);
    var card = cards[idx];
    if (!card) return;

    var isMobile = cardsPerView() === 1;
    var duration = customDuration || (isMobile ? 420 : 500);

    /* Block observer from overriding is-active during programmatic scroll */
    programmaticScroll = true;
    setTimeout(function () { programmaticScroll = false; }, 600);

    /* Mark active cards */
    updateUI(idx);

    var scrollTarget = card.offsetLeft;

    if (isMobile) {
      if (instant) {
        if (scrollAnimId) cancelAnimationFrame(scrollAnimId);
        grid.scrollLeft = scrollTarget;
      } else {
        smoothScrollTo(grid, scrollTarget, duration);
      }
    } else {
      /* Temporarily disable scroll-snap on desktop */
      grid.style.scrollSnapType = 'none';
      grid.scrollTo({
        left: scrollTarget,
        behavior: instant ? 'instant' : 'smooth'
      });
      setTimeout(function () {
        grid.style.scrollSnapType = '';
      }, instant ? 50 : 500);

      if (!instant) animateActiveCards(idx, dir || 'next');
    }
  }

  /* ─── Arrow clicks – group-aware loop ───────────────────── */
  btnPrev.addEventListener('click', function () {
    var perView = cardsPerView();
    var maxIdx = cards.length - perView;
    var step = perView; // Desktop jumps by 3, mobile by 1

    var prev = currentIdx - step;
    if (prev < 0) {
      // If we are at the beginning, loop to the end
      prev = currentIdx === 0 ? maxIdx : 0;
    }
    goTo(prev, false, 'prev');
  });

  btnNext.addEventListener('click', function () {
    var perView = cardsPerView();
    var maxIdx = cards.length - perView;
    var step = perView; // Desktop jumps by 3, mobile by 1

    var next = currentIdx + step;
    if (next > maxIdx) {
      // If we exceed maxIdx, loop to start or snap to maxIdx
      next = currentIdx === maxIdx ? 0 : maxIdx;
    }
    goTo(next, false, 'next');
  });

  /* ─── Track active card natively using IntersectionObserver ─────────── */
  function setupObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      /* Skip observer updates during programmatic scrolls or active touch drag */
      if (programmaticScroll || isDragging) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          /* Add is-active to the intersecting card */
          entry.target.classList.add('is-active');
          const idx = cards.indexOf(entry.target);
          if (idx !== -1) {
            currentIdx = idx;
            /* update dots purely visually, don't trigger gotos */
            dotsEl.querySelectorAll('.tours-dot').forEach(function (d, i) {
              d.classList.toggle('active', i === idx);
            });
          }
        } else {
          entry.target.classList.remove('is-active');
        }
      });
    }, {
      root: grid,
      threshold: 0.6 /* Card is considered active when 60% is visible */
    });

    cards.forEach(card => observer.observe(card));
  }

  /* ─── Mobile touch drag & swipe with preview ─────────────── */
  var touchStartX = 0;
  var touchStartY = 0;
  var touchStartTime = 0;
  var touchCurrentX = 0;
  var dragStartIdx = 0;
  var isDragging = false;
  var isLocked = false;
  var isRejected = false;
  var baseScrollLeft = 0;
  var draggedFar = false;

  function onDragStart(clientX, clientY) {
    if (cardsPerView() !== 1) return;
    if (scrollAnimId) {
      cancelAnimationFrame(scrollAnimId);
      scrollAnimId = null;
    }
    grid.style.transition = '';
    grid.style.transform = '';
    touchStartX = clientX;
    touchStartY = clientY;
    touchStartTime = performance.now();
    touchCurrentX = touchStartX;
    dragStartIdx = currentIdx;
    isDragging = true;
    isLocked = false;
    isRejected = false;
    baseScrollLeft = grid.scrollLeft;
    programmaticScroll = false;
  }

  function onDragMove(clientX, clientY, e) {
    if (!isDragging || isRejected || cardsPerView() !== 1) return;

    if (!isLocked) {
      var adx = Math.abs(clientX - touchStartX);
      var ady = Math.abs(clientY - touchStartY);
      if (adx < 8 && ady < 8) return; // 8px dead-zone before decision

      if (ady >= adx) {
        // Vertical scroll dominates -> pass through to page
        isRejected = true;
        isDragging = false;
        return;
      }

      isLocked = true;
      draggedFar = true;
    }

    // Horizontal drag locked: prevent vertical page scroll
    if (e && e.cancelable) e.preventDefault();

    touchCurrentX = clientX;
    var dx = touchCurrentX - touchStartX;
    var maxIdx = cards.length - 1;

    // Resistance / rubberband at outer boundaries of whole slider
    if (dragStartIdx === 0 && dx > 0) {
      grid.scrollLeft = 0;
      grid.style.transform = 'translateX(' + (dx * 0.22) + 'px)';
    } else if (dragStartIdx === maxIdx && dx < 0) {
      grid.scrollLeft = cards[maxIdx].offsetLeft;
      grid.style.transform = 'translateX(' + (dx * 0.22) + 'px)';
    } else {
      // Clamped strictly to adjacent cards: user can preview next or prev, NEVER jump over 2 cards
      var minScroll = (dragStartIdx > 0 && cards[dragStartIdx - 1]) ? cards[dragStartIdx - 1].offsetLeft : 0;
      var maxScroll = (dragStartIdx < maxIdx && cards[dragStartIdx + 1]) ? cards[dragStartIdx + 1].offsetLeft : cards[maxIdx].offsetLeft;
      var rawScroll = baseScrollLeft - dx;

      if (rawScroll < minScroll) {
        var excessR = minScroll - rawScroll;
        grid.scrollLeft = minScroll;
        grid.style.transform = 'translateX(' + (excessR * 0.15) + 'px)';
      } else if (rawScroll > maxScroll) {
        var excessL = rawScroll - maxScroll;
        grid.scrollLeft = maxScroll;
        grid.style.transform = 'translateX(' + (-excessL * 0.15) + 'px)';
      } else {
        grid.style.transform = '';
        grid.scrollLeft = rawScroll;
      }
    }
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;

    // Restore any rubberband transform smoothly
    if (grid.style.transform) {
      grid.style.transition = 'transform 0.35s ease';
      grid.style.transform = '';
      setTimeout(function () {
        grid.style.transition = '';
      }, 360);
    }

    if (!isLocked) {
      draggedFar = false;
      return;
    }

    setTimeout(function () {
      draggedFar = false;
    }, 200);

    var elapsed = performance.now() - touchStartTime;
    var dx = touchCurrentX - touchStartX;
    var maxIdx = cards.length - 1;
    var velocity = Math.abs(dx) / (elapsed || 1); // px/ms

    // Fast flick: released within 350ms, velocity > 0.20 px/ms, moved at least 15px
    var isFlick = elapsed < 350 && velocity > 0.20 && Math.abs(dx) > 15;
    // Normal drag commit threshold: 40px
    var isDragCommit = Math.abs(dx) > 40;

    if (dx < 0 && (isFlick || isDragCommit)) {
      // Swiped left -> Next card relative to the card we started dragging from
      var next = dragStartIdx + 1;
      if (next > maxIdx) next = 0;
      goTo(next, false, 'next');
    } else if (dx > 0 && (isFlick || isDragCommit)) {
      // Swiped right -> Previous card relative to the card we started dragging from
      var prev = dragStartIdx - 1;
      if (prev < 0) prev = maxIdx;
      goTo(prev, false, 'prev');
    } else {
      // Didn't reach threshold -> snap back smoothly to starting card
      goTo(dragStartIdx, false);
    }
  }

  /* Mobile touch listeners */
  grid.addEventListener('touchstart', function (e) {
    if (e.touches && e.touches[0]) {
      onDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  grid.addEventListener('touchmove', function (e) {
    if (e.touches && e.touches[0]) {
      onDragMove(e.touches[0].clientX, e.touches[0].clientY, e);
    }
  }, { passive: false });

  grid.addEventListener('touchend', onDragEnd, { passive: true });
  grid.addEventListener('touchcancel', onDragEnd, { passive: true });

  /* Mouse drag listeners (supports desktop emulation of mobile) */
  grid.addEventListener('mousedown', function (e) {
    if (cardsPerView() !== 1 || e.button !== 0) return;
    onDragStart(e.clientX, e.clientY);

    function onMouseMove(me) {
      onDragMove(me.clientX, me.clientY, me);
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      onDragEnd();
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  /* Block accidental button clicks when user was dragging */
  grid.addEventListener('click', function (e) {
    if (draggedFar) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  /* ─── Init ───────────────────────────────────────────────── */
  function init() {
    cards = Array.from(grid.querySelectorAll('.tour-card'));
    buildDots();
    updateUI(0);

    if (cardsPerView() === 1) {
      setupObserver();
    }

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        buildDots();
        updateUI(currentIdx);
      }, 150);
    });

    /* Block horizontal trackpad/wheel scroll on desktop;
       let vertical scroll pass through to the page */
    grid.addEventListener('wheel', function (e) {
      var isHorizontal = Math.abs(e.deltaX) >= Math.abs(e.deltaY);
      if (isHorizontal) {
        e.preventDefault(); // stop card from drifting sideways
      }
      // vertical deltaY — do NOT prevent default so page scrolls normally
    }, { passive: false });
  }

  init();

})();
