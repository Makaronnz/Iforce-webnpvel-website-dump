import React from 'react';
import { getChapters } from '@/lib/chapters';
import ChaptersClient from '@/components/ChaptersClient';

export const metadata = {
  title: 'Chapters - Ironforce',
  description: 'Read all available chapters of Ironforce novel.',
};

export default function ChaptersPage() {
  
  const chapters = getChapters();
  
  return (
  <div className="container mx-auto py-24">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Chapters</h1>
        <p className="text-lg text-muted-foreground">
          ‼️I AM NOT UPDATING THE CHAPTERS HERE REGULARLY BECAUSE IT HAS BECOME VERY DIFFICULT AND TIME-CONSUMING. 
          YOU CAN READ THE UPDATED VERSION OF THE CHAPTERS ON ROYALROAD.{" "}
          <a
            href="https://www.royalroad.com/fiction/110554/ironforce"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Ironforce - Royal Road
          </a>
          ‼️
        </p>
      </div>
        
        {/* İstemci tarafı sıralama ve sekmeleri işleyen client component */}
        <ChaptersClient chapters={chapters} />
      </div>
    </div>
  );
}