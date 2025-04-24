import { Button } from "@/components/ui/button";
import { GrReturn } from "react-icons/gr";
import Link from "next/link";
import React from "react";
import NewProductForm from "../_components/NewProductForm";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import HoverButton from "../../_components/HoverButton";

export const metadata: Metadata = {
  title: "Novo Produto",
  keywords: ["gestão de contratos", "gestão de logística", "integração comercial e logística"],
  description: "O seu sistema de gestão da comercial e logística",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default async function NovoProduto() {
  const { userId } = auth();

  if (!userId) return <div>Não autorizado</div>;

  // Encontre o usuário e busque o companyId associado a ele
const user = await db.user.findUnique({
  where: { id: userId },
  select: { companyId: true },
});

if (!user?.companyId) {
  return <div>Usuário não possui uma empresa vinculada.</div>;
}

// Agora, use o companyId para buscar a empresa
const company = await db.company.findUnique({
  where: { id: user.companyId },
  select: { id: true },
});

if (!company) {
  return <div>Empresa não encontrada.</div>;
}

  return (
    <div className="flex flex-col w-full min-h-screen bg-found dark:bg-primary">
      <div className="min-h-screen  w-full flex bg-found rounded-lg">
        <main className="flex-1 py-4 px-4 md:px-8 text-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h1>Novo Produto</h1>
            <Link href="/products">
              <HoverButton >
                <GrReturn className="h-4 w-4" aria-hidden="true" />
                Voltar
              </HoverButton>
            </Link>
          </div>
          <div className="bg-found p-6 rounded-xl shadow-md">
            <p>Preencha o formulário para criar um novo produto.</p>
            <NewProductForm companyId={company.id} />
          </div>
        </main>
      </div>
    </div>
  );
}
