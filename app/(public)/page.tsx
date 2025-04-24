import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import HoverButton from "./_components/HoverButton";

export const metadata: Metadata = {
  keywords: [
    "gestão de contratos",
    "gestão de logística",
    "integração comercial e logística",
  ],
  description: "O seu sistema de gestão da comercial e logística",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Home</h1>
      <HoverButton>
        <Link href="/dashboard">Dashboard</Link>
      </HoverButton>
    </div>
  );
}
