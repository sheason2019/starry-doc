import { create } from "zustand";

export interface IJwtStore {
  jwt: string | null;
  setJwt(jwt: string | null): Promise<void>;
}

export const useJwt = create<IJwtStore>((set, get) => ({
  jwt: initJwt(),

  async setJwt(jwt: string | null) {
    set({ jwt });
  },
}));

function initJwt() {
  if (globalThis.localStorage && globalThis.sessionStorage) {
    return localStorage.getItem("jwt") ?? sessionStorage.getItem("jwt");
  } else {
    return null;
  }
}