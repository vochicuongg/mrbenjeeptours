/**
 * ════════════════════════════════════════════════════════════════════════════
 * CLOUDFLARE WORKER - MR. BEN JEEP TOURS SECURE API GATEWAY
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * CHỨC NĂNG CHÍNH:
 * 1. Reverse Proxy & Secret Gateway: Giấu Make.com Webhook URL & Telegram Token.
 * 2. Bảo mật CORS nghiêm ngặt: Whitelist mrbenjeeptours.com và localhost.
 * 3. Rate Limiting theo IP: Tối đa 6 yêu cầu / phút / IP chống Flood & DoS.
 * 4. Bẫy Bot Honeypot & Lọc Spam Server-side: Chặn số ảo và bot tự động.
 * 5. Bất đồng bộ song song: Telegram và Make.com không nghẽn lẫn nhau.
 * 
 * CẤU HÌNH BIẾN MÔI TRƯỜNG CLOUDFLARE (Settings -> Variables):
 * - TELEGRAM_BOT_TOKEN : 8698354601:AAGvQblFamiQ_qKOxzbP_bQxYyQx24f49Lw
 * - TELEGRAM_CHAT_ID   : -1003852617510
 * - MAKE_WEBHOOK_URL   : https://hook.eu1.make.com/hz6g13pxrevta33z5piw4x5i7tko0vcd
 * ════════════════════════════════════════════════════════════════════════════
 */

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQ    = 6;
const ipRateMap = new Map();
const MAX_PAYLOAD_BYTES = 32 * 1024;

const SPAM_URL_PATTERN = /(https?:\/\/|www\.|\.com|\.net|\.org|\.xyz|\.vip|\.top|\.ru|\.cn|telegram\.me|t\.me)/i;
const SPAM_KEYWORD_PATTERN = /(casino|viagra|sex|poker|bet88|crypto|bitcoin|usdt|seo\s+service)/i;
const JUNK_PHONE_SEQUENCES = ['123456789', '987654321', '0123456789', '0987654321', '12345678', '87654321'];

const FALLBACK_TG_TOKEN  = '8698354601:AAGvQblFamiQ_qKOxzbP_bQxYyQx24f49Lw';
const FALLBACK_TG_CHATID = '-1003852617510';
const FALLBACK_MAKE_URL  = 'https://hook.eu1.make.com/hz6g13pxrevta33z5piw4x5i7tko0vcd';

function isOriginAllowed(origin) {
  if (!origin) return false;
  if (origin === 'https://mrbenjeeptours.com' || origin === 'https://www.mrbenjeeptours.com' || origin === 'https://mr-ben-jeep-tours.pages.dev') return true;
  if (/^https:\/\/[a-z0-9-]+\.mr-ben-jeep-tours\.pages\.dev$/.test(origin)) return true;
  if (/^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) return true;
  return false;
}

function buildCorsHeaders(origin) {
  var allowOrigin = isOriginAllowed(origin) ? origin : 'https://www.mrbenjeeptours.com';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function isRateLimited(ip) {
  if (!ip) return false;
  var now = Date.now();
  if (ipRateMap.size > 2000) {
    for (var entry of ipRateMap.entries()) {
      if (now - entry[1].startTime > RATE_LIMIT_WINDOW_MS) ipRateMap.delete(entry[0]);
    }
  }
  var record = ipRateMap.get(ip);
  if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    ipRateMap.set(ip, { count: 1, startTime: now });
    return false;
  }
  if (record.count >= RATE_LIMIT_MAX_REQ) return true;
  record.count++;
  return false;
}

function isSpamPayload(data) {
  if (!data) return false;
  var name = String(data.customerName || data.name || '');
  var notes = String(data.notes || '');
  var phone = String(data.phone || data.fullPhone || data.cleanPhone || '');
  if (name && (SPAM_URL_PATTERN.test(name) || SPAM_KEYWORD_PATTERN.test(name))) return true;
  if (notes && (SPAM_URL_PATTERN.test(notes) || SPAM_KEYWORD_PATTERN.test(notes))) return true;
  var cleanP = phone.replace(/\D/g, '');
  if (cleanP.length >= 8 && /^(\d)\1+$/.test(cleanP)) return true;
  for (var i = 0; i < JUNK_PHONE_SEQUENCES.length; i++) {
    if (cleanP === JUNK_PHONE_SEQUENCES[i]) return true;
  }
  return false;
}

async function sendToTelegram(token, chatId, text, parseMode) {
  if (!token || !chatId || !text) return { ok: false, error: 'Missing token/chatId/text' };
  var tgUrl = 'https://api.telegram.org/bot' + token + '/sendMessage';
  var controller = new AbortController();
  var timeoutId = setTimeout(function () { controller.abort(); }, 8000);
  try {
    var response = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: parseMode || 'HTML' }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    var data = await response.json();
    return { ok: data.ok, data: data };
  } catch (err) {
    clearTimeout(timeoutId);
    return { ok: false, error: err.message };
  }
}

async function sendToMake(webhookUrl, flatPayload) {
  if (!webhookUrl || !flatPayload) return { ok: false, error: 'Missing webhookUrl/payload' };
  var controller = new AbortController();
  var timeoutId = setTimeout(function () { controller.abort(); }, 9000);
  try {
    var response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'User-Agent': 'MrBen-Gateway/1.0'
      },
      body: JSON.stringify(flatPayload), // BẮT BUỘC gửi object phẳng để giữ nguyên mapping Make.com
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return { ok: response.ok, status: response.status };
  } catch (err) {
    clearTimeout(timeoutId);
    return { ok: false, error: err.message };
  }
}

