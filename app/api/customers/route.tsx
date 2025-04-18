import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    // Busca o usuário logado para obter o companyId
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.companyId) {
      return NextResponse.json({ message: "Usuário não está vinculado a uma empresa" }, { status: 403 });
    }

    // Busca os clientes da empresa do usuário
    const customers = await db.customer.findMany({
      where: { companyId: user.companyId },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json(
      { message: "Erro ao buscar clientes" },
      { status: 500 }
    );
  }
}