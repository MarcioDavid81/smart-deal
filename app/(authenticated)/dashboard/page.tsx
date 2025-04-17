import { auth, currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';
import { db } from '@/lib/prisma';
import ProductsList from './_components/ProductsList';
import OrdersList from './_components/OrdersList';
import CustomersList from './_components/CustomersList';

export const metadata: Metadata = {
  title: "Dashboard",
  keywords: ["gestão de contratos", "gestão de logística", "integração comercial e logística"],
  description: "O seu sistema de gestão da comercial e logística",
  authors: [
    { name: "Marcio David", url: "https://md-webdeveloper.vercel.app" },
  ],
};

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();
  const companyId = user?.publicMetadata?.companyId as string;

  if (!companyId) {
    redirect('/empresa'); // redireciona pra criação/seleção de empresa
  }

  const [products, orders, customers] = await Promise.all([
    db.product.findMany({
      where: { companyId },
      orderBy: { name: "asc" },
    }),
    db.order.findMany({
      where: { companyId },
      orderBy: { date: "desc" },
    }),
    db.customer.findMany({
      where: { companyId },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-primary">
      <div className="min-h-screen w-full flex bg-found rounded-lg">
        <main className="flex-1 py-4 px-4 md:px-8 text-gray-800">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
          <ProductsList products={products} />
          <OrdersList orders={orders} />
          <CustomersList customers={customers} />
        </main>
      </div>
    </div>
  );
}
