import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Link from './Link';

export type TPropsSidebarItem = {
  /** The open state of sidebar. */
  open: boolean;

  /** The name of menu item. */
  name: string;

  /** The icon of menu item. */
  icon: React.ReactNode;

  /** The href of menu item. */
  href?: string;

  onClick?: React.MouseEventHandler;
};

export default function SidebarItem({
  open, name, icon, href, onClick,
}: TPropsSidebarItem) {
  return (
    <ListItem
      disablePadding
      sx={{ display: 'block' }}
    >
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
    </ListItem>
  );
}

SidebarItem.defaultProps = {
  href: undefined,
  onClick: undefined,
};
