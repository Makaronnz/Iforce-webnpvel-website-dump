'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-background/90 border-t border-border mt-24">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Ironforce Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <h3 className="text-lg font-bold">IRONFORCE</h3>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              A web novel about Captain Frieda Flusser's journey through a new magical world
              after reincarnation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Main Page
              </Link>
              <Link href="/chapters" className="text-muted-foreground hover:text-foreground transition-colors">
                Chapters
              </Link>
              <Link href="/infos" className="text-muted-foreground hover:text-foreground transition-colors">
                Infos
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support the Novel</h3>
            <p className="text-muted-foreground text-sm mb-4">
              If you're enjoying Ironforce, consider forcing me to write more.
            </p>

            <SupportButtons />
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Makaron | All Rights Reserved</p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://discord.gg/8dZASy3tHv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <i className="fab fa-discord"></i>
            </a>
            <a
              href="https://x.com/makarongames_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/makarongames?igsh=aXltdWw1cG9qd2Yz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
};

export default Footer;

/* === Alt bileşen: Butonları ölçüp eşitle === */
function SupportButtons() {
  const patreonRef = useRef<HTMLAnchorElement | null>(null);
  const [w, setW] = useState<number>();

  useEffect(() => {
    const measure = () => {
      if (patreonRef.current) setW(patreonRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Patreon (referans) */}
      <a
        ref={patreonRef}
        href="https://www.patreon.com/Makaronnz"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-[#FF424D] px-4 py-2 text-white hover:bg-[#FF424D]/90 transition-colors whitespace-nowrap self-start"
        style={w ? { width: w } : undefined}
      >
        <Image src="/images/patreon.png" alt="Patreon" width={20} height={20} />
        Support on Patreon
      </a>

      {/* Ko-fi (aynı genişlik) */}
      <a
        href="https://ko-fi.com/makaronnz"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-[#FF5E5B] px-4 py-2 text-white hover:bg-[#FF5E5B]/90 transition-colors whitespace-nowrap self-start"
        style={w ? { width: w } : undefined}
      >
        <Image src="/images/kofi-logo.png" alt="Ko-fi" width={20} height={20} />
        Support on Ko-fi
      </a>
    </div>
  );
}
