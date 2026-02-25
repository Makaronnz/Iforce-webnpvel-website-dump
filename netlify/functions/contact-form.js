// netlify/functions/contact-form.js
exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  
  try {
    // Parse the incoming request body
    const body = JSON.parse(event.body);
    const { name, email, subject, message } = body;
    
    // Validate inputs
    if (!name || !email || !subject || !message) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: "Missing required fields" }) 
      };
    }
    
    // Prepare message for Discord
    const discordMessage = {
      username: "Contact Form Bot",
      embeds: [{
        title: `New Contact Form Message: ${subject}`,
        color: 5814783, // A nice blue color in decimal
        fields: [
          {
            name: "Name",
            value: name,
            inline: true
          },
          {
            name: "Email",
            value: email,
            inline: true
          },
          {
            name: "Message",
            value: message
          }
        ],
        footer: {
          text: "Sent from Ironforce website contact form"
        },
        timestamp: new Date().toISOString()
      }]
    };
    
    
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL || "test";
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(discordMessage)
    });
    
    if (!response.ok) {
      throw new Error(`Discord webhook error: ${response.statusText}`);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error("Error sending to Discord:", error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message" })
    };
  }
};
