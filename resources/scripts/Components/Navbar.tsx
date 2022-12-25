import AppConfig from '@/Config/App';
import AuthContext from '@/Utils/AuthContext';
import ColorModeContext from '@/Utils/ColorModeContext';
import { useForm } from '@inertiajs/inertia-react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import route from 'ziggy-js';
import BrandLogo from './BrandLogo';
import Link from './Link';
import NavMenuItem, { TPropsNavMenuItem } from './NavMenuItem';

export type TPropsNavbar = {
  /**
   * The navbar items.
   * If not provided, the default navbar items will be used.
   *
   * @default DEFAULT_NAV_ITEMS
   */
  navItems?: TPropsNavMenuItem[];

  /**
   * Whether to display the navbar items or not.
   *
   * @default false
   */
  withoutNavItems?: boolean;

  /**
   * The function to set the main user menus.
   *
   * @param isUserAuthenticated Whether the user is authenticated or not.
   * @returns The main user menus.
   */
  setMainUserMenus?: (isUserAuthenticated: boolean) => TPropsNavMenuItem[];
};

export const MENU_ITEM_DIVIDER: TPropsNavMenuItem = {
  name: 'DIVIDER',
};

export const DEFAULT_NAV_ITEMS: TPropsNavMenuItem[] = [
  { name: 'Tentang' },
  { name: 'FAQ' },
];

/**
 * The Navbar component.
 */
export default function Navbar({
  navItems = [], withoutNavItems, setMainUserMenus,
}: TPropsNavbar) {
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
  const [userMenus, setUserMenus] = React.useState<TPropsNavMenuItem[]>([]);
  const { colorMode, toggleColorMode } = React.useContext(ColorModeContext);

  let displayedNavItems = navItems.length ? navItems : DEFAULT_NAV_ITEMS;
  displayedNavItems = withoutNavItems ? [] : displayedNavItems;

  React.useEffect(() => {
    const themeMenu: TPropsNavMenuItem = {
      name: colorMode === 'light' ? 'Dark Mode' : 'Light Mode',
      icon: colorMode === 'light'
        ? <Brightness4Icon fontSize="small" />
        : <Brightness7Icon fontSize="small" />,
      onClick: toggleColorMode,
    };

    const mainUserMenus = setMainUserMenus
      ? setMainUserMenus(Boolean(user)) : [];

    setUserMenus(user
      ? [
        ...mainUserMenus,
        themeMenu,
        MENU_ITEM_DIVIDER,
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
        ...mainUserMenus,
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
              {displayedNavItems.map((navItem) => (
                <NavMenuItem
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...navItem}
                  key={navItem.name}
                  onClick={handleCloseNavMenu}
                />
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
            {displayedNavItems.map((navItem) => (
              <Button
                key={navItem.name}
                href={navItem.href}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'capitalize',
                }}
              >
                {navItem.name}
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
              {userMenus.map((menu, i) => {
                if (menu.name === MENU_ITEM_DIVIDER.name) {
                  // eslint-disable-next-line react/no-array-index-key
                  return <Divider key={`divider-${i}`} />;
                }
                return (
                  <NavMenuItem
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...menu}
                    key={menu.name}
                    onClick={(e) => {
                      if (menu.onClick) { menu.onClick(e); }
                      handleCloseUserMenu();
                    }}
                    inset={!menu.icon && userMenus.some((m) => m.icon)}
                  />
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Navbar.defaultProps = {
  navItems: undefined,
  withoutNavItems: false,
  setMainUserMenus: undefined,
};
