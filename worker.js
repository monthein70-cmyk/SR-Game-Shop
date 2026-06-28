// Cloudflare Worker: Telegram Bot Send Message Handler

export default {
  async fetch(request, env, ctx) {
    // CORS Header များ သတ်မှတ်ခြင်း (Frontend မှ လှမ်းခေါ်နိုင်ရန်)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Preflight request (OPTIONS) ကို ကိုင်တွယ်ခြင်း
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    try {
      // Frontend (App) မှ ပေးပို့လိုက်သော Data များကို လက်ခံခြင်း
      const data = await request.json();
      
      // Bot Token နှင့် Chat ID (Cloudflare Environment Variables သို့မဟုတ် အောက်တွင် တိုက်ရိုက်ထည့်ပါ)
      const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN || "YOUR_BOT_TOKEN_HERE";
      const TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID || "YOUR_CHAT_ID_HERE";

      let messageText = "";

      // Message Type အလိုက် စာသားများ ပြင်ဆင်ခြင်း
      if (data.type === "ORDER") {
        messageText = "🎮 *ORDER NEW - SR GAME SHOP*\n" +
                      "-------------------------------------\n" +
                      "👤 *ဝယ်ယူသူအမည်:* " + (data.userName || "-") + "\n" +
                      "📞 *ဖုန်းနံပါတ်:* " + (data.userPhone || "-") + "\n" +
                      "🆔 *User ID:* " + (data.userId || "-") + "\n" +
                      "📝 *ဂိမ်းအမျိုးအစား:* " + (data.gameName || "-") + "\n" +
                      "💎 *ပစ္စည်းပမာဏ:* " + (data.itemAmount || "-") + "\n" +
                      "💰 *ကျသင့်ငွေ:* " + (data.cost || "0") + " Ks\n" +
                      "🔑 *Player ID/Account:* " + (data.playerId || "-") + "\n" +
                      "📅 *အချိန်:* " + (data.dateTime || "-") + "\n" +
                      "-------------------------------------";
      } 
      else if (data.type === "DEPOSIT") {
        messageText = "💰 *DEPOSIT REQUEST (ငွေဖြည့်ရန်)*\n" +
                      "-------------------------------------\n" +
                      "👤 *အသုံးပြုသူ:* " + (data.userName || "-") + "\n" +
                      "📞 *ဖုန်းနံပါတ်:* " + (data.userPhone || "-") + "\n" +
                      "🆔 *User ID:* " + (data.userId || "-") + "\n" +
                      "🏦 *ငွေပေးချေမှု:* " + (data.paymentMethod || "-") + "\n" +
                      "💵 *ဖြည့်မည့်ပမာဏ:* " + (data.amount || "0") + " Ks\n" +
                      "📱 *လွှဲရက်စွဲ/အချိန်:* " + (data.transactionTime || "-") + "\n" +
                      "🔢 *နောက်ဆုံးဂဏန်း ၆ လုံး:* " + (data.lastSixDigits || "-") + "\n" +
                      "📅 *တောင်းဆိုချိန်:* " + (data.dateTime || "-") + "\n" +
                      "-------------------------------------";
      }
      else if (data.type === "PASSWORD_RESET") {
        messageText = "🔒 *PASSWORD RESET REQUEST*\n" +
                      "-------------------------------------\n" +
                      "👤 *အကောင့်အမည်:* " + (data.userName || "-") + "\n" +
                      "📞 *ဖုန်းနံပါတ်:* " + (data.userPhone || "-") + "\n" +
                      "🆔 *User ID:* " + (data.userId || "-") + "\n" +
                      "🔑 *စကားဝှက်အသစ်:* " + (data.newPassword || "-") + "\n" +
                      "📅 *တောင်းဆိုချိန်:* " + (data.dateTime || "-") + "\n" +
                      "-------------------------------------";
      }
      else {
        // အခြားအထွေထွေ Message များအတွက်
        messageText = data.message || "No message content provided.";
      }

      // Telegram Bot API သို့ လှမ်းပို့ရန် URL
      const telegramUrl = https//api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage;
      // Telegram သို့ Request ပို့ခြင်း
      const telegramResponse = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: "Markdown", // စာလုံးအထူ အစောင်း ပြုလုပ်နိုင်ရန်
        }),
      });

      const result = await telegramResponse.json();

      if (result.ok) {
        return new Response(JSON.stringify({ success: true, message: "Sent to Telegram successfully!" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      } else {
        return new Response(JSON.stringify({ success: false, error: result.description }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  },
};