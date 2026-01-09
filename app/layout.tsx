// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // Add this for CSS variable
});

export const metadata: Metadata = {
  title: "Lattis - Connect, Collaborate, Grow",
  description: "Lattis bridges the gap between ambitious students, innovative startups, and visionary investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}