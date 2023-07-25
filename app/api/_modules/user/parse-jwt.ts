import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "@/app/env";
import { User } from '@prisma/client';
import { prisma } from '../db';

export async function parseJwt(jwtToken: string) {
  const payload = jwt.verify(jwtToken, JWT_SECRET_KEY) as User;

  const user = await prisma.user.findUnique({
    where: { pkpHash: payload.pkpHash, id: payload.id },
  });

  return user;
}
