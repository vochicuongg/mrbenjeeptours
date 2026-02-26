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
      'about.eyebrow': 'Tại Sao Nên Chọn Mr. Ben?',
      'about.title1': 'Trải Nghiệm Dịch Vụ',
      'about.titleGold': 'Chuẩn 5 Sao',
      'about.subtitle': 'Chúng tôi kết hợp chuyên môn địa phương với sự thoải mái cao cấp, biến mỗi đồi cát và bờ biển thành ký ức khó quên.',
      'tours.eyebrow': 'Trải Nghiệm Thượng Lưu',
      'tours.title1': 'Jeep Tours',
      'tours.titleGold': 'Đẳng Cấp',
      'tours.subtitle': 'Hành trình được thiết kế riêng, giới thiệu những điểm đẹp nhất của Mũi Né và Phan Thiết.',
      'gallery.eyebrow': 'Khoảnh Khắc Tuyệt Vời',
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
      'hero.scroll': 'Cuộn Xuống',
      'contact.call': 'Gọi Điện',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': 'Đối tác hàng đầu cho các chuyến phưu lưu cao cấp qua những cảnh quan tuyệt đẹp của Mũi Né và Phan Thiết, Việt Nam.',
      'footer.quickLinks': 'Liên Kết Nhanh',
      'footer.contactInfo': 'Thông Tin Liên Hệ',
      'footer.hours': 'Mở Cửa Hàng Ngày: 4:00 – 21:00',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. Đã Đăng Ký Bản Quyền.',
      'booking.datePlaceholder': 'Chọn ngày & giờ khởi hành',
      'tour.meta.hours': '4 Giờ',
      'tour.meta.people': '4-6 Người',
      'tour.meta.time': 'Bình minh/Hoàng hôn',
      'tour.meta.type': 'Riêng tư/Ghép',
      'tour.price.private': 'Riêng tư',
      'tour.price.group': 'Tour ghép',
      'tour.price.per': '/người',
      'tour.red.title': 'Xe Jeep Đỏ',
      'tour.red.desc': 'Chiếc Jeep đỏ rực nổi bật giữa những đồi cát — lựa chọn hoàn hảo cho chuyến khám phá bình minh và hoàng hôn tuyệt đẹp.',
      'tour.orange.title': 'Xe Jeep Cam',
      'tour.orange.desc': 'Màu cam rực rỡ như ánh hoàng hôn — cùng chiếc Jeep cam chinh phục cồn cát đỏ và khung cảnh ven biển hùng vĩ.',
      'tour.pink.title': 'Xe Jeep Hồng',
      'tour.pink.desc': 'Phong cách, cá tính và đầy màu sắc — chuyến hành trình trên Jeep hồng sẽ cho bạn những bức ảnh cực chất.',
      'tour.white.title': 'Xe Jeep Trắng',
      'tour.white.desc': 'Thanh lịch và tinh tế — chiếc Jeep trắng cao cấp đưa bạn qua tất cả điểm đến nổi bật: Đồi Cát Trắng, Suối Tiên, Hải Đăng.',
      'tour.gold.title': 'Xe Jeep Vàng',
      'tour.gold.desc': 'Màu vàng rực rỡ tượng trưng cho ánh nắng Mũi Né — trải nghiệm biểu tượng không thể bỏ qua khi đến Phan Thiết.',
      'tour.blue.title': 'Xe Jeep Xanh Dương',
      'tour.blue.desc': 'Màu xanh biển mát mắt — cùng Jeep xanh dương khám phá làng chài, bãi biển và những con đường ven đồi cát thơ mộng.',
      'tour.green.title': 'Xe Jeep Xanh Lục',
      'tour.green.desc': 'Hoà mình vào thiên nhiên cùng Jeep xanh lục — vượt qua địa hình đồi cát, rừng dương và những cung đường hoang dã.',
      'booking.pricePrivate': 'Tour Riêng Tư',
      'booking.priceGroup': 'Tour Ghép',
      'booking.labelName': 'Họ và Tên',
      'booking.placeholderName': 'Nhập tên của bạn',
      'booking.labelPhone': 'Số Điện Thoại',
      'booking.placeholderPhone': 'Nhập số điện thoại',
      'booking.labelTourType': 'Loại Tour',
      'booking.typePrivate': 'Tour Riêng Tư',
      'booking.typeGroup': 'Tour Ghép',
      'booking.labelDatetime': 'Ngày & Giờ Khởi Hành',
      'booking.pickupTime': 'THỜI GIAN ĐÓN',
      'booking.sunrise': 'BÌNH MINH',
      'booking.sunset': 'HOÀNG HÔN',
      'booking.labelGuests': 'Số Người',
      'booking.labelNotes': 'Ghi Chú',
      'booking.placeholderNotes': 'Điểm đón, yêu cầu đặc biệt...',
      'booking.unitPrice': 'Đơn giá:',
      'booking.totalPrice': 'Tổng Tiền:',
      'booking.bookWhatsapp': 'Đặt qua WhatsApp',
      'booking.bookZalo': 'Đặt qua Zalo',
      'booking.or': 'hoặc',
      'booking.callPhone': 'Gọi Điện Thoại',
      'cal.sun': 'CN', 'cal.mon': 'T2', 'cal.tue': 'T3', 'cal.wed': 'T4', 'cal.thu': 'T5', 'cal.fri': 'T6', 'cal.sat': 'T7',
      'booking.labelHotel': 'Tên Khách Sạn/Resort',
      'booking.placeholderHotel': 'Tìm tên khách sạn/resort...',
      'booking.labelCustomHotel': 'Tên Khách Sạn/Resort Của Bạn',
      'booking.placeholderCustomHotel': 'Nhập tên khách sạn/resort...',
      'booking.labelHotelAddress': 'Địa Chỉ Khách Sạn/Resort',
      'booking.placeholderHotelAddress': 'Địa chỉ khách sạn/resort của bạn',
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
      'about.eyebrow': 'Why Choose Mr. Ben?',
      'about.title1': 'Experience',
      'about.titleGold': '5-Star Service',
      'about.subtitle': 'We combine local expertise with premium comfort, making every dune and coastline an unforgettable memory.',
      'tours.eyebrow': 'Premium Experience',
      'tours.title1': 'Jeep Tours',
      'tours.titleGold': 'Luxury',
      'tours.subtitle': 'Handcrafted itineraries that showcase the very best of Mũi Né and Phan Thiết.',
      'gallery.eyebrow': 'Wonderful Moments',
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
      'hero.scroll': 'Scroll Down',
      'contact.call': 'Call Us',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': 'Your premier partner for luxury off-road adventures across the stunning landscapes of Mũi Né and Phan Thiết, Vietnam.',
      'footer.quickLinks': 'Quick Links',
      'footer.contactInfo': 'Contact Info',
      'footer.hours': 'Open Daily: 4:00 – 21:00',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. All Rights Reserved.',
      'booking.datePlaceholder': 'Select departure date & time',
      'tour.meta.hours': '4 Hours',
      'tour.meta.people': '4-6 People',
      'tour.meta.time': 'Sunrise/Sunset',
      'tour.meta.type': 'Private/Group',
      'tour.price.private': 'Private',
      'tour.price.group': 'Group Tour',
      'tour.price.per': '/person',
      'tour.red.title': 'Red Jeep',
      'tour.red.desc': 'The blazing red Jeep stands out among the sand dunes — the perfect choice for a breathtaking sunrise or sunset adventure.',
      'tour.orange.title': 'Orange Jeep',
      'tour.orange.desc': 'As vibrant as a sunset glow — conquer the red sand dunes and stunning coastal scenery with the orange Jeep.',
      'tour.pink.title': 'Pink Jeep',
      'tour.pink.desc': 'Stylish, bold and full of color — your journey on the pink Jeep will give you incredible photos to remember.',
      'tour.white.title': 'White Jeep',
      'tour.white.desc': 'Elegant and refined — the premium white Jeep takes you to all the highlights: White Sand Dunes, Fairy Stream, Lighthouse.',
      'tour.gold.title': 'Gold Jeep',
      'tour.gold.desc': 'Golden yellow symbolizing Mũi Né sunshine — an iconic experience you cannot miss when visiting Phan Thiết.',
      'tour.blue.title': 'Blue Jeep',
      'tour.blue.desc': 'Cool ocean blue — explore fishing villages, beaches and the scenic dune roads with the blue Jeep.',
      'tour.green.title': 'Green Jeep',
      'tour.green.desc': 'Blend into nature with the green Jeep — traverse sand dune terrain, pine forests and wild off-road trails.',
      'booking.pricePrivate': 'Private Tour',
      'booking.priceGroup': 'Group Tour',
      'booking.labelName': 'Full Name',
      'booking.placeholderName': 'Enter your name',
      'booking.labelPhone': 'Phone Number',
      'booking.placeholderPhone': 'Enter phone number',
      'booking.labelTourType': 'Tour Type',
      'booking.typePrivate': 'Private Tour',
      'booking.typeGroup': 'Group Tour',
      'booking.labelDatetime': 'Departure Date & Time',
      'booking.pickupTime': 'PICKUP TIME',
      'booking.sunrise': 'SUNRISE',
      'booking.sunset': 'SUNSET',
      'booking.labelGuests': 'Number of People',
      'booking.labelNotes': 'Notes',
      'booking.placeholderNotes': 'Pickup point, special requests...',
      'booking.unitPrice': 'Unit price:',
      'booking.totalPrice': 'Total:',
      'booking.bookWhatsapp': 'Book via WhatsApp',
      'booking.bookZalo': 'Book via Zalo',
      'booking.or': 'or',
      'booking.callPhone': 'Call Us',
      'cal.sun': 'Su', 'cal.mon': 'Mo', 'cal.tue': 'Tu', 'cal.wed': 'We', 'cal.thu': 'Th', 'cal.fri': 'Fr', 'cal.sat': 'Sa',
      'booking.labelHotel': 'Hotel/Resort Name',
      'booking.placeholderHotel': 'Search hotel/resort name...',
      'booking.labelHotelAddress': 'Hotel/Resort Address',
      'booking.placeholderHotelAddress': 'Your hotel/resort address...',
      'booking.labelCustomHotel': 'Your Hotel/Resort Name',
      'booking.placeholderCustomHotel': 'Enter hotel/resort name...',
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
      'about.eyebrow': 'Почему стоит выбрать Mr. Ben?',
      'about.title1': 'Испытайте сервис',
      'about.titleGold': '5-звездочный',
      'about.subtitle': 'Мы сочетаем местную экспертизу с премиальным комфортом, превращая каждую дюну и берег в незабываемое воспоминание.',
      'tours.eyebrow': 'Премиум Опыт',
      'tours.title1': 'Джип-туры',
      'tours.titleGold': 'Лучшие',
      'tours.subtitle': 'Индивидуальные маршруты, демонстрирующие лучшее из Муй Не и Фан Тхиета.',
      'gallery.eyebrow': 'Замечательные Моменты',
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
      'hero.scroll': 'Прокрутить Вниз',
      'contact.call': 'Позвонить',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': 'Ваш главный партнёр для премиумных внедорожных приключений по живописным пейзажам Муй Не и Фан Тхиет.',
      'footer.quickLinks': 'Быстрые Ссылки',
      'footer.contactInfo': 'Контактная Информация',
      'footer.hours': 'Ежедневно: 4:00 – 21:00',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. Все права защищены.',
      'booking.datePlaceholder': 'Выберите дату и время отправления',
      'tour.meta.hours': '4 Часа',
      'tour.meta.people': '4-6 Человек',
      'tour.meta.time': 'Рассвет/Закат',
      'tour.meta.type': 'Частный/Групповой',
      'tour.price.private': 'Частный',
      'tour.price.group': 'Групповой',
      'tour.price.per': '/чел.',
      'tour.red.title': 'Красный Джип',
      'tour.red.desc': 'Ярко-красный Джип выделяется среди песчаных дюн — идеальный выбор для захватывающего приключения на рассвете или закате.',
      'tour.orange.title': 'Оранжевый Джип',
      'tour.orange.desc': 'Яркий, как закатное небо — покорите красные дюны и потрясающие прибрежные пейзажи на оранжевом Джипе.',
      'tour.pink.title': 'Розовый Джип',
      'tour.pink.desc': 'Стильный, смелый и яркий — поездка на розовом Джипе подарит вам незабываемые фотографии.',
      'tour.white.title': 'Белый Джип',
      'tour.white.desc': 'Элегантный и утончённый — премиальный белый Джип провезёт вас по главным достопримечательностям: Белые дюны, Сказочный ручей, Маяк.',
      'tour.gold.title': 'Золотой Джип',
      'tour.gold.desc': 'Золотой цвет символизирует солнце Муй Не — незабываемый опыт, который нельзя пропустить во Фан Тхиете.',
      'tour.blue.title': 'Синий Джип',
      'tour.blue.desc': 'Прохладный морской синий — исследуйте рыбацкие деревни, пляжи и живописные дюнные дороги на синем Джипе.',
      'tour.green.title': 'Зелёный Джип',
      'tour.green.desc': 'Слейтесь с природой на зелёном Джипе — преодолейте рельеф дюн, сосновые леса и дикие бездорожные трассы.',
      'booking.pricePrivate': 'Частный Тур',
      'booking.priceGroup': 'Групповой Тур',
      'booking.labelName': 'Полное Имя',
      'booking.placeholderName': 'Введите ваше имя',
      'booking.labelPhone': 'Номер Телефона',
      'booking.placeholderPhone': 'Введите номер телефона',
      'booking.labelTourType': 'Тип Тура',
      'booking.typePrivate': 'Частный Тур',
      'booking.typeGroup': 'Групповой Тур',
      'booking.labelDatetime': 'Дата и Время Отправления',
      'booking.pickupTime': 'ВРЕМЯ ПОСАДКИ',
      'booking.sunrise': 'РАССВЕТ',
      'booking.sunset': 'ЗАКАТ',
      'booking.labelGuests': 'Количество Людей',
      'booking.labelNotes': 'Примечания',
      'booking.placeholderNotes': 'Место посадки, особые пожелания...',
      'booking.unitPrice': 'Цена:',
      'booking.totalPrice': 'Итого:',
      'booking.bookWhatsapp': 'Забронировать WhatsApp',
      'booking.bookZalo': 'Забронировать через Zalo',
      'booking.or': 'или',
      'booking.callPhone': 'Позвонить',
      'cal.sun': 'Вс', 'cal.mon': 'Пн', 'cal.tue': 'Вт', 'cal.wed': 'Ср', 'cal.thu': 'Чт', 'cal.fri': 'Пт', 'cal.sat': 'Сб',
      'booking.labelHotel': 'Название Отеля/Курорта',
      'booking.placeholderHotel': 'Поиск отеля/курорта...',
      'booking.labelHotelAddress': 'Адрес Отеля/Курорта',
      'booking.placeholderHotelAddress': 'Адрес отеля/курорта...',
      'booking.labelCustomHotel': 'Название Вашего Отеля/Курорта',
      'booking.placeholderCustomHotel': 'Введите название отеля/курорта...',
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
      'about.eyebrow': '为什么选择Mr. Ben?',
      'about.title1': '体验',
      'about.titleGold': '5星级服务',
      'about.subtitle': '我们将当地专业知识与高端舒适体验相结合，让每一片沙丘和海岸线都成为难忘的记忆。',
      'tours.eyebrow': '豪华吉普游',
      'tours.title1': '吉普游',
      'tours.titleGold': '奢华',
      'tours.subtitle': '精心设计的行程，带您领略美奈和藩切最美丽的风光。',
      'gallery.eyebrow': '精彩瞬间',
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
      'feat.safeTitle': '安全 & 全险保险',
      'feat.safeDesc': '全程旅游保险、安全说明以及应急装备，每一足旅程留心有保障。',
      'hero.scroll': '向下滚动',
      'contact.call': '电话联系',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': '您高端越野决驾的首选伴侣，带您领略美奈和藩切绺丽的自然风光。',
      'footer.quickLinks': '快速链接',
      'footer.contactInfo': '联系信息',
      'footer.hours': '每日开放: 4:00 – 21:00',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. 版权所有。',
      'booking.datePlaceholder': '选择出发日期和时间',
      'tour.meta.hours': '4小时',
      'tour.meta.people': '4-6人',
      'tour.meta.time': '日出/日落',
      'tour.meta.type': '私家/拼团',
      'tour.price.private': '私家',
      'tour.price.group': '拼团',
      'tour.price.per': '/人',
      'tour.red.title': '红色吉普',
      'tour.red.desc': '鲜红的吉普车在沙丘中格外耀眼——日出或日落探险的完美之选。',
      'tour.orange.title': '橙色吉普',
      'tour.orange.desc': '如晚霞般绚烂——乘坐橙色吉普征服红色沙丘和壮丽的海岸风光。',
      'tour.pink.title': '粉色吉普',
      'tour.pink.desc': '时尚、大胆、色彩缤纷——粉色吉普之旅将为您留下精彩绝伦的照片。',
      'tour.white.title': '白色吉普',
      'tour.white.desc': '优雅精致——高端白色吉普带您游览所有亮点：白沙丘、仙女溪、灯塔。',
      'tour.gold.title': '金色吉普',
      'tour.gold.desc': '金黄色象征着美奈的阳光——来藩切必体验的标志性之旅。',
      'tour.blue.title': '蓝色吉普',
      'tour.blue.desc': '清凉的海洋蓝——乘蓝色吉普探索渔村、海滩和诗情画意的沙丘小路。',
      'tour.green.title': '绿色吉普',
      'tour.green.desc': '乘绿色吉普融入自然——穿越沙丘地形、松树林和狂野越野小道。',
      'booking.pricePrivate': '私家游',
      'booking.priceGroup': '拼团游',
      'booking.labelName': '姓名',
      'booking.placeholderName': '请输入您的姓名',
      'booking.labelPhone': '电话号码',
      'booking.placeholderPhone': '请输入电话号码',
      'booking.labelTourType': '游览类型',
      'booking.typePrivate': '私家游',
      'booking.typeGroup': '拼团游',
      'booking.labelDatetime': '出发日期和时间',
      'booking.pickupTime': '接送时间',
      'booking.sunrise': '日出',
      'booking.sunset': '日落',
      'booking.labelGuests': '人数',
      'booking.labelNotes': '备注',
      'booking.placeholderNotes': '上车地点，特殊需求...',
      'booking.unitPrice': '单价：',
      'booking.totalPrice': '总价：',
      'booking.bookWhatsapp': '通过WhatsApp预订',
      'booking.bookZalo': '通过Zalo预订',
      'booking.or': '或',
      'booking.callPhone': '致电我们',
      'cal.sun': '日', 'cal.mon': '一', 'cal.tue': '二', 'cal.wed': '三', 'cal.thu': '四', 'cal.fri': '五', 'cal.sat': '六',
      'booking.labelHotel': '酒店/度假村名称',
      'booking.placeholderHotel': '搜索酒店/度假村名称...',
      'booking.labelHotelAddress': '酒店/度假村地址',
      'booking.placeholderHotelAddress': '酒店/度假村地址...',
      'booking.labelCustomHotel': '您的酒店/度假村名称',
      'booking.placeholderCustomHotel': '请输入酒店/度假村名称...',
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
      'about.eyebrow': '왜 Mr. Ben을 선택해야 할까요?',
      'about.title1': '경험',
      'about.titleGold': '5성급 서비스',
      'about.subtitle': '현지 전문 지식과 프리미엄 편안함을 결합하여 모든 모래 언덕과 해안선을 잊지 못할 추억으로 만듭니다.',
      'tours.eyebrow': '프리미엄 경험',
      'tours.title1': '지프 투어',
      'tours.titleGold': '럭셔리',
      'tours.subtitle': '무이네와 판티엣 최고의 명소를 소개하는 맞춤형 여정.',
      'gallery.eyebrow': '멋진 순간들',
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
      'hero.scroll': '아래로 스크롤',
      'contact.call': '전화 문의',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': '무이네와 판티엣의 화려한 자연 환경을 다루는 프리미엄 투어의 비즈니스 파트너.',
      'footer.quickLinks': '빠른 링크',
      'footer.contactInfo': '연락체',
      'footer.hours': '매일 영업: 4:00 – 21:00',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. 모든 권리 보유.',
      'booking.datePlaceholder': '출발 날짜와 시간 선택',
      'tour.meta.hours': '4시간',
      'tour.meta.people': '4-6명',
      'tour.meta.time': '일출/일몰',
      'tour.meta.type': '단독/합승',
      'tour.price.private': '단독',
      'tour.price.group': '합승 투어',
      'tour.price.per': '/인',
      'tour.red.title': '레드 지프',
      'tour.red.desc': '모래 언덕 사이에서 빛나는 빨간 지프 — 일출이나 일몰 어드벤처에 완벽한 선택.',
      'tour.orange.title': '오렌지 지프',
      'tour.orange.desc': '석양처럼 선명한 오렌지색 — 붉은 모래 언덕과 멋진 해안 풍경을 오렌지 지프로 정복하세요.',
      'tour.pink.title': '핑크 지프',
      'tour.pink.desc': '스타일리시하고 개성 넘치며 다채로운 — 핑크 지프 여행은 잊지 못할 사진을 선사합니다.',
      'tour.white.title': '화이트 지프',
      'tour.white.desc': '우아하고 세련된 — 프리미엄 흰색 지프가 주요 명소를 안내합니다: 화이트 샌드 듄, 요정 계곡, 등대.',
      'tour.gold.title': '골드 지프',
      'tour.gold.desc': '금빛은 무이네의 햇살을 상징 — 판티엣 방문 시 절대 놓칠 수 없는 상징적인 경험.',
      'tour.blue.title': '블루 지프',
      'tour.blue.desc': '시원한 바다 블루 — 파란 지프로 어촌마을, 해변, 아름다운 모래 언덕 길을 탐험하세요.',
      'tour.green.title': '그린 지프',
      'tour.green.desc': '녹색 지프와 함께 자연 속으로 — 모래 언덕 지형, 소나무 숲, 야생 비포장 도로를 달려보세요.',
      'booking.pricePrivate': '단독 투어',
      'booking.priceGroup': '합승 투어',
      'booking.labelName': '성명',
      'booking.placeholderName': '이름을 입력하세요',
      'booking.labelPhone': '전화번호',
      'booking.placeholderPhone': '전화번호를 입력하세요',
      'booking.labelTourType': '투어 유형',
      'booking.typePrivate': '단독 투어',
      'booking.typeGroup': '합승 투어',
      'booking.labelDatetime': '출발 날짜 및 시간',
      'booking.pickupTime': '픽업 시간',
      'booking.sunrise': '일출',
      'booking.sunset': '일몰',
      'booking.labelGuests': '인원수',
      'booking.labelNotes': '메모',
      'booking.placeholderNotes': '픽업 장소, 특별 요청...',
      'booking.unitPrice': '단가:',
      'booking.totalPrice': '합계:',
      'booking.bookWhatsapp': 'WhatsApp으로 예약',
      'booking.bookZalo': 'Zalo로 예약',
      'booking.or': '또는',
      'booking.callPhone': '전화 문의',
      'cal.sun': '일', 'cal.mon': '월', 'cal.tue': '화', 'cal.wed': '수', 'cal.thu': '목', 'cal.fri': '금', 'cal.sat': '토',
      'booking.labelHotel': '호텔/리조트 이름',
      'booking.placeholderHotel': '호텔/리조트 이름 검색...',
      'booking.labelHotelAddress': '호텔/리조트 주소',
      'booking.placeholderHotelAddress': '호텔/리조트 주소...',
      'booking.labelCustomHotel': '호텔/리조트 이름 입력',
      'booking.placeholderCustomHotel': '호텔/리조트 이름을 입력하세요...',
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
      'about.eyebrow': 'Warum Mr. Ben wählen?',
      'about.title1': 'Erleben Sie',
      'about.titleGold': '5-Sterne-Service',
      'about.subtitle': 'Wir verbinden lokales Know-how mit Premium-Komfort und machen jede Düne und Küste zu einer unvergesslichen Erinnerung.',
      'tours.eyebrow': 'Premium-Erlebnis',
      'tours.title1': 'Jeep-Touren',
      'tours.titleGold': 'Luxus',
      'tours.subtitle': 'Maßgeschneiderte Itinerare, die das Beste von Mũi Né und Phan Thiết zeigen.',
      'gallery.eyebrow': 'Wunderbare Momente',
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
      'hero.scroll': 'Nach Unten Scrollen',
      'contact.call': 'Anrufen',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': 'Ihr Premium-Partner für Geländeabenteuer durch die atemberaubenden Landschaften von Mũi Né und Phan Thiết.',
      'footer.quickLinks': 'Schnelllinks',
      'footer.contactInfo': 'Kontaktinformationen',
      'footer.hours': 'Täglich geöffnet: 4:00 – 21:00',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. Alle Rechte vorbehalten.',
      'booking.datePlaceholder': 'Abfahrtsdatum & Uhrzeit wählen',
      'tour.meta.hours': '4 Stunden',
      'tour.meta.people': '4-6 Personen',
      'tour.meta.time': 'Sonnenaufgang/Untergang',
      'tour.meta.type': 'Privat/Gruppe',
      'tour.price.private': 'Privat',
      'tour.price.group': 'Gruppenreise',
      'tour.price.per': '/Person',
      'tour.red.title': 'Roter Jeep',
      'tour.red.desc': 'Der feurig rote Jeep sticht zwischen den Sanddünen hervor — die perfekte Wahl für ein atemberaubendes Abenteuer bei Sonnenaufgang oder Sonnenuntergang.',
      'tour.orange.title': 'Oranger Jeep',
      'tour.orange.desc': 'So leuchtend wie ein Sonnenuntergang — bezwingen Sie die roten Dünen und die atemberaubende Küstenlandschaft mit dem orangen Jeep.',
      'tour.pink.title': 'Pinker Jeep',
      'tour.pink.desc': 'Stilvoll, mutig und farbenfroh — Ihre Fahrt mit dem pinken Jeep liefert unvergessliche Fotos.',
      'tour.white.title': 'Weißer Jeep',
      'tour.white.desc': 'Elegant und raffiniert — der Premium-weiße Jeep führt Sie zu allen Highlights: Weiße Sanddünen, Feenbach, Leuchtturm.',
      'tour.gold.title': 'Goldener Jeep',
      'tour.gold.desc': 'Goldgelb symbolisiert den Sonnenschein von Mũi Né — ein Wahrzeichen-Erlebnis, das Sie in Phan Thiết nicht verpassen dürfen.',
      'tour.blue.title': 'Blauer Jeep',
      'tour.blue.desc': 'Kühles Meeresblau — erkunden Sie Fischerdörfer, Strände und malerische Dünenstraßen mit dem blauen Jeep.',
      'tour.green.title': 'Grüner Jeep',
      'tour.green.desc': 'Verschmelzen Sie mit der Natur im grünen Jeep — durchqueren Sie Dünengelände, Pinienwald und wilde Offroad-Pfade.',
      'booking.pricePrivate': 'Private Tour',
      'booking.priceGroup': 'Gruppenreise',
      'booking.labelName': 'Vollständiger Name',
      'booking.placeholderName': 'Geben Sie Ihren Namen ein',
      'booking.labelPhone': 'Telefonnummer',
      'booking.placeholderPhone': 'Telefonnummer eingeben',
      'booking.labelTourType': 'Tourart',
      'booking.typePrivate': 'Private Tour',
      'booking.typeGroup': 'Gruppenreise',
      'booking.labelDatetime': 'Abfahrtsdatum & Uhrzeit',
      'booking.pickupTime': 'ABHOLZEIT',
      'booking.sunrise': 'SONNENAUFGANG',
      'booking.sunset': 'SONNENUNTERGANG',
      'booking.labelGuests': 'Personenanzahl',
      'booking.labelNotes': 'Anmerkungen',
      'booking.placeholderNotes': 'Abholort, besondere Wünsche...',
      'booking.unitPrice': 'Preis:',
      'booking.totalPrice': 'Gesamt:',
      'booking.bookWhatsapp': 'Via WhatsApp buchen',
      'booking.bookZalo': 'Via Zalo buchen',
      'booking.or': 'oder',
      'booking.callPhone': 'Anrufen',
      'cal.sun': 'So', 'cal.mon': 'Mo', 'cal.tue': 'Di', 'cal.wed': 'Mi', 'cal.thu': 'Do', 'cal.fri': 'Fr', 'cal.sat': 'Sa',
      'booking.labelHotel': 'Hotel/Resort Name',
      'booking.placeholderHotel': 'Hotel/Resortname suchen...',
      'booking.labelHotelAddress': 'Hotel/Resort Adresse',
      'booking.placeholderHotelAddress': 'Hotel/Resort Adresse...',
      'booking.labelCustomHotel': 'Ihr Hotel/Resort Name',
      'booking.placeholderCustomHotel': 'Hotel/Resortnamen eingeben...',
    }

  };
  window.__MRB_TRANS = TRANSLATIONS; // expose for other IIFEs

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
   Infinite loop: last → first, first → last.
   ============================================================ */
