"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";

interface VirtualizerOptions {
  size: number;
  parentRef: React.RefObject<HTMLElement>;
  estimateSize: (index: number) => number;
  overscan?: number;
}

export function useVirtualizer({
  size,
  parentRef,
  estimateSize,
  overscan = 3,
}: VirtualizerOptions) {
  const [range, setRange] = useState({ start: 0, end: 10 });
  const sizeCache = useRef<number[]>([]);
  const totalSize = useRef(0);

  // Calculate the total size and update the size cache
  useEffect(() => {
    sizeCache.current = [];
    let total = 0;

    for (let i = 0; i < size; i++) {
      const itemSize = estimateSize(i);
      sizeCache.current.push(itemSize);
      total += itemSize;
    }

    totalSize.current = total;
  }, [size, estimateSize]);

  // Update the visible range when the parent element scrolls
  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const updateRange = () => {
      const scrollTop = parent.scrollTop;

      // Find the start index
      let start = 0;
      let sum = 0;
      while (start < size && sum < scrollTop) {
        sum += sizeCache.current[start];
        start++;
      }

      // Apply overscan
      start = Math.max(0, start - overscan);

      // Find the end index
      let end = start;
      const visibleHeight = parent.clientHeight;
      while (end < size && sum < scrollTop + visibleHeight) {
        sum += sizeCache.current[end];
        end++;
      }

      // Apply overscan
      end = Math.min(size - 1, end + overscan);

      setRange({ start, end });
    };

    updateRange();
    parent.addEventListener("scroll", updateRange);

    return () => {
      parent.removeEventListener("scroll", updateRange);
    };
  }, [size, overscan, parentRef]);

  // Calculate positions for the visible items
  const virtualItems = [];
  let offset = 0;

  for (let i = 0; i < range.start; i++) {
    offset += sizeCache.current[i] || 0;
  }

  for (let i = range.start; i <= range.end; i++) {
    const size = sizeCache.current[i] || 0;
    virtualItems.push({
      index: i,
      size,
      start: offset,
    });
    offset += size;
  }

  return {
    virtualItems,
    totalSize: totalSize.current,
    range,
  };
}
