/* ============================================================
   PRIVATE CAR TRANSFER – Config + Logic
   ============================================================ */
(function () {
  'use strict';

  var TRANSFER_CONFIG = {
    vehicleTypes: [
      {
        id: 'gas7', icon: 'fas fa-car-side', badgeClass: 'tf-badge-gas',
        badgeI18n: 'transfer.badge.gas', nameI18n: 'transfer.vehicle.gas7',
        descI18n: 'transfer.vehicle.gas7Desc',
        image: 'assets/images/produtcs/xe-xang-7c.webp',
        specs: [
          { icon: 'fas fa-users', labelI18n: 'transfer.spec.seats7' },
          { icon: 'fas fa-gas-pump', labelI18n: 'transfer.spec.gas' },
          { icon: 'fas fa-suitcase', labelI18n: 'transfer.spec.luggage' }
        ]
      },
      {
        id: 'gas16', icon: 'fas fa-shuttle-van', badgeClass: 'tf-badge-gas16',
        badgeI18n: 'transfer.badge.gas16', nameI18n: 'transfer.vehicle.gas16',
        descI18n: 'transfer.vehicle.gas16Desc',
        image: 'assets/images/produtcs/xe-16c.webp',
        specs: [
          { icon: 'fas fa-users', labelI18n: 'transfer.spec.seats16' },
          { icon: 'fas fa-gas-pump', labelI18n: 'transfer.spec.gas' },
          { icon: 'fas fa-suitcase', labelI18n: 'transfer.spec.luggage' }
        ]
      }
    ],
    routes: [
      { id: 'muine-hcm', from: 'muine', to: 'sgn', nameI18n: 'transfer.route.muineHcm', distance: '~200 km', duration: '~4h', prices: { gas7: 1750000, gas16: 2600000 }, roundTrip: false },
      { id: 'muine-nhatrang', from: 'muine', to: 'nhatrang', nameI18n: 'transfer.route.muineNt', distance: '~250 km', duration: '~4.5h', prices: { gas7: 1750000, gas16: 2600000 }, roundTrip: false },
      { id: 'nhatrang-hcm', from: 'nhatrang', to: 'sgn', nameI18n: 'transfer.route.ntHcm', distance: '~430 km', duration: '~7.5h', prices: { gas7: 3500000, gas16: 5300000 }, roundTrip: false },
      { id: 'muine-phanrang', from: 'muine', to: 'phanrang', nameI18n: 'transfer.route.muinePhanrang', distance: '~110 km', duration: '~2h', prices: { gas7: 1750000, gas16: 2600000 }, roundTrip: false },
      { id: 'muine-tacu', from: 'muine', to: 'tacu', nameI18n: 'transfer.route.muineTacu', distance: '~30 km', duration: '~1h', prices: { gas7: 1300000, gas16: 1900000 }, roundTrip: true },
      { id: 'muine-kega', from: 'muine', to: 'kega', nameI18n: 'transfer.route.muineKega', distance: '~50 km', duration: '~1.5h', prices: { gas7: 1300000, gas16: 1900000 }, roundTrip: true },
      { id: 'muine-cothach', from: 'muine', to: 'cothach', nameI18n: 'transfer.route.muineCothach', distance: '~80 km', duration: '~2h', prices: { gas7: 1900000, gas16: 2700000 }, roundTrip: true }
    ]
  };
  /* Expose for booking modal auto-detect */
  window.__TRANSFER_CONFIG = TRANSFER_CONFIG;

  var selectedRoute = null;
  var selectedVehicle = null;

  function fmtVND(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫'; }

  function t(key) {
    var trans = window.__MRB_TRANS || {};
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var dict = trans[lang] || trans['vi'] || {};
    return dict[key] || key;
  }

  function renderVehicleCards() {
    var c = document.getElementById('tfVehicles'); if (!c) return;
    var h = '';
    TRANSFER_CONFIG.vehicleTypes.forEach(function (v) {
      var metaHtml = '';
      v.specs.forEach(function (s) {
        metaHtml += '<span><i class="' + s.icon + '"></i> <span data-i18n="' + s.labelI18n + '">' + t(s.labelI18n) + '</span></span>';
      });
      var badgeHtml = (v.badgeI18n && t(v.badgeI18n))
        ? '<span class="tour-badge ' + (v.badgeClass || '') + '" data-i18n="' + v.badgeI18n + '">' + t(v.badgeI18n) + '</span>'
        : '';
      var imgHtml = v.image
        ? '<div class="tour-img-wrap"><img src="' + v.image + '" alt="' + t(v.nameI18n) + '" loading="lazy" decoding="async" width="634" height="475">'
        + badgeHtml
        + '</div>'
        : '';
      h += '<div class="tour-card is-active" data-vehicle-id="' + v.id + '" style="cursor:pointer;">'
        + imgHtml
        + '<div class="tour-body">'
        + '<div class="tour-meta">' + metaHtml + '</div>'
        + '<h3 class="tour-title" data-i18n="' + v.nameI18n + '">' + t(v.nameI18n) + '</h3>'
        + '<p class="tour-desc" data-i18n="' + v.descI18n + '">' + t(v.descI18n) + '</p>'
        + '</div>'
        + '</div>';
    });
    c.innerHTML = h;
  }

  function renderPricingTable() {
    var c = document.getElementById('tfPricingTable'); if (!c) return;
    var th = '<thead><tr><th class="tf-th-route" data-i18n="transfer.th.route"><i class="fas fa-route"></i> <span>' + t('transfer.th.route') + '</span></th>';
    TRANSFER_CONFIG.vehicleTypes.forEach(function (v) {
      th += '<th class="tf-th-vehicle tf-th-' + v.id + '" data-i18n="' + v.nameI18n + '"><i class="' + v.icon + '"></i> <span>' + t(v.nameI18n) + '</span></th>';
    });
    th += '</tr></thead>';
    var tb = '<tbody>';
    TRANSFER_CONFIG.routes.forEach(function (r) {
      var rtBadge = r.roundTrip
        ? ' <span class="tf-meta-badge-rt tf-badge-roundtrip"><i class="fas fa-sync-alt"></i> <span data-i18n="transfer.itineraryNote">' + (t('transfer.itineraryNote') || 'Khứ hồi trong ngày') + '</span></span>'
        : ' <span class="tf-meta-badge-rt tf-badge-oneway"><i class="fas fa-arrow-right"></i> <span data-i18n="transfer.oneWayNote">' + (t('transfer.oneWayNote') || 'Không khứ hồi') + '</span></span>';
      tb += '<tr class="tf-pricing-row" data-route-id="' + r.id + '">'
        + '<td class="tf-td-route" data-route-id="' + r.id + '" data-from="' + r.from + '" data-to="' + r.to + '">'
        + '<div class="tf-route-cell-wrap">'
        + '<span class="tf-route-name" data-i18n="' + r.nameI18n + '">' + t(r.nameI18n) + '</span>'
        + '<div class="tf-route-meta">'
        + '<span class="tf-meta-pill"><i class="fas fa-road"></i> ' + r.distance + '</span>'
        + '<span class="tf-meta-dot">·</span>'
        + '<span class="tf-meta-pill"><i class="fas fa-clock"></i> ' + r.duration + '</span>'
        + rtBadge
        + '</div>'
        + '</div>'
        + '</td>';
      TRANSFER_CONFIG.vehicleTypes.forEach(function (v) {
        var p = r.prices[v.id];
        tb += '<td class="tf-price-cell" data-route-id="' + r.id + '" data-vehicle-id="' + v.id + '">'
          + '<div class="tf-price-cell-wrap">'
          + '<span class="tf-price-val">' + (p ? fmtVND(p) : '—') + '</span>'
          + (p ? '<button type="button" class="tf-price-book-mini" data-vehicle-id="' + v.id + '" data-from="' + r.from + '" data-to="' + r.to + '" aria-label="' + t('transfer.miniBook') + ' ' + t(r.nameI18n) + '"><i class="fa-solid fa-calendar-days"></i> <span data-i18n="transfer.miniBook">' + t('transfer.miniBook') + '</span></button>' : '')
          + '</div>'
          + '</td>';
      });
      tb += '</tr>';
    });
    tb += '</tbody>';
    c.innerHTML = '<table class="tf-table">' + th + tb + '</table>';
  }

  /* ─── Transfer Slider (mirrors Jeep Tours slider) ─── */
  var tfCards = [];
  var tfCurrentIdx = 0;

  function tfCardsPerView() {
    return window.innerWidth > 680 ? 2 : 1;
  }

  function tfBuildDots() {
    var dotsEl = document.getElementById('tfDots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    var perView = tfCardsPerView();
    if (perView >= tfCards.length) {
      dotsEl.style.display = 'none';
      return;
    }
    dotsEl.style.display = '';
    tfCards.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'tours-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Xe ' + (i + 1));
      dot.addEventListener('click', function () { tfGoTo(i); });
      dotsEl.appendChild(dot);
    });
  }

  function tfUpdateUI(idx) {
    var perView = tfCardsPerView();
    var maxIdx = Math.max(0, tfCards.length - perView);
    if (idx > maxIdx) idx = maxIdx;
    if (idx < 0) idx = 0;
    tfCurrentIdx = idx;
    var dotsEl = document.getElementById('tfDots');
    if (dotsEl) {
      dotsEl.querySelectorAll('.tours-dot').forEach(function (d, i) {
        d.classList.toggle('active', i >= idx && i < idx + perView);
      });
    }
    tfCards.forEach(function (card, i) {
      card.classList.toggle('is-active', i >= idx && i < idx + perView);
    });
    var prevBtn = document.querySelector('.tf-arrow-prev');
    var nextBtn = document.querySelector('.tf-arrow-next');
    var showArrows = perView < tfCards.length;
    if (prevBtn) {
      prevBtn.style.display = showArrows ? '' : 'none';
      prevBtn.disabled = false;
    }
    if (nextBtn) {
      nextBtn.style.display = showArrows ? '' : 'none';
      nextBtn.disabled = false;
    }
  }

  function tfGoTo(idx) {
    var card = tfCards[idx];
    if (!card) return;
    tfUpdateUI(idx);
    var grid = document.getElementById('tfVehicles');
    if (!grid) return;
    var isMobile = tfCardsPerView() === 1;
    var scrollTarget = card.offsetLeft;
    grid.style.scrollSnapType = 'none';
    grid.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    setTimeout(function () { grid.style.scrollSnapType = ''; }, 500);
  }

  function initTransferSlider() {
    var grid = document.getElementById('tfVehicles');
    if (!grid) return;
    tfCards = Array.from(grid.querySelectorAll('.tour-card'));
    if (tfCards.length === 0) return;

    tfBuildDots();
    tfUpdateUI(0);

    var prevBtn = document.querySelector('.tf-arrow-prev');
    var nextBtn = document.querySelector('.tf-arrow-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        var perView = tfCardsPerView();
        var maxIdx = Math.max(0, tfCards.length - perView);
        var prev = tfCurrentIdx - perView;
        if (prev < 0) prev = tfCurrentIdx === 0 ? maxIdx : 0;
        tfGoTo(prev);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        var perView = tfCardsPerView();
        var maxIdx = Math.max(0, tfCards.length - perView);
        var next = tfCurrentIdx + perView;
        if (next > maxIdx) next = tfCurrentIdx === maxIdx ? 0 : maxIdx;
        tfGoTo(next);
      });
    }

    /* Mobile swipe support */
    var touchStartX = 0;
    var isDragging = false;
    grid.addEventListener('touchstart', function (e) {
      if (tfCardsPerView() !== 1 || !e.touches[0]) return;
      touchStartX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });
    grid.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      isDragging = false;
      var dx = (e.changedTouches[0] ? e.changedTouches[0].clientX : touchStartX) - touchStartX;
      var maxIdx = Math.max(0, tfCards.length - 1);
      if (Math.abs(dx) > 40) {
        if (dx < 0 && tfCurrentIdx < maxIdx) tfGoTo(tfCurrentIdx + 1);
        else if (dx > 0 && tfCurrentIdx > 0) tfGoTo(tfCurrentIdx - 1);
      }
    }, { passive: true });

    /* Resize handler */
    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        tfBuildDots();
        tfUpdateUI(tfCurrentIdx);
      }, 150);
    });
  }

  function openTransferBooking(opts) {
    opts = opts || {};
    var overlay = document.getElementById('bookingOverlay');
    if (!overlay) return;
    if (window.__configureBookingMode) window.__configureBookingMode('transfer');
    var tourNameEl = document.getElementById('bookingTourName');
    if (tourNameEl) {
      tourNameEl.textContent = t('transfer.bookingTourName') || 'Xe Đưa Đón với Mr. Ben';
      tourNameEl.setAttribute('data-i18n', 'transfer.bookingTourName');
    }

    var vId = (opts && opts.vehicleId) ? opts.vehicleId : '';
    if (window.__setTourType) {
      window.__setTourType(vId);
    } else {
      var btnP = document.getElementById('bfTypePrivate');
      var btn16f = document.getElementById('bfType16');
      if (vId === 'gas7') {
        if (btnP) btnP.classList.add('active');
        if (btn16f) btn16f.classList.remove('active');
      } else if (vId === 'gas16') {
        if (btn16f) btn16f.classList.add('active');
        if (btnP) btnP.classList.remove('active');
      } else {
        if (btnP) btnP.classList.remove('active');
        if (btn16f) btn16f.classList.remove('active');
      }
    }

    if (window.__setTransferPickup) window.__setTransferPickup(opts.pickup || '');
    if (window.__setTransferDropoff) window.__setTransferDropoff(opts.dropoff || '');

    /* Ensure Hotel Name & Hotel Address groups are fully visible */
    var hNameGroup = document.getElementById('bfHotelNameGroup');
    var hAddrGroup = document.getElementById('bfHotelAddressGroup');
    if (hNameGroup) hNameGroup.style.display = '';
    if (hAddrGroup) hAddrGroup.style.display = '';

    if (window.__recordModalOpenTime) window.__recordModalOpenTime();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('mrben-booking-open'));
  }

  /* ─── Transfer Search / Route Finder ─── */

  /* Close all tf-search dropdowns */
  function closeTfSearchDropdowns() {
    document.querySelectorAll('.tf-search-dropdown.open').forEach(function (d) {
      d.classList.remove('open');
      var trigger = d.querySelector('.tf-search-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.tf-search-field.is-open').forEach(function (f) {
      f.classList.remove('is-open');
    });
    document.querySelectorAll('.tf-search-inner.is-open').forEach(function (i) {
      i.classList.remove('is-open');
    });
    document.querySelectorAll('.tf-search.has-open-dropdown').forEach(function (s) {
      s.classList.remove('has-open-dropdown');
    });
  }

  /* Get hidden input value for a dropdown */
  function tfSearchVal(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
  }

  /* Set a dropdown's display value + hidden input + is-selected state */
  function tfSearchSetVal(wrapId, val, label, placeholderKey) {
    var wrap = document.getElementById(wrapId);
    if (!wrap) return;
    var hidden = wrap.querySelector('input[type="hidden"]');
    var valEl = wrap.querySelector('.tf-search-val');
    if (hidden) hidden.value = val;
    if (valEl) {
      valEl.textContent = label || t(placeholderKey) || '';
      valEl.classList.toggle('is-placeholder', !val);
      if (val) {
        valEl.removeAttribute('data-i18n');
      } else {
        valEl.setAttribute('data-i18n', placeholderKey);
      }
    }
    wrap.classList.toggle('is-selected', !!val);
    /* Mark active li & aria-selected */
    wrap.querySelectorAll('.tf-search-list li').forEach(function (li) {
      var isActive = (li.getAttribute('data-val') || '') === (val || '');
      li.classList.toggle('is-active', isActive);
      li.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  /* Update disabled state for From/To lists so pick-up and drop-off cannot be the same */
  function updateTfSearchDisabledStates() {
    var curF = tfSearchVal('tfSearchFrom');
    var curT = tfSearchVal('tfSearchTo');
    var fList = document.getElementById('tfSearchFromList');
    var tList = document.getElementById('tfSearchToList');

    if (fList) {
      fList.querySelectorAll('li').forEach(function (li) {
        var v = li.getAttribute('data-val');
        var isSame = Boolean(v && curT && v === curT);
        li.classList.toggle('is-disabled', isSame);
        if (isSame) {
          li.setAttribute('aria-disabled', 'true');
        } else {
          li.removeAttribute('aria-disabled');
        }
      });
    }

    if (tList) {
      tList.querySelectorAll('li').forEach(function (li) {
        var v = li.getAttribute('data-val');
        var isSame = Boolean(v && curF && v === curF);
        li.classList.toggle('is-disabled', isSame);
        if (isSame) {
          li.setAttribute('aria-disabled', 'true');
        } else {
          li.removeAttribute('aria-disabled');
        }
      });
    }
  }

  function populateSearchDropdowns() {
    /* Vehicle list */
    var vList = document.getElementById('tfSearchVehicleList');
    if (vList) {
      var vHtml = '<li data-val="" role="option" data-i18n="transfer.search.allVehicles">' + t('transfer.search.allVehicles') + '</li>';
      TRANSFER_CONFIG.vehicleTypes.forEach(function (v) {
        vHtml += '<li data-val="' + v.id + '" role="option" data-i18n="' + v.nameI18n + '">' + t(v.nameI18n) + '</li>';
      });
      vList.innerHTML = vHtml;
    }

    /* Collect unique from/to */
    var fromSet = {}, toSet = {};
    TRANSFER_CONFIG.routes.forEach(function (r) {
      fromSet[r.from] = true; toSet[r.to] = true;
      if (!r.roundTrip) { fromSet[r.to] = true; toSet[r.from] = true; }
    });

    /* From list */
    var fList = document.getElementById('tfSearchFromList');
    if (fList) {
      var fHtml = '<li data-val="" role="option" data-i18n="transfer.search.allFrom">' + t('transfer.search.allFrom') + '</li>';
      Object.keys(fromSet).forEach(function (key) {
        fHtml += '<li data-val="' + key + '" role="option" data-i18n="transfer.city.' + key + '">' + t('transfer.city.' + key) + '</li>';
      });
      fList.innerHTML = fHtml;
    }

    /* To list */
    var tList = document.getElementById('tfSearchToList');
    if (tList) {
      var tHtml = '<li data-val="" role="option" data-i18n="transfer.search.allTo">' + t('transfer.search.allTo') + '</li>';
      Object.keys(toSet).forEach(function (key) {
        tHtml += '<li data-val="' + key + '" role="option" data-i18n="transfer.city.' + key + '">' + t('transfer.city.' + key) + '</li>';
      });
      tList.innerHTML = tHtml;
    }

    /* Update display labels & active states from current hidden values */
    var curV = tfSearchVal('tfSearchVehicle');
    var curF = tfSearchVal('tfSearchFrom');
    var curT = tfSearchVal('tfSearchTo');
    var vCfg = null;
    if (curV) {
      TRANSFER_CONFIG.vehicleTypes.forEach(function (v) { if (v.id === curV) vCfg = v; });
    }
    tfSearchSetVal('tfSearchVehicleWrap', curV, vCfg ? t(vCfg.nameI18n) : (curV || t('transfer.search.allVehicles')), 'transfer.search.allVehicles');
    tfSearchSetVal('tfSearchFromWrap', curF, curF ? t('transfer.city.' + curF) : t('transfer.search.allFrom'), 'transfer.search.allFrom');
    tfSearchSetVal('tfSearchToWrap', curT, curT ? t('transfer.city.' + curT) : t('transfer.search.allTo'), 'transfer.search.allTo');
    updateTfSearchDisabledStates();
  }

  var wasTableFiltered = false;

  function applySearchFilter(isExplicitReset) {
    var fV = tfSearchVal('tfSearchVehicle');
    var fF = tfSearchVal('tfSearchFrom');
    var fT = tfSearchVal('tfSearchTo');

    /* Condition: pick-up and drop-off cannot be the same */
    if (fF && fT && fF === fT) {
      tfSearchSetVal('tfSearchToWrap', '', t('transfer.search.allTo'), 'transfer.search.allTo');
      fT = '';
      updateTfSearchDisabledStates();
    }

    var resultBox = document.getElementById('tfSearchResult');
    var resultText = document.getElementById('tfSearchResultText');
    var isFiltering = !!(fV || fF || fT);
    var table = document.querySelector('#tfPricingTable table');
    if (!table) return;

    /* Column visibility */
    var headerCells = table.querySelectorAll('thead th');
    headerCells.forEach(function (th) {
      var m = th.className.match(/tf-th-(gas\d+)/);
      if (m) { th.classList.toggle('tf-col-hidden', !!(fV && m[1] !== fV)); }
      else { th.classList.remove('tf-col-hidden'); }
    });

    /* Row visibility */
    var rows = table.querySelectorAll('tbody .tf-pricing-row');
    var visibleCount = 0;

    rows.forEach(function (row) {
      var td = row.querySelector('.tf-td-route');
      if (!td) return;
      var rFrom = td.getAttribute('data-from');
      var rTo = td.getAttribute('data-to');
      var rId = td.getAttribute('data-route-id');
      var cfg = null;
      TRANSFER_CONFIG.routes.forEach(function (r) { if (r.id === rId) cfg = r; });

      var match = false;
      if (cfg && !cfg.roundTrip) {
        /* Bi-directional transfer route */
        var fwd = (!fF || rFrom === fF) && (!fT || rTo === fT);
        var rev = (!fF || rTo === fF) && (!fT || rFrom === fT);
        match = fwd || rev;
      } else {
        /* One-way or fixed roundtrip route */
        match = (!fF || rFrom === fF) && (!fT || rTo === fT);
      }
      if (fF && fT && fF === fT) { match = false; }
      if (match && fV && cfg && !cfg.prices[fV]) match = false;

      row.classList.toggle('tf-search-hidden', !match);
      if (match) visibleCount++;

      /* Cell column hide */
      row.querySelectorAll('.tf-price-cell').forEach(function (cell) {
        cell.classList.toggle('tf-col-hidden', !!(fV && cell.getAttribute('data-vehicle-id') !== fV));
      });
    });

    /* Remove old no-result row */
    var old = table.querySelector('.tf-no-result-row');
    if (old) old.remove();

    /* Result badge */
    if (resultBox && resultText) {
      if (isFiltering) {
        resultBox.style.display = '';
        if (visibleCount > 0) {
          resultBox.classList.remove('tf-search-no-result');
          resultText.innerHTML = '<i class="fas fa-check-circle"></i> ' + t('transfer.search.resultCount').replace('{n}', visibleCount);
        } else {
          resultBox.classList.add('tf-search-no-result');
          resultText.innerHTML = '<i class="fas fa-times-circle"></i> ' + t('transfer.search.noResult');
          var tbody = table.querySelector('tbody');
          if (tbody) {
            var cols = fV ? 2 : headerCells.length;
            var nr = document.createElement('tr');
            nr.className = 'tf-no-result-row';
            nr.innerHTML = '<td colspan="' + cols + '">' + t('transfer.search.noResult') + '</td>';
            tbody.appendChild(nr);
          }
        }
      } else {
        resultBox.style.display = 'none';
        resultBox.classList.remove('tf-search-no-result');
      }
    }

    /* Update Swap Button highlight state */
    var swapBtn = document.getElementById('tfSearchSwap');
    if (swapBtn) {
      swapBtn.classList.toggle('has-both', !!(fF && fT));
      swapBtn.classList.toggle('has-value', !!(fF || fT));
    }

    /* Single vehicle mode: when 7 chỗ (gas7) or 16 chỗ (gas16) is selected,
       the pricing table on mobile fits 100% width without horizontal scroll */
    var isSingleVehicle = (fV === 'gas7' || fV === 'gas16');
    var tableContainer = document.querySelector('.tf-pricing-table-container');
    var pricingSec = document.querySelector('.tf-pricing');
    var scrollHint = document.querySelector('.tf-pricing-scroll-hint');
    var tfPricingTable = document.getElementById('tfPricingTable');

    if (tableContainer) {
      tableContainer.classList.toggle('is-single-vehicle', isSingleVehicle);
      if (isFiltering) {
        /* Filter applied (single-vehicle or other selections) */
        tableContainer.classList.remove('is-restored');
        tableContainer.classList.remove('is-applied');
        void tableContainer.offsetWidth; // force reflow for smooth animation replay
        tableContainer.classList.add('is-applied');
      } else {
        /* Filter cleared / reset back to initial full table */
        tableContainer.classList.remove('is-applied');
        if (isExplicitReset || wasTableFiltered) {
          tableContainer.classList.remove('is-restored');
          void tableContainer.offsetWidth; // force reflow for restore animation
          tableContainer.classList.add('is-restored');
        } else {
          tableContainer.classList.remove('is-restored');
        }
      }
    }
    wasTableFiltered = isFiltering;

    if (pricingSec) {
      pricingSec.classList.toggle('is-single-vehicle', isSingleVehicle);
    }
    if (scrollHint) {
      scrollHint.classList.toggle('tf-hint-hidden', isSingleVehicle || isFiltering);
    }
    if ((isSingleVehicle || !isFiltering) && tfPricingTable) {
      tfPricingTable.scrollLeft = 0;
    }
  }

  function initTransferSearch() {
    var resetBtn = document.getElementById('tfSearchReset');
    var swapBtn = document.getElementById('tfSearchSwap');
    var wraps = [
      { wrapId: 'tfSearchVehicleWrap', hiddenId: 'tfSearchVehicle', phKey: 'transfer.search.allVehicles' },
      { wrapId: 'tfSearchFromWrap', hiddenId: 'tfSearchFrom', phKey: 'transfer.search.allFrom' },
      { wrapId: 'tfSearchToWrap', hiddenId: 'tfSearchTo', phKey: 'transfer.search.allTo' }
    ];

    populateSearchDropdowns();

    /* Wire each dropdown */
    wraps.forEach(function (cfg) {
      var wrap = document.getElementById(cfg.wrapId);
      if (!wrap) return;
      var trigger = wrap.querySelector('.tf-search-trigger');

      /* Toggle open/close */
      if (trigger) {
        trigger.addEventListener('click', function (e) {
          e.stopPropagation();
          var wasOpen = wrap.classList.contains('open');
          closeTfSearchDropdowns();
          if (!wasOpen) {
            wrap.classList.add('open');
            var field = wrap.closest('.tf-search-field');
            if (field) field.classList.add('is-open');
            var inner = wrap.closest('.tf-search-inner');
            if (inner) inner.classList.add('is-open');
            var search = wrap.closest('.tf-search');
            if (search) search.classList.add('has-open-dropdown');
            trigger.setAttribute('aria-expanded', 'true');
          }
        });
      }

      /* Li click → select value */
      wrap.addEventListener('click', function (e) {
        var li = e.target.closest('.tf-search-list li');
        if (!li) return;
        if (li.classList.contains('is-disabled')) {
          var lang = localStorage.getItem('mrben-lang') || 'vi';
          var tDict = (window.__MRB_TRANS || {})[lang] || {};
          var msg = tDict['transfer.samePointNotice'] || 'Điểm đón và điểm trả không được trùng nhau.';
          if (window.__showSwapBlockedToast) {
            window.__showSwapBlockedToast(msg);
          } else {
            alert(msg);
          }
          return;
        }
        var val = li.getAttribute('data-val') || '';
        var label = li.textContent;
        tfSearchSetVal(cfg.wrapId, val, val ? label : t(cfg.phKey), cfg.phKey);
        closeTfSearchDropdowns();
        updateTfSearchDisabledStates();
        applySearchFilter();
      });
    });

    /* Swap button between Pick-up & Drop-off */
    if (swapBtn) {
      swapBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var curF = tfSearchVal('tfSearchFrom');
        var curT = tfSearchVal('tfSearchTo');
        if (!curF && !curT) return;

        /* If user swaps identical values, do nothing */
        if (curF && curT && curF === curT) return;

        /* Block swap if the target pickup is a drop-off only city */
        var TRANSFER_PICKUP_ALLOWED = { muine: true, sgn: true, nhatrang: true, phanrang: true };
        if (curT && !TRANSFER_PICKUP_ALLOWED[curT]) {
          var lang = localStorage.getItem('mrben-lang') || 'vi';
          var tDict = (window.__MRB_TRANS || {})[lang] || {};
          var msg = tDict['transfer.swapBlocked'] || 'Điểm này chỉ là điểm trả, không thể chọn làm điểm đón.';
          if (window.__showSwapBlockedToast) {
            window.__showSwapBlockedToast(msg);
          } else {
            alert(msg);
          }
          return;
        }

        /* Play spin animation (force reflow for repeated clicks) */
        swapBtn.classList.remove('is-swapping');
        void swapBtn.offsetWidth;
        swapBtn.classList.add('is-swapping');
        setTimeout(function () {
          swapBtn.classList.remove('is-swapping');
        }, 360);

        /* Swap the values */
        tfSearchSetVal('tfSearchFromWrap', curT, curT ? t('transfer.city.' + curT) : t('transfer.search.allFrom'), 'transfer.search.allFrom');
        tfSearchSetVal('tfSearchToWrap', curF, curF ? t('transfer.city.' + curF) : t('transfer.search.allTo'), 'transfer.search.allTo');
        closeTfSearchDropdowns();
        updateTfSearchDisabledStates();
        applySearchFilter();
      });
    }

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.tf-search-dropdown')) {
        closeTfSearchDropdowns();
      }
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeTfSearchDropdowns();
      }
    });

    /* Reset button */
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        var resetIcon = resetBtn.querySelector('i');
        if (resetIcon) {
          resetIcon.style.transition = 'transform 0.45s ease';
          resetIcon.style.transform = 'rotate(-360deg)';
          setTimeout(function () {
            resetIcon.style.transition = '';
            resetIcon.style.transform = '';
          }, 460);
        }

        wraps.forEach(function (cfg) {
          tfSearchSetVal(cfg.wrapId, '', t(cfg.phKey), cfg.phKey);
        });
        if (swapBtn) {
          swapBtn.classList.remove('has-both', 'has-value');
        }
        closeTfSearchDropdowns();
        updateTfSearchDisabledStates();
        applySearchFilter(true);
      });
    }
  }

  function initTransfer() {
    renderVehicleCards();
    renderPricingTable();
    initTransferSlider();
    initTransferSearch();
    updateTfSearchDisabledStates();
    applySearchFilter();

    /* ── CTA "Đặt Xe Ngay" button ── */
    var tfCtaBtn = document.getElementById('tfCtaBookBtn');
    if (tfCtaBtn) {
      tfCtaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var fV = tfSearchVal('tfSearchVehicle');
        var fF = tfSearchVal('tfSearchFrom');
        var fT = tfSearchVal('tfSearchTo');
        openTransferBooking({ vehicleId: fV, pickup: fF, dropoff: fT });
      });
    }

    /* ── Vehicle Card clicks ── */
    var vehiclesWrap = document.getElementById('tfVehicles');
    if (vehiclesWrap) {
      vehiclesWrap.addEventListener('click', function (e) {
        var card = e.target.closest('.tour-card');
        if (!card) return;
        var vId = card.getAttribute('data-vehicle-id');
        openTransferBooking({ vehicleId: vId });
      });
    }

    /* ── Pricing Table: only clicking button .tf-price-book-mini opens booking modal ── */
    var pricingWrap = document.getElementById('tfPricingTable');
    if (pricingWrap) {
      pricingWrap.addEventListener('click', function (e) {
        var bookBtn = e.target.closest('.tf-price-book-mini');
        if (!bookBtn) return;
        e.preventDefault();
        e.stopPropagation();

        var vId = bookBtn.getAttribute('data-vehicle-id');
        var from = bookBtn.getAttribute('data-from');
        var to = bookBtn.getAttribute('data-to');

        openTransferBooking({ vehicleId: vId, pickup: from, dropoff: to });
      });
    }

    /* Sync transfer dynamic content when language changes */
    document.addEventListener('mrben-langchange', function () {
      renderVehicleCards();
      renderPricingTable();
      initTransferSlider();
      populateSearchDropdowns();
      applySearchFilter();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTransfer);
  } else {
    initTransfer();
  }

})();


