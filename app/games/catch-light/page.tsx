"use client";

import React from 'react';
import CatchLightBoard from "@/app/components/game/CatchLightBoard";
import { Sparkles } from 'lucide-react';

export default function CatchLightPage() {
  return (
    // Menggunakan background malam yang sama dengan Memory Page agar konsisten
    <main className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_#1B2735_0%,_#090A0F_100%)] flex flex-col items-center justify-center py-10 px-4">
      
      {/* Efek Aurora Tipis (Sama seperti Memory Page) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-lilac-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* --- CONTENT --- */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        
        {/* Title Section (Gaya disamakan dengan Memory Page) */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="text-gold-400 animate-spin-slow" size={20} />
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-100 drop-shadow-[0_2px_10px_rgba(255,215,0,0.2)]">
              Catch the Light
            </h1>
            <Sparkles className="text-gold-400 animate-spin-slow" size={20} />
          </div>
          
          <p className="text-sky-blue/80 text-sm md:text-base max-w-md mx-auto font-sans tracking-wide">
            Kumpulkan cahaya yang jatuh untuk memperkuat sayapmu sebelum masuk ke Gallery.
          </p>
        </div>

        {/* Game Board */}
        <CatchLightBoard />

      </div>
    </main>
  );
}