/* ============================================================
   ITINERARY SELECTOR
   ============================================================ */
(function () {
  'use strict';

  /* Returns the 4 stop names in the current UI language */
  function getStops() {
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};
    return {
      white: T['stop.whiteDune'] || 'Đồi Cát Trắng',
      red: T['stop.redDune'] || 'Đồi Cát Đỏ',
      fish: T['stop.fishVillage'] || 'Làng Chài Mũi Né',
      fairy: T['stop.fairyStream'] || 'Suối Tiên'
    };
  }

  /* Luôn trả về tên điểm dừng bằng tiếng Việt */
  function getStopsVi() {
    var T = (window.__MRB_TRANS || {})['vi'] || {};
    return {
      white: T['stop.whiteDune'] || 'Đồi Cát Trắng',
      red: T['stop.redDune'] || 'Đồi Cát Đỏ',
      fish: T['stop.fishVillage'] || 'Làng Chài Mũi Né',
      fairy: T['stop.fairyStream'] || 'Suối Tiên'
    };
  }

  function getSunriseOrder() { var s = getStops(); return [s.white, s.red, s.fish, s.fairy]; }
  function getSunsetOrder() { var s = getStops(); return [s.fairy, s.fish, s.white, s.red]; }

  var group = document.getElementById('bfItineraryGroup');
  var pillEls = [1, 2, 3, 4].map(function (n) { return document.getElementById('bfStop' + n + 'Label'); });
  var customizeBtn = document.getElementById('bfRouteCustomizeBtn');
  var dropWrap = document.getElementById('bfRouteDropdowns');
  var wrappers = [1, 2, 3, 4].map(function (n) { return document.getElementById('bfRouteStop' + n); });
  var dtHidden = document.getElementById('bfDatetime');

  if (!group || !dtHidden) return;

  var currentOrder = getSunriseOrder();
  /* Current selected values [stop1, stop2, stop3, stop4] */
  var values = currentOrder.slice();

  /* ── Custom select helpers ──────────────────────────── */
  function getVal(idx) { return values[idx]; }

  function closeAll() {
    wrappers.forEach(function (w) { if (w) w.classList.remove('open'); });
  }

  function buildList(idx) {
    var wrap = wrappers[idx];
    if (!wrap) return;
    var list = wrap.querySelector('.bf-custom-select-list');
    var valEl = wrap.querySelector('.bf-custom-select-val');

    list.innerHTML = '';
    /* Show ALL stops — use swap logic on selection */
    currentOrder.forEach(function (stop) {
      var li = document.createElement('li');
      li.textContent = stop;
      if (stop === values[idx]) li.classList.add('is-active');
      li.addEventListener('click', function () {
        /* If stop already used elsewhere, swap */
        var otherIdx = values.indexOf(stop);
        if (otherIdx !== -1 && otherIdx !== idx) {
          values[otherIdx] = values[idx];          // put current value into the other slot
          var otherWrap = wrappers[otherIdx];
          if (otherWrap) {
            otherWrap.querySelector('.bf-custom-select-val').textContent = values[otherIdx];
            if (pillEls[otherIdx]) pillEls[otherIdx].textContent = values[otherIdx];
          }
        }
        values[idx] = stop;
        valEl.textContent = stop;
        if (pillEls[idx]) pillEls[idx].textContent = stop;
        wrap.classList.remove('open');
        /* Refresh active state on all lists that are currently built */
        refreshActiveStates();
        broadcastRoute();
      });
      list.appendChild(li);
    });

    valEl.textContent = values[idx];
    if (pillEls[idx]) pillEls[idx].textContent = values[idx];
  }

  /* Update is-active classes on all already-rendered lists */
  function refreshActiveStates() {
    wrappers.forEach(function (wrap, i) {
      if (!wrap) return;
      var items = wrap.querySelectorAll('.bf-custom-select-list li');
      items.forEach(function (li) {
        li.classList.toggle('is-active', li.textContent === values[i]);
      });
    });
  }

  function rebuildAll() {
    for (var i = 0; i < 4; i++) buildList(i);
    broadcastRoute();
  }

  function broadcastRoute() {
    window.__bfCurrentRoute = values.join(' → ');

    // Luôn lưu thêm bản tiếng Việt để có dùng cho chatbot
    var sVi = getStopsVi();
    var stopsVi = [sVi.white, sVi.red, sVi.fish, sVi.fairy];
    var stopsAll = getStops();
    var stopsAllArr = [stopsAll.white, stopsAll.red, stopsAll.fish, stopsAll.fairy];
    var viValues = values.map(function (v) {
      var idx = stopsAllArr.indexOf(v);
      return idx !== -1 ? stopsVi[idx] : v;
    });
    window.__bfCurrentRouteVi = viValues.join(' → ');
  }

  /* ── Wire trigger buttons ───────────────────────────── */
  wrappers.forEach(function (wrap, idx) {
    if (!wrap) return;
    var trigger = wrap.querySelector('.bf-custom-select-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = wrap.classList.contains('open');
      closeAll();
      if (!wasOpen) {
        buildList(idx);           // refresh list before opening
        wrap.classList.add('open');
      }
    });
  });

  /* Close on outside click */
  document.addEventListener('click', closeAll);

  /* ── Customize toggle & OK button ────────────────────── */
  var okRow = document.getElementById('bfRouteOkRow');
  var okBtn = document.getElementById('bfRouteOkBtn');

  if (okBtn) {
    okBtn.addEventListener('click', function () {
      dropWrap.style.display = 'none';
      if (okRow) okRow.style.display = 'none';
      customizeBtn.classList.remove('open');
    });
  }

  if (customizeBtn) {
    customizeBtn.addEventListener('click', function () {
      var opening = dropWrap.style.display === 'none';
      dropWrap.style.display = opening ? '' : 'none';
      if (okRow) okRow.style.display = opening ? '' : 'none';
      customizeBtn.classList.toggle('open', opening);
      if (opening) rebuildAll();
    });
  }

  /* ── Apply route order ──────────────────────────────── */
  function applyOrder(order) {
    currentOrder = order.slice();
    values = order.slice();
    order.forEach(function (stop, i) { if (pillEls[i]) pillEls[i].textContent = stop; });
    broadcastRoute();
    /* Refresh open dropdowns if any */
    if (dropWrap.style.display !== 'none') rebuildAll();
  }

  /* ── Listen for time slot selection ────────────────── */
  dtHidden.addEventListener('input', function () {
    var val = dtHidden.value;
    if (!val) { group.style.display = 'none'; return; }
    var hour = parseInt((val.split('T')[1] || '').split(':')[0], 10);
    if (hour === 4 || hour === 13) {
      group.style.display = '';
      applyOrder(hour === 4 ? getSunriseOrder() : getSunsetOrder());
      dropWrap.style.display = 'none';
      if (customizeBtn) customizeBtn.classList.remove('open');
    } else {
      group.style.display = 'none';
    }
  });

  group.style.display = 'none';

  // Translate Route selections dynamically
  document.addEventListener('mrben-langchange', function () {
    if (!dtHidden) return;
    var isSunset = dtHidden.value && dtHidden.value.indexOf('T13:30') !== -1;
    var newOrder = isSunset ? getSunsetOrder() : getSunriseOrder();

    // Map old language strings to new language strings
    var mapping = {};
    for (var i = 0; i < 4; i++) {
      mapping[currentOrder[i]] = newOrder[i];
    }

    var newValues = values.map(function (v) { return mapping[v] || v; });

    currentOrder = newOrder;
    values = newValues;

    values.forEach(function (stop, i) { if (pillEls[i]) pillEls[i].textContent = stop; });
    broadcastRoute();
    if (dropWrap && dropWrap.style.display !== 'none') rebuildAll();
  });

})();
