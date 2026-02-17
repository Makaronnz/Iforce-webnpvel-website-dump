import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get form data
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Discord webhook URL - put your URL here
    const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL_HERE"; // Replace this
    
    // Create Discord message
    const discordMessage = {
      username: "Contact Form Bot",
      embeds: [{
        title: `New Message: ${subject}`,
        color: 5814783,
        fields: [
          {
            name: "Name",
            value: String(name),
            inline: true
          },
          {
            name: "Email",
            value: String(email),
            inline: true
          },
          {
            name: "Message",
            value: String(message)
          }
        ],
        footer: {
          text: "Sent from website contact form"
        },
        timestamp: new Date().toISOString()
      }]
    };
    
    // Send to Discord
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });
    
    // Redirect back to contact page with success parameter
    return NextResponse.redirect(new URL('/contact?success=true', request.url));
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.redirect(new URL('/contact?error=true', request.url));
  }
}