import AppConfig from '@/Config/App';
import AuthContext from '@/Utils/AuthContext';
import ColorModeContext from '@/Utils/ColorModeContext';
import { useForm } from '@inertiajs/inertia-react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import route from 'ziggy-js';
import BrandLogo from './BrandLogo';
import Link from './Link';
import MenuItemLink from './MenuItemLink';

type TMenuItem = {
  name: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const MENU_ITEM_DIVIDER = 'DIVIDER';
const pages = ['Products', 'Pricing', 'Blog'];

export default function Navbar() {
  const [anchorElNav,
    setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser,
    setAnchorElUser] = React.useState<null | HTMLElement>(null);

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

  const { name: appName } = AppConfig;
  const { user } = React.useContext(AuthContext);
  const { post } = useForm();
  const [userMenuItems, setUserMenuItems] = React.useState<TMenuItem[]>([]);
  const { colorMode, toggleColorMode } = React.useContext(ColorModeContext);

  React.useEffect(() => {
    const divider = {
      name: MENU_ITEM_DIVIDER,
    };
    const settingsMenu = {
      name: 'Settings',
      href: route('settings'),
      icon: <SettingsIcon fontSize="small" />,
    };
    const themeMenu = {
      name: colorMode === 'light' ? 'Dark Mode' : 'Light Mode',
      icon: colorMode === 'light'
        ? <Brightness4Icon fontSize="small" />
        : <Brightness7Icon fontSize="small" />,
      onClick: toggleColorMode,
    };

    setUserMenuItems(user
      ? [
        {
          name: 'Dashboard',
          href: route('dashboard'),
          icon: <DashboardIcon fontSize="small" />,
        },
        settingsMenu,
        themeMenu,
        divider,
        {
          name: 'Logout',
          icon: <LogoutIcon fontSize="small" />,
          onClick: (e) => {
            if (e) {
              e.preventDefault();
            }
            post(route('logout'));
          },
        },
      ] : [
        {
          name: 'Login',
          href: route('login'),
          icon: <LoginIcon fontSize="small" />,
        },
        {
          name: 'Register',
          href: route('register'),
          icon: <AppRegistrationIcon fontSize="small" />,
        },
        themeMenu,
      ]);
  }, [user, colorMode]);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <BrandLogo
              height="1.5rem"
              width="auto"
              sx={{
                mr: 1,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
            />
            {appName}
          </Typography>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            component={Link}
            href="/"
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              color: 'inherit',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <BrandLogo
              height="1.5rem"
              width="auto"
              sx={{ mr: 1 }}
            />
            {appName}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'capitalize',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box>
            <Tooltip title={user ? 'Open settings' : 'Sign to App'}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user ? '/static/images/avatar/2.jpg' : ''}
                />
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
              {userMenuItems.map((menu, i) => {
                if (menu.name.includes(MENU_ITEM_DIVIDER)) {
                  // eslint-disable-next-line react/no-array-index-key
                  return <Divider key={`divider-${i}`} />;
                }
                return (
                  <MenuItemLink
                    key={menu.name}
                    href={menu.href}
                    onClick={(e) => {
                      if (menu.onClick) {
                        menu.onClick(e);
                      }
                      handleCloseUserMenu();
                    }}
                  >
                    {
                      menu.icon && (
                        <ListItemIcon>{menu.icon}</ListItemIcon>
                      )
                    }
                    <ListItemText>
                      {' '}
                      {menu.name}
                    </ListItemText>
                  </MenuItemLink>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
