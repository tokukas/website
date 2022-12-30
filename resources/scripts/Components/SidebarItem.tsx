import { useForm } from '@inertiajs/inertia-react';
import ListItem from '@mui/material/ListItem';
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

export type TPropsSidebarItem = ListItemButtonProps & {
  /** The open state of sidebar. */
  open: boolean;

  /** The name of menu item. */
  name: string;

  /** The icon of menu item. */
  icon: React.ReactNode;

  /** The href of menu item. */
  href?: string;
};

export default function SidebarItem({
  open, name, icon, href, sx, onClick, ...props
}: TPropsSidebarItem) {
  const { get } = useForm();

  return (
    <ListItem
      disablePadding
      sx={{ display: 'block' }}
    >
      <ListItemButton
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        sx={{
          height: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          ...sx,
        }}
        onClick={(e) => {
          if (href) { get(href); }
          onClick?.(e);
        }}
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
};
