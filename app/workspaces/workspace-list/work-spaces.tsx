"use client";

import useSWR from "swr";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useUser } from "@/app/shared/hooks/use-user";
import { WorkSpace } from "@prisma/client";
import { useEffect } from "react";

export function WorkSpaces() {
  const { user } = useUser();
  const { data, error, isLoading, mutate } = useSWR<WorkSpace[]>(
    user?.id ? `/api/workspaces/${user.id}` : null
  );

  return (
    <Grid container spacing={2}>
      {(data ?? []).map((ws) => (
        <Grid xs={4} key={ws.id}>
          {JSON.stringify(ws)}
        </Grid>
      ))}
    </Grid>
  );
}
