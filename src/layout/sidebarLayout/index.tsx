import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AddShoppingCart, Inventory } from '@mui/icons-material';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectSideDrawerOpen } from '@/redux/selector/app';
import { openSideDrawer } from '@/redux/actions/app';
import { Typography } from '@mui/material';
import { selectCurrentUserRole } from '@/redux/selector/user';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: any
}

export default function ResponsiveDrawer(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const sideDrawerOpen = useAppSelector(selectSideDrawerOpen());
  const currentUserRole = useAppSelector(selectCurrentUserRole());

  const handleDrawerToggle = () => {
    dispatch(openSideDrawer(false));
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {/* {['My Orders'].map((text, index) => ( */}
        <ListItem key={'My Orders'} disablePadding>
          <Link href={"/"} style={{ textDecoration: "none", width: '100%', color: 'black' }}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={'My Orders'} />
            </ListItemButton>
          </Link>
        </ListItem>

        {
          (currentUserRole === "warehouse_admin" || currentUserRole === "warehouse_user") && (
            <ListItem key={'Create Order'} disablePadding>
              <Link href={"/stock"} style={{ textDecoration: "none", width: '100%', color: 'black' }}>
                <ListItemButton>
                  <ListItemIcon>
                    <Inventory />
                  </ListItemIcon>
                  <ListItemText primary={'My Warehouse'} />
                </ListItemButton>
              </Link>
            </ListItem>
          )
        }
        {/* ))} */}
      </List>
      {/* <Divider /> */}

      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={sideDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              // display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          {/* <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer> */}
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}