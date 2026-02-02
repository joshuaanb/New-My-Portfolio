"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <div className="pt-32 px-6 md:pt-48 md:px-12 max-w-4xl mx-auto">
        <h1 className="font-playfair text-5xl md:text-8xl mb-8 leading-tight">
          {t('services_title_1')} <span className="text-white/20">{t('services_title_2')}</span>
        </h1>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { title: t('service_1_title'), desc: t('service_1_desc') },
            { title: t('service_2_title'), desc: t('service_2_desc') },
            { title: t('service_3_title'), desc: t('service_3_desc') },
            { title: t('service_4_title'), desc: t('service_4_desc') }
          ].map((service) => (
            <div key={service.title} className="group cursor-default">
              <h3 className="font-playfair text-2xl md:text-3xl mb-4 group-hover:text-white/80 transition-colors">
                {service.title}
              </h3>
              <p className="font-inter text-sm md:text-base text-white/40 leading-relaxed">
                {service.desc}
              </p>
              <div className="mt-6 h-px w-0 group-hover:w-full bg-white/40 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
