"use client";

import { SWRConfig } from "swr";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useJwt } from "../../store/use-jwt";

export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { jwt } = useJwt();

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, {
            ...(init ?? {}),
            headers: { authorization: jwt, ...(init?.header ?? {}) },
          }).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};
