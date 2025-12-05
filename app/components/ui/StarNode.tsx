"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Link from 'next/link';

interface StarNodeProps {
  href: string;
  label: string;
  x: number; // Posisi X (persentase)
  y: number; // Posisi Y (persentase)
  delay?: number;
}

export default function StarNode({ href, label, x, y, delay = 0 }: StarNodeProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      // FIX: Tambahkan -translate-x-1/2 dan -translate-y-1/2 agar titik referensi ada di tengah elemen
      className="absolute flex flex-col items-center gap-2 z-20 group -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${y}%`, left: `${x}%` }}
    >
      <Link href={href} className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16">
        {/* Glow Effect Background */}
        <div className="absolute inset-0 bg-gold-400 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-300 animate-pulse-slow" />
        
        {/* Bintang Utama */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="relative z-10 text-gold-100 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
        >
          <Star size={32} fill="currentColor" className="text-gold-300" />
        </motion.div>
      </Link>

      {/* Label Text */}
      <span className="text-white font-serif text-sm md:text-base tracking-widest uppercase text-glow opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}