import { create } from "zustand";

export interface IUserStore {
  jwt: string | null;
  pkpHash: string | null;
  setJwt(jwt: string): Promise<boolean>;
  init(): Promise<void>;
}

export const useUserStore = create<IUserStore>((set, get) => ({
  jwt: null,
  pkpHash: null,

  async setJwt(jwt: string) {
    set({ jwt: null, pkpHash: null });
    const resp = await fetch("/api/access", {
      headers: {
        authorization: jwt,
      },
    });
    if (resp.status === 200) {
      const payload = await resp.json();
      const pkpHash = payload.pkpHash;
      set({ jwt, pkpHash });
      sessionStorage.setItem("jwt", jwt);
      return true;
    } else {
      return false;
    }
  },

  async init() {
    const jwt = localStorage.getItem("jwt") ?? sessionStorage.getItem("jwt");
    if (jwt) {
      const success = await get().setJwt(jwt);
      if (!success) {
        localStorage.removeItem("jwt");
      }
    } else {
      localStorage.removeItem("jwt");
    }
  },
}));
