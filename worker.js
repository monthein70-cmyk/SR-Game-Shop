export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const data = await request.json();

    const text = 
📥 New Order

👤 Name: ${data.name}
📱 Phone: ${data.phone}
🎮 Game: ${data.game}
💎 Package: ${data.package}
💰 Price: ${data.price}
;

    const url = https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage;

    const tg = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: env.CHAT_ID,
        text: text
      })
    });

    if (!tg.ok) {
      return new Response("Telegram Error", { status: 500 });
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}