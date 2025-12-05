"use client";

import React, { useState, useRef } from 'react';
import { Music, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* id="global-bgm" -> Biar bisa "ditembak" oleh SkyGate
        onPlay & onPause -> Biar tombol ini otomatis berubah statusnya
        saat musik dinyalakan dari luar (SkyGate)
      */}
      <audio 
        id="global-bgm" 
        ref={audioRef} 
        src="/music/song.mp3" 
        loop 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`p-3 rounded-full shadow-lg border border-white/30 backdrop-blur-md transition-all duration-500 ${
          isPlaying 
            ? "bg-gold-400/80 text-white animate-[pulse_3s_infinite]" 
            : "bg-white/20 text-white/70 hover:bg-white/40"
        }`}
      >
        {isPlaying ? <Pause size={20} /> : <Music size={20} />}
      </motion.button>
    </div>
  );
}