"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CandleButton from './ui/CandleButton';
import { Sparkles } from 'lucide-react';

export default function SkyGate() {
  const router = useRouter();
  const [isLit, setIsLit] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleIgnite = () => {
    if (isLit) return;
    
    setIsLit(true);

    // FIX: Coba nyalakan musik global saat user berinteraksi pertama kali (klik lilin)
    // Ini mem-bypass kebijakan autoplay browser
    const audio = document.getElementById('global-bgm') as HTMLAudioElement;
    if (audio && audio.paused) {
      audio.play().catch(e => console.log("Audio play error", e));
    }
    
    // Animasi delay sebelum pindah
    setTimeout(() => {
      setIsExpanding(true);
    }, 1500);

    setTimeout(() => {
      router.push('/sky-home');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-dark overflow-hidden">
      
      {/* Background Ambience (Gua Gelap) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2c3e50_0%,_#050505_90%)] z-0" />
      
      {/* Partikel Debu Cahaya */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

      {/* --- GERBANG / BINGKAI UTAMA --- */}
      <AnimatePresence>
        {!isExpanding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
            className="relative z-10 p-12 border border-white/10 rounded-[100px_100px_0_0] bg-black/20 backdrop-blur-sm border-b-0 shadow-2xl"
          >
            {/* Dekorasi Bingkai Emas */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <Sparkles className="text-gold-400 opacity-60 animate-pulse" size={32} />
            </div>
            
            {/* Garis Pinggir Emas Tipis */}
            <div className="absolute inset-0 border-t-2 border-l border-r border-gold-500/20 rounded-[100px_100px_0_0] pointer-events-none" />

            <div className="flex flex-col items-center gap-10">
              
              {/* Teks Misterius */}
              <div className="text-center space-y-2">
                <h1 className="text-gold-100/80 font-serif text-2xl tracking-[0.2em] text-glow uppercase">
                  Isle of Memory
                </h1>
                <p className="text-white/40 text-xs font-sans tracking-widest uppercase">
                  Gate Locked
                </p>
              </div>
              
              {/* Tombol Lilin di Tengah Altar */}
              <div className="relative mt-4">
                <CandleButton onClick={handleIgnite} isLit={isLit} />
                
                {/* Lingkaran Sihir di Bawah Lilin */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-10 border border-gold-500/30 rounded-[100%] blur-[1px] animate-pulse-slow pointer-events-none" />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- EFEK TRANSISI --- */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isExpanding ? 200 : 0, 
          opacity: isExpanding ? 1 : 0 
        }}
        transition={{ 
          duration: 1.8, 
          ease: [0.64, 0, 0.78, 0] 
        }}
        className="absolute w-10 h-10 bg-white rounded-full z-50 pointer-events-none mix-blend-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanding ? 1 : 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed inset-0 bg-white z-[60] pointer-events-none"
      />

    </div>
  );
}