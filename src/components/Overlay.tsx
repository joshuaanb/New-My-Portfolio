"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PROJECTS } from '@/config';
import { useLanguage } from '@/context/LanguageContext';

interface OverlayProps {
  currentIndex: number;
}

const Overlay = ({ currentIndex }: OverlayProps) => {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const [displayIndex, setDisplayIndex] = React.useState(currentIndex);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { force3D: true }
    });
    
    tl.to([titleRef.current, descRef.current, subtitleRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setDisplayIndex(currentIndex);
      }
    })
    .set([titleRef.current, descRef.current, subtitleRef.current], { y: 20 })
    .to([titleRef.current, subtitleRef.current, descRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });

  }, [currentIndex]);

  const pIndex = displayIndex + 1;

  return (
    <>
      <div className="fixed inset-0 z-10 flex flex-col p-6 md:p-12 pointer-events-none select-none text-current overflow-hidden">
        
      {/* Main Content - Centered Horizontally & Vertically */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full">
        <div className="overflow-hidden">
          <h1 
            ref={titleRef}
            className="font-playfair text-5xl sm:text-7xl md:text-[10rem] leading-[0.9] text-current transition-all"
            style={{ willChange: 'transform, opacity' }}
          >
            {t(`project_${pIndex}_title`)}
          </h1>
        </div>
        
        <div className="mt-8 md:mt-12 flex flex-col items-center gap-6 md:gap-10">
          <span 
            ref={subtitleRef}
            className="font-inter text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] opacity-70"
            style={{ willChange: 'transform, opacity' }}
          >
            {t(`project_${pIndex}_subtitle`)}
          </span>
          <p 
            ref={descRef}
            className="font-inter text-sm md:text-lg leading-relaxed opacity-60 max-w-2xl"
            style={{ willChange: 'transform, opacity' }}
          >
            {t(`project_${pIndex}_desc`)}
          </p>
        </div>
      </div>

      {/* Bottom HUD - Fixed at bottom */}
      <div className="flex justify-center items-end w-full pb-4">
        <div className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-40 shrink-0">
          {String(currentIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  </>
);
};

export default Overlay;