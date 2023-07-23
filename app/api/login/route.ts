import { createHmac, createVerify, randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { Completer } from "../modules/completer";
import { JWT_SECRET_KEY } from "@/app/env";

interface LoginCtx {
  loginKey: string;
  clp: Completer<ClientLoginPayload>;
  done: Completer<void>;
}
interface ClientLoginPayload {
  loginKey: string;
  clientKey: string;
  pubKeyPem: string;
  loginSig: string;
}

const loginMap = new Map<string, LoginCtx>();

async function* loginIterator() {
  const loginKey = randomUUID();
  const clpCompleter = new Completer<ClientLoginPayload>();
  const doneCompleter = new Completer<void>();
  loginMap.set(loginKey, {
    loginKey,
    clp: clpCompleter,
    done: doneCompleter,
  });

  yield loginKey;

  const clp = await clpCompleter.promise;

  // 根据 PubKeyPem 创建 JWT
  const hash = createHmac("sha256", "");
  hash.update(clp.pubKeyPem);
  const pkpHash = hash.digest("base64");

  const token = jwt.sign({ pkpHash }, JWT_SECRET_KEY);
  yield token;

  doneCompleter.complete();
}

// 创建登录请求
export async function GET() {
  const iterator = loginIterator();

  return new Response(
    new ReadableStream({
      async pull(controller) {
        const { value, done } = await iterator.next();
        if (done) {
          controller.close();
        } else {
          const arr = [...new Array(value.length)].map((_, index) =>
            value.charCodeAt(index)
          );
          controller.enqueue(new Uint8Array(arr));
        }
      },
    })
  );
}

export async function POST(req: Request) {
  const clp: ClientLoginPayload = await req.json();
  const ctx = loginMap.get(clp.loginKey);
  if (!ctx) {
    return new Response("Login context not found.", { status: 400 });
  }

  // 校验请求签名
  const signedText = clp.loginKey + clp.clientKey;
  const { pubKeyPem, loginSig } = clp;
  const verify = createVerify("SHA256");
  verify.update(signedText, "utf-8");
  verify.end();
  const valid = verify.verify(pubKeyPem, Buffer.from(loginSig, "base64"));
  if (valid) {
    ctx.clp.complete(clp);
    await ctx.done.promise;
    return new Response("OK");
  } else {
    ctx.clp.reject("verify signature error");
    return new Response("Login signature verify error.", { status: 400 });
  }
}
