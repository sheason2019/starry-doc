import { prisma } from "../db";

export async function createWorkspace(userId: number, workSpaceName: string) {
  await verifyWorkspace(userId, workSpaceName);

  const record = await prisma.workSpace.create({
    data: {
      ownerId: userId,
      workSpaceName,
    },
  });

  return record;
}

async function verifyWorkspace(userId: number, workSpaceName: string) {
  const exist = await prisma.workSpace.findFirst({
    where: {
      ownerId: userId,
      workSpaceName,
    },
  });

  if (exist) {
    throw Error("Dumplicated workspace name");
  }
}
