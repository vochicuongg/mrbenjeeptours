/* ============================================================
   MR. BEN JEEP TOURS – script.js
   Navbar scroll · Mobile menu · Back-to-top · Language switcher
   ============================================================ */

(function () {
  'use strict';

  /* ─── Element References ──────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const allNavLinks = document.querySelectorAll('.nav-link');

  /* Language switcher elements */
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  const langArrow = document.getElementById('langArrow');
  const langFlagActive = document.getElementById('langFlagActive');
  const langCodeActive = document.getElementById('langCodeActive');
  const langOptions = document.querySelectorAll('.lang-option');

  /* ─── i18n Translations ───────────────────────────────────── */
  const TRANSLATIONS = {
    vi: {
      'nav.home': 'Trang Chủ',
      'nav.about': 'Giới Thiệu',
      'nav.tours': 'Jeep Tours',
      'nav.gallery': 'Thư Viện',
      'nav.contact': 'Liên Hệ',
      'nav.bookNow': 'Đặt Ngay',
      'hero.eyebrow': '✦ Tour Jeep Cao Cấp · Mũi Né · Phan Thiết',
      'hero.title1': 'Khám Phá Mũi Né',
      'hero.titleWith': 'Cùng',
      'hero.subtitle': 'Tour Jeep Cao Cấp xuyên qua những đồi cát Trắng & Đỏ tuyệt đẹp của Mũi Né — bình minh, hoàng hôn và hơn thế nữa.',
      'hero.viewTours': 'Liên Hệ',
      'hero.bookAdv': 'Đặt Chuyến Phiêu Lưu',
      'about.eyebrow': 'Tại Sao Chọn Chúng Tôi',
      'about.title1': 'Trải Nghiệm',
      'about.titleGold': 'Mr. Ben',
      'about.subtitle': 'Chúng tôi kết hợp chuyên môn địa phương với sự thoải mái cao cấp, biến mỗi đồi cát và bờ biển thành ký ức khó quên.',
      'tours.eyebrow': 'Trải Nghiệm Đặc Sắc',
      'tours.title1': 'Jeep Tours',
      'tours.titleGold': 'Nổi Bật',
      'tours.subtitle': 'Hành trình được thiết kế riêng, giới thiệu những điểm đẹp nhất của Mũi Né và Phan Thiết.',
      'gallery.eyebrow': 'Khoảnh Khắc Ghi Nhớ',
      'gallery.title1': 'Thư Viện',
      'gallery.titleGold': 'Ảnh',
      'gallery.subtitle': 'Một cái nhìn thoáng qua về những cuộc phiêu lưu chờ đón bạn ở Mũi Né.',
      'cta.title1': 'Sẵn Sàng Cho',
      'cta.titleGold': 'Phiêu Lưu?',
      'cta.sub': 'Liên hệ ngay và đội ngũ của chúng tôi sẽ tạo ra hành trình hoàn hảo cho bạn.',
      'feat.driversTitle': 'Tài Xế Chuyên Nghiệp',
      'feat.driversDesc': 'Tài xế địa phương có chứng chỉ, giàu kinh nghiệm, am hiểu từng con đường, đồi cát và khu khuất của Mũi Né.',
      'feat.jeepsTitle': 'Jeep Cao Cấp',
      'feat.jeepsDesc': 'Ngồi xe phóng khoáng với đội xe Jeep cổ điển, được bảo dưỡng tốt, mang lại cả sự thoải mái lẫn phiêu lưu.',
      'feat.localTitle': 'Am Hiểu Địa Phương',
      'feat.localDesc': 'Sinh ra và lớn lên tại Mũi Né, chúng tôi chia sẻ văn hóa, câu chuyện và những điểm bí ẩn chỉ người địa phương mới biết.',
      'feat.sunTitle': 'Tour Bình Minh & Hoàng Hôn',
      'feat.sunDesc': 'Đuổi theo giờ vàng trên những đồi cát đỏ thắm để có những bức ảnh lưu giữ cả đời.',
      'feat.photoTitle': 'Cơ Hội Chụp Ảnh',
      'feat.photoDesc': 'Mọi điểm dừng chân đều được tuyển chọn kỹ để có những bức ảnh ấn tượng nhất — Instagram của bạn sẽ chưa bao giờ đẹp đến vậy.',
      'feat.safeTitle': 'An Toàn & Bảo Hiểm',
      'feat.safeDesc': 'Bảo hiểm du lịch toàn diện, hướng dẫn an toàn và trang thiết bị khẩn cấp trên mọi tour.',
    },
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.tours': 'Jeep Tours',
      'nav.gallery': 'Gallery',
      'nav.contact': 'Contact',
      'nav.bookNow': 'Book Now',
      'hero.eyebrow': '✦ Luxury Jeep Tours · Mũi Né · Phan Thiết',
      'hero.title1': 'Explore Mũi Né with',
      'hero.titleWith': 'with',
      'hero.subtitle': 'Premium Jeep Tours through the breathtaking White & Red Sand Dunes of Mui Ne — sunrise, sunset, and beyond.',
      'hero.viewTours': 'Contact Us',
      'hero.bookAdv': 'Book Your Adventure',
      'about.eyebrow': 'Why Choose Us',
      'about.title1': 'The',
      'about.titleGold': 'Mr. Ben Experience',
      'about.subtitle': 'We combine local expertise with premium comfort, making every dune and coastline an unforgettable memory.',
      'tours.eyebrow': 'Our Signature Experiences',
      'tours.title1': 'Jeep Tours',
      'tours.titleGold': 'Featured',
      'tours.subtitle': 'Handcrafted itineraries that showcase the very best of Mũi Né and Phan Thiết.',
      'gallery.eyebrow': 'Moments Captured',
      'gallery.title1': 'Tour',
      'gallery.titleGold': 'Gallery',
      'gallery.subtitle': 'A glimpse of the adventures that await you in Mũi Né.',
      'cta.title1': 'Ready for Your',
      'cta.titleGold': 'Adventure?',
      'cta.sub': 'Contact us now and our team will craft the perfect itinerary for you.',
      'feat.driversTitle': 'Professional Drivers',
      'feat.driversDesc': 'Certified, experienced local drivers who know every trail, dune, and hidden gem of Mũi Né.',
      'feat.jeepsTitle': 'Premium Jeeps',
      'feat.jeepsDesc': 'Ride in style with our fleet of classic, well-maintained Jeeps built for both comfort and adventure.',
      'feat.localTitle': 'Local Expertise',
      'feat.localDesc': 'Born and raised in Mui Ne, we share the culture, stories, and secret spots only locals know.',
      'feat.sunTitle': 'Sunrise & Sunset Tours',
      'feat.sunDesc': 'Chase the golden hour over the crimson sand dunes for photographs that will last a lifetime.',
      'feat.photoTitle': 'Photo Opportunities',
      'feat.photoDesc': 'Every stop is curated for the most stunning shots — your Instagram will never look this good.',
      'feat.safeTitle': 'Safe & Insured',
      'feat.safeDesc': 'Full travel insurance, safety briefings, and emergency equipment on every single tour.',
    },
    ru: {
      'nav.home': 'Главная',
      'nav.about': 'О Нас',
      'nav.tours': 'Джип-туры',
      'nav.gallery': 'Галерея',
      'nav.contact': 'Контакты',
      'nav.bookNow': 'Забронировать',
      'hero.eyebrow': '✦ Люкс Джип Туры · Муй Не · Фан Тхиет',
      'hero.title1': 'Откройте Муй Не с',
      'hero.titleWith': 'с',
      'hero.subtitle': 'Премиальные джип-туры по захватывающим Белым и Красным песчаным дюнам Муй Не — рассветы, закаты и многое другое.',
      'hero.viewTours': 'Свяжитесь с нами',
      'hero.bookAdv': 'Забронировать Тур',
      'about.eyebrow': 'Почему Мы',
      'about.title1': 'Опыт',
      'about.titleGold': 'Mr. Ben',
      'about.subtitle': 'Мы сочетаем местную экспертизу с премиальным комфортом, превращая каждую дюну и берег в незабываемое воспоминание.',
      'tours.eyebrow': 'Наши Фирменные Туры',
      'tours.title1': 'Джип-туры',
      'tours.titleGold': 'Лучшие',
      'tours.subtitle': 'Индивидуальные маршруты, демонстрирующие лучшее из Муй Не и Фан Тхиета.',
      'gallery.eyebrow': 'Запечатлённые Моменты',
      'gallery.title1': 'Наша',
      'gallery.titleGold': 'Галерея',
      'gallery.subtitle': 'Взгляд на приключения, которые ждут вас в Муй Не.',
      'cta.title1': 'Готовы к',
      'cta.titleGold': 'Приключению?',
      'cta.sub': 'Свяжитесь с нами, и наша команда создаст идеальный маршрут для вас.',
      'feat.driversTitle': 'Профессиональные Водители',
      'feat.driversDesc': 'Сертифицированные, опытные местные водители, знающие каждую тропу, дюну и скрытый уголок Муй Не.',
      'feat.jeepsTitle': 'Премиум Джипы',
      'feat.jeepsDesc': 'Путешествуйте с комфортом на классических джипах, сочетающих стиль и надёжность.',
      'feat.localTitle': 'Местная Экспертиза',
      'feat.localDesc': 'Родились и выросли в Муй Не, мы делимся культурой, историями и секретными местами, известными только местным.',
      'feat.sunTitle': 'Туры на Рассвет и Закат',
      'feat.sunDesc': 'Погоняйтесь за золотым часом над алыми дюнами для фотографий, которые останутся в памяти навсегда.',
      'feat.photoTitle': 'Фотовозможности',
      'feat.photoDesc': 'Каждая остановка подобрана для самых зрелищных снимков — ваш Instagram никогда не был таким ярким.',
      'feat.safeTitle': 'Безопасность и Страховка',
      'feat.safeDesc': 'Полная туристическая страховка, инструктаж по безопасности и аварийное оборудование на каждом туре.',
    },
    zh: {
      'nav.home': '首页',
      'nav.about': '关于我们',
      'nav.tours': '吉普游',
      'nav.gallery': '照片集',
      'nav.contact': '联系我们',
      'nav.bookNow': '立即预订',
      'hero.eyebrow': '✦ 豪华吉普游 · 美奈 · 藩切',
      'hero.title1': '探索美奈',
      'hero.titleWith': '与',
      'hero.subtitle': '乘坐高级吉普车穿越美奈令人叹为观止的白沙丘和红沙丘 — 日出、日落，尽享无限精彩。',
      'hero.viewTours': '联系我们',
      'hero.bookAdv': '立即预订冒险',
      'about.eyebrow': '为什么选择我们',
      'about.title1': 'Mr. Ben',
      'about.titleGold': '的特色体验',
      'about.subtitle': '我们将当地专业知识与高端舒适体验相结合，让每一片沙丘和海岸线都成为难忘的记忆。',
      'tours.eyebrow': '精品体验',
      'tours.title1': '吉普游',
      'tours.titleGold': '精选',
      'tours.subtitle': '精心设计的行程，带您领略美奈和藩切最美丽的风光。',
      'gallery.eyebrow': '珍贵瞬间',
      'gallery.title1': '旅游',
      'gallery.titleGold': '照片集',
      'gallery.subtitle': '美奈等待您的精彩冒险一瞥。',
      'cta.title1': '准备好您的',
      'cta.titleGold': '冒险了吗？',
      'cta.sub': '立即联系我们，我们的团队将为您打造完美行程。',
      'feat.driversTitle': '专业司机',
      'feat.driversDesc': '持证上岗、经验丰富的当地司机，熟悉美奈的每一条小道、每一座沙丘和每一个隐秘天堂。',
      'feat.jeepsTitle': '顶级吉普车队',
      'feat.jeepsDesc': '乘坐经典硬派吉普，兼顾舒适与冒险，尽享风尚旅途。',
      'feat.localTitle': '深度本地知识',
      'feat.localDesc': '土生土长于藩切,我们分享文化、故事和只有当地人才知晓的祝密景点。',
      'feat.sunTitle': '日出 & 日落之旅',
      'feat.sunDesc': '在深红色沙丘上追逐黄金时光，拍出一生难忘的照片。',
      'feat.photoTitle': '摄影圣地',
      'feat.photoDesc': '每个停靠点经精心筛选，确保最亮丽的景色——让您的 Instagram 照片中收妖。',
      'feat.safeTitle': '安全 & 全格保险',
      'feat.safeDesc': '全程旅游保险、安全说明以及应急设备，每一足旅程留心有保障。',
    },
    ko: {
      'nav.home': '홈',
      'nav.about': '소개',
      'nav.tours': '지프 투어',
      'nav.gallery': '갤러리',
      'nav.contact': '연락처',
      'nav.bookNow': '지금 예약',
      'hero.eyebrow': '✦ 럭셔리 지프 투어 · 무이네 · 판티엣',
      'hero.title1': '무이네를 탐험하다',
      'hero.titleWith': '함께하는',
      'hero.subtitle': '무이네의 황홀한 화이트 & 레드 사막을 가로지르는 프리미엄 지프 투어 — 일출, 일몰, 그 이상.',
      'hero.viewTours': '연락하기',
      'hero.bookAdv': '어드벤처 예약',
      'about.eyebrow': '왜 우리를 선택하나요',
      'about.title1': 'Mr. Ben',
      'about.titleGold': '만의 특별함',
      'about.subtitle': '현지 전문 지식과 프리미엄 편안함을 결합하여 모든 모래 언덕과 해안선을 잊지 못할 추억으로 만듭니다.',
      'tours.eyebrow': '시그니처 투어',
      'tours.title1': '지프 투어',
      'tours.titleGold': '추천',
      'tours.subtitle': '무이네와 판티엣 최고의 명소를 소개하는 맞춤형 여정.',
      'gallery.eyebrow': '소중한 순간들',
      'gallery.title1': '투어',
      'gallery.titleGold': '갤러리',
      'gallery.subtitle': '무이네에서 기다리는 모험을 살짝 엿보세요.',
      'cta.title1': '어드벤처를 위한',
      'cta.titleGold': '준비가 됐나요?',
      'cta.sub': '지금 연락하세요. 우리 팀이 완벽한 여정을 만들어 드립니다.',
      'feat.driversTitle': '전문 드라이버',
      'feat.driversDesc': '자격증을 보유한 숙련된 현지 드라이버들이 무이네의 모든 샛길과 모래 언덕, 숨겨진 명소를 안내합니다.',
      'feat.jeepsTitle': '프리미엄 지프',
      'feat.jeepsDesc': '편안함과 험을 모두 감도는 고전 지프로 스타일 있게 달리세요.',
      'feat.localTitle': '현지 전문 지식',
      'feat.localDesc': '무이네에서 태어나고 자란 우리는 현지 문화와 이야기, 현지인만 아는 비밀 장소를 나누어 드립니다.',
      'feat.sunTitle': '일출 & 일몰 투어',
      'feat.sunDesc': '진홍빛 사막 위에 펼쳐지는 황금 빛을 쫓아 일생에 한 번 있는 사진을 남겨보세요.',
      'feat.photoTitle': '사진 촬영 스팟',
      'feat.photoDesc': '모든 비진은 가장 멋진 영상을 위해 엄선되어 있으며 — Instagram이 한 단계 업그레이드됩니다.',
      'feat.safeTitle': '안전 & 보험',
      'feat.safeDesc': '전면 여행자 보험, 안전 교육, 매투어 비상 장비 완비로 안심하게 달리세요.',
    },
    de: {
      'nav.home': 'Start',
      'nav.about': 'Über Uns',
      'nav.tours': 'Jeep-Touren',
      'nav.gallery': 'Galerie',
      'nav.contact': 'Kontakt',
      'nav.bookNow': 'Jetzt Buchen',
      'hero.eyebrow': '✦ Luxus Jeep Touren · Mũi Né · Phan Thiết',
      'hero.title1': 'Mũi Né Entdecken',
      'hero.titleWith': 'mit',
      'hero.subtitle': 'Premium Jeep-Touren durch die atemberaubenden Weißen & Roten Sanddünen von Mũi Né — Sonnenaufgang, Sonnenuntergang und mehr.',
      'hero.viewTours': 'Kontaktieren Sie Uns',
      'hero.bookAdv': 'Abenteuer Buchen',
      'about.eyebrow': 'Warum Wir',
      'about.title1': 'Das',
      'about.titleGold': 'Mr. Ben Erlebnis',
      'about.subtitle': 'Wir verbinden lokales Know-how mit Premium-Komfort und machen jede Düne und Küste zu einer unvergesslichen Erinnerung.',
      'tours.eyebrow': 'Unsere Signature-Erlebnisse',
      'tours.title1': 'Jeep-Touren',
      'tours.titleGold': 'Ausgewählte',
      'tours.subtitle': 'Maßgeschneiderte Itinerare, die das Beste von Mũi Né und Phan Thiết zeigen.',
      'gallery.eyebrow': 'Eingefangene Momente',
      'gallery.title1': 'Tour',
      'gallery.titleGold': 'Galerie',
      'gallery.subtitle': 'Ein Blick auf die Abenteuer, die Sie in Mũi Né erwarten.',
      'cta.title1': 'Bereit für Ihr',
      'cta.titleGold': 'Abenteuer?',
      'cta.sub': 'Kontaktieren Sie uns jetzt und unser Team erstellt die perfekte Route für Sie.',
      'feat.driversTitle': 'Professionelle Fahrer',
      'feat.driversDesc': 'Zertifizierte, erfahrene einheimische Fahrer, die jeden Pfad, jede Düne und jeden verborgenen Geheimtipp in Mũi Né kennen.',
      'feat.jeepsTitle': 'Premium Jeeps',
      'feat.jeepsDesc': 'Reisen Sie stilvoll in unserer Flotte klassischer, gepflegter Jeeps — für Komfort und Abenteuer.',
      'feat.localTitle': 'Lokale Expertise',
      'feat.localDesc': 'In Mui Ne geboren und aufgewachsen, wir teilen Kultur, Geschichten und Geheimplätze, die nur Einheimische kennen.',
      'feat.sunTitle': 'Sonnenaufgang & Sonnenuntergang Touren',
      'feat.sunDesc': 'Jagen Sie die goldene Stunde über den tiefroten Dünen für Fotos, die ein Leben lang in Erinnerung bleiben.',
      'feat.photoTitle': 'Fotomöglichkeiten',
      'feat.photoDesc': 'Jeder Halt ist für die beeindruckendsten Aufnahmen ausgewählt — Ihr Instagram war nie so gut wie jetzt.',
      'feat.safeTitle': 'Sicher & Versichert',
      'feat.safeDesc': 'Vollständige Reiseversicherung, Sicherheitseinweisungen und Notfallausrüstung auf jeder Tour.',
    }

  };

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
    /* Update <html lang> attribute for accessibility */
    document.documentElement.lang = lang;
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
    if (e.key === 'Escape') { closeLang(); closeMenu(); }
  });

  /* Restore saved language on page load */
  (function initLang() {
    const saved = localStorage.getItem('mrben-lang') || 'vi';
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
  })();

  /* ─── Navbar: Solid on scroll ──────────────────────────────── */
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ─── Mobile Menu ──────────────────────────────────────────── */
  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  /* ─── Back to Top ──────────────────────────────────────────── */
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── Scroll Reveal ────────────────────────────────────────── */
  const revealTargets = document.querySelectorAll(
    '.feature-card, .tour-card, .gallery-item, .contact-card'
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

  /* ─── Active Nav Link on Scroll ───────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    allNavLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  const linkStyle = document.createElement('style');
  linkStyle.textContent = '.nav-link.active{color:var(--color-gold)!important}.nav-link.active::after{width:100%!important}';
  document.head.appendChild(linkStyle);

})();


/* ============================================================
   MOBILE TOURS SLIDER
   Activates only on mobile (≤680px). Scroll-snap + arrow buttons.
   ============================================================ */
(function () {
  'use strict';

  const MOBILE_BP = 680;

  const grid = document.getElementById('toursGrid');
  const dotsEl = document.getElementById('toursDots');
  const btnPrev = document.querySelector('.tours-arrow-prev');
  const btnNext = document.querySelector('.tours-arrow-next');

  if (!grid || !dotsEl || !btnPrev || !btnNext) return;

  let cards = [];
  let currentIdx = 0;
  let isMobile = false;

  /* ─── Build dots ─────────────────────────────────────────── */
  function buildDots() {
    dotsEl.innerHTML = '';
    cards.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'tours-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Sản phẩm ' + (i + 1));
      dot.addEventListener('click', function () { scrollTo(i); });
      dotsEl.appendChild(dot);
    });
  }

  /* ─── Update active dot and buttons ─────────────────────── */
  function updateUI(idx) {
    currentIdx = idx;
    dotsEl.querySelectorAll('.tours-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
    btnPrev.disabled = idx === 0;
    btnNext.disabled = idx === cards.length - 1;
  }

  /* ─── Scroll to card ─────────────────────────────────────── */
  function scrollTo(idx) {
    const card = cards[idx];
    if (!card) return;
    grid.scrollTo({ left: card.offsetLeft - grid.offsetLeft, behavior: 'smooth' });
    updateUI(idx);
  }

  /* ─── Arrow clicks ──────────────────────────────────────── */
  btnPrev.addEventListener('click', function () { scrollTo(Math.max(0, currentIdx - 1)); });
  btnNext.addEventListener('click', function () { scrollTo(Math.min(cards.length - 1, currentIdx + 1)); });

  /* ─── Sync dot on native swipe scroll ───────────────────── */
  function onScroll() {
    let minDist = Infinity;
    let closestIdx = 0;
    cards.forEach(function (card, i) {
      const dist = Math.abs(card.offsetLeft - grid.offsetLeft - grid.scrollLeft);
      if (dist < minDist) { minDist = dist; closestIdx = i; }
    });
    updateUI(closestIdx);
  }

  /* ─── Init / Destroy ────────────────────────────────────── */
  function init() {
    cards = Array.from(grid.querySelectorAll('.tour-card'));
    buildDots();
    updateUI(0);
    grid.addEventListener('scroll', onScroll, { passive: true });
  }

  function destroy() {
    dotsEl.innerHTML = '';
    grid.removeEventListener('scroll', onScroll);
    currentIdx = 0;
  }

  /* ─── Responsive toggle ─────────────────────────────────── */
  function check() {
    const mobile = window.innerWidth <= MOBILE_BP;
    if (mobile && !isMobile) { isMobile = true; init(); }
    else if (!mobile && isMobile) { isMobile = false; destroy(); }
  }

  check();
  window.addEventListener('resize', check, { passive: true });

})();
