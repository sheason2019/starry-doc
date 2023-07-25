import { NextResponse } from "next/server";
import { parseJwt } from "../_modules/user/parse-jwt";

export async function GET(req: Request) {
  const jwtToken = req.headers.get("authorization");
  if (!jwtToken) return new Response(null, { status: 401 });

  const user = await parseJwt(jwtToken);

  if (!user) {
    return new Response("Parse jwt failed", { status: 400 });
  }

  return NextResponse.json(user);
}
