import { AlertColor } from "@mui/material";

export enum App {
  UPDATE_SNACKBAR = "app/UPDATE_SNACKBAR",
  OPEN_SIDE_DRAWER = "app/OPEN_SIDE_DRAWER"
}

export const updateSnackbar = (payload: { open: boolean; message: string; type: AlertColor}) => {
  return { type: App.UPDATE_SNACKBAR, payload }
}

export const openSideDrawer = (payload: boolean) => {
  return { type: App.OPEN_SIDE_DRAWER, payload };
}