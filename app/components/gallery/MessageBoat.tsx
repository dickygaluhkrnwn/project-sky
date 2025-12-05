"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sailboat, X } from 'lucide-react';
import Image from 'next/image';

interface MessageBoatProps {
  image: string;
  caption: string;
  delay: number;
}

export default function MessageBoat({ image, caption, delay }: MessageBoatProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* --- ICON PERAHU (Floating) --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay * 0.2, duration: 1 }}
        className="relative group"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }} // Efek mengapung
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 2 // Randomize phase biar gak barengan
          }}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          {/* Cahaya Lilin di atas perahu */}
          <div className="w-2 h-2 bg-orange-400 rounded-full blur-[2px] animate-pulse absolute -top-1 left-1/2 -translate-x-1/2 z-10" />
          
          <div className="p-4 glass-button bg-white/10 hover:bg-white/30 border-white/20 text-white/80 hover:text-gold-300 transition-colors">
            <Sailboat size={32} strokeWidth={1.5} />
          </div>
          
          {/* Bayangan di air */}
          <div className="w-10 h-2 bg-black/20 rounded-full blur-sm" />
        </motion.button>
      </motion.div>

      {/* --- MODAL POPUP FOTO --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop Gelap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-sky-dark/80 backdrop-blur-sm"
            />

            {/* Content Card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl p-2 shadow-2xl border-4 border-gold-300"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 bg-white text-sky-dark rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors z-20"
              >
                <X size={20} />
              </button>

              {/* Bingkai Foto */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={image}
                  alt={caption}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Caption */}
              <div className="p-4 text-center">
                <p className="font-serif text-sky-dark text-lg italic">
                  &quot;{caption}&quot;
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}