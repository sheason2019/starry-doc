"use client";

import { useUser } from "@/app/shared/hooks/use-user";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createDocAction } from "./action";

export interface NewDocButtonProps {
  workSpaceId: number;
}

export function NewDocButton({ workSpaceId }: NewDocButtonProps) {
  const router = useRouter();
  const { jwt } = useUser();
  const [pending, startTransition] = useTransition();

  const handleCreateDoc = () => {
    startTransition(async () => {
      if (!jwt) return;

      try {
        const doc = await createDocAction(workSpaceId, jwt);
        router.push(`/doc/${doc.id}`);
      } catch (e) {
        console.error("create doc failed.", e);
      }
    });
  };

  return (
    <Button variant="contained" onClick={handleCreateDoc}>
      New Doc
    </Button>
  );
}
