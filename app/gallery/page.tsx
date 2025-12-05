"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MEMORY_CARDS } from '@/lib/data';
import MessageBoat from '../components/gallery/MessageBoat';
import { ArrowRight, Star, Sparkles } from 'lucide-react';

// Caption tambahan agar lebih terasa "Sky"
const SKY_CAPTIONS = [
  "Kenangan indah di bawah cahaya bintang.",
  "Setiap pertemuan adalah keajaiban.",
  "Terbang tinggi menembus awan.",
  "Cahaya lilin yang tak pernah padam.",
  "Bersama menjelajahi dunia luas.",
  "Friendship is the true magic."
];

export default function GalleryPage() {
  const router = useRouter();
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate bintang acak untuk background (Konsisten dengan halaman lain)
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
    // Background Malam (Disamakan dengan Game Page)
    <main className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_#1B2735_0%,_#090A0F_100%)] transition-colors duration-1000">
      
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

      {/* Efek Air / Pantulan di Bawah */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-sky-900/20 to-transparent blur-xl pointer-events-none" />
      
      {/* Efek Aurora Tipis */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-lilac-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center min-h-screen py-12 px-4">
        
        {/* Header (Sinkron Font & Warna dengan Halaman Game) */}
        <div className="text-center mb-16 space-y-3">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="text-gold-400 animate-spin-slow" size={20} />
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-100 drop-shadow-[0_2px_10px_rgba(255,215,0,0.2)]">
              Memory Lake
            </h1>
            <Sparkles className="text-gold-400 animate-spin-slow" size={20} />
          </div>
          
          <p className="text-sky-blue/80 text-sm md:text-base font-sans max-w-md mx-auto tracking-wide">
            Sentuh perahu kertas untuk melihat kepingan kenangan yang tersimpan.
          </p>
        </div>

        {/* Boats Grid (Tersebar) */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 place-items-center mb-24">
          {MEMORY_CARDS.map((card, index) => (
            <MessageBoat
              key={card.id}
              image={card.img}
              caption={SKY_CAPTIONS[index % SKY_CAPTIONS.length]} 
              delay={index}
            />
          ))}
        </div>

        {/* Button to Final Surprise */}
        <div className="fixed bottom-8 z-20">
          <button
            onClick={() => router.push('/surprise')}
            className="group relative px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-sky-dark font-serif font-bold rounded-full shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] hover:scale-105 transition-all duration-500 flex items-center gap-3 border border-white/20"
          >
            <Star className="animate-spin-slow group-hover:animate-spin" size={20} />
            Menuju Eden (Surprise)
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </main>
  );
}