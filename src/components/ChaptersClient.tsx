'use client';

import React, { useState } from 'react';
import ChapterCard from '@/components/ChapterCard';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import type { Chapter } from '@/lib/chapters';

type ChaptersClientProps = {
  chapters: Chapter[];
};

export default function ChaptersClient({ chapters }: ChaptersClientProps) {
  // State to control sorting - true = newest chapters first, false = oldest chapters first
  const [showNewestFirst, setShowNewestFirst] = useState(false);
  
  // Sort chapters based on their chapter number
  const sortedChapters = [...chapters].sort((a, b) => {
    const chapterNumA = a.number || 0;
    const chapterNumB = b.number || 0;
    
    if (showNewestFirst) {
      // Higher chapter numbers first
      return chapterNumB - chapterNumA;
    } else {
      // Lower chapter numbers first
      return chapterNumA - chapterNumB;
    }
  });
  
  return (
    <div className="mb-8">
      <div className="flex justify-end items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowNewestFirst(!showNewestFirst)}
          className="flex items-center gap-2"
        >
          {showNewestFirst ? (
            <>
              <ArrowDown className="h-4 w-4" />
              <span>Newest First</span>
            </>
          ) : (
            <>
              <ArrowUp className="h-4 w-4" />
              <span>Oldest First</span>
            </>
          )}
        </Button>
      </div>
      
      <div className="space-y-6">
        {sortedChapters.map(chapter => (
          <ChapterCard key={chapter.slug} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}