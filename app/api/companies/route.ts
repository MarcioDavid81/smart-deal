import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId } = auth();
      
      if (!userId) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
      }
    try {
        const companies = await db.company.findMany();
        return NextResponse.json(companies);
    } catch (error) {
        console.error("Erro ao buscar empresas:", error);
        return NextResponse.json({ message: "Erro ao buscar empresas" }, { status: 500 });
    }
}