import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import * as React from 'react';
import Link from './Link';

export type TPropsMenuItemLink = Omit<MenuItemProps<'a'>, 'component'>;

/**
 * The Link variant of the
 * [MenuItem](https://mui.com/material-ui/api/menu-item) component.
 *
 * This component is used to render a menu item that is a link.
 * Usefull inside a [Menu](https://mui.com/material-ui/api/menu) component.
 */
export default function MenuItemLink({
  children, ...props
}: TPropsMenuItemLink) {
  return (
    <MenuItem
      component={Link}
      ref={Link}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </MenuItem>
  );
}
