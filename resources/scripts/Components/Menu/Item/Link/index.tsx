import Link from '@/Components/Link';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import * as React from 'react';

export type TPropsMenuItemLink = Omit<MenuItemProps<'a'>, 'component'>;

/**
 * The Link variant of the
 * [MenuItem](https://mui.com/material-ui/api/menu-item) component.
 *
 * This component is used to render a menu item that is a link.
 * Usefull inside a [Menu](https://mui.com/material-ui/api/menu) component.
 *
 * If the `href` prop is provided, the `component` prop will be set to `Link`.
 * Otherwise, the `component` prop will be set to `li`.
 */
export default function MenuItemLink({
  href, children, ...props
}: TPropsMenuItemLink) {
  return (
    <MenuItem
      href={href}
      component={href ? Link : 'li'}
      {...props}
    >
      {children}
    </MenuItem>
  );
}
