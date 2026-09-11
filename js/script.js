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
      'nav.destinations': 'Điểm Đến',
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
      'dest.eyebrow': 'Khám Phá Các Điểm Đến',
      'dest.title1': 'Điểm Đến',
      'dest.titleGold': 'Tuyệt Đẹp',
      'dest.subtitle': 'Khám phá những địa điểm ngoạn mục bạn sẽ ghé thăm trong tour Jeep — từ đồi cát hùng vĩ đến suối tiên huyền bí.',
      'dest.whiteDune.title': 'Đồi Cát Trắng',
      'dest.whiteDune.desc': 'Những đồi cát trắng mênh mông trải dài đến tận chân trời — phong cảnh hoang sơ như sa mạc Sahara, lý tưởng để ngắm bình minh và chụp ảnh để đời.',
      'dest.redDune.title': 'Đồi Cát Đỏ',
      'dest.redDune.desc': 'Đồi cát đỏ rực rỡ dưới ánh hoàng hôn — điểm ngắm cảnh hoàng hôn mang tính biểu tượng nhất Mũi Né, lý tưởng để trượt cát và ngắm toàn cảnh.',
      'dest.fishVillage.title': 'Làng Chài Mũi Né',
      'dest.fishVillage.desc': 'Làng chài truyền thống sôi động với hàng trăm thuyền thúng nhiều màu sắc trên vịnh biển xanh ngọc — cánh cửa sổ nhìn vào cuộc sống ven biển đích thực của Việt Nam.',
      'dest.fairyStream.title': 'Suối Tiên',
      'dest.fairyStream.desc': 'Dòng suối nông kỳ diệu uốn lượn qua những vách đá sa thạch đỏ trắng bao quanh bởi rừng tre xanh mát — lội chân trần qua xứ sở thần tiên thiên nhiên này.',
      'tours.eyebrow': 'Trải Nghiệm Thượng Lưu',
      'tours.title1': 'Jeep Tours',
      'tours.titleGold': 'Đẳng Cấp',
      'tours.subtitle': 'Hành trình được thiết kế riêng, giới thiệu những điểm đẹp nhất của Mũi Né và Phan Thiết.',
      'gallery.eyebrow': 'Khoảnh Khắc Tuyệt Vời',
      'gallery.title1': 'Thư Viện',
      'gallery.titleGold': 'Ảnh',
      'gallery.subtitle': 'Một cái nhìn thoáng qua về những cuộc phiêu lưu chờ đón bạn ở Mũi Né.',
      'cta.title1': 'Sẵn Sàng Cho',
      'cta.titleGold': 'Chuyến Phiêu Lưu?',
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
      'reviews.eyebrow': 'Khách Hàng Nói Gì',
      'reviews.title1': 'Đánh Giá',
      'reviews.titleGold': 'Từ Khách Hàng',
      'reviews.subtitle': 'Hơn 128 đánh giá 5 sao từ du khách khắp nơi trên thế giới.',
      'trust.yearsUnit': 'Năm',
      'trust.yearsDesc': 'Kinh nghiệm xe Jeep',
      'trust.happyGuests': 'Khách hàng hài lòng',
      'trust.ratingDesc': 'Google Maps & TripAdvisor',
      'trust.safetyDesc': 'Chuyến đi an toàn',
      'review.1.text': '"Tour tuyệt vời! Tài xế thân thiện, cảnh bình minh đồi cát trắng đẹp khó tin."',
      'review.1.name': 'Nguyễn Minh Anh',
      'review.1.origin': 'Hà Nội, Việt Nam',
      'review.2.text': '"Dịch vụ chuyên nghiệp, xe sạch đẹp. Nhất định sẽ quay lại lần sau!"',
      'review.2.name': 'Trần Hương Ly',
      'review.2.origin': 'TP. Hồ Chí Minh, Việt Nam',
      'review.3.text': '"Giá hợp lý, hướng dẫn nhiệt tình. Tour hoàng hôn đồi cát đỏ rất ấn tượng."',
      'review.3.name': 'Lê Văn Hùng',
      'review.3.origin': 'Đà Nẵng, Việt Nam',
      'contact.call': 'Gọi Điện',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': 'Đối tác hàng đầu cho các chuyến phưu lưu cao cấp qua những cảnh quan tuyệt đẹp của Mũi Né và Phan Thiết, Việt Nam.',
      'footer.quickLinks': 'Liên Kết Nhanh',
      'footer.contactInfo': 'Thông Tin Liên Hệ',
      'footer.hours': 'Mở Cửa Hàng Ngày: 4:00 – 21:00',
      'footer.findUs': 'Tìm Chúng Tôi',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. Thiết kế và phát triển bởi',
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
      'tour.any.title': 'Xe Bất Kỳ',
      'tour.any.desc': 'Bạn không quan tâm đến màu sắc xe? Hãy chọn mục này, chúng tôi sẽ sắp xếp chiếc xe tốt nhất hiện có cho chuyến đi của bạn.',
      'booking.pricePrivate': 'Tour Riêng Tư',
      'booking.priceGroup': 'Tour Ghép',
      'booking.pricePrivateValue': '500,000₫',
      'booking.priceGroupValue': '150,000₫',
      'booking.labelName': 'Họ và Tên',
      'booking.formTitle': 'Đặt Tour',
      'booking.placeholderName': 'Nhập tên của bạn',
      'booking.labelPhone': 'Số Điện Thoại',
      'booking.placeholderPhone': 'Nhập số điện thoại',
      'booking.phoneOther': 'Khác',
      'booking.addonPack': 'Gói Đồi Cát',
      'booking.labelTourType': 'Loại Tour',
      'booking.typePrivate': 'Tour Riêng Tư',
      'booking.typeGroup': 'Tour Ghép',
      'booking.labelDatetime': 'Ngày & Giờ Khởi Hành',
      'booking.pickupTime': 'THỜI GIAN ĐÓN',
      'booking.sunrise': 'BÌNH MINH',
      'booking.sunset': 'HOÀNG HÔN',
      'booking.labelGuests': 'Số Người',
      'booking.labelVehicles': 'Số Lượng Xe',
      'booking.labelNotes': 'Ghi Chú',
      'booking.placeholderNotes': 'Chọn màu xe hoặc yêu cầu khác...',
      'booking.labelPickupAddress': 'Địa Chỉ Đón',
      'booking.placeholderPickupAddress': 'Nhập địa chỉ đón',
      'booking.unitPrice': 'Đơn giá:',
      'booking.priceBreakdown': 'Chi tiết giá',
      'booking.totalPrice': 'Tổng Tiền:',
      'booking.bookWhatsapp': 'Đặt qua WhatsApp',
      'booking.bookZalo': 'Đặt qua Zalo',
      'booking.or': 'hoặc',
      'booking.callPhone': 'Gọi Điện Thoại',
      'booking.confirmTitle': 'Xác Nhận Thông Tin',
      'booking.confirmDesc': 'Đơn hàng của bạn sẽ được gửi sau:',
      'booking.confirmEdit': 'Chỉnh Sửa',
      'booking.confirmSendNow': 'Gửi Ngay',
      'cal.sun': 'CN', 'cal.mon': 'T2', 'cal.tue': 'T3', 'cal.wed': 'T4', 'cal.thu': 'T5', 'cal.fri': 'T6', 'cal.sat': 'T7',
      'booking.labelHotel': 'Tên Khách Sạn/Resort',
      'booking.placeholderHotel': 'Tìm tên khách sạn/resort...',
      'booking.labelCustomHotel': 'Tên Khách Sạn/Resort Của Bạn',
      'booking.placeholderCustomHotel': 'Nhập tên khách sạn/resort...',
      'booking.labelHotelAddress': 'Địa Chỉ Khách Sạn/Resort',
      'booking.placeholderHotelAddress': 'Địa chỉ khách sạn/resort của bạn',
      'booking.labelAddon': 'Dịch Vụ Thêm',
      'booking.optionalBadge': 'Tuỳ chọn',
      'booking.addonSandDune': 'Leo đồi cát trắng bằng xe Jeep',
      'booking.holidaySurcharge': 'Phụ Thu Lễ +30%',
      'booking.labelAddonVehicles': 'Số xe leo đồi cát',
      'booking.labelItinerary': 'Lộ Trình',
      'booking.customizeRoute': 'Tùy chỉnh lộ trình',
      'booking.routeOk': 'Hoàn tất',
      'booking.ctaTitle': 'Đặt Xe Jeep Tour',
      'booking.ctaHint': 'Bạn muốn chọn màu xe? Hãy ghi vào phần Ghi chú khi đặt xe.',
      'booking.ctaButton': 'Đặt Xe Ngay',
      'cal.months': 'Tháng 1,Tháng 2,Tháng 3,Tháng 4,Tháng 5,Tháng 6,Tháng 7,Tháng 8,Tháng 9,Tháng 10,Tháng 11,Tháng 12',
      'stop.whiteDune': 'Đồi Cát Trắng',
      'stop.redDune': 'Đồi Cát Đỏ',
      'stop.fishVillage': 'Làng Chài Mũi Né',
      'stop.fairyStream': 'Suối Tiên',
      'wa.greeting': 'Xin chào Mr. Ben, tôi muốn đặt xe Jeep của bạn, và đây là thông tin đặt xe Jeep của tôi:\n',
      'wa.name': '- Họ tên: ',
      'wa.phone': '- SĐT: ',
      'wa.tour': '- Tour: ',
      'wa.vehicles': '- Số lượng xe: ',
      'wa.addon': '- Dịch vụ thêm: ',
      'wa.route': '- Lộ trình: ',
      'wa.hotel': '- Khách sạn: ',
      'wa.address': '- Địa chỉ: ',
      'wa.time': '- Ngày & Giờ đón: ',
      'wa.total': '- Tổng tiền: ',
      'wa.notes': '- Ghi chú: ',
      'wa.footer': 'Mong bạn hãy liên lạc sớm cho tôi nhé.',
      'booking.thankTitle': 'Cảm Ơn Bạn! 🎉',
      'booking.thankMessage': 'Cảm ơn bạn đã đặt tour Jeep với Mr. Ben! Chúng tôi sẽ liên hệ lại với bạn sớm nhất để xác nhận chuyến đi. Chúc bạn có một chuyến phiêu lưu tuyệt vời!',
      'booking.thankClose': 'Đóng',
      'booking.hotelOther': 'Khách sạn khác',
      'booking.hotelSearchPlaceholder': 'Tìm kiếm...',
      'booking.hotelNoResult': 'Không tìm thấy khách sạn',
    },
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.destinations': 'Destinations',
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
      'dest.eyebrow': 'Explore Our Destinations',
      'dest.title1': 'Stunning',
      'dest.titleGold': 'Destinations',
      'dest.subtitle': 'Discover the breathtaking places you\'ll visit on our Jeep tours — from towering sand dunes to hidden fairy streams.',
      'dest.whiteDune.title': 'White Sand Dune',
      'dest.whiteDune.desc': 'Vast white sand dunes stretching to the horizon — a Sahara-like landscape perfect for sunrise adventures and unforgettable photos.',
      'dest.redDune.title': 'Red Sand Dune',
      'dest.redDune.desc': 'Crimson-colored dunes glowing at golden hour — the most iconic sunset viewpoint in Mũi Né, ideal for sand sliding and panoramic views.',
      'dest.fishVillage.title': 'Mũi Né Fishing Village',
      'dest.fishVillage.desc': 'A vibrant, traditional fishing village where hundreds of colorful boats dot the turquoise bay — a window into authentic coastal Vietnamese life.',
      'dest.fairyStream.title': 'Fairy Stream',
      'dest.fairyStream.desc': 'A magical shallow stream winding through red and white sandstone canyons surrounded by lush bamboo — wade barefoot through this natural wonderland.',
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
      'reviews.eyebrow': 'What Our Guests Say',
      'reviews.title1': 'Customer',
      'reviews.titleGold': 'Reviews',
      'reviews.subtitle': 'Over 128 five-star reviews from travelers around the world.',
      'trust.yearsUnit': 'Years',
      'trust.yearsDesc': 'Jeep Experience',
      'trust.happyGuests': 'Happy Guests',
      'trust.ratingDesc': 'Google Maps & TripAdvisor',
      'trust.safetyDesc': 'Safe Trip',
      'review.1.text': '"Wonderful tour! Friendly driver, the sunrise over the white dunes was breathtaking."',
      'review.1.name': 'Nguyen Minh Anh',
      'review.1.origin': 'Hanoi, Vietnam',
      'review.2.text': '"Amazing sunrise tour! The driver was professional. Highly recommend Mr. Ben!"',
      'review.2.name': 'Sarah Johnson',
      'review.2.origin': 'London, UK',
      'review.3.text': '"Best tour in Mui Ne! The driver showed us hidden spots. Will definitely come back!"',
      'review.3.name': 'Alexei Petrov',
      'review.3.origin': 'Moscow, Russia',
      'contact.call': 'Call Us',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': 'Your premier partner for luxury off-road adventures across the stunning landscapes of Mũi Né and Phan Thiết, Vietnam.',
      'footer.quickLinks': 'Quick Links',
      'footer.contactInfo': 'Contact Info',
      'footer.hours': 'Open Daily: 4:00 – 21:00',
      'footer.findUs': 'Find Us',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. Designed and developed by',
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
      'tour.any.title': 'Any Jeep',
      'tour.any.desc': 'Don\'t have a color preference? Choose this option and we will arrange the best available Jeep for your journey.',
      'booking.pricePrivate': 'Private Tour',
      'booking.priceGroup': 'Group Tour',
      'booking.pricePrivateValue': '$500,000',
      'booking.priceGroupValue': '$150,000',
      'booking.labelName': 'Full Name',
      'booking.formTitle': 'Book Tour',
      'booking.placeholderName': 'Enter your name',
      'booking.labelPhone': 'Phone Number',
      'booking.placeholderPhone': 'Enter phone number',
      'booking.phoneOther': 'Other',
      'booking.addonPack': 'Sand Dune Package',
      'booking.labelTourType': 'Tour Type',
      'booking.typePrivate': 'Private Tour',
      'booking.typeGroup': 'Group Tour',
      'booking.labelDatetime': 'Departure Date & Time',
      'booking.pickupTime': 'PICKUP TIME',
      'booking.sunrise': 'SUNRISE',
      'booking.sunset': 'SUNSET',
      'booking.labelGuests': 'Number of People',
      'booking.labelVehicles': 'Number of Vehicles',
      'booking.labelNotes': 'Notes',
      'booking.placeholderNotes': 'Choose car color or other requests...',
      'booking.labelPickupAddress': 'Pickup Address',
      'booking.placeholderPickupAddress': 'Enter pickup address...',
      'booking.unitPrice': 'Unit price:',
      'booking.priceBreakdown': 'Price Breakdown',
      'booking.totalPrice': 'Total:',
      'booking.bookWhatsapp': 'Book via WhatsApp',
      'booking.bookZalo': 'Book via Zalo',
      'booking.or': 'or',
      'booking.callPhone': 'Call Us',
      'booking.confirmTitle': 'Confirm Booking',
      'booking.confirmDesc': 'Your message will be sent in:',
      'booking.confirmEdit': 'Edit',
      'booking.confirmSendNow': 'Send Now',
      'cal.sun': 'Su', 'cal.mon': 'Mo', 'cal.tue': 'Tu', 'cal.wed': 'We', 'cal.thu': 'Th', 'cal.fri': 'Fr', 'cal.sat': 'Sa',
      'booking.labelHotel': 'Hotel/Resort Name',
      'booking.placeholderHotel': 'Search hotel/resort name...',
      'booking.labelHotelAddress': 'Hotel/Resort Address',
      'booking.placeholderHotelAddress': 'Your hotel/resort address...',
      'booking.labelCustomHotel': 'Your Hotel/Resort Name',
      'booking.placeholderCustomHotel': 'Enter hotel/resort name...',
      'booking.labelAddon': 'Add-on Service',
      'booking.optionalBadge': 'Optional',
      'booking.addonSandDune': 'White Sand Dune Climbing by Jeep',
      'booking.holidaySurcharge': 'Holiday Surcharge +30%',
      'booking.labelAddonVehicles': 'Vehicles for sand dune',
      'booking.labelItinerary': 'Itinerary',
      'booking.customizeRoute': 'Customize itinerary',
      'booking.routeOk': 'Done',
      'booking.ctaTitle': 'Book Jeep Tour',
      'booking.ctaHint': 'Want a specific Jeep color? Mention it in the Notes field when booking.',
      'booking.ctaButton': 'Book Now',
      'cal.months': 'January,February,March,April,May,June,July,August,September,October,November,December',
      'stop.whiteDune': 'White Sand Dune',
      'stop.redDune': 'Red Sand Dune',
      'stop.fishVillage': 'Mui Ne Fishing Village',
      'stop.fairyStream': 'Fairy Stream',
      'wa.greeting': 'Hello Mr. Ben, I would like to book your Jeep. Here is my booking information:\n',
      'wa.name': '- Name: ',
      'wa.phone': '- Phone: ',
      'wa.tour': '- Tour: ',
      'wa.vehicles': '- Number of vehicles: ',
      'wa.addon': '- Add-on: ',
      'wa.route': '- Itinerary: ',
      'wa.hotel': '- Hotel: ',
      'wa.address': '- Address: ',
      'wa.time': '- Pickup Time: ',
      'wa.total': '- Total: ',
      'wa.notes': '- Notes: ',
      'wa.footer': 'Please contact me soon.',
      'booking.thankTitle': 'Thank You! 🎉',
      'booking.thankMessage': 'Thank you for booking a Jeep tour with Mr. Ben! We will contact you shortly to confirm your trip. Wishing you an amazing adventure!',
      'booking.thankClose': 'Close',
      'booking.hotelOther': 'Other hotel',
      'booking.hotelSearchPlaceholder': 'Search...',
      'booking.hotelNoResult': 'No hotel found',
    },
    ru: {
      'nav.home': 'Главная',
      'nav.about': 'О Нас',
      'nav.destinations': 'Направления',
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
      'dest.eyebrow': 'Наши Направления',
      'dest.title1': 'Потрясающие',
      'dest.titleGold': 'Направления',
      'dest.subtitle': 'Откройте для себя захватывающие места, которые вы посетите в наших джип-турах — от величественных песчаных дюн до скрытых волшебных ручьёв.',
      'dest.whiteDune.title': 'Белые Песчаные Дюны',
      'dest.whiteDune.desc': 'Бескрайние белые дюны, простирающиеся до горизонта — пейзаж, напоминающий Сахару, идеально подходящий для встречи рассвета и незабываемых фотографий.',
      'dest.redDune.title': 'Красные Песчаные Дюны',
      'dest.redDune.desc': 'Багряные дюны, сияющие в лучах заходящего солнца — самая знаменитая смотровая площадка Муй Не, идеальная для катания по песку и панорамных видов.',
      'dest.fishVillage.title': 'Рыбацкая Деревня Муй Не',
      'dest.fishVillage.desc': 'Яркая традиционная рыбацкая деревня, где сотни разноцветных лодок украшают бирюзовый залив — окно в настоящую прибрежную жизнь Вьетнама.',
      'dest.fairyStream.title': 'Ручей Фей',
      'dest.fairyStream.desc': 'Волшебный мелкий ручей, петляющий через красно-белые каньоны из песчаника в окружении пышного бамбука — пройдитесь босиком по этому природному чуду.',
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
      'reviews.eyebrow': 'Что Говорят Гости',
      'reviews.title1': 'Отзывы',
      'reviews.titleGold': 'Клиентов',
      'reviews.subtitle': 'Более 128 пятизвёздочных отзывов от путешественников со всего мира.',
      'trust.yearsUnit': 'Лет',
      'trust.yearsDesc': 'Опыт работы с Jeep',
      'trust.happyGuests': 'Довольных гостей',
      'trust.ratingDesc': 'Google Maps & TripAdvisor',
      'trust.safetyDesc': 'Безопасность',
      'review.1.text': '"Замечательный тур! Дружелюбный водитель, рассвет над белыми дюнами захватывает дух."',
      'review.1.name': 'Нгуен Минь Ань',
      'review.1.origin': 'Ханой, Вьетнам',
      'review.2.text': '"Лучший тур в Муйне! Водитель показал скрытые места. Поеду снова!"',
      'review.2.name': 'Алексей Петров',
      'review.2.origin': 'Москва, Россия',
      'review.3.text': '"Профессиональный сервис! Джипы в отличном состоянии. Рекомендую!"',
      'review.3.name': 'Мария Иванова',
      'review.3.origin': 'Санкт-Петербург, Россия',
      'contact.call': 'Позвонить',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': 'Ваш главный партнёр для премиумных внедорожных приключений по живописным пейзажам Муй Не и Фан Тхиет.',
      'footer.quickLinks': 'Быстрые Ссылки',
      'footer.contactInfo': 'Контактная Информация',
      'footer.hours': 'Ежедневно: 4:00 – 21:00',
      'footer.findUs': 'Найти Нас',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. Дизайн и разработка:',
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
      'tour.green.title': 'Зеленый джип',
      'tour.green.desc': 'Слейтесь с природой на зеленом джипе — преодолевайте песчаные дюны, сосновые леса и дикие тропы.',
      'tour.any.title': 'Любой джип',
      'tour.any.desc': 'Нет предпочтений по цвету? Выберите этот вариант, и мы подберем лучший доступный джип для вашего путешествия.',
      'booking.pricePrivate': 'Индивидуальный тур',
      'booking.priceGroup': 'Групповой Тур',
      'booking.labelName': 'Полное Имя',
      'booking.formTitle': 'Забронировать',
      'booking.placeholderName': 'Введите ваше имя',
      'booking.labelPhone': 'Номер Телефона',
      'booking.placeholderPhone': 'Введите номер телефона',
      'booking.phoneOther': 'Другое',
      'booking.addonPack': 'Пакет Дюны',
      'booking.labelTourType': 'Тип Тура',
      'booking.typePrivate': 'Частный Тур',
      'booking.typeGroup': 'Групповой Тур',
      'booking.labelDatetime': 'Дата и Время Отправления',
      'booking.pickupTime': 'ВРЕМЯ ПОСАДКИ',
      'booking.sunrise': 'РАССВЕТ',
      'booking.sunset': 'ЗАКАТ',
      'booking.labelGuests': 'Количество Людей',
      'booking.labelVehicles': 'Количество Автомобилей',
      'booking.labelNotes': 'Примечания',
      'booking.placeholderNotes': 'Выберите цвет автомобиля или другие пожелания...',
      'booking.labelPickupAddress': 'Адрес отправления',
      'booking.placeholderPickupAddress': 'Введите адрес отправления...',
      'booking.unitPrice': 'Цена:',
      'booking.priceBreakdown': 'Детализация цены',
      'booking.totalPrice': 'Итого:',
      'booking.bookWhatsapp': 'Забронировать WhatsApp',
      'booking.bookZalo': 'Забронировать через Zalo',
      'booking.or': 'или',
      'booking.callPhone': 'Позвонить',
      'booking.confirmTitle': 'Подтвердить бронирование',
      'booking.confirmDesc': 'Ваше сообщение будет отправлено через:',
      'booking.confirmEdit': 'Изменить',
      'booking.confirmSendNow': 'Отправить',
      'cal.sun': 'Вс', 'cal.mon': 'Пн', 'cal.tue': 'Вт', 'cal.wed': 'Ср', 'cal.thu': 'Чт', 'cal.fri': 'Пт', 'cal.sat': 'Сб',
      'booking.labelHotel': 'Название Отеля/Курорта',
      'booking.placeholderHotel': 'Поиск отеля/курорта...',
      'booking.labelHotelAddress': 'Адрес Отеля/Курорта',
      'booking.placeholderHotelAddress': 'Адрес отеля/курорта...',
      'booking.labelCustomHotel': 'Название Вашего Отеля/Курорта',
      'booking.placeholderCustomHotel': 'Введите название отеля/курорта...',
      'booking.labelAddon': 'Дополнительная услуга',
      'booking.optionalBadge': 'Необязательно',
      'booking.addonSandDune': 'Подъём на Белые песчаные дюны на джипе',
      'booking.holidaySurcharge': 'Праздничная наценка +30%',
      'booking.labelAddonVehicles': 'Авто для дюн',
      'booking.labelItinerary': 'Маршрут',
      'booking.customizeRoute': 'Настроить маршрут',
      'booking.routeOk': 'Готово',
      'booking.ctaTitle': 'Забронировать Джип-тур',
      'booking.ctaHint': 'Хотите выбрать цвет джипа? Укажите в поле Примечания при бронировании.',
      'booking.ctaButton': 'Забронировать',
      'cal.sun': 'Вс', 'cal.mon': 'Пн', 'cal.tue': 'Вт', 'cal.wed': 'Ср', 'cal.thu': 'Чт', 'cal.fri': 'Пт', 'cal.sat': 'Сб',
      'cal.months': 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь',
      'stop.whiteDune': 'Белые Песчаные Дюны',
      'stop.redDune': 'Красные Песчаные Дюны',
      'stop.fishVillage': 'Рыбацкая Деревня Муй Не',
      'stop.fairyStream': 'Ручей Фей',
      'wa.greeting': 'Здравствуйте, мистер Бен! Я хотел бы забронировать джип. Вот информация о моем бронировании:\n',
      'wa.name': '- Имя: ',
      'wa.phone': '- Телефон: ',
      'wa.tour': '- Тур: ',
      'wa.vehicles': '- Количество авто: ',
      'wa.addon': '- Доп. услуги: ',
      'wa.route': '- Маршрут: ',
      'wa.hotel': '- Отель: ',
      'wa.address': '- Адрес: ',
      'wa.time': '- Время посадки: ',
      'wa.total': '- Итого: ',
      'wa.notes': '- Примечания: ',
      'wa.footer': 'Пожалуйста, свяжитесь со мной в ближайшее время.',
      'booking.thankTitle': 'Спасибо! 🎉',
      'booking.thankMessage': 'Спасибо за бронирование джип-тура с Mr. Ben! Мы свяжемся с вами в ближайшее время для подтверждения поездки. Желаем вам незабываемого приключения!',
      'booking.thankClose': 'Закрыть',
      'booking.hotelOther': 'Другой отель',
      'booking.hotelSearchPlaceholder': 'Поиск...',
      'booking.hotelNoResult': 'Отель не найден',
    },
    zh: {
      'nav.home': '首页',
      'nav.about': '关于我们',
      'nav.destinations': '目的地',
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
      'dest.eyebrow': '探索目的地',
      'dest.title1': '绝美',
      'dest.titleGold': '目的地',
      'dest.subtitle': '探索吉普之旅中您将造访的壮丽景点——从巍峨沙丘到隐秘仙溪。',
      'dest.whiteDune.title': '白沙丘',
      'dest.whiteDune.desc': '一望无际的白色沙丘延伸至地平线——宛如撒哈拉般的壮观景色，是欣赏日出和拍摄难忘照片的绝佳之地。',
      'dest.redDune.title': '红沙丘',
      'dest.redDune.desc': '金色时分闪耀着绯红光芒的沙丘——美奈最具标志性的日落观景点，是滑沙和欣赏全景的理想之地。',
      'dest.fishVillage.title': '美奈渔村',
      'dest.fishVillage.desc': '一个充满活力的传统渔村，数百艘色彩缤纷的渔船点缀在碧绿的海湾中——一扇通往越南真实海岸生活的窗口。',
      'dest.fairyStream.title': '仙女溪',
      'dest.fairyStream.desc': '一条神奇的浅溪蜿蜒穿过红白相间的砂岩峡谷，四周环绕着茂密的竹林——赤脚漫步在这片自然仙境中。',
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
      'reviews.eyebrow': '客户评价',
      'reviews.title1': '客户',
      'reviews.titleGold': '好评',
      'reviews.subtitle': '来自全球游客超过128条五星好评。',
      'trust.yearsUnit': '年',
      'trust.yearsDesc': 'Jeep 驾驶经验',
      'trust.happyGuests': '满意游客',
      'trust.ratingDesc': 'Google Maps & TripAdvisor',
      'trust.safetyDesc': '安全保障',
      'review.1.text': '"太棒了！司机很友好，白沙丘的日出美不胜收。"',
      'review.1.name': '阮明英',
      'review.1.origin': '河内，越南',
      'review.2.text': '"非常专业的服务！吉普车很干净。强烈推荐！"',
      'review.2.name': '李伟',
      'review.2.origin': '上海，中国',
      'review.3.text': '"美奈最好的旅游体验！司机带我们去了隐秘的好地方。"',
      'review.3.name': '王芳',
      'review.3.origin': '北京，中国',
      'contact.call': '电话联系',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': '您高端越野决驾的首选伴侣，带您领略美奈和藩切绺丽的自然风光。',
      'footer.quickLinks': '快速链接',
      'footer.contactInfo': '联系信息',
      'footer.hours': '每日开放: 4:00 – 21:00',
      'footer.findUs': '找到我们',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. 设计与开发：',
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
      'tour.green.title': '绿色吉普车',
      'tour.green.desc': '与大自然融为一体的绿色吉普车 — 穿越沙丘地形、松树林和野生越野小径。',
      'tour.any.title': '任何吉普车',
      'tour.any.desc': '没有颜色偏好？选择此选项，我们将为您安排最佳可用吉普车。',
      'booking.pricePrivate': '私家游',
      'booking.priceGroup': '拼团游',
      'booking.labelName': '姓名',
      'booking.formTitle': '预订行程',
      'booking.placeholderName': '请输入您的姓名',
      'booking.labelPhone': '电话号码',
      'booking.placeholderPhone': '请输入电话号码',
      'booking.phoneOther': '其他',
      'booking.addonPack': '沙丘套餐',
      'booking.labelTourType': '游览类型',
      'booking.typePrivate': '私家游',
      'booking.typeGroup': '拼团游',
      'booking.labelDatetime': '出发日期和时间',
      'booking.pickupTime': '接送时间',
      'booking.sunrise': '日出',
      'booking.sunset': '日落',
      'booking.labelGuests': '人数',
      'booking.labelVehicles': '车辆数量',
      'booking.labelNotes': '备注',
      'booking.placeholderNotes': '选择车辆颜色或其他要求...',
      'booking.labelPickupAddress': '接送地址',
      'booking.placeholderPickupAddress': '请输入接送地址...',
      'booking.unitPrice': '单价：',
      'booking.priceBreakdown': '价格明细',
      'booking.totalPrice': '总价：',
      'booking.bookWhatsapp': '通过WhatsApp预订',
      'booking.bookZalo': '通过Zalo预订',
      'booking.or': '或',
      'booking.callPhone': '致电我们',
      'booking.confirmTitle': '确认预订',
      'booking.confirmDesc': '您的消息将在以下时间发送：',
      'booking.confirmEdit': '编辑',
      'booking.confirmSendNow': '立即发送',
      'cal.sun': '日', 'cal.mon': '一', 'cal.tue': '二', 'cal.wed': '三', 'cal.thu': '四', 'cal.fri': '五', 'cal.sat': '六',
      'booking.labelHotel': '酒店/度假村名称',
      'booking.placeholderHotel': '搜索酒店/度假村名称...',
      'booking.labelHotelAddress': '酒店/度假村地址',
      'booking.placeholderHotelAddress': '酒店/度假村地址...',
      'booking.labelCustomHotel': '您的酒店/度假村名称',
      'booking.placeholderCustomHotel': '请输入酒店/度假村名称...',
      'booking.labelAddon': '附加服务',
      'booking.optionalBadge': '可选',
      'booking.addonSandDune': '吉普车白沙丘探险',
      'booking.holidaySurcharge': '节日附加费 +30%',
      'booking.labelAddonVehicles': '沙丘车辆数',
      'booking.labelItinerary': '行程路线',
      'booking.customizeRoute': '自定义路线',
      'booking.routeOk': '完成',
      'booking.ctaTitle': '预订吉普车旅游',
      'booking.ctaHint': '想要特定颜色的吉普车？请在预订时在备注栏中注明。',
      'booking.ctaButton': '立即预订',
      'cal.sun': '日', 'cal.mon': '一', 'cal.tue': '二', 'cal.wed': '三', 'cal.thu': '四', 'cal.fri': '五', 'cal.sat': '六',
      'cal.months': '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月',
      'stop.whiteDune': '白沙丘',
      'stop.redDune': '红沙丘',
      'stop.fishVillage': '美奈渔村',
      'stop.fairyStream': '仙女溪',
      'wa.greeting': '您好，Ben先生，我想预订您的吉普车。这是我的预订信息：\n',
      'wa.name': '- 姓名：',
      'wa.phone': '- 电话：',
      'wa.tour': '- 游览：',
      'wa.vehicles': '- 车辆数量：',
      'wa.addon': '- 附加服务：',
      'wa.route': '- 行程：',
      'wa.hotel': '- 酒店：',
      'wa.address': '- 地址：',
      'wa.time': '- 接送时间：',
      'wa.total': '- 总计：',
      'wa.notes': '- 备注：',
      'wa.footer': '请尽快与我联系。',
      'booking.thankTitle': '谢谢您！🎉',
      'booking.thankMessage': '感谢您预订 Mr. Ben 的吉普车之旅！我们将尽快与您联系确认行程。祝您旅途愉快！',
      'booking.thankClose': '关闭',
      'booking.hotelOther': '其他酒店',
      'booking.hotelSearchPlaceholder': '搜索...',
      'booking.hotelNoResult': '未找到酒店',
    },
    ko: {
      'nav.home': '홈',
      'nav.about': '소개',
      'nav.destinations': '여행지',
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
      'dest.eyebrow': '여행지 탐험',
      'dest.title1': '멋진',
      'dest.titleGold': '여행지',
      'dest.subtitle': '지프 투어에서 방문할 놀라운 장소들을 만나보세요 — 우뚝 솟은 모래 언덕부터 숨겨진 요정 개울까지.',
      'dest.whiteDune.title': '화이트 샌드듄',
      'dest.whiteDune.desc': '지평선까지 펼쳐진 광활한 흰 모래 언덕 — 사하라를 연상시키는 풍경으로, 일출 모험과 잊지 못할 사진 촬영에 완벽한 장소입니다.',
      'dest.redDune.title': '레드 샌드듄',
      'dest.redDune.desc': '골든 아워에 붉게 빛나는 모래 언덕 — 무이네에서 가장 상징적인 일몰 전망대로, 모래 슬라이딩과 파노라마 뷰를 즐기기에 이상적입니다.',
      'dest.fishVillage.title': '무이네 어촌 마을',
      'dest.fishVillage.desc': '수백 척의 알록달록한 배가 청록색 만에 떠 있는 활기찬 전통 어촌 마을 — 진정한 베트남 해안 생활을 엿볼 수 있는 창입니다.',
      'dest.fairyStream.title': '요정 개울',
      'dest.fairyStream.desc': '울창한 대나무 숲으로 둘러싸인 붉은색과 흰색 사암 협곡을 따라 흐르는 신비로운 얕은 개울 — 이 자연의 원더랜드를 맨발로 걸어보세요.',
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
      'reviews.eyebrow': '고객 후기',
      'reviews.title1': '고객',
      'reviews.titleGold': '리뷰',
      'reviews.subtitle': '전 세계 여행자들의 128개 이상 별 5개 리뷰.',
      'trust.yearsUnit': '년',
      'trust.yearsDesc': 'Jeep 운행 경험',
      'trust.happyGuests': '만족한 고객',
      'trust.ratingDesc': 'Google Maps & TripAdvisor',
      'trust.safetyDesc': '안전 보장',
      'review.1.text': '"정말 멋진 투어! 친절한 기사님, 백사구의 일출이 환상적이었어요."',
      'review.1.name': '응우옌 민 아인',
      'review.1.origin': '하노이, 베트남',
      'review.2.text': '"무이네 최고의 투어! 숨겨진 명소를 보여주셨어요. 꼭 다시 올게요!"',
      'review.2.name': '김지수',
      'review.2.origin': '서울, 한국',
      'review.3.text': '"전문적인 서비스! 지프가 깨끗해요. 강력 추천합니다!"',
      'review.3.name': '박민준',
      'review.3.origin': '부산, 한국',
      'contact.call': '전화 문의',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': '무이네와 판티엣의 화려한 자연 환경을 다루는 프리미엄 투어의 비즈니스 파트너.',
      'footer.quickLinks': '빠른 링크',
      'footer.contactInfo': '연락체',
      'footer.hours': '매일 영업: 4:00 – 21:00',
      'footer.findUs': '위치 찾기',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. 디자인 및 개발:',
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
      'tour.any.title': '아무 지프나',
      'tour.any.desc': '선호하는 색상이 없으신가요? 이 옵션을 선택하시면 귀하의 여행을 위해 가장 좋은 상태의 지프를 배정해 드립니다.',
      'booking.pricePrivate': '단독 투어',
      'booking.priceGroup': '합승 투어',
      'booking.labelName': '성명',
      'booking.formTitle': '투어 예약',
      'booking.placeholderName': '이름을 입력하세요',
      'booking.labelPhone': '전화번호',
      'booking.placeholderPhone': '전화번호를 입력하세요',
      'booking.phoneOther': '기타',
      'booking.addonPack': '샌드듄 패키지',
      'booking.labelTourType': '투어 유형',
      'booking.typePrivate': '단독 투어',
      'booking.typeGroup': '합승 투어',
      'booking.labelDatetime': '출발 날짜 및 시간',
      'booking.pickupTime': '픽업 시간',
      'booking.sunrise': '일출',
      'booking.sunset': '일몰',
      'booking.labelGuests': '인원수',
      'booking.labelVehicles': '차량 수',
      'booking.labelNotes': '메모',
      'booking.placeholderNotes': '차량 색상 또는 기타 요청...',
      'booking.labelPickupAddress': '픽업 주소',
      'booking.placeholderPickupAddress': '픽업 주소를 입력하세요...',
      'booking.unitPrice': '단가:',
      'booking.priceBreakdown': '가격 내역',
      'booking.totalPrice': '합계:',
      'booking.bookWhatsapp': 'WhatsApp으로 예약',
      'booking.bookZalo': 'Zalo로 예약',
      'booking.or': '또는',
      'booking.callPhone': '전화 문의',
      'booking.confirmTitle': '예약 확인',
      'booking.confirmDesc': '메시지가 다음 시간 후 전송됩니다:',
      'booking.confirmEdit': '수정',
      'booking.confirmSendNow': '지금 전송',
      'cal.sun': '일', 'cal.mon': '월', 'cal.tue': '화', 'cal.wed': '수', 'cal.thu': '목', 'cal.fri': '금', 'cal.sat': '토',
      'booking.labelHotel': '호텔/리조트 이름',
      'booking.placeholderHotel': '호텔/리조트 이름 검색...',
      'booking.labelHotelAddress': '호텔/리조트 주소',
      'booking.placeholderHotelAddress': '호텔/리조트 주소...',
      'booking.labelCustomHotel': '호텔/리조트 이름 입력',
      'booking.placeholderCustomHotel': '호텔/리조트 이름을 입력하세요...',
      'booking.labelAddon': '추가 서비스',
      'booking.optionalBadge': '선택사항',
      'booking.addonSandDune': '지프로 화이트 샌드듄 오르기',
      'booking.holidaySurcharge': '명절 할증 +30%',
      'booking.labelAddonVehicles': '듄 차량 수',
      'booking.labelItinerary': '여행 경로',
      'booking.customizeRoute': '경로 맞춤 설정',
      'booking.routeOk': '완료',
      'booking.ctaTitle': '지프 투어 예약',
      'booking.ctaHint': '원하는 지프 색상이 있으신가요? 예약 시 메모란에 기재해 주세요.',
      'booking.ctaButton': '지금 예약',
      'cal.sun': '일', 'cal.mon': '월', 'cal.tue': '화', 'cal.wed': '수', 'cal.thu': '목', 'cal.fri': '금', 'cal.sat': '토',
      'cal.months': '1월,2월,3월,4월,5월,6월,7월,8월,9월,10월,11월,12월',
      'stop.whiteDune': '화이트 샌드듄',
      'stop.redDune': '레드 샌드듄',
      'stop.fishVillage': '무이네 어촌 마을',
      'stop.fairyStream': '요정 개울',
      'wa.greeting': '안녕하세요 벤 씨, 지프 투어를 예약하고 싶습니다. 제 예약 정보는 다음과 같습니다:\n',
      'wa.name': '- 이름: ',
      'wa.phone': '- 전화: ',
      'wa.tour': '- 투어: ',
      'wa.vehicles': '- 차량 수: ',
      'wa.addon': '- 추가 서비스: ',
      'wa.route': '- 경로: ',
      'wa.hotel': '- 호텔: ',
      'wa.address': '- 주소: ',
      'wa.time': '- 픽업 시간: ',
      'wa.total': '- 합계: ',
      'wa.notes': '- 메모: ',
      'wa.footer': '빠른 연락 부탁드립니다.',
      'booking.thankTitle': '감사합니다! 🎉',
      'booking.thankMessage': 'Mr. Ben 지프 투어를 예약해 주셔서 감사합니다! 곧 연락드려 여행을 확인해 드리겠습니다. 멋진 모험이 되시길 바랍니다!',
      'booking.thankClose': '닫기',
      'booking.hotelOther': '기타 호텔',
      'booking.hotelSearchPlaceholder': '검색...',
      'booking.hotelNoResult': '호텔을 찾을 수 없습니다',
    },
    de: {
      'nav.home': 'Start',
      'nav.about': 'Über Uns',
      'nav.destinations': 'Reiseziele',
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
      'dest.eyebrow': 'Unsere Reiseziele',
      'dest.title1': 'Atemberaubende',
      'dest.titleGold': 'Reiseziele',
      'dest.subtitle': 'Entdecken Sie die atemberaubenden Orte, die Sie auf unseren Jeep-Touren besuchen — von majestätischen Sanddünen bis zu verborgenen Feenbächen.',
      'dest.whiteDune.title': 'Weiße Sanddüne',
      'dest.whiteDune.desc': 'Weitläufige weiße Sanddünen, die sich bis zum Horizont erstrecken — eine Sahara-ähnliche Landschaft, perfekt für Sonnenaufgangsabenteuer und unvergessliche Fotos.',
      'dest.redDune.title': 'Rote Sanddüne',
      'dest.redDune.desc': 'Karmesinrote Dünen, die zur goldenen Stunde leuchten — der ikonischste Aussichtspunkt für Sonnenuntergänge in Mũi Né, ideal zum Sandrutschen und für Panoramablicke.',
      'dest.fishVillage.title': 'Fischerdorf Mũi Né',
      'dest.fishVillage.desc': 'Ein lebhaftes, traditionelles Fischerdorf, in dem Hunderte bunter Boote die türkisfarbene Bucht zieren — ein Fenster in das authentische vietnamesische Küstenleben.',
      'dest.fairyStream.title': 'Feenbach',
      'dest.fairyStream.desc': 'Ein magischer flacher Bach, der sich durch rot-weiße Sandsteinschluchten schlängelt, umgeben von üppigem Bambus — waten Sie barfuß durch dieses Naturwunderland.',
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
      'feat.jeepsTitle': 'Prämien Jeeps',
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
      'reviews.eyebrow': 'Was Unsere Gäste Sagen',
      'reviews.title1': 'Kunden',
      'reviews.titleGold': 'Bewertungen',
      'reviews.subtitle': 'Über 128 Fünf-Sterne-Bewertungen von Reisenden weltweit.',
      'trust.yearsUnit': 'Jahre',
      'trust.yearsDesc': 'Jeep-Erfahrung',
      'trust.happyGuests': 'Zufriedene Gäste',
      'trust.ratingDesc': 'Google Maps & TripAdvisor',
      'trust.safetyDesc': 'Sicherheit',
      'review.1.text': '"Tolle Tour! Freundlicher Fahrer, der Sonnenaufgang über den weißen Dünen war atemberaubend."',
      'review.1.name': 'Nguyen Minh Anh',
      'review.1.origin': 'Hanoi, Vietnam',
      'review.2.text': '"Bester Tour in Mui Ne! Der Fahrer zeigte uns versteckte Orte. Komme definitiv wieder!"',
      'review.2.name': 'Thomas Müller',
      'review.2.origin': 'Berlin, Deutschland',
      'review.3.text': '"Professioneller Service! Jeeps in einwandfreiem Zustand. Sehr empfehlenswert!"',
      'review.3.name': 'Anna Schmidt',
      'review.3.origin': 'München, Deutschland',
      'contact.call': 'Anrufen',
      'contact.whatsapp': 'WhatsApp',
      'contact.zalo': 'Zalo',
      'footer.desc': 'Ihr Premium-Partner für Geländeabenteuer durch die atemberaubenden Landschaften von Mũi Né und Phan Thiết.',
      'footer.quickLinks': 'Schnelllinks',
      'footer.contactInfo': 'Kontaktinformationen',
      'footer.hours': 'Täglich geöffnet: 4:00 – 21:00',
      'footer.findUs': 'Finden Sie Uns',
      'footer.copy': '© 2026 Mr. Ben Jeep Tours. Entworfen und entwickelt von',
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
      'tour.any.title': 'Beliebiger Jeep',
      'tour.any.desc': 'Keine Farbpräferenz? Wählen Sie diese Option und wir arrangieren den besten verfügbaren Jeep für Ihre Reise.',
      'booking.pricePrivate': 'Private Tour',
      'booking.priceGroup': 'Gruppenreise',
      'booking.labelName': 'Vollständiger Name',
      'booking.formTitle': 'Tour Buchen',
      'booking.placeholderName': 'Geben Sie Ihren Namen ein',
      'booking.labelPhone': 'Telefonnummer',
      'booking.placeholderPhone': 'Telefonnummer eingeben',
      'booking.phoneOther': 'Andere',
      'booking.addonPack': 'Sanddünen-Paket',
      'booking.labelTourType': 'Tourart',
      'booking.typePrivate': 'Private Tour',
      'booking.typeGroup': 'Gruppenreise',
      'booking.labelDatetime': 'Abfahrtsdatum & Uhrzeit',
      'booking.pickupTime': 'ABHOLZEIT',
      'booking.sunrise': 'SONNENAUFGANG',
      'booking.sunset': 'SONNENUNTERGANG',
      'booking.labelGuests': 'Personenanzahl',
      'booking.labelVehicles': 'Fahrzeuganzahl',
      'booking.labelNotes': 'Anmerkungen',
      'booking.placeholderNotes': 'Wählen Sie eine Farbe oder andere Wünsche...',
      'booking.labelPickupAddress': 'Abholadresse',
      'booking.placeholderPickupAddress': 'Abholadresse eingeben...',
      'booking.unitPrice': 'Preis:',
      'booking.priceBreakdown': 'Preisaufschlüsselung',
      'booking.totalPrice': 'Gesamt:',
      'booking.bookWhatsapp': 'Via WhatsApp buchen',
      'booking.bookZalo': 'Via Zalo buchen',
      'booking.or': 'oder',
      'booking.callPhone': 'Anrufen',
      'booking.confirmTitle': 'Buchung bestätigen',
      'booking.confirmDesc': 'Ihre Nachricht wird gesendet in:',
      'booking.confirmEdit': 'Bearbeiten',
      'booking.confirmSendNow': 'Jetzt Senden',
      'cal.sun': 'So', 'cal.mon': 'Mo', 'cal.tue': 'Di', 'cal.wed': 'Mi', 'cal.thu': 'Do', 'cal.fri': 'Fr', 'cal.sat': 'Sa',
      'booking.labelHotel': 'Hotel/Resort Name',
      'booking.placeholderHotel': 'Hotel/Resortname suchen...',
      'booking.labelHotelAddress': 'Hotel/Resort Adresse',
      'booking.placeholderHotelAddress': 'Hotel/Resort Adresse...',
      'booking.labelCustomHotel': 'Ihr Hotel/Resort Name',
      'booking.placeholderCustomHotel': 'Hotel/Resortnamen eingeben...',
      'booking.labelAddon': 'Zusatzservice',
      'booking.optionalBadge': 'Optional',
      'booking.addonSandDune': 'Weiße Sanddüne mit dem Jeep erkunden',
      'booking.holidaySurcharge': 'Feiertagszuschlag +30%',
      'booking.labelAddonVehicles': 'Dünen-Fahrzeuge',
      'booking.labelItinerary': 'Reiseroute',
      'booking.customizeRoute': 'Route anpassen',
      'booking.routeOk': 'Fertig',
      'booking.ctaTitle': 'Jeep-Tour Buchen',
      'booking.ctaHint': 'Wünschen Sie eine bestimmte Jeep-Farbe? Geben Sie es bei der Buchung im Notizfeld an.',
      'booking.ctaButton': 'Jetzt Buchen',
      'cal.sun': 'So', 'cal.mon': 'Mo', 'cal.tue': 'Di', 'cal.wed': 'Mi', 'cal.thu': 'Do', 'cal.fri': 'Fr', 'cal.sat': 'Sa',
      'cal.months': 'Januar,Februar,März,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember',
      'stop.whiteDune': 'Weiße Sanddüne',
      'stop.redDune': 'Rote Sanddüne',
      'stop.fishVillage': 'Fischerdorf Mui Ne',
      'stop.fairyStream': 'Feenbach',
      'wa.greeting': 'Hallo Mr. Ben, ich möchte einen Jeep buchen. Hier sind meine Buchungsinformationen:\n',
      'wa.name': '- Name: ',
      'wa.phone': '- Telefon: ',
      'wa.tour': '- Tour: ',
      'wa.vehicles': '- Fahrzeuganzahl: ',
      'wa.addon': '- Zusatzleistung: ',
      'wa.route': '- Reiseroute: ',
      'wa.hotel': '- Hotel: ',
      'wa.address': '- Adresse: ',
      'wa.time': '- Abholzeit: ',
      'wa.total': '- Gesamt: ',
      'wa.notes': '- Notizen: ',
      'wa.footer': 'Bitte kontaktieren Sie mich bald.',
      'booking.thankTitle': 'Vielen Dank! 🎉',
      'booking.thankMessage': 'Vielen Dank für Ihre Buchung einer Jeep-Tour mit Mr. Ben! Wir werden uns in Kürze bei Ihnen melden, um Ihre Reise zu bestätigen. Wir wünschen Ihnen ein tolles Abenteuer!',
      'booking.thankClose': 'Schließen',
      'booking.hotelOther': 'Anderes Hotel',
      'booking.hotelSearchPlaceholder': 'Suchen...',
      'booking.hotelNoResult': 'Kein Hotel gefunden',
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

  /* Restore saved language or auto-detect from device/browser settings */
  (function initLang() {
    let saved = localStorage.getItem('mrben-lang');

    // If no saved language, auto-detect from device/browser
    if (!saved) {
      // Get full browser language (e.g., 'vi-VN', 'en-US', 'ru-RU', 'zh-CN', 'ko-KR', 'de-DE')
      const fullLang = navigator.language || navigator.userLanguage || '';
      const browserLang = fullLang.substring(0, 2).toLowerCase();

      const supportedLangs = ['vi', 'en', 'ru', 'zh', 'ko', 'de'];

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

  /* ─── Navbar: Solid on scroll ──────────────────────────────── */
  let isScrolling = false;
  function handleScroll() {
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 60);
        backToTop.classList.toggle('visible', y > 400);
        isScrolling = false;
      });
      isScrolling = true;
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ─── Smooth Scrolling & Active Link Tracking ────────────────── */
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');

      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // Track active section on scroll
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // Enhanced Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  updateActiveLink();

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
    '.feature-card, .gallery-item, .contact-card'
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
   DESTINATIONS — Stacked Card Swiper
   Touch/drag to swipe top card away; arrows & dots navigate.
   ============================================================ */
(function () {
  'use strict';

  var MOBILE_BP = 680;

  /* Check if we are on desktop (split-hero layout mode) */
  function isDesktop() {
    return window.innerWidth > MOBILE_BP;
  }

  var stack = document.getElementById('destStack');
  var dotsWrap = document.getElementById('destDots');
  if (!stack || !dotsWrap) return;

  var cards = Array.from(stack.querySelectorAll('.destination-card'));
  var dots = Array.from(dotsWrap.querySelectorAll('.dest-dot'));
  var btnPrev = document.querySelector('.dest-arrow-prev');
  var btnNext = document.querySelector('.dest-arrow-next');
  var total = cards.length;
  var order = []; // indices into cards[] describing front→back order
  var animating = false;

  /* Build initial order: [0, 1, 2, 3] */
  for (var i = 0; i < total; i++) order.push(i);

  /* Apply stacked positions based on current order */
  function applyPositions() {
    for (var p = 0; p < total; p++) {
      var card = cards[order[p]];
      // Skip card that is mid-swipe — its animation is driven by the swipe class
      var isSwiping = card.classList.contains('dest-swipe-left') ||
                      card.classList.contains('dest-swipe-right');
      if (isSwiping) continue;
      // Remove all position classes
      card.className = card.className
        .replace(/dest-pos-\d/g, '')
        .replace(/dest-swipe-\w+/g, '')
        .replace(/dest-dragging/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      card.classList.add('dest-pos-' + Math.min(p, 3));
      card.style.transform = '';
      card.style.opacity = '';
    }
    // Update dots
    dots.forEach(function (d, di) {
      d.classList.toggle('active', di === order[0]);
    });
  }

  var SWIPE_MS = 450; // matches CSS 0.45s

  /* Navigate: card flies LEFT, next card flies in from RIGHT (next arrow ►) */
  function goNext() {
    if (animating || isDesktop()) return;
    animating = true;
    var topCard = cards[order[0]];
    // Reorder: move front card to back
    order.push(order.shift());
    // The incoming card (new front)
    var incoming = cards[order[0]];
    // Clean incoming classes and place it off-screen RIGHT (no transition)
    incoming.className = incoming.className
      .replace(/dest-pos-\d/g, '')
      .replace(/dest-swipe-\w+/g, '')
      .replace(/dest-dragging/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
    incoming.style.transition = 'none';
    incoming.style.transform = 'translateX(120%) rotate(8deg)';
    incoming.style.opacity = '0';
    incoming.classList.add('dest-pos-0');
    // Force reflow so the off-screen position is rendered
    void incoming.offsetWidth;
    // Animate old card out to the left
    topCard.classList.add('dest-swipe-left');
    // Animate incoming card to front position
    incoming.style.transition = '';
    incoming.style.transform = '';
    incoming.style.opacity = '';
    // Update the rest of the stack (push down)
    applyPositions();
    // After animation finishes, clean up
    setTimeout(function () {
      topCard.classList.remove('dest-swipe-left');
      topCard.style.transition = 'none';
      applyPositions();
      void topCard.offsetWidth;
      topCard.style.transition = '';
      animating = false;
    }, SWIPE_MS);
  }

  /* Navigate: card flies RIGHT, prev card flies in from LEFT (prev arrow ◄) */
  function goPrev() {
    if (animating || isDesktop()) return;
    animating = true;
    var topCard = cards[order[0]];
    // The card that will come to front is the last in order (previously swiped away)
    var incoming = cards[order[order.length - 1]];
    // Move it to front of order
    order.unshift(order.pop());
    // Place incoming card off-screen LEFT (no transition) so it can fly in
    incoming.className = incoming.className
      .replace(/dest-pos-\d/g, '')
      .replace(/dest-swipe-\w+/g, '')
      .replace(/dest-dragging/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
    incoming.style.transition = 'none';
    incoming.style.transform = 'translateX(-120%) rotate(-8deg)';
    incoming.style.opacity = '0';
    incoming.classList.add('dest-pos-0');
    // Force reflow so the off-screen position is rendered before animating in
    void incoming.offsetWidth;
    // Animate old card out to the RIGHT
    topCard.classList.add('dest-swipe-right');
    // Animate incoming card to front position
    incoming.style.transition = '';
    incoming.style.transform = '';
    incoming.style.opacity = '';
    // Update the rest of the stack (push down)
    applyPositions();
    // After animation finishes, clean up
    setTimeout(function () {
      topCard.classList.remove('dest-swipe-right');
      topCard.style.transition = 'none';
      applyPositions();
      void topCard.offsetWidth;
      topCard.style.transition = '';
      animating = false;
    }, SWIPE_MS);
  }

  /* Jump to a specific card index (always swipe right for forward steps) */
  function goToIndex(idx) {
    if (animating || order[0] === idx) return;
    var posInOrder = order.indexOf(idx);
    var steps = posInOrder;
    (function step(n) {
      if (n <= 0) return;
      goNext();
      setTimeout(function () { step(n - 1); }, SWIPE_MS + 40);
    })(steps);
  }

  /* Arrow buttons */
  if (btnNext) btnNext.addEventListener('click', goNext);
  if (btnPrev) btnPrev.addEventListener('click', goPrev);

  /* Dot buttons */
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var idx = parseInt(dot.getAttribute('data-idx'), 10);
      goToIndex(idx);
    });
  });

  /* ── Touch / mouse drag on top card ── */
  var startX = 0, currentX = 0, isDragging = false;

  function onPointerDown(e) {
    if (animating || isDesktop()) return;
    var topCard = cards[order[0]];
    if (!topCard.contains(e.target)) return;
    isDragging = true;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    currentX = startX;
    topCard.classList.add('dest-dragging');
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    // Prevent browser from scrolling / zooming while dragging a card
    if (e.cancelable) e.preventDefault();
    currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    var dx = currentX - startX;
    var topCard = cards[order[0]];
    var rot = dx * 0.06;
    topCard.style.transform = 'translateX(' + dx + 'px) rotate(' + rot + 'deg)';
    topCard.style.opacity = Math.max(0.3, 1 - Math.abs(dx) / 400);
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    var topCard = cards[order[0]];
    topCard.classList.remove('dest-dragging');
    var dx = currentX - startX;
    if (Math.abs(dx) > 70) {
      dx < 0 ? goNext() : goPrev();
    } else {
      // Snap back
      topCard.style.transform = '';
      topCard.style.opacity = '';
    }
  }

  stack.addEventListener('mousedown', onPointerDown);
  stack.addEventListener('touchstart', onPointerDown, { passive: true });
  document.addEventListener('mousemove', onPointerMove);
  document.addEventListener('touchmove', onPointerMove, { passive: false });
  document.addEventListener('mouseup', onPointerUp);
  document.addEventListener('touchend', onPointerUp);

  /* Set stack container height based on first card + stacking offset */
  function setStackHeight() {
    if (isDesktop()) {
      stack.style.height = '';
      return;
    }
    // Temporarily make the first card relative to measure
    var firstCard = cards[0];
    firstCard.style.position = 'relative';
    var cardH = firstCard.offsetHeight;
    firstCard.style.position = '';
    stack.style.height = (cardH + 72) + 'px'; // 72px = max stacking offset
  }

  /* Init */
  function initDest() {
    if (isDesktop()) {
      // Desktop: Split-hero layout — remove stacked classes, clear inline styles
      cards.forEach(function (card) {
        card.className = card.className
          .replace(/dest-pos-\d/g, '')
          .replace(/dest-swipe-\w+/g, '')
          .replace(/dest-dragging/g, '')
          .replace(/\s{2,}/g, ' ')
          .trim();
        card.style.transform = '';
        card.style.opacity = '';
        card.style.zIndex = '';
        card.style.transition = '';
        card.style.position = '';
      });
      stack.style.height = '';
      return;
    }
    // Mobile: stacked card swiper
    setStackHeight();
    applyPositions();
  }

  initDest();
  window.addEventListener('resize', function () {
    initDest();
  });

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

  /* ─── Cards per view (desktop = 3, mobile = 1) ───────────── */
  function cardsPerView() {
    return window.innerWidth >= MOBILE_BP ? 3 : 1;
  }

  /* ─── Update active dot + active card ───────────────────── */
  function updateUI(idx) {
    currentIdx = idx;
    var perView = cardsPerView();

    /* dots: highlight perView consecutive dots */
    dotsEl.querySelectorAll('.tours-dot').forEach(function (d, i) {
      d.classList.toggle('active', i >= idx && i < idx + perView);
    });

    /* cards: all visible cards get is-active (no dimming on desktop) */
    cards.forEach(function (card, i) {
      card.classList.toggle('is-active', i >= idx && i < idx + perView);
    });

    btnPrev.disabled = false;
    btnNext.disabled = false;
  }

  /* ─── Animate incoming active cards ─────────────────────── */
  function animateActiveCards(idx, dir) {
    var perView = cardsPerView();
    var animName = dir === 'prev' ? 'tourCardInPrev' : 'tourCardInNext';
    for (var i = idx; i < idx + perView; i++) {
      var card = cards[i];
      if (!card) continue;
      card.style.animation = 'none';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          card.style.animation = animName + ' 0.42s cubic-bezier(0.25,0.46,0.45,0.94) both';
        });
      });
    }
  }

  /* ─── Scroll to card by index ────────────────────────────── */
  function goTo(idx, instant, dir) {
    clearTimeout(loopTimeout);
    const card = cards[idx];
    if (!card) return;
    grid.scrollTo({
      left: card.offsetLeft - grid.offsetLeft,
      behavior: instant ? 'instant' : 'smooth'
    });
    updateUI(idx);
    if (!instant) animateActiveCards(idx, dir || 'next');
  }

  /* ─── Arrow clicks – group-aware loop ───────────────────── */
  btnPrev.addEventListener('click', function () {
    var perView = cardsPerView();
    var maxIdx = cards.length - perView;
    var step = perView; // Desktop jumps by 3, mobile by 1

    var prev = currentIdx - step;
    if (prev < 0) {
      // If we are at the beginning, loop to the end
      prev = currentIdx === 0 ? maxIdx : 0;
    }
    goTo(prev, false, 'prev');
  });

  btnNext.addEventListener('click', function () {
    var perView = cardsPerView();
    var maxIdx = cards.length - perView;
    var step = perView; // Desktop jumps by 3, mobile by 1

    var next = currentIdx + step;
    if (next > maxIdx) {
      // If we exceed maxIdx, loop to start or snap to maxIdx
      next = currentIdx === maxIdx ? 0 : maxIdx;
    }
    goTo(next, false, 'next');
  });

  /* ─── Track active card natively using IntersectionObserver ─────────── */
  function setupObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          /* Add is-active to the intersecting card */
          entry.target.classList.add('is-active');
          const idx = cards.indexOf(entry.target);
          if (idx !== -1) {
            currentIdx = idx;
            /* update dots purely visually, don't trigger gotos */
            dotsEl.querySelectorAll('.tours-dot').forEach(function (d, i) {
              d.classList.toggle('active', i === idx);
            });
          }
        } else {
          entry.target.classList.remove('is-active');
        }
      });
    }, {
      root: grid,
      threshold: 0.6 /* Card is considered active when 60% is visible */
    });

    cards.forEach(card => observer.observe(card));
  }

  /* ─── Init ───────────────────────────────────────────────── */
  function init() {
    cards = Array.from(grid.querySelectorAll('.tour-card'));
    buildDots();

    if (cardsPerView() === 1) {
      setupObserver();
    } else {
      updateUI(0);
    }

    /* Block horizontal trackpad/wheel scroll on desktop;
       let vertical scroll pass through to the page */
    grid.addEventListener('wheel', function (e) {
      var isHorizontal = Math.abs(e.deltaX) >= Math.abs(e.deltaY);
      if (isHorizontal) {
        e.preventDefault(); // stop card from drifting sideways
      }
      // vertical deltaY — do NOT prevent default so page scrolls normally
    }, { passive: false });
  }

  init();

})();

