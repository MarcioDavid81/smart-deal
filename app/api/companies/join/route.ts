import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = auth();
  const { companyId } = await req.json();

  if (!userId) return new Response("Não autenticado", { status: 401 });

  const company = await db.company.findUnique({
    where: { id: companyId },
  });

  if (!company) return new Response("Empresa não encontrada", { status: 404 });

  await db.userCompany.create({
    data: {
      userId,
      companyId,
    },
  });

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      companyId,
    },
  });

  return Response.json({ companyId });
}
