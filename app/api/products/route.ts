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

    // Busca os produtos da empresa do usuário
    const products = await db.product.findMany({
      where: { companyId: user.companyId },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  const { userId } = auth();

  // Verificação de autenticação
  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description, unit, price, quantity } = body;

    // Verificação dos campos obrigatórios
    if (!name || !unit || price === undefined || quantity === undefined) {
      return NextResponse.json(
        { message: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    // Recupera a empresa associada ao usuário logado (caso seja relevante no seu caso)
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { companyId: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }

    // Criação do produto, associando-o à empresa do usuário
    const product = await db.product.create({
      data: {
        name,
        description,
        unit,
        price,
        quantity,
        userId,
        companyId: user.companyId, // Associa o produto à empresa do usuário
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao cadastrar produto:", error.message, error);
    return NextResponse.json(
      { message: "Erro ao cadastrar produto.", error: error.message },
      { status: 500 }
    );
  }
}
