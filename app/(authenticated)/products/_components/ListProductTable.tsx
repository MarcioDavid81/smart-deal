"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";
import { ProductProps } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import ProductsTableDropdownMenu from "./TableDropdownMenu";
import { EditProductModal } from "./EditProductModal";

export function ListProductTable() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [product, setProduct] = useState<ProductProps | null>(null);


    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns: ColumnDef<ProductProps>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "description",
      header: "Descrição",
    },
    {
      accessorKey: "unit",
      header: "Unidade",
      cell: ({ row }) => <span className="uppercase">{row.original.unit}</span>,
    },
    {
      accessorKey: "quantity",
      header: "Estoque",
      cell: ({ row }) => (
        <Badge
          variant={row.original.quantity > 0 ? "default" : "outline"}
          className="dark:bg-primary dark:text-white"
        >
          {row.original.quantity}
        </Badge>
      ),
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

        return <ProductsTableDropdownMenu product={product} />;
      },
    },
  ];

  return (
    <Card className="p-4 dark:bg-primary">
      <div className="mb-4">
        <h3>Produtos Cadastrados</h3>
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          <FaSpinner className="animate-spin mx-auto mb-2" size={24} />
          <p className="text-lg">Carregando produtos...</p>
        </div>
      ) : (
        <DataTable columns={columns} data={products} />
      )}
      {/* Modais */}
      <EditProductModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        product={product}
        onUpdated={fetchProducts}
      />
    </Card>
  );
}
