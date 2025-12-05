"use client";

import React, { useEffect, useState } from 'react';
import ConstellationMenu from '../components/home/ConstellationMenu';

export default function SkyHome() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate 50 bintang acak di posisi background
    // Ini mensimulasikan bintang-bintang kecil di langit yang bukan menu
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Posisi horizontal 0-100%
      y: Math.random() * 100, // Posisi vertikal 0-100%
      size: Math.random() * 2 + 1, // Ukuran acak 1px - 3px
      delay: Math.random() * 5, // Delay kedip acak
    }));
    setStars(newStars);
  }, []);

  return (
    // Background diubah jadi Gradasi Malam Gelap (Dark Blue -> Black)
    <main className="min-h-screen w-full relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#1B2735_0%,_#090A0F_100%)] transition-colors duration-1000">
      
      {/* --- BACKGROUND STARS (Hiasan Tambahan) --- */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-60 animate-pulse"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: '3s', // Durasi kedip
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)` // Efek glow kecil
            }}
          />
        ))}
      </div>

      {/* Efek Kabut/Nebula tipis di bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-lilac-900/20 to-transparent blur-3xl z-0 pointer-events-none" />
      
      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        
        {/* Header Sambutan dengan Warna Emas */}
        <div className="text-center mb-12 space-y-2">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-400 drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)] tracking-wide">
            Home Space
          </h1>
          <p className="text-sky-blue/80 font-sans tracking-[0.3em] text-xs md:text-sm uppercase font-semibold">
            Where stars align for you
          </p>
        </div>

        {/* Menu Konstelasi */}
        <ConstellationMenu />

      </div>
    </main>
  );
}