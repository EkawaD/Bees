import * as https from "https"


export function toDiscord(result) {
    const useDiscord = !!process.env.WEBHOOK_ID;
    const options = {
      hostname: "discord.com",
      path: `/api/webhooks/${process.env.WEBHOOK_ID}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (useDiscord) {
      const req = https.request(options, (res) => {
        console.log("Send to Discord:", res.statusCode);
      });
  
      req.write(JSON.stringify({content: result}));
      req.end();
    }
  
  }