import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ListProductTable } from "./_components/ListProductTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos",
  keywords: ["gestão de contratos", "gestão de logística", "integração comercial e logística"],
  description: "O seu sistema de gestão da comercial e logística",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default function Products() {

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-primary">
      <div className="min-h-screen  w-full flex bg-found rounded-lg">
        <main className="flex-1 py-4 px-4 md:px-8 text-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h1>Produtos</h1>
            <Link href="/products/novo">
              <Button className="bg-secondary text-primary hover:bg-secondary/90">
                <PlusIcon className="h-4 w-4" aria-hidden="true" />
                Novo Produto
              </Button>
            </Link>
          </div>
          <ListProductTable />
        </main>
      </div>
    </div>
  );
}
