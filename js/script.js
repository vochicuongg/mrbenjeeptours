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
      '_meta.title': 'Mr. Ben Jeep Tours Mũi Né | Thuê Xe Jeep Tour Bình Minh & Hoàng Hôn',
      '_meta.description': 'Mr. Ben Jeep Tours – Thuê xe Jeep Mũi Né uy tín. Tour bình minh & hoàng hôn Đồi Cát Trắng, Đồi Cát Đỏ, Suối Tiên, Làng Chài. Tour riêng tư & ghép, đón tận khách sạn. ☎ 0913 140 196',
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
      'nav.transfer': 'Xe Đưa Đón',
      'svc.tab.jeep': 'Jeep Tour',
      'svc.tab.transfer': 'Xe Đưa Đón',
      'svc.tab.new': 'Mới',
      'transfer.eyebrow': 'Dịch Vụ Mới',
      'transfer.title1': 'Xe Riêng',
      'transfer.titleGold': 'Đưa Đón Sân Bay & Liên Tỉnh',
      'transfer.subtitle': 'Dịch vụ xe riêng đưa đón tận nơi, tài xế chuyên nghiệp, xe đời mới sạch sẽ, cam kết đúng giờ bay.',
      'transfer.hl.privacy': 'Riêng Tư Tuyệt Đối',
      'transfer.hl.privacyDesc': 'Xe riêng chỉ phục vụ gia đình bạn, không ghép khách.',
      'transfer.hl.airport': 'Đón Trả Tận Nơi',
      'transfer.hl.airportDesc': 'Đón tại sân bay hoặc khách sạn, hỗ trợ hành lý, đúng giờ bay.',
      'transfer.hl.routes': 'Đa Tuyến Linh Hoạt',
      'transfer.hl.routesDesc': 'Mũi Né → SGN, Mũi Né → Nha Trang, Nha Trang → SGN.',
      'transfer.hl.safe': 'An Toàn & Chuyên Nghiệp',
      'transfer.hl.safeDesc': 'Tài xế kinh nghiệm, xe đời mới, bảo hiểm đầy đủ.',
      'transfer.vehicle.gas7': 'Xe Xăng 7 Chỗ',
      'transfer.vehicle.gas7Desc': 'Xe 7 chỗ xăng rộng rãi, phù hợp gia đình 4-6 người, hành lý lớn.',
      'transfer.vehicle.ev7': 'Xe Điện 7 Chỗ',
      'transfer.vehicle.ev7Desc': 'Xe điện êm ái, tiết kiệm, thân thiện môi trường. Trải nghiệm cao cấp.',
      'transfer.vehicle.gas16': 'Xe 16 Chỗ',
      'transfer.vehicle.gas16Desc': 'Xe 16 chỗ rộng rãi, phù hợp cho đoàn đông, gia đình lớn hoặc nhóm bạn.',
      'transfer.badge.gas': 'Phổ Biến',
      'transfer.badge.ev': 'Eco Friendly',
      'transfer.badge.gas16': 'Đoàn Lớn',
      'transfer.card.private': 'Xe Riêng',
      'transfer.spec.seats7': '7 chỗ',
      'transfer.spec.seats16': '16 chỗ',
      'transfer.spec.gas': 'Động cơ xăng',
      'transfer.spec.ev': 'Động cơ điện',
      'transfer.spec.luggage': 'Hành lý lớn',
      'transfer.th.route': 'Tuyến đường',
      'transfer.city.muine': 'Mũi Né',
      'transfer.city.sgn': 'Sân bay Tân Sơn Nhất (SGN)',
      'transfer.city.nhatrang': 'Nha Trang',
      'transfer.city.phanrang': 'Biển Phan Rang',
      'transfer.city.tacu': 'Núi Tà Cú',
      'transfer.city.kega': 'Mũi Kê Gà',
      'transfer.city.cothach': 'Chùa Cổ Thạch',
      'transfer.stop.poshanu': 'Tháp Chàm',
      'transfer.stop.caong': 'Xương Cá Ông',
      'transfer.route.muineHcm': 'Mũi Né ⇄ Sân bay Tân Sơn Nhất (SGN)',
      'transfer.route.muineNt': 'Mũi Né ⇄ Nha Trang',
      'transfer.route.ntHcm': 'Nha Trang ⇄ Sân bay Tân Sơn Nhất (SGN)',
      'transfer.route.muinePhanrang': 'Mũi Né ⇄ Biển Phan Rang',
      'transfer.route.muineTacu': 'Mũi Né → Núi Tà Cú',
      'transfer.route.muineKega': 'Mũi Né → Mũi Kê Gà',
      'transfer.route.muineCothach': 'Mũi Né → Chùa Cổ Thạch',
      'transfer.itineraryLabel': 'Lộ trình chi tiết',
      'transfer.itineraryNote': 'Khứ hồi trong ngày',
      'transfer.oneWayNote': 'Không khứ hồi',
      'transfer.swapBlocked': 'Điểm này chỉ là điểm trả, không thể chọn làm điểm đón.',
      'transfer.pricingTitle': 'Bảng Giá Niêm Yết',
      'transfer.scrollHint': 'Vuốt ngang để so sánh giá các loại xe',
      'transfer.pricingTapHint': "Nhấn 'Đặt xe' trên bảng giá để đặt nhanh",
      'transfer.miniBook': 'Đặt xe',
      'transfer.inc.allIn': 'Giá trọn gói niêm yết',
      'transfer.inc.toll': 'Bao gồm xăng & phí cao tốc',
      'transfer.inc.driver': 'Tài xế đón tận nơi',
      'transfer.ctaTitle': 'Đặt Xe Đưa Đón Mr. Ben',
      'transfer.bookingTitle': 'Đặt Xe Đưa Đón',
      'transfer.bookingTourName': 'Xe Đưa Đón với Mr. Ben',
      'transfer.ctaDesc': 'Chọn tuyến đường, loại xe và điền thông tin để đặt xe nhanh chóng.',
      'transfer.bookVehicle': 'Đặt Xe Ngay',
      'transfer.bookRoute': 'Đặt Tuyến Này',
      'transfer.formDivider': 'Thông tin khách hàng',
      'transfer.chatZalo': 'Chat Đặt Xe Qua Zalo (0913.140.196)',
      'transfer.labelRoute': 'Chọn tuyến đường',
      'transfer.selectRoute': '-- Chọn tuyến đường --',
      'transfer.labelVehicle': 'Chọn loại xe',
      'transfer.labelName': 'Họ và Tên',
      'transfer.labelPhone': 'Số Điện Thoại',
      'transfer.labelDate': 'Ngày giờ đón',
      'transfer.labelPickup': 'Điểm đón',
      'transfer.labelNotes': 'Ghi chú',
      'transfer.phName': 'Nhập tên của bạn',
      'transfer.phPhone': '+84 xxx xxx xxx',
      'transfer.phPickup': 'Tên khách sạn / Sân bay / địa chỉ',
      'transfer.phNotes': 'Số hành khách, số hiệu chuyến bay, hành lý đặc biệt...',
      'transfer.bookBtn': 'Đặt Xe Nhanh (WhatsApp & Xác Nhận)',
      'transfer.alertSelect': 'Vui lòng chọn tuyến đường và loại xe trước khi đặt.',
      'transfer.alertInfo': 'Vui lòng nhập họ tên và số điện thoại.',
      'transfer.wa.greeting': 'Xin chào Mr. Ben, tôi muốn đặt xe đưa đón. Thông tin:',
      'transfer.wa.name': '- Họ tên: ',
      'transfer.wa.phone': '- SĐT: ',
      'transfer.wa.route': '- Tuyến: ',
      'transfer.wa.vehicle': '- Loại xe: ',
      'transfer.wa.price': '- Giá: ',
      'transfer.wa.date': '- Ngày đón: ',
      'transfer.wa.pickup': '- Điểm đón: ',
      'transfer.wa.notes': '- Ghi chú: ',
      'transfer.wa.footer': 'Vui lòng liên hệ sớm. Cảm ơn!',
      'transfer.labelDropoff': 'Điểm trả',
      'transfer.phPickupInput': 'Chọn điểm đón',
      'transfer.phDropoff': 'Chọn điểm trả',
      'transfer.labelVehicleType': 'Loại Xe',
      'transfer.vehicleGas': 'Xe Xăng',
      'transfer.vehicleEv': 'Xe Điện',
      'transfer.vehicle16': 'Xe 16 Chỗ',
      'transfer.phNotesTransfer': 'Yêu cầu khác của khách hàng',
      'booking.clockSelectHour': 'CHỌN GIỜ',
      'booking.clockSelectMin': 'CHỌN PHÚT',
      'booking.clockConfirm': 'Xác nhận',
    },
    en: {
      '_meta.title': 'Mr. Ben Jeep Tours Mũi Né | Best Mui Ne Jeep Tour – Sunrise & Sunset',
      '_meta.description': 'Mr. Ben Jeep Tours – Best Mui Ne jeep tour. Sunrise & sunset tours to White Sand Dunes, Red Sand Dunes, Fairy Stream. Book private or group jeep tour in Mũi Né, Phan Thiết. ☎ +84 913 140 196',
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
      'nav.transfer': 'Transfer',
      'svc.tab.jeep': 'Jeep Tour',
      'svc.tab.transfer': 'Transfer',
      'svc.tab.new': 'New',
      'transfer.eyebrow': 'New Service',
      'transfer.title1': 'Private Car',
      'transfer.titleGold': 'Airport & Inter-City Transfer',
      'transfer.subtitle': 'Private car transfer with professional drivers, new vehicles, and on-time airport guarantee.',
      'transfer.hl.privacy': 'Absolute Privacy',
      'transfer.hl.privacyDesc': 'Private car exclusively for your family, no sharing.',
      'transfer.hl.airport': 'Door-to-Door Pickup',
      'transfer.hl.airportDesc': 'Airport terminal or hotel door pickup, luggage assistance, on-time guarantee.',
      'transfer.hl.routes': 'Flexible Routes',
      'transfer.hl.routesDesc': 'Mũi Né → SGN, Mũi Né → Nha Trang, Nha Trang → SGN.',
      'transfer.hl.safe': 'Safe & Professional',
      'transfer.hl.safeDesc': 'Experienced drivers, new vehicles, full insurance.',
      'transfer.vehicle.gas7': '7-Seat Gasoline Car',
      'transfer.vehicle.gas7Desc': 'Spacious 7-seat gasoline car, ideal for families of 4-6 with large luggage.',
      'transfer.vehicle.ev7': '7-Seat Electric Car',
      'transfer.vehicle.ev7Desc': 'Smooth, eco-friendly electric car. Premium travel experience.',
      'transfer.vehicle.gas16': '16-Seat Car',
      'transfer.vehicle.gas16Desc': 'Spacious 16-seat vehicle, ideal for large groups and families.',
      'transfer.badge.gas': 'Popular',
      'transfer.badge.ev': 'Eco Friendly',
      'transfer.badge.gas16': 'Large Group',
      'transfer.card.private': 'Private Car',
      'transfer.spec.seats7': '7 seats',
      'transfer.spec.seats16': '16 seats',
      'transfer.spec.gas': 'Gasoline engine',
      'transfer.spec.ev': 'Electric motor',
      'transfer.spec.luggage': 'Large luggage',
      'transfer.th.route': 'Route',
      'transfer.city.muine': 'Mui Ne',
      'transfer.city.sgn': 'Tan Son Nhat Airport (SGN)',
      'transfer.city.nhatrang': 'Nha Trang',
      'transfer.city.phanrang': 'Phan Rang Beach',
      'transfer.city.tacu': 'Ta Cu Mountain',
      'transfer.city.kega': 'Ke Ga Cape',
      'transfer.city.cothach': 'Co Thach Pagoda',
      'transfer.stop.poshanu': 'Cham Towers',
      'transfer.stop.caong': 'Whale Temple',
      'transfer.route.muineHcm': 'Mui Ne ⇄ Tan Son Nhat Airport (SGN)',
      'transfer.route.muineNt': 'Mui Ne ⇄ Nha Trang',
      'transfer.route.ntHcm': 'Nha Trang ⇄ Tan Son Nhat Airport (SGN)',
      'transfer.route.muinePhanrang': 'Mui Ne ⇄ Phan Rang Beach',
      'transfer.route.muineTacu': 'Mui Ne → Ta Cu Mountain',
      'transfer.route.muineKega': 'Mui Ne → Ke Ga Cape',
      'transfer.route.muineCothach': 'Mui Ne → Co Thach Pagoda',
      'transfer.itineraryLabel': 'Detailed Itinerary',
      'transfer.itineraryNote': 'Round trip',
      'transfer.oneWayNote': 'One-way',
      'transfer.swapBlocked': 'This location is drop-off only and cannot be selected as pickup.',
      'transfer.pricingTitle': 'Price List',
      'transfer.scrollHint': 'Swipe horizontally to compare vehicle prices',
      'transfer.pricingTapHint': "Tap 'Book' on the price list to book quickly",
      'transfer.miniBook': 'Book',
      'transfer.inc.allIn': 'All-inclusive fixed price',
      'transfer.inc.toll': 'Includes fuel & highway tolls',
      'transfer.inc.driver': 'Door-to-door professional driver',
      'transfer.ctaTitle': 'Private Transfer Booking Mr. Ben',
      'transfer.bookingTitle': 'Book Private Transfer',
      'transfer.bookingTourName': 'Private Transfer with Mr. Ben',
      'transfer.ctaDesc': 'Choose route, vehicle type and enter details to book quickly.',
      'transfer.bookVehicle': 'Book Vehicle Now',
      'transfer.bookRoute': 'Book This Route',
      'transfer.formDivider': 'Customer Information',
      'transfer.chatZalo': 'Chat & Book via Zalo (+84 913 140 196)',
      'transfer.labelRoute': 'Select route',
      'transfer.selectRoute': '-- Select route --',
      'transfer.labelVehicle': 'Select vehicle type',
      'transfer.labelName': 'Full Name',
      'transfer.labelPhone': 'Phone Number',
      'transfer.labelDate': 'Pickup Date & Time',
      'transfer.labelPickup': 'Pickup Location',
      'transfer.labelNotes': 'Notes',
      'transfer.phName': 'Enter your name',
      'transfer.phPhone': '+84 xxx xxx xxx',
      'transfer.phPickup': 'Hotel name / Airport / address',
      'transfer.phNotes': 'Number of passengers, flight number, special luggage...',
      'transfer.bookBtn': 'Quick Book (WhatsApp & Confirm)',
      'transfer.alertSelect': 'Please select a route and vehicle type before booking.',
      'transfer.alertInfo': 'Please enter your name and phone number.',
      'transfer.wa.greeting': 'Hello Mr. Ben, I would like to book a private transfer. Details:',
      'transfer.wa.name': '- Name: ',
      'transfer.wa.phone': '- Phone: ',
      'transfer.wa.route': '- Route: ',
      'transfer.wa.vehicle': '- Vehicle: ',
      'transfer.wa.price': '- Price: ',
      'transfer.wa.date': '- Pickup date: ',
      'transfer.wa.pickup': '- Pickup location: ',
      'transfer.wa.notes': '- Notes: ',
      'transfer.wa.footer': 'Please contact me soon. Thank you!',
      'transfer.labelDropoff': 'Drop-off',
      'transfer.phPickupInput': 'Select pickup point',
      'transfer.phDropoff': 'Select drop-off point',
      'transfer.labelVehicleType': 'Vehicle Type',
      'transfer.vehicleGas': 'Gasoline',
      'transfer.vehicleEv': 'Electric',
      'transfer.vehicle16': '16-Seat',
      'transfer.phNotesTransfer': 'Other requests from the customer',
      'booking.clockSelectHour': 'SELECT HOUR',
      'booking.clockSelectMin': 'SELECT MINUTE',
      'booking.clockConfirm': 'Confirm',
    },
    ru: {
      '_meta.title': 'Mr. Ben Jeep Tours Муйне | Лучший джип-тур Муйне – Рассвет и Закат',
      '_meta.description': 'Mr. Ben Jeep Tours – лучший джип-тур в Муйне. Рассветные и закатные туры на Белые и Красные дюны, Ручей Фей. Частные и групповые туры. ☎ +84 913 140 196',
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
      'nav.transfer': 'Трансфер',
      'svc.tab.jeep': 'Джип-Тур',
      'svc.tab.transfer': 'Трансфер',
      'svc.tab.new': 'Ново',
      'transfer.eyebrow': 'Новая Услуга',
      'transfer.title1': 'Частный Автомобиль',
      'transfer.titleGold': 'Трансфер в Аэропорт',
      'transfer.subtitle': 'Частный трансфер с профессиональными водителями, новыми автомобилями и гарантией прибытия вовремя.',
      'transfer.hl.privacy': 'Полная Конфиденциальность',
      'transfer.hl.privacyDesc': 'Частный автомобиль только для вашей семьи, без подсадок.',
      'transfer.hl.airport': 'Встреча у Двери',
      'transfer.hl.airportDesc': 'Встреча в аэропорту или у двери отеля, помощь с багажом.',
      'transfer.hl.routes': 'Гибкие Маршруты',
      'transfer.hl.routesDesc': 'Муйне → ХCМ, Муйне → Нячанг, Нячанг → ХCМ.',
      'transfer.hl.safe': 'Безопасно и Профессионально',
      'transfer.hl.safeDesc': 'Опытные водители, новые авто, полная страховка.',
      'transfer.vehicle.gas7': '7-местный Бензиновый',
      'transfer.vehicle.gas7Desc': 'Просторный 7-местный авто, идеален для семьи 4-6 человек с большим багажом.',
      'transfer.vehicle.ev7': '7-местный Электрический',
      'transfer.vehicle.ev7Desc': 'Тихий, экологичный электромобиль. Премиальный комфорт.',
      'transfer.vehicle.gas16': '16-местный Автомобиль',
      'transfer.vehicle.gas16Desc': 'Просторный 16-местный авто, идеален для больших групп и семей.',
      'transfer.badge.gas': 'Популярный',
      'transfer.badge.ev': 'Эко-авто',
      'transfer.badge.gas16': 'Большая группа',
      'transfer.card.private': 'Индивидуально',
      'transfer.spec.seats7': '7 мест',
      'transfer.spec.seats16': '16 мест',
      'transfer.spec.gas': 'Бензиновый двигатель',
      'transfer.spec.ev': 'Электродвигатель',
      'transfer.spec.luggage': 'Большой багаж',
      'transfer.th.route': 'Маршрут',
      'transfer.city.muine': 'Муйне',
      'transfer.city.sgn': 'Аэропорт Таншоннят (SGN)',
      'transfer.city.nhatrang': 'Нячанг',
      'transfer.city.phanrang': 'Пляж Фанранг',
      'transfer.city.tacu': 'Гора Та Ку',
      'transfer.city.kega': 'Мыс Ке Га',
      'transfer.city.cothach': 'Пагода Ко Тхать',
      'transfer.stop.poshanu': 'Чамские башни',
      'transfer.stop.caong': 'Храм кита',
      'transfer.route.muineHcm': 'Муйне ⇄ Аэропорт Таншоннят (SGN)',
      'transfer.route.muineNt': 'Муйне ⇄ Нячанг',
      'transfer.route.ntHcm': 'Нячанг ⇄ Аэропорт Таншоннят (SGN)',
      'transfer.route.muinePhanrang': 'Муйне ⇄ Пляж Фанранг',
      'transfer.route.muineTacu': 'Муйне → Гора Та Ку',
      'transfer.route.muineKega': 'Муйне → Мыс Ке Га',
      'transfer.route.muineCothach': 'Муйне → Пагода Ко Тхать',
      'transfer.itineraryLabel': 'Подробный маршрут',
      'transfer.itineraryNote': 'туда и обратно',
      'transfer.oneWayNote': 'В одну сторону',
      'transfer.swapBlocked': 'Эта точка только для высадки, её нельзя выбрать как место посадки.',
      'transfer.pricingTitle': 'Прайс-лист',
      'transfer.scrollHint': 'Проведите пальцем для сравнения цен',
      'transfer.pricingTapHint': "Нажмите 'Заказ' в таблице для быстрого заказа",
      'transfer.miniBook': 'Заказ',
      'transfer.inc.allIn': 'Фиксированная цена всё включено',
      'transfer.inc.toll': 'Включая топливо и платные дороги',
      'transfer.inc.driver': 'Водитель от двери до двери',
      'transfer.ctaTitle': 'Бронирование трансфера Mr. Ben',
      'transfer.bookingTitle': 'Бронирование трансфера',
      'transfer.bookingTourName': 'Трансфер с Mr. Ben',
      'transfer.ctaDesc': 'Выберите маршрут, тип авто и заполните данные для быстрого заказа.',
      'transfer.bookVehicle': 'Забронировать авто',
      'transfer.bookRoute': 'Выбрать этот маршрут',
      'transfer.formDivider': 'Информация о пассажире',
      'transfer.chatZalo': 'Чат в Zalo (+84 913 140 196)',
      'transfer.labelRoute': 'Выберите маршрут',
      'transfer.selectRoute': '-- Выберите маршрут --',
      'transfer.labelVehicle': 'Выберите тип авто',
      'transfer.labelName': 'Имя и Фамилия',
      'transfer.labelPhone': 'Телефон',
      'transfer.labelDate': 'Дата и время подачи',
      'transfer.labelPickup': 'Место подачи',
      'transfer.labelNotes': 'Примечания',
      'transfer.phName': 'Введите ваше имя',
      'transfer.phPhone': '+84 xxx xxx xxx',
      'transfer.phPickup': 'Название отеля / Аэропорт / адрес',
      'transfer.phNotes': 'Кол-во пассажиров, номер рейса, особый багаж...',
      'transfer.bookBtn': 'Быстрый заказ (WhatsApp и подтверждение)',
      'transfer.alertSelect': 'Пожалуйста, выберите маршрут и тип авто.',
      'transfer.alertInfo': 'Пожалуйста, введите имя и телефон.',
      'transfer.wa.greeting': 'Здравствуйте, Mr. Ben! Я хотел бы забронировать трансфер. Информация:',
      'transfer.wa.name': '- Имя: ',
      'transfer.wa.phone': '- Телефон: ',
      'transfer.wa.route': '- Маршрут: ',
      'transfer.wa.vehicle': '- Авто: ',
      'transfer.wa.price': '- Цена: ',
      'transfer.wa.date': '- Дата подачи: ',
      'transfer.wa.pickup': '- Место подачи: ',
      'transfer.wa.notes': '- Примечание: ',
      'transfer.wa.footer': 'Свяжитесь со мной. Спасибо!',
      'transfer.labelDropoff': 'Точка высадки',
      'transfer.phPickupInput': 'Выберите точку посадки',
      'transfer.phDropoff': 'Выберите точку высадки',
      'transfer.labelVehicleType': 'Тип авто',
      'transfer.vehicleGas': 'Бензин',
      'transfer.vehicleEv': 'Электро',
      'transfer.vehicle16': '16-мест',
      'transfer.phNotesTransfer': 'Другие пожелания клиента',
      'booking.clockSelectHour': 'ВЫБЕРИТЕ ЧАС',
      'booking.clockSelectMin': 'ВЫБЕРИТЕ МИНУТУ',
      'booking.clockConfirm': 'Подтвердить',
    },
    zh: {
      '_meta.title': 'Mr. Ben Jeep Tours 美奈 | 最佳美奈吉普車之旅 – 日出與日落',
      '_meta.description': 'Mr. Ben Jeep Tours – 最佳美奈吉普車之旅。日出和日落之旅前往白沙丘、紅沙丘、仙女溪。私人和拼團旅遊。☎ +84 913 140 196',
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
      'nav.transfer': '专车接送',
      'svc.tab.jeep': '吉普游',
      'svc.tab.transfer': '专车接送',
      'svc.tab.new': '新',
      'transfer.eyebrow': '新服务',
      'transfer.title1': '专车',
      'transfer.titleGold': '机场及城际接送',
      'transfer.subtitle': '专车接送服务，专业司机，新款车辆，保证准时到达机场。',
      'transfer.hl.privacy': '绝对私密',
      'transfer.hl.privacyDesc': '专车仅为您的家人服务，不拼车。',
      'transfer.hl.airport': '上门接送',
      'transfer.hl.airportDesc': '机场航站楼或酒店门口接送，协助行李，准时保障。',
      'transfer.hl.routes': '灵活路线',
      'transfer.hl.routesDesc': '美奈 → 胡志明市、美奈 → 芽庄、芽庄 → 胡志明市。',
      'transfer.hl.safe': '安全专业',
      'transfer.hl.safeDesc': '经验丰富的司机，新款车辆，全额保险。',
      'transfer.vehicle.gas7': '7座汽油车',
      'transfer.vehicle.gas7Desc': '宽敞的7座汽油车，适合4-6人家庭，可放大件行李。',
      'transfer.vehicle.ev7': '7座电动车',
      'transfer.vehicle.ev7Desc': '安静、环保的电动汽车，高端出行体验。',
      'transfer.vehicle.gas16': '16座车',
      'transfer.vehicle.gas16Desc': '宽敞的16座车，适合大型团队和家庭出行。',
      'transfer.badge.gas': '热门推荐',
      'transfer.badge.ev': '环保电车',
      'transfer.badge.gas16': '大团体',
      'transfer.card.private': '包车',
      'transfer.spec.seats7': '7座',
      'transfer.spec.seats16': '16座',
      'transfer.spec.gas': '汽油发动机',
      'transfer.spec.ev': '电动马达',
      'transfer.spec.luggage': '大件行李',
      'transfer.th.route': '路线',
      'transfer.city.muine': '美奈',
      'transfer.city.sgn': '新山一机场 (SGN)',
      'transfer.city.nhatrang': '芽庄',
      'transfer.city.phanrang': '潘朗海滩',
      'transfer.city.tacu': '达固山',
      'transfer.city.kega': '科加海角',
      'transfer.city.cothach': '古石寺',
      'transfer.stop.poshanu': '占婆塔',
      'transfer.stop.caong': '鲸鱼庙',
      'transfer.route.muineHcm': '美奈 ⇄ 新山一机场 (SGN)',
      'transfer.route.muineNt': '美奈 ⇄ 芽庄',
      'transfer.route.ntHcm': '芽庄 ⇄ 新山一机场 (SGN)',
      'transfer.route.muinePhanrang': '美奈 ⇄ 潘朗海滩',
      'transfer.route.muineTacu': '美奈 → 达固山',
      'transfer.route.muineKega': '美奈 → 科加海角',
      'transfer.route.muineCothach': '美奈 → 古石寺',
      'transfer.itineraryLabel': '详细行程',
      'transfer.itineraryNote': '往返',
      'transfer.oneWayNote': '单程',
      'transfer.swapBlocked': '此地点仅为下车点，无法选择为上车点。',
      'transfer.pricingTitle': '价格表',
      'transfer.scrollHint': '左右滑动对比各车型价格',
      'transfer.pricingTapHint': "点击价格表中的'预订'即可快速订车",
      'transfer.miniBook': '预订',
      'transfer.inc.allIn': '全包一口价',
      'transfer.inc.toll': '包含燃油及高速过路费',
      'transfer.inc.driver': '专业司机上门接送',
      'transfer.ctaTitle': '专车接送预订 Mr. Ben',
      'transfer.bookingTitle': '专车接送预订',
      'transfer.bookingTourName': '专车接送服务',
      'transfer.ctaDesc': '选择路线、车型并填写信息，轻松快速预订。',
      'transfer.bookVehicle': '立即订车',
      'transfer.bookRoute': '预订此路线',
      'transfer.formDivider': '乘客信息',
      'transfer.chatZalo': '通过 Zalo 咨询预订 (+84 913 140 196)',
      'transfer.labelRoute': '选择路线',
      'transfer.selectRoute': '-- 选择路线 --',
      'transfer.labelVehicle': '选择车型',
      'transfer.labelName': '姓名',
      'transfer.labelPhone': '电话号码',
      'transfer.labelDate': '接送日期和时间',
      'transfer.labelPickup': '上车地点',
      'transfer.labelNotes': '备注',
      'transfer.phName': '请输入您的姓名',
      'transfer.phPhone': '+84 xxx xxx xxx',
      'transfer.phPickup': '酒店名称 / 机场 / 地址',
      'transfer.phNotes': '乘客人数、航班号、特殊行李...',
      'transfer.bookBtn': '立即快速预订 (WhatsApp与确认)',
      'transfer.alertSelect': '请先选择路线和车型。',
      'transfer.alertInfo': '请输入姓名和电话号码。',
      'transfer.wa.greeting': '您好Ben先生，我想预订专车接送。信息：',
      'transfer.wa.name': '- 姓名：',
      'transfer.wa.phone': '- 电话：',
      'transfer.wa.route': '- 路线：',
      'transfer.wa.vehicle': '- 车型：',
      'transfer.wa.price': '- 价格：',
      'transfer.wa.date': '- 接送日期：',
      'transfer.wa.pickup': '- 上车地点：',
      'transfer.wa.notes': '- 备注：',
      'transfer.wa.footer': '请尽快联系我。谢谢！',
      'transfer.labelDropoff': '下车地点',
      'transfer.phPickupInput': '选择上车地点',
      'transfer.phDropoff': '选择下车地点',
      'transfer.labelVehicleType': '车辆类型',
      'transfer.vehicleGas': '汽油车',
      'transfer.vehicleEv': '电动车',
      'transfer.vehicle16': '16座',
      'transfer.phNotesTransfer': '客户的其他要求',
      'booking.clockSelectHour': '选择小时',
      'booking.clockSelectMin': '选择分钟',
      'booking.clockConfirm': '确认',
    },
    ko: {
      '_meta.title': 'Mr. Ben Jeep Tours 무이네 | 최고의 무이네 지프 투어 – 일출 & 일몰',
      '_meta.description': 'Mr. Ben Jeep Tours – 최고의 무이네 지프 투어. 화이트 샌드듄, 레드 샌드듄, 요정의 시냇물로 일출 및 일몰 투어. 프라이빗 & 그룹 투어. ☎ +84 913 140 196',
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
      'nav.transfer': '공항 픽업',
      'svc.tab.jeep': '지프 투어',
      'svc.tab.transfer': '공항 픽업',
      'svc.tab.new': '신규',
      'transfer.eyebrow': '새로운 서비스',
      'transfer.title1': '전용 차량',
      'transfer.titleGold': '공항 및 도시 간 이동',
      'transfer.subtitle': '전문 기사, 신형 차량, 정시 공항 도착 보장의 전용 차량 서비스.',
      'transfer.hl.privacy': '완벽한 프라이버시',
      'transfer.hl.privacyDesc': '가족 전용 차량, 합승 없음.',
      'transfer.hl.airport': '도어 투 도어',
      'transfer.hl.airportDesc': '공항 터미널 또는 호텔 앞 픽업, 짐 도움, 정시 보장.',
      'transfer.hl.routes': '유연한 노선',
      'transfer.hl.routesDesc': '무이네 → 호치민, 무이네 → 나트랑, 나트랑 → 호치민.',
      'transfer.hl.safe': '안전 & 전문',
      'transfer.hl.safeDesc': '경험 많은 기사, 신형 차량, 완전 보험.',
      'transfer.vehicle.gas7': '7인승 가솔린 차량',
      'transfer.vehicle.gas7Desc': '넓은 7인승 가솔린 차량, 4-6인 가족과 대형 짐에 적합.',
      'transfer.vehicle.ev7': '7인승 전기 차량',
      'transfer.vehicle.ev7Desc': '조용하고 친환경 전기차. 프리미엄 여행 경험.',
      'transfer.vehicle.gas16': '16인승 차량',
      'transfer.vehicle.gas16Desc': '넓은 16인승 차량, 대규모 그룹과 가족 여행에 적합.',
      'transfer.badge.gas': '인기 차종',
      'transfer.badge.ev': '친환경 전기차',
      'transfer.badge.gas16': '대형 그룹',
      'transfer.card.private': '단독 차량',
      'transfer.spec.seats7': '7인승',
      'transfer.spec.seats16': '16인승',
      'transfer.spec.gas': '가솔린 엔진',
      'transfer.spec.ev': '전기 모터',
      'transfer.spec.luggage': '대형 짐',
      'transfer.th.route': '노선',
      'transfer.city.muine': '무이네',
      'transfer.city.sgn': '탄손누트 공항 (SGN)',
      'transfer.city.nhatrang': '나트랑',
      'transfer.city.phanrang': '판랑 해변',
      'transfer.city.tacu': '따꾸산',
      'transfer.city.kega': '께가 곶',
      'transfer.city.cothach': '꼬탁 사원',
      'transfer.stop.poshanu': '참탑',
      'transfer.stop.caong': '고래 사원',
      'transfer.route.muineHcm': '무이네 ⇄ 탄손누트 공항 (SGN)',
      'transfer.route.muineNt': '무이네 ⇄ 나트랑',
      'transfer.route.ntHcm': '나트랑 ⇄ 탄손누트 공항 (SGN)',
      'transfer.route.muinePhanrang': '무이네 ⇄ 판랑 해변',
      'transfer.route.muineTacu': '무이네 → 따꾸산',
      'transfer.route.muineKega': '무이네 → 께가 곶',
      'transfer.route.muineCothach': '무이네 → 꼬탁 사원',
      'transfer.itineraryLabel': '상세 일정',
      'transfer.itineraryNote': '왕복',
      'transfer.oneWayNote': '편도',
      'transfer.swapBlocked': '이 위치는 하차 전용이며 탑승 장소로 선택할 수 없습니다.',
      'transfer.pricingTitle': '가격표',
      'transfer.scrollHint': '좌우로 스크롤하여 차종별 요금 비교',
      'transfer.pricingTapHint': "요금표의 '예약'을 눌러 빠르게 예약하세요",
      'transfer.miniBook': '예약',
      'transfer.inc.allIn': '모든 비용 포함 정찰가',
      'transfer.inc.toll': '유류비 및 고속도로 통행료 포함',
      'transfer.inc.driver': '전문 기사 도어투도어 픽업',
      'transfer.ctaTitle': '프라이빗 픽업 예약 Mr. Ben',
      'transfer.bookingTitle': '픽업 차량 예약',
      'transfer.bookingTourName': '픽업 차량 서비스',
      'transfer.ctaDesc': '노선과 차량을 선택하고 정보를 입력하여 간편하게 예약하세요.',
      'transfer.bookVehicle': '지금 차량 예약',
      'transfer.bookRoute': '이 노선 예약',
      'transfer.formDivider': '고객 정보',
      'transfer.chatZalo': 'Zalo로 문의 및 예약 (+84 913 140 196)',
      'transfer.labelRoute': '노선 선택',
      'transfer.selectRoute': '-- 노선 선택 --',
      'transfer.labelVehicle': '차량 선택',
      'transfer.labelName': '이름',
      'transfer.labelPhone': '전화번호',
      'transfer.labelDate': '픽업 날짜 및 시간',
      'transfer.labelPickup': '픽업 장소',
      'transfer.labelNotes': '메모',
      'transfer.phName': '이름을 입력하세요',
      'transfer.phPhone': '+84 xxx xxx xxx',
      'transfer.phPickup': '호텔 이름 / 공항 / 주소',
      'transfer.phNotes': '승객 수, 항공편 번호, 특수 수하물...',
      'transfer.bookBtn': '빠른 예약하기 (WhatsApp 및 확인)',
      'transfer.alertSelect': '노선과 차량을 먼저 선택해주세요.',
      'transfer.alertInfo': '이름과 전화번호를 입력해주세요.',
      'transfer.wa.greeting': '안녕하세요 Mr. Ben, 전용 차량을 예약하고 싶습니다. 정보:',
      'transfer.wa.name': '- 이름: ',
      'transfer.wa.phone': '- 전화: ',
      'transfer.wa.route': '- 노선: ',
      'transfer.wa.vehicle': '- 차량: ',
      'transfer.wa.price': '- 가격: ',
      'transfer.wa.date': '- 픽업 날짜: ',
      'transfer.wa.pickup': '- 픽업 장소: ',
      'transfer.wa.notes': '- 메모: ',
      'transfer.wa.footer': '빨리 연락 부탁드립니다. 감사합니다!',
      'transfer.labelDropoff': '하차 장소',
      'transfer.phPickupInput': '탑승 장소 선택',
      'transfer.phDropoff': '하차 장소 선택',
      'transfer.labelVehicleType': '차량 유형',
      'transfer.vehicleGas': '가솔린',
      'transfer.vehicleEv': '전기차',
      'transfer.vehicle16': '16인승',
      'transfer.phNotesTransfer': '고객의 기타 요청 사항',
      'booking.clockSelectHour': '시간 선택',
      'booking.clockSelectMin': '분 선택',
      'booking.clockConfirm': '확인',
    },
    de: {
      '_meta.title': 'Mr. Ben Jeep Tours Mũi Né | Beste Jeep-Tour Mui Ne – Sonnenaufgang & Sonnenuntergang',
      '_meta.description': 'Mr. Ben Jeep Tours – Beste Jeep-Tour in Mui Ne. Sonnenaufgangs- und Sonnenuntergangstouren zu den Weißen und Roten Sanddünen, Feenbach. Private und Gruppentouren. ☎ +84 913 140 196',
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
      'nav.transfer': 'Transfer',
      'svc.tab.jeep': 'Jeep-Tour',
      'svc.tab.transfer': 'Transfer',
      'svc.tab.new': 'Neu',
      'transfer.eyebrow': 'Neuer Service',
      'transfer.title1': 'Privat Wagen',
      'transfer.titleGold': 'Flughafen- & Fernverkehr',
      'transfer.subtitle': 'Privater Transfer mit professionellen Fahrern, neuen Fahrzeugen und pünktlicher Flughafengarantie.',
      'transfer.hl.privacy': 'Absolute Privatsphäre',
      'transfer.hl.privacyDesc': 'Privater Wagen nur für Ihre Familie, keine Mitfahrer.',
      'transfer.hl.airport': 'Tür-zu-Tür-Service',
      'transfer.hl.airportDesc': 'Abholung am Flughafen oder Hotel, Gepäckhilfe, Pünktlichkeitsgarantie.',
      'transfer.hl.routes': 'Flexible Routen',
      'transfer.hl.routesDesc': 'Mũi Né → HCMC, Mũi Né → Nha Trang, Nha Trang → HCMC.',
      'transfer.hl.safe': 'Sicher & Professionell',
      'transfer.hl.safeDesc': 'Erfahrene Fahrer, neue Fahrzeuge, Vollversicherung.',
      'transfer.vehicle.gas7': '7-Sitzer Benziner',
      'transfer.vehicle.gas7Desc': 'Geräumiger 7-Sitzer, ideal für Familien mit 4-6 Personen und großem Gepäck.',
      'transfer.vehicle.ev7': '7-Sitzer Elektro',
      'transfer.vehicle.ev7Desc': 'Leises, umweltfreundliches Elektrofahrzeug. Premium-Reiseerlebnis.',
      'transfer.vehicle.gas16': '16-Sitzer',
      'transfer.vehicle.gas16Desc': 'Geräumiger 16-Sitzer, ideal für große Gruppen und Familien.',
      'transfer.badge.gas': 'Beliebt',
      'transfer.badge.ev': 'Umweltfreundlich',
      'transfer.badge.gas16': 'Große Gruppe',
      'transfer.card.private': 'Privatwagen',
      'transfer.spec.seats7': '7 Sitze',
      'transfer.spec.seats16': '16 Sitze',
      'transfer.spec.gas': 'Benzinmotor',
      'transfer.spec.ev': 'Elektromotor',
      'transfer.spec.luggage': 'Großes Gepäck',
      'transfer.th.route': 'Route',
      'transfer.city.muine': 'Mũi Né',
      'transfer.city.sgn': 'Flughafen Tan Son Nhat (SGN)',
      'transfer.city.nhatrang': 'Nha Trang',
      'transfer.city.phanrang': 'Phan Rang Strand',
      'transfer.city.tacu': 'Berg Ta Cu',
      'transfer.city.kega': 'Kap Ke Ga',
      'transfer.city.cothach': 'Co Thach Pagode',
      'transfer.stop.poshanu': 'Cham-Türme',
      'transfer.stop.caong': 'Wal-Tempel',
      'transfer.route.muineHcm': 'Mũi Né ⇄ Flughafen Tan Son Nhat (SGN)',
      'transfer.route.muineNt': 'Mũi Né ⇄ Nha Trang',
      'transfer.route.ntHcm': 'Nha Trang ⇄ Flughafen Tan Son Nhat (SGN)',
      'transfer.route.muinePhanrang': 'Mũi Né ⇄ Phan Rang Strand',
      'transfer.route.muineTacu': 'Mũi Né → Berg Ta Cu',
      'transfer.route.muineKega': 'Mũi Né → Kap Ke Ga',
      'transfer.route.muineCothach': 'Mũi Né → Co Thach Pagode',
      'transfer.itineraryLabel': 'Detaillierte Route',
      'transfer.itineraryNote': 'Hin- und Rückfahrt',
      'transfer.oneWayNote': 'Einfache Fahrt',
      'transfer.swapBlocked': 'Dieser Ort ist nur ein Absetzpunkt und kann nicht als Abholpunkt gewählt werden.',
      'transfer.pricingTitle': 'Preisliste',
      'transfer.scrollHint': 'Wischen Sie, um Fahrzeugpreise zu vergleichen',
      'transfer.pricingTapHint': "Tippen Sie in der Preistabelle auf 'Buchen'",
      'transfer.miniBook': 'Buchen',
      'transfer.inc.allIn': 'Alles-inklusive Festpreis',
      'transfer.inc.toll': 'Inklusive Benzin & Autobahngebühren',
      'transfer.inc.driver': 'Professioneller Fahrer von Tür zu Tür',
      'transfer.ctaTitle': 'Transfer buchen Mr. Ben',
      'transfer.bookingTitle': 'Transfer buchen',
      'transfer.bookingTourName': 'Privattransfer mit Mr. Ben',
      'transfer.ctaDesc': 'Wählen Sie Route und Fahrzeug, füllen Sie die Daten aus für eine schnelle Buchung.',
      'transfer.bookVehicle': 'Jetzt Fahrzeug buchen',
      'transfer.bookRoute': 'Diese Route buchen',
      'transfer.formDivider': 'Kundeninformationen',
      'transfer.chatZalo': 'Über Zalo buchen (+84 913 140 196)',
      'transfer.labelRoute': 'Route wählen',
      'transfer.selectRoute': '-- Route wählen --',
      'transfer.labelVehicle': 'Fahrzeugtyp wählen',
      'transfer.labelName': 'Vollständiger Name',
      'transfer.labelPhone': 'Telefonnummer',
      'transfer.labelDate': 'Abholtermin',
      'transfer.labelPickup': 'Abholort',
      'transfer.labelNotes': 'Anmerkungen',
      'transfer.phName': 'Geben Sie Ihren Namen ein',
      'transfer.phPhone': '+84 xxx xxx xxx',
      'transfer.phPickup': 'Hotelname / Flughafen / Adresse',
      'transfer.phNotes': 'Anzahl Passagiere, Flugnummer, Sondergepäck...',
      'transfer.bookBtn': 'Schnell buchen (WhatsApp & Bestätigung)',
      'transfer.alertSelect': 'Bitte wählen Sie Route und Fahrzeugtyp.',
      'transfer.alertInfo': 'Bitte geben Sie Name und Telefonnummer ein.',
      'transfer.wa.greeting': 'Hallo Mr. Ben, ich möchte einen privaten Transfer buchen. Details:',
      'transfer.wa.name': '- Name: ',
      'transfer.wa.phone': '- Telefon: ',
      'transfer.wa.route': '- Route: ',
      'transfer.wa.vehicle': '- Fahrzeug: ',
      'transfer.wa.price': '- Preis: ',
      'transfer.wa.date': '- Abholtermin: ',
      'transfer.wa.pickup': '- Abholort: ',
      'transfer.wa.notes': '- Anmerkungen: ',
      'transfer.wa.footer': 'Bitte kontaktieren Sie mich bald. Danke!',
      'transfer.labelDropoff': 'Absetzpunkt',
      'transfer.phPickupInput': 'Abholpunkt auswählen',
      'transfer.phDropoff': 'Absetzpunkt auswählen',
      'transfer.labelVehicleType': 'Fahrzeugtyp',
      'transfer.vehicleGas': 'Benzin',
      'transfer.vehicleEv': 'Elektro',
      'transfer.vehicle16': '16-Sitzer',
      'transfer.phNotesTransfer': 'Andere Wünsche des Kunden',
      'booking.clockSelectHour': 'STUNDE WÄHLEN',
      'booking.clockSelectMin': 'MINUTE WÄHLEN',
      'booking.clockConfirm': 'Bestätigen',
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

    /* Update <title> and <meta name="description"> for SEO */
    if (t['_meta.title']) {
      document.title = t['_meta.title'];
    }
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t['_meta.description']) {
      metaDesc.setAttribute('content', t['_meta.description']);
    }
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
  let navLockTimeout = null;

  function updateActiveLink() {
    if (navLockTimeout) return;

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    /* Check if scrolled near the bottom of the page */
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
      currentSectionId = 'contact';
    }

    /* If in tours section, distinguish between Jeep Tours and Xe Đưa Đón */
    if (currentSectionId === 'tours') {
      const transferPanel = document.getElementById('svcPanelTransfer');
      const transferTab = document.querySelector('.svc-tab[data-svc="transfer"]');
      const isTransferActive = (transferPanel && transferPanel.classList.contains('svc-panel--active')) ||
                               (transferTab && transferTab.classList.contains('svc-tab--active'));
      if (isTransferActive) {
        currentSectionId = 'transfer';
      }
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');

      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function setActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');

      if (link.getAttribute('href') === `#${targetId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    if (navLockTimeout) clearTimeout(navLockTimeout);
    navLockTimeout = setTimeout(function () {
      navLockTimeout = null;
      updateActiveLink();
    }, 1200);
  }

  window.__mrbUpdateActiveLink = updateActiveLink;
  window.__mrbSetActiveNavLink = setActiveNavLink;

  // Track active section on scroll
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // Enhanced Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();

      if (this.classList.contains('nav-link')) {
        const idName = targetId.replace(/^#/, '');
        setActiveNavLink(idName);
      }

      /* Specific handling for #transfer and #tours */
      if (targetId === '#transfer') {
        if (window.__svcSwitchTab) window.__svcSwitchTab('transfer');
        const sec = document.getElementById('tours');
        if (sec) {
          sec.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        try { history.pushState(null, '', '#transfer'); } catch (_) {}
        return;
      }

      if (targetId === '#tours') {
        if (window.__svcSwitchTab) window.__svcSwitchTab('jeep');
        const sec = document.getElementById('tours');
        if (sec) {
          sec.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        try { history.pushState(null, '', '#tours'); } catch (_) {}
        return;
      }

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
        .replace(/dest-pos-hidden/g, '')
        .replace(/dest-swipe-\w+/g, '')
        .replace(/dest-dragging/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      // Top 4 cards get visible positions, rest are hidden
      if (p <= 3) {
        card.classList.add('dest-pos-' + p);
      } else {
        card.classList.add('dest-pos-hidden');
      }
      card.style.transform = '';
      card.style.opacity = '';
    }
    // Update dots
    dots.forEach(function (d, di) {
      d.classList.toggle('active', di === order[0]);
    });
  }

  var SWIPE_MS = 450; // matches CSS 0.45s

  /* Navigate: top card flies out LEFT, cards behind promote up (next ►) */
  function goNext() {
    if (animating || isDesktop()) return;
    animating = true;
    var topCard = cards[order[0]];
    // Remove position class so it doesn't conflict, then swipe out
    topCard.className = topCard.className.replace(/dest-pos-\d/g, '').trim();
    topCard.classList.add('dest-swipe-left');
    // Reorder: move front card to back
    order.push(order.shift());
    // Cards behind naturally promote up via CSS transition (pos-1→pos-0, etc.)
    applyPositions();
    // After swipe animation finishes, reset the swiped card
    setTimeout(function () {
      topCard.classList.remove('dest-swipe-left');
      topCard.style.transition = 'none';
      applyPositions();
      void topCard.offsetWidth;
      topCard.style.transition = '';
      animating = false;
    }, SWIPE_MS);
  }

  /* Navigate: last card comes to front, top card sinks to back (prev ◄ / lùi) */
  function goPrev() {
    if (animating || isDesktop()) return;
    animating = true;
    // Reorder: move last card to front (reverse of goNext)
    order.unshift(order.pop());
    // Top card becomes pos-0, old top sinks down via CSS transition
    applyPositions();
    setTimeout(function () {
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
  var startX = 0, startY = 0, currentX = 0, isDragging = false;
  var dragCardIdx = -1; // index in cards[] of the card being dragged
  var dragPreview = null; // 'next', 'prev', or null
  var orderSnapshot = null; // order[] snapshot taken at drag start
  var dragLocked = false; // true once horizontal swipe is confirmed
  var dragRejected = false; // true if vertical scroll detected first

  function onPointerDown(e) {
    if (animating || isDesktop()) return;
    var topCard = cards[order[0]];
    if (!topCard.contains(e.target)) return;
    isDragging = true;
    dragLocked = false;
    dragRejected = false;
    dragCardIdx = order[0];
    orderSnapshot = order.slice();
    dragPreview = null;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    currentX = startX;
  }

  function onPointerMove(e) {
    if (!isDragging || dragRejected) return;
    var cx = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    var cy = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    // Phase 1: determine swipe direction (horizontal vs vertical)
    if (!dragLocked) {
      var adx = Math.abs(cx - startX);
      var ady = Math.abs(cy - startY);
      // Need at least 10px movement to decide
      if (adx < 10 && ady < 10) return;
      if (ady > adx) {
        // Vertical scroll — release control, let browser scroll
        dragRejected = true;
        isDragging = false;
        return;
      }
      // Horizontal swipe confirmed — lock drag
      dragLocked = true;
      cards[dragCardIdx].classList.add('dest-dragging');
    }

    // Phase 2: horizontal drag active — prevent scroll
    if (e.cancelable) e.preventDefault();
    currentX = cx;
    var dx = currentX - startX;
    var dragCard = cards[dragCardIdx];
    var rot = dx * 0.06;
    dragCard.style.transform = 'translateX(' + dx + 'px) rotate(' + rot + 'deg)';
    dragCard.style.opacity = Math.max(0.3, 1 - Math.abs(dx) / 400);

    // Determine which preview is needed
    var needed = null;
    if (dx < -30) needed = 'next';
    else if (dx > 30) needed = 'prev';

    if (needed !== dragPreview) {
      dragPreview = needed;
      // Build the background order that matches what will happen after release
      // Start from original snapshot, simulate the reorder, then remove dragged card
      var simOrder = orderSnapshot.slice();
      if (needed === 'next') {
        simOrder.push(simOrder.shift()); // goNext: front → back
      } else if (needed === 'prev') {
        simOrder.unshift(simOrder.pop()); // goPrev: back → front
      }
      // Remove the dragged card from simulated order
      var bgOrder = [];
      for (var i = 0; i < simOrder.length; i++) {
        if (simOrder[i] !== dragCardIdx) bgOrder.push(simOrder[i]);
      }
      // Reset ALL non-dragged cards first (clear stale positions)
      for (var i = 0; i < total; i++) {
        if (i === dragCardIdx) continue;
        var card = cards[i];
        card.className = card.className
          .replace(/dest-pos-\d/g, '')
          .replace(/dest-pos-hidden/g, '')
          .replace(/dest-swipe-\w+/g, '')
          .replace(/dest-dragging/g, '')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }
      // Apply new positions to background cards
      for (var p = 0; p < bgOrder.length; p++) {
        var card = cards[bgOrder[p]];
        var posIdx = p + 1; // +1 because pos-0 is the dragged card visually on top
        if (posIdx <= 3) {
          card.classList.add('dest-pos-' + posIdx);
        } else {
          card.classList.add('dest-pos-hidden');
        }
        card.style.transform = '';
        card.style.opacity = '';
      }
    }
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;

    // If drag was never locked (no horizontal swipe detected), just clean up
    if (!dragLocked) {
      dragCardIdx = -1;
      dragPreview = null;
      orderSnapshot = null;
      return;
    }

    var dragCard = cards[dragCardIdx];
    dragCard.classList.remove('dest-dragging');
    dragCard.style.transform = '';
    dragCard.style.opacity = '';
    var dx = currentX - startX;

    // Restore original order — goNext/goPrev will do their own reorder
    order = orderSnapshot.slice();
    dragPreview = null;
    orderSnapshot = null;

    if (Math.abs(dx) > 70) {
      dx < 0 ? goNext() : goPrev();
    } else {
      // Snap back
      applyPositions();
    }
    dragCardIdx = -1;
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
  let programmaticScroll = false; // guard: prevent observer from overriding goTo()

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
      (function (c) {
        if (!c) return;
        c.style.animation = 'none';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            c.style.animation = animName + ' 0.42s cubic-bezier(0.25,0.46,0.45,0.94) both';
          });
        });
      })(cards[i]);
    }
  }

  /* ─── Silk-smooth rAF scroll for mobile (zero latency, momentum feel) ─── */
  var scrollAnimId = null;

  function smoothScrollTo(element, targetLeft, duration) {
    if (scrollAnimId) cancelAnimationFrame(scrollAnimId);

    var startLeft = element.scrollLeft;
    var distance = targetLeft - startLeft;

    if (Math.abs(distance) < 1) {
      element.scrollLeft = targetLeft;
      return;
    }

    var startTime = performance.now();

    function step(now) {
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out: smooth, elegant deceleration matching classic feel
      var ease = 1 - Math.pow(1 - progress, 3);

      element.scrollLeft = startLeft + distance * ease;

      if (progress < 1) {
        scrollAnimId = requestAnimationFrame(step);
      } else {
        element.scrollLeft = targetLeft;
        scrollAnimId = null;
      }
    }

    scrollAnimId = requestAnimationFrame(step);
  }

  /* ─── Scroll to card by index ────────────────────────────── */
  function goTo(idx, instant, dir, customDuration) {
    clearTimeout(loopTimeout);
    var card = cards[idx];
    if (!card) return;

    var isMobile = cardsPerView() === 1;
    var duration = customDuration || (isMobile ? 420 : 500);

    /* Block observer from overriding is-active during programmatic scroll */
    programmaticScroll = true;
    setTimeout(function () { programmaticScroll = false; }, 600);

    /* Mark active cards */
    updateUI(idx);

    var scrollTarget = card.offsetLeft;

    if (isMobile) {
      if (instant) {
        if (scrollAnimId) cancelAnimationFrame(scrollAnimId);
        grid.scrollLeft = scrollTarget;
      } else {
        smoothScrollTo(grid, scrollTarget, duration);
      }
    } else {
      /* Temporarily disable scroll-snap on desktop */
      grid.style.scrollSnapType = 'none';
      grid.scrollTo({
        left: scrollTarget,
        behavior: instant ? 'instant' : 'smooth'
      });
      setTimeout(function () {
        grid.style.scrollSnapType = '';
      }, instant ? 50 : 500);

      if (!instant) animateActiveCards(idx, dir || 'next');
    }
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
      /* Skip observer updates during programmatic scrolls or active touch drag */
      if (programmaticScroll || isDragging) return;

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

  /* ─── Mobile touch drag & swipe with preview ─────────────── */
  var touchStartX = 0;
  var touchStartY = 0;
  var touchStartTime = 0;
  var touchCurrentX = 0;
  var dragStartIdx = 0;
  var isDragging = false;
  var isLocked = false;
  var isRejected = false;
  var baseScrollLeft = 0;
  var draggedFar = false;

  function onDragStart(clientX, clientY) {
    if (cardsPerView() !== 1) return;
    if (scrollAnimId) {
      cancelAnimationFrame(scrollAnimId);
      scrollAnimId = null;
    }
    grid.style.transition = '';
    grid.style.transform = '';
    touchStartX = clientX;
    touchStartY = clientY;
    touchStartTime = performance.now();
    touchCurrentX = touchStartX;
    dragStartIdx = currentIdx;
    isDragging = true;
    isLocked = false;
    isRejected = false;
    baseScrollLeft = grid.scrollLeft;
    programmaticScroll = false;
  }

  function onDragMove(clientX, clientY, e) {
    if (!isDragging || isRejected || cardsPerView() !== 1) return;

    if (!isLocked) {
      var adx = Math.abs(clientX - touchStartX);
      var ady = Math.abs(clientY - touchStartY);
      if (adx < 8 && ady < 8) return; // 8px dead-zone before decision

      if (ady >= adx) {
        // Vertical scroll dominates -> pass through to page
        isRejected = true;
        isDragging = false;
        return;
      }

      isLocked = true;
      draggedFar = true;
    }

    // Horizontal drag locked: prevent vertical page scroll
    if (e && e.cancelable) e.preventDefault();

    touchCurrentX = clientX;
    var dx = touchCurrentX - touchStartX;
    var maxIdx = cards.length - 1;

    // Resistance / rubberband at outer boundaries of whole slider
    if (dragStartIdx === 0 && dx > 0) {
      grid.scrollLeft = 0;
      grid.style.transform = 'translateX(' + (dx * 0.22) + 'px)';
    } else if (dragStartIdx === maxIdx && dx < 0) {
      grid.scrollLeft = cards[maxIdx].offsetLeft;
      grid.style.transform = 'translateX(' + (dx * 0.22) + 'px)';
    } else {
      // Clamped strictly to adjacent cards: user can preview next or prev, NEVER jump over 2 cards
      var minScroll = (dragStartIdx > 0 && cards[dragStartIdx - 1]) ? cards[dragStartIdx - 1].offsetLeft : 0;
      var maxScroll = (dragStartIdx < maxIdx && cards[dragStartIdx + 1]) ? cards[dragStartIdx + 1].offsetLeft : cards[maxIdx].offsetLeft;
      var rawScroll = baseScrollLeft - dx;

      if (rawScroll < minScroll) {
        var excessR = minScroll - rawScroll;
        grid.scrollLeft = minScroll;
        grid.style.transform = 'translateX(' + (excessR * 0.15) + 'px)';
      } else if (rawScroll > maxScroll) {
        var excessL = rawScroll - maxScroll;
        grid.scrollLeft = maxScroll;
        grid.style.transform = 'translateX(' + (-excessL * 0.15) + 'px)';
      } else {
        grid.style.transform = '';
        grid.scrollLeft = rawScroll;
      }
    }
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;

    // Restore any rubberband transform smoothly
    if (grid.style.transform) {
      grid.style.transition = 'transform 0.35s ease';
      grid.style.transform = '';
      setTimeout(function () {
        grid.style.transition = '';
      }, 360);
    }

    if (!isLocked) {
      draggedFar = false;
      return;
    }

    setTimeout(function () {
      draggedFar = false;
    }, 200);

    var elapsed = performance.now() - touchStartTime;
    var dx = touchCurrentX - touchStartX;
    var maxIdx = cards.length - 1;
    var velocity = Math.abs(dx) / (elapsed || 1); // px/ms

    // Fast flick: released within 350ms, velocity > 0.20 px/ms, moved at least 15px
    var isFlick = elapsed < 350 && velocity > 0.20 && Math.abs(dx) > 15;
    // Normal drag commit threshold: 40px
    var isDragCommit = Math.abs(dx) > 40;

    if (dx < 0 && (isFlick || isDragCommit)) {
      // Swiped left -> Next card relative to the card we started dragging from
      var next = dragStartIdx + 1;
      if (next > maxIdx) next = 0;
      goTo(next, false, 'next');
    } else if (dx > 0 && (isFlick || isDragCommit)) {
      // Swiped right -> Previous card relative to the card we started dragging from
      var prev = dragStartIdx - 1;
      if (prev < 0) prev = maxIdx;
      goTo(prev, false, 'prev');
    } else {
      // Didn't reach threshold -> snap back smoothly to starting card
      goTo(dragStartIdx, false);
    }
  }

  /* Mobile touch listeners */
  grid.addEventListener('touchstart', function (e) {
    if (e.touches && e.touches[0]) {
      onDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  grid.addEventListener('touchmove', function (e) {
    if (e.touches && e.touches[0]) {
      onDragMove(e.touches[0].clientX, e.touches[0].clientY, e);
    }
  }, { passive: false });

  grid.addEventListener('touchend', onDragEnd, { passive: true });
  grid.addEventListener('touchcancel', onDragEnd, { passive: true });

  /* Mouse drag listeners (supports desktop emulation of mobile) */
  grid.addEventListener('mousedown', function (e) {
    if (cardsPerView() !== 1 || e.button !== 0) return;
    onDragStart(e.clientX, e.clientY);

    function onMouseMove(me) {
      onDragMove(me.clientX, me.clientY, me);
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      onDragEnd();
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  /* Block accidental button clicks when user was dragging */
  grid.addEventListener('click', function (e) {
    if (draggedFar) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  /* ─── Init ───────────────────────────────────────────────── */
  function init() {
    cards = Array.from(grid.querySelectorAll('.tour-card'));
    buildDots();
    updateUI(0);

    if (cardsPerView() === 1) {
      setupObserver();
    }

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        buildDots();
        updateUI(currentIdx);
      }, 150);
    });

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
  var tfSelectedVehicle = '';   // 'gas7' | 'ev7' | 'gas16'

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

    if (window.__bookingMode !== 'transfer') {
      if (hNameGroup) hNameGroup.style.display = '';
      if (hAddrGroup) hAddrGroup.style.display = '';
      if (hCustomGroup) {
        hCustomGroup.style.display = (hotelWrapCheck && hotelWrapCheck.classList.contains('is-other-selected')) ? '' : 'none';
      }
      return;
    }

    var pIn = document.getElementById('bfTfPickup');
    var dIn = document.getElementById('bfTfDropoff');
    var pVal = pIn ? pIn.value.trim() : '';
    var dVal = dIn ? dIn.value.trim() : '';
    var showHotel = Boolean(pVal && dVal);

    if (hNameGroup) hNameGroup.style.display = showHotel ? '' : 'none';
    if (hAddrGroup) hAddrGroup.style.display = showHotel ? '' : 'none';
    if (hCustomGroup) {
      if (!showHotel) {
        hCustomGroup.style.display = 'none';
      } else {
        hCustomGroup.style.display = (hotelWrapCheck && hotelWrapCheck.classList.contains('is-other-selected')) ? '' : 'none';
      }
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
        var isMatch = Boolean(dVal && v === dVal);
        li.classList.toggle('is-disabled', isMatch);
        if (isMatch) {
          li.setAttribute('aria-disabled', 'true');
        } else {
          li.removeAttribute('aria-disabled');
        }
      });
    }

    if (dList) {
      dList.querySelectorAll('li').forEach(function (li) {
        var v = normalizeTransferCity(li.getAttribute('data-val'));
        var isMatch = Boolean(pVal && v === pVal);
        li.classList.toggle('is-disabled', isMatch);
        if (isMatch) {
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

    if (normCity && currentDropoff && normCity === currentDropoff) {
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

    if (normCity && currentPickup && normCity === currentPickup) {
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
        if (privateIcon) privateIcon.className = 'fas fa-gas-pump';
        if (privateSpan) privateSpan.textContent = t['transfer.vehicleGas'] || 'Xe Xăng';
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
        if (groupIcon) groupIcon.className = 'fas fa-bolt';
        if (groupSpan) groupSpan.textContent = t['transfer.vehicleEv'] || 'Xe Điện';
        btnGroup.setAttribute('data-type', 'ev7');
        btnGroup.classList.toggle('active', tfSelectedVehicle === 'ev7');
      } else {
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

    /* Hotel section: in jeep mode always shown, in transfer mode shown only when both pickup & dropoff chosen */
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
    if (tourNameEl && isTransfer) {
      tourNameEl.textContent = t['transfer.bookingTourName'] || 'Xe Đưa Đón';
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
    var isTransfer = (window.__bookingMode === 'transfer');
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var t = (window.__MRB_TRANS || {})[lang] || {};

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
      var pNorm = normalizeTransferCity(pVal);
      var dNorm = normalizeTransferCity(dVal);

      if (tfRouteRow && tfRouteLbl && tfRouteVal) {
        tfRouteRow.style.display = 'flex';
        if (tfSelectedRoute && pNorm && dNorm && pNorm !== dNorm) {
          var pText = getTransferCityName(pNorm, lang);
          var dText = getTransferCityName(dNorm, lang);
          var routeDisplay = pText + ' → ' + dText;
          tfRouteLbl.textContent = routeDisplay;
          tfRouteVal.textContent = tfP > 0 ? fmt(tfP) : '—';
        } else {
          tfRouteLbl.textContent = t['transfer.th.route'] || 'Tuyến đường';
          tfRouteVal.textContent = '—';
        }
      }
      if (tfVehRow && tfVehLbl && tfVehVal) {
        if (tfSelectedVehicle) {
          tfVehRow.style.display = 'flex';
          var isEv = (tfSelectedVehicle === 'ev7');
          var is16 = (tfSelectedVehicle === 'gas16');
          var vehIcon = document.getElementById('bfPriceTransferVehicleIcon');
          if (vehIcon) vehIcon.className = is16 ? 'fas fa-shuttle-van' : (isEv ? 'fas fa-bolt' : 'fas fa-car-side');
          tfVehLbl.textContent = is16
            ? (t['transfer.vehicle16'] || 'Xe 16 Chỗ')
            : (isEv
              ? (t['transfer.vehicleEv'] || 'Xe Điện')
              : (t['transfer.vehicleGas'] || 'Xe Xăng'));
          tfVehVal.textContent = is16
            ? (t['transfer.spec.seats16'] || '16 Chỗ')
            : (t['transfer.spec.seats7'] || '7 Chỗ');
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
      totalEl.textContent = finalTotal > 0 ? fmt(finalTotal) : '—';
    }
  }

  function setTourType(type) {
    var isTransfer = (window.__bookingMode === 'transfer');
    if (isTransfer) {
      /* Transfer mode: type is 'gas7' or 'ev7' or 'gas16' or '' */
      tfSelectedVehicle = type || '';
      tourType = ''; // not used in transfer mode
      if (tfSelectedVehicle === 'gas7') {
        btnPrivate.classList.add('active');
        btnGroup.classList.remove('active');
        if (btn16) btn16.classList.remove('active');
      } else if (tfSelectedVehicle === 'ev7') {
        btnGroup.classList.add('active');
        btnPrivate.classList.remove('active');
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
    setDefaultDatetime();
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
      configureBookingMode('jeep');
      openBooking({ name: 'Xe Jeep Mr. Ben', nameVi: 'Xe Jeep Mr. Ben', private: PRICE_PRIVATE, group: PRICE_GROUP });
    });
  }

  /* Also keep "Book Now" in navbar CTA working */
  document.querySelectorAll('.nav-cta').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      configureBookingMode('jeep');
      openBooking({ name: 'Xe Jeep Mr. Ben', nameVi: 'Xe Jeep Mr. Ben', private: PRICE_PRIVATE, group: PRICE_GROUP });
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
    var t = (window.__bookingMode === 'transfer') ? 'gas7' : 'private';
    setTourType(t);
    refreshWALink();
  });
  btnGroup.addEventListener('click', function () {
    var t = (window.__bookingMode === 'transfer') ? 'ev7' : 'group';
    setTourType(t);
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
      swapToastTimer = setTimeout(function () {
        dismissSwapToast(existing);
      }, 3200);
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

    toast.appendChild(icon);
    toast.appendChild(span);

    toast.addEventListener('click', function () {
      dismissSwapToast(toast);
    });

    document.body.appendChild(toast);

    if (swapToastTimer) clearTimeout(swapToastTimer);
    swapToastTimer = setTimeout(function () {
      dismissSwapToast(toast);
    }, 3200);
  }

  function dismissSwapToast(toast) {
    if (!toast || !toast.parentNode) return;
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
      if (!li || li.classList.contains('is-disabled')) return;
      var val = li.getAttribute('data-val');
      setTransferPickup(val);
      closeRouteDropdowns();
    });
  }

  if (tfDropoffList) {
    tfDropoffList.addEventListener('click', function (e) {
      var li = e.target.closest('li');
      if (!li || li.classList.contains('is-disabled')) return;
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
    if (window.__bookingMode === 'transfer') {
      var tr = (window.__MRB_TRANS || {})[curLang] || {};
      var formTitleEl = document.querySelector('[data-i18n="booking.formTitle"]');
      if (formTitleEl) formTitleEl.textContent = tr['transfer.bookingTitle'] || 'Đặt Xe Đưa Đón';
      var tourNameEl = document.getElementById('bookingTourName');
      if (tourNameEl) tourNameEl.textContent = tr['transfer.bookingTourName'] || 'Xe Đưa Đón';
      /* Re-sync vehicle type toggle labels */
      if (typeof configureBookingMode === 'function') configureBookingMode('transfer');
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
      : (tfSelectedVehicle === 'ev7'
        ? (t['transfer.vehicleEv'] || 'Xe Điện')
        : (tfSelectedVehicle === 'gas7' ? (t['transfer.vehicleGas'] || 'Xe Xăng') : '—'));
    var vehTypeStrVi = tfSelectedVehicle === 'gas16'
      ? 'Xe 16 Chỗ'
      : (tfSelectedVehicle === 'ev7'
        ? 'Xe Điện (7 chỗ)'
        : (tfSelectedVehicle === 'gas7' ? 'Xe Xăng (7 chỗ)' : '—'));

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
    if (window.__bookingMode === 'transfer') {
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
    var isTransfer = (window.__bookingMode === 'transfer');

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
        if (pVal.toLowerCase() === dVal.toLowerCase()) {
          isValid = false;
          var pTrig = document.getElementById('bfTfPickupTrigger');
          var dTrig = document.getElementById('bfTfDropoffTrigger');
          if (pTrig) pTrig.classList.add('bf-error');
          if (dTrig) dTrig.classList.add('bf-error');
          if (!firstErr) firstErr = pTrig || dTrig;
        } else {
          reqFields.push({ id: 'bfHotelName', text: T['wa.hotel'] || 'Khách sạn' });
          reqFields.push({ id: 'bfHotelAddress', text: T['wa.hotelAddress'] || 'Địa chỉ' });
          var hotelNameEl = document.getElementById('bfHotelName');
          var hotelWrapEl = document.getElementById('bfHotelWrap');
          if (hotelNameEl && hotelWrapEl && hotelWrapEl.classList.contains('is-other-selected')) {
            reqFields.push({ id: 'bfHotelCustomName', text: T['wa.hotel'] || 'Khách sạn' });
          }
        }
      }
    } else {
      reqFields.push({ id: 'bfHotelName', text: T['wa.hotel'] || 'Khách sạn' });
      reqFields.push({ id: 'bfHotelAddress', text: T['wa.hotelAddress'] || 'Địa chỉ' });
      var hotelNameEl = document.getElementById('bfHotelName');
      var hotelWrapEl = document.getElementById('bfHotelWrap');
      if (hotelNameEl && hotelWrapEl && hotelWrapEl.classList.contains('is-other-selected')) {
        reqFields.push({ id: 'bfHotelCustomName', text: T['wa.hotel'] || 'Khách sạn' });
      }
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
    var btn16v = document.getElementById('bfType16');
    if (btnPriv && btnGrp) {
      var hasActive = btnPriv.classList.contains('active') || btnGrp.classList.contains('active') || (btn16v && btn16v.classList.contains('active'));
      if (!hasActive) {
        btnPriv.classList.add('bf-error');
        btnGrp.classList.add('bf-error');
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
    dtHidden.value = iso;
    dtDisplay.textContent = pad(d) + '/' + pad(mo) + '/' + y + ' | ' + pad(selHour) + ':' + pad(selMin);
    dtTrigger.classList.add('has-value');
    closePicker();
    dtHidden.dispatchEvent(new Event('input'));
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
      } catch (err) {}
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
      } catch (err) {}
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

  setDefault();
  // Re-default when booking modal reopens
  document.addEventListener('mrben-booking-open', setDefault);

  // Translate Date & Time label dynamically
  document.addEventListener('mrben-langchange', function () {
    var lang = localStorage.getItem('mrben-lang') || 'vi';
    var TRANS = window.__MRB_TRANS || {};
    if (selDate && selHour !== null && selMin !== null) {
      if (window.__bookingMode === 'transfer') {
        var y = selDate.getFullYear(), mo = selDate.getMonth() + 1, d = selDate.getDate();
        dtDisplay.textContent = pad(d) + '/' + pad(mo) + '/' + y + ' | ' + pad(selHour) + ':' + pad(selMin);
      } else {
        confirmSlot(selHour, selMin);
      }
    } else {
      var placeholder = (TRANS[lang] && TRANS[lang]['booking.datePlaceholder']) || 'Chọn ngày & giờ khởi hành';
      dtDisplay.textContent = placeholder;
    }
    if (clockHint) {
      clockHint.textContent = clockMode === 'hour'
        ? (TRANS[lang] && TRANS[lang]['booking.clockSelectHour'] || 'CHỌN GIỜ')
        : (TRANS[lang] && TRANS[lang]['booking.clockSelectMin'] || 'CHỌN PHÚT');
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
    { name: 'Bình Yên Homestay', address: '165 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Blue Bay Mui Ne Resort & Spa', address: 'Khu phố Suối Nước, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Blue Ocean Resort', address: '54 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Blue Shell Resort', address: 'Khu phố 5, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bonnie Homestay - Mũi Né', address: '201/5 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bon Bien Resort Mui Ne', address: '30 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bọt Biển Homestay Mũi Né', address: 'Đường Nguyễn Hữu Thọ, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cà Ty Mui Ne Resort', address: '6 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Canary Beach Resort', address: '60 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cat Tien Guesthouse', address: '59 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cargo Remote Mui Ne', address: '201/88 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Centara Mirage Resort Mui Ne', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cesar Homestay', address: '124 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cham Charm Home Mui Ne', address: '157 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cham Villas Boutique Resort', address: '32 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Champa Resort & Spa', address: '2 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Charm Hon Rom Villas Resort', address: '75 Nguyễn Cơ Thạch, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Coco Beach Resort', address: '58 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Coco Cottage Beachfront Resort', address: '48 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Coconut Garden Villas', address: ' 230/1 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cocosand Hotel', address: '119 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Connect Homestay Mũi Né', address: '151 Chế Lan Viên, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Coral Sea Resort Mui Ne', address: '76 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cozy Garden Mui Ne Homestay', address: 'Khu 2C Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Lạc House Mui Ne', address: '149A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'La Mer Bali Mũi Né', address: '124 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'La Mer Hotel Mũi Né', address: '168 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Lang Chai Guesthouse', address: '230/2 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Lavender Mui Ne Hotel', address: '17B Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Le Huynh Mui Ne Hotel', address: '135 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Le\' VIVA Resort Mũi Né', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Little Mui Ne Cottages Resort', address: '10B Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Little Paris Resort', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'LoiLoi\'s Home', address: 'Hẻm 177 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Long Beach Resort', address: '130 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'LOTUS GARDEN RESORT', address: '200 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Lotus Mui Ne Resort', address: 'Khu 5, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Maidi Homestay Mui Ne', address: '151 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'MANA Muine Beach Resort', address: '20B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Mũi Đá Hotel', address: '4B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Na\'s homestay', address: 'Hẻm 177 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Pandora Beach Mui Ne Retreat', address: '6/1 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Pandora Sand Hill Mui Ne Resort', address: '13/1 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Sabina Boutique Hotel & Villa Mũi Né', address: '165 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng'},
    { name: 'Sài Gòn - Mũi Né Resort', address: '56-97 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sailing Club Mui Ne', address: '24 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sand Beach Resort', address: '128 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sand Garden Resort', address: '7-9 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'The Clay Resort', address: '10 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'VitaSea Mũi Né Homestay & Pool', address: '149 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Vinh Sương Seaside Hotel', address: '46 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Vipol Hotel Mui Ne', address: '29A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'VIVA BEACH RESORT Mui Ne', address: '134 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Vivian Hotel Villa Mui Ne', address: '173 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Volga Apartment Hotel', address: '219 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Vuon Tra Resort', address: '146 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Wanderlust garden inn', address: '375/3 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Wanderlust Hotel', address: '375 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Wiki Villa Mui Ne', address: '2C Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
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

  /* ─── Ensure video properties for strict autoplay compliance ─── */
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  /* ─── State ─────────────────────────────────────────────── */
  var isPlaying = false;

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

  function markReady() {
    video.classList.add('is-ready');
  }

  function playVideo() {
    video.muted = true;
    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        isPlaying = true;
        showPause();
        markReady();
      }).catch(function () {
        /* Autoplay was restricted by browser policy */
        isPlaying = false;
        showPlay();
        // Still reveal the video frame/poster so there is no blank color
        markReady();
      });
    }
  }

  /* ─── Toggle handler ────────────────────────────────────── */
  toggleBtn.addEventListener('click', function () {
    if (isPlaying) {
      video.pause();
      isPlaying = false;
      showPlay();
    } else {
      video.muted = true;
      video.play().then(function () {
        isPlaying = true;
        showPause();
        markReady();
      }).catch(function () { /* ignore */ });
    }
  });

  /* ─── Video readiness event hooks ────────────────────────── */
  video.addEventListener('playing', function () {
    isPlaying = true;
    showPause();
    markReady();
  });

  video.addEventListener('loadeddata', markReady);
  video.addEventListener('canplay', markReady);
  video.addEventListener('timeupdate', function onTime() {
    if (video.currentTime > 0) {
      markReady();
      video.removeEventListener('timeupdate', onTime);
    }
  });

  /* If already decoding or playing before this script was executed */
  if (video.readyState >= 2 || video.currentTime > 0 || !video.paused) {
    markReady();
    if (!video.paused) {
      isPlaying = true;
      showPause();
    }
  }

  /* ─── Attempt autoplay immediately ───────────────────────── */
  playVideo();

  /* ─── Fallback: start video on first user interaction ────── */
  function onFirstInteraction() {
    if (video.paused) {
      playVideo();
    }
    ['touchstart', 'touchend', 'click', 'scroll', 'keydown'].forEach(function (evt) {
      window.removeEventListener(evt, onFirstInteraction, { passive: true });
    });
  }

  ['touchstart', 'touchend', 'click', 'scroll', 'keydown'].forEach(function (evt) {
    window.addEventListener(evt, onFirstInteraction, { passive: true, once: true });
  });

  /* Resume video when tab regains focus */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && isPlaying && video.paused) {
      playVideo();
    }
  });

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

    /* update section header */
    var hdr = SVC_HEADERS[svc] || SVC_HEADERS.jeep;
    var elEyebrow = document.getElementById('svcEyebrow');
    var elTitle1  = document.getElementById('svcTitle1');
    var elGold    = document.getElementById('svcTitleGold');
    var elSub     = document.getElementById('svcSubtitle');
    if (elEyebrow) { elEyebrow.textContent = t(hdr.eyebrow); elEyebrow.setAttribute('data-i18n', hdr.eyebrow); }
    if (elTitle1)  { elTitle1.textContent  = t(hdr.title1);  elTitle1.setAttribute('data-i18n', hdr.title1); }
    if (elGold)    { elGold.textContent    = t(hdr.titleGold); elGold.setAttribute('data-i18n', hdr.titleGold); }
    if (elSub)     { elSub.textContent     = t(hdr.subtitle); elSub.setAttribute('data-i18n', hdr.subtitle); }

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
        try { history.pushState(null, '', '#transfer'); } catch (_) {}
        return;
      }
      /* Handle nav click on #tours link → switch to jeep tab */
      var b = e.target.closest('a[href="#tours"]');
      if (b) {
        e.preventDefault();
        switchTab('jeep');
        if (window.__mrbSetActiveNavLink) window.__mrbSetActiveNavLink('tours');
        scrollToServiceSection();
        try { history.pushState(null, '', '#tours'); } catch (_) {}
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
      var elTitle1  = document.getElementById('svcTitle1');
      var elGold    = document.getElementById('svcTitleGold');
      var elSub     = document.getElementById('svcSubtitle');
      if (elEyebrow) elEyebrow.textContent = t(hdr.eyebrow);
      if (elTitle1)  elTitle1.textContent  = t(hdr.title1);
      if (elGold)    elGold.textContent    = t(hdr.titleGold);
      if (elSub)     elSub.textContent     = t(hdr.subtitle);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSvcTabs);
  } else {
    initSvcTabs();
  }
})();


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
        id: 'ev7', icon: 'fas fa-car-side', badgeClass: 'tf-badge-ev',
        badgeI18n: 'transfer.badge.ev', nameI18n: 'transfer.vehicle.ev7',
        descI18n: 'transfer.vehicle.ev7Desc',
        image: 'assets/images/produtcs/xe-dien-7c.webp',
        specs: [
          { icon: 'fas fa-users', labelI18n: 'transfer.spec.seats7' },
          { icon: 'fas fa-bolt', labelI18n: 'transfer.spec.ev' },
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
      { id: 'muine-hcm', from: 'muine', to: 'sgn', nameI18n: 'transfer.route.muineHcm', distance: '~200 km', duration: '~4h', prices: { gas7: 1750000, ev7: 1750000, gas16: 2600000 }, roundTrip: false },
      { id: 'muine-nhatrang', from: 'muine', to: 'nhatrang', nameI18n: 'transfer.route.muineNt', distance: '~250 km', duration: '~4.5h', prices: { gas7: 1750000, ev7: 1750000, gas16: 2600000 }, roundTrip: false },
      { id: 'nhatrang-hcm', from: 'nhatrang', to: 'sgn', nameI18n: 'transfer.route.ntHcm', distance: '~430 km', duration: '~7.5h', prices: { gas7: 3500000, ev7: 3500000, gas16: 5300000 }, roundTrip: false },
      { id: 'muine-phanrang', from: 'muine', to: 'phanrang', nameI18n: 'transfer.route.muinePhanrang', distance: '~110 km', duration: '~2h', prices: { gas7: 1750000, ev7: 1750000, gas16: 2600000 }, roundTrip: false },
      { id: 'muine-tacu', from: 'muine', to: 'tacu', nameI18n: 'transfer.route.muineTacu', distance: '~30 km', duration: '~1h', prices: { gas7: 1300000, ev7: 1300000, gas16: 1900000 }, roundTrip: true },
      { id: 'muine-kega', from: 'muine', to: 'kega', nameI18n: 'transfer.route.muineKega', distance: '~50 km', duration: '~1.5h', prices: { gas7: 1300000, ev7: 1300000, gas16: 1900000 }, roundTrip: true },
      { id: 'muine-cothach', from: 'muine', to: 'cothach', nameI18n: 'transfer.route.muineCothach', distance: '~80 km', duration: '~2h', prices: { gas7: 1900000, ev7: 1900000, gas16: 2700000 }, roundTrip: true }
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
      h += '<div class="tour-card" data-vehicle-id="' + v.id + '" style="cursor:pointer;">'
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
    if (window.innerWidth > 960) return 3;
    return window.innerWidth > 680 ? 2 : 1;
  }

  function tfBuildDots() {
    var dotsEl = document.getElementById('tfDots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
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
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
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
    if (tourNameEl) tourNameEl.textContent = t('transfer.bookingTourName') || 'Xe Đưa Đón';

    var vId = (opts && opts.vehicleId) ? opts.vehicleId : '';
    if (window.__setTourType) {
      window.__setTourType(vId);
    } else {
      var btnG = document.getElementById('bfTypeGroup');
      var btnP = document.getElementById('bfTypePrivate');
      var btn16f = document.getElementById('bfType16');
      if (vId === 'ev7') {
        if (btnG) btnG.classList.add('active');
        if (btnP) btnP.classList.remove('active');
        if (btn16f) btn16f.classList.remove('active');
      } else if (vId === 'gas7') {
        if (btnP) btnP.classList.add('active');
        if (btnG) btnG.classList.remove('active');
        if (btn16f) btn16f.classList.remove('active');
      } else if (vId === 'gas16') {
        if (btn16f) btn16f.classList.add('active');
        if (btnP) btnP.classList.remove('active');
        if (btnG) btnG.classList.remove('active');
      } else {
        if (btnP) btnP.classList.remove('active');
        if (btnG) btnG.classList.remove('active');
        if (btn16f) btn16f.classList.remove('active');
      }
    }

    if (window.__setTransferPickup) window.__setTransferPickup(opts.pickup || '');
    if (window.__setTransferDropoff) window.__setTransferDropoff(opts.dropoff || '');

    if (window.__recordModalOpenTime) window.__recordModalOpenTime();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new CustomEvent('mrben-booking-open'));
  }

  function initTransfer() {
    renderVehicleCards();
    renderPricingTable();
    initTransferSlider();

    /* ── CTA "Đặt Xe Ngay" button ── */
    var tfCtaBtn = document.getElementById('tfCtaBookBtn');
    if (tfCtaBtn) {
      tfCtaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openTransferBooking();
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
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTransfer);
  } else {
    initTransfer();
  }

})();
