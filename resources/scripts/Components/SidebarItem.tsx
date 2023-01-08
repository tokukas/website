import SidebarContext from '@/Utils/SidebarContext';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Link from './Link';

export type TPropsSidebarItem = {
  /** The name of menu item. */
  name: string;

  /** The icon of menu item. */
  icon: React.ReactNode;

  /** The href of menu item. */
  href?: string;

  onClick?: React.MouseEventHandler;
};

export default function SidebarItem({
  name, icon, href, onClick,
}: TPropsSidebarItem) {
  const { open } = React.useContext(SidebarContext);

  return (
    <ListItemButton
      sx={{
        height: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
      onClick={onClick}
      component={href ? Link : 'div'}
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...(href ? { href } : {})}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={name}
        sx={{ opacity: open ? 1 : 0 }}
      />
    </ListItemButton>
  );
}

SidebarItem.defaultProps = {
  href: undefined,
  onClick: undefined,
};
