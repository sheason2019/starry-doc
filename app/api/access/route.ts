import { JWT_SECRET_KEY } from "@/app/env";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function GET(req: Request) {
  const jwtToken = req.headers.get("authorization");
  if (!jwtToken) return new Response(null, { status: 401 });

  const payload = jwt.verify(jwtToken, JWT_SECRET_KEY);
  console.log(payload);

  return NextResponse.json(payload);
}
