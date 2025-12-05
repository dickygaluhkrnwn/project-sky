"use client";

import React, { useEffect, useState } from 'react';
import MemoryBoard from "@/app/components/game/MemoryBoard";
import { Sparkles } from 'lucide-react';

export default function MemoryPage() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate bintang acak untuk background
    const newStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_#1B2735_0%,_#090A0F_100%)] flex flex-col items-center justify-center py-10 px-4">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-40 animate-pulse"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: '4s',
            }}
          />
        ))}
      </div>
      
      {/* Efek Aurora Tipis */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-lilac-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* --- CONTENT --- */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="text-gold-400 animate-spin-slow" size={20} />
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-100 drop-shadow-[0_2px_10px_rgba(255,215,0,0.2)]">
              Spirit Memories
            </h1>
            <Sparkles className="text-gold-400 animate-spin-slow" size={20} />
          </div>
          
          <p className="text-sky-blue/80 text-sm md:text-base max-w-md mx-auto font-sans tracking-wide">
            Bantu Kiky menemukan kepingan ingatan yang hilang. Cocokkan setiap kartu untuk membebaskan spirit.
          </p>
        </div>

        {/* Game Board */}
        <MemoryBoard />
        
      </div>
    </main>
  );
}