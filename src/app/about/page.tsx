import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export const metadata = {
  title: 'About - Ironforce',
  description: 'Learn more about me, if you want tho.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Ironforce</h1>
          <p className="text-lg text-muted-foreground">
            Learn a few things about me, if you want tho.
          </p>
        </div>

        <Card className="mb-16">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Hi, I write fantasy. Yep thats all.
            </p>
            <p>
This is my first long-form web novel, I hope you enjoy. New chapters every few days!
            </p>
            <div className="flex items-center mt-6">
              <a
                href="https://www.patreon.com/Makaronnz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#FF5E5B] px-6 py-3 text-white hover:bg-[#FF5E5B]/90 transition-colors"
              >
                <i className="fas fa-mug-hot mr-2"></i>
                Support on Patreon
              </a>
              <span className="text-muted-foreground ml-4">Force me to create more content!</span>
            </div>
          </CardContent>
        </Card>

<Card className="mb-16">
          <CardHeader>
            <CardTitle>Copyright Notice</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              "All rights reserved for the web novel 'Ironforce' by Makaron. Unauthorized reproduction, distribution, or any other use of any part of this work is prohibited."
            </p>
            <p>
	      "The characters, events, and world in this work are fictional. Any resemblance to actual persons, events, or places is purely coincidental. All rights reserved." 
	    </p>
            <p>
	      "Materials on this website are the property of Makaron and are protected by national and international copyright laws."
	    </p>
            <p>
	      "No part of this work or any of its contents may be reproduced, copied, modified or adapted, without the prior written consent of the author, unless otherwise indicated for stand-alone materials."
	    </p>
            <p>
	    </p>


            <p>
              
            </p>
            
          </CardContent>
        </Card>




        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Update Schedule</h2>
          <p className="mb-4">New chapters are released weekly according to the following schedule:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-center gap-2">
              <i className="fas fa-calendar-check text-primary"></i>
              <span>2 or 3 chapters a week</span>
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-clock text-primary"></i>
              <span>Updates at 21:00 UTC</span>
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-book text-primary"></i>
              <span>Average chapter length: 1,500 words</span>
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-star text-primary"></i>
              <span>Possible special releases on holidays</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
