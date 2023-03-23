import { Link as InertiaLink } from '@inertiajs/react';
import MuiLink, { LinkProps } from '@mui/material/Link';
import * as React from 'react';

export type TPropsLink = Omit<LinkProps<'a'>, 'component'>;

/**
 * A custom Link component that wraps the [Material-UI Link](https://mui.com/material-ui/api/link)
 * component and the [Inertia.js Link](https://inertiajs.com/links) component.
 */
const Link = React.forwardRef((props: TPropsLink, ref) => (
  <MuiLink
    component={InertiaLink}
    ref={ref}
    {...props}
  >
    {props.children}
  </MuiLink>
));

export default Link;
