import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../_modules/db";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const workspaces = await prisma.workSpace.findMany({
    where: {
      ownerId: Number(userId),
    }
  })

  return NextResponse.json(workspaces);
}
