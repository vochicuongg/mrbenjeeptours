/* ============================================================
   SERVICE TABS  (Jeep Tour ↔ Xe Đưa Đón)  – switching logic
   ============================================================ */
(function () {
  'use strict';

  /* Header texts per tab – i18n keys */
  var SVC_HEADERS = {
    jeep: {
      eyebrow: 'tours.eyebrow',
      title1: 'tours.title1',
      titleGold: 'tours.titleGold',
      subtitle: 'tours.subtitle'
    },
    transfer: {
      eyebrow: 'transfer.eyebrow',
      title1: 'transfer.title1',
      titleGold: 'transfer.titleGold',
      subtitle: 'transfer.subtitle'
    }
  };

  function t(key) {
    var trans = window.__MRB_TRANS || {};
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var dict = trans[lang] || trans['vi'] || {};
    return dict[key] || key;
  }

  function switchTab(svc) {
    /* tabs */
    var tabs = document.querySelectorAll('.svc-tab');
    tabs.forEach(function (tab) {
      if (tab.getAttribute('data-svc') === svc) {
        tab.classList.add('svc-tab--active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('svc-tab--active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    /* panels */
    var panels = document.querySelectorAll('.svc-panel');
    panels.forEach(function (p) {
      p.classList.remove('svc-panel--active');
    });
    var target = svc === 'transfer'
      ? document.getElementById('svcPanelTransfer')
      : document.getElementById('svcPanelJeep');
    if (target) {
      target.classList.add('svc-panel--active');
      /* re-trigger fade animation */
      target.style.animation = 'none';
      target.offsetHeight; /* force reflow */
      target.style.animation = '';
      if (svc === 'transfer' && window.__tfSyncSlider) {
        window.__tfSyncSlider();
      }
    }

    /* Sync booking modal mode */
    if (window.__configureBookingMode) {
      window.__configureBookingMode(svc === 'transfer' ? 'transfer' : 'jeep');
    } else {
      window.__bookingMode = (svc === 'transfer' ? 'transfer' : 'jeep');
    }

    /* update section header */
    var hdr = SVC_HEADERS[svc] || SVC_HEADERS.jeep;
    var elEyebrow = document.getElementById('svcEyebrow');
    var elTitle1 = document.getElementById('svcTitle1');
    var elGold = document.getElementById('svcTitleGold');
    var elSub = document.getElementById('svcSubtitle');
    if (elEyebrow) { elEyebrow.textContent = t(hdr.eyebrow); elEyebrow.setAttribute('data-i18n', hdr.eyebrow); }
    if (elTitle1) { elTitle1.textContent = t(hdr.title1); elTitle1.setAttribute('data-i18n', hdr.title1); }
    if (elGold) { elGold.textContent = t(hdr.titleGold); elGold.setAttribute('data-i18n', hdr.titleGold); }
    if (elSub) { elSub.textContent = t(hdr.subtitle); elSub.setAttribute('data-i18n', hdr.subtitle); }

    /* Sync navbar active state if tours section is currently in view */
    if (window.__mrbSetActiveNavLink) {
      var toursSec = document.getElementById('tours');
      if (toursSec) {
        var rect = toursSec.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          window.__mrbSetActiveNavLink(svc === 'transfer' ? 'transfer' : 'tours');
        }
      }
    }
  }

  /* Expose switchTab for external use (nav clicks) */
  window.__svcSwitchTab = switchTab;

  function initSvcTabs() {
    var tabsContainer = document.getElementById('svcTabs');
    if (!tabsContainer) return;

    /* Always ensure tabs are visible */
    tabsContainer.classList.add('svc-tabs--visible');

    tabsContainer.addEventListener('click', function (e) {
      var btn = e.target.closest('.svc-tab');
      if (!btn) return;
      var svc = btn.getAttribute('data-svc');
      if (!svc) return;
      switchTab(svc);
      if (svc === 'transfer') {
        history.pushState(null, '', '#transfer');
        if (window.__mrbSetActiveNavLink) window.__mrbSetActiveNavLink('transfer');
      } else {
        history.pushState(null, '', '#tours');
        if (window.__mrbSetActiveNavLink) window.__mrbSetActiveNavLink('tours');
      }
    });

    function scrollToServiceSection() {
      var sec = document.getElementById('tours');
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* Default state: Jeep tour is selected by default; if hash is #transfer, switch to transfer */
    if (window.location.hash === '#transfer') {
      switchTab('transfer');
      if (window.__mrbSetActiveNavLink) window.__mrbSetActiveNavLink('transfer');
      setTimeout(scrollToServiceSection, 300);
    } else {
      switchTab('jeep');
    }

    /* Handle nav click on #transfer link */
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href="#transfer"]');
      if (a) {
        e.preventDefault();
        switchTab('transfer');
        if (window.__mrbSetActiveNavLink) window.__mrbSetActiveNavLink('transfer');
        scrollToServiceSection();
        try { history.pushState(null, '', '#transfer'); } catch (_) { }
        return;
      }
      /* Handle nav click on #tours link → switch to jeep tab */
      var b = e.target.closest('a[href="#tours"]');
      if (b) {
        e.preventDefault();
        switchTab('jeep');
        if (window.__mrbSetActiveNavLink) window.__mrbSetActiveNavLink('tours');
        scrollToServiceSection();
        try { history.pushState(null, '', '#tours'); } catch (_) { }
      }
    });

    /* hashchange */
    window.addEventListener('hashchange', function () {
      if (window.location.hash === '#transfer') {
        switchTab('transfer');
        if (window.__mrbSetActiveNavLink) window.__mrbSetActiveNavLink('transfer');
        scrollToServiceSection();
      } else if (window.location.hash === '#tours') {
        switchTab('jeep');
        if (window.__mrbSetActiveNavLink) window.__mrbSetActiveNavLink('tours');
        scrollToServiceSection();
      }
    });

    /* Sync header texts when language changes */
    document.addEventListener('mrben-langchange', function () {
      var activeTab = document.querySelector('.svc-tab--active');
      var svc = activeTab ? activeTab.getAttribute('data-svc') : 'jeep';
      var hdr = SVC_HEADERS[svc] || SVC_HEADERS.jeep;
      var elEyebrow = document.getElementById('svcEyebrow');
      var elTitle1 = document.getElementById('svcTitle1');
      var elGold = document.getElementById('svcTitleGold');
      var elSub = document.getElementById('svcSubtitle');
      if (elEyebrow) elEyebrow.textContent = t(hdr.eyebrow);
      if (elTitle1) elTitle1.textContent = t(hdr.title1);
      if (elGold) elGold.textContent = t(hdr.titleGold);
      if (elSub) elSub.textContent = t(hdr.subtitle);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSvcTabs);
  } else {
    initSvcTabs();
  }
})();
