"use client";

import React from 'react';
import { motion } from 'framer-motion';
import StarNode from '../ui/StarNode';

// Definisi Menu: Bentuk Rasi Scorpio (Abstract)
// Scorpio memiliki bentuk khas seperti huruf 'J' atau kail besar
const MENU_ITEMS = [
  { label: "Catch Light", href: "/games/catch-light", x: 25, y: 30 }, // Capit Kiri
  { label: "Memories", href: "/games/memory", x: 45, y: 45 },         // Antares (Jantung - Pusat)
  { label: "Gallery", href: "/gallery", x: 40, y: 75 },               // Ekor Bawah
  { label: "Surprise", href: "/surprise", x: 75, y: 60 },             // Stinger (Ujung Ekor)
];

export default function ConstellationMenu() {
  return (
    <div className="relative w-full max-w-lg md:max-w-3xl aspect-video md:aspect-square mx-auto mt-10 md:mt-0 flex items-center justify-center">
      
      {/* GARIS PENGHUBUNG (SVG Lines) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Jalur Scorpio (Glow) */}
        <motion.path
          d="M 25 30 L 45 45 L 40 75 L 75 60" // Garis lurus antar titik membentuk Scorpio
          fill="none"
          stroke="#ffd700" // Gold
          strokeWidth="1.5"
          strokeOpacity="0.6"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Jalur Scorpio (Inti Putih) */}
        <motion.path
          d="M 25 30 L 45 45 L 40 75 L 75 60"
          fill="none"
          stroke="#fff"
          strokeWidth="0.5"
          strokeOpacity="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Garis Dekorasi Tambahan (Bintang kecil ke arah kepala Scorpio) - Opsional */}
        <motion.path
          d="M 45 45 L 55 25" // Tanduk kecil
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2 }}
        />
      </svg>

      {/* TITIK BINTANG (Nodes) */}
      {MENU_ITEMS.map((item, index) => (
        <StarNode
          key={index}
          {...item}
          delay={index * 0.4 + 2} // Muncul berurutan mengikuti garis
        />
      ))}

      {/* Bintang Dekorasi (Non-menu) - Kepala Scorpio */}
      <div className="absolute top-[25%] left-[55%] w-1 h-1 bg-white rounded-full animate-pulse opacity-50" />

      {/* Pusat Energi di Antares (Memories) */}
      <div 
        className="absolute w-32 h-32 bg-red-500/10 rounded-full blur-[50px] pointer-events-none animate-pulse-slow"
        style={{ top: '45%', left: '45%', transform: 'translate(-50%, -50%)' }} 
      />
    </div>
  );
}