"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LOVE_LETTER_CONTENT, ANNIVERSARY_DATE, TARGET_NAME } from '@/lib/data';
import { Heart, Home, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function LoveLetter() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffd700', '#ffffff'] 
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffd700', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="w-full max-w-2xl relative">
      
      {/* Amplop Tertutup */}
      {!isOpen && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-64 h-40 bg-gradient-to-br from-gold-100 to-gold-300 rounded-lg shadow-[0_0_50px_rgba(255,215,0,0.5)] flex items-center justify-center relative overflow-hidden border-4 border-white/50"
          >
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-red-300">
              <Heart className="text-white fill-white" />
            </div>
            <div className="absolute inset-0 bg-white/20 rotate-45 transform translate-y-1/2" />
          </motion.button>
          <p className="text-white font-serif text-xl animate-pulse">Open the Gift</p>
        </motion.div>
      )}

      {/* Isi Surat Terbuka */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="bg-[#fffdfa] rounded-xl shadow-2xl overflow-hidden border-8 border-double border-gold-200 relative p-8 md:p-12"
        >
          <Sparkles className="absolute top-4 left-4 text-gold-400" />
          <Sparkles className="absolute top-4 right-4 text-gold-400" />
          
          <div className="space-y-6 text-slate-700 leading-relaxed relative z-10">
            
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl md:text-4xl text-lilac-900 font-bold mb-2">
                Happy Birthday, {TARGET_NAME}!
              </h1>
              <p className="text-lilac-500 font-serif italic text-sm">
                {ANNIVERSARY_DATE} • A Sky Kid's Journey
              </p>
            </div>

            <div className="font-sans text-lg space-y-4 text-justify md:text-left text-slate-600">
              {LOVE_LETTER_CONTENT.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-lilac-100 flex flex-col items-center gap-6">
              <div className="font-serif text-lilac-800 text-xl text-center">
                With all the lights in the sky, <br />
                <span className="font-bold">Your Playmate</span>
              </div>

              {/* FIX: Ubah teks agar sesuai konteks bahwa Home Space baru terbuka */}
              <Button onClick={() => router.push('/sky-home')} variant="outline" className="mt-4 border-gold-400 text-gold-600 hover:bg-gold-50">
                <Home size={18} /> Jelajahi Home Space
              </Button>
            </div>
          </div>

          <div className="absolute inset-0 opacity-5 bg-[url('/noise.svg')] pointer-events-none" />
        </motion.div>
      )}
    </div>
  );
}