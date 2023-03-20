import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, capitalize, Menu, MenuItem, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutUser } from '@/redux/actions/user';
import { useRouter } from 'next/router';
import { deepPurple } from '@mui/material/colors';
import { selectSideDrawerOpen } from '@/redux/selector/app';
import { openSideDrawer } from '@/redux/actions/app';
import { selectUserEmail } from '@/redux/selector/user';

export function CustomAppBar(props: any) {
  const dispath = useAppDispatch();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [profileViewOpen, setProfileViewOpen] = React.useState(false);
  const [drawerWidth, setDrawerWidth] = React.useState(240);
  const sideDrawerOpen = useAppSelector(selectSideDrawerOpen());
  const userEmail = useAppSelector(selectUserEmail());

  React.useEffect(() => {
    setDrawerWidth(props?.drawerWidth);
  }, [props?.drawerWidth])

  const handleDrawerToggle = () => {
    // setMobileOpen(!mobileOpen);
    dispath(openSideDrawer(!sideDrawerOpen));
  };

  const handleProfileView = (open: boolean) => {
    setProfileViewOpen(open);
  }

  const signOutUser = () => {
    dispath(logoutUser());
    router.replace("/auth/sign_in");
  }

  const getUserFirstLetter = () => {
    if(userEmail && userEmail.length) {
      return capitalize(userEmail[0]);
    }

    return 'U';
  }

  return (
    <AppBar
    position="fixed"
    // sx={{
    //   width: { sm: `calc(100% - ${drawerWidth}px)` },
    //   ml: { sm: `${drawerWidth}px` },
    // }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          // sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          iBox Inventory
        </Typography>
    
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={() => { handleProfileView(true)}} sx={{ p: 0 }}>
              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{getUserFirstLetter()}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={profileViewOpen}
            onClose={() => { handleProfileView(false) }}
          >
            {/* <MenuItem key={"Profile"} onClick={() => {}}>
              <Typography textAlign="center">{'Profile'}</Typography>
            </MenuItem> */}

            <MenuItem key={"Logout"} onClick={signOutUser}>
              <Typography textAlign="center">{'Logout'}</Typography>
            </MenuItem>            
          </Menu>
        </Box>          
      </Toolbar>
    </AppBar>
  );
}