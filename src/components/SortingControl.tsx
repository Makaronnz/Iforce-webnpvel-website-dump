'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';

type SortingControlProps = {
  initialOrder?: 'newest' | 'oldest';
  onOrderChange: (order: 'newest' | 'oldest') => void;
};

export default function SortingControl({ 
  initialOrder = 'newest', 
  onOrderChange 
}: SortingControlProps) {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>(initialOrder);
  
  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
    setSortOrder(newOrder);
    onOrderChange(newOrder);
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleSortOrder}
      className="flex items-center gap-2"
    >
      {sortOrder === 'newest' ? (
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
  );
}