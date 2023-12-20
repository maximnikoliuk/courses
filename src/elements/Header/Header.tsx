import React, { useState } from 'react';
import { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
import Stack from "@mui/material/Stack";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import tutor from '../../assests/tutor.svg';
import './header.scss';
import AuthDialog from '../AuthPopUp/AuthPopUp';
import { AUTH_OPERATIONS } from '../../utils/constants';
import { AuthContext } from '../../context/AuthContext';

const pages = ['Courses']; // Some dummy links can be here to do something important, but in the future :)


function Header () {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [dialogData, setDialogData] = useState({
    open: false,
    type: AUTH_OPERATIONS.LOGIN
  });
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { user } = context;

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Do I need something here?
      })
      .catch((error) => {
        console.log("Logout error: ", error);
      });
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (url: string) => {
    handleCloseNavMenu();
    navigate(url);
  }

  return (
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Icon fontSize={'large'} sx={{ height: 'auto', display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <img className='logo' src={tutor} alt='logo' />
            </Icon>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
              >
                {pages.map((page) => (
                    <MenuItem key={page} onClick={() => navigateTo('/')}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box>
            <Icon fontSize={'large'} sx={{ height: 'auto', display: { xs: 'flex', md: 'none' }, mr: 1, flexGrow: 1 }}>
              <img className='logo' src={tutor} alt='logo' />
            </Icon>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                  <Button
                      key={page}
                      onClick={() => navigateTo('/')}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {
                user ? <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => {
                      logout();
                      handleCloseUserMenu();
                    }}>
                      <Typography textAlign="center">Log out</Typography>
                    </MenuItem>
                  </Menu>
                </> : <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="small" color="secondary" onClick={() => {
                    setDialogData({
                      open: true,
                      type: AUTH_OPERATIONS.LOGIN
                    })}
                  }>Login</Button>
                  <Button variant="outlined" size="small" color="secondary" onClick={() => {
                    setDialogData({
                      open: true,
                      type: AUTH_OPERATIONS.CREATE
                    })}}>Create account</Button>
                </Stack>
              }
            </Box>
          </Toolbar>
        </Container>
        {
          dialogData.open ? (
            <AuthDialog
              dialogData={dialogData}
              setDialogData={setDialogData}
            />
          ) : ""
        }
      </AppBar>
  )
}

export default Header;