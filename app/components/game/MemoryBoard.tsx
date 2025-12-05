"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MEMORY_CARDS } from '@/lib/data';
import MemoryCard from './MemoryCard';
import confetti from 'canvas-confetti';
import { RefreshCcw, ArrowRight } from 'lucide-react';

interface GameCard {
  uniqueId: number;
  id: number;
  img: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryBoard() {
  const router = useRouter();
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);

  // 1. Persiapan Deck Kartu (Duplikasi & Acak)
  const shuffleCards = useCallback(() => {
    const duplicatedCards = [...MEMORY_CARDS, ...MEMORY_CARDS].map((card, index) => ({
      ...card,
      uniqueId: index, // ID unik untuk key React list
      isFlipped: false,
      isMatched: false,
    }));

    // Algoritma pengacakan Fisher-Yates
    const shuffled = duplicatedCards.sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlippedCards([]);
    setIsWon(false);
    setMoves(0);
  }, []);

  // 2. Jalankan saat pertama kali load
  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  // 3. Handle Klik Kartu
  const handleCardClick = (index: number) => {
    // Cegah klik jika: kartu sudah terbuka, sudah match, atau sedang ada 2 kartu terbuka
    if (cards[index].isFlipped || cards[index].isMatched || flippedCards.length >= 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    // Cek Match jika sudah 2 kartu terbuka
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      checkMatch(newFlipped[0], newFlipped[1], newCards);
    }
  };

  // 4. Cek Kecocokan
  const checkMatch = (index1: number, index2: number, currentCards: GameCard[]) => {
    const match = currentCards[index1].id === currentCards[index2].id;

    if (match) {
      // Jika Cocok: Tandai Matched, Reset Flipped Array
      const newCards = [...currentCards];
      newCards[index1].isMatched = true;
      newCards[index2].isMatched = true;
      setCards(newCards);
      setFlippedCards([]);

      // Cek Menang Semua
      if (newCards.every(card => card.isMatched)) {
        setTimeout(() => {
          setIsWon(true);
          triggerWinConfetti();
        }, 500);
      }
    } else {
      // Jika Tidak Cocok: Tutup kembali setelah 1 detik
      setTimeout(() => {
        setCards(prevCards => {
          const resetCards = [...prevCards];
          resetCards[index1].isFlipped = false;
          resetCards[index2].isFlipped = false;
          return resetCards;
        });
        setFlippedCards([]);
      }, 1000);
    }
  };

  // Efek Confetti Khas Sky (Warna Emas & Putih)
  const triggerWinConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffd700', '#ffffff', '#87CEEB']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffd700', '#ffffff', '#e0b0ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      
      {/* Header Info */}
      <div className="flex justify-between items-center w-full max-w-md bg-white/20 backdrop-blur-md p-3 rounded-full px-6 border border-white/30 text-sky-dark">
        <div className="font-serif font-bold">Moves: {moves}</div>
        <button 
          onClick={shuffleCards} 
          className="flex items-center gap-2 text-sm hover:text-white transition-colors"
        >
          <RefreshCcw size={16} /> Reset Spirit
        </button>
      </div>

      {/* Grid Kartu (Responsive: 3 kolom di HP, 4 di Tablet/PC) */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
        {cards.map((card, index) => (
          <MemoryCard
            key={card.uniqueId}
            image={card.img}
            isFlipped={card.isFlipped || card.isMatched}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {/* Modal Menang (Muncul di bawah) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isWon ? 1 : 0, y: isWon ? 0 : 20 }}
        className={`text-center space-y-4 ${isWon ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {isWon && (
          <div className="p-6 glass-card border-gold-300 bg-gold-100/20">
            <h2 className="text-2xl font-serif font-bold text-sky-dark mb-2">Spirit Relived! ✨</h2>
            <p className="text-sky-dark/80 mb-6">Semua kenangan telah terkumpul.</p>
            <button 
              onClick={() => router.push('/games/catch-light')}
              className="glass-button px-8 py-3 flex items-center gap-2 text-sky-dark font-semibold mx-auto bg-gold-300/50 hover:bg-gold-400/60"
            >
              Next: Catch Light <ArrowRight size={18} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}