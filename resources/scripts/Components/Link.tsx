import { Link as InertiaLink } from '@inertiajs/inertia-react';
import MuiLink, { LinkProps } from '@mui/material/Link';
import * as React from 'react';

export type TPropsLink = Omit<LinkProps<'a'>, 'component'>;

/**
 * A custom Link component that wraps the [Material-UI Link](https://mui.com/material-ui/api/link)
 * component and the [Inertia.js Link](https://inertiajs.com/links) component.
 */
export default function Link({
  href, children, ...props
}: TPropsLink) {
  return (
    <MuiLink
      component={InertiaLink}
      href={href}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </MuiLink>
  );
}
