import LoveLetter from "../components/letter/LoveLetter";

export default function SurprisePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
      
      {/* Background Orbit (Gelap berbintang + Aurora) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#1B2735_0%,_#090A0F_100%)] z-0">
        {/* Aurora Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-lilac-900/20 to-sky-900/40 mix-blend-screen" />
        
        {/* Bintang Jatuh (CSS Animation) */}
        {/* Nanti bisa ditambah animasi CSS shooting star jika mau lebih detail */}
      </div>

      {/* Dekorasi Awan di Bawah */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-white/10 to-transparent blur-3xl z-0 pointer-events-none" />

      {/* Komponen Utama */}
      <div className="z-10 w-full flex justify-center">
        <LoveLetter />
      </div>
      
    </main>
  );
}