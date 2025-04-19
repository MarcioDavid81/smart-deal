import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "./_components/Sidebar";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { ptBR } from '@clerk/localizations'

const inter = Inter({
  weight: ["400", "700"],
  style: "normal",
  display: "swap",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Smart Deal - Integrando Comercial e Logística",
    template: "Smart Deal - %s",
  },
  keywords: [
    "gestão de contratos",
    "gestão de logística",
    "integração comercial e logística",
  ],
  description: "O seu sistema de gestão comercial e logística",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      localization={ptBR}
    >
      <html lang="pt-BR">
        <body
          className={`${inter.className} antialiased md:flex  w-full min-h-screen`}
        >
          <Sidebar />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
