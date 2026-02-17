'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Chapter } from '@/lib/chapters';

type ChapterNavigationProps = {
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
};

export default function ChapterNavigation({ prevChapter, nextChapter }: ChapterNavigationProps) {
  return (
    <div className="flex justify-between mt-12">
      {/* Previous Chapter Button - Now on the LEFT side */}
      <div>
        {prevChapter ? (
          <Link href={`/chapters/${prevChapter.slug}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft size={16} />
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Previous</span>
                <span>Chapter {prevChapter.number}</span>
              </div>
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      
      {/* Next Chapter Button - Now on the RIGHT side */}
      <div>
        {nextChapter ? (
          <Link href={`/chapters/${nextChapter.slug}`}>
            <Button className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Next</span>
                <span>Chapter {nextChapter.number}</span>
              </div>
              <ChevronRight size={16} />
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}