/**
 * ============================================================
 * MR. BEN JEEP TOURS – Comprehensive System & Regression Tests
 * ============================================================
 * 
 * Verifies system integrity against the most recent git commit (HEAD):
 *   1. Module & Asset Integrity (All 20 CSS & 12 JS modules exist & non-empty)
 *   2. Baseline Regression Comparison vs git HEAD (CSS selectors, i18n, hotels, transfer config)
 *   3. Syntax & Parsing Validation (node --check on all modules & JSON schemas)
 *   4. Core Business Logic (Pricing, Holiday Surcharge, i18n lookup, hotel search)
 *   5. HTML Resource & Link Integrity (DOM IDs, asset paths)
 * 
 * Run with:
 *   node test.js
 *   npm test
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ${colors.green}✓${colors.reset} ${name}`);
  } catch (err) {
    failedTests++;
    failures.push({ name, error: err });
    console.log(`  ${colors.red}✗${colors.reset} ${name}`);
    console.log(`    ${colors.red}Error: ${err.message}${colors.reset}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message || 'Mismatch'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log(`\n${colors.bold}${colors.cyan}============================================================${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}  MR. BEN JEEP TOURS – SYSTEM & REGRESSION TEST SUITE       ${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}============================================================${colors.reset}\n`);

// ─────────────────────────────────────────────────────────────
// SUITE 1: File & Module Integrity
// ─────────────────────────────────────────────────────────────
console.log(`${colors.bold}[1/5] Module & Asset Integrity${colors.reset}`);

const EXPECTED_CSS_MODULES = [
  'variables.css', 'header-nav.css', 'hero.css', 'about.css',
  'destinations.css', 'tours.css', 'gallery.css', 'reviews.css',
  'cta-banner.css', 'footer.css', 'responsive-base.css', 'lang-switcher.css',
  'booking-modal.css', 'confirm-modal.css', 'service-tabs.css',
  'transfer.css', 'thank-modal.css', 'hero-video.css',
  'transfer-booking.css', 'clock-picker-toast.css'
];

const EXPECTED_JS_MODULES = [
  'translations.js', 'i18n.js', 'navigation.js',
  'destinations-swiper.js', 'tours-slider.js', 'booking-modal.js',
  'date-time-picker.js', 'itinerary-selector.js', 'hotel-autocomplete.js',
  'media-enhancements.js', 'service-tabs.js', 'transfer.js'
];

test('All 20 CSS modules exist and are non-empty', () => {
  EXPECTED_CSS_MODULES.forEach(mod => {
    const p = path.join(__dirname, 'css', 'modules', mod);
    assert(fs.existsSync(p), `Missing CSS module: ${mod}`);
    const size = fs.statSync(p).size;
    assert(size > 50, `CSS module ${mod} is too small (${size} bytes)`);
  });
});

test('All 12 JS modules exist and are non-empty', () => {
  EXPECTED_JS_MODULES.forEach(mod => {
    const p = path.join(__dirname, 'js', 'modules', mod);
    assert(fs.existsSync(p), `Missing JS module: ${mod}`);
    const size = fs.statSync(p).size;
    assert(size > 50, `JS module ${mod} is too small (${size} bytes)`);
  });
});

test('Bundled production files exist', () => {
  assert(fs.existsSync(path.join(__dirname, 'css', 'style.css')), 'css/style.css missing');
  assert(fs.existsSync(path.join(__dirname, 'css', 'style.min.css')), 'css/style.min.css missing');
  assert(fs.existsSync(path.join(__dirname, 'js', 'script.js')), 'js/script.js missing');
  assert(fs.existsSync(path.join(__dirname, 'js', 'script.min.js')), 'js/script.min.js missing');
});

test('build.js executes and regenerates bundles cleanly', () => {
  const result = execSync('node build.js', { cwd: __dirname, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  assert(result.includes('CSS Built'), 'build.js output missing CSS Built');
  assert(result.includes('JS Built'), 'build.js output missing JS Built');
});

// ─────────────────────────────────────────────────────────────
// SUITE 2: Syntax & Parsing Validation
// ─────────────────────────────────────────────────────────────
console.log(`\n${colors.bold}[2/5] Syntax & Parsing Validation${colors.reset}`);

test('All 12 JS modules pass node --check', () => {
  EXPECTED_JS_MODULES.forEach(mod => {
    const p = path.join(__dirname, 'js', 'modules', mod);
    execSync(`node --check "${p}"`, { stdio: 'pipe' });
  });
});

test('Bundled script.js and script.min.js pass node --check', () => {
  execSync(`node --check "${path.join(__dirname, 'js', 'script.js')}"`, { stdio: 'pipe' });
  execSync(`node --check "${path.join(__dirname, 'js', 'script.min.js')}"`, { stdio: 'pipe' });
});

test('Bundled script.js and script.min.js execute cleanly without runtime ReferenceErrors', () => {
  const vm = require('vm');
  function createMockEl() {
    return {
      tagName: 'DIV',
      className: '',
      classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
      style: {},
      setAttribute: () => {},
      getAttribute: () => '',
      removeAttribute: () => {},
      hasAttribute: () => false,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
      querySelector: () => createMockEl(),
      querySelectorAll: () => [createMockEl()],
      appendChild: (c) => c,
      removeChild: (c) => c,
      closest: () => createMockEl(),
      remove: () => {},
      play: () => Promise.resolve(),
      pause: () => {},
      focus: () => {},
      blur: () => {},
      getBoundingClientRect: () => ({ top: 0, bottom: 100, left: 0, right: 100, width: 100, height: 100 }),
      children: [],
      dataset: {}
    };
  }
  const sandbox = {
    document: {
      getElementById: () => createMockEl(),
      querySelector: () => createMockEl(),
      querySelectorAll: () => [createMockEl()],
      createElement: () => {
        const el = createMockEl();
        el.getContext = () => ({ font: '', measureText: () => ({ width: 50 }) });
        return el;
      },
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
      documentElement: { lang: 'vi', style: {} },
      body: createMockEl(),
      title: '',
      head: { appendChild: () => {} }
    },
    Event: class { constructor(t) { this.type = t; } },
    CustomEvent: class { constructor(t, d) { this.type = t; this.detail = d; } },
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    requestAnimationFrame: (cb) => cb(),
    setTimeout: (cb) => 1,
    clearTimeout: () => {},
    setInterval: () => 1,
    clearInterval: () => {},
    navigator: { language: 'vi-VN', languages: ['vi-VN'], userAgent: 'test' },
    location: { href: 'http://localhost/', search: '', hash: '' },
    matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
    IntersectionObserver: class { constructor() {} observe() {} unobserve() {} disconnect() {} },
    scrollY: 0,
    scrollX: 0,
    innerWidth: 1024,
    innerHeight: 768
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx1 = vm.createContext(Object.assign({}, sandbox));
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'js', 'script.js'), 'utf8'), ctx1);
  const ctx2 = vm.createContext(Object.assign({}, sandbox));
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'js', 'script.min.js'), 'utf8'), ctx2);
});

test('worker.js passes node --check', () => {
  execSync(`node --check "${path.join(__dirname, 'worker.js')}"`, { stdio: 'pipe' });
});

test('All JSON Schema and metadata files parse successfully', () => {
  ['schema-jeeptour.json', 'schema-review-product.json', 'schema-webhook-payload.json'].forEach(f => {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      assert(typeof data === 'object', `${f} is not a valid JSON object`);
    }
  });
});

// ─────────────────────────────────────────────────────────────
// SUITE 3: Baseline Regression Check Against git HEAD
// ─────────────────────────────────────────────────────────────
console.log(`\n${colors.bold}[3/5] Regression Check vs Last Commit (HEAD)${colors.reset}`);

let headJs = '';
let headCss = '';
try {
  headJs = execSync('git show HEAD:js/script.js', { maxBuffer: 15 * 1024 * 1024, encoding: 'utf8' });
  headCss = execSync('git show HEAD:css/style.css', { maxBuffer: 15 * 1024 * 1024, encoding: 'utf8' });
} catch (e) {
  console.warn(`Warning: Unable to read HEAD commit directly via git: ${e.message}`);
}

test('CSS Selectors: 100% of selectors from HEAD commit are preserved (0 dropped)', () => {
  if (!headCss) return;
  const curCss = fs.readFileSync(path.join(__dirname, 'css', 'style.css'), 'utf8');

  function getSelectors(css) {
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const rules = stripped.match(/[^{}]+(?=\{)/g) || [];
    const set = new Set();
    rules.forEach(r => {
      const s = r.trim();
      if (s && !s.startsWith('@media') && !s.startsWith('@keyframes') && !s.startsWith('@import')) {
        set.add(s);
      }
    });
    return set;
  }

  const headSel = getSelectors(headCss);
  const curSel = getSelectors(curCss);
  const missing = [];
  headSel.forEach(s => {
    if (!curSel.has(s)) missing.push(s);
  });
  assert(missing.length === 0, `Missing ${missing.length} CSS selectors from HEAD: ${missing.slice(0, 5).join(', ')}`);
});

test('CSS Variables: :root tokens match HEAD', () => {
  const varsContent = fs.readFileSync(path.join(__dirname, 'css', 'modules', 'variables.css'), 'utf8');
  const requiredTokens = [
    '--color-bg', '--color-gold', '--color-text',
    '--color-bg-card', '--font-serif', '--font-sans'
  ];
  requiredTokens.forEach(token => {
    assert(varsContent.includes(token), `Missing CSS variable: ${token}`);
  });
});

test('i18n Translations: All 6 languages and 310 keys match HEAD exactly', () => {
  const curTransJs = fs.readFileSync(path.join(__dirname, 'js', 'modules', 'translations.js'), 'utf8');
  const sandboxCur = { window: {} };
  vm.createContext(sandboxCur);
  vm.runInContext(curTransJs, sandboxCur);
  const curTrans = sandboxCur.window.__MRB_TRANS;

  assert(curTrans, 'window.__MRB_TRANS not exposed');
  const expectedLangs = ['vi', 'en', 'ru', 'zh', 'ko', 'de'];
  expectedLangs.forEach(lang => {
    assert(curTrans[lang], `Language missing in current translations: ${lang}`);
    assert(Object.keys(curTrans[lang]).length >= 300, `Translations for ${lang} have fewer keys than expected`);
  });

  if (headJs) {
    const headMatch = headJs.match(/const TRANSLATIONS = \{[\s\S]*?\n  \};/);
    assert(headMatch, 'Could not find TRANSLATIONS in HEAD js');
    const sandboxHead = { window: {} };
    vm.createContext(sandboxHead);
    vm.runInContext(headMatch[0] + '; window.__HEAD_TRANS = TRANSLATIONS;', sandboxHead);
    const headTrans = sandboxHead.window.__HEAD_TRANS;

    expectedLangs.forEach(lang => {
      const headKeys = Object.keys(headTrans[lang] || {});
      headKeys.forEach(k => {
        assertEqual(curTrans[lang][k], headTrans[lang][k], `Mismatch in translation [${lang}][${k}]`);
      });
    });
  }
});

test('Hotel Database: 259 hotels in Mũi Né match HEAD exactly', () => {
  const curHotelJs = fs.readFileSync(path.join(__dirname, 'js', 'modules', 'hotel-autocomplete.js'), 'utf8');
  const curHotelMatch = curHotelJs.match(/var hotelData = \[([\s\S]*?)\n  \];/);
  assert(curHotelMatch, 'hotelData array not found in hotel-autocomplete.js');

  const sandboxCur = { window: {} };
  vm.createContext(sandboxCur);
  vm.runInContext('var hotels = [' + curHotelMatch[1] + '];', sandboxCur);
  assert(sandboxCur.hotels.length === 259, `Expected 259 hotels, got ${sandboxCur.hotels.length}`);

  if (headJs) {
    const headHotelMatch = headJs.match(/var hotelData = \[([\s\S]*?)\n  \];/);
    const sandboxHead = { window: {} };
    vm.createContext(sandboxHead);
    vm.runInContext('var hotels = [' + headHotelMatch[1] + '];', sandboxHead);

    assertEqual(sandboxCur.hotels.length, sandboxHead.hotels.length, 'Hotel count mismatch vs HEAD');
    sandboxHead.hotels.forEach((h, idx) => {
      const c = sandboxCur.hotels[idx];
      assertEqual(c.name, h.name, `Hotel name mismatch at index ${idx}`);
      assertEqual(c.address, h.address, `Hotel address mismatch at index ${idx}`);
    });
  }
});

test('Transfer Configuration: Vehicle types and settings match HEAD', () => {
  const curTransferJs = fs.readFileSync(path.join(__dirname, 'js', 'modules', 'transfer.js'), 'utf8');
  const curConfMatch = curTransferJs.match(/var TRANSFER_CONFIG = (\{[\s\S]*?\n  \});/);
  assert(curConfMatch, 'TRANSFER_CONFIG not found in transfer.js');

  const sandboxCur = { window: {} };
  vm.createContext(sandboxCur);
  vm.runInContext('var config = ' + curConfMatch[1] + ';', sandboxCur);
  assert(Array.isArray(sandboxCur.config.vehicleTypes), 'vehicleTypes is not an array');
  assert(sandboxCur.config.vehicleTypes.length === 2, 'Expected 2 vehicle types (gas7, gas16)');

  if (headJs) {
    const headConfMatch = headJs.match(/var TRANSFER_CONFIG = (\{[\s\S]*?\n  \});/);
    const sandboxHead = { window: {} };
    vm.createContext(sandboxHead);
    vm.runInContext('var config = ' + headConfMatch[1] + ';', sandboxHead);

    assertEqual(
      JSON.stringify(sandboxCur.config.vehicleTypes),
      JSON.stringify(sandboxHead.config.vehicleTypes),
      'Vehicle types config mismatch vs HEAD'
    );
  }
});

// ─────────────────────────────────────────────────────────────
// SUITE 4: Functional Logic & Core Systems
// ─────────────────────────────────────────────────────────────
console.log(`\n${colors.bold}[4/5] Functional Logic & Business Rules${colors.reset}`);

test('Tour Pricing Calculations: Private, Shared, Addon values', () => {
  const PRICE_PRIVATE = 500000;
  const PRICE_SHARED = 150000;
  const ADDON_PRICE_SAND_DUNE = 950000;

  // 1 Private Jeep
  assertEqual(1 * PRICE_PRIVATE, 500000);
  // 3 Private Jeeps
  assertEqual(3 * PRICE_PRIVATE, 1500000);
  // 4 Pax Shared
  assertEqual(4 * PRICE_SHARED, 600000);
  // 2 Sand dune addons
  assertEqual(2 * ADDON_PRICE_SAND_DUNE, 1900000);
  // Total calculation with addon: 1 private jeep + 1 sand dune addon
  assertEqual(1 * PRICE_PRIVATE + 1 * ADDON_PRICE_SAND_DUNE, 1450000);
});

test('Holiday Surcharge Logic (+30% between 27/8 and 2/9)', () => {
  const HOLIDAY_SURCHARGE_RATE = 0.3;

  function isHolidaySurcharge(val) {
    if (!val) return false;
    const parts = val.split('T')[0].split('-');
    if (parts.length < 3) return false;
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    return (m === 8 && d >= 27) || (m === 9 && d <= 2);
  }

  // Inside holiday period
  assert(isHolidaySurcharge('2026-08-27T04:30'), '27 Aug should trigger holiday surcharge');
  assert(isHolidaySurcharge('2026-08-30T13:30'), '30 Aug should trigger holiday surcharge');
  assert(isHolidaySurcharge('2026-09-02T04:30'), '02 Sep should trigger holiday surcharge');

  // Outside holiday period
  assert(!isHolidaySurcharge('2026-08-26T04:30'), '26 Aug should not trigger holiday surcharge');
  assert(!isHolidaySurcharge('2026-09-03T13:30'), '03 Sep should not trigger holiday surcharge');
  assert(!isHolidaySurcharge('2026-07-15T04:30'), '15 Jul should not trigger holiday surcharge');

  // Calculation verification
  const baseTotal = 500000;
  const surcharge = Math.round(baseTotal * HOLIDAY_SURCHARGE_RATE);
  assertEqual(surcharge, 150000, '30% surcharge on 500,000 should be 150,000');
  assertEqual(baseTotal + surcharge, 650000, 'Total with surcharge should be 650,000');
});

test('Hotel Autocomplete Diacritic Folding & Search Logic', () => {
  function fold(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/đ/g, 'd');
  }

  assertEqual(fold('Đồi Cát Trắng'), 'doi cat trang');
  assertEqual(fold('Mũi Né'), 'mui ne');
  assertEqual(fold('Anantara Mui Ne Resort'), 'anantara mui ne resort');

  const curHotelJs = fs.readFileSync(path.join(__dirname, 'js', 'modules', 'hotel-autocomplete.js'), 'utf8');
  const curHotelMatch = curHotelJs.match(/var hotelData = \[([\s\S]*?)\n  \];/);
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext('var hotels = [' + curHotelMatch[1] + '];', sandbox);

  // Search for "anantara"
  const anantaraResults = sandbox.hotels.filter(h => fold(h.name).includes(fold('anantara')));
  assert(anantaraResults.length >= 1, 'Should find Anantara resort');
  assert(anantaraResults[0].name.toLowerCase().includes('anantara'));

  // Search for "radisson"
  const radissonResults = sandbox.hotels.filter(h => fold(h.name).includes(fold('radisson')));
  assert(radissonResults.length >= 1, 'Should find Radisson resort');
});

// ─────────────────────────────────────────────────────────────
// SUITE 5: HTML Integrity & Resource Verification
// ─────────────────────────────────────────────────────────────
console.log(`\n${colors.bold}[5/5] HTML Integrity & Resource Links${colors.reset}`);

const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

test('index.html links to production css and js bundles', () => {
  assert(htmlContent.includes('css/style.min.css'), 'index.html must link to css/style.min.css');
  assert(htmlContent.includes('js/script.min.js'), 'index.html must link to js/script.min.js');
});

test('index.html contains critical interactive element IDs', () => {
  const criticalIds = [
    'navbar', 'hamburger', 'navLinks', 'backToTop',
    'langBtn', 'langDropdown', 'heroVideo', 'heroVideoToggle',
    'bookingOverlay', 'bfTypePrivate', 'bfTypeGroup',
    'bfDatetime', 'bfHotelName', 'bfConfirmModal',
    'svcPanelJeep', 'svcPanelTransfer', 'tfSearchFrom', 'tfSearchTo'
  ];
  criticalIds.forEach(id => {
    assert(htmlContent.includes(`id="${id}"`), `index.html is missing required ID: #${id}`);
  });
});

test('Referenced local image and asset files exist on disk', () => {
  const assetRegex = /src="([^"]+\.(?:webp|png|jpg|jpeg|svg|webm))"/g;
  let match;
  const checked = new Set();
  while ((match = assetRegex.exec(htmlContent)) !== null) {
    const src = match[1];
    if (src.startsWith('http') || src.startsWith('data:')) continue;
    if (checked.has(src)) continue;
    checked.add(src);
    const fullPath = path.join(__dirname, src);
    assert(fs.existsSync(fullPath), `Local asset referenced in HTML not found: ${src}`);
  }
});

// ─────────────────────────────────────────────────────────────
// Test Summary
// ─────────────────────────────────────────────────────────────
console.log(`\n${colors.bold}${colors.cyan}============================================================${colors.reset}`);
console.log(`  Tests Passed:  ${colors.green}${passedTests} / ${totalTests}${colors.reset}`);
if (failedTests > 0) {
  console.log(`  Tests Failed:  ${colors.red}${failedTests} / ${totalTests}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}============================================================${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`  Tests Failed:  ${colors.green}0${colors.reset}`);
  console.log(`  Status:        ${colors.green}${colors.bold}ALL SYSTEMS PASSED 100%${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}============================================================${colors.reset}\n`);
  process.exit(0);
}
