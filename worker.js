/**
 * Cloudflare Worker for Mr. Ben Jeep Tours
 * Forwards booking requests securely to a Telegram Group.
 *
 * HOW TO DEPLOY:
 * 1. Go to dash.cloudflare.com -> Workers & Pages -> Create application -> Create Worker
 * 2. Name it "mrben-telegram-bot" and click Deploy
 * 3. Click "Edit code" and paste this entire file's content into the editor.
 * 4. Click "Save and deploy"
 * 5. In your Worker dashboard, go to Settings -> Variables
 * 6. Add two environment variables (Encrypted):
 *    - TELEGRAM_BOT_TOKEN : 8698354601:AAGvQblFamiQ_qKOxzbP_bQxYyQx24f49Lw
 *    - TELEGRAM_CHAT_ID   : (Your Group Chat ID, e.g., -1001234567890)
 * 7. Copy the Worker URL (e.g., https://mrben-telegram-bot.yourusername.workers.dev)
 * 8. Paste that URL into your js/script.js file where indicated.
 */

export default {
    async fetch(request, env) {
        // 1. Handle CORS preflight requests
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }

        // 2. Only allow POST requests
        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405 });
        }

        try {
            // 3. Parse incoming JSON
            const body = await request.json();
            const message = body.message;

            if (!message) {
                return new Response("Missing message", { status: 400 });
            }

            // 4. Send to Telegram API
            const token = env.TELEGRAM_BOT_TOKEN;
            const chatId = env.TELEGRAM_CHAT_ID;

            if (!token || !chatId) {
                return new Response("Server configuration error", { status: 500 });
            }

            const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
            const telegramResponse = await fetch(telegramUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            });

            const telegramResult = await telegramResponse.json();

            // 5. Return success to the website
            return new Response(JSON.stringify({ success: telegramResult.ok }), {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }
    },
};
