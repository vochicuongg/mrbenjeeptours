/* ============================================================
   DESTINATIONS — Stacked Card Swiper
   Touch/drag to swipe top card away; arrows & dots navigate.
   ============================================================ */
(function () {
  'use strict';

  var MOBILE_BP = 680;

  /* Check if we are on desktop (split-hero layout mode) */
  function isDesktop() {
    return window.innerWidth > MOBILE_BP;
  }

  var stack = document.getElementById('destStack');
  var dotsWrap = document.getElementById('destDots');
  if (!stack || !dotsWrap) return;

  var cards = Array.from(stack.querySelectorAll('.destination-card'));
  var dots = Array.from(dotsWrap.querySelectorAll('.dest-dot'));
  var btnPrev = document.querySelector('.dest-arrow-prev');
  var btnNext = document.querySelector('.dest-arrow-next');
  var total = cards.length;
  var order = []; // indices into cards[] describing front→back order
  var animating = false;

  /* Build initial order: [0, 1, 2, 3] */
  for (var i = 0; i < total; i++) order.push(i);

  /* Apply stacked positions based on current order */
  function applyPositions() {
    for (var p = 0; p < total; p++) {
      var card = cards[order[p]];
      // Skip card that is mid-swipe — its animation is driven by the swipe class
      var isSwiping = card.classList.contains('dest-swipe-left') ||
        card.classList.contains('dest-swipe-right');
      if (isSwiping) continue;
      // Remove all position classes
      card.className = card.className
        .replace(/dest-pos-\d/g, '')
        .replace(/dest-pos-hidden/g, '')
        .replace(/dest-swipe-\w+/g, '')
        .replace(/dest-dragging/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      // Top 4 cards get visible positions, rest are hidden
      if (p <= 3) {
        card.classList.add('dest-pos-' + p);
      } else {
        card.classList.add('dest-pos-hidden');
      }
      card.style.transform = '';
      card.style.opacity = '';
    }
    // Update dots
    dots.forEach(function (d, di) {
      d.classList.toggle('active', di === order[0]);
    });
  }

  var SWIPE_MS = 450; // matches CSS 0.45s

  /* ── Desktop horizontal carousel (>680px): one row, 2 cards
        visible, the track slides by (card width + gap). ── */
  var dIndex = 0;

  function desktopVisible() { return 2; }

  function desktopMaxIndex() {
    return Math.max(0, total - desktopVisible());
  }

  function trackGap() {
    return window.innerWidth >= 961 ? 28 : 20;
  }

  function applyDesktop(instant) {
    if (!cards.length) return;
    dIndex = Math.max(0, Math.min(dIndex, desktopMaxIndex()));
    var step = cards[0].offsetWidth + trackGap();
    if (instant) stack.style.transition = 'none';
    stack.style.transform = 'translateX(' + (-dIndex * step) + 'px)';
    if (instant) {
      void stack.offsetWidth;
      stack.style.transition = '';
    }
    dots.forEach(function (d, di) {
      d.classList.toggle('active', di === dIndex);
      d.style.display = di > desktopMaxIndex() ? 'none' : '';
    });
    // At the ends the arrows turn into wrap-around buttons (icon
    // swap): next at the last position -> back to the start
    // (fa-rotate-left); prev at the first position -> jump to the
    // end (fa-rotate-right).
    if (btnNext) {
      var nIcon = btnNext.querySelector('i');
      if (nIcon) {
        nIcon.className = dIndex >= desktopMaxIndex()
          ? 'fas fa-rotate-left'
          : 'fas fa-chevron-right';
      }
    }
    if (btnPrev) {
      var pIcon = btnPrev.querySelector('i');
      if (pIcon) {
        pIcon.className = dIndex <= 0
          ? 'fas fa-rotate-right'
          : 'fas fa-chevron-left';
      }
    }
  }

  /* Wrap-around navigation: next at the end returns to the first
     position, prev at the start jumps to the last position. */
  function goNextDesktop() {
    dIndex = dIndex >= desktopMaxIndex() ? 0 : dIndex + 1;
    applyDesktop(false);
  }

  function goPrevDesktop() {
    dIndex = dIndex <= 0 ? desktopMaxIndex() : dIndex - 1;
    applyDesktop(false);
  }

  /* ── Autoplay: advance every 2s (desktop only), wrapping from
        the last position back to the first. The ONLY pauses are a
        hidden tab and an active drag — hover / off-screen pauses
        were removed: they silently froze the loop on the last card
        whenever the pointer rested over the section (owner report
        2026-11-24). Manual navigation restarts the 2s countdown. ── */
  var autoTimer = null;
  var resumeTimer = null;

  function stopAutoplay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
    if (resumeTimer) {
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }
  }

  function startInterval() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(function () {
      goNextDesktop();
    }, 2000);
  }

  function syncAutoplay() {
    stopAutoplay();
    if (!isDesktop() || document.hidden) return;
    startInterval();
  }

  /* After a MANUAL interaction (arrow / dot click, drag) the user
     is reading the card they picked: autoplay stays off for 5s,
     then advances once and continues at the normal 2s pace.
     Another manual interaction restarts the 5s wait. */
  function syncAutoplayDelayed() {
    stopAutoplay();
    if (!isDesktop() || document.hidden) return;
    resumeTimer = setTimeout(function () {
      resumeTimer = null;
      if (!isDesktop() || document.hidden) return;
      goNextDesktop();
      startInterval();
    }, 5000);
  }

  document.addEventListener('visibilitychange', syncAutoplay);

  /* Navigate: top card flies out LEFT, cards behind promote up (next ►) */
  function goNext() {
    if (isDesktop()) { goNextDesktop(); syncAutoplayDelayed(); return; }
    if (animating) return;
    animating = true;
    var topCard = cards[order[0]];
    // Remove position class so it doesn't conflict, then swipe out
    topCard.className = topCard.className.replace(/dest-pos-\d/g, '').trim();
    topCard.classList.add('dest-swipe-left');
    // Reorder: move front card to back
    order.push(order.shift());
    // Cards behind naturally promote up via CSS transition (pos-1→pos-0, etc.)
    applyPositions();
    // After swipe animation finishes, reset the swiped card
    setTimeout(function () {
      topCard.classList.remove('dest-swipe-left');
      topCard.style.transition = 'none';
      applyPositions();
      void topCard.offsetWidth;
      topCard.style.transition = '';
      animating = false;
    }, SWIPE_MS);
  }

  /* Navigate: last card comes to front, top card sinks to back (prev ◄ / lùi) */
  function goPrev() {
    if (isDesktop()) { goPrevDesktop(); syncAutoplayDelayed(); return; }
    if (animating) return;
    animating = true;
    // Reorder: move last card to front (reverse of goNext)
    order.unshift(order.pop());
    // Top card becomes pos-0, old top sinks down via CSS transition
    applyPositions();
    setTimeout(function () {
      animating = false;
    }, SWIPE_MS);
  }

  /* Jump to a specific card index (always swipe right for forward steps) */
  function goToIndex(idx) {
    if (isDesktop()) {
      dIndex = Math.max(0, Math.min(idx, desktopMaxIndex()));
      applyDesktop(false);
      syncAutoplayDelayed();
      return;
    }
    if (animating || order[0] === idx) return;
    var posInOrder = order.indexOf(idx);
    var steps = posInOrder;
    (function step(n) {
      if (n <= 0) return;
      goNext();
      setTimeout(function () { step(n - 1); }, SWIPE_MS + 40);
    })(steps);
  }

  /* Arrow buttons */
  if (btnNext) btnNext.addEventListener('click', goNext);
  if (btnPrev) btnPrev.addEventListener('click', goPrev);

  /* Dot buttons */
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var idx = parseInt(dot.getAttribute('data-idx'), 10);
      goToIndex(idx);
    });
  });

  /* ── Touch / mouse drag on top card ── */
  var startX = 0, startY = 0, currentX = 0, isDragging = false;
  var dragCardIdx = -1; // index in cards[] of the card being dragged
  var dragPreview = null; // 'next', 'prev', or null
  var orderSnapshot = null; // order[] snapshot taken at drag start
  var dragLocked = false; // true once horizontal swipe is confirmed
  var dragRejected = false; // true if vertical scroll detected first

  function onPointerDown(e) {
    if (animating || isDesktop()) return;
    var topCard = cards[order[0]];
    if (!topCard.contains(e.target)) return;
    isDragging = true;
    dragLocked = false;
    dragRejected = false;
    dragCardIdx = order[0];
    orderSnapshot = order.slice();
    dragPreview = null;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    currentX = startX;
  }

  function onPointerMove(e) {
    if (!isDragging || dragRejected) return;
    var cx = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    var cy = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    // Phase 1: determine swipe direction (horizontal vs vertical)
    if (!dragLocked) {
      var adx = Math.abs(cx - startX);
      var ady = Math.abs(cy - startY);
      // Need at least 10px movement to decide
      if (adx < 10 && ady < 10) return;
      if (ady > adx) {
        // Vertical scroll — release control, let browser scroll
        dragRejected = true;
        isDragging = false;
        return;
      }
      // Horizontal swipe confirmed — lock drag
      dragLocked = true;
      cards[dragCardIdx].classList.add('dest-dragging');
    }

    // Phase 2: horizontal drag active — prevent scroll
    if (e.cancelable) e.preventDefault();
    currentX = cx;
    var dx = currentX - startX;
    var dragCard = cards[dragCardIdx];
    var rot = dx * 0.06;
    dragCard.style.transform = 'translateX(' + dx + 'px) rotate(' + rot + 'deg)';
    dragCard.style.opacity = Math.max(0.3, 1 - Math.abs(dx) / 400);

    // Determine which preview is needed
    var needed = null;
    if (dx < -30) needed = 'next';
    else if (dx > 30) needed = 'prev';

    if (needed !== dragPreview) {
      dragPreview = needed;
      // Build the background order that matches what will happen after release
      // Start from original snapshot, simulate the reorder, then remove dragged card
      var simOrder = orderSnapshot.slice();
      if (needed === 'next') {
        simOrder.push(simOrder.shift()); // goNext: front → back
      } else if (needed === 'prev') {
        simOrder.unshift(simOrder.pop()); // goPrev: back → front
      }
      // Remove the dragged card from simulated order
      var bgOrder = [];
      for (var i = 0; i < simOrder.length; i++) {
        if (simOrder[i] !== dragCardIdx) bgOrder.push(simOrder[i]);
      }
      // Reset ALL non-dragged cards first (clear stale positions)
      for (var i = 0; i < total; i++) {
        if (i === dragCardIdx) continue;
        var card = cards[i];
        card.className = card.className
          .replace(/dest-pos-\d/g, '')
          .replace(/dest-pos-hidden/g, '')
          .replace(/dest-swipe-\w+/g, '')
          .replace(/dest-dragging/g, '')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }
      // Apply new positions to background cards
      for (var p = 0; p < bgOrder.length; p++) {
        var card = cards[bgOrder[p]];
        var posIdx = p + 1; // +1 because pos-0 is the dragged card visually on top
        if (posIdx <= 3) {
          card.classList.add('dest-pos-' + posIdx);
        } else {
          card.classList.add('dest-pos-hidden');
        }
        card.style.transform = '';
        card.style.opacity = '';
      }
    }
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;

    // If drag was never locked (no horizontal swipe detected), just clean up
    if (!dragLocked) {
      dragCardIdx = -1;
      dragPreview = null;
      orderSnapshot = null;
      return;
    }

    var dragCard = cards[dragCardIdx];
    dragCard.classList.remove('dest-dragging');
    dragCard.style.transform = '';
    dragCard.style.opacity = '';
    var dx = currentX - startX;

    // Restore original order — goNext/goPrev will do their own reorder
    order = orderSnapshot.slice();
    dragPreview = null;
    orderSnapshot = null;

    if (Math.abs(dx) > 70) {
      dx < 0 ? goNext() : goPrev();
    } else {
      // Snap back
      applyPositions();
    }
    dragCardIdx = -1;
  }

  /* ── Desktop track drag (Pointer Events) ── */
  var dDrag = null;

  stack.addEventListener('dragstart', function (e) { e.preventDefault(); });

  stack.addEventListener('pointerdown', function (e) {
    if (!isDesktop()) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    stopAutoplay();
    dDrag = { startX: e.clientX, base: dIndex, moved: false };
    try { stack.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
  });

  stack.addEventListener('pointermove', function (e) {
    if (!dDrag) return;
    var dx = e.clientX - dDrag.startX;
    if (Math.abs(dx) > 6 && !dDrag.moved) {
      dDrag.moved = true;
      stack.classList.add('dest-track-dragging');
    }
    if (dDrag.moved) {
      var step = cards[0].offsetWidth + trackGap();
      stack.style.transform = 'translateX(' + (-dDrag.base * step + dx) + 'px)';
    }
  });

  function endDesktopDrag(e) {
    if (!dDrag) return;
    var dx = e.clientX - dDrag.startX;
    stack.classList.remove('dest-track-dragging');
    if (dDrag.moved) {
      if (dx < -70) goNextDesktop();
      else if (dx > 70) goPrevDesktop();
      else applyDesktop(false);
    } else {
      applyDesktop(false);
    }
    dDrag = null;
    syncAutoplayDelayed();
  }

  stack.addEventListener('pointerup', endDesktopDrag);
  stack.addEventListener('pointercancel', endDesktopDrag);

  stack.addEventListener('mousedown', onPointerDown);
  stack.addEventListener('touchstart', onPointerDown, { passive: true });
  document.addEventListener('mousemove', onPointerMove);
  document.addEventListener('touchmove', onPointerMove, { passive: false });
  document.addEventListener('mouseup', onPointerUp);
  document.addEventListener('touchend', onPointerUp);

  /* Set stack container height based on first card + stacking offset */
  function setStackHeight() {
    if (isDesktop()) {
      stack.style.height = '';
      return;
    }
    // Temporarily make the first card relative to measure
    var firstCard = cards[0];
    firstCard.style.position = 'relative';
    var cardH = firstCard.offsetHeight;
    firstCard.style.position = '';
    stack.style.height = (cardH + 72) + 'px'; // 72px = max stacking offset
  }

  /* Init */
  function initDest() {
    if (isDesktop()) {
      // Desktop: Split-hero layout — remove stacked classes, clear inline styles
      cards.forEach(function (card) {
        card.className = card.className
          .replace(/dest-pos-\d/g, '')
          .replace(/dest-swipe-\w+/g, '')
          .replace(/dest-dragging/g, '')
          .replace(/\s{2,}/g, ' ')
          .trim();
        card.style.transform = '';
        card.style.opacity = '';
        card.style.zIndex = '';
        card.style.transition = '';
        card.style.position = '';
      });
      stack.style.height = '';
      applyDesktop(true);
      syncAutoplay();
      return;
    }
    // Mobile: stacked card swiper — undo desktop carousel state
    stopAutoplay();
    var pI = btnPrev && btnPrev.querySelector('i');
    if (pI) pI.className = 'fas fa-chevron-left';
    var nI = btnNext && btnNext.querySelector('i');
    if (nI) nI.className = 'fas fa-chevron-right';
    stack.style.transform = '';
    dots.forEach(function (d) { d.style.display = ''; });
    setStackHeight();
    applyPositions();
  }

  initDest();
  window.addEventListener('resize', function () {
    initDest();
  });

})();
