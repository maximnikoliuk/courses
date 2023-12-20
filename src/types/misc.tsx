import React, { SetStateAction, Dispatch } from 'react';
import { AlertColor } from "@mui/material";

export interface DialogData {
  open: boolean;
  type: string;
}

export interface AuthPopUpProps {
  dialogData: DialogData;
  setDialogData: Dispatch<SetStateAction<DialogData>>;
}

export interface SnackbarProps {
  open: boolean;
  type: AlertColor;
  message: string;
}

export interface SnackbarState {
  notificationSnackbar: SnackbarProps
}