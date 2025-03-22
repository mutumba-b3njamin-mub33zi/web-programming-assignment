import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Logout as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { mode, toggleTheme } = useCustomTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Jobs', icon: <WorkIcon />, path: '/jobs' },
    ...(isAuthenticated
      ? [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
          ...(user?.role === 'employer'
            ? [{ text: 'Post Job', icon: <AddIcon />, path: '/post-job' }]
            : []),
          { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
        ]
      : []),
  ];

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h4"
          noWrap
          component="div"
          onClick={() => navigate('/')}
          sx={{
            flexGrow: 1,
            color: 'white',
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            background: 'linear-gradient(45deg, #ffffff 30%, #e0e0e0 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            '&:hover': {
              background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }
          }}
        >
          Applier
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {menuItems.map((item) => (
            <IconButton
              key={item.text}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.icon}
            </IconButton>
          ))}
          
          <IconButton onClick={toggleTheme} sx={{ color: 'white' }}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.firstName?.[0] || user?.email?.[0] || 'U'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 