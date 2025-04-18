"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";
import { DataTable } from "@/components/ui/data-table";
import OrdersTableDropdownMenu from "./TableDropdownMenu";
import { CustomerProps } from "@/types";

export function ListCustomerTable() {
  const [orders, setOrders] = useState<CustomerProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/customers");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const columns: ColumnDef<CustomerProps>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => <span className="uppercase">{row.original.name}</span>,
    },
    {
      accessorKey: "adress",
      header: "Endereço",
      cell: ({ row }) => <span className="uppercase">{row.original.adress}</span>,
    },
    {
      accessorKey: "city",
      header: "Cidade",
      cell: ({ row }) => <span className="uppercase">{row.original.city}</span>,
    },
    {
      accessorKey: "state",
      header: "Estado",
      cell: ({ row }) => <span className="uppercase">{row.original.state}</span>,
    },
    {
      accessorKey: "ie",
      header: "Inscrição",
      cell: ({ row }) => <span className="uppercase">{row.original.ie}</span>,
    },
    {
      accessorKey: "cnpj",
      header: "CNPJ",
      cell: ({ row }) => <span className="uppercase">{row.original.cnpj}</span>,
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
        <h3>Clientes Cadastrados</h3>
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          <FaSpinner className="animate-spin mx-auto mb-2" size={24} />
          <p className="text-lg">Carregando clientes...</p>
        </div>
      ) : (
        <DataTable columns={columns} data={orders} />
      )}
    </Card>
  );
}
