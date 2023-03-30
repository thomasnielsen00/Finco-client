import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { MidlertidigTheme } from "../styles";

export default function Disclaimer() {
  const [openDialog, setOpenDialog] = useState(true);

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={MidlertidigTheme}>
      <div>
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>{"Disclaimer!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The Content on this site is for test purposes only, you should not
              construe any such information or other material as investment,
              financial, or other advice. Nothing contained on our site
              constitutes a solicitation, recommendation, endorsement, or offer
              by Finco or any third party service provider to buy or sell any
              securities in this jurisdiction or any other jurisdiction.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose} autoFocus>
              I understand
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
