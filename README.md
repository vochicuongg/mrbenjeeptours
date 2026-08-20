<p align="center">
  <img src="assets/images/logo/logo-mr.ben.webp" alt="Mr. Ben Jeep Tours Logo" width="140" />
</p>

<h1 align="center">🚙 Mr. Ben Jeep Tours – Mũi Né</h1>

<p align="center">
  <strong>Website đặt xe Jeep tour cao cấp tại Mũi Né, Phan Thiết</strong><br>
  <em>Premium Jeep Tour Booking Website for Mũi Né, Phan Thiết, Vietnam</em>
</p>

<p align="center">
  <a href="https://mrbenjeeptours.com">🌐 Live Website</a> ·
  <a href="https://web.facebook.com/binh.jeep">📘 Facebook</a> ·
  <a href="https://www.tripadvisor.com/Attraction_Review-g298086-d34263740-Reviews-Mr_Ben_Jeep_Tours_Mui_Ne-Phan_Thiet_Binh_Thuan_Province.html">🏆 TripAdvisor</a> ·
  <a href="https://wa.me/84913140196">💬 WhatsApp</a>
</p>

---

## 📑 Mục Lục

- [Giới Thiệu](#-giới-thiệu)
- [Tính Năng](#-tính-năng)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Công Nghệ](#-công-nghệ)
- [Đa Ngôn Ngữ (i18n)](#-đa-ngôn-ngữ-i18n)
- [Hệ Thống Đặt Tour](#-hệ-thống-đặt-tour)
- [Phụ Thu Lễ (Holiday Surcharge)](#️-phụ-thu-lễ--holiday-surcharge)
- [Kênh Gửi Tin Nhắn](#-kênh-gửi-tin-nhắn)
- [SEO & Structured Data](#-seo--structured-data)
- [Triển Khai](#-triển-khai)
- [Tác Giả](#-tác-giả)

---

## 📝 Giới Thiệu

**Mr. Ben Jeep Tours** là website đặt xe Jeep tour tham quan Đồi Cát Trắng, Đồi Cát Đỏ, Suối Tiên, Làng Chài và các điểm đến nổi tiếng tại Mũi Né – Phan Thiết. Website được thiết kế với giao diện sang trọng, tối ưu tốc độ và hỗ trợ 6 ngôn ngữ, phục vụ du khách trong nước và quốc tế.

---

## ✨ Tính Năng

### 🎨 Giao Diện (UI & Design)
- **Premium luxury design** – Gold & dark theme, Playfair Display + Poppins fonts
- **Fully responsive** – Mobile-first, hỗ trợ mọi kích thước màn hình
- **Hero video background** – Autoplay video với nút play/pause
- **Smooth scroll & reveal animations** – IntersectionObserver-based scroll reveal
- **Tours carousel/slider** – Swipe trên mobile, arrows + dots trên desktop
- **Photo gallery** – 9 ảnh grid layout, auto-scroll marquee trên mobile
- **Back-to-top button** – Hiện khi cuộn xuống > 400px

### 🚙 Tour Xe Jeep
- **7 màu xe Jeep**: Đỏ, Cam, Hồng, Trắng, Vàng, Xanh Dương, Xanh Lục
- **Xe bất kỳ (Any Jeep)**: Hệ thống tự chọn xe tốt nhất
- Mỗi thẻ tour: thời lượng (4h), sức chứa (4-6 người), khung giờ (bình minh/hoàng hôn), loại (riêng tư/ghép)

### 📋 Hệ Thống Đặt Tour
- **Loại tour**: Tour Riêng Tư (450,000₫/xe) | Tour Ghép (150,000₫/người)
- **Lịch chọn ngày tùy chỉnh** – Custom calendar picker, smart slot disabling
- **Chọn giờ**: Bình Minh (04:30) | Hoàng Hôn (13:30)
- **Số lượng xe/người**: Stepper +/- buttons
- **Addon – Gói Đồi Cát**: Leo đồi cát trắng bằng xe Jeep (900,000₫/xe)
- **Chọn khách sạn**: Searchable dropdown 100+ khách sạn/resort Mũi Né kèm địa chỉ tự động
- **Tùy chỉnh lộ trình**: Custom route 4 điểm dừng
- **Bảng giá chi tiết**: Loại tour, số lượng, addon, phụ thu lễ, tổng tiền
- **Xác nhận đặt xe**: Confirm modal với countdown 30s tự động gửi
- **Thank you modal**: Sau khi gửi thành công

### 🏖️ Phụ Thu Lễ (27/8 – 2/9)
- **+30% surcharge** tự động khi chọn ngày trong 27/8 – 2/9 (mỗi năm)
- Hiển thị dòng riêng với icon 🏖️ và gradient cam/đỏ
- Tính vào tổng tiền ở tất cả kênh: WhatsApp, Zalo, Telegram, Make.com

### 📱 Kênh Liên Lạc
- **WhatsApp** – Tin nhắn đặt tour đa ngôn ngữ tự động format
- **Zalo** – Deep link với state message
- **Telegram** – Thông báo tới Group chat qua Cloudflare Worker
- **Make.com Webhook** – JSON payload cho Google Calendar, CRM...
- **Gọi điện** – `tel:` link trực tiếp

### 🌐 Đa Ngôn Ngữ (6 languages)
- 🇻🇳 Tiếng Việt · 🇺🇸 English · 🇷🇺 Русский · 🇨🇳 中文 · 🇰🇷 한국어 · 🇩🇪 Deutsch
- Auto-detect ngôn ngữ thiết bị, lưu `localStorage`
- Phone code tự đổi theo ngôn ngữ (+84, +1, +7, +86, +82, +49)

### 🔍 SEO & Performance
- Structured Data (JSON-LD): WebSite, TouristAttraction, ItemList
- Open Graph metadata (Facebook/Zalo share)
- Sitemap XML với hreflang 6 ngôn ngữ
- Preload critical assets, deferred Font Awesome, lazy loading images
- Content-Security-Policy header

### ⭐ Reviews & Trust Badges
- 3 review cards đa ngôn ngữ
- Count-up animation: 10+ Năm, 1500+ Khách, 5/5 Rating, 100% An Toàn

---

## 📂 Cấu Trúc Dự Án

```
d:\mrben\
├── index.html              # Trang chính (SPA – Single Page Application)
├── css/
│   └── style.css           # Toàn bộ CSS (responsive, animations, booking modal)
├── js/
│   └── script.js           # Toàn bộ JavaScript (i18n, booking logic, calendar, messaging)
├── worker.js               # Cloudflare Worker – proxy gửi tin Telegram
├── robots.txt              # SEO – cho phép tất cả crawler
├── sitemap.xml             # SEO – sitemap với hreflang 6 ngôn ngữ
├── assets/
│   └── images/
│       ├── background/     # Hero background (background.jpg, background.webm)
│       ├── languages/      # Cờ quốc gia cho language switcher (7 flags .webp)
│       ├── library/        # Gallery ảnh (lib1–lib9.webp)
│       ├── logo/           # Logo Mr. Ben (logo-mr.ben.webp, logo_circle_gold.png)
│       └── produtcs/       # Ảnh xe Jeep 7 màu (xe-jeep-*.webp)
└── README.md               # Tài liệu dự án
```

---

## 🛠 Công Nghệ

| Danh mục | Công nghệ |
|---|---|
| **Markup** | HTML5, Semantic HTML |
| **Styling** | CSS3 (Custom Properties, Flexbox, Grid, Media Queries, Animations) |
| **JavaScript** | Vanilla JS (ES5/ES6, IIFE pattern, no framework) |
| **Fonts** | Google Fonts (Playfair Display, Poppins) |
| **Icons** | Font Awesome 6.5.0 (CDN) |
| **Backend Proxy** | Cloudflare Workers (serverless) |
| **Messaging APIs** | Telegram Bot API, Make.com Webhooks |
| **Maps** | Google Maps Embed |
| **Images** | WebP format, lazy loading |

---



## 🌐 Đa Ngôn Ngữ (i18n)

Hệ thống đa ngôn ngữ tự xây dựng (custom-built) dựa trên attribute `data-i18n` và object `TRANSLATIONS` trong `js/script.js`.

- **6 ngôn ngữ**: Tiếng Việt (`vi`), Tiếng Anh (`en`), Tiếng Nga (`ru`), Tiếng Trung (`zh`), Tiếng Hàn (`ko`), Tiếng Đức (`de`).
- **Tự động lưu**: Lưu trạng thái vào `localStorage('mrben-lang')`.
- **Tự động phát hiện**: Sử dụng `navigator.language` để chọn ngôn ngữ khởi tạo phù hợp.
- **Đồng bộ mã vùng ĐT**: Tự cập nhật phone country code tương ứng với ngôn ngữ (+84, +1, +7, +86, +82, +49).

---

## 🧾 Hệ Thống Đặt Tour & Tính Giá

```
1. Chọn loại tour (Riêng tư 450k/xe hoặc Ghép 150k/người)
2. Chọn ngày & giờ (Bình Minh 04:30 hoặc Hoàng Hôn 13:30)
3. Chọn số lượng xe/người & Gói đồi cát (+900k) nếu muốn
4. Tự động kiểm tra phụ thu lễ (+30% nếu rơi vào 27/8 – 2/9)
5. Cập nhật bảng giá realtime
6. Xác nhận đặt tour qua WhatsApp / Zalo / Telegram / Webhook
```

---

## 🏖️ Phụ Thu Lễ (Holiday Surcharge: 27/8 – 2/9)

Tính năng tự động tính phụ thu **+30%** khi khách hàng đặt lịch rơi vào dịp lễ Quốc Khánh Việt Nam (từ ngày **27 tháng 8** đến ngày **02 tháng 9** hàng năm).

### Cơ chế hoạt động:
1. **Kiểm tra ngày**: Hàm `isHolidaySurcharge()` phân tích giá trị `dtInput.value` (`YYYY-MM-DDTHH:MM`). Trả về `true` khi `(tháng == 8 && ngày >= 27) || (tháng == 9 && ngày <= 2)`.
2. **Tỷ lệ phụ thu**: `HOLIDAY_SURCHARGE_RATE = 0.3` (+30%).
3. **Công thức tính**:
   $$\text{Tiền phụ thu} = \text{round}(\text{Tổng tiền tour \& addon} \times 0.3)$$
   $$\text{Tổng thanh toán} = \text{Tổng tiền tour \& addon} + \text{Tiền phụ thu}$$
4. **Hiển thị giao diện**:
   - Dòng phụ thu riêng biệt trong bảng giá: icon 🏖️ (`fa-umbrella-beach`), nhãn đa ngôn ngữ, và số tiền `+X.000₫`.
   - Hiệu ứng gradient cam-đỏ nổi bật (`.bf-price-item--holiday`).
5. **Đồng bộ kênh gửi tin**:
   - **WhatsApp**: Kèm dòng thông báo phụ thu lễ theo ngôn ngữ khách chọn.
   - **Zalo**: Đính kèm nội dung phụ thu lễ và tổng tiền mới.
   - **Telegram**: Gửi thông báo có dòng `🎆 Phụ thu lễ: +30%` và tổng tiền chính xác.
   - **Make.com Webhook**: Payload JSON chứa field `holidaySurcharge: true/false`.

---


## 📡 Kênh Gửi Tin Nhắn

1. **WhatsApp (`wa.me`)**: Tạo URL tin nhắn được mã hóa `encodeURIComponent()` với đầy đủ chi tiết lộ trình, xe, khách sạn, giờ đón theo ngôn ngữ người dùng.
2. **Zalo (`zalo.me`)**: Deep link định dạng state JSON.
3. **Telegram Bot**: Gửi tin nhắn HTML đẹp mắt tới nhóm điều hành thông qua Cloudflare Worker (`worker.js`) để bảo mật Token.
4. **Make.com Webhook**: Tự động bắn dữ liệu JSON lên webhook để đồng bộ lịch Google Calendar, CRM và Google Sheets.

---

## 🔍 SEO & Structured Data

- **Schema.org (JSON-LD)**: Các schema `WebSite`, `TouristAttraction`, `ItemList` khai báo đầy đủ địa điểm, đánh giá sao và tọa độ địa lý.
- **Sitemap XML**: Khai báo alternate hreflang cho 6 ngôn ngữ.
- **Open Graph**: Đầy đủ thẻ metadata xem trước cho Facebook, Zalo, Telegram.

---

## 🚀 Triển Khai

- **Static Website**: Triển khai trực tiếp trên Cloudflare Pages, Vercel, Netlify hoặc bất kỳ hosting tĩnh nào.
- **Cloudflare Worker**: Tạo worker từ `worker.js`, cấu hình biến môi trường `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID`.

---

## 👨‍💻 Tác Giả

- **Developer**: [Võ Chí Cường](https://vochicuong.is-a.dev)
- **Dự án**: [Mr. Ben Jeep Tours](https://mrbenjeeptours.com)

---

## 📄 Bản Quyền

© 2026 Mr. Ben Jeep Tours. All rights reserved.

