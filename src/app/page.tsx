"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import LiquidBackground from '@/components/LiquidBackground/LiquidBackground';
import Overlay from '@/components/Overlay';
import { PROJECTS } from '@/config';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioning = useRef(false);
  const dragStart = useRef<number | null>(null);
  const lastScrollTime = useRef(0);

  const nextSlide = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    setTimeout(() => { isTransitioning.current = false; }, 1500); // Match shader transition duration
  }, []);

  const prevSlide = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    setTimeout(() => { isTransitioning.current = false; }, 1500);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 500) return; // Prevent rapid scrolling
      
      if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        lastScrollTime.current = now;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      dragStart.current = e.clientX;
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (dragStart.current === null) return;
      const diff = e.clientX - dragStart.current;
      if (Math.abs(diff) > 100) {
        if (diff < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      dragStart.current = null;
    };

    const handleTouchStart = (e: TouchEvent) => {
      dragStart.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (dragStart.current === null) return;
      const diff = e.changedTouches[0].clientX - dragStart.current;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      dragStart.current = null;
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return (
    <main className="h-screen w-full overflow-hidden text-white selection:bg-white selection:text-black">
      <LiquidBackground currentIndex={currentIndex} />
      <Overlay currentIndex={currentIndex} />
    </main>
  );
}
