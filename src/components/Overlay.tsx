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

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { force3D: true }
    });
    
    const pIndex = currentIndex + 1;

    tl.to([titleRef.current, descRef.current, subtitleRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        if (titleRef.current) titleRef.current.innerText = t(`project_${pIndex}_title`);
        if (subtitleRef.current) subtitleRef.current.innerText = t(`project_${pIndex}_subtitle`);
        if (descRef.current) descRef.current.innerText = t(`project_${pIndex}_desc`);
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

  }, [currentIndex, t]);

  const pIndex = currentIndex + 1;

  return (
    <>
      <div className="fixed inset-0 z-10 flex flex-col justify-between p-6 md:p-12 pointer-events-none select-none text-current overflow-hidden">
        
      {/* Main Content */}
      <div className="max-w-4xl mt-12 md:mt-20">
        <div className="overflow-hidden">
          <h1 
            ref={titleRef}
            className="font-playfair text-5xl sm:text-7xl md:text-[10rem] leading-[0.9] text-current transition-all"
            style={{ willChange: 'transform, opacity' }}
          >
            {t(`project_${pIndex}_title`)}
          </h1>
        </div>
        
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
          <span 
            ref={subtitleRef}
            className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] w-full md:w-1/3 opacity-70"
            style={{ willChange: 'transform, opacity' }}
          >
            {t(`project_${pIndex}_subtitle`)}
          </span>
          <p 
            ref={descRef}
            className="font-inter text-xs md:text-base leading-relaxed opacity-60 max-w-lg"
            style={{ willChange: 'transform, opacity' }}
          >
            {t(`project_${pIndex}_desc`)}
          </p>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between items-end gap-4">
        <div className="flex gap-6 md:gap-12 items-end">
          {/* Bottom Left Logo Indicator */}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-current/20 flex items-center justify-center font-inter text-[9px] md:text-[10px] font-bold shrink-0">
            N
          </div>
        </div>

        <div className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] opacity-40 shrink-0 mb-4">
          {String(currentIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  </>
);
};

export default Overlay;