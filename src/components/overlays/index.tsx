import { updateSnackbar } from "@/redux/actions/app";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSnackBar } from "@/redux/selector/app";
import { selectUserLoading } from "@/redux/selector/user";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";

export default function Overlays(props: any) {
  const dispatch = useAppDispatch();
  const snackBarSelector = useAppSelector(selectSnackBar());
  const isLoading = useAppSelector(selectUserLoading());

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    dispatch(updateSnackbar({ open: false, message: '', type: "success"}));
  }

  return (
    <>
        <Backdrop
          sx={{ color: '#fff', zIndex: 2000 }}
          open={isLoading}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar
          open={snackBarSelector?.open || false}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert severity={snackBarSelector?.type || "error"} sx={{ width: '100%' }} onClose={handleClose}>
            {snackBarSelector?.message || ""}
          </Alert>
        </Snackbar>    
    </>
  );
}