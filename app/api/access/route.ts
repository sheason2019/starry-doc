import { User } from "@prisma/client";
import { JWT_SECRET_KEY } from "@/app/env";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "../modules/db";

export async function GET(req: Request) {
  const jwtToken = req.headers.get("authorization");
  if (!jwtToken) return new Response(null, { status: 401 });

  const payload = jwt.verify(jwtToken, JWT_SECRET_KEY) as User;

  const exist = await prisma.user.findUnique({
    where: { pkpHash: payload.pkpHash, id: payload.id },
  });
  if (!exist) {
    return new Response("Parse jwt failed", { status: 400 });
  }

  return NextResponse.json(exist);
}
