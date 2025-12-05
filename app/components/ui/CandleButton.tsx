"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CandleButtonProps {
  onClick: () => void;
  isLit: boolean;
}

export default function CandleButton({ onClick, isLit }: CandleButtonProps) {
  return (
    <div className="relative flex flex-col items-center justify-center group" onClick={onClick}>
      
      {/* --- API LILIN (FLAME) --- */}
      <div className="absolute -top-12 z-20 flex justify-center w-full pointer-events-none">
        {/* Api Inti (Hanya muncul saat nyala) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isLit ? 1.2 : 0, 
            opacity: isLit ? 1 : 0 
          }}
          transition={{ duration: 0.4, type: "spring" }}
          className="relative"
        >
          {/* Main Flame Shape */}
          <div className="w-8 h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-white rounded-[50%] rounded-t-[0%] transform -rotate-45 origin-bottom animate-pulse-slow shadow-[0_0_20px_rgba(255,165,0,0.8)]" 
               style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} 
          />
          {/* Outer Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-orange-400/40 rounded-full blur-xl animate-pulse" />
        </motion.div>

        {/* Hint Api Kecil (Ghost Flame) saat hover belum nyala */}
        {!isLit && (
          <motion.div 
            className="absolute top-4 w-4 h-6 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          />
        )}
      </div>

      {/* --- BATANG LILIN (BODY) --- */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative w-20 h-32 cursor-pointer transition-all duration-500 z-10",
          "rounded-lg shadow-2xl",
          // Warna Merah Khas Sky Candle
          "bg-gradient-to-r from-red-700 via-red-600 to-red-700",
          // Efek Wax/Lelehan di atas
          "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-4 before:bg-red-400 before:rounded-[50%]",
          isLit ? "shadow-[0_0_60px_rgba(255,69,0,0.6)] brightness-110" : "brightness-75 hover:brightness-100"
        )}
      >
        {/* Sumbu Lilin */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-black/60 z-0" />
        
        {/* Teks Overlay pada Lilin */}
        {!isLit && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/50 font-serif text-xs uppercase tracking-widest rotate-90 whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">
              Tap to Light
            </span>
          </div>
        )}

        {/* Lelehan Lilin (Detail Visual) */}
        <div className="absolute top-3 left-2 w-2 h-8 bg-red-500/80 rounded-full opacity-80" />
        <div className="absolute top-2 right-3 w-1.5 h-5 bg-red-500/80 rounded-full opacity-80" />
      </motion.button>

      {/* --- REFLEKSI LANTAI --- */}
      <div className="absolute -bottom-4 w-24 h-4 bg-black/40 blur-md rounded-[100%]" />
      
    </div>
  );
}