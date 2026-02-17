'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Import the static configurations
import { frameDOMVariants } from '@/lib/framer-no-ssr';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('latest-chapters');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  // If not mounted yet (during static generation), render a simpler version
  if (!isMounted) {
    return (
      <section className="relative min-h-screen pt-24 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/70 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Ironforce"
            fill
            priority
            className="object-cover opacity-30"
            style={{ objectPosition: 'center 25%' }}
          />
        </div>
        <div className="container mx-auto relative z-20 px-4 md:px-6">
          {/* Mobile layout - Image first for mobile only */}
          <div className="block lg:hidden mb-8">
            <div className="relative aspect-[3/4] mx-auto max-w-xs w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/hero.jpg"
                alt="Captain Frieda Flusser"
                fill
                priority
                className="object-cover"
                style={{ objectPosition: 'center 25%' }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full inline-block">
                  Web Novel
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="block text-primary">IRONFORCE</span>
                  <span className="block opacity-80 text-2xl md:text-3xl lg:text-4xl mt-2">
                    All For One
                  </span>
                </h1>
              </div>
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-xl">
                  When Frieda fell in the final days of the World War, she thought she had finally escaped. She was wrong. Death didn't bring peace; it redeployed her to a new hell.
                </p>
                <p className="text-lg mt-4">
                  She wakes up in a world alien to her, surrounded by enemies who fight with swords and magic. She knows nothing of their lands, and they know nothing of the devastation she carries in her memories.
                </p>
                <p className="text-lg mt-4">
                  Neither side realizes that this ignorance is dangerous. By the time they understand that Frieda is the spark that will set their world on fire, it will be too late.
                </p>
                <p className="text-lg font-semibold italic mt-4 text-primary/90">
                  When the cold logic of modern technology meets the volatile nature of magic, the result shouldn't be this devastating. Or maybe... maybe total destruction is the only logical outcome.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild className="rounded-full px-6">
                  <Link href="/chapters">
                    Start Reading
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-6">
                  <Link href="/infos">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[3/4] hidden lg:block">
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/hero.jpg"
                  alt="Captain Frieda Flusser"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 25%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Client-side rendering with animations
  return (
    <section className="relative min-h-screen pt-24 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/70 z-10" />

      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Ironforce"
          fill
          priority
          className="object-cover opacity-40"
          style={{
            objectPosition: 'center 35%',
            transform: `translateY(${scrollY * 0.0}px)`
          }}
        />
      </div>

      <div className="container mx-auto relative z-20 px-4 md:px-6">
        {/* Mobile Hero Image - Placed ABOVE text content for mobile view */}
        <motion.div
          className="block lg:hidden mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative aspect-[3/4] mx-auto max-w-xs w-full rounded-lg overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/images/hero.jpg"
              alt="Captain Frieda Flusser"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 25%' }}
            />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <AnimatePresence>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-2">
                <motion.span
                  className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full inline-block"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Web Novel
                </motion.span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <motion.span
                    className="block text-primary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    IRONFORCE
                  </motion.span>
                  <motion.span
                    className="block opacity-80 text-2xl md:text-3xl lg:text-4xl mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    All For One
                  </motion.span>
                </h1>
              </div>

              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-xl">
                  When Frieda fell in the final days of the World War, she thought she had finally escaped. She was wrong. Death didn't bring peace; it redeployed her to a new hell.
                </p>
                <p className="text-lg mt-4">
She wakes up in a world alien to her, surrounded by enemies who fight with swords and magic. She knows nothing of their lands, and they know nothing of the devastation she carries in her memories.
                </p>
                <p className="text-lg mt-4">
Neither side realizes that this ignorance is dangerous. By the time they understand that Frieda is the spark that will set their world on fire, it will be too late.
                </p>
                <p className="text-lg font-semibold italic mt-4 text-primary/90">
When the cold logic of modern technology meets the volatile nature of magic, the result shouldn't be this devastating. Or maybe... maybe total destruction is the only logical outcome.                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild className="rounded-full px-6">
                  <Link href="/chapters">
                    Start Reading
                  </Link>
                </Button>

                <Button size="lg" variant="outline" asChild className="rounded-full px-6">
                  <Link href="/world-map">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop Hero Image */}
          <motion.div
            className="relative aspect-[3/4] hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/hero.jpg"
                alt="Captain Frieda Flusser"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 25%' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;