(function () {
  'use strict';

  const MOBILE_BP = 680;
  const LOOP_DELAY = 800; // ms pause at last card before looping back

  const grid = document.getElementById('toursGrid');
  const dotsEl = document.getElementById('toursDots');
  const btnPrev = document.querySelector('.tours-arrow-prev');
  const btnNext = document.querySelector('.tours-arrow-next');

  if (!grid || !dotsEl || !btnPrev || !btnNext) return;

  let cards = [];
  let currentIdx = 0;
  let isMobile = false;
  let loopTimeout = null;

  /* ─── Build dots ─────────────────────────────────────────── */
  function buildDots() {
    dotsEl.innerHTML = '';
    cards.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'tours-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Sản phẩm ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsEl.appendChild(dot);
    });
  }

  /* ─── Update active dot ──────────────────────────────────── */
  function updateUI(idx) {
    currentIdx = idx;
    dotsEl.querySelectorAll('.tours-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
    // Buttons never disabled — they loop
    btnPrev.disabled = false;
    btnNext.disabled = false;
  }

  /* ─── Scroll to card by index ────────────────────────────── */
  function goTo(idx, instant) {
    clearTimeout(loopTimeout);
    const card = cards[idx];
    if (!card) return;
    grid.scrollTo({
      left: card.offsetLeft - grid.offsetLeft,
      behavior: instant ? 'instant' : 'smooth'
    });
    updateUI(idx);
  }

  /* ─── Arrow clicks with loop ─────────────────────────────── */
  btnPrev.addEventListener('click', function () {
    const prev = (currentIdx - 1 + cards.length) % cards.length;
    goTo(prev);
  });

  btnNext.addEventListener('click', function () {
    const next = (currentIdx + 1) % cards.length;
    goTo(next);
  });

  /* ─── Touch intercept: exactly 1 card per swipe ─────────── */
  var touchStartX = 0;
  var touchStartY = 0;
  var touchDir = null; // 'h' | 'v' | null

  function onTouchStart(e) {
    clearTimeout(loopTimeout);
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchDir = null;
  }

  function onTouchMove(e) {
    var dx = e.touches[0].clientX - touchStartX;
    var dy = e.touches[0].clientY - touchStartY;
    if (!touchDir) {
      touchDir = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
    }
    // Block native horizontal scroll so we control it completely
    if (touchDir === 'h') {
      e.preventDefault();
    }
  }

  function onTouchEnd(e) {
    if (touchDir !== 'h') return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 30) {
      if (dx < 0) {
        // swipe left → next
        var next = (currentIdx + 1) % cards.length;
        goTo(next);
        // auto-loop: if just went to last card, queue return
        if (next === cards.length - 1) {
          loopTimeout = setTimeout(function () { goTo(0); }, LOOP_DELAY);
        }
      } else {
        // swipe right → prev
        goTo((currentIdx - 1 + cards.length) % cards.length);
      }
    }
    touchDir = null;
  }

  /* ─── Init / Destroy ─────────────────────────────────────── */
  function init() {
    cards = Array.from(grid.querySelectorAll('.tour-card'));
    buildDots();
    updateUI(0);
    grid.addEventListener('touchstart', onTouchStart, { passive: true });
    grid.addEventListener('touchmove', onTouchMove, { passive: false });
    grid.addEventListener('touchend', onTouchEnd, { passive: true });
  }

  function destroy() {
    dotsEl.innerHTML = '';
    grid.removeEventListener('touchstart', onTouchStart);
    grid.removeEventListener('touchmove', onTouchMove);
    grid.removeEventListener('touchend', onTouchEnd);
    clearTimeout(loopTimeout);
    currentIdx = 0;
  }

  /* ─── Responsive toggle ──────────────────────────────────── */
  function check() {
    const mobile = window.innerWidth <= MOBILE_BP;
    if (mobile && !isMobile) { isMobile = true; init(); }
    else if (!mobile && isMobile) { isMobile = false; destroy(); }
  }

  check();
  window.addEventListener('resize', check, { passive: true });

})();

