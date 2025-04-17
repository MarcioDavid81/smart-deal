"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";
import { DataTable } from "@/components/ui/data-table";
import OrdersTableDropdownMenu from "./TableDropdownMenu";
import { OrderProps } from "@/types";

export function ListOrderTable() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const columns: ColumnDef<OrderProps>[] = [
    {
      accessorKey: "number",
      header: "Numero",
      cell: ({ row }) => <span className="uppercase">{row.original.number}</span>,
    },
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => <span className="uppercase">{row.original.type}</span>,
    },
    {
      accessorKey: "product",
      header: "Produto",
      cell: ({ row }) => <span className="uppercase">{row.original.product?.name}</span>,
    },
    {
      accessorKey: "customer",
      header: "Cliente",
      cell: ({ row }) => <span className="uppercase">{row.original.customer?.name}</span>,
    },
    {
      accessorKey: "quantity",
      header: "Quantidade",
      cell: ({ row }) => <span className="uppercase">{row.original.quantity}</span>,
    },
    {
      accessorKey: "price",
      header: "Preço (R$)",
      cell: ({ row }) => row.original.price.toFixed(2).replace(".", ","),
    },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const product = row.original;
  
        return (
          <OrdersTableDropdownMenu order={orders} />
        );
      },
    },
  ];

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3>Pedidos Cadastrados</h3>
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          <FaSpinner className="animate-spin mx-auto mb-2" size={24} />
          <p className="text-lg">Carregando pedidos...</p>
        </div>
      ) : (
        <DataTable columns={columns} data={orders} />
      )}
    </Card>
  );
}
