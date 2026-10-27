/* ============================================================
   i18n LANGUAGE SWITCHER & AUTO-DETECTION
   ============================================================ */
(function () {
  'use strict';

  const TRANSLATIONS = window.__MRB_TRANS || {};

  /* Language switcher elements */
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  const langArrow = document.getElementById('langArrow');
  const langFlagActive = document.getElementById('langFlagActive');
  const langCodeActive = document.getElementById('langCodeActive');
  const langOptions = document.querySelectorAll('.lang-option');

  /* ─── Apply translations ──────────────────────────────────── */
  let currentLang = localStorage.getItem('mrben-lang') || 'vi';

  function applyTranslations(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['vi'];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.setAttribute('placeholder', t[key]);
      }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-title');
      if (t[key] !== undefined) {
        el.setAttribute('title', t[key]);
        if (el.hasAttribute('aria-label')) {
          el.setAttribute('aria-label', t[key]);
        }
      }
    });
    /* Update <html lang> attribute for accessibility */
    document.documentElement.lang = lang;

    /* Update <title> and <meta name="description"> for SEO */
    if (t['_meta.title']) {
      document.title = t['_meta.title'];
    }
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t['_meta.description']) {
      metaDesc.setAttribute('content', t['_meta.description']);
    }
  }

  /* ─── Language Switcher ───────────────────────────────────── */
  let langOpen = false;

  function openLang() {
    langOpen = true;
    langDropdown.classList.add('open');
    langBtn.classList.add('open');
    langArrow.classList.add('rotated');
    langBtn.setAttribute('aria-expanded', 'true');
  }

  function closeLang() {
    langOpen = false;
    langDropdown.classList.remove('open');
    langBtn.classList.remove('open');
    langArrow.classList.remove('rotated');
    langBtn.setAttribute('aria-expanded', 'false');
  }

  langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    langOpen ? closeLang() : openLang();
  });

  langOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      const lang = option.getAttribute('data-lang');
      const flag = option.getAttribute('data-flag');
      const label = option.getAttribute('data-label');

      /* Update the active button */
      langFlagActive.src = flag;
      langFlagActive.alt = label;
      langCodeActive.textContent = label;

      /* Mark chosen option as active */
      langOptions.forEach(function (o) { o.classList.remove('active'); });
      option.classList.add('active');

      /* Apply translations */
      currentLang = lang;
      localStorage.setItem('mrben-lang', lang);
      applyTranslations(lang);

      /* Notify other components (e.g. booking modal phone code) */
      document.dispatchEvent(new CustomEvent('mrben-langchange', { detail: { lang: lang } }));

      closeLang();
    });
  });

  /* Close dropdown when clicking outside */
  document.addEventListener('click', function (e) {
    if (langOpen && !langBtn.closest('.lang-switcher').contains(e.target)) {
      closeLang();
    }
  });

  /* Escape key closes dropdown */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLang();
      if (typeof window.__mrbCloseMenu === 'function') {
        window.__mrbCloseMenu();
      }
    }
  });

  /* Restore saved language or auto-detect from device/browser settings */
  (function initLang() {
    let saved = null;
    const supportedLangs = ['vi', 'en', 'ru', 'zh', 'ko', 'de'];

    // 1. Check URL query parameter (e.g., ?lang=en, ?lang=ru)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryLang = urlParams.get('lang');
      if (queryLang && supportedLangs.includes(queryLang.toLowerCase())) {
        saved = queryLang.toLowerCase();
        localStorage.setItem('mrben-lang', saved);
      }
    } catch (e) {}

    // 2. Check saved language from localStorage
    if (!saved) {
      saved = localStorage.getItem('mrben-lang');
    }

    // 3. If no saved language, auto-detect from device/browser
    if (!saved) {
      // Get full browser language (e.g., 'vi-VN', 'en-US', 'ru-RU', 'zh-CN', 'ko-KR', 'de-DE')
      const fullLang = navigator.language || navigator.userLanguage || '';
      const browserLang = fullLang.substring(0, 2).toLowerCase();

      // Map browser language codes to supported languages
      let detectedLang = 'en'; // fallback default

      if (supportedLangs.includes(browserLang)) {
        detectedLang = browserLang;
      } else if (fullLang.toLowerCase().startsWith('zh')) {
        // Chinese variants (zh-CN, zh-TW, zh-HK) → 'zh'
        detectedLang = 'zh';
      } else if (fullLang.toLowerCase().startsWith('ko')) {
        // Korean variants → 'ko'
        detectedLang = 'ko';
      } else if (fullLang.toLowerCase().startsWith('ru')) {
        // Russian variants → 'ru'
        detectedLang = 'ru';
      } else if (fullLang.toLowerCase().startsWith('de')) {
        // German variants → 'de'
        detectedLang = 'de';
      } else if (fullLang.toLowerCase().startsWith('vi')) {
        // Vietnamese variants → 'vi'
        detectedLang = 'vi';
      }

      saved = detectedLang;

      // Save auto-detected language to localStorage for consistency
      localStorage.setItem('mrben-lang', saved);

      console.log('🌐 Auto-detected language from device:', fullLang, '→', saved);
    }

    const savedOption = document.querySelector('.lang-option[data-lang="' + saved + '"]');
    if (savedOption) {
      langOptions.forEach(function (o) { o.classList.remove('active'); });
      savedOption.classList.add('active');
      langFlagActive.src = savedOption.getAttribute('data-flag');
      langFlagActive.alt = savedOption.getAttribute('data-label');
      langCodeActive.textContent = savedOption.getAttribute('data-label');
      currentLang = saved;
    }
    applyTranslations(currentLang);
    /* Notify components to sync with initial language (e.g. phone code dropdown) */
    document.dispatchEvent(new CustomEvent('mrben-langchange', { detail: { lang: currentLang } }));
  })();
})();