/* ============================================================
   BOOKING MODAL
   ============================================================ */
(function () {
  'use strict';

  /* ── Prices (VND, raw numbers) ── */
  var PRICE_PRIVATE = 450000;
  var PRICE_GROUP = 120000;

  /* ── State ── */
  var tourType = 'private'; // 'private' | 'group'
  var guests = 1;
  var tourName = 'Xe Jeep Mr. Ben';
  var pricePrivate = PRICE_PRIVATE;
  var priceGroup = PRICE_GROUP;

  /* ── Element refs ── */
  var overlay = document.getElementById('bookingOverlay');
  var closeBtn = document.getElementById('bookingClose');
  var tourNameEl = document.getElementById('bookingTourName');
  var bpbPrivate = document.getElementById('bpbPrivate');
  var bpbGroup = document.getElementById('bpbGroup');
  var btnPrivate = document.getElementById('bfTypePrivate');
  var btnGroup = document.getElementById('bfTypeGroup');
  var guestGroup = document.getElementById('bfGuestGroup');
  var guestVal = document.getElementById('bfGuestVal');
  var minusBtn = document.getElementById('bfMinus');
  var plusBtn = document.getElementById('bfPlus');
  var unitPriceEl = document.getElementById('bfUnitPrice');
  var totalEl = document.getElementById('bfTotal');
  var waBtn = document.getElementById('bfWhatsApp');
  var dtInput = document.getElementById('bfDatetime');

  if (!overlay) return;

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

  function updatePrice() {
    var unit = tourType === 'private' ? pricePrivate : priceGroup;
    var count = tourType === 'group' ? guests : 1;
    unitPriceEl.textContent = fmt(unit);
    totalEl.textContent = fmt(unit * count);
  }

  function setTourType(type) {
    tourType = type;
    if (type === 'private') {
      btnPrivate.classList.add('active');
      btnGroup.classList.remove('active');
      guestGroup.style.display = 'none';
    } else {
      btnGroup.classList.add('active');
      btnPrivate.classList.remove('active');
      guestGroup.style.display = '';
    }
    updatePrice();
  }

  function buildWAMessage() {
    var name = document.getElementById('bfName').value.trim();
    var phone = document.getElementById('bfPhone').value.trim();
    var dt = dtInput.value ? dtInput.value.replace('T', ' ') : '—';
    var notes = document.getElementById('bfNotes').value.trim();
    var typeStr = tourType === 'private' ? 'Tour Riêng Tư' : 'Tour Ghép (' + guests + ' người)';
    var total = tourType === 'private' ? fmt(pricePrivate) : fmt(priceGroup * guests);

    var msg = '🏕️ *ĐẶT TOUR MR. BEN JEEP TOURS*\n'
      + '━━━━━━━━━━━━━━━━━━━━━\n'
      + '🚙 Tour: ' + tourName + '\n'
      + '📋 Loại: ' + typeStr + '\n'
      + '👤 Họ tên: ' + (name || '—') + '\n'
      + '📞 SĐT: +84' + (phone.replace(/^0/, '') || '—') + '\n'
      + '📅 Ngày & Giờ: ' + dt + '\n'
      + '💵 Tổng tiền: ' + total + '\n'
      + (notes ? '📝 Ghi chú: ' + notes + '\n' : '')
      + '━━━━━━━━━━━━━━━━━━━━━';
    return encodeURIComponent(msg);
  }

  function refreshWALink() {
    waBtn.href = 'https://wa.me/84913140196?text=' + buildWAMessage();
  }

  /* ── Open modal ── */
  function openBooking(data) {
    tourName = data.name || 'Xe Jeep Mr. Ben';
    pricePrivate = data.private || PRICE_PRIVATE;
    priceGroup = data.group || PRICE_GROUP;

    tourNameEl.textContent = tourName;
    bpbPrivate.textContent = fmt(pricePrivate);
    bpbGroup.innerHTML = fmt(priceGroup) + ' <span class="bpb-per">/người</span>';

    // Reset form
    document.getElementById('bfName').value = '';
    document.getElementById('bfPhone').value = '';
    document.getElementById('bfNotes').value = '';
    guests = 1;
    guestVal.textContent = '1';
    setDefaultDatetime();
    setTourType('private');
    refreshWALink();

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('mrben-booking-open'));
  }

  function closeBooking() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Bind all "Book Now" buttons on tour cards ── */
  document.querySelectorAll('.tour-card .btn-gold').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var card = btn.closest('.tour-card');
      var nameStr = card.querySelector('.tour-title') ? card.querySelector('.tour-title').textContent.trim() : 'Xe Jeep Mr. Ben';
      var tiers = card.querySelectorAll('.price-amount');
      var pvt = PRICE_PRIVATE, grp = PRICE_GROUP;
      if (tiers.length >= 2) {
        pvt = parseInt(tiers[0].textContent.replace(/[^0-9]/g, '')) || PRICE_PRIVATE;
        grp = parseInt(tiers[1].textContent.replace(/[^0-9]/g, '')) || PRICE_GROUP;
      }
      openBooking({ name: nameStr, private: pvt, group: grp });
    });
  });

  /* Bind nav "Book Now" (header CTA) — generic open */
  document.querySelectorAll('.nav-cta').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openBooking({ name: 'Xe Jeep Mr. Ben', private: PRICE_PRIVATE, group: PRICE_GROUP });
    });
  });

  /* ── Close ── */
  closeBtn.addEventListener('click', closeBooking);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeBooking();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeBooking();
  });

  /* ── Tour type toggle ── */
  btnPrivate.addEventListener('click', function () { setTourType('private'); });
  btnGroup.addEventListener('click', function () { setTourType('group'); });

  /* ── Guest counter ── */
  minusBtn.addEventListener('click', function () {
    if (guests > 1) { guests--; guestVal.textContent = guests; updatePrice(); }
  });
  plusBtn.addEventListener('click', function () {
    if (guests < 4) { guests++; guestVal.textContent = guests; updatePrice(); }
  });

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

  function setPhoneCode(langOrCode) {
    var entry = LANG_CODE_MAP[langOrCode];
    if (!entry) {
      // maybe it's a raw code like '+7'
      for (var k in LANG_CODE_MAP) {
        if (LANG_CODE_MAP[k].code === langOrCode) { entry = LANG_CODE_MAP[k]; break; }
      }
    }
    if (!entry) return;
    selectedPhoneCode = entry.code;
    if (codeFlag) { codeFlag.src = entry.flag; }
    if (codeText) { codeText.textContent = entry.code; }
    // Mark active option
    codeOpts.forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-code') === entry.code);
    });
    refreshWALink();
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

  /* ── Auto-sync phone code with website language ────────────── */
  // Hook into the global switchLanguage call via a custom event
  document.addEventListener('mrben-langchange', function (e) {
    setPhoneCode(e.detail.lang);
  });

  /* ── Refresh WA link on any input change ── */
  ['bfName', 'bfPhone', 'bfDatetime', 'bfNotes'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', refreshWALink);
  });

  // Override buildWAMessage to use selectedPhoneCode
  function buildWAMessage() {
    var name = document.getElementById('bfName').value.trim();
    var phone = document.getElementById('bfPhone').value.trim();
    var dt = dtInput.value ? dtInput.value.replace('T', ' ') : '—';
    var notes = document.getElementById('bfNotes').value.trim();
    var typeStr = tourType === 'private' ? 'Tour Riêng Tư' : 'Tour Ghép (' + guests + ' người)';
    var total = tourType === 'private' ? fmt(pricePrivate) : fmt(priceGroup * guests);
    var fullPhone = selectedPhoneCode + (phone ? ' ' + phone : '—');

    var msg = '🏕️ *ĐẶT TOUR MR. BEN JEEP TOURS*\n'
      + '━━━━━━━━━━━━━━━━━━━━━\n'
      + '🚙 Tour: ' + tourName + '\n'
      + '📋 Loại: ' + typeStr + '\n'
      + '👤 Họ tên: ' + (name || '—') + '\n'
      + '📞 SĐT: ' + fullPhone + '\n'
      + '📅 Ngày & Giờ: ' + dt + '\n'
      + '💵 Tổng tiền: ' + total + '\n'
      + (notes ? '📝 Ghi chú: ' + notes + '\n' : '')
      + '━━━━━━━━━━━━━━━━━━━━━';
    return encodeURIComponent(msg);
  }

  function refreshWALink() {
    waBtn.href = 'https://wa.me/84913140196?text=' + buildWAMessage();
  }

})();

