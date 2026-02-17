'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useState } from 'react';

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1359471490365653154/uwYhcwS9PxRhW_fN-bV5KebeuZC2qGmQa-9JqbQT46JTwhCuq9mU-Mr_ahZKazh5F-6B";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean, message: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitting(true); 
    
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    
    try {
      const discordMessage = {
        username: "Contact Form Bot",
        embeds: [{
          title: `New Message: ${subject}`,
          color: 5814783, 
          fields: [
            { name: "Name", value: name, inline: true },
            { name: "Email", value: email, inline: true },
            { name: "Message", value: message }
          ],
          footer: { text: "Sent from website contact form" },
          timestamp: new Date().toISOString()
        }]
      };
      
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordMessage)
      });
      
      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Message sent successfully!' });
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };
  
  return (
    <div className="container mx-auto py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
          <p className="text-lg text-muted-foreground">
            Have a feedback? Or just wanted to say hello? Join our Discord server!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <i className="fas fa-envelope-open-text text-primary"></i>
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">For general inquiries:</p>
              <div className="pl-0">
                <a href="mailto:plmakarongames@gmail.com" className="text-primary hover:underline -ml-5">
                  plmakarongames@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <i className="fab fa-discord text-primary"></i>
                Discord
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Join our community:</p>
              <a
                href="https://discord.gg/8dZASy3tHv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Ironforce Discord Server
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <i className="fas fa-coffee text-primary"></i>
                Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Support the novel:</p>
              <a
                href="https://ko-fi.com/makaronnz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Ko-fi Page
              </a>

              {/* Patreon: Ko-fi'nin hemen altında, kutudan taşmadan */}
              <a
                href="https://www.patreon.com/Makaronnz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline block mt-1 break-words"
              >
                Patreon Page
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Follow Me</h2>
          <div className="flex justify-center gap-6 text-2xl">
            <a href="https://x.com/makarongames_" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/makarongames?igsh=aXltdWw1cG9qd2Yz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://discord.gg/8dZASy3tHv" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <i className="fab fa-discord"></i>
            </a>
          </div>
          <p className="mt-4 text-muted-foreground">
            Stay updated with the latest chapters and announcements
          </p>
        </div>
      </div>
    </div>
  );
}
