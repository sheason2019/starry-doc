"use client";

import useSWR from "swr";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useUser } from "@/app/shared/hooks/use-user";
import { WorkSpace } from "@prisma/client";
import { Paper } from "@mui/material";
import Link from "next/link";

export function WorkSpaces() {
  const { user } = useUser();
  const { data, error, isLoading, mutate } = useSWR<WorkSpace[]>(
    user?.id ? `/api/workspaces/${user.id}` : null
  );

  return (
    <Grid container spacing={2}>
      {(data ?? []).map((ws) => (
        <Grid xs={4} key={ws.id}>
          <WorkSpacePaper ws={ws} />
        </Grid>
      ))}
    </Grid>
  );
}

export function WorkSpacePaper({ ws }: { ws: WorkSpace }) {
  return (
    <Link href={`/workspace/${ws.id}`} className="no-underline">
      <Paper variant="outlined" className="hover:shadow-md p-4">
        <h5 className="text-xl m-0">{ws.workSpaceName}</h5>
      </Paper>
    </Link>
  );
}
