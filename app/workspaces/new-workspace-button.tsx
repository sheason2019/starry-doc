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

export function NewWorkSpaceButton() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setShowDialog(true)}>
        New WorkSpace
      </Button>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <form>
          <DialogTitle>New WorkSpace</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Complete form then create a new workspace.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="WorkSpace Name"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button>Cancel</Button>
            <Button variant="contained">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
