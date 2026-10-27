/* ============================================================
   NAVBAR & NAVIGATION
   Navbar scroll · Mobile menu · Back-to-top · Active links
   ============================================================ */
(function () {
  'use strict';

  /* ─── Element References ──────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const allNavLinks = document.querySelectorAll('.nav-link');

  /* ─── Navbar: Solid on scroll ──────────────────────────────── */
  let isScrolling = false;
  function handleScroll() {
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 60);
        backToTop.classList.toggle('visible', y > 400);
        isScrolling = false;
      });
      isScrolling = true;
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ─── Smooth Scrolling & Active Link Tracking ────────────────── */
  let navLockTimeout = null;

  function updateActiveLink() {
    if (navLockTimeout) return;

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    /* Check if scrolled near the bottom of the page */
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
      currentSectionId = 'contact';
    }

    /* If in tours section, distinguish between Jeep Tours and Xe Đưa Đón */
    if (currentSectionId === 'tours') {
      const transferPanel = document.getElementById('svcPanelTransfer');
      const transferTab = document.querySelector('.svc-tab[data-svc="transfer"]');
      const isTransferActive = (transferPanel && transferPanel.classList.contains('svc-panel--active')) ||
        (transferTab && transferTab.classList.contains('svc-tab--active'));
      if (isTransferActive) {
        currentSectionId = 'transfer';
      }
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');

      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function setActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');

      if (link.getAttribute('href') === `#${targetId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    if (navLockTimeout) clearTimeout(navLockTimeout);
    navLockTimeout = setTimeout(function () {
      navLockTimeout = null;
      updateActiveLink();
    }, 1200);
  }

  window.__mrbUpdateActiveLink = updateActiveLink;
  window.__mrbSetActiveNavLink = setActiveNavLink;

  // Track active section on scroll
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // Enhanced Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();

      if (this.classList.contains('nav-link')) {
        const idName = targetId.replace(/^#/, '');
        setActiveNavLink(idName);
      }

      /* Specific handling for #transfer and #tours */
      if (targetId === '#transfer') {
        if (window.__svcSwitchTab) window.__svcSwitchTab('transfer');
        const sec = document.getElementById('tours');
        if (sec) {
          sec.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        try { history.pushState(null, '', '#transfer'); } catch (_) { }
        return;
      }

      if (targetId === '#tours') {
        if (window.__svcSwitchTab) window.__svcSwitchTab('jeep');
        const sec = document.getElementById('tours');
        if (sec) {
          sec.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        try { history.pushState(null, '', '#tours'); } catch (_) { }
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  updateActiveLink();

  /* ─── Mobile Menu ──────────────────────────────────────────── */
  function closeMenu() {
    if (navLinks) navLinks.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
  window.__mrbCloseMenu = closeMenu;

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks ? navLinks.classList.toggle('open') : false;
      hamburger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (navLinks && navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      (!hamburger || !hamburger.contains(e.target))) {
      closeMenu();
    }
  });

  /* ─── Back to Top ──────────────────────────────────────────── */
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Scroll Reveal ────────────────────────────────────────── */
  const revealTargets = document.querySelectorAll(
    '.feature-card, .gallery-item, .contact-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition =
        'opacity 0.55s ease ' + (i % 4) * 0.08 + 's, ' +
        'transform 0.55s ease ' + (i % 4) * 0.08 + 's';
      observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
  }

  const linkStyle = document.createElement('style');
  linkStyle.textContent = '.nav-link.active{color:var(--color-gold)!important}.nav-link.active::after{width:100%!important}';
  document.head.appendChild(linkStyle);

})();
