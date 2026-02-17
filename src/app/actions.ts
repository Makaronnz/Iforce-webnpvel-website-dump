'use server';

export async function sendToDiscord(formData: FormData) {
  try {
    // Get form values
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return { success: false, message: 'All fields are required' };
    }
    
    // Discord webhook URL
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL || "https://discord.com/api/webhooks/1352437115970916406/z7qQibBjHgHO-8HAEfZxhKQlDWASHAvqwcLB1erRDZ7JDzO41r6H2y1NDNW3NIbO2EcV";
    
    // Prepare Discord message
    const discordMessage = {
      username: "Contact Form Bot",
      embeds: [{
        title: `New Contact Form Message: ${subject}`,
        color: 5814783, // Blue color
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
          text: "Sent from website contact form"
        },
        timestamp: new Date().toISOString()
      }]
    };
    
    // Send to Discord
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });
    
    if (!response.ok) {
      throw new Error(`Discord webhook error: ${response.statusText}`);
    }
    
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error sending to Discord:', error);
    return { success: false, message: 'Failed to send message' };
  }
}