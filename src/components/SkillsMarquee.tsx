"use client";

import React from 'react';
import Image from 'next/image';

const SKILLS = [

  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
];

export default function SkillsMarquee() {
  // Duplicate skills to create a seamless infinite loop
  const duplicatedSkills = [...SKILLS, ...SKILLS];

  return (
    <div className="w-full overflow-hidden relative py-12 bg-black/50 backdrop-blur-sm border-y border-white/5 mt-16 group">
      {/* Gradient masks for smooth fading on edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Marquee container */}
      <div className="flex justify-center w-max animate-marquee group-hover:[animation-play-state:paused] transition-all duration-300">
        {duplicatedSkills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex flex-col items-center justify-center mx-12 md:mx-16 min-w-[80px]"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {/* Using Next.js Image for automatic optimization and explicit sizing for performance */}
              <Image
                src={skill.icon}
                alt={`${skill.name} icon`}
                className="w-full h-full object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
                width={80}
                height={80}
              />
            </div>
            <span className="font-inter text-xs uppercase tracking-widest text-white/40">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