/* ============================================================
   BOOKING MODAL
   ============================================================ */
(function () {
  'use strict';

  /* ── Prices (VND, raw numbers) ── */
  var PRICE_PRIVATE = 500000;
  var PRICE_GROUP = 150000;

  /* ── State ── */
  var tourType = 'private'; // 'private' | 'group'
  var guests = 1;
  var vehicleCount = 1;
  var tourName = 'Xe Jeep Mr. Ben';
  var tourNameVi = 'Xe Jeep Mr. Ben'; // luôn là tiếng Việt, dùng cho chatbot
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
    var unit = 0;
    if (tourType === 'private') {
      unit = pricePrivate;
    } else if (tourType === 'group') {
      unit = priceGroup;
    }

    var count = (tourType === 'group') ? guests : vehicleCount;
    var baseTotal = unit * count;

    // Sand dune addon: 900k per vehicle (private) or 900k per person (group)
    var addonTotal = 0;
    var finalTotal;
    if (addonSandDuneSelected) {
      if (tourType === 'private') {
        addonTotal = ADDON_PRICE_PER_VEHICLE * vehicleCount;
        finalTotal = addonTotal;
      } else if (tourType === 'group') {
        addonTotal = ADDON_PRICE_PER_VEHICLE;
        finalTotal = addonTotal;
      } else {
        finalTotal = baseTotal;
      }
    } else {
      finalTotal = baseTotal;
    }

    // Holiday surcharge: +30% if date is 27/8 – 2/9
    var holidayActive = isHolidaySurcharge();
    var surchargeAmount = 0;
    if (holidayActive && finalTotal > 0) {
      surchargeAmount = Math.round(finalTotal * HOLIDAY_SURCHARGE_RATE);
      finalTotal = finalTotal + surchargeAmount;
    }

    // Get translation strings
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var t = (window.__MRB_TRANS || {})[lang] || {};

    // Get UI elements
    var tourTypeRow = document.getElementById('bfPriceTourType');
    var tourTypeIcon = document.getElementById('bfPriceTourTypeIcon');
    var tourTypeLabel = document.getElementById('bfPriceTourTypeLabel');
    var tourTypeValue = document.getElementById('bfPriceTourTypeValue');
    var quantityRow = document.getElementById('bfPriceQuantity');
    var quantityIcon = document.getElementById('bfPriceQuantityIcon');
    var quantityLabel = document.getElementById('bfPriceQuantityLabel');
    var quantityValue = document.getElementById('bfPriceQuantityValue');
    var addonRow = document.getElementById('bfPriceAddon');
    var addonValue = document.getElementById('bfPriceAddonValue');
    var holidayRow = document.getElementById('bfPriceHoliday');
    var holidayValue = document.getElementById('bfPriceHolidayValue');
    var holidayLabel = document.getElementById('bfPriceHolidayLabel');

    // Hide all by default
    if (tourTypeRow) tourTypeRow.style.display = 'none';
    if (quantityRow) quantityRow.style.display = 'none';
    if (addonRow) addonRow.style.display = 'none';
    if (holidayRow) holidayRow.style.display = 'none';

    // Show details only if tour type is selected
    if (tourType) {
      // Tour Type Row
      if (tourTypeRow && tourTypeLabel && tourTypeValue) {
        tourTypeRow.style.display = 'flex';
        if (tourType === 'private') {
          if (tourTypeIcon) tourTypeIcon.className = 'fas fa-user-shield';
          tourTypeLabel.textContent = t['booking.typePrivate'] || 'Tour Riêng Tư';
        } else {
          if (tourTypeIcon) tourTypeIcon.className = 'fas fa-users';
          tourTypeLabel.textContent = t['booking.typeGroup'] || 'Tour Ghép';
        }
        tourTypeValue.textContent = fmt(unit);
      }

      // Quantity Row - Always show when tour type is selected
      if (quantityRow && quantityIcon && quantityLabel && quantityValue) {
        quantityRow.style.display = 'flex';
        if (tourType === 'private') {
          quantityIcon.className = 'fas fa-car';
          quantityLabel.textContent = t['booking.labelVehicles'] || 'Số Lượng Xe';
          quantityValue.textContent = '× ' + vehicleCount;
        } else {
          quantityIcon.className = 'fa-solid fa-person-circle-plus';
          quantityLabel.textContent = t['booking.labelGuests'] || 'Số Người';
          quantityValue.textContent = '× ' + guests;
        }
      }

      // Addon Row - Show below Quantity if selected (without price)
      if (addonSandDuneSelected && addonRow) {
        addonRow.style.display = 'flex';
        addonRow.classList.add('bf-price-item--addon'); // Apply special premium addon styling
        // Don't show price for addon
      } else if (addonRow) {
        addonRow.classList.remove('bf-price-item--addon'); // Remove when not selected
      }

      // Holiday Surcharge Row - Show if date is in 27/8 – 2/9
      if (holidayActive && holidayRow && holidayValue) {
        holidayRow.style.display = 'flex';
        if (holidayLabel) holidayLabel.textContent = t['booking.holidaySurcharge'] || 'Phụ thu lễ';
        holidayValue.textContent = '+' + fmt(surchargeAmount);
      }
    }

    // Legacy support - keep old elements working
    if (unitPriceEl) {
      var unitText = '—';
      if (tourType) {
        unitText = fmt(unit);
        if (addonSandDuneSelected) {
          var packText = t['booking.addonPack'] || 'Gói Đồi Cát';
          unitText = '(' + unitText + ' + ' + packText + ')';
        }

        var vehicleStr = 'xe';
        var guestStr = 'người';
        if (lang === 'en') { vehicleStr = 'vehicles'; guestStr = 'people'; }
        else if (lang === 'ru') { vehicleStr = 'авто'; guestStr = 'чел.'; }
        else if (lang === 'zh') { vehicleStr = '辆'; guestStr = '人'; }
        else if (lang === 'ko') { vehicleStr = '대'; guestStr = '명'; }
        else if (lang === 'de') { vehicleStr = 'Fahrzeuge'; guestStr = 'Personen'; }

        if (tourType === 'private') {
          unitText += ' × ' + vehicleCount + ' ' + vehicleStr;
        } else {
          unitText += ' × ' + guests + ' ' + guestStr;
        }
      } else if (addonSandDuneSelected) {
        unitText = t['booking.addonPack'] || 'Gói Đồi Cát';
      }
      unitPriceEl.textContent = unitText;
    }

    // Total
    if (totalEl) {
      totalEl.textContent = finalTotal > 0 ? fmt(finalTotal) : '—';
    }
  }

  function setTourType(type) {
    tourType = type;
    if (type === 'private') {
      btnPrivate.classList.add('active');
      btnGroup.classList.remove('active');
      if (guestGroup) guestGroup.style.display = 'none';
      if (vehicleGroup) vehicleGroup.style.display = '';
    } else {
      btnGroup.classList.add('active');
      btnPrivate.classList.remove('active');
      if (guestGroup) guestGroup.style.display = '';
      if (vehicleGroup) vehicleGroup.style.display = 'none';
    }
    btnPrivate.classList.remove('bf-error');
    btnGroup.classList.remove('bf-error');
    updatePrice();
  }

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
    setDefaultDatetime();
    /* Reset tour type — no pre-selection */
    tourType = '';           /* không có mặc định, người dùng phải chọn */
    if (btnPrivate) { btnPrivate.classList.remove('active'); btnPrivate.classList.remove('bf-error'); }
    if (btnGroup) { btnGroup.classList.remove('active'); btnGroup.classList.remove('bf-error'); }
    /* Ẩn cả hai trường Số lượng xe và Số người khi chưa chọn loại tour */
    if (guestGroup) guestGroup.style.display = 'none';
    if (vehicleGroup) vehicleGroup.style.display = 'none';

    // Clear route drops
    if (window.bfRouteResetAll) window.bfRouteResetAll();

    // Remove errors
    ['bfName', 'bfPhone', 'bfHotelCustomName', 'bfHotelAddress'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        var targetEl = el.closest('.bf-hotel-input-row') || el;
        targetEl.classList.remove('bf-error');
      }
    });
  }

  /* ── Open modal ── */
  function openBooking(data) {
    tourName = data.name || 'Xe Jeep Mr. Ben';
    tourNameVi = data.nameVi || tourName; // dùng tên Việt, fallback về tourName nếu không có
    pricePrivate = data.private || PRICE_PRIVATE;
    priceGroup = data.group || PRICE_GROUP;

    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var t = (window.__MRB_TRANS || {})[lang] || {};
    var perText = t['tour.price.per'] || '/người';

    tourNameEl.textContent = tourName;
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

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('mrben-booking-open'));
  }

  function closeBooking() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Bind unified "Đặt Xe Ngay" CTA button ── */
  var jbcBookBtn = document.getElementById('jbcBookBtn');
  if (jbcBookBtn) {
    jbcBookBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openBooking({ name: 'Xe Jeep Mr. Ben', nameVi: 'Xe Jeep Mr. Ben', private: PRICE_PRIVATE, group: PRICE_GROUP });
    });
  }

  /* Also keep "Book Now" in navbar CTA working */
  document.querySelectorAll('.nav-cta').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openBooking({ name: 'Xe Jeep Mr. Ben', nameVi: 'Xe Jeep Mr. Ben', private: PRICE_PRIVATE, group: PRICE_GROUP });
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
  // Also sync on initial load
  setPhoneCode(localStorage.getItem('mrben-lang') || 'vi');

  // Link generation is now handled dynamically on "Book" click.

  function buildMessage(isHtml) {
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

  function sendToTelegram() {
    // =========================================================
    // LUỒNG 1: GỬI TIN NHẮN TỨC THÌ QUA CLOUDFLARE WORKER 
    // =========================================================
    var rawMsg = buildMessage(true); // Lấy chuỗi HTML
    var workerUrl = 'https://mrbenjeeptours.vochicuong-bin04.workers.dev';

    if (workerUrl === 'YOUR_CLOUDFLARE_WORKER_URL_HERE') {
      console.warn('Bạn chưa cập nhật link Cloudflare Worker. Tin nhắn Telegram sẽ không được gửi.');
    } else {
      fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: rawMsg,
          parse_mode: 'HTML' // Yêu cầu telegram render mã HTML
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.success) {
            console.log('Đã gửi thông tin đến Telegram Group thành công thông qua Worker.');
          } else {
            console.error('Lỗi khi gửi qua Worker:', data);
          }
        })
        .catch(function (e) { console.error('Lỗi kết nối tới Worker:', e); });
    }

    // =========================================================
    // LUỒNG 2: ĐẨY DỮ LIỆU SANG MAKE.COM ĐỂ TẠO LỊCH GOOGLE CALENDAR
    // =========================================================
    var webhookUrl = 'https://hook.eu1.make.com/hz6g13pxrevta33z5piw4x5i7tko0vcd';

    // Thu thập các biến thô để Make.com có thể bóc tách
    var name = document.getElementById('bfName').value.trim();
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
      hotelName = document.getElementById('bfHotelCustomName') ? document.getElementById('bfHotelCustomName').value.trim() : '';
    } else {
      hotelName = hotelObj ? hotelObj.value.trim() : '';
    }
    var hotelAddr = document.getElementById('bfHotelAddress') ? document.getElementById('bfHotelAddress').value.trim() : '';

    var pickupObj = document.getElementById('bfPickupAddress');
    var pickup = pickupObj ? pickupObj.value.trim() : '';

    var dtRaw = dtInput.value ? dtInput.value.replace('T', ' ') : '';
    var dt = '—';
    if (dtRaw) {
      var dtParts = dtRaw.split(' ');
      if (dtParts.length === 2) {
        var dateParts = dtParts[0].split('-');
        var paddedDay = dateParts[2].length === 1 ? '0' + dateParts[2] : dateParts[2];
        dt = paddedDay + '-' + dateParts[1] + '-' + dateParts[0] + ' | ' + dtParts[1];
      } else {
        dt = dtRaw;
      }
    }

    var timeOnly = dtRaw ? (dtRaw.split(' ')[1] || '') : '';
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

    var notes = document.getElementById('bfNotes').value.trim();
    var tVi = (window.__MRB_TRANS || {})['vi'] || {};
    var addonStr = tVi['booking.addonSandDune'] || 'Leo đồi cát trắng bằng xe Jeep';
    var finalRouteVi = window.__bfCurrentRouteVi || '';

    var now = new Date();
    var nowDt = ('0' + now.getDate()).slice(-2) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear() + ' | ' + ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);

    // Đóng gói thành JSON cho Make.com
    var bookingData = {
      name: name,
      fullPhone: fullPhone,
      tourLine: tourLine,
      tourType: tourType === 'private' ? 'Tour Riêng Tư' : 'Tour Ghép',
      vehicleStr: vehicleStr,
      addonSandDuneSelected: addonSandDuneSelected,
      addonStr: addonStr,
      finalRouteVi: finalRouteVi,
      pickup: pickup,
      hotelName: hotelName,
      hotelAddr: hotelAddr,
      dt: dt,
      dtIso: dtInput.value,
      holidaySurcharge: isHolidaySurcharge(),
      totalText: totalText,
      notes: notes,
      nowDt: nowDt
    };

    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
      .then(function (r) { console.log('Ting ting! Đã đẩy dữ liệu lịch sang Make.com thành công!'); })
      .catch(function (e) { console.error('Lỗi kết nối tới Make.com:', e); });
  }

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
      if (countdownSecs <= 0) { clearInterval(confirmTimer); executeSend(); }
    }, 1000);
  }

  function closeConfirmModal() {
    clearInterval(confirmTimer);
    if (confirmModal) {
      confirmModal.classList.remove('open');
    }
    pendingPlatform = null;
    pendingLink = '';
  }

  function executeSend() {
    if (pendingLink) {
      sendToTelegram();
      var a = document.createElement('a');
      a.href = pendingLink;
      a.target = '_blank';
      a.click();

      // Clear form after successful send
      setTimeout(function () {
        resetBookingForm();
      }, 500);
    }
    closeConfirmModal();
    // Show thank-you modal after sending
    openThankModal();
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
    var isValid = true;
    var firstErr = null;

    var T = (window.__MRB_TRANS || {})[localStorage.getItem('mrben-lang') || 'vi'] || {};
    var reqFields = [
      { id: 'bfName', text: T['wa.name'] || 'Họ tên' },
      { id: 'bfPhone', text: T['wa.phone'] || 'SĐT' },
      // Check Hotel Name. If custom, check Custom Name.
      { id: 'bfHotelName', text: T['wa.hotel'] || 'Khách sạn' },
      { id: 'bfHotelAddress', text: T['wa.hotelAddress'] || 'Địa chỉ' }
    ];

    var hotelNameEl = document.getElementById('bfHotelName');
    var hotelWrapEl = document.getElementById('bfHotelWrap');
    if (hotelNameEl && hotelWrapEl && hotelWrapEl.classList.contains('is-other-selected')) {
      reqFields.push({ id: 'bfHotelCustomName', text: T['wa.hotel'] || 'Khách sạn' });
    }

    reqFields.forEach(function (f) {
      var el = document.getElementById(f.id);
      if (el) {
        var targetEl = el.closest('.bf-hotel-input-row') || el;
        var val = el.value.trim();
        var isInvalid = !val;

        // Custom validation logic
        if (f.id === 'bfName' && val) {
          // Name cannot contain numbers
          if (/[0-9]/.test(val)) isInvalid = true;
        } else if (f.id === 'bfPhone' && val) {
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
    } else {
      if (dtTrigger) dtTrigger.classList.remove('bf-error');
    }

    // Check Tour Type (must have one active button)
    var btnPriv = document.getElementById('bfTypePrivate');
    var btnGrp = document.getElementById('bfTypeGroup');
    if (btnPriv && btnGrp) {
      if (!btnPriv.classList.contains('active') && !btnGrp.classList.contains('active')) {
        btnPriv.classList.add('bf-error');
        btnGrp.classList.add('bf-error');
        isValid = false;
        if (!firstErr) firstErr = btnPriv;
      } else {
        btnPriv.classList.remove('bf-error');
        btnGrp.classList.remove('bf-error');
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
  ['bfName', 'bfPhone', 'bfHotelCustomName', 'bfHotelAddress'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () {
        var targetEl = el.closest('.bf-hotel-input-row') || el;
        targetEl.classList.remove('bf-error');

        // Strip numbers from Name
        if (id === 'bfName') {
          this.value = this.value.replace(/[0-9]/g, '');
        }
        // Strip non-numbers from Phone
        if (id === 'bfPhone') {
          this.value = this.value.replace(/\D/g, '');
        }
      });
    }
  });

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

  var btnCall = document.querySelector('.bf-btn-call');
  if (btnCall) {
    btnCall.addEventListener('click', function (e) {
      e.preventDefault();
      if (validateBookingForm()) {
        sendToTelegram();
        // Open the tel: link
        window.location.href = btnCall.getAttribute('href');
        // Clear form after successful send
        setTimeout(function () {
          resetBookingForm();
        }, 500);
        // Show thank-you modal
        openThankModal();
      }
    });
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

  if (!dtWrap) return;

  var todayDate = new Date(); todayDate.setHours(0, 0, 0, 0);
  var curYear = todayDate.getFullYear();
  var curMonth = todayDate.getMonth();
  var selDate = null;
  var selHour = 5;
  var selMin = 0;
  var MINS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

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
      /* Today disabled only when BOTH slots (13:30) have passed */
      var todayFullyPassed = isToday && nm >= SUNSET_MINS;

      if (isPast || todayFullyPassed) el.classList.add('disabled');
      if (isToday) el.classList.add('today');
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
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};
    var label = hour === 4
      ? (T['booking.sunrise'] || 'Bình Minh')
      : (T['booking.sunset'] || 'Hoàng Hôn');
    dtDisplay.textContent = pad(d) + '/' + pad(mo) + '/' + y + ' | ' + label + ' (' + pad(hour) + ':' + pad(min) + ')';
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
    selHour = null; selMin = null;   /* no slot pre-selected */
    curYear = todayDate.getFullYear(); curMonth = todayDate.getMonth();
    dtHidden.value = '';
    dtTrigger.classList.remove('has-value');
    /* Clear any lingering slot highlights */
    [sunriseBtn, sunsetBtn].forEach(function (b) { b && b.classList.remove('selected'); });
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

  // Translate Date & Time label dynamically
  document.addEventListener('mrben-langchange', function () {
    if (selDate && selHour !== null && selMin !== null) {
      confirmSlot(selHour, selMin);
    } else {
      var lang = localStorage.getItem('mrben-lang') || 'vi';
      var TRANS = window.__MRB_TRANS || {};
      var placeholder = (TRANS[lang] && TRANS[lang]['booking.datePlaceholder']) || 'Chọn ngày & giờ khởi hành';
      dtDisplay.textContent = placeholder;
    }
  });

})();

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

/* ═══════════════════════════════════════════════════
   Hotel Autocomplete IIFE
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  var hotelData = [
    { name: '3B MAISON Homestay & Villa', address: '124 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Adachi Homestay Phan Thiết', address: '86/3 Nguyễn Công Hoan, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Allezboo Beach Resort', address: '8 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ananda Resort', address: '148 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Anantara Mui Ne Resort', address: '12A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'An Vinh - Analog House', address: 'Khu dân cư Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Apec Mandala Cham Bay Mui Ne', address: 'Đường ĐT716, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Areca Muine Homestay', address: 'Hẻm 251 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Aroma Beach Resort & Spa', address: 'Khu 5, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Asteria Mui Ne Resort', address: '8 Xuân Thủy, Khu phố 5, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Aurora Mũi Né Homestay', address: 'Đường Bùi Xuân Phái, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ẩn Homestay Mũi Né', address: '121 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bamboo Village Beach Resort', address: '38 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bao Quynh Bungalow Resort', address: '26 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bao Tram Guesthouse', address: '66 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Blue Bay Mui Ne Resort & Spa', address: 'Khu phố Suối Nước, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Blue Ocean Resort', address: '54 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Blue Shell Resort', address: 'Khu phố 5, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bonnie Homestay - Mũi Né', address: '201/5 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bọt Biển Homestay Mũi Né', address: 'Đường Nguyễn Hữu Thọ, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cà Ty Mui Ne Resort', address: '6 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Canary Beach Resort', address: '60 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cat Tien Guesthouse', address: '59 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cargo Remote Mui Ne', address: '201/88 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Centara Mirage Resort Mui Ne', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cesar Homestay', address: '124 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cham Villas Boutique Resort', address: '32 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Champa Resort & Spa', address: '2 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Charm Hon Rom Villas Resort', address: '75 Nguyễn Cơ Thạch, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Coco Beach Resort', address: '58 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Coco Cottage Beachfront Resort', address: '48 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Coconut Garden Villas', address: ' 230/1 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Connect Homestay Mũi Né', address: '151 Chế Lan Viên, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Coral Sea Resort Mui Ne', address: '76 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'De\' Tuva Resort Mui Ne', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Delight Hotel Mui Ne', address: '109B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Diem Lien Guesthouse', address: '85 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Du Parc Resort Mũi Né', address: 'Xuân Thuy, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Dynasty Mui Ne Beach Resort - Hoang Trieu', address: '140A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Đen Homestay Mũi Né', address: '248 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Đồi Dừa Homestay', address: 'St thôn Hồ Quang Cảnh, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Eva Hut Homestay Mũi Né', address: '202 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Fairy Hills Hotel', address: '129/16 Chế Lan Viên, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Full Moon Village', address: '86/153 Nguyễn Cơ Thạch, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Four Oceans Resort', address: 'Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Gem\'s House Homestay&Villa', address: '201/4 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Gia An Guesthouse', address: '100 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Gió - Homestay and Coffee', address: 'Khu phố 15, Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Góc Biển Homestay Mũi Né', address: '153 Chế Lan Viên, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Goldsand Hill Villa', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Grace Boutique Resort', address: '144A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Green Star Premium Resort', address: '1 Nguyễn Cơ Thạch, khu phố Long Sơn, phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hà Anh Hotel', address: '91A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hải Âu Mui Ne Beach Resort', address: '32 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'HAI GIA RESORT', address: '72A Huỳnh Thúc Kháng, khu phố 4, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hải Yên Family Hotel', address: 'Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hiep Hoa Resort', address: '80 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hill Lodge Mui Ne', address: 'E6 Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hill Villa - Mui Ne', address: '201/88 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hoang Kim Golden Resort', address: '97 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hoàng Lai Hotel Mũi Né', address: '139/19A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hoàng Ngọc Beach Resort', address: '152 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Homestay 211 Mũi Né', address: '211 Tô Hiệu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Homestay BONO Mũi Né', address: '200 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hon Rom Central Beach Resort', address: 'Khu phố Long Sơn, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hòn Rơm 1 Resort', address: 'Long Sơn, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hung Phuc Mui Ne Hotel', address: '55 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'I Hostel Muine', address: 'Hẻm 188 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'iHome Backpacker Resort', address: 'Quarter 2 City, Hòa Bình, Street Ward, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'IRINI Boutique Homestay Mui Ne', address: '148 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Joe\'s Cafe & Garden Resort', address: '86 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Khách sạn Bảo Tiên', address: '56 Huỳnh Tấn Phát, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Khách sạn MiNhon', address: '210/5 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Khách sạn Pacific Mũi Né', address: '138A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Khách sạn Phạm Gia - Mũi Né', address: '371B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Kim Village Mũi Né Resort', address: 'Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Kiwi\'s Homestay & Cafe', address: '114 Nguyễn Hữu Thọ, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'La Mer Bali Mũi Né', address: '124 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'La Mer Hotel Mũi Né', address: '168 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Lang Chai Guesthouse', address: '230/2 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Lavender Mui Ne Hotel', address: '17B Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Le Huynh Mui Ne Hotel', address: '135 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Le\' VIVA Resort Mũi Né', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Little Mui Ne Cottages Resort', address: '10B Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Little Paris Resort', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Long Beach Resort', address: '130 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'LOTUS GARDEN RESORT', address: '200 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Lotus Mui Ne Resort', address: 'Khu 5, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Maidi Homestay Mui Ne', address: '151 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Manila Resort', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'MAY Bungalow Mui Ne', address: '246/2 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Melon Resort Mui Ne', address: 'Khu phố 5, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Meraki Oasis Hotel', address: '150 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mi Nhon Em Hotel Mui Ne (Mignonne Em)', address: '202 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mia Resort Mui Ne', address: '24 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Min\'s Homestay', address: '233 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Minh Hùng Hotel', address: '147 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Minh Ngoc Hotel', address: '72 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Minh Tam Resort', address: '130C Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Moonbeam Homestay & Mini-resort Mui Ne', address: '16 Bùi Xuân Phái, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mon Villa Mũi Né', address: '199 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Morocco Villa Mui Ne', address: 'Khu phố 1 Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mộc Villa Homestay', address: 'Hồ Quang Cảnh, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'MUI NE ALENA BUNGALOW HOTEL', address: '265/5 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Backpacker Village', address: '137 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Beach Hotel', address: '285 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Hills Bliss Hotel', address: '69B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Hills Budget Hotel', address: '69 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Lodge', address: '90A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Ocean House', address: '177 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mũi Né Paradise Resort', address: '130D Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mũi Né Sport Hotel', address: 'Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Village Resort', address: '189 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Xanh Hotel', address: '31 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Muine Bay Resort', address: 'Khu phố 14, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Muine de Century Beach Resort', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Muine Ocean Resort & Spa', address: '10 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mường Thanh Holiday Mũi Né', address: '54 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Myla Havana Resort', address: '126A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nam Chau Boutique Resort', address: 'Khu phố 5, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nam Hai Hotel', address: '21 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Năm Thọ Guesthouse', address: '1 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Né Chill House', address: '63 Tô Ngọc Lâm, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ngoc Sang Guesthouse', address: '12A Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà của Síu Síu', address: '8 Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Anh Linh', address: '103 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ BiBo', address: '119 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Biển Nguồn', address: '97 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Châu Linh', address: '93 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Duy Vũ', address: '131 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Đồng Ngân', address: '45/7D Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Đồng Phát', address: '79 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Đức Thảo', address: '81 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Gấu Trúc', address: '25 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Gió Biển', address: '117 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Hoàng Nga', address: '43 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Hồng Di', address: '70 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Hùng An', address: '116 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Hùng Hà', address: '229 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Huyền Trân', address: 'Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Ken', address: '225 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Lử Hoàng', address: '106 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Minh Kha', address: '109A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Minh Khôi', address: '149 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Nam Khải', address: '107 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Nhật Quang', address: '46 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Nhật Thi', address: '115 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Sứ Trắng', address: '3B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Tám Ù', address: '3B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Thanh Duy', address: '243 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Thành Quang', address: '13 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Thắng KenG', address: '185 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Thiên Sơn', address: '102 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Vườn Xoài', address: '5 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'NOOI Homestay Mũi Né', address: '172 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Novela Mui Ne Resort & Spa', address: '96A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ocean Front Hotel', address: '11 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ocean Place Resort', address: '192/2 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ocean Star Resort', address: '22 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ocean Valley Hotel', address: '187 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Palado Hotel Mui Ne', address: '98B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Palette Muine Boutique Hotel', address: '21 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Palmira Beach Resort & Spa', address: '14 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Pandanus Resort', address: '3 Nguyễn Hữu Thọ, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Peace Resort', address: 'Xuân Thủy, Khu phố Suối Nước, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Pharos Guesthouse', address: '89 Hòa Bình, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Phú Hải Beach Resort & Spa', address: 'Khu 5, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Phuong Tay Guest House', address: '8 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Phương Nhung Hotel & Coffee', address: '283C Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Poshanu Resort Mui Ne', address: 'Khu phố 5, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'QT Villa', address: 'Chế Lan Viên, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Quoc Dinh Guesthouse', address: '123 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Radisson Resort Mui Ne', address: '16 Nguyễn Cơ Thạch, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Rang Garden Beach Resort', address: '128A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ravenala MuiNe Resort', address: '146 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Resort Đỗ Khoa', address: '126B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ripple house', address: '67 Hòa Bình, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Riva Resort Mui Ne', address: '94 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Romana Resort & Spa', address: 'Km 8, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Sài Gòn - Mũi Né Resort', address: '56-97 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sailing Club Mui Ne', address: '24 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sand Beach Resort', address: '128 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sandunes Beach Resort & Spa', address: 'Khu phố 5, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sea Links Beach Hotel', address: 'Km 9, Nguyễn Thông, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Sea Lion Beach Resort', address: '12 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sea Senses HomeStay', address: 'Chưa xác định được số nhà chính xác' },
    { name: 'Seahorse Resort & Spa', address: 'Xuân Thủy, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sea Winds Resort', address: '139 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Second House', address: '157/10 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Serenity by the Sea', address: '88 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'SiLa House – Garden Room', address: '199/10 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Son Tra Guesthouse', address: '87B Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Song Anh Mui Ne Guesthouse', address: '4 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sóng Biển Xanh Mũi Né Resort', address: '26 Xuân Thủy, Long Sơn, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sun & Sands Beach Resort', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sunny Beach Resort', address: '64-66 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sunny Homestay', address: '141 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sunrise Oceanfront Mui Ne - V Ruby', address: 'ĐT716, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sunrise Resort', address: '72 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sunsea Resort', address: '50 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Suối Hồng Resort', address: '1 Nguyễn Hữu Thọ, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Suri Mũi Né Homestay', address: '251/2 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Swiss Village Resort & Spa', address: '44 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Terracotta Resort & Spa', address: '28 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Thái Hòa Mũi Né Resort', address: '56 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Thao Ha Hotel', address: '115 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'The Anam Mui Ne', address: '18 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'The Cliff Resort & Residences', address: 'Khu 5, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'The Happy Ride Glamping Mũi Né', address: 'Hẻm 7 Xuân Thủy, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'The Legend Coco Beach', address: 'Hòa Bình, Street, Quarter 2, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'The Little Garden Mui Ne Homestay', address: '233A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'The Mui Ne Resort', address: '144 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'The Sailing Bay Beach Resort', address: '107 Hồ Xuân Hương, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'The Sky Homestay', address: '66/5 Nguyễn Công Hoan, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'The Thousand Village', address: '66 Nguyễn Hữu Thọ, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Thiện Trung Minihouse', address: '93 Trần Khát Chân, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Tien Dat Resort & Spa', address: '94A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Tony\'s House Mũi Né Hotel', address: '18C Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Tuong Vy Boutique Hotel', address: '193 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Unique Mui Ne Resort', address: '20B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Venus MuiNe Hotel', address: '202 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Victoria Phan Thiet Beach Resort', address: 'Km 9, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Viet\'s Hotel', address: 'Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Villa Aria Mui Ne', address: '60A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Villa Wabisabi', address: '251/9 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' }, 
    { name: 'Vinh Sương Seaside Hotel', address: '46 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Vipol Hotel Mui Ne', address: '29A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'VIVA BEACH RESORT Mui Ne', address: '134 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Volga Apartment Hotel', address: '219 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Vuon Tra Resort', address: '146 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Wanderlust garden inn', address: '375/3 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Wanderlust Hotel', address: '375 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Windy Hills Hotel', address: '299 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Xin Chào Hotel', address: '129 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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

  /* Apply i18n to "other hotel" on init */
  (function initOtherHotelI18n() {
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};
    var otherStr = T['booking.hotelOther'] || 'Khách sạn khác';
    var otherObj = hotelData[hotelData.length - 1];
    if (otherObj && otherObj._isOther) {
      otherObj.name = otherStr;
    }
  })();

  /* Address read-only by default */
  addrInput.setAttribute('readonly', '');

  /* ── Fake thick caret for address input ── */
  (function initFakeCaret() {
    var addrRow = addrInput.closest('.bf-hotel-input-row');
    if (!addrRow) return;
    addrRow.style.position = 'relative';

    var fakeCaret = document.createElement('span');
    fakeCaret.className = 'bf-fake-caret';
    fakeCaret.style.display = 'none';
    addrRow.appendChild(fakeCaret);

    /* Measure text width using canvas for caret positioning */
    var measureCanvas = document.createElement('canvas');
    var ctx = measureCanvas.getContext('2d');

    function getInputStyle() {
      var cs = window.getComputedStyle(addrInput);
      return cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    }

    function updateCaretPos() {
      if (addrInput.hasAttribute('readonly')) {
        fakeCaret.style.display = 'none';
        return;
      }
      if (document.activeElement !== addrInput) {
        fakeCaret.style.display = 'none';
        return;
      }
      fakeCaret.style.display = '';

      var selStart = addrInput.selectionStart || 0;
      var textBefore = addrInput.value.substring(0, selStart);

      ctx.font = getInputStyle();
      var textW = ctx.measureText(textBefore).width;

      /* Account for input's internal padding + icon offset */
      var inputRect = addrInput.getBoundingClientRect();
      var rowRect = addrRow.getBoundingClientRect();
      var offsetLeft = inputRect.left - rowRect.left;

      fakeCaret.style.left = (offsetLeft + textW) + 'px';
    }

    addrInput.addEventListener('focus', function () { updateCaretPos(); });
    addrInput.addEventListener('blur', function () { fakeCaret.style.display = 'none'; });
    addrInput.addEventListener('input', function () { updateCaretPos(); });
    addrInput.addEventListener('click', function () { updateCaretPos(); });
    addrInput.addEventListener('keyup', function () { updateCaretPos(); });
    addrInput.addEventListener('keydown', function () {
      setTimeout(updateCaretPos, 0);
    });
  })();

  /* Function to remove Vietnamese accents for better searching */
  function removeAccents(str) {
    if (!str) return '';
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  /* ── Build dropdown ── */
  function buildDropdown(filter) {
    var rawFilter = (filter || '').trim();
    var cleanFilter = removeAccents(rawFilter);
    dropdown.innerHTML = '';

    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};
    var searchPlaceholder = T['booking.hotelSearchPlaceholder'] || 'Tìm kiếm...';
    var noResultText = T['booking.hotelNoResult'] || 'Không tìm thấy khách sạn';

    var searchWrap = document.createElement('li');
    searchWrap.className = 'bf-hotel-search-wrap';
    searchWrap.innerHTML =
      '<i class="fas fa-search"></i>' +
      '<input class="bf-hotel-search" id="bfHotelSearch" type="text" ' +
      'placeholder="' + searchPlaceholder + '" autocomplete="off" />';
    dropdown.appendChild(searchWrap);

    var normalResults = hotelData.filter(function (h) {
      if (h._isOther) return false;
      return !cleanFilter || removeAccents(h.name).indexOf(cleanFilter) !== -1;
    });

    var otherHotel = hotelData.find(function (h) { return h._isOther; });
    var results = normalResults;

    if (results.length === 0) {
      var none = document.createElement('li');
      none.className = 'bf-hotel-no-result';
      none.textContent = noResultText;
      dropdown.appendChild(none);
    } else {
      results.forEach(function (h) {
        var li = document.createElement('li');
        li.className = 'bf-hotel-opt';
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

    // Always append "Other Hotel" at the bottom
    if (otherHotel) {
      var otherLi = document.createElement('li');
      otherLi.className = 'bf-hotel-opt is-other';
      otherLi.setAttribute('role', 'option');
      otherLi.innerHTML = '<span class="bf-hotel-opt-name">' + otherHotel.name + '</span>';
      otherLi.addEventListener('mousedown', function (e) {
        e.preventDefault();
        selectHotel(otherHotel);
      });
      dropdown.appendChild(otherLi);
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
    var targetName = nameInput.closest('.bf-hotel-input-row') || nameInput;
    targetName.classList.remove('bf-error');
    var targetAddr = addrInput.closest('.bf-hotel-input-row') || addrInput;
    targetAddr.classList.remove('bf-error');
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
      /* mark wrap as other-selected & swap arrow → clear icon */
      wrap.classList.add('is-other-selected');
      var arrow = document.getElementById('bfHotelArrow');
      if (arrow) {
        arrow.classList.remove('fa-chevron-down');
        arrow.classList.add('fa-times');
      }
    } else {
      addrInput.value = h.address;
      addrInput.setAttribute('readonly', '');
      /* hide custom hotel name input */
      if (customGroup) customGroup.style.display = 'none';
      if (customInput) customInput.value = '';
      /* ensure normal arrow state */
      wrap.classList.remove('is-other-selected');
      var arrow = document.getElementById('bfHotelArrow');
      if (arrow) {
        arrow.classList.remove('fa-times');
        arrow.classList.add('fa-chevron-down');
      }
    }
    closeDropdown();
  }

  /* ── Reset hotel selection back to search mode ── */
  function resetHotelSelection() {
    nameInput.value = '';
    nameInput.classList.remove('has-value');
    addrInput.value = '';
    addrInput.setAttribute('readonly', '');
    if (customGroup) customGroup.style.display = 'none';
    if (customInput) customInput.value = '';
    wrap.classList.remove('is-other-selected');
    var arrow = document.getElementById('bfHotelArrow');
    if (arrow) {
      arrow.classList.remove('fa-times');
      arrow.classList.add('fa-chevron-down');
    }
    openDropdown();
  }

  if (inputRow) {
    inputRow.addEventListener('click', function (e) {
      e.stopPropagation();
      /* If "other" is selected and user clicks the clear icon → reset */
      if (wrap.classList.contains('is-other-selected')) {
        resetHotelSelection();
        return;
      }
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
    wrap.classList.remove('is-other-selected');
    var arrow = document.getElementById('bfHotelArrow');
    if (arrow) {
      arrow.classList.remove('fa-times');
      arrow.classList.add('fa-chevron-down');
    }
    closeDropdown();
  });

  document.addEventListener('mrben-langchange', function () {
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var T = (window.__MRB_TRANS || {})[lang] || {};
    var otherStr = T['wa.hotelOther'] || T['booking.hotelOther'] || 'Khách sạn khác';

    var otherObj = hotelData[hotelData.length - 1];
    if (otherObj && otherObj._isOther) {
      var oldOtherStr = otherObj.name;
      otherObj.name = otherStr;
      if (nameInput && nameInput.value === oldOtherStr) {
        nameInput.value = otherStr;
      }
    }
  });

})();

/* ============================================================
   HERO VIDEO PLAY/PAUSE CONTROLLER
   ============================================================ */
(function () {
  'use strict';

  var video = document.getElementById('heroVideo');
  var toggleBtn = document.getElementById('heroVideoToggle');
  var pauseIcon = document.getElementById('hvtPause');
  var playIcon = document.getElementById('hvtPlay');

  if (!video || !toggleBtn || !pauseIcon || !playIcon) return;

  /* ─── State ─────────────────────────────────────────────── */
  var isPlaying = true; // Video autoplays

  function showPause() {
    pauseIcon.style.display = '';
    playIcon.style.display = 'none';
    toggleBtn.setAttribute('aria-label', 'Pause video');
    toggleBtn.classList.add('is-playing');
  }

  function showPlay() {
    pauseIcon.style.display = 'none';
    playIcon.style.display = '';
    toggleBtn.setAttribute('aria-label', 'Play video');
    toggleBtn.classList.remove('is-playing');
  }

  /* ─── Toggle handler ────────────────────────────────────── */
  toggleBtn.addEventListener('click', function () {
    if (isPlaying) {
      video.pause();
      isPlaying = false;
      showPlay();
    } else {
      video.play().catch(function () { /* autoplay blocked – ignore */ });
      isPlaying = true;
      showPause();
    }
  });

  /* ─── Always autoplay on page load ─────────────────────── */
  var playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(function () {
      isPlaying = true;
      showPause();
    }).catch(function () {
      /* Autoplay was blocked — show play button */
      isPlaying = false;
      showPlay();
    });
  }

  /* ─── Count-Up Animation for Trust Badges ──────────────── */
  (function initCountUp() {
    var counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    var animated = false;

    function animateCounters() {
      if (animated) return;
      animated = true;

      counters.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count-target'));
        var decimals = parseInt(el.getAttribute('data-count-decimals'), 10) || 0;
        var duration = 2000; // ms
        var startTime = null;

        function easeOutQuart(t) {
          return 1 - Math.pow(1 - t, 4);
        }

        function formatNumber(n) {
          var val = decimals > 0 ? n.toFixed(decimals) : String(Math.floor(n));
          return target >= 1000 && decimals === 0 ? Math.floor(n).toLocaleString('en-US') : val;
        }

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var easedProgress = easeOutQuart(progress);
          var current = easedProgress * target;

          el.textContent = formatNumber(current);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = formatNumber(target);
          }
        }

        requestAnimationFrame(step);
      });
    }

    // Use IntersectionObserver to trigger animation when badges are visible
    if ('IntersectionObserver' in window) {
      var trustSection = document.querySelector('.trust-badges');
      if (trustSection) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounters();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });
        observer.observe(trustSection);
      }
    } else {
      // Fallback: animate on page load
      animateCounters();
    }
  })();

  /* ─── Gallery Mobile Auto-Scroll Marquee ──────────────────── */
  (function () {
    var gallery = document.querySelector('.gallery-grid');
    if (!gallery) return;

    var SPEED = 0.8;       // px per frame (~48 px/s @ 60 fps)
    var RESUME_MS = 1500;      // ms before auto-resume after interaction
    var MOBILE_BP = 680;       // must match CSS @media breakpoint

    /* ── state ───────────────────────────────────────────────── */
    var track = null;     // .gallery-track wrapper (created by JS)
    var origItems = [];       // snapshotted before cloning
    var origCount = 0;
    var oneSetW = 0;        // px width of one original set (items + gaps)
    var offset = 0;        // current translateX offset (negative = scrolled right)
    var rafId = null;
    var paused = false;
    var resumeTimer = null;
    var built = false;    // whether the track/clones are in the DOM
    var trackBound = false;

    /* ── Build: wrap items in .gallery-track + clone ─────────── */
    function build() {
      if (built) return;
      origItems = [].slice.call(gallery.querySelectorAll('.gallery-item'));
      origCount = origItems.length;
      if (!origCount) return;

      /* Create track wrapper and move originals into it */
      track = document.createElement('div');
      track.className = 'gallery-track';
      while (gallery.firstChild) track.appendChild(gallery.firstChild);
      gallery.appendChild(track);

      /* Ensure originals are visible (undo scroll-reveal hiding) */
      for (var j = 0; j < origCount; j++) {
        origItems[j].classList.add('revealed');
        origItems[j].style.opacity = '';
        origItems[j].style.transform = '';
      }

      /* Clone originals twice (append to track) */
      for (var s = 0; s < 2; s++) {
        for (var i = 0; i < origCount; i++) {
          var c = origItems[i].cloneNode(true);
          c.setAttribute('aria-hidden', 'true');
          c.classList.add('gallery-clone');
          c.classList.add('revealed');          // ensure scroll-reveal doesn't hide clones
          c.style.opacity = '';                 // clear inline opacity:0 from reveal init
          c.style.transform = '';               // clear inline translateY from reveal init
          var img = c.querySelector('img');
          if (img) img.removeAttribute('loading');
          track.appendChild(c);
        }
      }

      track.offsetHeight;  // force reflow
      measure();
      offset = 0;
      applyTx();
      built = true;
      bindTrack();
    }

    /* ── Tear down ───────────────────────────────────────────── */
    function teardown() {
      if (!built) return;
      var clones = track.querySelectorAll('.gallery-clone');
      for (var i = clones.length - 1; i >= 0; i--) clones[i].parentNode.removeChild(clones[i]);
      while (track.firstChild) gallery.appendChild(track.firstChild);
      gallery.removeChild(track);
      track = null; offset = 0; oneSetW = 0; built = false;
    }

    /* ── Measure one set width ───────────────────────────────── */
    function measure() {
      if (!track) return;
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      var w = 0;
      for (var i = 0; i < origCount; i++) {
        w += origItems[i].getBoundingClientRect().width + gap;
      }
      oneSetW = w;
    }

    function applyTx() {
      if (track) track.style.transform = 'translateX(' + offset + 'px)';
    }

    /* ── Animation tick ────────────────────────────────────── */
    function tick() {
      if (!paused && oneSetW > 0) {
        offset -= SPEED;
        if (-offset >= oneSetW) offset += oneSetW;
        applyTx();
      }
      rafId = requestAnimationFrame(tick);
    }

    function start() {
      if (rafId) return;
      build();
      if (!built) return;
      rafId = requestAnimationFrame(tick);
    }
    function stop() {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }

    /* ── Pause / resume ──────────────────────────────────────── */
    function pauseNow() { paused = true; clearTimeout(resumeTimer); }
    function resumeLater() {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () {
        if (oneSetW > 0) {
          offset = offset % oneSetW;
          if (offset > 0) offset -= oneSetW;
        }
        paused = false;
      }, RESUME_MS);
    }

    /* ── Track interaction events (bound once) ───────────────── */
    function bindTrack() {
      if (trackBound || !track) return;
      trackBound = true;

      /* Touch */
      var tx0 = 0, tOff = 0;
      track.addEventListener('touchstart', function (e) {
        pauseNow();
        tx0 = e.touches[0].clientX; tOff = offset;
      }, { passive: true });
      track.addEventListener('touchmove', function (e) {
        offset = tOff + (e.touches[0].clientX - tx0);
        applyTx();
      }, { passive: true });
      track.addEventListener('touchend', resumeLater, { passive: true });
      track.addEventListener('touchcancel', resumeLater, { passive: true });

      /* Mouse drag */
      var mx0 = 0, mOff = 0, drag = false;
      track.addEventListener('mousedown', function (e) {
        pauseNow(); drag = true;
        mx0 = e.clientX; mOff = offset;
        e.preventDefault();
      });
      window.addEventListener('mousemove', function (e) {
        if (!drag) return;
        offset = mOff + (e.clientX - mx0);
        applyTx();
      });
      window.addEventListener('mouseup', function () {
        if (drag) { drag = false; resumeLater(); }
      });

      /* Wheel */
      track.addEventListener('wheel', function () {
        pauseNow(); resumeLater();
      }, { passive: true });
    }

    /* ── Responsive ──────────────────────────────────────────── */
    function check() {
      if (window.innerWidth <= MOBILE_BP) {
        start();
      } else {
        stop(); teardown(); paused = false;
      }
    }

    var resizeTimer2 = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer2);
      resizeTimer2 = setTimeout(function () {
        if (built) measure();
        check();
      }, 200);
    });

    check();
  })();

})();
