import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import MusicPlayer from "./components/ui/MusicPlayer"; // Import ini

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Sky Journey: A Birthday Surprise",
  description: "A magical journey for a special Sky Kid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {/* Music Player Global */}
        <MusicPlayer />
        
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}