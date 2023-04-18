import Link from '@/Components/Link';
import BrandLogo from '@/Components/Logo/Brand';
import NavMenuItem, { TPropsNavMenuItem } from '@/Components/Navbar/MenuItem';
import DashboardMenu from '@/Components/Navbar/MenuItem/Items/DashboardMenu';
import LoginMenu from '@/Components/Navbar/MenuItem/Items/LoginMenu';
import LogoutMenu from '@/Components/Navbar/MenuItem/Items/LogoutMenu';
import RegisterMenu from '@/Components/Navbar/MenuItem/Items/RegisterMenu';
import SettingsMenu from '@/Components/Navbar/MenuItem/Items/SettingsMenu';
import AppConfig from '@/Config/App';
import AuthContext from '@/Utils/AuthContext';
import useTranslator from '@/Utils/Hooks/useTranslator';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container, { ContainerProps } from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export type TPropsNavbar = AppBarProps & {
  /**
   * Determine the max-width of the navbar. The navbar width grows with the size of the screen. Set to false to disable maxWidth.
   *
   * @default 'lg'
   */
  maxWidth?: ContainerProps['maxWidth'];
  /**
   * The navbar items.
   * If not provided, the default navbar items will be used.
   *
   * Note: Navbar will try to translate the `name`, so make sure to provide
   * the translation key using `useTranslator` hook in parent component.
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
   * Note: Navbar will try to translate the `name`, so make sure to provide
   * the translation key using `useTranslator` hook in parent component.
   *
   * @param isUserAuthenticated Whether the user is authenticated or not.
   * @returns The main user menus.
   */
  setMainUserMenus?: (isUserAuthenticated: boolean) => TPropsNavMenuItem[];
};

export const DEFAULT_NAV_ITEMS: TPropsNavMenuItem[] = [
  { name: 'About' },
  { name: 'FAQ' },
];

export const MENU_ITEM_DIVIDER: TPropsNavMenuItem = {
  name: 'DIVIDER',
};

/**
 * The Navbar component.
 */
export default function Navbar({
  maxWidth,
  navItems,
  setMainUserMenus,
  withoutNavItems,
  ...props
}: TPropsNavbar) {
  const { __ } = useTranslator([
    'About',
    'Dashboard',
    'FAQ',
    'Login',
    'Logout',
    'Register',
    'Settings',
  ]);

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

  const [userMenus, setUserMenus] = React.useState<TPropsNavMenuItem[]>([]);
  const [displayedNavItems,
    setDisplayedNavItems] = React.useState<TPropsNavMenuItem[]>([]);

  React.useEffect(() => {
    if (withoutNavItems) {
      setDisplayedNavItems([]);
      return;
    }

    if (navItems && navItems.length) {
      setDisplayedNavItems(navItems);
      return;
    }

    setDisplayedNavItems(DEFAULT_NAV_ITEMS);
  }, [navItems, withoutNavItems]);

  React.useEffect(() => {
    const mainUserMenus = setMainUserMenus
      ? setMainUserMenus(!!user) : [];

    setUserMenus(user ? [
      DashboardMenu,
      SettingsMenu,
      ...mainUserMenus,
      MENU_ITEM_DIVIDER,
      LogoutMenu,
    ] : [
      LoginMenu,
      RegisterMenu,
      ...mainUserMenus,
      SettingsMenu,
    ]);
  }, [user]);

  return (
    <AppBar
      {...props}
    >
      <Container maxWidth={maxWidth}>
        <Toolbar
          disableGutters
          sx={{ justifyContent: 'space-between' }}
        >
          <Box
            sx={{
              display: (displayedNavItems.length
                ? { xs: 'flex', md: 'none' }
                : 'none'
              ),
            }}
          >
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
              open={!!anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {displayedNavItems.map((navItem) => (
                <NavMenuItem
                  {...navItem}
                  key={navItem.name}
                  name={__(navItem.name)}
                  onClick={handleCloseNavMenu}
                />
              ))}
            </Menu>
          </Box>

          {/* Brand */}
          <Link
            href="/"
            sx={{
              mr: 3.2,
              my: 2.4,
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              textDecoration: 'none',
              overflow: 'hidden',
            }}
          >
            <BrandLogo
              height="1.5rem"
              width="auto"
              sx={{ mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              fontWeight={700}
            >
              {appName}
            </Typography>
          </Link>

          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            gap: 1.6,
          }}
          >
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
                  fontSize: 'medium',
                }}
              >
                {__(navItem.name)}
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
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
            >
              {userMenus.map((menu, i) => {
                if (menu.name === MENU_ITEM_DIVIDER.name) {
                  // eslint-disable-next-line react/no-array-index-key
                  return <Divider key={`divider-${i}`} />;
                }
                return (
                  <NavMenuItem
                    {...menu}
                    key={menu.name}
                    name={__(menu.name)}
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
  maxWidth: 'lg',
  navItems: undefined,
  withoutNavItems: false,
  setMainUserMenus: undefined,
};
