"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { createWorkSpace } from "./action";

export function NewWorkSpaceButton() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setShowDialog(true)}>
        New WorkSpace
      </Button>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <form action={createWorkSpace}>
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
