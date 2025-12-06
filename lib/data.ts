// Config Tanggal & Nama
export const ANNIVERSARY_DATE = "12 November"; 
export const TARGET_NAME = "Kiky";

// --- GAME 1: MEMORY CARDS (SPIRIT MEMORIES) ---
// Pastikan file di folder public/images/kiky/ bernama:
// mem1.jpg, mem2.jpg, mem3.jpg, mem4.jpg, mem5.jpg, mem6.jpg
export const MEMORY_CARDS = [
  { id: 1, img: "/images/kiky/mem1.jpg", alt: "Memory 1" },
  { id: 2, img: "/images/kiky/mem2.jpg", alt: "Memory 2" },
  { id: 3, img: "/images/kiky/mem3.jpg", alt: "Memory 3" },
  { id: 4, img: "/images/kiky/mem4.jpg", alt: "Memory 4" }, // Pastikan baris ini angka 4
  { id: 5, img: "/images/kiky/mem5.jpg", alt: "Memory 5" },
  { id: 6, img: "/images/kiky/mem6.jpg", alt: "Memory 6" },
];

// --- GAME 2: CATCH LIGHT ---
export const CATCH_LIGHT_CONFIG = {
  targetScore: 10,
  spawnRate: 1500,
};

// --- ISI SURAT ---
export const LOVE_LETTER_CONTENT = [
  "Hai Kiky, selamat ulang tahun!",
  "Di hari spesial ini, aku ingin ngajak kamu jalan-jalan sebentar mengenang momen-momen seru kita di Sky.",
  "Semoga harimu secerah Daylight Prairie dan setenang Starlight Desert.",
  "Let's fly higher together!",
];