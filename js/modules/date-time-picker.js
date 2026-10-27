/* ============================================================
   CUSTOM DATE & TIME PICKER
   ============================================================ */
(function () {
  'use strict';

  var dtWrap = document.querySelector('.bf-dt-wrap');
  var dtTrigger = document.getElementById('bfDtTrigger');
  var dtDisplay = document.getElementById('bfDtDisplay');
  var dtHidden = document.getElementById('bfDatetime');
  var dtPanel = document.getElementById('bfDtPanel');

  var calView = document.getElementById('bfCalView');
  var tpView = document.getElementById('bfTpView');
  var calTitle = document.getElementById('bfCalTitle');
  var calDays = document.getElementById('bfCalDays');
  /* DATE PICKER logic continues below */
  var calPrev = document.getElementById('bfCalPrev');
  var calNext = document.getElementById('bfCalNext');

  var tpDate = document.getElementById('bfTpDate');
  var tpBack = document.getElementById('bfTpBack');
  var tpHourDisp = document.getElementById('bfTpHourDisplay');
  var tpMinDisp = document.getElementById('bfTpMinDisplay');
  var hourDrum = document.getElementById('bfHourDrum');
  var minDrum = document.getElementById('bfMinDrum');
  var hourUp = document.getElementById('bfHourUp');
  var hourDown = document.getElementById('bfHourDown');
  var minUp = document.getElementById('bfMinUp');
  var minDown = document.getElementById('bfMinDown');
  var tpConfirm = document.getElementById('bfTpConfirm');

  /* ── Circular Clock Picker elements (Transfer mode) ── */
  var clockView = document.getElementById('bfClockView');
  var clockBack = document.getElementById('bfClockBack');
  var clockDate = document.getElementById('bfClockDate');
  var clockHourBlock = document.getElementById('bfClockHourBlock');
  var clockMinBlock = document.getElementById('bfClockMinBlock');
  var clockHint = document.getElementById('bfClockHint');
  var clockSvg = document.getElementById('bfClockSvg');
  var clockSelRing = document.getElementById('bfClockSelRing');
  var clockHand = document.getElementById('bfClockHand');
  var clockConfirm = document.getElementById('bfClockConfirm');

  var clockMode = 'hour'; // 'hour' | 'minute'
  var clockHour = 8;
  var clockMin = 0;
  var clockAutoSwitchTimer = null;
  var clockAutoConfirmTimer = null;

  function scheduleClockAutoConfirm() {
    clearTimeout(clockAutoConfirmTimer);
    clockAutoConfirmTimer = setTimeout(function () {
      confirmClockTime();
    }, 260);
  }

  /* ── Smooth View Transitions (Calendar <-> Clock <-> TimeSlot) ── */
  var isPickerTransitioning = false;
  var pickerTransitionTimer = null;
  var pickerHeightTimer = null;

  function transitionView(fromView, toView, direction, onMidpoint, onComplete) {
    if (!fromView || !toView) {
      if (fromView) fromView.style.display = 'none';
      if (toView) toView.style.display = '';
      if (typeof onMidpoint === 'function') onMidpoint();
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    isPickerTransitioning = true;
    clearTimeout(pickerTransitionTimer);
    clearTimeout(pickerHeightTimer);

    [calView, clockView, tpView].forEach(function (v) {
      if (v) v.classList.remove('bf-view-exit-left', 'bf-view-exit-right', 'bf-view-enter-left', 'bf-view-enter-right');
    });

    var isForward = (direction === 'forward');
    var exitClass = isForward ? 'bf-view-exit-left' : 'bf-view-exit-right';
    var enterClass = isForward ? 'bf-view-enter-right' : 'bf-view-enter-left';

    if (dtPanel) {
      dtPanel.style.height = dtPanel.offsetHeight + 'px';
    }

    fromView.classList.add(exitClass);

    pickerTransitionTimer = setTimeout(function () {
      fromView.style.display = 'none';
      fromView.classList.remove(exitClass);

      toView.style.display = '';
      if (typeof onMidpoint === 'function') onMidpoint();
      toView.classList.add(enterClass);

      if (dtPanel) {
        var targetH = toView.offsetHeight;
        dtPanel.style.height = targetH + 'px';
      }

      pickerHeightTimer = setTimeout(function () {
        toView.classList.remove(enterClass);
        if (dtPanel) dtPanel.style.height = '';
        isPickerTransitioning = false;
        if (typeof onComplete === 'function') onComplete();
      }, 300);
    }, 170);
  }

  function isSelectedDateToday() {
    if (!selDate) return false;
    var now = new Date();
    return selDate.getFullYear() === now.getFullYear() &&
      selDate.getMonth() === now.getMonth() &&
      selDate.getDate() === now.getDate();
  }

  function getNowTime() {
    var now = new Date();
    return {
      hour: now.getHours(),
      minute: now.getMinutes()
    };
  }

  function isClockHourDisabled(h) {
    if (!isSelectedDateToday()) return false;
    var nowT = getNowTime();
    if (h < nowT.hour) return true;
    if (h === nowT.hour && nowT.minute >= 55) return true;
    return false;
  }

  function isClockMinDisabled(m) {
    if (!isSelectedDateToday()) return false;
    var nowT = getNowTime();
    if (clockHour < nowT.hour) return true;
    if (clockHour === nowT.hour && m < nowT.minute) return true;
    return false;
  }

  function ensureValidClockTime() {
    if (!isSelectedDateToday()) return;
    var nowT = getNowTime();
    if (isClockHourDisabled(clockHour)) {
      clockHour = (nowT.minute >= 55) ? Math.min(23, nowT.hour + 1) : nowT.hour;
      var nextM = (nowT.minute >= 55) ? 0 : Math.ceil(nowT.minute / 5) * 5;
      if (nextM >= 60) {
        clockHour = Math.min(23, clockHour + 1);
        clockMin = 0;
      } else {
        clockMin = nextM;
      }
    } else if (clockHour === nowT.hour && isClockMinDisabled(clockMin)) {
      var nextMin = Math.ceil(nowT.minute / 5) * 5;
      if (nextMin >= 60) {
        clockHour = Math.min(23, clockHour + 1);
        clockMin = 0;
      } else {
        clockMin = nextMin;
      }
    }
    if (clockHourBlock) clockHourBlock.textContent = pad(clockHour);
    if (clockMinBlock) clockMinBlock.textContent = pad(clockMin);
  }

  function updateClockActiveState() {
    if (!clockSvg) return;
    var cx = 130, cy = 130;
    var activeX = 130, activeY = 38, activeR = 18;
    var foundActive = false;

    var numEls = clockSvg.querySelectorAll('.bf-clock-num');
    numEls.forEach(function (el) {
      var val = parseInt(el.getAttribute('data-clock-val'), 10);
      var isDisabled = el.classList.contains('bf-clock-disabled');
      var isActive = false;
      if (!isDisabled) {
        if (clockMode === 'hour') {
          isActive = (val === clockHour);
        } else {
          isActive = (val === clockMin);
        }
      }
      el.classList.toggle('bf-clock-active', isActive);
      if (isActive) {
        activeX = parseFloat(el.getAttribute('x'));
        activeY = parseFloat(el.getAttribute('y'));
        activeR = el.classList.contains('bf-clock-num--inner') ? 15 : 17;
        foundActive = true;
      }
    });

    if (clockHand && clockSelRing) {
      if (foundActive) {
        clockHand.setAttribute('x1', cx);
        clockHand.setAttribute('y1', cy);
        clockHand.setAttribute('x2', activeX.toFixed(1));
        clockHand.setAttribute('y2', activeY.toFixed(1));
        clockHand.style.display = '';
        clockSelRing.setAttribute('cx', activeX.toFixed(1));
        clockSelRing.setAttribute('cy', activeY.toFixed(1));
        clockSelRing.setAttribute('r', activeR);
        clockSelRing.style.display = '';
      } else {
        clockHand.style.display = 'none';
        clockSelRing.style.display = 'none';
      }
    }

    if (clockConfirm) {
      var isInvalidTime = false;
      if (isSelectedDateToday()) {
        var nowT = getNowTime();
        if (clockHour < nowT.hour || (clockHour === nowT.hour && clockMin < nowT.minute)) {
          isInvalidTime = true;
        }
      }
      clockConfirm.disabled = isInvalidTime;
    }
  }

  function renderClockFace() {
    if (!clockSvg) return;
    ensureValidClockTime();
    var oldNums = clockSvg.querySelectorAll('.bf-clock-num');
    oldNums.forEach(function (n) { n.remove(); });

    var cx = 130, cy = 130;

    if (clockMode === 'hour') {
      var R_OUT = 92;
      var R_IN = 58;
      for (var i = 0; i < 12; i++) {
        var rad = (i * 30 - 90) * Math.PI / 180;
        var hOut = (i === 0) ? 12 : i;
        var xOut = cx + R_OUT * Math.cos(rad);
        var yOut = cy + R_OUT * Math.sin(rad);

        var isOutDisabled = isClockHourDisabled(hOut);
        var txtOut = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txtOut.setAttribute('class', 'bf-clock-num' + (isOutDisabled ? ' bf-clock-disabled' : ''));
        txtOut.setAttribute('data-clock-val', hOut);
        if (isOutDisabled) txtOut.setAttribute('data-disabled', 'true');
        txtOut.setAttribute('x', xOut.toFixed(1));
        txtOut.setAttribute('y', yOut.toFixed(1));
        txtOut.setAttribute('text-anchor', 'middle');
        txtOut.setAttribute('dominant-baseline', 'central');
        txtOut.textContent = hOut;
        (function (hourVal, disabled) {
          txtOut.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!disabled) selectClockHour(hourVal);
          });
        })(hOut, isOutDisabled);
        clockSvg.appendChild(txtOut);

        var hIn = (i === 0) ? 0 : i + 12;
        var hInLabel = (i === 0) ? '00' : String(hIn);
        var isInDisabled = isClockHourDisabled(hIn);
        var xIn = cx + R_IN * Math.cos(rad);
        var yIn = cy + R_IN * Math.sin(rad);

        var txtIn = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txtIn.setAttribute('class', 'bf-clock-num bf-clock-num--inner' + (isInDisabled ? ' bf-clock-disabled' : ''));
        txtIn.setAttribute('data-clock-val', hIn);
        if (isInDisabled) txtIn.setAttribute('data-disabled', 'true');
        txtIn.setAttribute('x', xIn.toFixed(1));
        txtIn.setAttribute('y', yIn.toFixed(1));
        txtIn.setAttribute('text-anchor', 'middle');
        txtIn.setAttribute('dominant-baseline', 'central');
        txtIn.setAttribute('style', 'font-size:11px;' + (isInDisabled ? '' : 'opacity:0.85;'));
        txtIn.textContent = hInLabel;
        (function (hourVal, disabled) {
          txtIn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!disabled) selectClockHour(hourVal);
          });
        })(hIn, isInDisabled);
        clockSvg.appendChild(txtIn);
      }
    } else {
      var R_MIN = 92;
      for (var j = 0; j < 12; j++) {
        var mRad = (j * 30 - 90) * Math.PI / 180;
        var mVal = j * 5;
        var mLabel = pad(mVal);
        var xM = cx + R_MIN * Math.cos(mRad);
        var yM = cy + R_MIN * Math.sin(mRad);

        var isMDisabled = isClockMinDisabled(mVal);
        var txtM = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txtM.setAttribute('class', 'bf-clock-num' + (isMDisabled ? ' bf-clock-disabled' : ''));
        txtM.setAttribute('data-clock-val', mVal);
        if (isMDisabled) txtM.setAttribute('data-disabled', 'true');
        txtM.setAttribute('x', xM.toFixed(1));
        txtM.setAttribute('y', yM.toFixed(1));
        txtM.setAttribute('text-anchor', 'middle');
        txtM.setAttribute('dominant-baseline', 'central');
        txtM.textContent = mLabel;
        (function (minVal, disabled) {
          txtM.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!disabled) selectClockMin(minVal);
          });
        })(mVal, isMDisabled);
        clockSvg.appendChild(txtM);
      }
    }

    updateClockActiveState();
  }

  function setClockMode(mode) {
    clearTimeout(clockAutoSwitchTimer);
    clearTimeout(clockAutoConfirmTimer);
    clockMode = mode;
    ensureValidClockTime();
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};
    if (mode === 'hour') {
      if (clockHourBlock) clockHourBlock.classList.add('bf-tp-active');
      if (clockMinBlock) clockMinBlock.classList.remove('bf-tp-active');
      if (clockHint) clockHint.textContent = T['booking.clockSelectHour'] || 'CHỌN GIỜ';
    } else {
      if (clockHourBlock) clockHourBlock.classList.remove('bf-tp-active');
      if (clockMinBlock) clockMinBlock.classList.add('bf-tp-active');
      if (clockHint) clockHint.textContent = T['booking.clockSelectMin'] || 'CHỌN PHÚT';
    }
    renderClockFace();
  }

  function selectClockHour(h) {
    if (isClockHourDisabled(h)) return;
    clockHour = h;
    ensureValidClockTime();
    if (clockHourBlock) clockHourBlock.textContent = pad(clockHour);
    updateClockActiveState();
    clearTimeout(clockAutoSwitchTimer);
    clockAutoSwitchTimer = setTimeout(function () {
      setClockMode('minute');
    }, 280);
  }

  function selectClockMin(m) {
    if (isClockMinDisabled(m)) return;
    clockMin = m;
    if (clockMinBlock) clockMinBlock.textContent = pad(clockMin);
    updateClockActiveState();
    scheduleClockAutoConfirm();
  }

  function confirmClockTime() {
    if (!selDate) return;
    if (isSelectedDateToday()) {
      var nowT = getNowTime();
      if (clockHour < nowT.hour || (clockHour === nowT.hour && clockMin < nowT.minute)) {
        return;
      }
    }
    selHour = clockHour;
    selMin = clockMin;
    var y = selDate.getFullYear(), mo = selDate.getMonth() + 1, d = selDate.getDate();
    var iso = y + '-' + pad(mo) + '-' + pad(d) + 'T' + pad(selHour) + ':' + pad(selMin);
    var disp = pad(d) + '/' + pad(mo) + '/' + y + ' | ' + pad(selHour) + ':' + pad(selMin);
    dtHidden.value = iso;
    dtDisplay.textContent = disp;
    dtTrigger.classList.add('has-value');
    closePicker();
    dtHidden.dispatchEvent(new Event('input'));

    // Lưu vào trạng thái độc lập của Xe Đưa Đón
    modeStates.transfer.selDate = new Date(selDate.getTime());
    modeStates.transfer.selHour = selHour;
    modeStates.transfer.selMin = selMin;
    modeStates.transfer.clockHour = clockHour;
    modeStates.transfer.clockMin = clockMin;
    modeStates.transfer.iso = iso;
    modeStates.transfer.display = disp;
  }

  if (clockHourBlock) clockHourBlock.addEventListener('click', function () {
    setClockMode('hour');
    centerPickerInView(clockView);
  });
  if (clockMinBlock) clockMinBlock.addEventListener('click', function () {
    setClockMode('minute');
    centerPickerInView(clockView);
  });
  if (clockBack) {
    clockBack.addEventListener('click', function () {
      if (isPickerTransitioning) return;
      clearTimeout(clockAutoSwitchTimer);
      clearTimeout(clockAutoConfirmTimer);
      transitionView(clockView, calView, 'backward', function () {
        renderCalendar();
      }, function () {
        centerPickerInView(calView);
      });
    });
  }

  /* ── Draggable Clock Hands & Pointer Interactions ── */
  var isClockDragging = false;

  function handleClockPointer(e, isRelease) {
    if (!clockSvg) return;
    var rect = clockSvg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var scale = 260 / rect.width;
    var clientX = e.clientX;
    var clientY = e.clientY;
    if (clientX === undefined && e.touches && e.touches.length) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    if (clientX === undefined) return;

    var clickX = (clientX - rect.left) * scale;
    var clickY = (clientY - rect.top) * scale;
    var dx = clickX - 130;
    var dy = clickY - 130;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 15) return;

    var angleRad = Math.atan2(dy, dx) + Math.PI / 2;
    if (angleRad < 0) angleRad += 2 * Math.PI;
    var deg = angleRad * 180 / Math.PI;

    if (clockMode === 'hour') {
      var step = Math.round(deg / 30) % 12;
      var isInner = (dist < 76);
      var hour = isInner ? (step === 0 ? 0 : step + 12) : (step === 0 ? 12 : step);
      if (isClockHourDisabled(hour)) {
        return;
      }
      if (clockHour !== hour || (clockHand && clockHand.style.display === 'none')) {
        clockHour = hour;
        if (clockHourBlock) clockHourBlock.textContent = pad(hour);
        updateClockActiveState();
      }
      if (isRelease) {
        clearTimeout(clockAutoSwitchTimer);
        clockAutoSwitchTimer = setTimeout(function () {
          setClockMode('minute');
        }, 280);
      }
    } else {
      var stepMin = Math.round(deg / 30) % 12;
      var min = stepMin * 5;
      if (isClockMinDisabled(min)) {
        return;
      }
      if (clockMin !== min || (clockHand && clockHand.style.display === 'none')) {
        clockMin = min;
        if (clockMinBlock) clockMinBlock.textContent = pad(min);
        updateClockActiveState();
      }
      if (isRelease) {
        scheduleClockAutoConfirm();
      }
    }
  }

  if (clockSvg) {
    clockSvg.addEventListener('pointerdown', function (e) {
      isClockDragging = true;
      clockSvg.classList.add('is-dragging');
      try {
        clockSvg.setPointerCapture(e.pointerId);
      } catch (err) { }
      clearTimeout(clockAutoSwitchTimer);
      clearTimeout(clockAutoConfirmTimer);
      handleClockPointer(e, false);
    });

    clockSvg.addEventListener('pointermove', function (e) {
      if (!isClockDragging) return;
      handleClockPointer(e, false);
    });

    function endClockDrag(e) {
      if (!isClockDragging) return;
      isClockDragging = false;
      clockSvg.classList.remove('is-dragging');
      try {
        if (clockSvg.hasPointerCapture(e.pointerId)) {
          clockSvg.releasePointerCapture(e.pointerId);
        }
      } catch (err) { }
      handleClockPointer(e, true);
    }

    clockSvg.addEventListener('pointerup', endClockDrag);
    clockSvg.addEventListener('pointercancel', endClockDrag);
  }

  if (!dtWrap) return;

  var todayDate = new Date(); todayDate.setHours(0, 0, 0, 0);
  var curYear = todayDate.getFullYear();
  var curMonth = todayDate.getMonth();
  var selDate = null;
  var selHour = null;
  var selMin = null;
  var MINS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  /* ── Quản lý trạng thái Date & Time độc lập tuyệt đối giữa Tour Jeep và Xe Đưa Đón ── */
  var modeStates = {
    jeep: {
      selDate: null,
      selHour: null,
      selMin: null,
      iso: '',
      display: ''
    },
    transfer: {
      selDate: null,
      selHour: null,
      selMin: null,
      clockHour: 8,
      clockMin: 0,
      iso: '',
      display: ''
    }
  };

  /* Returns month names array for current language */
  function getMonths() {
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var TRANS = window.__MRB_TRANS || {};
    var key = TRANS[lang] && TRANS[lang]['cal.months'];
    return key ? key.split(',') : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ── Calendar ── */
  /* Returns minutes since midnight for the current local time */
  function nowMinutes() {
    var now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }
  var SUNRISE_MINS = 4 * 60 + 30;   // 04:30
  var SUNSET_MINS = 13 * 60 + 30;  // 13:30

  function renderCalendar() {
    calTitle.textContent = getMonths()[curMonth] + ' ' + curYear;
    calDays.innerHTML = '';
    var firstDay = new Date(curYear, curMonth, 1).getDay();
    var daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
    var daysInPrev = new Date(curYear, curMonth, 0).getDate();
    var nm = nowMinutes();

    for (var i = 0; i < firstDay; i++) {
      var el = document.createElement('div');
      el.className = 'bf-cal-day other-month disabled';
      el.textContent = daysInPrev - firstDay + 1 + i;
      calDays.appendChild(el);
    }
    for (var day = 1; day <= daysInMonth; day++) {
      var dt = new Date(curYear, curMonth, day);
      var el = document.createElement('div');
      el.className = 'bf-cal-day';
      el.textContent = day;

      var isPast = dt < todayDate;                    // before today
      var isToday = dt.getTime() === todayDate.getTime();
      /* Today disabled only when slots have passed */
      var isTransferMode = (window.__bookingMode === 'transfer');
      var todayFullyPassed = isToday && (isTransferMode ? nm >= 23 * 60 + 55 : nm >= SUNSET_MINS);

      if (isPast || todayFullyPassed) el.classList.add('disabled');
      if (isToday) el.classList.add('today');
      if (selDate && dt.getTime() === selDate.getTime()) el.classList.add('selected');
      if (!el.classList.contains('disabled')) {
        (function (date, dayEl) {
          dayEl.addEventListener('click', function () {
            pickDate(date, dayEl);
          });
        })(dt, el);
      }
      calDays.appendChild(el);
    }
    var total = firstDay + daysInMonth;
    var rem = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (var j = 1; j <= rem; j++) {
      var el2 = document.createElement('div');
      el2.className = 'bf-cal-day other-month disabled';
      el2.textContent = j;
      calDays.appendChild(el2);
    }
  }

  /* ── Center Date/Clock Picker in Viewport ── */
  var centerPickerTimer = null;
  function centerPickerInView(viewElement) {
    clearTimeout(centerPickerTimer);
    var body = document.querySelector('.booking-body');
    if (!body) return;
    var target = viewElement || document.getElementById('bfDtPanel') || dtWrap;
    if (!target) return;

    centerPickerTimer = setTimeout(function () {
      if (!dtWrap || !dtWrap.classList.contains('open')) return;

      var bodyRect = body.getBoundingClientRect();
      var targetRect = target.getBoundingClientRect();
      if (!targetRect.height || !bodyRect.height) return;

      // Center target vertically within the visible booking-body area
      var bodyCenter = bodyRect.top + bodyRect.height / 2;
      var targetCenter = targetRect.top + targetRect.height / 2;
      var diff = targetCenter - bodyCenter;

      // Ensure top of target doesn't scroll beneath sticky booking header
      var minAllowedTop = bodyRect.top + 8;
      if (targetRect.top - diff < minAllowedTop) {
        diff = targetRect.top - minAllowedTop;
      }

      // If target fits within visible body, ensure bottom isn't clipped by bottom edge
      var maxAllowedBottom = bodyRect.bottom - 12;
      if (targetRect.height <= (bodyRect.height - 20) && (targetRect.bottom - diff > maxAllowedBottom)) {
        diff = targetRect.bottom - maxAllowedBottom;
      }

      // Re-verify top doesn't hide under header
      if (targetRect.top - diff < minAllowedTop) {
        diff = targetRect.top - minAllowedTop;
      }

      if (Math.abs(diff) > 2) {
        body.scrollBy({
          top: diff,
          behavior: 'smooth'
        });
      }
    }, 80);
  }

  function pickDate(date, clickedDayEl) {
    if (isPickerTransitioning) return;
    selDate = date;

    var isMobile = (window.innerWidth <= 768) || ('ontouchstart' in window && window.innerWidth <= 1024);

    if (clickedDayEl) {
      calDays.querySelectorAll('.bf-cal-day.selected').forEach(function (d) {
        d.classList.remove('selected', 'bf-day-pulse');
      });
      clickedDayEl.classList.add('selected');
      if (!isMobile) {
        clickedDayEl.classList.add('bf-day-pulse');
      }
    }

    var delayBeforeTransition = (clickedDayEl && !isMobile) ? 130 : 0;

    setTimeout(function () {
      if (window.__bookingMode === 'transfer') {
        if (tpView) tpView.style.display = 'none';
        transitionView(calView, clockView, 'forward', function () {
          if (clockDate) clockDate.textContent = date.getDate() + ' ' + getMonths()[date.getMonth()];
          ensureValidClockTime();
          setClockMode('hour');
          if (clockHourBlock) clockHourBlock.textContent = pad(clockHour);
          if (clockMinBlock) clockMinBlock.textContent = pad(clockMin);
          renderClockFace();

          var clockContainer = document.getElementById('bfClockContainer');
          if (clockContainer) {
            clockContainer.classList.remove('bf-clock-dial-bloom');
            void clockContainer.offsetWidth;
            clockContainer.classList.add('bf-clock-dial-bloom');
          }
          var tpDisplay = clockView ? clockView.querySelector('.bf-tp-display') : null;
          if (tpDisplay) {
            tpDisplay.classList.remove('bf-clock-header-enter');
            void tpDisplay.offsetWidth;
            tpDisplay.classList.add('bf-clock-header-enter');
          }
        }, function () {
          centerPickerInView(clockView);
        });
        return;
      }

      if (clockView) clockView.style.display = 'none';
      transitionView(calView, tpView, 'forward', function () {
        tpDate.textContent = date.getDate() + ' ' + getMonths()[date.getMonth()];
        // Reset slot selection UI
        [sunriseBtn, sunsetBtn].forEach(function (b) { b && b.classList.remove('selected'); });
        // Re-highlight the previously selected slot
        if (selHour === 4 && selMin === 30) { sunriseBtn && sunriseBtn.classList.add('selected'); }
        if (selHour === 13 && selMin === 30) { sunsetBtn && sunsetBtn.classList.add('selected'); }

        /* If today is selected, disable slots whose time has already passed */
        var isToday = date.getTime() === todayDate.getTime();
        var nm = isToday ? nowMinutes() : -1;
        if (sunriseBtn) sunriseBtn.disabled = isToday && nm >= SUNRISE_MINS;
        if (sunsetBtn) sunsetBtn.disabled = isToday && nm >= SUNSET_MINS;
      }, function () {
        centerPickerInView(tpView);
      });
    }, delayBeforeTransition);
  }

  calPrev.addEventListener('click', function () {
    if (--curMonth < 0) { curMonth = 11; curYear--; }
    renderCalendar();
    centerPickerInView(calView);
  });
  calNext.addEventListener('click', function () {
    if (++curMonth > 11) { curMonth = 0; curYear++; }
    renderCalendar();
    centerPickerInView(calView);
  });

  tpBack.addEventListener('click', function () {
    if (isPickerTransitioning) return;
    transitionView(tpView, calView, 'backward', function () {
      renderCalendar();
    }, function () {
      centerPickerInView(calView);
    });
  });

  /* ── Time slot buttons ── */
  var sunriseBtn = document.getElementById('bfTsSunrise');
  var sunsetBtn = document.getElementById('bfTsSunset');

  function confirmSlot(hour, min) {
    selHour = hour; selMin = min;
    if (!selDate) return;
    var y = selDate.getFullYear(), mo = selDate.getMonth() + 1, d = selDate.getDate();
    var iso = y + '-' + pad(mo) + '-' + pad(d) + 'T' + pad(hour) + ':' + pad(min);
    dtHidden.value = iso;
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};
    var label = hour === 4
      ? (T['booking.sunrise'] || 'Bình Minh')
      : (T['booking.sunset'] || 'Hoàng Hôn');
    var disp = pad(d) + '/' + pad(mo) + '/' + y + ' | ' + label + ' (' + pad(hour) + ':' + pad(min) + ')';
    dtDisplay.textContent = disp;
    dtTrigger.classList.add('has-value');
    closePicker();
    dtHidden.dispatchEvent(new Event('input'));

    // Lưu vào trạng thái độc lập của Tour Xe Jeep
    modeStates.jeep.selDate = new Date(selDate.getTime());
    modeStates.jeep.selHour = hour;
    modeStates.jeep.selMin = min;
    modeStates.jeep.iso = iso;
    modeStates.jeep.display = disp;
  }

  if (sunriseBtn) sunriseBtn.addEventListener('click', function () {
    [sunriseBtn, sunsetBtn].forEach(function (b) { b.classList.remove('selected'); });
    sunriseBtn.classList.add('selected');
    confirmSlot(4, 30);
  });
  if (sunsetBtn) sunsetBtn.addEventListener('click', function () {
    [sunriseBtn, sunsetBtn].forEach(function (b) { b.classList.remove('selected'); });
    sunsetBtn.classList.add('selected');
    confirmSlot(13, 30);
  });


  /* ── Open / Close ── */
  function openPicker() {
    dtWrap.classList.add('open');
    var body = document.querySelector('.booking-body');
    if (body) body.classList.add('picker-open');
    isPickerTransitioning = false;
    clearTimeout(pickerTransitionTimer);
    clearTimeout(pickerHeightTimer);
    if (dtPanel) dtPanel.style.height = '';
    [calView, clockView, tpView].forEach(function (v) {
      if (v) v.classList.remove('bf-view-exit-left', 'bf-view-exit-right', 'bf-view-enter-left', 'bf-view-enter-right');
    });
    calView.style.display = '';
    tpView.style.display = 'none';
    if (clockView) clockView.style.display = 'none';
    renderCalendar();
    centerPickerInView(calView);
  }
  function closePicker() {
    clearTimeout(centerPickerTimer);
    clearTimeout(clockAutoSwitchTimer);
    clearTimeout(clockAutoConfirmTimer);
    clearTimeout(pickerTransitionTimer);
    clearTimeout(pickerHeightTimer);
    isPickerTransitioning = false;
    if (dtPanel) dtPanel.style.height = '';
    [calView, clockView, tpView].forEach(function (v) {
      if (v) v.classList.remove('bf-view-exit-left', 'bf-view-exit-right', 'bf-view-enter-left', 'bf-view-enter-right');
    });
    dtWrap.classList.remove('open');
    var body = document.querySelector('.booking-body');
    if (body) body.classList.remove('picker-open');
  }

  dtTrigger.addEventListener('click', function (e) {
    e.stopPropagation();
    dtWrap.classList.contains('open') ? closePicker() : openPicker();
  });
  document.addEventListener('click', function (e) {
    if (dtWrap && !dtWrap.contains(e.target)) closePicker();
  });

  window.addEventListener('resize', function () {
    if (dtWrap && dtWrap.classList.contains('open')) {
      var activeView = (clockView && clockView.style.display !== 'none') ? clockView :
        (tpView && tpView.style.display !== 'none') ? tpView : calView;
      centerPickerInView(activeView);
    }
  });

  var bookingOverlay = document.getElementById('bookingOverlay');
  if (bookingOverlay) {
    bookingOverlay.addEventListener('click', function (e) {
      if (e.target === bookingOverlay) closePicker();
    });
  }
  var bookingClose = document.getElementById('bookingClose');
  if (bookingClose) {
    bookingClose.addEventListener('click', function () {
      closePicker();
    });
  }

  /* ── Reset: show placeholder (no pre-filled date) ── */
  function setDefault() {
    closePicker();
    selDate = null;
    selHour = null; selMin = null;   /* no slot pre-selected */
    curYear = todayDate.getFullYear(); curMonth = todayDate.getMonth();
    dtHidden.value = '';
    dtTrigger.classList.remove('has-value');
    /* Clear any lingering slot highlights */
    [sunriseBtn, sunsetBtn].forEach(function (b) { b && b.classList.remove('selected'); });
    if (clockHourBlock) clockHourBlock.textContent = '--';
    if (clockMinBlock) clockMinBlock.textContent = '--';
    if (clockSelRing) clockSelRing.style.display = 'none';
    if (clockHand) clockHand.style.display = 'none';
    clockMode = 'hour';
    /* Restore i18n placeholder text */
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var TRANS = window.__MRB_TRANS || {};
    var placeholder = (TRANS[lang] && TRANS[lang]['booking.datePlaceholder'])
      || 'Chọn ngày & giờ khởi hành';
    dtDisplay.textContent = placeholder;
  }

  /* ── Đồng bộ Date & Time theo chế độ dịch vụ độc lập (Jeep vs Transfer) ── */
  function syncPickerMode(newMode) {
    newMode = newMode || window.__bookingMode || 'jeep';
    closePicker();
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var TRANS = window.__MRB_TRANS || {};
    var placeholder = (TRANS[lang] && TRANS[lang]['booking.datePlaceholder'])
      || 'Chọn ngày & giờ khởi hành';

    if (newMode === 'transfer') {
      var st = modeStates.transfer;
      selDate = st.selDate ? new Date(st.selDate.getTime()) : null;
      selHour = st.selHour;
      selMin = st.selMin;
      clockHour = (typeof st.clockHour === 'number') ? st.clockHour : 8;
      clockMin = (typeof st.clockMin === 'number') ? st.clockMin : 0;
      dtHidden.value = st.iso || '';
      if (st.iso && st.display) {
        dtDisplay.textContent = st.display;
        dtTrigger.classList.add('has-value');
      } else {
        dtDisplay.textContent = placeholder;
        dtTrigger.classList.remove('has-value');
      }
      if (clockHourBlock) clockHourBlock.textContent = (st.iso && selHour !== null) ? pad(clockHour) : '--';
      if (clockMinBlock) clockMinBlock.textContent = (st.iso && selMin !== null) ? pad(clockMin) : '--';
      [sunriseBtn, sunsetBtn].forEach(function (b) { b && b.classList.remove('selected'); });
    } else {
      // Chế độ Tour Jeep: Tuyệt đối chỉ nhận khung giờ Bình Minh (04:30) hoặc Hoàng Hôn (13:30)
      var sj = modeStates.jeep;
      var isJeepValid = sj.iso && ((sj.selHour === 4 && sj.selMin === 30) || (sj.selHour === 13 && sj.selMin === 30));
      if (isJeepValid) {
        selDate = sj.selDate ? new Date(sj.selDate.getTime()) : null;
        selHour = sj.selHour;
        selMin = sj.selMin;
        dtHidden.value = sj.iso;
        dtDisplay.textContent = sj.display;
        dtTrigger.classList.add('has-value');
        if (sunriseBtn) sunriseBtn.classList.toggle('selected', selHour === 4 && selMin === 30);
        if (sunsetBtn) sunsetBtn.classList.toggle('selected', selHour === 13 && selMin === 30);
      } else {
        // Nếu chưa chọn hoặc dữ liệu không hợp lệ với Jeep, reset sạch sẽ
        selDate = null;
        selHour = null;
        selMin = null;
        dtHidden.value = '';
        dtDisplay.textContent = placeholder;
        dtTrigger.classList.remove('has-value');
        [sunriseBtn, sunsetBtn].forEach(function (b) { b && b.classList.remove('selected'); });
      }
      if (clockHourBlock) clockHourBlock.textContent = '--';
      if (clockMinBlock) clockMinBlock.textContent = '--';
    }

    if (calView) calView.style.display = '';
    if (tpView) tpView.style.display = 'none';
    if (clockView) clockView.style.display = 'none';

    // Bắn sự kiện input để đồng bộ lộ trình (route) và tính giá
    dtHidden.dispatchEvent(new Event('input'));
  }

  function resetPickerModeStates() {
    modeStates.jeep = { selDate: null, selHour: null, selMin: null, iso: '', display: '' };
    modeStates.transfer = { selDate: null, selHour: null, selMin: null, clockHour: 8, clockMin: 0, iso: '', display: '' };
    setDefault();
  }

  window.__syncPickerMode = syncPickerMode;
  window.__resetPickerModeStates = resetPickerModeStates;

  setDefault();
  // Khi mở modal đặt xe/tour, đồng bộ đúng chế độ hiện tại
  document.addEventListener('mrben-booking-open', function () {
    syncPickerMode(window.__bookingMode || 'jeep');
  });

  // Translate Date & Time label dynamically
  document.addEventListener('mrben-langchange', function () {
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var TRANS = window.__MRB_TRANS || {};
    var placeholder = (TRANS[lang] && TRANS[lang]['booking.datePlaceholder']) || 'Chọn ngày & giờ khởi hành';

    // Cập nhật lại display lưu trữ của Jeep khi đổi ngôn ngữ
    if (modeStates.jeep.selDate && modeStates.jeep.iso && (modeStates.jeep.selHour === 4 || modeStates.jeep.selHour === 13)) {
      var T = (window.__MRB_TRANS || {})[lang] || {};
      var dj = modeStates.jeep.selDate.getDate();
      var moj = modeStates.jeep.selDate.getMonth() + 1;
      var yj = modeStates.jeep.selDate.getFullYear();
      var labelj = modeStates.jeep.selHour === 4
        ? (T['booking.sunrise'] || 'Bình Minh')
        : (T['booking.sunset'] || 'Hoàng Hôn');
      modeStates.jeep.display = pad(dj) + '/' + pad(moj) + '/' + yj + ' | ' + labelj + ' (' + pad(modeStates.jeep.selHour) + ':' + pad(modeStates.jeep.selMin) + ')';
    }

    if (selDate && selHour !== null && selMin !== null) {
      if (window.__bookingMode === 'transfer') {
        var y = selDate.getFullYear(), mo = selDate.getMonth() + 1, d = selDate.getDate();
        dtDisplay.textContent = pad(d) + '/' + pad(mo) + '/' + y + ' | ' + pad(selHour) + ':' + pad(selMin);
      } else if (selHour === 4 || selHour === 13) {
        confirmSlot(selHour, selMin);
      } else {
        dtDisplay.textContent = placeholder;
      }
    } else {
      dtDisplay.textContent = placeholder;
    }
    if (clockHint) {
      clockHint.textContent = clockMode === 'hour'
        ? (TRANS[lang] && TRANS[lang]['booking.clockSelectHour'] || 'CHỌN GIỜ')
        : (TRANS[lang] && TRANS[lang]['booking.clockSelectMin'] || 'CHỌN PHÚT');
    }
  });

})();
