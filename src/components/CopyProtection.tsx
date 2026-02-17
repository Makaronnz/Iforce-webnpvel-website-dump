'use client';

import React, { useEffect } from 'react';

type CopyProtectionProps = {
  children: React.ReactNode;
};

export default function CopyProtection({ children }: CopyProtectionProps) {
  useEffect(() => {
    const preventCopy = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const preventKeyboardCopy = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+A, etc.
      if (
        (e.ctrlKey || e.metaKey) && 
        (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' || e.key === 'x' || e.key === 'X')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Target the element with the class "non-selectable"
    const protectedContent = document.querySelector('.non-selectable');
    
    if (protectedContent) {
      // Prevent right-click/context menu
      protectedContent.addEventListener('contextmenu', preventCopy);
      
      // Prevent copy events
      protectedContent.addEventListener('copy', preventCopy);
      
      // Prevent cut events
      protectedContent.addEventListener('cut', preventCopy);
      
      // Prevent keyboard shortcuts
      protectedContent.addEventListener('keydown', preventKeyboardCopy);
    }

    // Clean up event listeners when component unmounts
    return () => {
      if (protectedContent) {
        protectedContent.removeEventListener('contextmenu', preventCopy);
        protectedContent.removeEventListener('copy', preventCopy);
        protectedContent.removeEventListener('cut', preventCopy);
        protectedContent.removeEventListener('keydown', preventKeyboardCopy);
      }
    };
  }, []);

  return <>{children}</>;
}