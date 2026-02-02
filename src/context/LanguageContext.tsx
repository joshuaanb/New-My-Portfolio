"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Locale = 'en' | 'id';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    work: "Work",
    contact: "Contact",
    behance: "Behance",
    dribbble: "Dribbble",
    instagram: "Instagram",
    language: "Language",
    theme: "Theme",
    // About Page
    about_title_1: "About",
    about_title_2: "Me",
    about_description: "I am a creative developer specializing in immersive 3D experiences and high-end digital design. Beyond the code, I focus on the intersection of aesthetics and performance.",
    philosophy_title: "Philosophy",
    philosophy_desc: "Design is not just what it looks like; it's how it feels. I build interfaces that breathe and react.",
    experience_title: "Experience",
    experience_desc: "5+ years creating digital products for global brands and independent creators.",
    // Services Page
    services_title_1: "Our",
    services_title_2: "Services",
    service_1_title: "Creative Development",
    service_1_desc: "Interactive WebGL experiences and high-performance frontend engineering.",
    service_2_title: "UI/UX Design",
    service_2_desc: "Sophisticated digital identities and user-centric interface design.",
    service_3_title: "3D Motion",
    service_3_desc: "Fluid 3D animations and visual storytelling for the modern web.",
    service_4_title: "Brand Identity",
    service_4_desc: "Minimalist and premium brand systems designed for longevity.",
    // Project Data (Unified for Work and Home)
    project_1_title: "Liquid Distortion",
    project_1_type: "WebGL / React",
    project_1_subtitle: "DESIGN CONFERENCE 2026",
    project_1_desc: "The DESIGN Conference programme offers broad exchange possibilities for researchers and practitioners, strategic decision makers, managers, design and engineering professionals, national or regional agencies or governmental bodies.",
    project_2_title: "Glass Morphism",
    project_2_type: "UI Design / 3D",
    project_2_subtitle: "NEXT GEN CREATIVES",
    project_2_desc: "Our goal is to bring together researchers and practitioners who have worked on or thought about engineering and industrial design from a variety of perspectives, disciplines, and fields.",
    project_3_title: "Sphere Transition",
    project_3_type: "Animation",
    project_3_subtitle: "DYNAMICS",
    project_3_desc: "Exploring smooth transitions between geometric primitives using custom GLSL shaders and GSAP.",
    project_4_title: "Iridescent Sheen",
    project_4_type: "Shaders / Design",
    project_4_subtitle: "COLOR THEORY",
    project_4_desc: "Implementing physically based iridescence and thin-film interference in WebGL materials.",
    // Contact Page
    contact_title_1: "Let's",
    contact_title_2: "Connect",
    contact_description: "Currently open for collaborations and selective freelance opportunities for 2024.",
    contact_email: "josuanababan124@gmail.com",
    github: "Github",
    linkedin: "LinkedIn",
  },
  id: {
    home: "Beranda",
    about: "Tentang",
    services: "Layanan",
    work: "Karya",
    contact: "Kontak",
    behance: "Behance",
    dribbble: "Dribbble",
    instagram: "Instagram",
    language: "Bahasa",
    theme: "Tema",
    // About Page
    about_title_1: "Tentang",
    about_title_2: "Saya",
    about_description: "Saya adalah pengembang kreatif yang berspesialisasi dalam pengalaman 3D imersif dan desain digital kelas atas. Lebih dari sekadar kode, saya fokus pada persimpangan antara estetika dan performa.",
    philosophy_title: "Filosofi",
    philosophy_desc: "Desain bukan hanya tentang tampilannya; tapi tentang bagaimana rasanya. Saya membangun antarmuka yang hidup dan bereaksi.",
    experience_title: "Pengalaman",
    experience_desc: "5+ tahun menciptakan produk digital untuk merek global dan kreator independen.",
    // Services Page
    services_title_1: "Layanan",
    services_title_2: "Kami",
    service_1_title: "Pengembang Kreatif",
    service_1_desc: "Pengalaman WebGL interaktif dan teknik frontend berperforma tinggi.",
    service_2_title: "Desain UI/UX",
    service_2_desc: "Identitas digital canggih dan desain antarmuka yang berpusat pada pengguna.",
    service_3_title: "Gerakan 3D",
    service_3_desc: "Animasi 3D yang mengalir dan penceritaan visual untuk web modern.",
    service_4_title: "Identitas Merek",
    service_4_desc: "Sistem merek minimalis dan premium yang dirancang untuk umur panjang.",
    // Project Data (Unified)
    project_1_title: "Distorsi Cair",
    project_1_type: "WebGL / React",
    project_1_subtitle: "KONFERENSI DESAIN 2026",
    project_1_desc: "Program Konferensi DESAIN menawarkan kemungkinan pertukaran yang luas bagi para peneliti dan praktisi, pembuat keputusan strategis, manajer, desain dan profesional teknik.",
    project_2_title: "Morfisme Kaca",
    project_2_type: "Desain UI / 3D",
    project_2_subtitle: "KREATIF GENERASI BERIKUTNYA",
    project_2_desc: "Tujuan kami adalah untuk menyatukan para peneliti dan praktisi yang telah bekerja pada atau memikirkan teknik dan desain industri.",
    project_3_title: "Transisi Bola",
    project_3_type: "Animasi",
    project_3_subtitle: "DINAMIKA",
    project_3_desc: "Menjelajahi transisi halus antara primitif geometris menggunakan shader GLSL kustom dan GSAP.",
    project_4_title: "Kilau Iridescent",
    project_4_type: "Shader / Desain",
    project_4_subtitle: "TEORI WARNA",
    project_4_desc: "Mengimplementasikan iridescence berbasis fisik dan interferensi film tipis dalam material WebGL.",
    // Contact Page
    contact_title_1: "Mari",
    contact_title_2: "Terhubung",
    contact_description: "Saat ini terbuka untuk kolaborasi dan peluang freelance pilihan untuk tahun 2024.",
    contact_email: "josuanababan124@gmail.com",
    github: "Github",
    linkedin: "LinkedIn",
  }
} as const;

type TranslationKey = keyof typeof translations.en;

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en');

  // Load locale from localStorage
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale === 'en' || savedLocale === 'id') {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  }, []);

  const t = useCallback((key: string): string => {
    const dict = translations[locale] as Record<string, string>;
    return dict[key] || key;
  }, [locale]);

  const contextValue = React.useMemo(() => ({
    locale,
    setLocale: changeLocale,
    t
  }), [locale, changeLocale, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
