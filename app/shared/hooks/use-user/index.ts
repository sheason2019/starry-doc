import { User } from "@prisma/client";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { useJwt } from "../../store/use-jwt";

export function useUser() {
  const { jwt } = useJwt();
  const config = useSWRConfig();
  const { data, error, mutate } = useSWRImmutable(!!jwt ? "/api/access" : null);

  useEffect(() => {
    mutate();
  }, [config.fetcher, mutate]);

  const user: User = data;

  return {
    jwt,
    user,
    error,
  }
}