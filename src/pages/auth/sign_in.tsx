import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { authenticateUser, UserParams } from '@/redux/thunk/user';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUserId, selectUserToken } from '@/redux/selector/user';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { updateSnackbar } from '@/redux/actions/app';
import Image from 'next/image';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {/* <Link color="inherit" href="https://mui.com/"> */}
        iBox {' '}
      {/* </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId());
  const userToken = useAppSelector(selectUserToken());

  useEffect(() => {
    if(userId && userToken) {
      router.push("/");
      dispatch(updateSnackbar({ type: 'success', message: "Logged In", open: true }));
    }
  }, [userId, userToken]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const userParams: UserParams = {
      user: {
        email: data.get('email') as string,
        password: data.get('password') as string,        
      }
    }

    dispatch(authenticateUser(userParams));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
            {/* <LockOutlinedIcon /> */}
            <Image className='mb-4' src={"/ibox_logo.png"} width={100} height={50} alt={"iBox Logo"}/>
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}