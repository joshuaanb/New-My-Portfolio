"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black relative">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/2 rounded-full blur-[120px] -z-10" />

      <div className="pt-32 px-6 md:pt-48 md:px-12 max-w-4xl mx-auto flex flex-col items-center text-center">
        <h1 className="font-playfair text-5xl md:text-9xl mb-8 leading-tight">
          {t('contact_title_1')} <span className="text-white/20 italic">{t('contact_title_2')}</span>
        </h1>
        <p className="font-inter text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-12">
          {t('contact_description')}
        </p>

        <a 
          href={`mailto:${t('contact_email')}`} 
          className="font-playfair text-2xl md:text-4xl text-white hover:text-white/40 transition-all border-b border-white/10 pb-2 mb-24"
        >
          {t('contact_email')}
        </a>

        <div className="grid grid-cols-3 gap-8 md:gap-16">
          {["linkedin", "instagram", "github"].map(key => (
            <a key={key} href="#" className="font-inter text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
              {t(key)}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
