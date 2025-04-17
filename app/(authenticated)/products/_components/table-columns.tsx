"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductProps } from "@/types";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductsTableDropdownMenu from "./TableDropdownMenu";

export const columnsProducts: ColumnDef<ProductProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-left px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "unit",
    header: "Unidade",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return <span>R$ {price.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Estoque",
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"));
      return <span>{quantity}</span>;
    }
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <ProductsTableDropdownMenu product={product} />
      );
    },
  },
];