export default {
  async fetch(request, env, ctx) {
    var origin = request.headers.get('Origin') || '';
    var clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
    var corsHeaders = buildCorsHeaders(origin);

    // 1. CORS Preflight
    if (request.method === 'OPTIONS') {
      if (origin && !isOriginAllowed(origin)) {
        return new Response('Forbidden: Origin not allowed', { status: 403, headers: corsHeaders });
      }
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // 2. Chặn method khác ngoài POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
      });
    }

    // 3. Whitelist Origin
    if (origin && !isOriginAllowed(origin)) {
      console.warn('[Worker] Chặn origin lạ: ' + origin + ' | IP: ' + clientIp);
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
      });
    }

    // 4. Rate Limiting theo IP (6 req / phút)
    if (isRateLimited(clientIp)) {
      console.warn('[Worker] Vượt giới hạn Rate Limit: ' + clientIp);
      return new Response(JSON.stringify({
        error: 'Too Many Requests',
        message: 'Thao tác quá nhanh. Vui lòng đợi 1 phút.'
      }), {
        status: 429,
        headers: Object.assign({ 'Content-Type': 'application/json', 'Retry-After': '60' }, corsHeaders)
      });
    }

    // 5. Kiểm tra Payload Size
    var contentLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLength > MAX_PAYLOAD_BYTES) {
      return new Response(JSON.stringify({ error: 'Payload Too Large' }), {
        status: 413,
        headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
      });
    }

    try {
      var body = await request.json();
      if (!body || typeof body !== 'object') {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
          status: 400,
          headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
        });
      }

      // 6. Bẫy Bot Honeypot ẩn (Trả về 200 giả nhưng âm thầm hủy đơn)
      var hpVal = body.hpField || body.mrb_user_url || body.mrb_anti_bot_check || body.honeypot ||
                  (body.bookingData && (body.bookingData.hpField || body.bookingData.mrb_user_url || body.bookingData.mrb_anti_bot_check));
      if (hpVal && String(hpVal).trim().length > 0) {
        console.warn('[Worker] 🚨 Bot dính bẫy Honeypot từ IP: ' + clientIp);
        return new Response(JSON.stringify({ success: true, fake: true }), {
          status: 200,
          headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
        });
      }

      // 7. Lọc Spam Lead (Silent 200)
      var targetData = body.bookingData || body;
      if (isSpamPayload(targetData)) {
        console.warn('[Worker] 🚨 Spam detected from: ' + clientIp);
        return new Response(JSON.stringify({ success: true, filtered: true }), {
          status: 200,
          headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
        });
      }

      // 8. Đọc biến môi trường
      var tgToken = (env && env.TELEGRAM_BOT_TOKEN) || FALLBACK_TG_TOKEN;
      var tgChatId = (env && env.TELEGRAM_CHAT_ID) || FALLBACK_TG_CHATID;
      var makeUrl = (env && env.MAKE_WEBHOOK_URL) || FALLBACK_MAKE_URL;

      var action = body.action || '';
      var message = body.message || '';
      var parseMode = body.parse_mode || 'HTML';

      // 9. BẮT BUỘC unwrap data.bookingData (Gửi object phẳng để Make.com đọc biến root: 7.vehicleType, 7.tourType)
      var flatBookingData = null;
      if (body.bookingData && typeof body.bookingData === 'object') {
        flatBookingData = body.bookingData;
      } else if (body.serviceType || body.customerName || body.vehicleType) {
        flatBookingData = Object.assign({}, body);
        delete flatBookingData.action;
        delete flatBookingData.hpField;
        delete flatBookingData.message;
        delete flatBookingData.parse_mode;
      }

      // Tối ưu hóa phản hồi nhanh cho action === 'make' khi có ctx.waitUntil
      if (action === 'make' && flatBookingData) {
        var makePromise = fetch(makeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'User-Agent': 'MrBen-Gateway/1.0'
          },
          body: JSON.stringify(flatBookingData) // Object phẳng nguyên bản cho Make.com
        }).catch(function (err) {
          console.error('[Worker -> Make] Error:', err);
        });

        if (ctx && typeof ctx.waitUntil === 'function') {
          ctx.waitUntil(makePromise);
          return new Response(JSON.stringify({ success: true, make: true }), {
            status: 200,
            headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
          });
        } else {
          var makeRes = await makePromise;
          return new Response(JSON.stringify({ success: makeRes ? makeRes.ok : false, make: true }), {
            status: 200,
            headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
          });
        }
      }

      // 10. Điều phối song song cho action === 'booking' hoặc mặc định
      var tasks = [];

      // Task 1: Telegram
      if (message) {
        tasks.push(sendToTelegram(tgToken, tgChatId, message, parseMode));
      } else {
        tasks.push(Promise.resolve({ ok: true, skipped: true }));
      }

      // Task 2: Make.com Webhook (Dùng flatBookingData phẳng)
      if (flatBookingData && (action === 'booking' || !action)) {
        tasks.push(sendToMake(makeUrl, flatBookingData));
      } else {
        tasks.push(Promise.resolve({ ok: true, skipped: true }));
      }

      var results = await Promise.allSettled(tasks);
      var tgRes = results[0] && results[0].status === 'fulfilled' ? results[0].value : { ok: false };
      var makeRes = results[1] && results[1].status === 'fulfilled' ? results[1].value : { ok: false };

      var isOverallOk = (message ? tgRes.ok : true) && (flatBookingData ? makeRes.ok : true);

      return new Response(JSON.stringify({
        success: isOverallOk,
        telegram: tgRes.ok,
        make: makeRes.ok
      }), {
        status: isOverallOk ? 200 : 207,
        headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
      });

    } catch (err) {
      console.error('[Worker Error]:', err);
      return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
        status: 500,
        headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders)
      });
    }
  }
};
