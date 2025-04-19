import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
  const { userId } = auth(); // Recupera o ID do usuário autenticado

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = params; // Obtém o ID do produto da URL
    const body = await req.json();
    const { name, description, unit, price, quantity, companyId } = body;

    // Verifica se os campos obrigatórios estão presentes
    if (!name || !unit || price === undefined || quantity === undefined || !companyId) {
      return NextResponse.json({ message: "Campos obrigatórios ausentes." }, { status: 400 });
    }

    // Verifica se o produto pertence à mesma empresa do usuário
    const product = await db.product.findUnique({
      where: { id },
      select: { companyId: true }, // Verifica o companyId do produto
    });

    if (!product) {
      return NextResponse.json({ message: "Produto não encontrado." }, { status: 404 });
    }

    // Se o usuário não for da mesma empresa, retorna erro
    if (product.companyId !== companyId) {
      return NextResponse.json({ message: "Acesso negado. Produto de outra empresa." }, { status: 403 });
    }

    // Atualiza o produto no banco de dados
    const updatedProduct = await db.product.update({
      where: { id },
      data: { name, description, unit, price, quantity, companyId },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao editar produto:", error.message, error);
    return NextResponse.json({ message: "Erro ao editar produto.", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
  const { userId } = auth(); // Recupera o ID do usuário autenticado

  if (!userId) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = params; // Obtém o ID do produto da URL

    // Verifica se o produto existe e se pertence à empresa do usuário
    const product = await db.product.findUnique({
      where: { id },
      select: { companyId: true }, // Verifica o companyId do produto
    });

    if (!product) {
      return NextResponse.json({ message: "Produto não encontrado." }, { status: 404 });
    }

    // Se o usuário não for da mesma empresa, retorna erro
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { companyId: true },
    });

    if (user?.companyId !== product.companyId) {
      return NextResponse.json({ message: "Acesso negado. Produto de outra empresa." }, { status: 403 });
    }

    // Deleta o produto do banco de dados
    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Produto excluído com sucesso." }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao excluir produto:", error.message, error);
    return NextResponse.json({ message: "Erro ao excluir produto.", error: error.message }, { status: 500 });
  }
}


