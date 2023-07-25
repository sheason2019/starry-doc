import { NextRequest } from "next/server";
import { prisma } from "../../_modules/db";

export async function GET(req: NextRequest, { params }: { params: { workSpaceId: string } }) {
  const id = Number(params.workSpaceId);
  const docs = await prisma.doc.findMany({ where: { workSpaceId: id } });

  return docs;
}