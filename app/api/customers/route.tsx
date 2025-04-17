import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const orders = await db.customer.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json(
      { message: "Erro ao buscar clientes" },
      { status: 500 }
    );
  }
}