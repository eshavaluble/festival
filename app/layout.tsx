import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

const geistSans = GeistSans.variable;
const geistMono = GeistMono.variable;

export const metadata: Metadata = {
  title: "Airdropfest 2025",
  description: "World's Largest and First Crypto Airdrop Festival",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans} ${geistMono} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}