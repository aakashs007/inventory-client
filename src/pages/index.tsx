import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import ResponsiveDrawer from '@/layout/sidebarLayout'
import EnhancedTable from '@/components/table'
import { Alert, Button, CircularProgress, Typography } from '@mui/material'
import { CustomAppBar } from '@/layout/appbarLayout'
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectSnackBar } from '@/redux/selector/app'
import { useEffect } from 'react'
import { updateSnackbar } from '@/redux/actions/app'
import { selectUserId, selectUserLoading, selectUserToken } from '@/redux/selector/user'
import { useRouter } from 'next/router'
import Backdrop from '@mui/material/Backdrop';
import { fetchAllProducts, fetchWarehouses, getOrders } from '@/redux/thunk/order'
import { selectAllOrders } from '@/redux/selector/order'
import { Container } from '@mui/system'
import { fetchUserList } from '@/redux/thunk/user'
import Overlays from '@/components/overlays'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const snackBarSelector = useAppSelector(selectSnackBar());
  const userId = useAppSelector(selectUserId());
  const userToken = useAppSelector(selectUserToken());
  const isLoading = useAppSelector(selectUserLoading());
  const allOrders = useAppSelector(selectAllOrders());

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    dispatch(updateSnackbar({ open: false, message: '', type: "success"}));
  }

  useEffect(() => {    
    dispatch(getOrders());
    dispatch(fetchAllProducts());
    dispatch(fetchUserList());
    dispatch(fetchWarehouses());
  }, []);

  useEffect(() => {
    if(!userId && !userToken) {
      router.push("/auth/sign_in");
    }
  }, [userId, userToken]);

  return (
    <>
      <Head>
        <title>iBox Inventory</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Overlays />
        {/* <Backdrop
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
        </Snackbar> */}

        <CustomAppBar />
        <ResponsiveDrawer />
        <Container>
          <EnhancedTable orders={allOrders} />
        </Container>
      </main>
    </>
  )
}
