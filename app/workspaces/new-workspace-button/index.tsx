"use client";

import { useState, useTransition } from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { createWorkSpaceAction } from "./action";
import { useUser } from "@/app/shared/hooks/use-user";

export function NewWorkSpaceButton() {
  const { jwt } = useUser();
  const [isPending, startTransition] = useTransition();

  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setShowDialog(true)}>
        New WorkSpace
      </Button>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <form
          action={(data) => {
            startTransition(async () => {
              try {
                const workspace = await createWorkSpaceAction(data);
                setShowDialog(false);
              } catch (e) {
                console.log(e);
              }
            });
          }}
        >
          <input hidden name="jwt" value={jwt ?? ""} readOnly />
          <DialogTitle>New WorkSpace</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Complete form then create a new workspace.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="WorkSpace Name"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