/* ============================================================
   CUSTOM DATE & TIME PICKER
   ============================================================ */
(function () {
  'use strict';

  var dtWrap = document.querySelector('.bf-dt-wrap');
  var dtTrigger = document.getElementById('bfDtTrigger');
  var dtDisplay = document.getElementById('bfDtDisplay');
  var dtHidden = document.getElementById('bfDatetime');

  var calView = document.getElementById('bfCalView');
  var tpView = document.getElementById('bfTpView');
  var calTitle = document.getElementById('bfCalTitle');
  var calDays = document.getElementById('bfCalDays');
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

  if (!dtWrap) return;

  var todayDate = new Date(); todayDate.setHours(0, 0, 0, 0);
  var curYear = todayDate.getFullYear();
  var curMonth = todayDate.getMonth();
  var selDate = null;
  var selHour = 5;
  var selMin = 0;
  var MINS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  var VN_MONTHS = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ── Calendar ── */
  function renderCalendar() {
    calTitle.textContent = VN_MONTHS[curMonth] + ' ' + curYear;
    calDays.innerHTML = '';
    var firstDay = new Date(curYear, curMonth, 1).getDay();
    var daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
    var daysInPrev = new Date(curYear, curMonth, 0).getDate();

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
      if (dt < todayDate) el.classList.add('disabled');
      if (dt.getTime() === todayDate.getTime()) el.classList.add('today');
      if (selDate && dt.getTime() === selDate.getTime()) el.classList.add('selected');
      if (!el.classList.contains('disabled')) {
        (function (date) { el.addEventListener('click', function () { pickDate(date); }); })(dt);
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

  function pickDate(date) {
    selDate = date;
    calView.style.display = 'none';
    tpView.style.display = '';
    tpDate.textContent = date.getDate() + ' ' + VN_MONTHS[date.getMonth()];
    // Reset slot selection UI
    [sunriseBtn, sunsetBtn].forEach(function (b) { b && b.classList.remove('selected'); });
    // Re-highlight the previously selected slot
    if (selHour === 4 && selMin === 30) { sunriseBtn && sunriseBtn.classList.add('selected'); }
    if (selHour === 13 && selMin === 30) { sunsetBtn && sunsetBtn.classList.add('selected'); }
  }

  calPrev.addEventListener('click', function () {
    if (--curMonth < 0) { curMonth = 11; curYear--; } renderCalendar();
  });
  calNext.addEventListener('click', function () {
    if (++curMonth > 11) { curMonth = 0; curYear++; } renderCalendar();
  });

  tpBack.addEventListener('click', function () {
    tpView.style.display = 'none'; calView.style.display = ''; renderCalendar();
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
    var label = (hour === 4 ? 'Bình Minh' : 'Hoàng Hôn');
    dtDisplay.textContent = d + '/' + pad(mo) + '/' + y + ' | ' + label + ' (' + pad(hour) + ':' + pad(min) + ')';
    dtTrigger.classList.add('has-value');
    closePicker();
    dtHidden.dispatchEvent(new Event('input'));
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
    calView.style.display = '';
    tpView.style.display = 'none';
    renderCalendar();
  }
  function closePicker() { dtWrap.classList.remove('open'); }

  dtTrigger.addEventListener('click', function (e) {
    e.stopPropagation();
    dtWrap.classList.contains('open') ? closePicker() : openPicker();
  });
  document.addEventListener('click', function (e) {
    if (dtWrap && !dtWrap.contains(e.target)) closePicker();
  });

  /* ── Reset: show placeholder (no pre-filled date) ── */
  function setDefault() {
    selDate = null;
    selHour = 4; selMin = 30;
    curYear = todayDate.getFullYear(); curMonth = todayDate.getMonth();
    dtHidden.value = '';
    dtTrigger.classList.remove('has-value');
    /* Restore i18n placeholder text */
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var TRANS = window.__MRB_TRANS || {};
    var placeholder = (TRANS[lang] && TRANS[lang]['booking.datePlaceholder'])
      || 'Chọn ngày & giờ khởi hành';
    dtDisplay.textContent = placeholder;
  }

  setDefault();
  // Re-default when booking modal reopens
  document.addEventListener('mrben-booking-open', setDefault);

})();

/* ═══════════════════════════════════════════════════
   Hotel Autocomplete IIFE
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  var hotelData = [
    { name: 'Allezboo Beach Resort', address: '8 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Amiana Resort Phan Thiet', address: '2 Nguyễn Đình Chiểu, Phú Hài, Phan Thiết' },
    { name: 'Ananda Resort', address: '148 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Anantara Mui Ne Resort', address: '12A Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Aroma Beach Resort & Spa', address: 'Khu 5, Phú Hài, Phan Thiết' },
    { name: 'Bamboo Village Beach Resort', address: '38 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Blue Ocean Resort', address: '54 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Cà Ty Mui Ne Resort', address: '6 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Canary Beach Resort', address: '60 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Cat Tien Guesthouse', address: '59 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Centara Mirage Resort Mui Ne', address: 'Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Cham Villas Boutique Resort', address: '32 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Champa Resort & Spa', address: '2 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Coco Beach Resort', address: '58 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: "De' Tuva Resort Mui Ne", address: 'Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Diem Lien Guesthouse', address: '85 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Dynasty Mui Ne Beach Resort', address: '140A Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Fiore Healthy Resort', address: 'Tiến Thành, Phan Thiết' },
    { name: 'Four Oceans Resort', address: 'Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Grace Boutique Resort', address: '144A Nguyễn Đình Chiểu, Mũi Né, Phan Thiết' },
    { name: 'Hà Anh Hotel', address: '91A Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Hải Âu Mui Ne Beach Resort', address: '32 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Hải Yên Family Hotel', address: 'Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Hoàng Ngọc Beach Resort', address: '152 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Homestay BONO Mũi Né', address: '200 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Hòn Rơm 1 Resort', address: 'Long Sơn, Mũi Né, Phan Thiết' },
    { name: 'Hung Phuc Mui Ne Hotel', address: '55 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Kim Village Mũi Né Resort', address: 'Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Le Huynh Mui Ne Hotel', address: '135 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: "Le' VIVA Resort Mũi Né", address: 'Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Little Mui Ne Cottages Resort', address: '10B Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Little Paris Resort', address: 'Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Long Beach Resort', address: '7 Nguyễn Đình Chiểu, Phú Hài, Phan Thiết' },
    { name: 'Lotus Mui Ne Resort', address: 'Khu 5, Phú Hài, Phan Thiết' },
    { name: 'Manila Resort', address: 'Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Mia Resort Mui Ne', address: '24 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Minh Hùng Hotel', address: '147 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Minh Ngoc Hotel', address: '72 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Minh Tam Resort', address: '130C Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Muine Bay Resort', address: 'Khu phố 14, Mũi Né, Phan Thiết' },
    { name: 'Muine de Century Beach Resort', address: 'Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Mui Ne Hills Budget Hotel', address: '69 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Mũi Né Bay Resort', address: '59 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Mũi Né Paradise Resort', address: '130D Nguyễn Đình Chiểu, Mũi Né, Phan Thiết' },
    { name: 'Mũi Né Sport Hotel', address: 'Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Mường Thanh Holiday Mũi Né', address: '54 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Ngoc Sang', address: '12A Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Anh Linh', address: '103 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Biển Nguồn', address: '97 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ BiBo', address: '119 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Châu Linh', address: '93 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Duy Vũ', address: '131 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Đồng Ngân', address: '45/7D Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Đồng Phát', address: '79 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Đức Thảo', address: '81 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Gấu Trúc', address: '25 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Gió Biển', address: '117 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Hoàng Nga', address: '43 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Hồng Di', address: '70 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Hùng An', address: '116 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Hùng Hà', address: '229 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Huyền Trân', address: 'Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Ken', address: '225 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Lử Hoàng', address: '106 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Minh Kha', address: '109A Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Minh Khôi', address: '149 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Nam Khải', address: '107 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Nhật Quang', address: '46 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Nhật Thi', address: '115 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Sứ Trắng', address: '3B Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Tám Ù', address: '3B Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Thắng KenG', address: '185 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Thanh Duy', address: '243 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Thành Quang', address: '13 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Thiên Sơn', address: '102 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Nhà Nghỉ Vườn Xoài', address: '5 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Novela Mui Ne Resort & Spa', address: '96A Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Novotel Phan Thiet', address: '1 Nguyễn Đình Chiểu, Phú Hài, Phan Thiết' },
    { name: 'Ocean Place Resort', address: '192/2 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Ocean Valley Hotel', address: '187 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Palado Hotel Mui Ne', address: '98B Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Pandanus Resort', address: '3 Nguyễn Hữu Thọ, Mũi Né, Phan Thiết' },
    { name: 'Phan Thiet Ocean Dunes Resort', address: '1 Tôn Đức Thắng, Phú Hài, Phan Thiết' },
    { name: 'Phú Hải Beach Resort & Spa', address: 'Khu 5, Phú Hài, Phan Thiết' },
    { name: 'Quoc Dinh Guesthouse', address: '123 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Radisson Resort Mui Ne', address: '16 Nguyễn Cơ Thạch, Mũi Né, Phan Thiết' },
    { name: 'Ravenala Boutique Resort', address: '146 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Romana Resort & Spa', address: 'Km 8, Phú Hài, Phan Thiết' },
    { name: 'Sài Gòn - Mũi Né Resort', address: '56-97 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Sailing Club Mui Ne', address: '24 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Sand Beach Resort', address: '128 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Sea Links Beach Hotel', address: 'Km 9, Nguyễn Thông, Phú Hài, Phan Thiết' },
    { name: 'Sea Lion Beach Resort', address: '12 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Seahorse Resort & Spa', address: '16 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Son Tra Guesthouse', address: '87B Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Sun & Sands Beach Resort', address: 'Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Sunny Beach Resort', address: '64-66 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Sunsea Resort', address: '50 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Sunrise Resort', address: '72 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Swiss Village Resort & Spa', address: '44 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Terracotta Resort & Spa', address: '28 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Thái Hòa Mũi Né Resort', address: '56 Huỳnh Thúc Kháng, Hàm Tiến, Phan Thiết' },
    { name: 'Thao Ha Hotel', address: '115 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'The Anam Mui Ne', address: '18 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'The Cliff Resort & Residences', address: 'Khu 5, Phú Hài, Phan Thiết' },
    { name: 'The Mui Ne Resort', address: '144 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Tien Dat Resort & Spa', address: '94A Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Tuong Vy Boutique Hotel', address: '193 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Unique Mui Ne Resort', address: '20B Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Victoria Phan Thiet Beach Resort', address: 'Km 9, Phú Hài, Phan Thiết' },
    { name: "Viet's Hotel", address: 'Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Villa Aria Mui Ne', address: '60A Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Vipol Hotel Mui Ne', address: '29A Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Vinh Sương Seaside Hotel', address: '46 Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Xin Chào Hotel', address: 'Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết' },
    { name: 'Khách sạn khác', address: '', _isOther: true }
  ];

  var wrap = document.getElementById('bfHotelWrap');
  var inputRow = wrap && wrap.querySelector('.bf-hotel-input-row');
  var nameInput = document.getElementById('bfHotelName');
  var dropdown = document.getElementById('bfHotelDropdown');
  var addrInput = document.getElementById('bfHotelAddress');
  var customGroup = document.getElementById('bfHotelCustomGroup');
  var customInput = document.getElementById('bfHotelCustomName');

  if (!wrap || !nameInput || !dropdown || !addrInput) return;

  /* Address read-only by default */
  addrInput.setAttribute('readonly', '');

  /* ── Build dropdown ── */
  function buildDropdown(filter) {
    filter = (filter || '').toLowerCase().trim();
    dropdown.innerHTML = '';

    var searchWrap = document.createElement('li');
    searchWrap.className = 'bf-hotel-search-wrap';
    searchWrap.style.position = 'relative';
    searchWrap.innerHTML =
      '<i class="fas fa-search"></i>' +
      '<input class="bf-hotel-search" id="bfHotelSearch" type="text" ' +
      'placeholder="Tìm kiếm..." autocomplete="off" />';
    dropdown.appendChild(searchWrap);

    var results = hotelData.filter(function (h) {
      return !filter || h.name.toLowerCase().indexOf(filter) !== -1;
    });

    if (results.length === 0) {
      var none = document.createElement('li');
      none.className = 'bf-hotel-no-result';
      none.textContent = 'Không tìm thấy khách sạn';
      dropdown.appendChild(none);
    } else {
      results.forEach(function (h) {
        var li = document.createElement('li');
        li.className = 'bf-hotel-opt' + (h._isOther ? ' is-other' : '');
        li.setAttribute('role', 'option');
        li.innerHTML =
          '<span class="bf-hotel-opt-name">' + h.name + '</span>' +
          (h.address ? '<span class="bf-hotel-opt-addr">' + h.address + '</span>' : '');
        li.addEventListener('mousedown', function (e) {
          e.preventDefault();
          selectHotel(h);
        });
        dropdown.appendChild(li);
      });
    }

    var searchEl = document.getElementById('bfHotelSearch');
    if (searchEl) {
      searchEl.value = filter;
      searchEl.addEventListener('input', function () {
        buildDropdown(this.value);
        var s = document.getElementById('bfHotelSearch');
        if (s) s.focus();
      });
      searchEl.addEventListener('mousedown', function (e) { e.stopPropagation(); });
      searchEl.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDropdown();
      });
    }
  }

  function openDropdown() {
    wrap.classList.add('open');
    buildDropdown('');
    setTimeout(function () {
      var s = document.getElementById('bfHotelSearch');
      if (s) s.focus();
    }, 30);
  }

  function closeDropdown() {
    wrap.classList.remove('open');
  }

  function selectHotel(h) {
    nameInput.value = h.name;
    nameInput.classList.add('has-value');
    if (h._isOther) {
      /* keep address empty & editable */
      addrInput.value = '';
      addrInput.removeAttribute('readonly');
      addrInput.setAttribute('data-i18n-placeholder', 'booking.placeholderHotelAddress');
      /* show custom hotel name input */
      if (customGroup) customGroup.style.display = '';
      if (customInput) {
        customInput.value = '';
        setTimeout(function () { customInput.focus(); }, 50);
      }
    } else {
      addrInput.value = h.address;
      addrInput.setAttribute('readonly', '');
      /* hide custom hotel name input */
      if (customGroup) customGroup.style.display = 'none';
      if (customInput) customInput.value = '';
    }
    closeDropdown();
  }

  if (inputRow) {
    inputRow.addEventListener('click', function (e) {
      e.stopPropagation();
      wrap.classList.contains('open') ? closeDropdown() : openDropdown();
    });
  }

  document.addEventListener('click', function () { closeDropdown(); });
  dropdown.addEventListener('click', function (e) { e.stopPropagation(); });

  document.addEventListener('mrben-booking-close', function () {
    nameInput.value = '';
    nameInput.classList.remove('has-value');
    addrInput.value = '';
    addrInput.setAttribute('readonly', '');
    if (customGroup) customGroup.style.display = 'none';
    if (customInput) customInput.value = '';
    closeDropdown();
  });

})();
