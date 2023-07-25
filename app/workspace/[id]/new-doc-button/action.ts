'use server'

import { prisma } from "@/app/api/_modules/db"
import { parseJwt } from "@/app/api/_modules/user/parse-jwt";

export async function createDocAction(workSpaceId: number, jwt: string) {
  const user = await parseJwt(jwt);
  if (!user) {
    throw new Error('invalid jwt');
  }

  const doc = await prisma.doc.create({
    data: {
      workSpaceId,
      title: '',
      content: '',
      ownerId: user.id,
    }
  });

  return doc;
}
