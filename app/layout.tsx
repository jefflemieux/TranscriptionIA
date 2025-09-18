import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transcription IA",
  description: "Faites la transcription en toute simplicité avec Transcription IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative w-full">
          <div className="flex flex-col items-center justify-center p-4 w-full">
            <Navbar />
            {children}
          </div >
        </div>
        <p className="text-center text-gray-500 text-sm my-2">
          &copy; {new Date().getFullYear()} Transcription IA. All rights reserved.
        </p>
      </body>
    </html>
  );
}
