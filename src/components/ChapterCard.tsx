'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Chapter } from '@/lib/chapters';

type ChapterCardProps = {
  chapter: Chapter;
};

export default function ChapterCard({ chapter }: ChapterCardProps) {
  return (
    <Link href={`/chapters/${chapter.slug}`} className="block">
      <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-4">
              <span className="text-3xl font-mono text-primary border border-primary/20 rounded-md px-2 py-1 bg-primary/5">
                {String(chapter.number).padStart(2, '0')}
              </span>
              <span className="text-xl group-hover:text-primary transition-colors">
                {chapter.title}
              </span>
            </CardTitle>
            <span className="text-sm text-muted-foreground">
  	    {new Date(chapter.date).toLocaleDateString('en-US')}
	    </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{chapter.excerpt}</p>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between items-center">
          <div className="w-8 h-1 bg-primary/40 rounded-full"></div>
          <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
            Read Chapter <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}