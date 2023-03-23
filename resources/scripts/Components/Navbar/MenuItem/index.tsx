import MenuItemLink, { TPropsMenuItemLink } from '@/Components/Menu/Item/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

export type TPropsNavMenuItem = TPropsMenuItemLink & {
  /** The name of menu item. */
  name: string;

  /** The icon of menu item. */
  icon?: React.ReactNode;

  /**
   * If true, the children are indented.
   * This should be used if there is no left avatar or left icon.
   *
   * @default false
   */
  inset?: boolean;
};

export default function NavMenuItem({
  name, icon, inset, children, ...props
}: TPropsNavMenuItem) {
  return (
    <MenuItemLink
      {...props}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText inset={inset}>{name}</ListItemText>
      {children}
    </MenuItemLink>
  );
}

NavMenuItem.defaultProps = {
  icon: undefined,
  inset: false,
};
