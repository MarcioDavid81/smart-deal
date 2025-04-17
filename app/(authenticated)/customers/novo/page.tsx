import { Button } from "@/components/ui/button";
import { GrReturn } from "react-icons/gr";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import NewCustomerForm from "../_components/NewCustomerForm";

export const metadata: Metadata = {
  title: "Novo Pedido",
  keywords: ["gestão de contratos", "gestão de logística", "integração comercial e logística"],
  description: "O seu sistema de gestão da comercial e logística",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default async function NovoProduto() {
  const { userId } = auth();

  if (!userId) return <div>Não autorizado</div>;

  const company = await db.company.findFirst({
    where: { userId },
    select: { id: true },
  });

  if (!company) return <div>Nenhuma empresa vinculada ao usuário.</div>;

  return (
    <div className="flex flex-col w-full min-h-screen bg-primary">
      <div className="min-h-screen  w-full flex bg-found rounded-lg">
        <main className="flex-1 py-4 px-4 md:px-8 text-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h1>Novo Ciente</h1>
            <Link href="/customers">
              <Button className="bg-secondary text-primary hover:bg-secondary/90">
                <GrReturn className="h-4 w-4" aria-hidden="true" />
                Voltar
              </Button>
            </Link>
          </div>
          <div className="bg-found p-6 rounded-xl shadow-md">
            <p>Preencha o formulário para criar um novo cliente.</p>
            <NewCustomerForm companyId={company.id} />
          </div>
        </main>
      </div>
    </div>
  );
}
