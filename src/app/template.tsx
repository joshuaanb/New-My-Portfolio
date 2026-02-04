"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Reset styles
    gsap.set(overlayRef.current, { scaleY: 1 });
    gsap.set(contentRef.current, { opacity: 0, y: 20 });

    tl.to(overlayRef.current, {
      scaleY: 0,
      duration: 1,
      ease: "power4.inOut",
      transformOrigin: "top",
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative">
      {/* Page Reveal Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-[#0a0a0a] z-90 pointer-events-none will-change-transform"
      />
      
      {/* Page Content Wrapper */}
      <div ref={contentRef} className="will-change-[opacity,transform]">
        {children}
      </div>
    </div>
  );
}
