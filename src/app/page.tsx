import React from 'react';
import HeroSection from "@/components/HeroSection";
import LatestChapters from "@/components/LatestChapters";
import MapSection from "@/components/MapSection";
import { getChapters } from '@/lib/chapters';

export default function Home() {
  // Get all chapters and let the LatestChapters component handle sorting
  const allChapters = getChapters();
  
  // Debug to check what chapters we're getting
  console.log("Home page chapters:", allChapters.map(c => ({
    slug: c.slug,
    date: c.date
  })));
  
  return (
    <>
      <HeroSection />
      <LatestChapters chapters={allChapters} />
      <MapSection />
    </>
  );
}