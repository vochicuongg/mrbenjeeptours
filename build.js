/**
 * MR. BEN JEEP TOURS – Build & Bundler Script
 * 
 * Concatenates modular CSS & JS files into single production bundles:
 *   - css/modules/*.css -> css/style.css & css/style.min.css
 *   - js/modules/*.js   -> js/script.js & js/script.min.js
 * 
 * Usage:
 *   node build.js          # Build once
 *   node build.js --watch  # Watch for changes and rebuild automatically
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CSS_MODULES = [
  'variables.css',
  'header-nav.css',
  'hero.css',
  'about.css',
  'destinations.css',
  'tours.css',
  'gallery.css',
  'reviews.css',
  'cta-banner.css',
  'footer.css',
  'responsive-base.css',
  'lang-switcher.css',
  'booking-modal.css',
  'confirm-modal.css',
  'service-tabs.css',
  'transfer.css',
  'thank-modal.css',
  'hero-video.css',
  'transfer-booking.css',
  'clock-picker-toast.css'
];

const JS_MODULES = [
  'translations.js',
  'i18n.js',
  'navigation.js',
  'destinations-swiper.js',
  'tours-slider.js',
  'booking-modal.js',
  'date-time-picker.js',
  'itinerary-selector.js',
  'hotel-autocomplete.js',
  'media-enhancements.js',
  'service-tabs.js',
  'transfer.js'
];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  return (bytes / 1024).toFixed(1) + ' KB';
}

function buildCSS() {
  const cssDir = path.join(__dirname, 'css', 'modules');
  const outFile = path.join(__dirname, 'css', 'style.css');
  const minFile = path.join(__dirname, 'css', 'style.min.css');

  const contents = CSS_MODULES.map(file => {
    const filePath = path.join(cssDir, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`CSS module missing: ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf8');
  });

  const bundledCSS = contents.join('\n');
  fs.writeFileSync(outFile, bundledCSS, 'utf8');

  // Minify CSS using esbuild
  try {
    execSync(`npx esbuild "${outFile}" --minify --outfile="${minFile}"`, {
      stdio: 'pipe',
      cwd: __dirname
    });
  } catch (err) {
    console.warn('[Build CSS] esbuild failed, falling back to simple minify:', err.message);
    const minified = bundledCSS
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      .trim();
    fs.writeFileSync(minFile, minified, 'utf8');
  }

  const outSize = fs.statSync(outFile).size;
  const minSize = fs.statSync(minFile).size;
  console.log(`✓ CSS Built: style.css (${formatBytes(outSize)}) -> style.min.css (${formatBytes(minSize)})`);
}

function buildJS() {
  const jsDir = path.join(__dirname, 'js', 'modules');
  const outFile = path.join(__dirname, 'js', 'script.js');
  const minFile = path.join(__dirname, 'js', 'script.min.js');

  const contents = JS_MODULES.map(file => {
    const filePath = path.join(jsDir, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`JS module missing: ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf8');
  });

  const bundledJS = contents.join('\n\n');
  fs.writeFileSync(outFile, bundledJS, 'utf8');

  // Minify JS using esbuild
  try {
    execSync(`npx esbuild "${outFile}" --minify --outfile="${minFile}"`, {
      stdio: 'pipe',
      cwd: __dirname
    });
  } catch (err) {
    console.warn('[Build JS] esbuild failed, keeping unminified copy:', err.message);
    fs.writeFileSync(minFile, bundledJS, 'utf8');
  }

  const outSize = fs.statSync(outFile).size;
  const minSize = fs.statSync(minFile).size;
  console.log(`✓ JS Built:  script.js (${formatBytes(outSize)}) -> script.min.js (${formatBytes(minSize)})`);
}

function buildAll() {
  const startTime = Date.now();
  console.log('\n--- Building MR. BEN Assets ---');
  try {
    buildCSS();
    buildJS();
    const duration = Date.now() - startTime;
    console.log(`✓ Build completed in ${duration}ms\n`);
  } catch (err) {
    console.error('✗ Build failed:', err.message);
  }
}

// Watch mode
if (process.argv.includes('--watch')) {
  buildAll();
  console.log('Watching for changes in css/modules/ and js/modules/ ...');

  const watchDirs = [
    path.join(__dirname, 'css', 'modules'),
    path.join(__dirname, 'js', 'modules')
  ];

  let debounceTimer = null;
  watchDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.watch(dir, { recursive: true }, (eventType, filename) => {
        if (!filename) return;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          console.log(`\nChange detected in ${filename}, rebuilding...`);
          buildAll();
        }, 100);
      });
    }
  });
} else {
  buildAll();
}
