"use client";

import { useLanguage } from '@/context/LanguageContext';
import { PROJECTS } from '@/config';

export default function WorkPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <div className="pt-32 px-6 md:pt-48 md:px-12 max-w-6xl mx-auto">
        <h1 className="font-playfair text-5xl md:text-8xl mb-12 leading-tight">
          {t('work_title_1')} <span className="text-white/20">{t('work_title_2')}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 pb-32">
          {PROJECTS.map((project, index) => (
            <a 
              key={project.id} 
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden mb-6 relative">
                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                 <span className="absolute top-6 left-6 font-inter text-[10px] tracking-widest text-white/20">
                   {String(index + 1).padStart(2, '0')}
                 </span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-playfair text-2xl md:text-3xl mb-1">{t(`project_${project.id}_title`)}</h3>
                  <span className="font-inter text-[10px] uppercase tracking-widest text-white/30">{t(`project_${project.id}_type`)}</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
