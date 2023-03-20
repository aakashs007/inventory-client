import { RootState } from ".."

export const selectSnackBar = () => {
  return (state: RootState) => state.app.snackbar
}

export const selectSideDrawerOpen = () => {
  return (state: RootState) => state.app.sideDrawerOpen
}