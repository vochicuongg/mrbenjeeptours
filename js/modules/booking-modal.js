/* ============================================================
   BOOKING MODAL
   ============================================================ */
(function () {
  'use strict';

  /* ── Prices (VND, raw numbers) ── */
  var PRICE_PRIVATE = 500000;
  var PRICE_GROUP = 150000;

  /* ── State ── */
  var tourType = ''; // 'private' | 'group' | ''
  var guests = 1;
  var vehicleCount = 1;
  var tourName = 'Xe Jeep Mr. Ben';
  var tourNameVi = 'Xe Jeep Mr. Ben'; // luôn là tiếng Việt, dùng cho chatbot
  var pricePrivate = PRICE_PRIVATE;
  var priceGroup = PRICE_GROUP;

  /* ── Transfer mode state ── */
  window.__bookingMode = 'jeep'; // 'jeep' | 'transfer'
  var tfSelectedRoute = null;   // route object from TRANSFER_CONFIG
  var tfSelectedVehicle = '';   // 'gas7' | 'gas16'

  /* ── Element refs ── */
  var overlay = document.getElementById('bookingOverlay');
  var closeBtn = document.getElementById('bookingClose');
  var tourNameEl = document.getElementById('bookingTourName');
  var bpbPrivate = document.getElementById('bpbPrivate');
  var bpbGroup = document.getElementById('bpbGroup');
  var btnPrivate = document.getElementById('bfTypePrivate');
  var btnGroup = document.getElementById('bfTypeGroup');
  var btn16 = document.getElementById('bfType16');
  var addonSandDune = document.getElementById('bfAddonSandDune');
  var addonSandDuneSelected = false;

  /* Addon toggle */
  if (addonSandDune) {
    addonSandDune.addEventListener('click', function () {
      addonSandDuneSelected = !addonSandDuneSelected;
      addonSandDune.classList.toggle('selected', addonSandDuneSelected);
      updatePrice();
      refreshWALink();
    });
  }

  var guestGroup = document.getElementById('bfGuestGroup');
  var vehicleGroup = document.getElementById('bfVehicleGroup');
  var guestVal = document.getElementById('bfGuestVal');
  var minusBtn = document.getElementById('bfMinus');
  var plusBtn = document.getElementById('bfPlus');
  var vehicleVal = document.getElementById('bfVehicleVal');
  var vehicleMinusBtn = document.getElementById('bfVehicleMinus');
  var vehiclePlusBtn = document.getElementById('bfVehiclePlus');
  var unitPriceEl = document.getElementById('bfUnitPrice');
  var totalEl = document.getElementById('bfTotal');
  var waBtn = document.getElementById('bfWhatsApp');
  var dtInput = document.getElementById('bfDatetime');

  if (!overlay) return;

  /* ── Transfer hotel visibility controller ── */
  function checkTransferHotelVisibility() {
    var hNameGroup = document.getElementById('bfHotelNameGroup');
    var hAddrGroup = document.getElementById('bfHotelAddressGroup');
    var hCustomGroup = document.getElementById('bfHotelCustomGroup');
    var hotelWrapCheck = document.getElementById('bfHotelWrap');

    /* Hotel Name and Hotel Address must always remain visible in both Jeep & Transfer mode */
    if (hNameGroup) hNameGroup.style.display = '';
    if (hAddrGroup) hAddrGroup.style.display = '';
    if (hCustomGroup) {
      hCustomGroup.style.display = (hotelWrapCheck && hotelWrapCheck.classList.contains('is-other-selected')) ? '' : 'none';
    }
  }

  function normalizeTransferCity(val) {
    if (!val) return '';
    var s = String(val).trim().toLowerCase();
    if (s === 'muine' || /m[uũ]i\s*n[eé]|phan\s*thi[eế]t|муйне|美奈|무이네/i.test(s)) return 'muine';
    if (s === 'sgn' || /h[cồ]m|s[aà]i\s*g[oò]n|sgn|t[aâ]n\s*s[oơ]n|tan\s*son|airport|flughafen|хошимин|таншон|胡志明|新山一|호치민|탄손/i.test(s)) return 'sgn';
    if (s === 'nhatrang' || /nha\s*trang|нячанг|芽庄|나트랑/i.test(s)) return 'nhatrang';
    if (s === 'phanrang' || /phan\s*rang|фанранг|潘朗|판랑/i.test(s)) return 'phanrang';
    if (s === 'tacu' || /t[aà]\s*c[uú]|та\s*ку|达固|따꾸/i.test(s)) return 'tacu';
    if (s === 'kega' || /k[eê]\s*g[aà]|ке\s*га|科加|께가/i.test(s)) return 'kega';
    if (s === 'cothach' || /c[oổ]\s*th[aạ]ch|ch[uù]a\s*c[oổ]\s*th[aạ]ch|ко\s*тхать|古石|꼬탁/i.test(s)) return 'cothach';
    return s;
  }

  function getTransferCityName(code, lang) {
    var c = normalizeTransferCity(code);
    var l = lang || localStorage.getItem('mrben-lang') || 'vi';
    var t = (window.__MRB_TRANS || {})[l] || {};
    if (c === 'muine') return t['transfer.city.muine'] || 'Mũi Né';
    if (c === 'sgn') return t['transfer.city.sgn'] || 'Sân bay Tân Sơn Nhất (SGN)';
    if (c === 'nhatrang') return t['transfer.city.nhatrang'] || 'Nha Trang';
    if (c === 'phanrang') return t['transfer.city.phanrang'] || 'Biển Phan Rang';
    if (c === 'tacu') return t['transfer.city.tacu'] || 'Núi Tà Cú';
    if (c === 'kega') return t['transfer.city.kega'] || 'Mũi Kê Gà';
    if (c === 'cothach') return t['transfer.city.cothach'] || 'Chùa Cổ Thạch';
    return code || '';
  }

  /* ── Cities allowed as pickup point ── */
  var TRANSFER_PICKUP_ALLOWED = { muine: true, sgn: true, nhatrang: true, phanrang: true };

  /* ── Danh sách tuyến đường đưa đón (dự phòng độc lập) ── */
  var KNOWN_TRANSFER_ROUTES = [
    ['muine', 'sgn'],
    ['muine', 'nhatrang'],
    ['nhatrang', 'sgn'],
    ['muine', 'phanrang'],
    ['muine', 'tacu'],
    ['muine', 'kega'],
    ['muine', 'cothach']
  ];

  /* ── Check if a valid transfer route exists between two cities ── */
  function hasTransferRoute(cityA, cityB) {
    if (!cityA || !cityB) return false;
    var a = normalizeTransferCity(cityA);
    var b = normalizeTransferCity(cityB);
    if (!a || !b || a === b) return false;
    var cfg = window.__TRANSFER_CONFIG;
    if (cfg && cfg.routes) {
      return cfg.routes.some(function (r) {
        var rFrom = normalizeTransferCity(r.from);
        var rTo = normalizeTransferCity(r.to);
        return (rFrom === a && rTo === b) || (rTo === a && rFrom === b);
      });
    }
    return KNOWN_TRANSFER_ROUTES.some(function (pair) {
      return (pair[0] === a && pair[1] === b) || (pair[1] === a && pair[0] === b);
    });
  }

  /* ── Transfer dropdown disabled state updater ── */
  function updateTransferDropdownDisabledStates() {
    var pIn = document.getElementById('bfTfPickup');
    var dIn = document.getElementById('bfTfDropoff');
    var pVal = pIn ? normalizeTransferCity(pIn.value) : '';
    var dVal = dIn ? normalizeTransferCity(dIn.value) : '';

    var pList = document.getElementById('bfTfPickupList');
    var dList = document.getElementById('bfTfDropoffList');

    if (pList) {
      pList.querySelectorAll('li').forEach(function (li) {
        var v = normalizeTransferCity(li.getAttribute('data-val'));
        var isDisabled = Boolean(dVal && (v === dVal || !hasTransferRoute(v, dVal)));
        li.classList.toggle('is-disabled', isDisabled);
        if (isDisabled) {
          li.setAttribute('aria-disabled', 'true');
        } else {
          li.removeAttribute('aria-disabled');
        }
      });
    }

    if (dList) {
      dList.querySelectorAll('li').forEach(function (li) {
        var v = normalizeTransferCity(li.getAttribute('data-val'));
        var isDisabled = Boolean(pVal && (v === pVal || !hasTransferRoute(pVal, v)));
        li.classList.toggle('is-disabled', isDisabled);
        if (isDisabled) {
          li.setAttribute('aria-disabled', 'true');
        } else {
          li.removeAttribute('aria-disabled');
        }
      });
    }
  }

  function setTransferPickup(city) {
    var pIn = document.getElementById('bfTfPickup');
    var pValEl = document.getElementById('bfTfPickupVal');
    var pTrigger = document.getElementById('bfTfPickupTrigger');
    var pList = document.getElementById('bfTfPickupList');

    var dIn = document.getElementById('bfTfDropoff');
    var currentDropoff = dIn ? normalizeTransferCity(dIn.value) : '';
    var normCity = normalizeTransferCity(city);

    /* Guard: block non-pickup cities */
    if (normCity && !TRANSFER_PICKUP_ALLOWED[normCity]) {
      var lang = localStorage.getItem('mrben-lang') || 'vi';
      var t = (window.__MRB_TRANS || {})[lang] || {};
      var msg = t['transfer.swapBlocked'] || 'Điểm này chỉ là điểm trả, không thể chọn làm điểm đón.';
      showSwapBlockedToast(msg);
      return;
    }

    if (normCity && currentDropoff && (normCity === currentDropoff || !hasTransferRoute(normCity, currentDropoff))) {
      setTransferDropoff('');
    }

    if (pIn) pIn.value = normCity;
    if (pValEl) {
      if (normCity) {
        var lang = localStorage.getItem('mrben-lang') || 'vi';
        pValEl.textContent = getTransferCityName(normCity, lang);
        pValEl.classList.remove('is-placeholder');
      } else {
        var lang = localStorage.getItem('mrben-lang') || 'vi';
        var t = (window.__MRB_TRANS || {})[lang] || {};
        pValEl.textContent = t['transfer.phPickupInput'] || 'Chọn điểm đón';
        pValEl.classList.add('is-placeholder');
      }
    }
    var pSelect = document.getElementById('bfTfPickupSelect');
    if (pTrigger) {
      pTrigger.classList.remove('bf-error');
      pTrigger.classList.toggle('is-selected', Boolean(normCity));
    }
    if (pSelect) {
      pSelect.classList.toggle('is-selected', Boolean(normCity));
    }
    if (pList) {
      var items = pList.querySelectorAll('li');
      items.forEach(function (li) {
        var v = normalizeTransferCity(li.getAttribute('data-val'));
        li.classList.toggle('is-active', Boolean(normCity && v === normCity));
      });
    }

    var pdRow = document.querySelector('.bf-pickup-dropoff-row');
    if (pdRow) {
      var dVal = dIn ? normalizeTransferCity(dIn.value) : '';
      pdRow.classList.toggle('has-both-selected', Boolean(normCity && dVal));
    }

    updateTransferDropdownDisabledStates();
    checkTransferHotelVisibility();
    if (window.__bookingMode === 'transfer') {
      if (typeof autoDetectTransferRoute === 'function') autoDetectTransferRoute();
      if (typeof refreshWALink === 'function') refreshWALink();
    }
  }

  function setTransferDropoff(city) {
    var dIn = document.getElementById('bfTfDropoff');
    var dValEl = document.getElementById('bfTfDropoffVal');
    var dTrigger = document.getElementById('bfTfDropoffTrigger');
    var dSelect = document.getElementById('bfTfDropoffSelect');
    var dList = document.getElementById('bfTfDropoffList');

    var pIn = document.getElementById('bfTfPickup');
    var currentPickup = pIn ? normalizeTransferCity(pIn.value) : '';
    var normCity = normalizeTransferCity(city);

    if (normCity && currentPickup && (normCity === currentPickup || !hasTransferRoute(currentPickup, normCity))) {
      setTransferPickup('');
    }

    if (dIn) dIn.value = normCity;
    if (dValEl) {
      if (normCity) {
        var lang = localStorage.getItem('mrben-lang') || 'vi';
        dValEl.textContent = getTransferCityName(normCity, lang);
        dValEl.classList.remove('is-placeholder');
      } else {
        var lang = localStorage.getItem('mrben-lang') || 'vi';
        var t = (window.__MRB_TRANS || {})[lang] || {};
        dValEl.textContent = t['transfer.phDropoff'] || 'Chọn điểm trả...';
        dValEl.classList.add('is-placeholder');
      }
    }
    if (dTrigger) {
      dTrigger.classList.remove('bf-error');
      dTrigger.classList.toggle('is-selected', Boolean(normCity));
    }
    if (dSelect) {
      dSelect.classList.toggle('is-selected', Boolean(normCity));
    }
    if (dList) {
      var items = dList.querySelectorAll('li');
      items.forEach(function (li) {
        var v = normalizeTransferCity(li.getAttribute('data-val'));
        li.classList.toggle('is-active', Boolean(normCity && v === normCity));
      });
    }

    var pdRow = document.querySelector('.bf-pickup-dropoff-row');
    if (pdRow) {
      var pVal = pIn ? normalizeTransferCity(pIn.value) : '';
      pdRow.classList.toggle('has-both-selected', Boolean(pVal && normCity));
    }

    updateTransferDropdownDisabledStates();
    checkTransferHotelVisibility();
    if (window.__bookingMode === 'transfer') {
      if (typeof autoDetectTransferRoute === 'function') autoDetectTransferRoute();
      if (typeof refreshWALink === 'function') refreshWALink();
    }
  }

  window.__checkTransferHotelVisibility = checkTransferHotelVisibility;
  window.__setTransferPickup = setTransferPickup;
  window.__setTransferDropoff = setTransferDropoff;
  window.__updateTransferDropdownDisabledStates = updateTransferDropdownDisabledStates;
  window.__normalizeTransferCity = normalizeTransferCity;
  window.__getTransferCityName = getTransferCityName;
  window.__hasTransferRoute = hasTransferRoute;

  /* ── Hàm kiểm tra thông minh: Đang đặt Xe Đưa Đón hay Tour Xe Jeep ── */
  function isTransferBooking() {
    // 1. Kiểm tra trực tiếp cờ window.__bookingMode (nguồn sự thật cao nhất)
    if (window.__bookingMode === 'jeep') return false;
    if (window.__bookingMode === 'transfer') return true;

    // 2. Nhóm chọn tuyến đường xe đưa đón đang hiển thị trong modal
    var tfRouteGroup = document.getElementById('bfTransferRouteGroup');
    var isRouteVisible = (tfRouteGroup && tfRouteGroup.style.display !== 'none');

    // 3. Có dữ liệu chọn Điểm đón hoặc Điểm trả
    var pIn = document.getElementById('bfTfPickup');
    var dIn = document.getElementById('bfTfDropoff');
    var pVal = (pIn && pIn.value) ? pIn.value.trim() : '';
    var dVal = (dIn && dIn.value) ? dIn.value.trim() : '';
    var hasRouteVal = (pVal !== '' || dVal !== '');

    // 4. Biến tfSelectedVehicle mang giá trị loại xe đưa đón
    var isTfVehicle = (tfSelectedVehicle === 'gas7' || tfSelectedVehicle === 'gas16');

    // 5. Nút toggle đang active là xe đưa đón (gas7, gas16)
    var activeToggle = document.querySelector('.bf-toggle-row .bf-toggle.active');
    var dType = activeToggle ? activeToggle.getAttribute('data-type') : '';
    var isTfToggle = (dType === 'gas7' || dType === 'gas16');

    // 6. Tiêu đề tour hoặc form đang mang nội dung xe đưa đón
    var tn = document.getElementById('bookingTourName');
    var isTfTitle = (tn && (
      tn.getAttribute('data-i18n') === 'transfer.bookingTourName' ||
      (tn.textContent && (
        tn.textContent.indexOf('Xe Đưa Đón') !== -1 ||
        tn.textContent.indexOf('Transfer') !== -1 ||
        tn.textContent.indexOf('Трансфер') !== -1 ||
        tn.textContent.indexOf('接送') !== -1 ||
        tn.textContent.indexOf('픽업') !== -1
      ))
    ));

    if (isRouteVisible || hasRouteVal || isTfVehicle || isTfToggle || isTfTitle) {
      window.__bookingMode = 'transfer';
      return true;
    }
    return false;
  }
  window.__isTransferBooking = isTransferBooking;

  /* ── Transfer mode: configure which sections to show/hide ── */
  function configureBookingMode(mode) {
    window.__bookingMode = mode;
    var isTransfer = (mode === 'transfer');
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var t = (window.__MRB_TRANS || {})[lang] || {};

    if (!isTransfer) {
      tfSelectedVehicle = '';
      tfSelectedRoute = null;
      var pTrig = document.getElementById('bfTfPickupTrigger');
      var dTrig = document.getElementById('bfTfDropoffTrigger');
      var pSel = document.getElementById('bfTfPickupSelect');
      var dSel = document.getElementById('bfTfDropoffSelect');
      var pdRow = document.querySelector('.bf-pickup-dropoff-row');
      if (pTrig) pTrig.classList.remove('is-selected');
      if (dTrig) dTrig.classList.remove('is-selected');
      if (pSel) pSel.classList.remove('is-selected');
      if (dSel) dSel.classList.remove('is-selected');
      if (pdRow) pdRow.classList.remove('has-both-selected');

      // Xóa sạch giá trị input điểm đón và trả của xe đưa đón
      if (typeof setTransferPickup === 'function') setTransferPickup('');
      if (typeof setTransferDropoff === 'function') setTransferDropoff('');
      var pIn = document.getElementById('bfTfPickup');
      var dIn = document.getElementById('bfTfDropoff');
      if (pIn) pIn.value = '';
      if (dIn) dIn.value = '';
      var pValEl = document.getElementById('bfTfPickupVal');
      if (pValEl) {
        pValEl.textContent = t['transfer.phPickupInput'] || 'Chọn điểm đón';
        pValEl.classList.add('is-placeholder');
      }
      var dValEl = document.getElementById('bfTfDropoffVal');
      if (dValEl) {
        dValEl.textContent = t['transfer.phDropoff'] || 'Chọn điểm trả...';
        dValEl.classList.add('is-placeholder');
      }
    } else {
      /* BẮT BUỘC: Khi kích hoạt chế độ Xe Đưa Đón, xóa sạch tourType để cô lập dữ liệu hoàn toàn */
      tourType = '';
    }

    /* Đồng bộ trạng thái chọn Ngày & Giờ độc lập theo từng chế độ (Jeep vs Transfer) */
    if (typeof window.__syncPickerMode === 'function') {
      window.__syncPickerMode(mode);
    }

    /* Pickup/Dropoff row */
    var tfRouteGroup = document.getElementById('bfTransferRouteGroup');
    if (tfRouteGroup) tfRouteGroup.style.display = isTransfer ? '' : 'none';

    /* Price bar: hide for transfer (no private/group distinction) */
    var priceBar = document.querySelector('.booking-price-bar');
    if (priceBar) priceBar.style.display = isTransfer ? 'none' : '';

    /* Tour type label → Loại Xe in transfer mode */
    var tourTypeLabel = document.querySelector('[data-i18n="booking.labelTourType"]');
    if (tourTypeLabel) {
      tourTypeLabel.textContent = isTransfer
        ? (t['transfer.labelVehicleType'] || 'Loại Xe')
        : (t['booking.labelTourType'] || 'Loại Tour');
    }

    /* Tour type toggle buttons */
    if (btnPrivate) {
      var privateIcon = btnPrivate.querySelector('i');
      var privateSpan = btnPrivate.querySelector('span');
      if (isTransfer) {
        if (privateIcon) privateIcon.className = 'fas fa-car-side';
        if (privateSpan) privateSpan.textContent = t['transfer.vehicleGas'] || 'Xe 7 Chỗ';
        btnPrivate.setAttribute('data-type', 'gas7');
        btnPrivate.classList.toggle('active', tfSelectedVehicle === 'gas7');
      } else {
        if (privateIcon) privateIcon.className = 'fas fa-user-shield';
        if (privateSpan) privateSpan.textContent = t['booking.typePrivate'] || 'Tour Riêng Tư';
        btnPrivate.setAttribute('data-type', 'private');
        btnPrivate.classList.toggle('active', tourType === 'private');
      }
    }
    if (btnGroup) {
      var groupIcon = btnGroup.querySelector('i');
      var groupSpan = btnGroup.querySelector('span');
      if (isTransfer) {
        btnGroup.style.display = 'none';
        btnGroup.classList.remove('active');
      } else {
        btnGroup.style.display = '';
        if (groupIcon) groupIcon.className = 'fas fa-users';
        if (groupSpan) groupSpan.textContent = t['booking.typeGroup'] || 'Tour Ghép';
        btnGroup.setAttribute('data-type', 'group');
        btnGroup.classList.toggle('active', tourType === 'group');
      }
    }

    /* 16-seat button: show only in transfer mode */
    if (btn16) {
      if (isTransfer) {
        btn16.style.display = '';
        var btn16Icon = btn16.querySelector('i');
        var btn16Span = btn16.querySelector('span');
        if (btn16Icon) btn16Icon.className = 'fas fa-shuttle-van';
        if (btn16Span) btn16Span.textContent = t['transfer.vehicle16'] || 'Xe 16 Chỗ';
        btn16.setAttribute('data-type', 'gas16');
        btn16.classList.toggle('active', tfSelectedVehicle === 'gas16');
      } else {
        btn16.style.display = 'none';
        btn16.classList.remove('active');
      }
    }

    /* Hide Vehicle Quantity + Guest counter in transfer mode (no need) */
    if (isTransfer) {
      if (vehicleGroup) vehicleGroup.style.display = 'none';
      if (guestGroup) guestGroup.style.display = 'none';
    }

    /* Addon sand dune: hide in transfer mode */
    var addonGroup = addonSandDune ? addonSandDune.closest('.bf-group') : null;
    if (addonGroup) addonGroup.style.display = isTransfer ? 'none' : '';

    /* Itinerary: hide in transfer mode */
    var itinGroup = document.getElementById('bfItineraryGroup');
    if (itinGroup) itinGroup.style.display = isTransfer ? 'none' : '';

    /* Transfer itinerary: hide in jeep mode, reset in transfer mode */
    var tfItinGroup = document.getElementById('bfTransferItineraryGroup');
    if (tfItinGroup) tfItinGroup.style.display = 'none';

    /* Hotel section: always shown in both jeep and transfer modes */
    updateTransferDropdownDisabledStates();
    checkTransferHotelVisibility();

    /* Notes placeholder */
    var notesEl = document.getElementById('bfNotes');
    if (notesEl) {
      notesEl.placeholder = isTransfer
        ? (t['transfer.phNotesTransfer'] || 'Yêu cầu khác của khách hàng')
        : (t['booking.placeholderNotes'] || 'Chọn màu xe hoặc yêu cầu khác...');
    }

    /* Form title */
    var formTitleEl = document.querySelector('[data-i18n="booking.formTitle"]');
    if (formTitleEl) {
      formTitleEl.textContent = isTransfer
        ? (t['transfer.bookingTitle'] || 'Đặt Xe Đưa Đón')
        : (t['booking.formTitle'] || 'Đặt Tour');
    }

    /* Booking tour / vehicle subtitle */
    var tourNameEl = document.getElementById('bookingTourName');
    if (tourNameEl) {
      if (isTransfer) {
        tourNameEl.textContent = t['transfer.bookingTourName'] || 'Xe Đưa Đón với Mr. Ben';
        tourNameEl.setAttribute('data-i18n', 'transfer.bookingTourName');
      } else {
        tourNameEl.textContent = t['booking.tourName'] || 'Xe Jeep Mr. Ben';
        tourNameEl.setAttribute('data-i18n', 'booking.tourName');
      }
    }

    updatePrice();
  }

  /* Expose to transfer IIFE */
  window.__configureBookingMode = configureBookingMode;

  /* ── Helpers ── */
  function fmt(n) {
    return n.toLocaleString('vi-VN') + '₫';
  }

  function setDefaultDatetime() {
    var d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(5, 0, 0, 0);
    var pad = function (x) { return x < 10 ? '0' + x : '' + x; };
    dtInput.value = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  var ADDON_PRICE_PER_VEHICLE = 950000; /* 950k per vehicle for sand dune */
  var HOLIDAY_SURCHARGE_RATE = 0.3; /* 30% surcharge for 27/8 – 2/9 */

  /* Check if selected date falls within holiday period (27 Aug – 2 Sep, any year) */
  function isHolidaySurcharge() {
    var val = dtInput.value; // format: YYYY-MM-DDTHH:MM
    if (!val) return false;
    var parts = val.split('T')[0].split('-'); // [YYYY, MM, DD]
    var m = parseInt(parts[1], 10); // month 1-12
    var d = parseInt(parts[2], 10); // day 1-31
    // 27/8 → 31/8 (month=8, day 27-31) OR 1/9 → 2/9 (month=9, day 1-2)
    return (m === 8 && d >= 27) || (m === 9 && d <= 2);
  }

  function updatePrice() {
    var isTransfer = (window.__bookingMode === 'transfer' || isTransferBooking());
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var t = (window.__MRB_TRANS || {})[lang] || {};
    var pNorm = '', dNorm = '';

    var tourTypeRow = document.getElementById('bfPriceTourType');
    var tourTypeIcon = document.getElementById('bfPriceTourTypeIcon');
    var tourTypeLbl = document.getElementById('bfPriceTourTypeLabel');
    var tourTypeVal = document.getElementById('bfPriceTourTypeValue');
    var quantityRow = document.getElementById('bfPriceQuantity');
    var quantityIcon = document.getElementById('bfPriceQuantityIcon');
    var quantityLbl = document.getElementById('bfPriceQuantityLabel');
    var quantityVal = document.getElementById('bfPriceQuantityValue');
    var addonRow = document.getElementById('bfPriceAddon');
    var holidayRow = document.getElementById('bfPriceHoliday');
    var holidayValue = document.getElementById('bfPriceHolidayValue');
    var holidayLabel = document.getElementById('bfPriceHolidayLabel');
    var tfRouteRow = document.getElementById('bfPriceTransferRoute');
    var tfRouteLbl = document.getElementById('bfPriceTransferRouteLabel');
    var tfRouteVal = document.getElementById('bfPriceTransferRouteValue');
    var tfVehRow = document.getElementById('bfPriceTransferVehicle');
    var tfVehLbl = document.getElementById('bfPriceTransferVehicleLabel');
    var tfVehVal = document.getElementById('bfPriceTransferVehicleValue');

    // Hide all rows
    [tourTypeRow, quantityRow, addonRow, holidayRow, tfRouteRow, tfVehRow].forEach(function (el) {
      if (el) el.style.display = 'none';
    });
    if (addonRow) addonRow.classList.remove('bf-price-item--addon');

    var finalTotal = 0;

    if (isTransfer) {
      /* ── Transfer pricing ── */
      var tfP = 0;
      if (tfSelectedRoute && tfSelectedVehicle) {
        tfP = (tfSelectedRoute.prices && tfSelectedRoute.prices[tfSelectedVehicle]) || 0;
      }
      finalTotal = tfP;

      var pVal = (document.getElementById('bfTfPickup') || {}).value || '';
      var dVal = (document.getElementById('bfTfDropoff') || {}).value || '';
      pNorm = normalizeTransferCity(pVal);
      dNorm = normalizeTransferCity(dVal);

      if (tfRouteRow && tfRouteLbl && tfRouteVal) {
        tfRouteRow.style.display = 'flex';
        tfRouteLbl.textContent = t['transfer.th.route'] || 'Tuyến đường';
        if (pNorm && dNorm && pNorm !== dNorm) {
          var pText = getTransferCityName(pNorm, lang);
          var dText = getTransferCityName(dNorm, lang);
          var routeDisplay = pText + ' → ' + dText;
          tfRouteRow.title = routeDisplay;
          tfRouteVal.textContent = routeDisplay;
        } else {
          tfRouteRow.removeAttribute('title');
          tfRouteVal.textContent = '—';
        }
      }
      if (tfVehRow && tfVehLbl && tfVehVal) {
        if (tfSelectedVehicle) {
          tfVehRow.style.display = 'flex';
          var is16 = (tfSelectedVehicle === 'gas16');
          var vehIcon = document.getElementById('bfPriceTransferVehicleIcon');
          if (vehIcon) vehIcon.className = is16 ? 'fas fa-shuttle-van' : 'fas fa-car-side';
          tfVehLbl.textContent = t['transfer.labelVehicleType'] || 'Loại xe';
          tfVehVal.textContent = is16
            ? (t['transfer.vehicle16'] || 'Xe 16 Chỗ')
            : (t['transfer.vehicleGas'] || 'Xe 7 Chỗ');
        } else {
          tfVehRow.style.display = 'none';
        }
      }

      var holidayActive = isHolidaySurcharge();
      var surchargeAmount = 0;
      if (holidayActive && finalTotal > 0) {
        surchargeAmount = Math.round(finalTotal * HOLIDAY_SURCHARGE_RATE);
        finalTotal += surchargeAmount;
        if (holidayRow && holidayValue) {
          holidayRow.style.display = 'flex';
          if (holidayLabel) holidayLabel.textContent = t['booking.holidaySurcharge'] || 'Phụ thu lễ';
          holidayValue.textContent = '+' + fmt(surchargeAmount);
        }
      }
    } else {
      /* ── Jeep tour pricing ── */
      var unit = 0;
      if (tourType === 'private') unit = pricePrivate;
      else if (tourType === 'group') unit = priceGroup;
      var count = (tourType === 'group') ? guests : vehicleCount;
      var baseTotal = unit * count;
      if (addonSandDuneSelected) {
        if (tourType === 'private') finalTotal = ADDON_PRICE_PER_VEHICLE * vehicleCount;
        else if (tourType === 'group') finalTotal = ADDON_PRICE_PER_VEHICLE;
        else finalTotal = baseTotal;
      } else { finalTotal = baseTotal; }
      var holidayActive = isHolidaySurcharge();
      var surchargeAmount = 0;
      if (holidayActive && finalTotal > 0) {
        surchargeAmount = Math.round(finalTotal * HOLIDAY_SURCHARGE_RATE);
        finalTotal += surchargeAmount;
      }
      if (tourType) {
        if (tourTypeRow && tourTypeLbl && tourTypeVal) {
          tourTypeRow.style.display = 'flex';
          if (tourType === 'private') {
            if (tourTypeIcon) tourTypeIcon.className = 'fas fa-user-shield';
            tourTypeLbl.textContent = t['booking.typePrivate'] || 'Tour Riêng Tư';
          } else {
            if (tourTypeIcon) tourTypeIcon.className = 'fas fa-users';
            tourTypeLbl.textContent = t['booking.typeGroup'] || 'Tour Ghép';
          }
          tourTypeVal.textContent = fmt(unit);
        }
        if (quantityRow && quantityIcon && quantityLbl && quantityVal) {
          quantityRow.style.display = 'flex';
          if (tourType === 'private') {
            quantityIcon.className = 'fas fa-car';
            quantityLbl.textContent = t['booking.labelVehicles'] || 'Số Lượng Xe';
            quantityVal.textContent = '× ' + vehicleCount;
          } else {
            quantityIcon.className = 'fa-solid fa-person-circle-plus';
            quantityLbl.textContent = t['booking.labelGuests'] || 'Số Người';
            quantityVal.textContent = '× ' + guests;
          }
        }
        if (addonSandDuneSelected && addonRow) {
          addonRow.style.display = 'flex';
          addonRow.classList.add('bf-price-item--addon');
        }
        if (holidayActive && holidayRow && holidayValue) {
          holidayRow.style.display = 'flex';
          if (holidayLabel) holidayLabel.textContent = t['booking.holidaySurcharge'] || 'Phụ thu lễ';
          holidayValue.textContent = '+' + fmt(surchargeAmount);
        }
      }
    }

    // Total
    if (totalEl) {
      if (isTransfer && pNorm && dNorm && pNorm !== dNorm && !tfSelectedRoute) {
        totalEl.textContent = t['transfer.contactForQuote'] || 'Liên hệ';
      } else {
        totalEl.textContent = finalTotal > 0 ? fmt(finalTotal) : '—';
      }
    }
  }

  function setTourType(type) {
    var isTransfer = (window.__bookingMode === 'transfer' || isTransferBooking());
    if (isTransfer) {
      /* Transfer mode: type is 'gas7' or 'gas16' or '' */
      tfSelectedVehicle = type || '';
      tourType = ''; // not used in transfer mode
      if (tfSelectedVehicle === 'gas7') {
        btnPrivate.classList.add('active');
        btnGroup.classList.remove('active');
        if (btn16) btn16.classList.remove('active');
      } else if (tfSelectedVehicle === 'gas16') {
        if (btn16) btn16.classList.add('active');
        btnPrivate.classList.remove('active');
        btnGroup.classList.remove('active');
      } else {
        btnPrivate.classList.remove('active');
        btnGroup.classList.remove('active');
        if (btn16) btn16.classList.remove('active');
      }
      /* No vehicle/guest counters in transfer mode */
      if (vehicleGroup) vehicleGroup.style.display = 'none';
      if (guestGroup) guestGroup.style.display = 'none';
      /* Auto-detect route from pickup/dropoff */
      autoDetectTransferRoute();
    } else {
      /* Jeep mode: type is 'private' or 'group' or '' */
      tourType = type || '';
      tfSelectedVehicle = '';
      if (tourType === 'private') {
        btnPrivate.classList.add('active');
        btnGroup.classList.remove('active');
        if (guestGroup) guestGroup.style.display = 'none';
        if (vehicleGroup) vehicleGroup.style.display = '';
      } else if (tourType === 'group') {
        btnGroup.classList.add('active');
        btnPrivate.classList.remove('active');
        if (guestGroup) guestGroup.style.display = '';
        if (vehicleGroup) vehicleGroup.style.display = 'none';
      } else {
        btnPrivate.classList.remove('active');
        btnGroup.classList.remove('active');
        if (guestGroup) guestGroup.style.display = 'none';
        if (vehicleGroup) vehicleGroup.style.display = 'none';
      }
    }
    btnPrivate.classList.remove('bf-error');
    btnGroup.classList.remove('bf-error');
    updatePrice();
  }

  /* Expose for external use */
  window.__setTourType = setTourType;

  /* ── Transfer itinerary stops data ── */
  var TRANSFER_ITINERARIES = {
    'muine-tacu': ['transfer.city.muine', 'transfer.stop.poshanu', 'transfer.stop.caong', 'transfer.city.tacu', 'transfer.city.muine'],
    'muine-cothach': ['transfer.city.muine', 'transfer.city.cothach', 'transfer.city.muine'],
    'muine-kega': ['transfer.city.muine', 'transfer.city.kega', 'transfer.city.muine']
  };

  /* ── Auto-detect transfer route from pickup/dropoff text ── */
  function autoDetectTransferRoute() {
    var pIn = document.getElementById('bfTfPickup');
    var dIn = document.getElementById('bfTfDropoff');
    var pickup = pIn ? normalizeTransferCity(pIn.value) : '';
    var dropoff = dIn ? normalizeTransferCity(dIn.value) : '';

    if (!pickup || !dropoff || pickup === dropoff) {
      tfSelectedRoute = null;
      updatePrice();
      updateTransferItinerary(null);
      return;
    }

    var cfg = window.__TRANSFER_CONFIG;
    if (!cfg || !cfg.routes) {
      updatePrice();
      updateTransferItinerary(null);
      return;
    }

    // Match route bidirectionally
    tfSelectedRoute = cfg.routes.find(function (r) {
      var rFrom = normalizeTransferCity(r.from);
      var rTo = normalizeTransferCity(r.to);
      var fwd = (rFrom === pickup && rTo === dropoff);
      var bwd = (rTo === pickup && rFrom === dropoff);
      return fwd || bwd;
    }) || null;

    if (!tfSelectedRoute) {
      if ((pickup === 'muine' && dropoff === 'sgn') || (pickup === 'sgn' && dropoff === 'muine')) {
        tfSelectedRoute = cfg.routes.find(function (r) { return r.id === 'muine-hcm'; }) || null;
      } else if ((pickup === 'muine' && dropoff === 'nhatrang') || (pickup === 'nhatrang' && dropoff === 'muine')) {
        tfSelectedRoute = cfg.routes.find(function (r) { return r.id === 'muine-nhatrang'; }) || null;
      } else if ((pickup === 'nhatrang' && dropoff === 'sgn') || (pickup === 'sgn' && dropoff === 'nhatrang')) {
        tfSelectedRoute = cfg.routes.find(function (r) { return r.id === 'nhatrang-hcm'; }) || null;
      } else if ((pickup === 'muine' && dropoff === 'phanrang') || (pickup === 'phanrang' && dropoff === 'muine')) {
        tfSelectedRoute = cfg.routes.find(function (r) { return r.id === 'muine-phanrang'; }) || null;
      } else if (pickup === 'muine' && dropoff === 'tacu') {
        tfSelectedRoute = cfg.routes.find(function (r) { return r.id === 'muine-tacu'; }) || null;
      } else if (pickup === 'muine' && dropoff === 'kega') {
        tfSelectedRoute = cfg.routes.find(function (r) { return r.id === 'muine-kega'; }) || null;
      } else if (pickup === 'muine' && dropoff === 'cothach') {
        tfSelectedRoute = cfg.routes.find(function (r) { return r.id === 'muine-cothach'; }) || null;
      }
    }

    updateTransferItinerary(tfSelectedRoute);
    updatePrice();
  }

  /* ── Transfer itinerary display ── */
  function updateTransferItinerary(route) {
    var group = document.getElementById('bfTransferItineraryGroup');
    var container = document.getElementById('bfTransferItinerary');
    if (!group || !container) return;

    if (!route || !route.id || !TRANSFER_ITINERARIES[route.id]) {
      group.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    var stops = TRANSFER_ITINERARIES[route.id];
    if (!stops || stops.length === 0) {
      group.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var t = (window.__MRB_TRANS || {})[lang] || {};

    var html = '';
    stops.forEach(function (stop, i) {
      var stopName = t[stop] || stop;
      var cls = 'bf-ti-stop';
      if (i === 0) cls += ' bf-ti-stop--pickup';
      else if (i === stops.length - 1) cls += ' bf-ti-stop--dropoff';
      html += '<span class="' + cls + '">' + stopName + '</span>';
      if (i < stops.length - 1) {
        html += '<span class="bf-ti-arrow">→</span>';
      }
    });

    if (route.roundTrip) {
      var noteText = t['transfer.itineraryNote'] || 'khứ hồi trong ngày';
      html += '<span class="bf-ti-note">' + noteText + '</span>';
    }

    container.innerHTML = html;
    group.style.display = '';
  }

  /* Expose for external use */
  window.__autoDetectTransferRoute = autoDetectTransferRoute;

  function buildWAMessage() {
    var name = document.getElementById('bfName').value.trim();
    var phone = document.getElementById('bfPhone').value.trim();
    var dt = dtInput.value ? dtInput.value.replace('T', ' ') : '—';
    var notes = document.getElementById('bfNotes').value.trim();
    var typeStr = tourType === 'private' ? 'Tour Riêng Tư' : 'Tour Ghép (' + guests + ' người)';
    var totalNum;
    if (addonSandDuneSelected) {
      if (tourType === 'private') {
        totalNum = ADDON_PRICE_PER_VEHICLE * vehicleCount;
      } else {
        totalNum = ADDON_PRICE_PER_VEHICLE;
      }
    } else {
      totalNum = tourType === 'private' ? pricePrivate * vehicleCount : priceGroup * guests;
    }
    // Holiday surcharge
    var _holiday = isHolidaySurcharge();
    if (_holiday && totalNum > 0) {
      totalNum = totalNum + Math.round(totalNum * HOLIDAY_SURCHARGE_RATE);
    }
    var total = fmt(totalNum);

    var msg = '🏕️ <b>ĐẶT TOUR MR. BEN JEEP TOURS</b>\n'
      + '━━━━━━━━━━━━━━━\n'
      + '👤 <b>Họ tên:</b> ' + (name || '—') + '\n'
      + '📞 <b>SĐT:</b> +84' + (phone.replace(/^0/, '') || '—') + '\n'
      + '📋 <b>Loại Tour:</b> ' + typeStr + '\n'
      + (tourType === 'private' ? ('🚗 <b>Số lượng xe:</b> ' + vehicleCount + ' xe\n') : '')
      + (window.__bfCurrentRoute ? '🗺️ <b>Lộ trình:</b> ' + window.__bfCurrentRoute + '\n' : '')
      + '📅 <b>Ngày & Giờ:</b> ' + dt + '\n'
      + (_holiday ? '🎆 <b>Phụ thu lễ:</b> +30%\n' : '')
      + '💵 <b>Tổng tiền:</b> ' + total + '\n'
      + (notes ? '📝 <b>Ghi chú:</b> ' + notes + '\n' : '')
      + '━━━━━━━━━━━━━━━';
    return encodeURIComponent(msg);
  }

  function refreshWALink() {
    waBtn.href = 'https://wa.me/84913140196?text=' + buildWAMessage();
  }

  function resetBookingForm() {
    document.getElementById('bfName').value = '';
    document.getElementById('bfPhone').value = '';
    document.getElementById('bfNotes').value = '';
    var hotelObj = document.getElementById('bfHotelName');
    if (hotelObj) {
      hotelObj.value = '';
      hotelObj.classList.remove('has-value');
    }
    var addrObj = document.getElementById('bfHotelAddress');
    if (addrObj) {
      addrObj.value = '';
      addrObj.setAttribute('readonly', '');
    }
    var customGrp = document.getElementById('bfHotelCustomGroup');
    if (customGrp) customGrp.style.display = 'none';
    var customInput = document.getElementById('bfHotelCustomName');
    if (customInput) customInput.value = '';

    guests = 1;
    vehicleCount = 1;
    addonSandDuneSelected = false;
    if (addonSandDune) addonSandDune.classList.remove('selected');
    if (guestVal) guestVal.textContent = '1';
    if (vehicleVal) vehicleVal.textContent = '1';
    if (typeof window.__resetPickerModeStates === 'function') {
      window.__resetPickerModeStates();
    } else if (typeof window.__syncPickerMode === 'function') {
      window.__syncPickerMode(window.__bookingMode || 'jeep');
    } else {
      setDefaultDatetime();
    }
    /* Reset tour type — no pre-selection */
    tourType = '';           /* không có mặc định, người dùng phải chọn */
    if (btnPrivate) { btnPrivate.classList.remove('active'); btnPrivate.classList.remove('bf-error'); }
    if (btnGroup) { btnGroup.classList.remove('active'); btnGroup.classList.remove('bf-error'); }
    if (btn16) { btn16.classList.remove('active'); btn16.classList.remove('bf-error'); }
    /* Ẩn cả hai trường Số lượng xe và Số người khi chưa chọn loại tour */
    if (guestGroup) guestGroup.style.display = 'none';
    if (vehicleGroup) vehicleGroup.style.display = 'none';

    // Clear route drops
    if (window.bfRouteResetAll) window.bfRouteResetAll();

    // Clear transfer fields
    setTransferPickup('');
    setTransferDropoff('');
    if (window.__closeRouteDropdowns) window.__closeRouteDropdowns();
    tfSelectedRoute = null;
    tfSelectedVehicle = '';

    // Remove errors
    ['bfName', 'bfPhone', 'bfHotelCustomName', 'bfHotelAddress'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        var targetEl = el.closest('.bf-hotel-input-row') || el;
        targetEl.classList.remove('bf-error');
      }
    });
    var pTrigger = document.getElementById('bfTfPickupTrigger');
    if (pTrigger) pTrigger.classList.remove('bf-error');
    var dTrigger = document.getElementById('bfTfDropoffTrigger');
    if (dTrigger) dTrigger.classList.remove('bf-error');
  }

  /* ── Open modal ── */
  function openBooking(data) {
    configureBookingMode('jeep');
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var t = (window.__MRB_TRANS || {})[lang] || {};

    tourName = (data && data.name && data.name !== 'Xe Jeep Mr. Ben') ? data.name : (t['booking.tourName'] || 'Xe Jeep Mr. Ben');
    tourNameVi = (data && data.nameVi) ? data.nameVi : 'Xe Jeep Mr. Ben'; // dùng tên Việt, fallback về tourName nếu không có
    pricePrivate = (data && data.private) || PRICE_PRIVATE;
    priceGroup = (data && data.group) || PRICE_GROUP;

    var perText = t['tour.price.per'] || '/người';

    tourNameEl.textContent = tourName;
    tourNameEl.setAttribute('data-i18n', 'booking.tourName');
    bpbPrivate.textContent = fmt(pricePrivate);
    bpbGroup.innerHTML = fmt(priceGroup) + ' <span class="bpb-per">' + perText + '</span>';

    // Đảm bảo ẩn Số lượng xe và Số người khi mở modal nếu chưa chọn loại tour
    if (!tourType || tourType === '') {
      if (guestGroup) guestGroup.style.display = 'none';
      if (vehicleGroup) vehicleGroup.style.display = 'none';
    } else {
      // Nếu đã chọn loại tour, hiển thị đúng trường
      if (tourType === 'private') {
        if (guestGroup) guestGroup.style.display = 'none';
        if (vehicleGroup) vehicleGroup.style.display = '';
      } else {
        if (guestGroup) guestGroup.style.display = '';
        if (vehicleGroup) vehicleGroup.style.display = 'none';
      }
    }

    // We do NOT reset the form here anymore to preserve user input.
    updatePrice();
    refreshWALink();

    if (window.__recordModalOpenTime) window.__recordModalOpenTime();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('mrben-booking-open'));
  }

  /* ── Modal backdrop click protection ── */
  var modalOpenTime = 0;
  var overlayPointerDownOnBackdrop = false;

  window.__recordModalOpenTime = function () {
    modalOpenTime = Date.now();
    overlayPointerDownOnBackdrop = false;
  };

  function closeBooking() {
    overlayPointerDownOnBackdrop = false;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Bind unified "Đặt Xe Ngay" CTA button ── */
  var jbcBookBtn = document.getElementById('jbcBookBtn');
  if (jbcBookBtn) {
    jbcBookBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var lang = localStorage.getItem('mrben-lang') || 'vi';
      var t = (window.__MRB_TRANS || {})[lang] || {};
      configureBookingMode('jeep');
      openBooking({ name: t['booking.tourName'] || 'Xe Jeep Mr. Ben', nameVi: 'Xe Jeep Mr. Ben', private: PRICE_PRIVATE, group: PRICE_GROUP });
    });
  }

  /* Also keep "Book Now" in navbar CTA working */
  document.querySelectorAll('.nav-cta').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var transferPanel = document.getElementById('svcPanelTransfer');
      var isTransferActive = (transferPanel && transferPanel.classList.contains('svc-panel--active'));
      if (isTransferActive && window.__openTransferBooking) {
        window.__openTransferBooking();
      } else {
        var lang = localStorage.getItem('mrben-lang') || 'vi';
        var t = (window.__MRB_TRANS || {})[lang] || {};
        configureBookingMode('jeep');
        openBooking({ name: t['booking.tourName'] || 'Xe Jeep Mr. Ben', nameVi: 'Xe Jeep Mr. Ben', private: PRICE_PRIVATE, group: PRICE_GROUP });
      }
    });
  });


  /* ── Close ── */
  closeBtn.addEventListener('click', closeBooking);

  overlay.addEventListener('pointerdown', function (e) {
    overlayPointerDownOnBackdrop = (e.target === overlay);
  });

  overlay.addEventListener('touchstart', function (e) {
    overlayPointerDownOnBackdrop = (e.target === overlay);
  }, { passive: true });

  overlay.addEventListener('click', function (e) {
    if (!overlayPointerDownOnBackdrop) return;
    if (Date.now() - modalOpenTime < 400) return;
    if (e.target === overlay) {
      closeBooking();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeBooking();
  });

  /* ── Tour type toggle ── */
  btnPrivate.addEventListener('click', function () {
    var t = (window.__bookingMode === 'transfer' || isTransferBooking()) ? 'gas7' : 'private';
    setTourType(t);
    refreshWALink();
  });
  btnGroup.addEventListener('click', function () {
    if (window.__bookingMode === 'transfer' || isTransferBooking()) return;
    setTourType('group');
    refreshWALink();
  });
  if (btn16) {
    btn16.addEventListener('click', function () {
      setTourType('gas16');
      refreshWALink();
    });
  }

  /* ── Guest counter ── */
  minusBtn.addEventListener('click', function () {
    if (guests > 1) { guests--; guestVal.textContent = guests; updatePrice(); refreshWALink(); }
  });
  plusBtn.addEventListener('click', function () {
    if (guests < 4) { guests++; guestVal.textContent = guests; updatePrice(); refreshWALink(); }
  });

  /* ── Vehicle counter ── */
  if (vehicleMinusBtn) {
    vehicleMinusBtn.addEventListener('click', function () {
      if (vehicleCount > 1) { vehicleCount--; vehicleVal.textContent = vehicleCount; updatePrice(); refreshWALink(); }
    });
  }
  if (vehiclePlusBtn) {
    vehiclePlusBtn.addEventListener('click', function () {
      if (vehicleCount < 10) { vehicleCount++; vehicleVal.textContent = vehicleCount; updatePrice(); refreshWALink(); }
    });
  }

  /* ── Recalculate price when date changes (holiday surcharge) ── */
  if (dtInput) {
    dtInput.addEventListener('input', function () {
      updatePrice();
      refreshWALink();
    });
  }

  /* ── Transfer Route Dropdowns (Pickup & Dropoff) ── */
  var tfPickupSelect = document.getElementById('bfTfPickupSelect');
  var tfPickupTrigger = document.getElementById('bfTfPickupTrigger');
  var tfPickupList = document.getElementById('bfTfPickupList');

  var tfDropoffSelect = document.getElementById('bfTfDropoffSelect');
  var tfDropoffTrigger = document.getElementById('bfTfDropoffTrigger');
  var tfDropoffList = document.getElementById('bfTfDropoffList');

  var tfSwapBtn = document.getElementById('bfTfSwap');

  function closeRouteDropdowns() {
    if (tfPickupSelect) {
      tfPickupSelect.classList.remove('open');
      if (tfPickupTrigger) tfPickupTrigger.setAttribute('aria-expanded', 'false');
    }
    if (tfDropoffSelect) {
      tfDropoffSelect.classList.remove('open');
      if (tfDropoffTrigger) tfDropoffTrigger.setAttribute('aria-expanded', 'false');
    }
  }
  window.__closeRouteDropdowns = closeRouteDropdowns;

  /* ── Toast for blocked swap (Center screen) ── */
  var swapToastTimer = null;
  function showSwapBlockedToast(msg) {
    var existing = document.getElementById('bfSwapBlockedToast');
    if (existing) {
      if (swapToastTimer) clearTimeout(swapToastTimer);
      var textEl = existing.querySelector('.bf-toast-text');
      if (textEl) textEl.textContent = msg;
      existing.classList.remove('is-hiding');
      existing.style.animation = 'none';
      void existing.offsetWidth;
      existing.style.animation = 'bfToastCenterShake 0.35s ease';
      if (!existing.querySelector('.bf-toast-close')) {
        var cBtn = document.createElement('button');
        cBtn.type = 'button';
        cBtn.className = 'bf-toast-close';
        cBtn.setAttribute('aria-label', 'Đóng');
        cBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        cBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          dismissSwapToast(existing);
        });
        existing.appendChild(cBtn);
      }
      swapToastTimer = setTimeout(function () {
        dismissSwapToast(existing);
      }, 3500);
      return;
    }

    var toast = document.createElement('div');
    toast.id = 'bfSwapBlockedToast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-circle-exclamation bf-toast-icon';

    var span = document.createElement('span');
    span.className = 'bf-toast-text';
    span.textContent = msg;

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'bf-toast-close';
    closeBtn.setAttribute('aria-label', 'Đóng');
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      dismissSwapToast(toast);
    });

    toast.appendChild(icon);
    toast.appendChild(span);
    toast.appendChild(closeBtn);

    toast.addEventListener('click', function (e) {
      if (e.target.closest('.bf-toast-close')) return;
      dismissSwapToast(toast);
    });

    document.body.appendChild(toast);

    if (swapToastTimer) clearTimeout(swapToastTimer);
    swapToastTimer = setTimeout(function () {
      dismissSwapToast(toast);
    }, 3500);
  }

  function dismissSwapToast(toast) {
    if (!toast || !toast.parentNode || toast.classList.contains('is-hiding')) return;
    if (swapToastTimer) {
      clearTimeout(swapToastTimer);
      swapToastTimer = null;
    }
    toast.classList.add('is-hiding');
    setTimeout(function () {
      if (toast && toast.parentNode) toast.remove();
    }, 320);
  }
  window.__showSwapBlockedToast = showSwapBlockedToast;


  if (tfPickupTrigger) {
    tfPickupTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = tfPickupSelect && tfPickupSelect.classList.contains('open');
      closeRouteDropdowns();
      if (!wasOpen && tfPickupSelect) {
        tfPickupSelect.classList.add('open');
        tfPickupTrigger.setAttribute('aria-expanded', 'true');
      }
    });
  }

  if (tfDropoffTrigger) {
    tfDropoffTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = tfDropoffSelect && tfDropoffSelect.classList.contains('open');
      closeRouteDropdowns();
      if (!wasOpen && tfDropoffSelect) {
        tfDropoffSelect.classList.add('open');
        tfDropoffTrigger.setAttribute('aria-expanded', 'true');
      }
    });
  }

  if (tfPickupList) {
    tfPickupList.addEventListener('click', function (e) {
      var li = e.target.closest('li');
      if (!li) return;
      if (li.classList.contains('is-disabled')) {
        var lang = localStorage.getItem('mrben-lang') || 'vi';
        var t = (window.__MRB_TRANS || {})[lang] || {};
        var msg = t['transfer.routeUnavailableNotice'] || 'Tuyến đường này không khả dụng với điểm đã chọn.';
        showSwapBlockedToast(msg);
        return;
      }
      var val = li.getAttribute('data-val');
      setTransferPickup(val);
      closeRouteDropdowns();
    });
  }

  if (tfDropoffList) {
    tfDropoffList.addEventListener('click', function (e) {
      var li = e.target.closest('li');
      if (!li) return;
      if (li.classList.contains('is-disabled')) {
        var lang = localStorage.getItem('mrben-lang') || 'vi';
        var t = (window.__MRB_TRANS || {})[lang] || {};
        var msg = t['transfer.routeUnavailableNotice'] || 'Tuyến đường này hiện không khả dụng với điểm đã chọn.';
        showSwapBlockedToast(msg);
        return;
      }
      var val = li.getAttribute('data-val');
      setTransferDropoff(val);
      closeRouteDropdowns();
    });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.bf-pickup-dropoff-row .bf-custom-select')) {
      closeRouteDropdowns();
    }
  });

  if (tfSwapBtn) {
    tfSwapBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var pIn = document.getElementById('bfTfPickup');
      var dIn = document.getElementById('bfTfDropoff');
      var curP = pIn ? pIn.value.trim() : '';
      var curD = dIn ? dIn.value.trim() : '';
      if (!curP && !curD) return;
      if (curP && curD && curP.toLowerCase() === curD.toLowerCase()) {
        setTransferDropoff('');
        return;
      }
      /* Block swap if the current dropoff is a dropoff-only city (cannot become pickup) */
      var normD = normalizeTransferCity(curD);
      if (normD && !TRANSFER_PICKUP_ALLOWED[normD]) {
        var lang = localStorage.getItem('mrben-lang') || 'vi';
        var t = (window.__MRB_TRANS || {})[lang] || {};
        var msg = t['transfer.swapBlocked'] || 'Điểm này chỉ là điểm trả, không thể chọn làm điểm đón.';
        showSwapBlockedToast(msg);
        return;
      }
      setTransferPickup(curD);
      setTransferDropoff(curP);
    });
  }

  /* ── Phone code dropdown ─────────────────────────────────── */
  var selectedPhoneCode = '+84';
  var codeWrap = document.querySelector('.bf-phone-code-wrap');
  var codeBtn = document.getElementById('bfPhoneCodeBtn');
  var codeFlag = document.getElementById('bfPhoneFlag');
  var codeText = document.getElementById('bfPhoneCodeText');
  var dropdown = document.getElementById('bfPhoneDropdown');
  var codeOpts = dropdown ? dropdown.querySelectorAll('.bf-phone-opt') : [];

  var LANG_CODE_MAP = {
    vi: { code: '+84', flag: 'assets/images/languages/vietnam.webp' },
    en: { code: '+1', flag: 'assets/images/languages/usa.webp' },
    ru: { code: '+7', flag: 'assets/images/languages/russia.webp' },
    zh: { code: '+86', flag: 'assets/images/languages/china.webp' },
    ko: { code: '+82', flag: 'assets/images/languages/south-korea.webp' },
    de: { code: '+49', flag: 'assets/images/languages/germany.webp' }
  };

  /* ══════════════════════════════════════════════════════════════
     CHUẨN HÓA SỐ ĐIỆN THOẠI & TỰ ĐỘNG XỬ LÝ MÃ VÙNG TRÙNG LẶP (+84)
     - Khi đã chọn mã +84: Nếu khách cố tình gõ/dán thêm +84, 84, 084, 0084, (+84)
       thì hệ thống tự động gọt bỏ mã vùng và chuẩn hóa về dạng 10 số (09...)
     - Bảo vệ các số Vinaphone đầu 084 (084xxxxxxx - đúng 10 số) không bị cắt nhầm
     - Tự động xóa class .bf-error khi số đạt chuẩn
     ══════════════════════════════════════════════════════════════ */
  function checkAndClearPhoneError(phoneInput, cCode, pLen) {
    if (!phoneInput) return;
    var isValid = false;
    if (cCode === '+84' && pLen >= 9 && pLen <= 10) isValid = true;
    else if (cCode === '+1' && pLen === 10) isValid = true;
    else if (cCode === '+7' && pLen === 10) isValid = true;
    else if (cCode === '+86' && pLen === 11) isValid = true;
    else if (cCode === '+82' && pLen >= 9 && pLen <= 10) isValid = true;
    else if (cCode === '+49' && pLen >= 10 && pLen <= 11) isValid = true;
    else if (cCode !== '+84' && cCode !== '+1' && cCode !== '+7' && cCode !== '+86' && cCode !== '+82' && cCode !== '+49' && pLen >= 8 && pLen <= 15) isValid = true;

    if (isValid) {
      phoneInput.classList.remove('bf-error');
    }
  }


  function sanitizePhoneNumberInput(phoneInput, isFinal) {
    if (!phoneInput) return;
    var raw = phoneInput.value;
    if (!raw) return;

    var codeTextEl = document.getElementById('bfPhoneCodeText');
    var cCode = (typeof selectedPhoneCode !== 'undefined' && selectedPhoneCode)
      ? selectedPhoneCode
      : (codeTextEl ? codeTextEl.value.trim() : '+84');

    var codeDigits = cCode.replace(/\D/g, '');

    // 1. Nhận diện các tiền tố chuỗi: +CODE, 00CODE, (+CODE), (CODE) và tiền tố có (0)
    var s = raw.trim();
    if (codeDigits) {
      var prefixRegex = new RegExp('^(?:\\+\\s*' + codeDigits + '|00\\s*' + codeDigits + '|\\(\\+?' + codeDigits + '\\))\\s*(?:\\(?0\\)?)?\\s*', 'i');
      if (prefixRegex.test(s)) {
        s = s.replace(prefixRegex, '');
        var d = s.replace(/\D/g, '');
        if (d) {
          if (cCode === '+84' && !d.startsWith('0')) d = '0' + d;
          if (cCode === '+82' && d.startsWith('01') && d.length === 11) d = d.slice(1);
          phoneInput.value = d;
          checkAndClearPhoneError(phoneInput, cCode, d.length);
          return;
        }
      }
    }

    if (s.startsWith('+')) {
      s = s.replace(/^\+\s*/, '');
    }

    // 2. Lấy toàn bộ chữ số
    var digits = s.replace(/\D/g, '');

    // 3. Tự động xử lý mã vùng theo từng quốc gia
    if (cCode === '+84') {
      // ── VIỆT NAM (+84) ──
      if (digits.startsWith('0084')) {
        digits = digits.slice(4);
        if (!digits.startsWith('0')) digits = '0' + digits;
      } else if (digits.startsWith('840') && digits.length >= 11) {
        digits = '0' + digits.slice(3);
      } else if (digits.startsWith('84') && digits.length === 11 && /^[35789]/.test(digits.slice(2))) {
        digits = '0' + digits.slice(2);
      } else if (digits.startsWith('084') && digits.length >= 11 && /^[35789]/.test(digits.slice(3))) {
        digits = '0' + digits.slice(3);
      }

      if (isFinal) {
        if (digits.length === 9 && /^[35789]/.test(digits)) {
          digits = '0' + digits;
        } else if (digits.startsWith('84') && digits.length >= 10 && /^[35789]/.test(digits.slice(2))) {
          digits = '0' + digits.slice(2);
        }
      }
    } else if (cCode === '+1') {
      // ── MỸ / BẮC MỸ (+1) ── Chuẩn 10 số (Area Code + Local)
      if (digits.startsWith('001') && digits.length === 13) {
        digits = digits.slice(3);
      } else if (digits.length === 11 && digits.startsWith('1')) {
        digits = digits.slice(1);
      } else if (isFinal && digits.startsWith('1') && digits.length >= 11) {
        digits = digits.slice(1);
      }
    } else if (cCode === '+7') {
      // ── NGA / KAZAKHSTAN (+7) ── Chuẩn 10 số
      // Người Nga thường gõ tiền tố nội địa 8 hoặc 7 (8916... hoặc 7916...) -> 11 số
      if (digits.startsWith('007') && digits.length === 13) {
        digits = digits.slice(3);
      } else if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
        digits = digits.slice(1);
      } else if (isFinal && (digits.startsWith('7') || digits.startsWith('8')) && digits.length >= 11) {
        digits = digits.slice(1);
      }
    } else if (cCode === '+86') {
      // ── TRUNG QUỐC (+86) ── Chuẩn 11 số (bắt đầu bằng 1)
      if (digits.startsWith('0086')) {
        digits = digits.slice(4);
      } else if (digits.startsWith('860') && digits.length >= 14) {
        digits = digits.slice(3);
      } else if (digits.startsWith('86') && digits.length === 13 && digits[2] === '1') {
        digits = digits.slice(2);
      } else if (digits.startsWith('086') && digits.length >= 13) {
        digits = digits.slice(3);
      }

      if (digits.length === 12 && digits.startsWith('01')) {
        digits = digits.slice(1);
      }

      if (isFinal && digits.startsWith('86') && digits.length >= 12 && digits[2] === '1') {
        digits = digits.slice(2);
      }
    } else if (cCode === '+82') {
      // ── HÀN QUỐC (+82) ── Chuẩn 9-10 số (quốc tế: 10xxxxxxxx)
      if (digits.startsWith('0082')) {
        digits = digits.slice(4);
      } else if (digits.startsWith('820') && digits.length >= 12) {
        digits = digits.slice(3);
      } else if (digits.startsWith('82') && digits.length >= 11) {
        digits = digits.slice(2);
      }

      if (digits.length === 11 && digits.startsWith('01')) {
        digits = digits.slice(1);
      }

      if (isFinal && digits.startsWith('82') && digits.length >= 10) {
        digits = digits.slice(2);
      }
    } else if (cCode === '+49') {
      // ── ĐỨC (+49) ── Chuẩn 10-11 số
      if (digits.startsWith('0049')) {
        digits = digits.slice(4);
      } else if (digits.startsWith('490') && digits.length >= 13) {
        digits = digits.slice(2);
      } else if (digits.startsWith('49') && digits.length >= 12) {
        digits = digits.slice(2);
      }

      if (isFinal && digits.startsWith('49') && digits.length >= 12) {
        digits = digits.slice(2);
      }
    } else if (codeDigits) {
      // ── CÁC MÃ QUỐC GIA TÙY CHỌN KHÁC (CUSTOM) ──
      if (digits.startsWith('00' + codeDigits) && digits.length > codeDigits.length + 6) {
        digits = digits.slice(2 + codeDigits.length);
      } else if (digits.startsWith(codeDigits) && digits.length > codeDigits.length + 6) {
        digits = digits.slice(codeDigits.length);
      }
    }

    phoneInput.value = digits;
    checkAndClearPhoneError(phoneInput, cCode, digits.length);
  }

  function setPhoneCode(langOrCode) {
    if (langOrCode === 'custom') {
      selectedPhoneCode = '';
      if (codeFlag) {
        codeFlag.style.display = '';
        codeFlag.src = 'assets/images/languages/united-nation.webp';
      }
      if (codeText) {
        codeText.readOnly = false;
        codeText.value = '+';
        codeText.focus();
        codeText.classList.add('custom-active');
      }
      codeOpts.forEach(function (opt) {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === 'custom');
      });
      return;
    }

    var entry = LANG_CODE_MAP[langOrCode];
    if (!entry) {
      // maybe it's a raw code like '+7'
      for (var k in LANG_CODE_MAP) {
        if (LANG_CODE_MAP[k].code === langOrCode) { entry = LANG_CODE_MAP[k]; break; }
      }
    }
    if (!entry) return;
    selectedPhoneCode = entry.code;
    if (codeFlag) {
      codeFlag.style.display = '';
      codeFlag.src = entry.flag;
    }
    if (codeText) {
      codeText.readOnly = true;
      codeText.value = entry.code;
      codeText.classList.remove('custom-active');
    }
    // Mark active option
    codeOpts.forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-code') === entry.code);
    });

    // Khi chuyển về mã vùng +84, tự động sửa ngay nếu số đang nhập có mã vùng trùng
    var phoneInput = document.getElementById('bfPhone');
    if (phoneInput && phoneInput.value) {
      sanitizePhoneNumberInput(phoneInput, true);
    }
  }

  function openCodeDropdown() {
    if (!codeWrap || !dropdown) return;
    codeWrap.classList.add('open');
    dropdown.classList.add('open');
  }

  function closeCodeDropdown() {
    if (!codeWrap || !dropdown) return;
    codeWrap.classList.remove('open');
    dropdown.classList.remove('open');
  }

  if (codeBtn) {
    codeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = codeWrap.classList.contains('open');
      if (isOpen) { closeCodeDropdown(); } else { openCodeDropdown(); }
    });
  }

  codeOpts.forEach(function (opt) {
    opt.addEventListener('click', function () {
      setPhoneCode(opt.getAttribute('data-lang'));
      closeCodeDropdown();
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (codeWrap && !codeWrap.contains(e.target)) closeCodeDropdown();
  });

  /* ── Auto-sync phone code & transfer placeholders with website language ── */
  // Hook into the global switchLanguage call via a custom event
  document.addEventListener('mrben-langchange', function (e) {
    var curLang = e.detail && e.detail.lang ? e.detail.lang : (localStorage.getItem('mrben-lang') || 'vi');
    setPhoneCode(curLang);
    var pIn = document.getElementById('bfTfPickup');
    var pValEl = document.getElementById('bfTfPickupVal');
    if (pIn && pIn.value) {
      if (pValEl) pValEl.textContent = getTransferCityName(pIn.value, curLang);
    } else if (pIn && typeof setTransferPickup === 'function') {
      setTransferPickup('');
    }
    var dIn = document.getElementById('bfTfDropoff');
    var dValEl = document.getElementById('bfTfDropoffVal');
    if (dIn && dIn.value) {
      if (dValEl) dValEl.textContent = getTransferCityName(dIn.value, curLang);
    } else if (dIn && typeof setTransferDropoff === 'function') {
      setTransferDropoff('');
    }
    var tourNameEl = document.getElementById('bookingTourName');
    if (window.__bookingMode === 'transfer') {
      var tr = (window.__MRB_TRANS || {})[curLang] || {};
      var formTitleEl = document.querySelector('[data-i18n="booking.formTitle"]');
      if (formTitleEl) formTitleEl.textContent = tr['transfer.bookingTitle'] || 'Đặt Xe Đưa Đón';
      if (tourNameEl) {
        tourNameEl.textContent = tr['transfer.bookingTourName'] || 'Xe Đưa Đón với Mr. Ben';
        tourNameEl.setAttribute('data-i18n', 'transfer.bookingTourName');
      }
      /* Re-sync vehicle type toggle labels */
      if (typeof configureBookingMode === 'function') configureBookingMode('transfer');
    } else {
      var tr = (window.__MRB_TRANS || {})[curLang] || {};
      tourName = tr['booking.tourName'] || 'Xe Jeep Mr. Ben';
      if (tourNameEl) {
        tourNameEl.textContent = tourName;
        tourNameEl.setAttribute('data-i18n', 'booking.tourName');
      }
    }
    if (typeof updatePrice === 'function') updatePrice();
  });
  // Also sync on initial load
  setPhoneCode(localStorage.getItem('mrben-lang') || 'vi');

  // Link generation is now handled dynamically on "Book" click.

  /* ── Transfer Message Builder ──────────────────────────────── */
  function buildTransferMessage(isHtml) {
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var t = (window.__MRB_TRANS || {})[lang] || {};
    var tVi = (window.__MRB_TRANS || {})['vi'] || {};

    var name = (document.getElementById('bfName') || {}).value || '';
    name = name.trim();
    if (isHtml) name = name.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    var phone = (document.getElementById('bfPhone') || {}).value || '';
    var cleanPhone = phone.trim().replace(/^0/, '');
    var codeTextEl = document.getElementById('bfPhoneCodeText');
    var activeCode = selectedPhoneCode || (codeTextEl ? codeTextEl.value.trim() : '');
    var fullPhone = activeCode + (cleanPhone || '—');

    var tfPickup = (document.getElementById('bfTfPickup') || {}).value || '';
    tfPickup = tfPickup.trim();
    var tfDropoff = (document.getElementById('bfTfDropoff') || {}).value || '';
    tfDropoff = tfDropoff.trim();

    var hotelObj = document.getElementById('bfHotelName');
    var hotelWrapCheck = document.getElementById('bfHotelWrap');
    var isCustom = (hotelWrapCheck && hotelWrapCheck.classList.contains('is-other-selected'));
    var hotelName = '';
    if (isCustom) {
      hotelName = document.getElementById('bfHotelCustomName') ? document.getElementById('bfHotelCustomName').value.trim() : '';
    } else {
      hotelName = hotelObj ? hotelObj.value.trim() : '';
    }
    var hotelAddr = document.getElementById('bfHotelAddress') ? document.getElementById('bfHotelAddress').value.trim() : '';

    var dtRaw = dtInput.value ? dtInput.value.replace('T', ' ') : '';
    var dt = '—';
    if (dtRaw) {
      var dtParts = dtRaw.split(' ');
      if (dtParts.length === 2) {
        var dateParts = dtParts[0].split('-');
        var paddedDay = dateParts[2].length === 1 ? '0' + dateParts[2] : dateParts[2];
        dt = paddedDay + '-' + dateParts[1] + '-' + dateParts[0] + ' | ' + dtParts[1];
      } else { dt = dtRaw; }
    }

    var notes = (document.getElementById('bfNotes') || {}).value || '';
    notes = notes.trim();
    if (isHtml) notes = notes.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    var vehTypeStr = tfSelectedVehicle === 'gas16'
      ? (t['transfer.vehicle16'] || 'Xe 16 Chỗ')
      : (tfSelectedVehicle === 'gas7' ? (t['transfer.vehicleGas'] || 'Xe 7 Chỗ') : '—');
    var vehTypeStrVi = tfSelectedVehicle === 'gas16'
      ? 'Xe 16 Chỗ'
      : (tfSelectedVehicle === 'gas7' ? 'Xe 7 Chỗ' : '—');

    var routeName = '';
    var routeNameVi = '';
    var tfPrice = 0;
    var pName = getTransferCityName(tfPickup, lang);
    var dName = getTransferCityName(tfDropoff, lang);
    var pNameVi = getTransferCityName(tfPickup, 'vi');
    var dNameVi = getTransferCityName(tfDropoff, 'vi');
    if (tfSelectedRoute) {
      routeName = pName + ' → ' + dName;
      routeNameVi = pNameVi + ' → ' + dNameVi;
      if (tfSelectedVehicle) tfPrice = tfSelectedRoute.prices[tfSelectedVehicle] || 0;
    } else if (tfPickup || tfDropoff) {
      routeName = (pName || '—') + ' → ' + (dName || '—');
      routeNameVi = (pNameVi || '—') + ' → ' + (dNameVi || '—');
    } else {
      routeName = '—';
      routeNameVi = '—';
    }

    var tfTotalText = tfPrice > 0 ? fmt(tfPrice) : '—';

    var cleanLabel = function (lbl) {
      if (!lbl) return '';
      return lbl.replace(/^-\s*/, '').replace(/:\s*$/, '');
    };

    if (isHtml === 'list') {
      var items = [
        { icon: 'fa-user', color: 'ci-user', label: cleanLabel(t['wa.name'] || 'Họ tên'), val: name || '—' },
        { icon: 'fa-phone-alt', color: 'ci-phone', label: cleanLabel(t['wa.phone'] || 'SĐT'), val: fullPhone },
        { icon: 'fa-route', color: 'ci-truck', label: cleanLabel(t['transfer.th.route'] || 'Tuyến đường'), val: routeName }
      ];
      if (hotelName) {
        items.push({ icon: 'fa-hotel', color: 'ci-hotel', label: cleanLabel(t['booking.labelHotel'] || 'Khách sạn / Resort'), val: hotelName });
      }
      if (hotelAddr) {
        items.push({ icon: 'fa-map-marker-alt', color: 'ci-pin', label: cleanLabel(t['booking.labelHotelAddress'] || 'Địa chỉ'), val: hotelAddr });
      }
      items.push({ icon: 'fa-car-side', color: 'ci-jeep', label: cleanLabel(t['transfer.labelVehicleType'] || 'Loại xe'), val: vehTypeStr });
      items.push({ icon: 'fa-calendar-alt', color: 'ci-date', label: cleanLabel(t['wa.time'] || 'Ngày & Giờ đón'), val: dt });
      if (notes) {
        items.push({ icon: 'fa-comment-alt', color: 'ci-user', label: cleanLabel(t['wa.notes'] || 'Ghi chú'), val: notes });
      }
      items.push({ icon: 'fa-money-bill-wave', color: 'ci-money', label: (t['booking.totalPrice'] || 'Tổng tiền').replace(':', ''), val: tfTotalText });
      return items;
    }

    if (!isHtml) {
      var plainMsg = (t['transfer.wa.greeting'] || 'Xin chào Mr. Ben, tôi muốn đặt xe đưa đón. Thông tin:\n')
        + (t['transfer.wa.name'] || '- Họ tên: ') + (name || '—') + '\n'
        + (t['transfer.wa.phone'] || '- SĐT: ') + fullPhone + '\n'
        + (t['transfer.wa.vehicle'] || '- Loại xe: ') + vehTypeStr + '\n'
        + (t['transfer.wa.route'] || '- Tuyến: ') + routeName + '\n'
        + (hotelName ? ((t['wa.hotel'] ? ('- ' + t['wa.hotel'] + ': ') : '- Khách sạn: ') + hotelName + '\n') : '')
        + (hotelAddr ? ((t['wa.hotelAddress'] ? ('- ' + t['wa.hotelAddress'] + ': ') : '- Địa chỉ: ') + hotelAddr + '\n') : '')
        + (t['transfer.wa.date'] || '- Ngày đón: ') + dt + '\n'
        + (t['transfer.wa.price'] || '- Giá: ') + tfTotalText + '\n'
        + (notes ? ((t['transfer.wa.notes'] || '- Ghi chú: ') + notes + '\n') : '')
        + (t['transfer.wa.footer'] || 'Vui lòng liên hệ sớm. Cảm ơn!');
      return plainMsg;
    }

    var now = new Date();
    var nowDt = ('0' + now.getDate()).slice(-2) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear() + ' | ' + ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);

    var msg = '‼️📢 <b>ĐẶT XE ĐƯA ĐÓN MỚI</b>\n'
      + '━━━━━━━━━━━━━━━\n'
      + '👤 Họ tên: <b>' + (name || '—') + '</b>\n'
      + '📞 SĐT: <b>' + fullPhone + '</b>\n'
      + '🚗 Loại xe: <b>' + vehTypeStrVi + '</b>\n'
      + '🗺️ Tuyến đường: <b>' + routeNameVi + '</b>\n'
      + (hotelName ? ('🏨 Khách sạn: <b>' + hotelName + '</b>\n') : '')
      + (hotelAddr ? ('📍 Địa chỉ: <b>' + hotelAddr + '</b>\n') : '')
      + '📅 Ngày & Giờ đón: <b>' + dt + '</b>\n'
      + '💵 Tổng tiền: <b>' + tfTotalText + '</b>\n'
      + (notes ? '📝 Ghi chú: <b>' + notes + '</b>\n' : '')
      + '━━━━━━━━━━━━━━━\n'
      + '⏱️ Thời gian tạo đơn: <b>' + nowDt + '</b>';
    return msg;
  }

  function buildMessage(isHtml) {
    if (window.__bookingMode === 'transfer' || isTransferBooking()) {
      return buildTransferMessage(isHtml);
    }
    var bStart = isHtml ? '<b>' : '';
    var bEnd = isHtml ? '</b>' : '';

    // Xử lý thông tin Khách sạn
    var hotelObj = document.getElementById('bfHotelName');
    var hotelWrapCheck = document.getElementById('bfHotelWrap');
    var isCustom = (hotelWrapCheck && hotelWrapCheck.classList.contains('is-other-selected'));
    var hotelName = '';
    if (isCustom) {
      hotelName = document.getElementById('bfHotelCustomName') ? document.getElementById('bfHotelCustomName').value.trim() : '';
    } else {
      hotelName = hotelObj ? hotelObj.value.trim() : '';
    }
    var hotelAddr = document.getElementById('bfHotelAddress') ? document.getElementById('bfHotelAddress').value.trim() : '';

    // Xử lý Điểm đón
    var pickupObj = document.getElementById('bfPickupAddress');
    var pickup = pickupObj ? pickupObj.value.trim() : '';

    var name = document.getElementById('bfName').value.trim();
    // HTML in telegram breaks if users type < or >
    if (isHtml) name = name.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    var phone = document.getElementById('bfPhone').value.trim();
    var cleanPhone = phone.replace(/^0/, ''); // remove leading 0
    // Reformat date: 2026-03-02 13:30 → 02-03-2026 | 13:30
    var dtRaw = dtInput.value ? dtInput.value.replace('T', ' ') : '';
    var dt = '—';
    if (dtRaw) {
      var dtParts = dtRaw.split(' ');
      if (dtParts.length === 2) {
        var dateParts = dtParts[0].split('-'); // [2026, 03, 02]
        var paddedDay = dateParts[2].length === 1 ? '0' + dateParts[2] : dateParts[2];
        dt = paddedDay + '-' + dateParts[1] + '-' + dateParts[0] + ' | ' + dtParts[1];
      } else {
        dt = dtRaw;
      }
    }
    // Extract just the time part for the Tour row (e.g. 04:30)
    var timeOnly = dtRaw ? (dtRaw.split(' ')[1] || '') : '';
    var notes = document.getElementById('bfNotes').value.trim();
    if (isHtml) notes = notes.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Luôn dùng tiếng Việt cho loại tour
    var typeStr = tourType === 'private' ? 'Tour Riêng Tư' : 'Tour Ghép (' + guests + ' người)';
    var tourLine = (timeOnly ? timeOnly + ' - ' : '') + typeStr;
    var vehicleStr = vehicleCount + ' xe';
    var unit = 0;
    if (tourType === 'private') unit = pricePrivate;
    else if (tourType === 'group') unit = priceGroup;
    var count = (tourType === 'group') ? guests : vehicleCount;
    var baseTotal = unit * count;
    var totalNum;
    if (addonSandDuneSelected) {
      if (tourType === 'private') {
        totalNum = ADDON_PRICE_PER_VEHICLE * vehicleCount;
      } else {
        totalNum = ADDON_PRICE_PER_VEHICLE;
      }
    } else {
      totalNum = baseTotal;
    }
    // Holiday surcharge
    if (isHolidaySurcharge() && totalNum > 0) {
      totalNum = totalNum + Math.round(totalNum * HOLIDAY_SURCHARGE_RATE);
    }
    var totalText = totalNum > 0 ? fmt(totalNum) : '—';

    // Lấy mã vùng: dùng mã có sẵn hoặc lấy giá trị khách nhập nếu chọn 'Khác'
    var codeTextEl = document.getElementById('bfPhoneCodeText');
    var activeCode = selectedPhoneCode || (codeTextEl ? codeTextEl.value.trim() : '');
    var fullPhone = activeCode + (cleanPhone || '—');
    // Luôn dùng tiếng Việt cho tin nhắn chatbot dù website đang ở ngôn ngữ nào
    var tVi = (window.__MRB_TRANS || {})['vi'] || {};
    var addonStr = tVi['booking.addonSandDune'] || 'Leo đồi cát trắng bằng xe Jeep';

    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var t = (window.__MRB_TRANS || {})[lang] || {};

    // Create fallback route if user hasn't clicked anything yet
    var fallbackRoute = '';
    var fallbackRouteVi = '';

    // Grab translations for stops
    var stopsT = t;
    var w = stopsT['stop.whiteDune'] || 'White Sand Dune';
    var r = stopsT['stop.redDune'] || 'Red Sand Dune';
    var f = stopsT['stop.fishVillage'] || 'Mũi Né Fishing Village';
    var fs = stopsT['stop.fairyStream'] || 'Fairy Stream';
    fallbackRoute = [w, r, f, fs].join(' → ');

    var wVi = tVi['stop.whiteDune'] || 'Đồi Cát Trắng';
    var rVi = tVi['stop.redDune'] || 'Đồi Cát Đỏ';
    var fVi = tVi['stop.fishVillage'] || 'Làng Chài Mũi Né';
    var fsVi = tVi['stop.fairyStream'] || 'Suối Tiên';
    fallbackRouteVi = [wVi, rVi, fVi, fsVi].join(' → ');

    var finalRouteVi = window.__bfCurrentRouteVi || fallbackRouteVi;

    var finalRoute = fallbackRoute;
    if (window.__bfCurrentRouteVi) {
      var viParts = window.__bfCurrentRouteVi.split(' → ');
      var langParts = viParts.map(function (vp) {
        if (vp === wVi) return w;
        if (vp === rVi) return r;
        if (vp === fVi) return f;
        if (vp === fsVi) return fs;
        return vp;
      });
      finalRoute = langParts.join(' → ');
    }

    if (isHtml === 'list') {
      var T = t;
      var addonLangStr = addonSandDuneSelected ? (T['booking.addonSandDune'] || 'Leo đồi cát trắng bằng xe Jeep') : '';
      var typeLangStr = tourType === 'private' ? (T['booking.typePrivate'] || 'Tour Riêng Tư') : (T['booking.typeGroup'] || 'Tour Ghép') + ' (' + guests + ')';
      var tourLineLang = (timeOnly ? timeOnly + ' - ' : '') + typeLangStr;

      var cleanLabel = function (lbl) {
        if (!lbl) return '';
        return lbl.replace(/^-\s*/, '').replace(/:\s*$/, '');
      };

      var routeHtml = finalRoute.split(' → ').map(function (stop) {
        return '<span class="bf-route-pill-sm">' + stop + '</span>';
      }).join('<span class="bf-route-arrow-sm">↓</span>');

      var items = [
        { icon: 'fa-user', color: 'ci-user', label: cleanLabel(T['wa.name'] || 'Họ tên'), val: name || '—' },
        { icon: 'fa-phone-alt', color: 'ci-phone', label: cleanLabel(T['wa.phone'] || 'SĐT'), val: fullPhone },
        { icon: 'fa-map-signs', color: 'ci-truck', label: cleanLabel(T['wa.route'] || 'Lộ trình'), val: '<div class="bf-confirm-route-wrap">' + routeHtml + '</div>' }
      ];
      if (hotelName) {
        items.push({ icon: 'fa-building', color: 'ci-hotel', label: cleanLabel(T['wa.hotel'] || 'Khách sạn'), val: hotelName });
      }
      if (hotelAddr) {
        items.push({ icon: 'fa-map-marker-alt', color: 'ci-pin', label: cleanLabel(T['wa.address'] || 'Địa chỉ'), val: hotelAddr });
      }

      items.push({ icon: 'fa-car-side', color: 'ci-jeep', label: cleanLabel(T['wa.tour'] || 'Tour'), val: tourLineLang });
      if (tourType === 'private') {
        items.push({ icon: 'fa-truck-monster', color: 'ci-truck', label: cleanLabel(T['wa.vehicles'] || 'Số lượng xe'), val: vehicleCount + '' });
      }

      var _dtParts = dt.split(' | ');
      if (_dtParts.length === 2) {
        items.push({ icon: 'fa-calendar-alt', color: 'ci-date', label: 'Ngày', val: _dtParts[0] });
        // Note: Giờ is already included in `tourLineLang` (Tour), but if we want to separate it: 
        // items.push({ icon: 'fa-clock', color: 'ci-time', label: 'Giờ', val: _dtParts[1] });
      } else {
        items.push({ icon: 'fa-calendar-alt', color: 'ci-date', label: cleanLabel(T['wa.time'] || 'Ngày & Giờ'), val: dt });
      }

      if (addonSandDuneSelected) {
        items.push({ icon: 'fa-star', color: 'ci-addon', label: cleanLabel(T['wa.addon'] || 'Dịch vụ thêm'), val: addonLangStr });
      }

      if (notes) {
        items.push({ icon: 'fa-comment-alt', color: 'ci-user', label: cleanLabel(T['wa.notes'] || 'Ghi chú'), val: notes });
      }
      if (isHolidaySurcharge()) {
        items.push({ icon: 'fa-solid fa-umbrella-beach', color: 'ci-addon', label: T['booking.holidaySurcharge'] || 'Phụ thu lễ', val: '+30%' });
      }
      items.push({ icon: 'fa-money-bill-wave', color: 'ci-money', label: (T['booking.totalPrice'] || 'Tổng tiền').replace(':', ''), val: totalText });

      return items;
    }

    if (!isHtml) {
      // Dùng bản dịch tương ứng với ngôn ngữ đang xét
      var T = t;
      var addonLangStr = addonSandDuneSelected ? (T['booking.addonSandDune'] || 'Leo đồi cát trắng bằng xe Jeep') : '—';

      var typeLangStr = tourType === 'private'
        ? (T['booking.typePrivate'] || 'Tour Riêng Tư')
        : (T['booking.typeGroup'] || 'Tour Ghép') + ' (' + guests + ')';
      var tourLineLang = (timeOnly ? timeOnly + ' - ' : '') + typeLangStr;

      var plainMsg = (T['wa.greeting'] || 'Xin chào Mr. Ben, tôi muốn đặt xe Jeep của bạn, và đây là thông tin đặt xe Jeep của tôi:\n')
        + (T['wa.name'] || '- Họ tên: ') + (name || '—') + '\n'
        + (T['wa.phone'] || '- SĐT: ') + fullPhone + '\n'
        + (T['wa.tour'] || '- Tour: ') + tourLineLang + '\n'
        + (tourType === 'private' ? ((T['wa.vehicles'] || '- Số lượng xe: ') + vehicleCount + '\n') : '')
        + (addonSandDuneSelected ? (T['wa.addon'] || '- Dịch vụ thêm: ') + addonLangStr + '\n' : '')
        + (T['wa.route'] || '- Lộ trình: ') + finalRoute + '\n'
        + (T['wa.hotel'] || '- Khách sạn: ') + (hotelName || '—') + '\n'
        + (T['wa.address'] || '- Địa chỉ: ') + (hotelAddr || '—') + '\n'
        + (T['wa.time'] || '- Ngày & Giờ đón: ') + dt + '\n'
        + (notes ? (T['wa.notes'] || '- Ghi chú: ') + notes + '\n' : '')
        + (T['wa.footer'] || 'Mong bạn hãy liên lạc sớm cho tôi nhé.');
      return plainMsg;
    }

    var now = new Date();
    var nowDt = ('0' + now.getDate()).slice(-2) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear() + ' | ' + ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);

    var msg = '‼️📢 <b>CÓ TOUR MỚI</b>\n'
      + '━━━━━━━━━━━━━━━\n'
      + '👤 Họ tên: <b>' + (name || '—') + '</b>\n'
      + '📞 SĐT: <b>' + fullPhone + '</b>\n'
      + '🚙 Tour: <b>' + tourLine + '</b>\n'
      + (tourType === 'private' ? ('🚗 Số lượng xe: <b>' + vehicleStr + '</b>\n') : '')
      + (addonSandDuneSelected ? '🏜️ Dịch vụ thêm: <b>' + addonStr + '</b>\n' : '')
      + (finalRouteVi ? '🗺️ Lộ trình: <b>' + finalRouteVi + '</b>\n' : '')
      + (pickup ? '📍 Điểm đón: <b>' + pickup + '</b>\n' : '')
      + (hotelName ? '🏨 Khách sạn: <b>' + hotelName + '</b>\n' : '')
      + (hotelAddr ? '📌 Địa chỉ: <b>' + hotelAddr + '</b>\n' : '')
      + '📅 Ngày & Giờ đón: <b>' + dt + '</b>\n'
      + (isHolidaySurcharge() ? '🎆 Phụ thu lễ: <b>+30%</b>\n' : '')
      + '💵 Tổng tiền: <b>' + totalText + '</b>\n'
      + (notes ? '📝 Ghi chú: <b>' + notes + '</b>\n' : '')
      + '━━━━━━━━━━━━━━━\n'
      + '⏱️ Thời gian tạo đơn: <b>' + nowDt + '</b>';

    return msg;
  }

  // Override buildWAMessage to use text formatting for WA
  function buildWAMessage() {
    return encodeURIComponent(buildMessage(false));
  }

  /* ────────────────────────────────────────────────────────────
     MODULE BẢO VỆ WEBSITE & CHỐNG SPAM (Security & Anti-Bot Guard)
     - Honeypot Trap: Bẫy ẩn phát hiện và chặn bot tự động
     - Time Gate: Chặn thao tác submit dưới 2 giây
     - Double-Click & Cooldown 30s: Chặn bấm nhiều lần liên tiếp
     - Spam Filter: Lọc link rác, từ khóa quảng cáo và số điện thoại ảo
     ──────────────────────────────────────────────────────────── */
  var BOOKING_COOLDOWN_MS = 30000; // 30 giây cooldown
  var MIN_FILL_TIME_MS = 2000;  // Tối thiểu 2 giây để người dùng điền form
  var _isBookingSubmitting = false; // Cờ chặn race condition & double-submit

  var SECURITY_MESSAGES = {
    vi: {
      tooFast: '⚠️ Bạn thao tác quá nhanh. Vui lòng kiểm tra lại thông tin trước khi tiếp tục.',
      cooldown: '⚠️ Quý khách vừa gửi đơn đặt xe thành công. Hệ thống Mr. Ben đang xử lý, vui lòng đợi {s} giây hoặc liên hệ trực tiếp Hotline/Zalo: 0913.140.196.',
      invalidInfo: '⚠️ Thông tin đặt tour không hợp lệ (số điện thoại hoặc ký tự không được hỗ trợ). Vui lòng kiểm tra lại.',
      sending: 'Đang gửi...'
    },
    en: {
      tooFast: '⚠️ Action was too fast. Please review your details before proceeding.',
      cooldown: '⚠️ You have just submitted a booking request. Mr. Ben is processing it, please wait {s}s or contact us directly via WhatsApp: +84913140196.',
      invalidInfo: '⚠️ Invalid booking details (phone number or unsupported characters). Please review your information.',
      sending: 'Sending...'
    },
    ru: {
      tooFast: '⚠️ Действие выполнено слишком быстро. Пожалуйста, проверьте данные перед отправкой.',
      cooldown: '⚠️ Заявка уже отправлена и обрабатывается. Пожалуйста, подождите {s} сек или напишите нам в WhatsApp: +84913140196.',
      invalidInfo: '⚠️ Некорректные данные бронирования (номер телефона или неподдерживаемые символы).',
      sending: 'Отправка...'
    },
    zh: {
      tooFast: '⚠️ 操作过快，请在继续之前核对您的信息。',
      cooldown: '⚠️ 您刚刚已提交预订。我们正在处理中，请等待 {s} 秒或直接联系 WhatsApp/热线: +84913140196。',
      invalidInfo: '⚠️ 预订信息无效（电话号码或不受支持的字符），请重新检查。',
      sending: '发送中...'
    },
    ko: {
      tooFast: '⚠️ 작업이 너무 빠릅니다. 진행하기 전에 정보를 다시 확인해 주세요.',
      cooldown: '⚠️ 방금 예약을 접수하셨습니다. 처리 중이오니 {s}초 후 다시 시도하시거나 WhatsApp/전화로 문의해 주세요: +84913140196.',
      invalidInfo: '⚠️ 예약 정보가 올바르지 않습니다 (전화번호 또는 지원되지 않는 문자). 다시 확인해 주세요.',
      sending: '전송 중...'
    },
    de: {
      tooFast: '⚠️ Aktion zu schnell. Bitte überprüfen Sie Ihre Angaben vor dem Fortfahren.',
      cooldown: '⚠️ Sie haben gerade eine Buchung gesendet. Wir bearbeiten sie, bitte warten Sie {s} Sek. oder kontaktieren Sie uns per WhatsApp: +84913140196.',
      invalidInfo: '⚠️ Ungültige Buchungsangaben (Telefonnummer oder ungültige Zeichen). Bitte erneut prüfen.',
      sending: 'Wird gesendet...'
    }
  };

  function getSecurityMessage(key, param) {
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var dict = SECURITY_MESSAGES[lang] || SECURITY_MESSAGES.vi;
    var msg = dict[key] || SECURITY_MESSAGES.vi[key] || '';
    if (param !== undefined) {
      msg = msg.replace('{s}', param);
    }
    return msg;
  }

  /* 1. Kiểm tra Bẫy Honeypot ẩn */
  function checkHoneypotTrap() {
    var hp = document.getElementById('bfHpTrapField');
    if (hp && hp.value && hp.value.trim().length > 0) {
      console.warn('[Security Guard] 🚨 Phát hiện Bot kích hoạt Honeypot Trap. Chặn yêu cầu.');
      return false;
    }
    return true;
  }

  /* 2. Kiểm tra Thời gian điền form (Time Gate) */
  function checkTimeGate() {
    var now = Date.now();
    var elapsed = now - (modalOpenTime || 0);
    if (!modalOpenTime || elapsed < MIN_FILL_TIME_MS) {
      console.warn('[Security Guard] 🚨 Thao tác quá nhanh (' + elapsed + 'ms).');
      return false;
    }
    return true;
  }

  /* 3. Lọc số điện thoại rác & từ khóa quảng cáo/spam link */
  var SPAM_URL_PATTERN = /(https?:\/\/|www\.|\.com|\.net|\.org|\.xyz|\.vip|\.top|\.ru|\.cn|telegram\.me|t\.me)/i;
  var SPAM_KEYWORD_PATTERN = /(casino|viagra|sex|poker|bet88|crypto|bitcoin|usdt|seo\s+service)/i;
  var JUNK_PHONE_SEQUENCES = ['123456789', '987654321', '0123456789', '0987654321', '12345678', '87654321'];

  function isSpamLead(name, phone, notes) {
    if (!name && !phone) return false;
    if (name && (SPAM_URL_PATTERN.test(name) || SPAM_KEYWORD_PATTERN.test(name))) return true;
    if (notes && (SPAM_URL_PATTERN.test(notes) || SPAM_KEYWORD_PATTERN.test(notes))) return true;

    var cleanP = (phone || '').replace(/\D/g, '');
    if (cleanP.length >= 8 && /^(\d)\1+$/.test(cleanP)) return true;

    for (var i = 0; i < JUNK_PHONE_SEQUENCES.length; i++) {
      if (cleanP === JUNK_PHONE_SEQUENCES[i]) return true;
    }
    return false;
  }

  /* 4. Bộ đệm Cooldown 30 giây theo thiết bị / số điện thoại */
  function checkBookingCooldown(fullPhone) {
    try {
      var lastTs = parseInt(sessionStorage.getItem('mrb_last_booking_ts') || '0', 10);
      var lastPhone = sessionStorage.getItem('mrb_last_booking_phone') || '';
      var now = Date.now();
      if (lastTs && (now - lastTs < BOOKING_COOLDOWN_MS)) {
        var cleanLast = (lastPhone || '').replace(/\D/g, '');
        var cleanCurr = (fullPhone || '').replace(/\D/g, '');
        if (!cleanCurr || !cleanLast || cleanLast === cleanCurr) {
          var remainingSecs = Math.ceil((BOOKING_COOLDOWN_MS - (now - lastTs)) / 1000);
          return { isSpam: true, remaining: remainingSecs };
        }
      }
    } catch (e) {
      console.warn('[Security Guard] Lỗi truy cập sessionStorage:', e);
    }
    return { isSpam: false, remaining: 0 };
  }

  function recordBookingSuccess(fullPhone) {
    try {
      sessionStorage.setItem('mrb_last_booking_ts', Date.now().toString());
      if (fullPhone) sessionStorage.setItem('mrb_last_booking_phone', fullPhone);
    } catch (e) { }
  }

  /* ══════════════════════════════════════════════════════════════
     GATEWAY BẢO MẬT CLOUDFLARE WORKER (Reverse Proxy API Gateway)
     - Giấu hoàn toàn Make.com Webhook URL & Telegram Bot Token khỏi client
     - Whitelist CORS chặt chẽ cho mrbenjeeptours.com
     - Rate Limiting 6 req/phút/IP chống tấn công spam/flood
     - Bẫy bot Honeypot & Lọc spam lead tại Edge Server
     ══════════════════════════════════════════════════════════════ */
  var MRBEN_GATEWAY_URL = 'https://mrbenjeeptours.vochicuong-bin04.workers.dev';
  var GATEWAY_TIMEOUT_MS = 10000; // 10 giây timeout

  /* ── Gửi tin nhắn tức thì qua Cloudflare Worker tới Telegram (Độc lập) ── */
  function sendToTelegramOnly() {
    var rawMsg = buildMessage(true); // Lấy chuỗi HTML
    var hpTrap = (document.getElementById('bfHpTrapField') || {}).value || '';

    fetch(MRBEN_GATEWAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'telegram',
        message: rawMsg,
        parse_mode: 'HTML',
        hpField: hpTrap
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          console.log('✅ Đã gửi thông tin đến Telegram Group thành công thông qua Gateway.');
        } else {
          console.error('Lỗi khi gửi qua Gateway:', data);
        }
      })
      .catch(function (e) { console.error('Lỗi kết nối tới Gateway:', e); });
  }

  /* ── Gửi đồng thời Telegram & Webhook Make.com (Dành cho Tour Jeep) ── */
  function sendToTelegram() {
    // Luồng 1: Telegram qua Cloudflare Worker
    sendToTelegramOnly();

    // Luồng 2: Make.com Webhook (Lịch Google) qua Worker Gateway
    sendToMakeWebhook();
  }

  /* ────────────────────────────────────────────────────────────
     MODULE: Gửi dữ liệu đặt tour lên Make.com qua Cloudflare Gateway
     - Xác thực nghiêm ngặt (Validation) trước khi gửi
     - Chống gửi trùng lặp (isSubmitting flag)
     - AbortController timeout 10 giây
     - Làm sạch payload (sanitize)
     - Xử lý lỗi thân thiện người dùng
     ──────────────────────────────────────────────────────────── */

  /* ── Cờ chống gửi trùng lặp (double-submit prevention) ── */
  var _isSendingToMake = false;

  /* ── Tiện ích: Làm sạch chuỗi, loại bỏ ký tự gây lỗi JSON ── */
  function sanitizeStr(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Control chars
      .trim();
  }

  /* ── Regex kiểm tra SĐT linh hoạt (VN 9-10 số + quốc tế +8-15 số) ── */
  var PHONE_REGEX_LOCAL = /^\d{9,10}$/;
  var PHONE_REGEX_INTL = /^\+\d{8,15}$/;

  /* ── Xác thực dữ liệu bắt buộc trước khi gửi webhook ── */
  /* Hỗ trợ cả 2 mode: 'jeep' (mặc định) và 'transfer' */
  function validateWebhookPayload(name, phone, fullPhone, dtIso) {
    var isTransfer = isTransferBooking();
    var tag = '[Make.com Guard]';

    if (!checkHoneypotTrap()) {
      console.warn(tag + ' Phát hiện Honeypot Trap — bỏ qua.');
      return false;
    }

    if (!name || name.length < 2) {
      console.warn(tag + ' Tên không hợp lệ — bỏ qua.');
      return false;
    }
    if (!phone) {
      console.warn(tag + ' SĐT trống — bỏ qua.');
      return false;
    }
    if (!PHONE_REGEX_LOCAL.test(phone) && !PHONE_REGEX_INTL.test(fullPhone)) {
      console.warn(tag + ' SĐT sai định dạng — bỏ qua.');
      return false;
    }
    var notes = (document.getElementById('bfNotes') || {}).value || '';
    if (isSpamLead(name, phone, notes)) {
      console.warn(tag + ' Phát hiện thông tin spam/số ảo — bỏ qua.');
      return false;
    }
    if (!dtIso) {
      console.warn(tag + ' Chưa chọn ngày — bỏ qua.');
      return false;
    }
    var selDate = new Date(dtIso);
    var today = new Date(); today.setHours(0, 0, 0, 0);
    if (isNaN(selDate.getTime()) || selDate < today) {
      console.warn(tag + ' Ngày quá khứ — bỏ qua.');
      return false;
    }

    if (isTransfer) {
      /* Transfer: cần có loại xe + tuyến đường (pickup & dropoff) */
      if (!tfSelectedVehicle) {
        var actBtn = document.querySelector('.bf-toggle-row .bf-toggle.active');
        var actType = actBtn ? actBtn.getAttribute('data-type') : '';
        if (actType === 'gas7' || actType === 'gas16') {
          tfSelectedVehicle = actType;
        }
      }
      if (!tfSelectedVehicle) {
        console.warn(tag + ' [Transfer] Chưa chọn loại xe — bỏ qua.');
        return false;
      }
      var pIn = document.getElementById('bfTfPickup');
      var dIn = document.getElementById('bfTfDropoff');
      var pVal = pIn ? pIn.value.trim() : '';
      var dVal = dIn ? dIn.value.trim() : '';
      if (!pVal || !dVal) {
        console.warn(tag + ' [Transfer] Chưa chọn tuyến đường — bỏ qua.');
        return false;
      }
    } else {
      /* Jeep: cần có loại tour (private / group) */
      if (!tourType) {
        console.warn(tag + ' [Jeep] Chưa chọn loại tour — bỏ qua.');
        return false;
      }
    }
    return true;
  }

  /* ── Tiện ích: Tạo chuỗi createdAt chuẩn ISO (GMT+7) ── */
  function makeCreatedAt() {
    var now = new Date();
    var gmt7 = new Date(now.getTime() + 7 * 3600000);
    var Y = gmt7.getUTCFullYear();
    var M = ('0' + (gmt7.getUTCMonth() + 1)).slice(-2);
    var D = ('0' + gmt7.getUTCDate()).slice(-2);
    var h = ('0' + gmt7.getUTCHours()).slice(-2);
    var m = ('0' + gmt7.getUTCMinutes()).slice(-2);
    var s = ('0' + gmt7.getUTCSeconds()).slice(-2);
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
  }

  /* ── Tiện ích: Tạo chuỗi nowDt legacy (DD-MM-YYYY | HH:mm) ── */
  function makeLegacyNowDt() {
    var now = new Date();
    return ('0' + now.getDate()).slice(-2) + '-'
      + ('0' + (now.getMonth() + 1)).slice(-2) + '-'
      + now.getFullYear() + ' | '
      + ('0' + now.getHours()).slice(-2) + ':'
      + ('0' + now.getMinutes()).slice(-2);
  }

  /* ── Tiện ích: Phân tách dtInput thành pickupDate, pickupTime, dt, dtIso ── */
  function parseDatetimeInput() {
    var raw = dtInput.value ? dtInput.value.replace('T', ' ') : '';
    var result = { pickupDate: '', pickupTime: '', dt: '—', dtIso: dtInput.value || '' };
    if (!raw) return result;
    var parts = raw.split(' ');
    if (parts.length === 2) {
      result.pickupDate = parts[0];
      result.pickupTime = parts[1];
      var dp = parts[0].split('-');
      var paddedDay = dp[2].length === 1 ? '0' + dp[2] : dp[2];
      result.dt = paddedDay + '-' + dp[1] + '-' + dp[0] + ' | ' + parts[1];
    } else {
      result.dt = raw;
    }
    return result;
  }

  /* ── Tiện ích: Thu thập thông tin chung (name, phone, hotel, datetime...) ── */
  function collectCommonFields() {
    var name = sanitizeStr(document.getElementById('bfName').value);
    var phone = document.getElementById('bfPhone').value.trim();
    var cleanPhone = phone.replace(/^0/, '');
    var codeTextEl = document.getElementById('bfPhoneCodeText');
    var activeCode = selectedPhoneCode || (codeTextEl ? codeTextEl.value.trim() : '');
    var fullPhone = activeCode + (cleanPhone || '—');

    var hotelObj = document.getElementById('bfHotelName');
    var hotelWrapCheck = document.getElementById('bfHotelWrap');
    var isCustom = (hotelWrapCheck && hotelWrapCheck.classList.contains('is-other-selected'));
    var hotelName = '';
    if (isCustom) {
      hotelName = document.getElementById('bfHotelCustomName')
        ? sanitizeStr(document.getElementById('bfHotelCustomName').value) : '';
    } else {
      hotelName = hotelObj ? sanitizeStr(hotelObj.value) : '';
    }
    var hotelAddr = document.getElementById('bfHotelAddress')
      ? sanitizeStr(document.getElementById('bfHotelAddress').value) : '';
    var notes = sanitizeStr(document.getElementById('bfNotes').value);
    var dtInfo = parseDatetimeInput();

    return {
      name: name, cleanPhone: cleanPhone, fullPhone: sanitizeStr(fullPhone),
      hotelName: hotelName, hotelAddr: hotelAddr, notes: notes,
      pickupDate: dtInfo.pickupDate, pickupTime: dtInfo.pickupTime,
      dt: dtInfo.dt, dtIso: dtInfo.dtIso,
      createdAt: makeCreatedAt(), nowDt: makeLegacyNowDt()
    };
  }

  /* ── Build payload cho JEEP TOUR ── */
  function buildJeepPayload(c) {
    var rawTime = c.pickupTime || '';
    // Tour Jeep chỉ có 2 khung giờ cố định: Bình Minh (04:30) hoặc Hoàng Hôn (13:30)
    var isJeepSlot = (rawTime === '04:30' || rawTime === '13:30');
    var timeOnly = isJeepSlot ? rawTime : '';
    var safePickupTime = isJeepSlot ? rawTime : '';
    var safeDt = isJeepSlot ? c.dt : (c.pickupDate || '—');
    var safeDtIso = isJeepSlot ? c.dtIso : (c.pickupDate ? (c.pickupDate + 'T00:00') : '');

    var typeStr = tourType === 'private'
      ? 'Tour Riêng Tư' : 'Tour Ghép (' + guests + ' người)';
    var tourLine = (timeOnly ? timeOnly + ' - ' : '') + typeStr;
    var vehicleStr = vehicleCount + ' xe';

    var unit = 0;
    if (tourType === 'private') unit = pricePrivate;
    else if (tourType === 'group') unit = priceGroup;
    var count = (tourType === 'group') ? guests : vehicleCount;
    var baseTotal = unit * count;
    var totalNum;
    if (addonSandDuneSelected) {
      totalNum = (tourType === 'private')
        ? ADDON_PRICE_PER_VEHICLE * vehicleCount : ADDON_PRICE_PER_VEHICLE;
    } else {
      totalNum = baseTotal;
    }
    if (isHolidaySurcharge() && totalNum > 0) {
      totalNum = totalNum + Math.round(totalNum * HOLIDAY_SURCHARGE_RATE);
    }
    var totalText = totalNum > 0 ? fmt(totalNum) : '—';

    var pickupObj = document.getElementById('bfPickupAddress');
    var pickup = pickupObj ? sanitizeStr(pickupObj.value) : '';
    var tVi = (window.__MRB_TRANS || {})['vi'] || {};
    var addonStr = tVi['booking.addonSandDune'] || 'Leo đồi cát trắng bằng xe Jeep';
    var finalRouteVi = window.__bfCurrentRouteVi || '';

    return {
      serviceType: 'Tour Xe Jeep',
      customerName: c.name,
      phone: c.fullPhone,
      vehicleType: 'Xe Jeep',
      route: sanitizeStr(finalRouteVi),
      hotel: c.hotelName,
      address: c.hotelAddr,
      pickupDate: c.pickupDate,
      pickupTime: safePickupTime,
      totalPrice: totalText,
      totalPriceRaw: totalNum,
      notes: c.notes,
      createdAt: c.createdAt,
      tourLine: sanitizeStr(tourLine),
      tourType: tourType === 'private' ? 'Tour Riêng Tư' : 'Tour Ghép',
      vehicleStr: vehicleStr,
      addonSandDuneSelected: addonSandDuneSelected,
      addonStr: sanitizeStr(addonStr),
      finalRouteVi: sanitizeStr(finalRouteVi),
      pickup: pickup,
      holidaySurcharge: isHolidaySurcharge(),
      name: c.name,
      fullPhone: c.fullPhone,
      hotelName: c.hotelName,
      hotelAddr: c.hotelAddr,
      dt: safeDt,
      dtIso: safeDtIso,
      totalText: totalText,
      nowDt: c.nowDt
    };
  }

  /* ── Build payload cho XE ĐƯA ĐÓN (Transfer) ── */
  function buildTransferPayload(c) {
    var tfPickup = (document.getElementById('bfTfPickup') || {}).value || '';
    tfPickup = tfPickup.trim();
    var tfDropoff = (document.getElementById('bfTfDropoff') || {}).value || '';
    tfDropoff = tfDropoff.trim();

    /* Tên thành phố tiếng Việt */
    var pNameVi = getTransferCityName(tfPickup, 'vi');
    var dNameVi = getTransferCityName(tfDropoff, 'vi');
    var routeNameVi = (pNameVi || '—') + ' → ' + (dNameVi || '—');

    /* Loại xe (hiển thị tiếng Việt) */
    var vehicleTypeMap = { gas7: 'Xe 7 Chỗ', gas16: 'Xe 16 Chỗ' };
    var vehicleType = vehicleTypeMap[tfSelectedVehicle] || '—';

    /* Giá tiền */
    var tfPrice = 0;
    if (tfSelectedRoute && tfSelectedVehicle) {
      tfPrice = (tfSelectedRoute.prices && tfSelectedRoute.prices[tfSelectedVehicle]) || 0;
    }
    var totalText = tfPrice > 0 ? fmt(tfPrice) : '—';

    var payload = {
      serviceType: 'Xe Đưa Đón',
      customerName: c.name,
      phone: c.fullPhone,
      vehicleType: vehicleType,
      route: sanitizeStr(routeNameVi),
      hotel: c.hotelName,
      address: c.hotelAddr,
      pickupDate: c.pickupDate,
      pickupTime: c.pickupTime,
      totalPrice: totalText,
      totalPriceRaw: tfPrice,
      notes: c.notes,
      createdAt: c.createdAt,
      pickupCity: sanitizeStr(tfPickup),
      dropoffCity: sanitizeStr(tfDropoff),
      vehicleId: tfSelectedVehicle,
      name: c.name,
      fullPhone: c.fullPhone,
      hotelName: c.hotelName,
      hotelAddr: c.hotelAddr,
      dt: c.dt,
      dtIso: c.dtIso,
      totalText: totalText,
      nowDt: c.nowDt
    };

    /* ── CÔ LẬP DỮ LIỆU TUYỆT ĐỐI (Strict Data Separation) ──
       Tuyệt đối KHÔNG gửi các trường của Tour Xe Jeep trong payload Xe Đưa Đón */
    delete payload.tourType;
    delete payload.tourLine;
    delete payload.vehicleStr;
    delete payload.addonSandDuneSelected;
    delete payload.addonStr;
    delete payload.finalRouteVi;
    delete payload.holidaySurcharge;
    delete payload.pickup;

    return payload;
  }

  /* ── Hàm chính: Thu thập, xác thực và gửi dữ liệu tới Make.com ── */
  function sendToMakeWebhook() {
    if (_isSendingToMake) {
      console.warn('[Make.com] Đang xử lý đơn trước — bỏ qua trùng lặp.');
      return;
    }

    /* 1. Thu thập dữ liệu chung */
    var c = collectCommonFields();

    /* 2. Xác thực — chặn payload rỗng / không hợp lệ */
    if (!validateWebhookPayload(c.name, c.cleanPhone, c.fullPhone, c.dtIso)) {
      console.warn('[Make.com] Dữ liệu không hợp lệ — KHÔNG gửi webhook.');
      return;
    }

    /* 3. Phân nhánh: Xây dựng payload theo loại dịch vụ */
    var isTransfer = isTransferBooking();
    var bookingData;
    if (isTransfer) {
      bookingData = buildTransferPayload(c);
      delete bookingData.tourType;
    } else {
      bookingData = buildJeepPayload(c);
    }

    /* 4. Bật cờ chống gửi trùng */
    _isSendingToMake = true;
    console.log('[Make.com] 📤 Gửi ' + bookingData.serviceType + ':'
      + ' ' + JSON.stringify(bookingData).length + ' bytes');

    /* 5. AbortController — Tự hủy nếu Gateway > 10 giây */
    var abortCtrl = new AbortController();
    var timeoutId = setTimeout(function () {
      abortCtrl.abort();
    }, GATEWAY_TIMEOUT_MS);

    var hpTrap = (document.getElementById('bfHpTrapField') || {}).value || '';

    fetch(MRBEN_GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        action: 'make',
        bookingData: bookingData,
        hpField: hpTrap
      }),
      signal: abortCtrl.signal
    })
      .then(function (response) {
        clearTimeout(timeoutId);
        if (response.ok) {
          console.log('✅ Ting ting! Đã đẩy ['
            + bookingData.serviceType + '] sang Make.com qua Cloudflare Gateway thành công!');
        } else {
          console.error('[Gateway] HTTP ' + response.status);
        }
      })
      .catch(function (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          console.error('[Gateway] ⏱️ Timeout '
            + (GATEWAY_TIMEOUT_MS / 1000) + 's. Đơn đã gửi qua kênh khác.');
        } else {
          console.error('[Gateway] ❌ Lỗi kết nối:', err.message || err);
        }
      })
      .finally(function () {
        _isSendingToMake = false; // Trả cờ, cho phép gửi đơn mới
      });
  }

  /* ══════════════════════════════════════════════════════════════
     HÀM XỬ LÝ SUBMIT ĐẶT XE ĐƯA ĐÓN (Transfer Booking Submit)
     - Lắng nghe submit form hoặc click nút gửi đặt xe đưa đón
     - Kiểm tra xác thực (Validation): Họ tên, SĐT, Ngày đón, Tuyến đường
     - Ngăn chặn hoàn toàn payload rỗng 1.0 B lên Make.com
     - Chống spam / double-click: Vô hiệu hóa nút và đổi chữ "Đang xử lý..."
     - Gửi fetch() POST JSON tới Make.com Webhook với AbortController
     - Xử lý phản hồi Success / Error kèm popup / modal thông báo trực quan
     ══════════════════════════════════════════════════════════════ */
  function handleTransferBookingSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    /* 0. Bẫy Bot Honeypot & Time Gate */
    if (!checkHoneypotTrap()) return false;
    if (!checkTimeGate()) {
      alert(getSecurityMessage('tooFast'));
      return false;
    }

    /* 1. Chống gửi trùng nếu đang có tiến trình gửi */
    if (_isSendingToMake || _isBookingSubmitting) {
      console.warn('[Make.com] Đang xử lý đơn trước — vui lòng đợi giây lát.');
      return false;
    }

    /* 2. Thu thập dữ liệu chung từ form */
    var c = collectCommonFields();

    /* 2.1. Kiểm tra Cooldown 30s & Dữ liệu rác */
    var cd = checkBookingCooldown(c.fullPhone);
    if (cd.isSpam) {
      alert(getSecurityMessage('cooldown', cd.remaining));
      return false;
    }
    if (isSpamLead(c.name, c.cleanPhone, c.notes)) {
      alert(getSecurityMessage('invalidInfo'));
      return false;
    }

    /* 3. Lấy dữ liệu riêng cho dịch vụ Xe Đưa Đón */
    var pEl = document.getElementById('bfTfPickup');
    var dEl = document.getElementById('bfTfDropoff');
    var tfPickup = (pEl ? pEl.value : '').trim();
    var tfDropoff = (dEl ? dEl.value : '').trim();

    /* 4. VALIDATION NGHIÊM NGẶT — Ngăn chặn triệt để gói tin rỗng 1.0 B */
    var errors = [];
    if (!c.name || c.name.length < 2) {
      errors.push('Vui lòng nhập Họ tên hợp lệ.');
      if (document.getElementById('bfName')) document.getElementById('bfName').classList.add('bf-error');
    }
    if (!c.cleanPhone || c.cleanPhone.length < 8 || c.cleanPhone.length > 15) {
      errors.push('Vui lòng nhập Số điện thoại hợp lệ (8 - 15 chữ số).');
      if (document.getElementById('bfPhone')) document.getElementById('bfPhone').classList.add('bf-error');
    }
    if (!c.pickupDate || !c.pickupTime) {
      errors.push('Vui lòng chọn Ngày & Giờ đón.');
      var dtTrig = document.getElementById('bfDtTrigger');
      if (dtTrig) dtTrig.classList.add('bf-error');
    }
    if (!tfSelectedVehicle) {
      errors.push('Vui lòng chọn loại xe (Xe 7 Chỗ hoặc Xe 16 Chỗ).');
      if (btnPrivate) btnPrivate.classList.add('bf-error');
      if (btn16) btn16.classList.add('bf-error');
    }
    if (!tfPickup || !tfDropoff) {
      errors.push('Vui lòng chọn đầy đủ Điểm đón và Điểm trả.');
      var pTrig = document.getElementById('bfTfPickupTrigger');
      var dTrig = document.getElementById('bfTfDropoffTrigger');
      if (pTrig && !tfPickup) pTrig.classList.add('bf-error');
      if (dTrig && !tfDropoff) dTrig.classList.add('bf-error');
    } else if (tfPickup.toLowerCase() === tfDropoff.toLowerCase()) {
      errors.push('Điểm đón và Điểm trả không được trùng nhau.');
    } else if (!hasTransferRoute(tfPickup, tfDropoff)) {
      errors.push('Tuyến đường này hiện không khả dụng trong bảng giá niêm yết.');
    }

    if (errors.length > 0) {
      console.warn('[Validation] Không thể gửi đơn đặt xe:', errors);
      alert('⚠️ ' + errors.join('\n'));
      return false;
    }

    /* 5. Xác định nút submit & hiển thị trạng thái đang xử lý */
    var submitBtn = null;
    if (event) {
      submitBtn = event.submitter || (event.target && event.target.querySelector ? event.target.querySelector('button[type="submit"], .btn-submit, #bfConfirmSendNow') : null);
      if (!submitBtn && event.target && (event.target.tagName === 'BUTTON' || event.target.tagName === 'A')) {
        submitBtn = event.target;
      }
    }
    if (!submitBtn) {
      submitBtn = document.getElementById('bfConfirmSendNow') || document.querySelector('.bf-btn-wa');
    }

    var originalBtnText = '';
    if (submitBtn) {
      originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    }

    /* 6. Đóng gói Payload theo Schema chuẩn */
    var payload = buildTransferPayload(c);
    delete payload.tourType;

    /* 7. Kích hoạt cờ chống gửi trùng */
    _isSendingToMake = true;

    /* 8. Thiết lập AbortController (Timeout 10s) */
    var abortCtrl = new AbortController();
    var timeoutId = setTimeout(function () {
      abortCtrl.abort();
    }, GATEWAY_TIMEOUT_MS);

    var hpTrap = (document.getElementById('bfHpTrapField') || {}).value || '';
    var rawMsg = buildMessage(true);

    /* 9. Gửi fetch POST JSON tới Cloudflare Gateway (Điều phối Make.com & Telegram) */
    fetch(MRBEN_GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        action: 'booking',
        bookingData: payload,
        message: rawMsg,
        hpField: hpTrap
      }),
      signal: abortCtrl.signal
    })
      .then(function (response) {
        clearTimeout(timeoutId);
        if (response.ok) {
          console.log('✅ [Gateway] Đã gửi đơn Xe Đưa Đón thành công!', payload);
          // Ghi nhận cooldown vào sessionStorage
          recordBookingSuccess(c.fullPhone);

          // Đóng modal xác nhận nếu đang mở
          if (typeof closeConfirmModal === 'function') closeConfirmModal();
          // Mở modal cảm ơn trực quan
          if (typeof openThankModal === 'function') {
            openThankModal();
          } else {
            alert('🎉 Cảm ơn quý khách! Đơn đặt xe đưa đón đã được tiếp nhận. Đội ngũ Mr. Ben sẽ liên hệ xác nhận ngay!');
          }
          // Reset form
          if (typeof resetBookingForm === 'function') resetBookingForm();
        } else {
          throw new Error('HTTP ' + response.status + ': Máy chủ Gateway phản hồi không thành công.');
        }
      })
      .catch(function (err) {
        clearTimeout(timeoutId);
        console.error('❌ [Gateway] Gửi đơn thất bại:', err);
        if (err.name === 'AbortError') {
          alert('⏱️ Yêu cầu gửi đơn quá thời gian (Timeout). Vui lòng kiểm tra kết nối mạng hoặc liên hệ Hotline/Zalo: 0913.140.196.');
        } else {
          alert('❌ Có lỗi xảy ra khi gửi đơn đặt xe. Quý khách vui lòng liên hệ trực tiếp Hotline/Zalo: 0913.140.196 để được hỗ trợ tức thì!');
        }
      })
      .finally(function () {
        _isSendingToMake = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.innerHTML = originalBtnText || 'Gửi ngay';
        }
      });

    return true;
  }

  // Export ra window để gọi từ form submit hoặc bên ngoài
  window.handleTransferBookingSubmit = handleTransferBookingSubmit;



  /* ─── Confirm Modal Logic ─── */
  var confirmModal = document.getElementById('bfConfirmModal');
  if (confirmModal) document.body.appendChild(confirmModal); // Reparent out of booking-overlay to avoid clipping
  var confirmClose = document.getElementById('bfConfirmClose');
  var confirmPreview = document.getElementById('bfConfirmPreview');
  var confirmNum = document.getElementById('bfCountdownNum');
  var confirmCircle = document.getElementById('bfCountdownCircle');
  var btnEdit = document.getElementById('bfConfirmEdit');
  var btnSendNow = document.getElementById('bfConfirmSendNow');

  var confirmTimer = null;
  var countdownSecs = 30;
  var pendingPlatform = null;
  var pendingLink = '';

  function resetSendButtonText() {
    if (!btnSendNow) return;
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};
    var label = T['booking.confirmSendNow'] || (lang === 'vi' ? 'Gửi luôn' : 'Send Now');
    btnSendNow.classList.remove('bf-btn-pulse', 'is-loading');
    btnSendNow.innerHTML = '<span data-i18n="booking.confirmSendNow">' + label + '</span>&nbsp;(<span id="bfCountdownNum">30</span>s)';
    confirmNum = document.getElementById('bfCountdownNum');
  }

  function triggerPhoneCall(telUri) {
    if (!telUri) return;
    var cleanUri = telUri;
    if (cleanUri.indexOf('tel:') !== 0) cleanUri = 'tel:' + cleanUri;

    // Chuẩn kích hoạt qua location.href (tương thích iOS Safari & Android)
    try {
      window.location.href = cleanUri;
    } catch (e) {
      console.warn('Lỗi kích hoạt cuộc gọi qua location.href:', e);
    }
  }

  function openConfirmModal(platform) {
    if (!confirmModal) return;
    pendingPlatform = platform;
    var rawMsg = buildWAMessage();
    var plainMsg = buildMessage(false);
    var listData = buildMessage('list');

    if (platform === 'whatsapp') {
      pendingLink = 'https://wa.me/84913140196?text=' + rawMsg;
    } else if (platform === 'zalo') {
      var zObj = { act: "WA", oa: "84913140196", ext: "txt", text: plainMsg };
      var state = encodeURIComponent(JSON.stringify(zObj));
      pendingLink = 'https://zalo.me/84913140196?state=' + state;
    } else if (platform === 'call') {
      pendingLink = 'tel:+84913140196';
    }

    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};

    // Cập nhật tiêu đề bảng xác nhận (Tour hoặc Xe đưa đón)
    var confirmTitleEl = confirmModal.querySelector('.bf-confirm-header h3');
    if (confirmTitleEl) {
      var isTransfer = (window.__bookingMode === 'transfer' || isTransferBooking());
      if (lang === 'vi') {
        confirmTitleEl.textContent = isTransfer ? 'Xác Nhận Đặt Xe' : 'Xác Nhận Đặt Tour';
      } else {
        confirmTitleEl.textContent = T['booking.confirmTitle'] || 'Confirm Booking';
      }
    }

    // Cập nhật nút xác nhận (Gọi Ngay vs Gửi Luôn) & thuộc tính href cho thẻ <a>
    if (btnSendNow) {
      var isCall = (platform === 'call');
      btnSendNow.classList.remove('bf-btn-pulse', 'is-loading');

      if (isCall) {
        btnSendNow.href = 'tel:+84913140196';
        btnSendNow.setAttribute('href', 'tel:+84913140196');
        btnSendNow.removeAttribute('target');
        btnSendNow.setAttribute('rel', 'noopener');
      } else {
        btnSendNow.href = pendingLink;
        btnSendNow.setAttribute('href', pendingLink);
        btnSendNow.setAttribute('target', '_blank');
        btnSendNow.setAttribute('rel', 'noopener noreferrer');
      }

      var label = isCall
        ? (T['booking.confirmCallNow'] || (lang === 'vi' ? 'Gọi ngay' : 'Call Now'))
        : (T['booking.confirmSendNow'] || (lang === 'vi' ? 'Gửi luôn' : 'Send Now'));
      var i18nKey = isCall ? 'booking.confirmCallNow' : 'booking.confirmSendNow';
      btnSendNow.innerHTML = '<span data-i18n="' + i18nKey + '">' + label + '</span>&nbsp;(<span id="bfCountdownNum">30</span>s)';
      confirmNum = document.getElementById('bfCountdownNum');
    }

    // Inject List Data
    var listEl = document.getElementById('bfConfirmList');
    if (listEl) {
      listEl.innerHTML = '';
      listData.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'bf-confirm-item';
        li.innerHTML =
          '<div class="bf-confirm-icon ' + item.color + '"><i class="fa ' + item.icon + '"></i></div>' +
          '<span class="bf-confirm-label">' + item.label + ':</span>' +
          '<span class="bf-confirm-val">' + item.val + '</span>';
        listEl.appendChild(li);
      });
    }

    countdownSecs = 30;
    if (confirmNum) confirmNum.textContent = countdownSecs;

    confirmModal.classList.add('open');
    clearInterval(confirmTimer);
    confirmTimer = setInterval(function () {
      countdownSecs--;
      if (confirmNum) confirmNum.textContent = countdownSecs;
      if (countdownSecs <= 0) {
        clearInterval(confirmTimer);
        if (pendingPlatform === 'call') {
          // Gửi trước thông tin đơn đặt lịch vào Telegram cho Mr. Ben
          sendToTelegram();
          var c = collectCommonFields();
          recordBookingSuccess(c.fullPhone);

          // Trên iOS/WebKit, trình duyệt chặn cuộc gọi tự động từ timer không có tương tác người dùng.
          // Ta chuyển nút sang trạng thái Nhấn Gọi Ngay nổi bật với animation pulse
          if (btnSendNow) {
            btnSendNow.classList.add('bf-btn-pulse');
            var callPrompt = T['booking.confirmCallNow'] || (lang === 'vi' ? 'Nhấn để Gọi Ngay' : 'Tap to Call Now');
            btnSendNow.innerHTML = '<i class="fas fa-phone-alt"></i> ' + callPrompt + ': 0913 140 196';
            btnSendNow.href = 'tel:+84913140196';
            btnSendNow.setAttribute('href', 'tel:+84913140196');
          }
        } else {
          executeSend();
        }
      }
    }, 1000);
  }

  function closeConfirmModal() {
    clearInterval(confirmTimer);
    if (confirmModal) {
      confirmModal.classList.remove('open');
    }
    if (btnSendNow) {
      btnSendNow.classList.remove('bf-btn-pulse', 'is-loading');
    }
    pendingPlatform = null;
    pendingLink = '';
    resetSendButtonText();
  }

  function executeSend(e) {
    if (_isBookingSubmitting) {
      if (e && e.preventDefault) e.preventDefault();
      console.warn('[Security Guard] Yêu cầu đang được xử lý, bỏ qua click trùng lặp.');
      return;
    }

    clearInterval(confirmTimer);
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};
    var isCall = (pendingPlatform === 'call' || (pendingLink && pendingLink.indexOf('tel:') === 0));

    if (btnSendNow) {
      btnSendNow.classList.remove('bf-btn-pulse');
      btnSendNow.classList.add('is-loading');
      var loadingText = isCall
        ? (T['booking.connectingCall'] || (lang === 'vi' ? 'Đang kết nối cuộc gọi...' : 'Connecting...'))
        : getSecurityMessage('sending');
      btnSendNow.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + loadingText;
    }

    _isBookingSubmitting = true;

    try {
      if (pendingLink) {
        // Gửi tức thì thông tin đặt tour/xe qua Telegram bot
        sendToTelegram();

        // Ghi nhận cooldown vào sessionStorage
        var c = collectCommonFields();
        recordBookingSuccess(c.fullPhone);

        if (isCall) {
          // XỬ LÝ GỌI ĐIỆN TƯƠNG THÍCH HOÀN TOÀN IOS & ANDROID:
          // Nếu có sự kiện click thực tế từ người dùng trên thẻ <a>, KHÔNG gọi e.preventDefault()
          // để iOS Safari xử lý mở ứng dụng Điện thoại một cách tự nhiên nhất (hiển thị popup Gọi số...).
          // Nếu được gọi từ script/timer không có event, dùng triggerPhoneCall fallback.
          if (!e || !e.type) {
            triggerPhoneCall(pendingLink);
          }

          // Chờ 800ms để trình quay số hệ thống mở an toàn trước khi chuyển sang Thank Modal
          setTimeout(function () {
            closeConfirmModal();
            openThankModal();
            resetBookingForm();
            _isBookingSubmitting = false;
            if (btnSendNow) {
              btnSendNow.classList.remove('is-loading');
              resetSendButtonText();
            }
          }, 800);
          return;
        } else {
          // WhatsApp / Zalo
          if (e && e.preventDefault) e.preventDefault();
          var a = document.createElement('a');
          a.href = pendingLink;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          document.body.appendChild(a);
          a.click();
          setTimeout(function () {
            if (a.parentNode) a.parentNode.removeChild(a);
          }, 1000);

          setTimeout(function () {
            resetBookingForm();
          }, 500);
        }
      }
    } finally {
      if (!isCall) {
        closeConfirmModal();
        openThankModal();

        setTimeout(function () {
          _isBookingSubmitting = false;
          if (btnSendNow) {
            btnSendNow.classList.remove('is-loading');
            resetSendButtonText();
          }
        }, 2500);
      }
    }
  }

  if (confirmClose) confirmClose.addEventListener('click', closeConfirmModal);
  if (btnEdit) btnEdit.addEventListener('click', closeConfirmModal);
  if (btnSendNow) btnSendNow.addEventListener('click', executeSend);

  /* ─── Thank You Modal Logic ─── */
  var thankModal = document.getElementById('bfThankModal');
  if (thankModal) document.body.appendChild(thankModal); // Reparent to avoid clipping
  var thankCloseBtn = document.getElementById('bfThankClose');

  function openThankModal() {
    if (!thankModal) return;
    // Close the booking overlay behind
    var bookingOverlay = document.getElementById('bookingOverlay');
    if (bookingOverlay) {
      bookingOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    // Apply current language translations to the thank modal
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};
    thankModal.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (T[key]) el.textContent = T[key];
    });
    thankModal.classList.add('open');
  }

  function closeThankModal() {
    if (thankModal) {
      thankModal.classList.remove('open');
    }
  }

  if (thankCloseBtn) thankCloseBtn.addEventListener('click', closeThankModal);
  if (thankModal) {
    thankModal.addEventListener('click', function (e) {
      if (e.target === thankModal) closeThankModal();
    });
  }

  function validateBookingForm() {
    // 0. Bẫy Bot Honeypot & Time Gate
    if (!checkHoneypotTrap()) return false;
    if (!checkTimeGate()) {
      alert(getSecurityMessage('tooFast'));
      return false;
    }

    var isValid = true;
    var firstErr = null;
    var isTransfer = (window.__bookingMode === 'transfer' || isTransferBooking());

    // 0.1 Kiểm tra Cooldown 30 giây & Spam Lead
    var cPhone = (document.getElementById('bfPhone') || {}).value || '';
    var cCode = (document.getElementById('bfPhoneCodeText') || {}).value || (typeof selectedPhoneCode !== 'undefined' ? selectedPhoneCode : '+84');
    var cd = checkBookingCooldown(cCode + cPhone.replace(/\D/g, ''));
    if (cd.isSpam) {
      alert(getSecurityMessage('cooldown', cd.remaining));
      return false;
    }

    var nameVal = ((document.getElementById('bfName') || {}).value || '').trim();
    var phoneVal = ((document.getElementById('bfPhone') || {}).value || '').trim();
    var notesVal = ((document.getElementById('bfNotes') || {}).value || '').trim();
    if (isSpamLead(nameVal, phoneVal, notesVal)) {
      alert(getSecurityMessage('invalidInfo'));
      return false;
    }

    var T = (window.__MRB_TRANS || {})[localStorage.getItem('mrben-lang') || 'vi'] || {};
    var reqFields = [
      { id: 'bfName', text: T['wa.name'] || 'Họ tên' },
      { id: 'bfPhone', text: T['wa.phone'] || 'SĐT' }
    ];

    if (isTransfer) {
      reqFields.push({ id: 'bfTfPickup', text: T['transfer.labelPickup'] || 'Điểm đón' });
      reqFields.push({ id: 'bfTfDropoff', text: T['transfer.labelDropoff'] || 'Điểm trả' });
      var pVal = (document.getElementById('bfTfPickup') || {}).value || '';
      var dVal = (document.getElementById('bfTfDropoff') || {}).value || '';
      pVal = pVal.trim();
      dVal = dVal.trim();
      if (pVal && dVal) {
        if (pVal.toLowerCase() === dVal.toLowerCase() || !hasTransferRoute(pVal, dVal)) {
          isValid = false;
          var pTrig = document.getElementById('bfTfPickupTrigger');
          var dTrig = document.getElementById('bfTfDropoffTrigger');
          if (pTrig) pTrig.classList.add('bf-error');
          if (dTrig) dTrig.classList.add('bf-error');
          if (!firstErr) firstErr = pTrig || dTrig;
        }
      }
    }

    reqFields.push({ id: 'bfHotelName', text: T['wa.hotel'] || 'Khách sạn' });
    reqFields.push({ id: 'bfHotelAddress', text: T['wa.hotelAddress'] || 'Địa chỉ' });
    var hotelNameEl = document.getElementById('bfHotelName');
    var hotelWrapEl = document.getElementById('bfHotelWrap');
    if (hotelNameEl && hotelWrapEl && hotelWrapEl.classList.contains('is-other-selected')) {
      reqFields.push({ id: 'bfHotelCustomName', text: T['wa.hotel'] || 'Khách sạn' });
    }

    reqFields.forEach(function (f) {
      var el = document.getElementById(f.id);
      if (el) {
        var targetEl = el.closest('.bf-custom-select')
          ? el.closest('.bf-custom-select').querySelector('.bf-custom-select-trigger')
          : (el.closest('.bf-hotel-input-row') || el);
        var val = el.value.trim();
        var isInvalid = !val;

        // Custom validation logic
        if (f.id === 'bfName' && val) {
          // Name cannot contain numbers
          if (/[0-9]/.test(val)) isInvalid = true;
        } else if (f.id === 'bfPhone' && val) {
          // Tự động kiểm tra và chuẩn hóa mã vùng trùng lặp trước khi kiểm tra độ dài
          sanitizePhoneNumberInput(el, true);
          val = el.value.trim();
          // Phone length validation based on country code
          var pLen = val.length;
          var cCode = (typeof selectedPhoneCode !== 'undefined' ? selectedPhoneCode : '+84');
          if (cCode === '+84' && (pLen < 9 || pLen > 10)) isInvalid = true;      // VN: 9-10
          else if (cCode === '+1' && pLen !== 10) isInvalid = true;              // US: 10
          else if (cCode === '+7' && pLen !== 10) isInvalid = true;              // RU: 10
          else if (cCode === '+86' && pLen !== 11) isInvalid = true;             // CN: 11
          else if (cCode === '+82' && (pLen < 9 || pLen > 10)) isInvalid = true; // KR: 9-10
          else if (cCode === '+49' && (pLen < 10 || pLen > 11)) isInvalid = true;// DE: 10-11
          else if (cCode === '') {
            var ct = document.getElementById('bfPhoneCodeText');
            var cBtn = document.getElementById('bfPhoneCodeBtn');
            if (ct && cBtn) {
              var cVal = ct.value.trim();
              var validGlobalPattern = /^\+(1|7|20|27|21[1-368]|22\d|23\d|24[0-689]|25[0-8]|26\d|29[0-37-9]|3[0-469]|35\d|37\d|38[0-35-79]|4[013-9]|42[013]|5[1-8]|50\d|59\d|6[0-6]|67[02-9]|68[0-35-9]|69[0-2]|8[1246]|85[02356]|870|88[06]|9[0-58]|96[0-8]|97[0-79]|99[1-68])$/;
              if (!validGlobalPattern.test(cVal)) {
                cBtn.classList.add('bf-error');
                isInvalid = true;
                if (!firstErr) firstErr = ct;
              } else {
                cBtn.classList.remove('bf-error');
              }
            }
            if (pLen < 8 || pLen > 15) isInvalid = true;    // Custom phone digits
          }
        }

        if (isInvalid) {
          targetEl.classList.add('bf-error');
          isValid = false;
          if (!firstErr) firstErr = el;
        } else {
          targetEl.classList.remove('bf-error');
        }
      }
    });

    // Check Datetime
    var dt = document.getElementById('bfDatetime');
    var dtTrigger = document.getElementById('bfDtTrigger');
    if (dt && !dt.value.trim()) {
      if (dtTrigger) dtTrigger.classList.add('bf-error');
      isValid = false;
      if (!firstErr && dtTrigger) firstErr = dtTrigger;
    } else if (!isTransfer && dt && dt.value.trim()) {
      // Tour Jeep chỉ chấp nhận 04:30 hoặc 13:30
      var timePart = (dt.value.split('T')[1] || '').trim();
      if (timePart !== '04:30' && timePart !== '13:30') {
        if (dtTrigger) dtTrigger.classList.add('bf-error');
        isValid = false;
        if (!firstErr && dtTrigger) firstErr = dtTrigger;
      } else {
        if (dtTrigger) dtTrigger.classList.remove('bf-error');
      }
    } else {
      if (dtTrigger) dtTrigger.classList.remove('bf-error');
    }

    // Check Tour Type (must have one active button)
    var btnPriv = document.getElementById('bfTypePrivate');
    var btnGrp = document.getElementById('bfTypeGroup');
    var btn16v = document.getElementById('bfType16');
    if (btnPriv && btnGrp) {
      var hasActive = btnPriv.classList.contains('active') || btnGrp.classList.contains('active') || (btn16v && btn16v.classList.contains('active'));
      if (!hasActive) {
        btnPriv.classList.add('bf-error');
        if (btnGrp.style.display !== 'none') btnGrp.classList.add('bf-error');
        if (btn16v && btn16v.style.display !== 'none') btn16v.classList.add('bf-error');
        isValid = false;
        if (!firstErr) firstErr = btnPriv;
      } else {
        btnPriv.classList.remove('bf-error');
        btnGrp.classList.remove('bf-error');
        if (btn16v) btn16v.classList.remove('bf-error');
      }
    }

    if (!isValid && firstErr) {
      firstErr.focus();
      // Optional: scroll into view
      firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
  }

  // Remove error class on input
  ['bfName', 'bfPhone', 'bfHotelCustomName', 'bfHotelAddress', 'bfTfPickup', 'bfTfDropoff'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () {
        var targetEl = el.closest('.bf-hotel-input-row') || el;
        targetEl.classList.remove('bf-error');

        // Strip numbers from Name
        if (id === 'bfName') {
          this.value = this.value.replace(/[0-9]/g, '');
        }
        // Chuẩn hóa và tự động sửa mã vùng trùng lặp cho số điện thoại
        if (id === 'bfPhone') {
          sanitizePhoneNumberInput(this, false);
        }
      });
    }
  });

  // Sự kiện blur, change và paste để hoàn thiện chuẩn hóa số điện thoại
  var phoneFieldEl = document.getElementById('bfPhone');
  if (phoneFieldEl) {
    phoneFieldEl.addEventListener('blur', function () {
      sanitizePhoneNumberInput(this, true);
    });
    phoneFieldEl.addEventListener('change', function () {
      sanitizePhoneNumberInput(this, true);
    });
    phoneFieldEl.addEventListener('paste', function () {
      var self = this;
      setTimeout(function () {
        sanitizePhoneNumberInput(self, true);
      }, 0);
    });
  }

  // Strip non-numeric/plus from Custom Phone Code text and validate
  var phoneCodeInput = document.getElementById('bfPhoneCodeText');
  var phoneCodeBtn = document.getElementById('bfPhoneCodeBtn');
  var validGlobalPattern = /^\+(1|7|20|27|21[1-368]|22\d|23\d|24[0-689]|25[0-8]|26\d|29[0-37-9]|3[0-469]|35\d|37\d|38[0-35-79]|4[013-9]|42[013]|5[1-8]|50\d|59\d|6[0-6]|67[02-9]|68[0-35-9]|69[0-2]|8[1246]|85[02356]|870|88[06]|9[0-58]|96[0-8]|97[0-79]|99[1-68])$/;
  var partialGlobalPattern = /^\+(2[1-689]?|3[578]?|42?|5[09]?|6[789]?|8[578]?|9[679]?)$/;

  if (phoneCodeInput) {
    phoneCodeInput.addEventListener('input', function () {
      // Ensure it starts with +, then only numbers
      var val = this.value.replace(/[^\d+]/g, '');
      if (val && val[0] !== '+') val = '+' + val.replace(/\+/g, '');
      else if (val) val = '+' + val.substring(1).replace(/\+/g, '');
      this.value = val;

      // Real-time validation
      if (phoneCodeBtn) {
        if (val.length > 1 && !validGlobalPattern.test(val) && !partialGlobalPattern.test(val)) {
          phoneCodeBtn.classList.add('bf-error');
        } else {
          phoneCodeBtn.classList.remove('bf-error');
        }
      }
    });

    phoneCodeInput.addEventListener('blur', function () {
      var phoneField = document.getElementById('bfPhone');
      if (phoneField && phoneField.value) {
        sanitizePhoneNumberInput(phoneField, true);
      }
    });
  }

  var btnWa = document.getElementById('bfWhatsApp');
  var btnZalo = document.getElementById('bfZalo');
  if (btnWa) {
    btnWa.addEventListener('click', function (e) {
      e.preventDefault();
      if (validateBookingForm()) openConfirmModal('whatsapp');
    });
  }
  if (btnZalo) {
    btnZalo.addEventListener('click', function (e) {
      e.preventDefault();
      if (validateBookingForm()) openConfirmModal('zalo');
    });
  }

  var btnCalls = document.querySelectorAll('.bf-btn-call, #bfCall');
  btnCalls.forEach(function (btnCall) {
    btnCall.addEventListener('click', function (e) {
      e.preventDefault();
      if (_isBookingSubmitting) return;
      if (validateBookingForm()) openConfirmModal('call');
    });
  });

})();
