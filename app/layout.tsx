import type { Metadata } from "next";
import '@fontsource/dm-sans'; 
import '@fontsource/inter'; 
import "./globals.css";

import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Airdropfest 2025",
  description: "World's Largest and First Crypto Airdrop Festival",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.className}>
      <body>{children}</body>
    </html>
  );
}