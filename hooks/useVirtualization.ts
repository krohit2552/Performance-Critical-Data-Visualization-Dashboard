'use client';

import { useState, useMemo } from 'react';

export const useVirtualization = <T,>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const { startIndex, endIndex, offsetY } = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(start + visibleCount + 1, items.length);
    const offset = start * itemHeight;

    return { startIndex: start, endIndex: end, offsetY: offset };
  }, [scrollTop, itemHeight, containerHeight, items.length]);

  const visibleItems = useMemo(
    () => items.slice(startIndex, endIndex),
    [items, startIndex, endIndex]
  );

  return { visibleItems, offsetY, setScrollTop, totalHeight: items.length * itemHeight };
};
