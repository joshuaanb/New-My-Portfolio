"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <div className="pt-32 px-6 md:pt-48 md:px-12 max-w-4xl mx-auto">
        <h1 className="font-playfair text-5xl md:text-8xl mb-8 leading-tight">
          {t('about_title_1')} <span className="text-white/20">{t('about_title_2')}</span>
        </h1>
        <p className="font-inter text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
          {t('about_description')}
        </p>
        <div className="mt-12 h-px w-full bg-white/10" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-inter text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4">{t('philosophy_title')}</h3>
            <p className="font-inter text-sm text-white/60 leading-relaxed">
              {t('philosophy_desc')}
            </p>
          </div>
          <div>
            <h3 className="font-inter text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4">{t('experience_title')}</h3>
            <p className="font-inter text-sm text-white/60 leading-relaxed">
              {t('experience_desc')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
