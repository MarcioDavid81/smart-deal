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

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description, unit, price, quantity, companyId } = body;

    if (
      !name ||
      !unit ||
      price === undefined ||
      quantity === undefined ||
      !companyId
    ) {
      return NextResponse.json(
        { message: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    const product = await db.product.create({
      data: {
        name,
        description,
        unit,
        price,
        quantity,
        userId,
        companyId,
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
