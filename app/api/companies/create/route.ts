import { db } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = auth();
  const { name } = await req.json();

  if (!userId) return new Response("Não autenticado", { status: 401 });

  const company = await db.company.create({
    data: { name },
  });

  await db.userCompany.create({
    data: {
      userId,
      companyId: company.id,
    },
  });

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      companyId: company.id,
    },
  });

  return Response.json({ companyId: company.id });
}
