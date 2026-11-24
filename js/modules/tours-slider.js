/* ============================================================
   TOURS SLIDER
   Arrows loop (last → first, first → last) on all sizes.
   Mobile swipe uses the Transfer slider's model: no finger-follow
   drag — a horizontal swipe past 40px triggers one native smooth
   slide to the adjacent card, clamped at the first/last card.
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

  /* ─── Scroll to card by index ────────────────────────────── */
  function goTo(idx, instant, dir) {
    clearTimeout(loopTimeout);
    var card = cards[idx];
    if (!card) return;

    var isMobile = cardsPerView() === 1;

    /* Mark active cards */
    updateUI(idx);

    var scrollTarget = card.offsetLeft;

    /* Same slide as the Transfer slider: native smooth scroll with
       scroll-snap paused during the animation */
    grid.style.scrollSnapType = 'none';
    grid.scrollTo({
      left: scrollTarget,
      behavior: instant ? 'instant' : 'smooth'
    });
    setTimeout(function () {
      grid.style.scrollSnapType = '';
    }, instant ? 50 : 500);

    if (!isMobile && !instant) animateActiveCards(idx, dir || 'next');
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

  /* ─── Mobile swipe — same model as the Transfer slider ──────
     No finger-follow drag: a horizontal swipe past 40px triggers
     one smooth slide to the adjacent card; swipes clamp at the
     first/last card (the arrows keep the loop behaviour). */
  var touchStartX = 0;
  var swipeTracking = false;

  grid.addEventListener('touchstart', function (e) {
    if (cardsPerView() !== 1 || !e.touches[0]) return;
    touchStartX = e.touches[0].clientX;
    swipeTracking = true;
  }, { passive: true });

  grid.addEventListener('touchend', function (e) {
    if (!swipeTracking) return;
    swipeTracking = false;
    var dx = (e.changedTouches[0] ? e.changedTouches[0].clientX : touchStartX) - touchStartX;
    var maxIdx = cards.length - 1;
    if (Math.abs(dx) > 40) {
      if (dx < 0 && currentIdx < maxIdx) goTo(currentIdx + 1, false, 'next');
      else if (dx > 0 && currentIdx > 0) goTo(currentIdx - 1, false, 'prev');
    }
  }, { passive: true });

  /* ─── Init ───────────────────────────────────────────────── */
  function init() {
    cards = Array.from(grid.querySelectorAll('.tour-card'));
    buildDots();
    updateUI(0);

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
