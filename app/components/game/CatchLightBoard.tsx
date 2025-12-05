"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CATCH_LIGHT_CONFIG } from '@/lib/data';
import { Sun, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Light {
  id: number;
  x: number; // Persentase left
  y: number; // Persentase top
  scale: number;
}

export default function CatchLightBoard() {
  const router = useRouter();
  const [lights, setLights] = useState<Light[]>([]);
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Refs untuk interval agar bisa dibersihkan
  const spawnInterval = useRef<NodeJS.Timeout | null>(null);

  // 1. Fungsi Spawn Light
  const spawnLight = () => {
    const newLight: Light = {
      id: Date.now(), // Unique ID based on timestamp
      x: Math.random() * 80 + 10, // 10% - 90% width
      y: Math.random() * 70 + 15, // 15% - 85% height
      scale: Math.random() * 0.5 + 0.8, // Random size
    };

    setLights((prev) => [...prev, newLight]);

    // Hapus light otomatis jika tidak diklik dalam 2 detik (Tantangan)
    setTimeout(() => {
      setLights((prev) => prev.filter(l => l.id !== newLight.id));
    }, 2000);
  };

  // 2. Start Game Loop
  useEffect(() => {
    if (gameStarted && !isWon) {
      spawnInterval.current = setInterval(spawnLight, CATCH_LIGHT_CONFIG.spawnRate);
    }

    return () => {
      if (spawnInterval.current) clearInterval(spawnInterval.current);
    };
  }, [gameStarted, isWon]);

  // 3. Handle Catch (Klik)
  const handleCatch = (id: number) => {
    // Play sound effect "ding" (optional later)
    setLights((prev) => prev.filter(l => l.id !== id));
    setScore((prev) => {
      const newScore = prev + 1;
      if (newScore >= CATCH_LIGHT_CONFIG.targetScore) {
        handleWin();
      }
      return newScore;
    });
  };

  const handleWin = () => {
    setIsWon(true);
    setLights([]); // Bersihkan layar
    if (spawnInterval.current) clearInterval(spawnInterval.current);
    
    // Confetti Emas
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#FFA500', '#ffffff']
    });
  };

  return (
    <div className="relative w-full max-w-4xl h-[60vh] md:h-[500px] glass-card border-sky-blue/30 bg-sky-dark/50 overflow-hidden mx-auto">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-sky-blue/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-lilac-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      {/* --- UI LAYER --- */}
      
      {/* Score Counter */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        <Sun size={20} className="text-gold-400 animate-spin-slow" />
        <span className="text-white font-serif font-bold">{score} / {CATCH_LIGHT_CONFIG.targetScore}</span>
      </div>

      {/* Start Button Overlay */}
      {!gameStarted && !isWon && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameStarted(true)}
            className="glass-button px-8 py-4 text-xl font-bold text-white flex items-center gap-2 bg-gold-500/20 hover:bg-gold-500/40 border-gold-300"
          >
            <Sparkles /> Start Collecting
          </motion.button>
          <p className="text-white/70 mt-4 text-sm">Tangkap {CATCH_LIGHT_CONFIG.targetScore} Winged Lights!</p>
        </div>
      )}

      {/* Win Overlay */}
      {isWon && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gold-500/10 backdrop-blur-md"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white font-bold mb-2 drop-shadow-lg">Winged Light Updated!</h2>
          <p className="text-gold-100 mb-8">Energi cahaya terkumpul.</p>
          <button
            onClick={() => router.push('/gallery')}
            className="glass-button px-8 py-3 bg-sky-blue/50 hover:bg-sky-blue/70 text-white font-bold flex items-center gap-2"
          >
            Enter Gallery <ArrowRight />
          </button>
        </motion.div>
      )}

      {/* --- GAME AREA (Lights) --- */}
      <AnimatePresence>
        {lights.map((light) => (
          <motion.div
            key={light.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: light.scale, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute cursor-pointer p-4 -m-4" // Hitbox lebih besar dari icon
            style={{ left: `${light.x}%`, top: `${light.y}%` }}
            onMouseDown={() => handleCatch(light.id)} // Support click & touch
          >
            {/* Visual Winged Light */}
            <div className="relative">
              <Sun 
                size={40} 
                fill="#ffd700" 
                className="text-gold-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] animate-pulse" 
              />
              {/* Kilauan di tengah */}
              <div className="absolute inset-0 bg-white blur-md opacity-50 rounded-full" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

    </div>
  );
}