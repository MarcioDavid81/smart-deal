import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  const { id } = params;

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description, unit, price, quantity, companyId } = body;

    const product = await db.product.update({
      where: {
        id: Number(id),
        userId,
      },
      data: {
        name,
        description,
        unit,
        price,
        quantity,
        companyId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json({ message: "Erro ao atualizar produto." }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  const { id } = params;

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    // Verifica se o produto pertence ao usuário
    const product = await db.product.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Produto não encontrado." }, { status: 404 });
    }

    await db.product.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: "Produto deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return NextResponse.json({ message: "Erro ao deletar produto." }, { status: 500 });
  }
}
