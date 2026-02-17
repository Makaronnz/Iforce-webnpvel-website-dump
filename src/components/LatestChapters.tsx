'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type Chapter = {
  slug: string;
  title?: string;
  number?: number;
  date?: string;
  excerpt?: string;
};

type LatestChaptersProps = {
  chapters: Chapter[];
};

export default function LatestChapters({ chapters }: LatestChaptersProps) {
  useEffect(() => {
    // Debug to see what dates we're working with
    console.log("Original chapters:", chapters.map(c => ({
      slug: c.slug,
      date: c.date,
      parsed: c.date ? new Date(c.date) : 'No date'
    })));
  }, [chapters]);

  // Ensure we're working with a clean copy of the chapters
  const validChapters = [...chapters].filter(chapter => 
    chapter && chapter.slug && chapter.date
  );

  // Sort chapters by date in descending order (newest first)
  const sortedByDate = [...validChapters].sort((a, b) => {
    // Make sure we have valid dates to compare
    if (!a.date) return 1;  // a has no date, push to end
    if (!b.date) return -1; // b has no date, push to end

    // Create proper Date objects
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    // Check if we have valid dates
    if (isNaN(dateA.getTime())) return 1;
    if (isNaN(dateB.getTime())) return -1;
    
    // Compare the dates (newest first)
    return dateB.getTime() - dateA.getTime();
  });

  useEffect(() => {
    // Debug to see the sorted result
    console.log("Sorted chapters:", sortedByDate.map(c => ({
      slug: c.slug,
      date: c.date,
      parsed: c.date ? new Date(c.date) : 'No date'
    })));
  }, [sortedByDate]);

  // Take the first 3 most recent chapters
  const latestChapters = sortedByDate.slice(0, 3);

  return (
    <div id="latest-chapters" className="py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <i className="fas fa-book text-primary"></i>
            Latest Chapters
          </h2>
          <Link href="/chapters" className="flex items-center gap-1 text-primary hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        {latestChapters.length === 0 ? (
          <div className="bg-muted p-8 rounded-md text-center">
            <p>No chapters available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestChapters.map((chapter) => (
              <div key={chapter.slug}>
                <Link href={`/chapters/${chapter.slug}`} className="block h-full">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-primary/50 bg-card overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                    <CardHeader className="relative pb-2">
                      <div className="absolute top-2 right-2 bg-muted/50 px-2 py-1 rounded-full text-xs text-muted-foreground">
                        {chapter.date ? new Date(chapter.date).toLocaleDateString('en-US') : "No date"}
                      </div>
                      <CardTitle className="flex items-center gap-4 mt-4">
                        <span className="text-3xl font-mono text-primary border border-primary/20 rounded-md px-2 py-1 bg-primary/5">
                          {String(chapter.number || 0).padStart(2, '0')}
                        </span>
                        <span className="text-xl group-hover:text-primary transition-colors">
                          {chapter.title || "Untitled"}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{chapter.excerpt || "No excerpt available"}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between items-center pb-4">
                      <div className="w-8 h-1 bg-primary/40 rounded-full"></div>
                      <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Read Chapter <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}