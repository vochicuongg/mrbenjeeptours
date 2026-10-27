/* ═══════════════════════════════════════════════════
   Hotel Autocomplete IIFE
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  var hotelData = [
    { name: '1001 Nights Hotel', address: '45 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: '3B MAISON Homestay & Villa', address: '124 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Adachi Homestay Phan Thiết', address: '86/3 Nguyễn Công Hoan, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Allezboo Beach Resort', address: '8 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'A L Y S S A Seaside Muine', address: '316 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ananda Resort', address: '148 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Anantara Mui Ne Resort', address: '12A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Anh Hien Hotel', address: '81A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Bay View Resort & Villas', address: '152 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bí Homestay', address: '97 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bình Yên Homestay', address: '165 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Blue Bay Mui Ne Resort & Spa', address: 'Khu phố Suối Nước, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Blue Ocean Resort', address: '54 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Blue Shell Resort', address: 'Khu phố 5, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bonnie Homestay - Mũi Né', address: '201/5 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bon Bien Resort Mui Ne', address: '30 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Bọt Biển Homestay Mũi Né', address: 'Đường Nguyễn Hữu Thọ, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Cát Sen Auberge Bungalows & Rooms', address: '195 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'escVACA - Your Stay in Mui Ne', address: '69/1 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Eva Hut Homestay Mũi Né', address: '202 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Evergreen Resort', address: '105B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Evergreen Tree Homestay Mui Ne', address: '46 Xuân Thủy, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Fairy Hills Hotel', address: '129/16 Chế Lan Viên, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Full Moon Beach Resort', address: '84 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Full Moon Village', address: '86/153 Nguyễn Cơ Thạch, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Four Oceans Resort', address: 'Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Gem\'s House Homestay&Villa', address: '201/4 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Gia An Guesthouse', address: '100 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Gia An Hung Guest House', address: '335A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Gió - Homestay and Coffee', address: 'Khu phố 15, Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Góc Biển Homestay Mũi Né', address: '153 Chế Lan Viên, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Goldsand Hill Villa', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Grace Boutique Resort', address: '144A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Green Hill Resort & Spa', address: '121 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'HOTEL 86 - MUINE', address: '35C Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Hung Phuc Mui Ne Hotel', address: '55 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'I Hostel Muine', address: 'Hẻm 188 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'iHome Backpacker Resort', address: 'Quarter 2 City, Hòa Bình, Street Ward, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Inner Peace Phan Thiet', address: '255 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'IRINI Boutique Homestay Mui Ne', address: '148 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Jaguar House', address: '123 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Joe\'s Cafe & Garden Resort', address: '86 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Khách sạn Bảo Tiên', address: '56 Huỳnh Tấn Phát, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Khách sạn MiNhon', address: '210/5 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Khách sạn Pacific Mũi Né', address: '138A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Khách sạn Phạm Gia - Mũi Né', address: '371B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Kim Village Mũi Né Resort', address: 'Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Kiwi\'s Homestay & Cafe', address: '114 Nguyễn Hữu Thọ, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Lạc House Mui Ne', address: '149A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'La Marina Boutique Hotel & Spa', address: '246/2B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'La Mer Bali Mũi Né', address: '124 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'La Mer Hotel Mũi Né', address: '168 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Lang Chai Guesthouse', address: '230/2 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Lavender Mui Ne Hotel', address: '17B Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'LCV Mũi Né Resort', address: '92 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Le Huynh Mui Ne Hotel', address: '135 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Le\' VIVA Resort Mũi Né', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Little Mui Ne Cottages Resort', address: '10B Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Little Paris Resort', address: 'Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'LoiLoi\'s Home', address: 'Hẻm 177 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Long Beach Resort', address: '130 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'LOTUS GARDEN RESORT', address: '200 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Lotus Mui Ne Resort', address: 'Khu 5, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Lotus Village Resort Mui Ne', address: '100-139D Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Madam Cúc Saigon Emerald Resort', address: '15 Nguyễn Cơ Thạch, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Mui Ne Hills Backpackers', address: '69C Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Hills Bliss Hotel', address: '69B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Hills Budget Hotel', address: '69 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Mui Ne Hills Villa Hotel', address: '69A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Nắng Homestay', address: '195/14 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Na\'s homestay', address: 'Hẻm 177 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nam Chau Boutique Resort', address: 'Khu phố 5, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nam Hai Hotel', address: '21 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Năm Thọ Guesthouse', address: '1 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Né Chill House', address: '63 Tô Ngọc Lâm, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ngoc Bich Bungalow', address: '52 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ngoc Sang Guesthouse', address: '12A Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà của Síu Síu', address: '8 Nguyễn Tấn Định, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Anh Linh', address: '103 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ BiBo', address: '119 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Biển Nguồn', address: '97 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Nhà Nghỉ Biti', address: '42 Xuân Thủy, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Oceanique Villas', address: '74 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Phuong Nam Guest House', address: '45/01 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Phuong Tay Guest House', address: '8 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Phương Nhung Hotel & Coffee', address: '283C Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Poshanu Resort Mui Ne', address: 'Khu phố 5, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Qli Hotel', address: '287A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'QT Villa', address: 'Chế Lan Viên, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Quoc Dinh Guesthouse', address: '123 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Radisson Resort Mui Ne', address: '16 Nguyễn Cơ Thạch, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Rainbow Beach Mũi Né - Homestay & Coffee', address: '98 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Rang Garden Beach Resort', address: '128A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ravenala MuiNe Resort', address: '146 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Red Sands Mui Ne', address: '34 Bùi Xuân Phái, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Resort Đỗ Khoa', address: '126B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Ripple house', address: '67 Hòa Bình, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Riva Resort Mui Ne', address: '94 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Romana Resort & Spa', address: 'Km 8, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Sabina Boutique Hotel & Villa Mũi Né', address: '165 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sài Gòn - Mũi Né Resort', address: '56-97 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sailing Club Mui Ne', address: '24 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sand Beach Resort', address: '128 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sand Garden Resort', address: '7-9 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sandunes Beach Resort & Spa', address: 'Khu phố 5, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'San Vuon Guesthouse', address: '02C Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sea Links Beach Hotel', address: 'Km 9, Nguyễn Thông, Phường Phú Hài, Tỉnh Lâm Đồng' },
    { name: 'Sea Lion Beach Resort', address: '12 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sea Senses HomeStay', address: 'Chưa xác định được số nhà chính xác' },
    { name: 'Seahorse Resort & Spa', address: 'Xuân Thủy, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Seaside Mui Ne Hotel', address: '124B Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Sea Winds Resort', address: '139 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Second House', address: '157/10 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Serenity by the Sea', address: '88 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Shades Resort', address: '98A Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Song Hiền Hotel', address: '40-43 Nguyễn Cơ Thạch, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Song Huong Hotel Mui Ne', address: '241 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'SUNSHINE - Beach Resort', address: '82 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'SNS Muine Homestay', address: 'Hẻm 7 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Suối Nước Resort', address: '58 Nguyễn Cơ Thạch, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Surf4You Residence', address: '90 Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Suri Mũi Né Homestay', address: '251/2 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Swiss Village Resort & Spa', address: '44 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Terracotta Resort & Spa', address: '28 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'T-House Homestay', address: '43 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'Thuy - Gunter Garden Bungalow', address: '7A Huỳnh Thúc Kháng, Phường Mũi Né, Tỉnh Lâm Đồng' },
    { name: 'Thuy Tien Mui Ne Homestay', address: 'Hẻm 49 Nguyễn Đình Chiểu, Phường Mũi Né, Tỉnh Lâm Đồng' },
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
    { name: 'White Sand Resort Mui Ne', address: 'Km 8, Nguyễn Thông, Phường Phú Hài, Tỉnh Lâm Đồng' },
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
  var isRebuildingSearch = false;
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
        isRebuildingSearch = true;
        buildDropdown(this.value);
        var s = document.getElementById('bfHotelSearch');
        if (s) {
          s.focus();
          if (typeof s.setSelectionRange === 'function') {
            s.setSelectionRange(s.value.length, s.value.length);
          }
        }
        setTimeout(function () {
          isRebuildingSearch = false;
        }, 60);
      });
      searchEl.addEventListener('mousedown', function (e) { e.stopPropagation(); });
      searchEl.addEventListener('click', function (e) { e.stopPropagation(); });
      searchEl.addEventListener('blur', function () {
        // Chỉ khi người dùng thoát ra (blur) khỏi ô tìm kiếm mới tự tinh chỉnh lại vị trí
        setTimeout(function () {
          if (isRebuildingSearch) return;
          var s = document.getElementById('bfHotelSearch');
          if (wrap && wrap.classList.contains('open') && document.activeElement !== s) {
            centerHotelInView();
          }
        }, 150);
      });
      searchEl.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeDropdown();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.blur();
        }
      });
    }
  }

  /* ── Center Hotel Dropdown in Viewport ── */
  var centerHotelTimer = null;
  function centerHotelInView() {
    clearTimeout(centerHotelTimer);
    var body = document.querySelector('.booking-body');
    if (!body) return;
    if (!wrap || !wrap.classList.contains('open')) return;

    // Khi người dùng đang tương tác/focus trong ô tìm kiếm, giữ nguyên vị trí (không tự dịch chuyển)
    var activeSearch = document.getElementById('bfHotelSearch');
    if (activeSearch && document.activeElement === activeSearch) return;

    centerHotelTimer = setTimeout(function () {
      if (!wrap || !wrap.classList.contains('open')) return;
      var curSearch = document.getElementById('bfHotelSearch');
      if (curSearch && document.activeElement === curSearch) return;

      var bodyRect = body.getBoundingClientRect();
      var wrapRect = wrap.getBoundingClientRect();
      var dropRect = dropdown ? dropdown.getBoundingClientRect() : null;
      if (!wrapRect.height || !bodyRect.height) return;

      // Combined bounding box of wrap + dropdown list
      var targetTop = wrapRect.top;
      var targetBottom = (dropRect && dropRect.height > 10) ? dropRect.bottom : wrapRect.bottom;
      var targetHeight = targetBottom - targetTop;

      // Center target vertically within the visible booking-body area
      var bodyCenter = bodyRect.top + bodyRect.height / 2;
      var targetCenter = targetTop + targetHeight / 2;
      var diff = targetCenter - bodyCenter;

      // Ensure top of wrap doesn't scroll beneath sticky booking header
      var minAllowedTop = bodyRect.top + 8;
      if (targetTop - diff < minAllowedTop) {
        diff = targetTop - minAllowedTop;
      }

      // If target fits within visible body, ensure bottom isn't clipped by bottom edge
      var maxAllowedBottom = bodyRect.bottom - 12;
      if (targetHeight <= (bodyRect.height - 20) && (targetBottom - diff > maxAllowedBottom)) {
        diff = targetBottom - maxAllowedBottom;
      }

      // Re-verify top doesn't hide under header
      if (targetTop - diff < minAllowedTop) {
        diff = targetTop - minAllowedTop;
      }

      if (Math.abs(diff) > 2) {
        body.scrollBy({
          top: diff,
          behavior: 'smooth'
        });
      }
    }, 80);
  }

  function openDropdown() {
    wrap.classList.add('open');
    var body = document.querySelector('.booking-body');
    if (body) body.classList.add('hotel-open');
    buildDropdown('');
    centerHotelInView();
  }

  function closeDropdown() {
    clearTimeout(centerHotelTimer);
    wrap.classList.remove('open');
    var body = document.querySelector('.booking-body');
    if (body) body.classList.remove('hotel-open');
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

  window.addEventListener('resize', function () {
    if (wrap && wrap.classList.contains('open')) {
      var s = document.getElementById('bfHotelSearch');
      if (s && document.activeElement === s) return;
      centerHotelInView();
    }
  });

  document.addEventListener('click', function () { closeDropdown(); });
  dropdown.addEventListener('click', function (e) {
    e.stopPropagation();
  });

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
