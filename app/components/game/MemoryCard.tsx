"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Star } from "lucide-react";

interface CardProps {
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export default function MemoryCard({ image, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <div 
      className="relative w-24 h-24 md:w-32 md:h-32 cursor-pointer perspective-1000" 
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* --- BAGIAN BELAKANG (Tutup / Cover) --- */}
        {/* Desain: Warna Gelap Sky + Ikon Bintang Emas */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg bg-gradient-to-br from-sky-dark to-slate-800 border-2 border-white/20 flex flex-col items-center justify-center group hover:border-gold-300/50 transition-colors"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Pattern Bintang Redup */}
          <div className="absolute inset-0 opacity-20 bg-[url('/noise.svg')] mix-blend-overlay" />
          
          {/* Ikon Tengah */}
          <div className="relative">
            <div className="absolute inset-0 bg-gold-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <Star className="text-gold-200 w-8 h-8 md:w-10 md:h-10 relative z-10 drop-shadow-md" fill="currentColor" />
          </div>
        </div>

        {/* --- BAGIAN DEPAN (Foto Kiky) --- */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-xl overflow-hidden border-2 border-gold-300 bg-white"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)" 
          }}
        >
          {/* Foto dengan rasio 1:1 */}
          <Image 
            src={image} 
            alt="Memory" 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 150px, 200px"
          />
          
          {/* Overlay Efek Match (Menang) */}
          {isMatched && (
            <div className="absolute inset-0 bg-gold-500/40 flex items-center justify-center animate-pulse">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1.2 }}
                className="bg-white/90 rounded-full p-2 shadow-lg"
              >
                <Sparkles className="text-gold-600 w-6 h-6" />
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}