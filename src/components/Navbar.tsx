"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const MENU_ITEMS_KEYS = ['home', 'about', 'services', 'work', 'contact'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  
  // Memoize translated items to ensure they update when locale/t changes
  const menuItems = React.useMemo(() => 
    MENU_ITEMS_KEYS.map(key => ({
      key,
      label: t(key),
      href: key === 'home' ? '/' : `/${key}`
    })), 
  [locale, t]);

  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Separate effect for timeline creation to handle ref updates reliably
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clear existing timeline if any
      if (tl.current) tl.current.kill();

      tl.current = gsap.timeline({ 
        paused: true,
        defaults: { force3D: true }
      })
      .to(line1Ref.current, { y: 8, rotate: 45, duration: 0.3, ease: 'power2.inOut' }, 0)
      .to(line2Ref.current, { opacity: 0, scale: 0, duration: 0.2, ease: 'power2.inOut' }, 0)
      .to(line3Ref.current, { y: -8, rotate: -45, duration: 0.3, ease: 'power2.inOut' }, 0)
      .fromTo(menuRef.current, 
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.1
      )
      .fromTo(linksRef.current.filter(Boolean),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: 'power2.out' }, 0.2
      );
    });

    return () => {
      ctx.revert();
      tl.current = null;
    };
  }, [menuItems]); // Re-create timeline ONLY when items change

  // Separate effect for controlling playback based on isOpen state
  useEffect(() => {
    if (!tl.current) return;

    if (isOpen) {
      tl.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.current.reverse();
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-1000 flex justify-between items-center p-6 md:p-12 pointer-events-auto">
      {/* Logo */}
      <Link href="/" className="font-playfair text-xl md:text-2xl font-bold tracking-tighter text-current hover:opacity-80 transition-opacity">
        Jona<span className="opacity-40">.</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="font-inter text-[10px] uppercase tracking-[0.3em] font-medium text-current/60 hover:text-current transition-colors duration-300"
          >
            {item.label}
          </Link>
        ))}
        
        {/* Language Toggle */}
        <div className="flex items-center gap-4 ml-8 border-l border-current/10 pl-8">
          <button 
            onClick={() => setLocale(locale === 'en' ? 'id' : 'en')}
            className="font-inter text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            {locale.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Hamburger Button - Larger hit area for mobile */}
      <button
        ref={burgerRef}
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="relative z-1001 w-12 h-12 flex flex-col justify-center items-center gap-1.5 focus:outline-none md:hidden"
        style={{ willChange: 'transform' }}
      >
        <span ref={line1Ref} className="w-8 h-[2px] bg-current rounded-full origin-center" style={{ willChange: 'transform' }} />
        <span ref={line2Ref} className="w-8 h-[2px] bg-current rounded-full origin-center" style={{ willChange: 'opacity, transform' }} />
        <span ref={line3Ref} className="w-8 h-[2px] bg-current rounded-full origin-center" style={{ willChange: 'transform' }} />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className={`fixed inset-0 bg-black z-999 flex flex-col justify-center items-center md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="flex flex-col gap-8 items-center">
          {menuItems.map((item, index) => (
            <Link
              key={item.key}
              href={item.href}
              ref={(el) => { linksRef.current[index] = el; }}
              onClick={() => setIsOpen(false)}
              className="font-playfair text-4xl font-bold text-white hover:opacity-60 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
          
          <div className="flex gap-4 mt-8">
             <button onClick={() => setLocale(locale === 'en' ? 'id' : 'en')} className="font-inter text-xs uppercase tracking-widest py-2 px-4 border border-white/20 rounded-full cursor-pointer">{locale.toUpperCase()}</button>
          </div>
        </div>
        
        {/* Socials / Footer in Menu */}
        <div className="absolute bottom-12 flex gap-8">
          <a href="#" className="font-inter text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-opacity">{t('linkedin')}</a>
          <a href="#" className="font-inter text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-opacity">{t('instagram')}</a>
          <a href="#" className="font-inter text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-opacity">{t('github')}</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
