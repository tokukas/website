import SidebarContext from '@/Components/Drawer/Sidebar/context';
import Link from '@/Components/Link';
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

export type TPropsSidebarItem = Omit<ListItemButtonProps, 'LinkComponent'> & {
  /** The name of sidebar item. */
  name: string;

  /** The icon of sidebar item. */
  icon: React.ReactNode;

  /** The href of sidebar item. */
  href?: string;
};

export default function SidebarItem({
  icon,
  name,
  sx,
  ...props
}: TPropsSidebarItem) {
  const { open } = React.useContext(SidebarContext);

  return (
    <ListItemButton
      sx={{
        height: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        ...sx,
      }}
      LinkComponent={Link}
      {...props}
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
};
