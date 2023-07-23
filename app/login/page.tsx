"use client";

import { Card, Button } from "@mui/material";
import { useUserStore } from "../shared/store/user";

export default function Login() {
  const userStore = useUserStore();
  const handleLogin = async () => {
    const resp = await fetch("/api/login");
    const reader = resp.body?.getReader();
    if (!reader) return;

    const { value: loginKeyBuf } = await reader.read();
    if (!loginKeyBuf) return;

    let loginKey = "";
    for (let i = 0; i < loginKeyBuf.length; i++) {
      loginKey += String.fromCharCode(loginKeyBuf[i]);
    }
    const targetUri = location.origin + "/api/login";
    window.open(`starry://login?targetUri=${targetUri}&loginKey=${loginKey}`);

    const { value: jwtBuf } = await reader.read();
    if (!jwtBuf) return;
    let jwt = "";
    for (let i = 0; i < jwtBuf.length; i++) {
      jwt += String.fromCharCode(jwtBuf[i]);
    }

    sessionStorage.setItem("jwt", jwt);
    userStore.setJwt(jwt);
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-gray-200">
      <Card sx={{ width: 320, height: 440 }} className="flex flex-col p-4">
        <h1 className="text-xl font-bold text-center mb-2 mt-0">用户登录</h1>
        <div className="flex flex-col flex-1 justify-center items-center">
          <Button onClick={handleLogin} variant="contained" className="w-48">
            客户端快速登录
          </Button>
        </div>
      </Card>
    </div>
  );
}
