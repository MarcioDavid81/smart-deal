import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'
import { ListCustomerTable } from './_components/ListCustomerTable';
import HoverButton from '../_components/HoverButton';

export const metadata: Metadata = {
  title: "Clientes",
  keywords: ["gestão de contratos", "gestão de logística", "integração comercial e logística"],
  description: "O seu sistema de gestão da comercial e logística",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default function Customers() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-found dark:bg-primary">
        <div className="min-h-screen  w-full flex bg-found rounded-lg">
          <main className="flex-1 py-4 px-4 md:px-8 text-gray-800">
          <div className="flex justify-between items-center mb-6">
              <h1>Clientes</h1>
              <Link href="/customers/novo">
              <HoverButton>
                <PlusIcon className="h-4 w-4" aria-hidden="true" />
                Novo Cliente
              </HoverButton>
            </Link>
            </div>
            <ListCustomerTable />
          </main>
        </div>
      </div>
  )
}
