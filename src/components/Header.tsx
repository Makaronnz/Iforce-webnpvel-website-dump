'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Main Page', href: '/', icon: 'fas fa-home' },
  { name: 'Chapters', href: '/chapters', icon: 'fas fa-book-open' },
  { name: 'Infos', href: '/infos', icon: 'fas fa-map' },
  { name: 'About Me', href: '/about', icon: 'fas fa-info-circle' },
  { name: 'Contact', href: '/contact', icon: 'fas fa-envelope' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu when the pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm",
      isScrolled
        ? "bg-background/90 shadow-md py-2"
        : "bg-background/70 py-4"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Ironforce Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <h1 className="text-2xl font-bold tracking-tight hidden sm:block">IRONFORCE</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      pathname === item.href && "bg-accent/50"
                    )}>
                      <span className="mr-2">
                        <i className={item.icon}></i>
                      </span>
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-accent">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md hover:bg-accent text-lg",
                      pathname === item.href && "bg-accent/50 text-primary"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
