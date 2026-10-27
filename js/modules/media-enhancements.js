/* ============================================================
   HERO VIDEO PLAY/PAUSE CONTROLLER
   ============================================================ */
(function () {
  'use strict';

  var video = document.getElementById('heroVideo');
  var toggleBtn = document.getElementById('heroVideoToggle');
  var pauseIcon = document.getElementById('hvtPause');
  var playIcon = document.getElementById('hvtPlay');

  if (!video || !toggleBtn || !pauseIcon || !playIcon) return;

  /* ─── Ensure video properties for strict autoplay compliance ─── */
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  /* ─── State ─────────────────────────────────────────────── */
  var isPlaying = false;

  function showPause() {
    pauseIcon.style.display = '';
    playIcon.style.display = 'none';
    toggleBtn.setAttribute('aria-label', 'Pause video');
    toggleBtn.classList.add('is-playing');
  }

  function showPlay() {
    pauseIcon.style.display = 'none';
    playIcon.style.display = '';
    toggleBtn.setAttribute('aria-label', 'Play video');
    toggleBtn.classList.remove('is-playing');
  }

  function markReady() {
    video.classList.add('is-ready');
  }

  function playVideo() {
    video.muted = true;
    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        isPlaying = true;
        showPause();
        markReady();
      }).catch(function () {
        /* Autoplay was restricted by browser policy */
        isPlaying = false;
        showPlay();
        // Still reveal the video frame/poster so there is no blank color
        markReady();
      });
    }
  }

  /* ─── Toggle handler ────────────────────────────────────── */
  toggleBtn.addEventListener('click', function () {
    if (isPlaying) {
      video.pause();
      isPlaying = false;
      showPlay();
    } else {
      video.muted = true;
      video.play().then(function () {
        isPlaying = true;
        showPause();
        markReady();
      }).catch(function () { /* ignore */ });
    }
  });

  /* ─── Video readiness event hooks ────────────────────────── */
  video.addEventListener('playing', function () {
    isPlaying = true;
    showPause();
    markReady();
  });

  video.addEventListener('loadeddata', markReady);
  video.addEventListener('canplay', markReady);
  video.addEventListener('timeupdate', function onTime() {
    if (video.currentTime > 0) {
      markReady();
      video.removeEventListener('timeupdate', onTime);
    }
  });

  /* If already decoding or playing before this script was executed */
  if (video.readyState >= 2 || video.currentTime > 0 || !video.paused) {
    markReady();
    if (!video.paused) {
      isPlaying = true;
      showPause();
    }
  }

  /* ─── Attempt autoplay immediately ───────────────────────── */
  playVideo();

  /* ─── Fallback: start video on first user interaction ────── */
  function onFirstInteraction() {
    if (video.paused) {
      playVideo();
    }
    ['touchstart', 'touchend', 'click', 'scroll', 'keydown'].forEach(function (evt) {
      window.removeEventListener(evt, onFirstInteraction, { passive: true });
    });
  }

  ['touchstart', 'touchend', 'click', 'scroll', 'keydown'].forEach(function (evt) {
    window.addEventListener(evt, onFirstInteraction, { passive: true, once: true });
  });

  /* Resume video when tab regains focus */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && isPlaying && video.paused) {
      playVideo();
    }
  });

  /* ─── Count-Up Animation for Trust Badges ──────────────── */
  (function initCountUp() {
    var counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    var animated = false;

    function animateCounters() {
      if (animated) return;
      animated = true;

      counters.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count-target'));
        var decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0;
        var duration = 2000; // ms
        var startTime = null;

        function easeOutQuart(t) {
          return 1 - Math.pow(1 - t, 4);
        }

        function formatNumber(n) {
          var val = decimals > 0 ? n.toFixed(decimals) : String(Math.floor(n));
          return target >= 1000 && decimals === 0 ? Math.floor(n).toLocaleString('en-US') : val;
        }

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var easedProgress = easeOutQuart(progress);
          var current = easedProgress * target;

          el.textContent = formatNumber(current);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = formatNumber(target);
          }
        }

        requestAnimationFrame(step);
      });
    }

    // Use IntersectionObserver to trigger animation when badges are visible
    if ('IntersectionObserver' in window) {
      var trustSection = document.querySelector('.trust-badges');
      if (trustSection) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounters();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });
        observer.observe(trustSection);
      }
    } else {
      // Fallback: animate on page load
      animateCounters();
    }
  })();

  /* ─── Gallery Mobile Auto-Scroll Marquee ──────────────────── */
  (function () {
    var gallery = document.querySelector('.gallery-grid');
    if (!gallery) return;

    var SPEED = 0.8;       // px per frame (~48 px/s @ 60 fps)
    var RESUME_MS = 1500;      // ms before auto-resume after interaction
    var MOBILE_BP = 680;       // must match CSS @media breakpoint

    /* ── state ───────────────────────────────────────────────── */
    var track = null;     // .gallery-track wrapper (created by JS)
    var origItems = [];       // snapshotted before cloning
    var origCount = 0;
    var oneSetW = 0;        // px width of one original set (items + gaps)
    var offset = 0;        // current translateX offset (negative = scrolled right)
    var rafId = null;
    var paused = false;
    var resumeTimer = null;
    var built = false;    // whether the track/clones are in the DOM
    var trackBound = false;

    /* ── Build: wrap items in .gallery-track + clone ─────────── */
    function build() {
      if (built) return;
      origItems = [].slice.call(gallery.querySelectorAll('.gallery-item'));
      origCount = origItems.length;
      if (!origCount) return;

      /* Create track wrapper and move originals into it */
      track = document.createElement('div');
      track.className = 'gallery-track';
      while (gallery.firstChild) track.appendChild(gallery.firstChild);
      gallery.appendChild(track);

      /* Ensure originals are visible (undo scroll-reveal hiding) */
      for (var j = 0; j < origCount; j++) {
        origItems[j].classList.add('revealed');
        origItems[j].style.opacity = '';
        origItems[j].style.transform = '';
      }

      /* Clone originals twice (append to track) */
      for (var s = 0; s < 2; s++) {
        for (var i = 0; i < origCount; i++) {
          var c = origItems[i].cloneNode(true);
          c.setAttribute('aria-hidden', 'true');
          c.classList.add('gallery-clone');
          c.classList.add('revealed');          // ensure scroll-reveal doesn't hide clones
          c.style.opacity = '';                 // clear inline opacity:0 from reveal init
          c.style.transform = '';               // clear inline translateY from reveal init
          var img = c.querySelector('img');
          if (img) img.removeAttribute('loading');
          track.appendChild(c);
        }
      }

      track.offsetHeight;  // force reflow
      measure();
      offset = 0;
      applyTx();
      built = true;
      bindTrack();
    }

    /* ── Tear down ───────────────────────────────────────────── */
    function teardown() {
      if (!built) return;
      var clones = track.querySelectorAll('.gallery-clone');
      for (var i = clones.length - 1; i >= 0; i--) clones[i].parentNode.removeChild(clones[i]);
      while (track.firstChild) gallery.appendChild(track.firstChild);
      gallery.removeChild(track);
      track = null; offset = 0; oneSetW = 0; built = false;
    }

    /* ── Measure one set width ───────────────────────────────── */
    function measure() {
      if (!track) return;
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      var w = 0;
      for (var i = 0; i < origCount; i++) {
        w += origItems[i].getBoundingClientRect().width + gap;
      }
      oneSetW = w;
    }

    function applyTx() {
      if (track) track.style.transform = 'translateX(' + offset + 'px)';
    }

    /* ── Animation tick ────────────────────────────────────── */
    function tick() {
      if (!paused && oneSetW > 0) {
        offset -= SPEED;
        if (-offset >= oneSetW) offset += oneSetW;
        applyTx();
      }
      rafId = requestAnimationFrame(tick);
    }

    function start() {
      if (rafId) return;
      build();
      if (!built) return;
      rafId = requestAnimationFrame(tick);
    }
    function stop() {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }

    /* ── Pause / resume ──────────────────────────────────────── */
    function pauseNow() { paused = true; clearTimeout(resumeTimer); }
    function resumeLater() {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () {
        if (oneSetW > 0) {
          offset = offset % oneSetW;
          if (offset > 0) offset -= oneSetW;
        }
        paused = false;
      }, RESUME_MS);
    }

    /* ── Track interaction events (bound once) ───────────────── */
    function bindTrack() {
      if (trackBound || !track) return;
      trackBound = true;

      /* Touch */
      var tx0 = 0, tOff = 0;
      track.addEventListener('touchstart', function (e) {
        pauseNow();
        tx0 = e.touches[0].clientX; tOff = offset;
      }, { passive: true });
      track.addEventListener('touchmove', function (e) {
        offset = tOff + (e.touches[0].clientX - tx0);
        applyTx();
      }, { passive: true });
      track.addEventListener('touchend', resumeLater, { passive: true });
      track.addEventListener('touchcancel', resumeLater, { passive: true });

      /* Mouse drag */
      var mx0 = 0, mOff = 0, drag = false;
      track.addEventListener('mousedown', function (e) {
        pauseNow(); drag = true;
        mx0 = e.clientX; mOff = offset;
        e.preventDefault();
      });
      window.addEventListener('mousemove', function (e) {
        if (!drag) return;
        offset = mOff + (e.clientX - mx0);
        applyTx();
      });
      window.addEventListener('mouseup', function () {
        if (drag) { drag = false; resumeLater(); }
      });

      /* Wheel */
      track.addEventListener('wheel', function () {
        pauseNow(); resumeLater();
      }, { passive: true });
    }

    /* ── Responsive ──────────────────────────────────────────── */
    function check() {
      if (window.innerWidth <= MOBILE_BP) {
        start();
      } else {
        stop(); teardown(); paused = false;
      }
    }

    var resizeTimer2 = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer2);
      resizeTimer2 = setTimeout(function () {
        if (built) measure();
        check();
      }, 200);
    });

    check();
  })();

})();
