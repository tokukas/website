import {
  styled, Theme, CSSObject,
} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

const baseMixin = (): CSSObject => ({
  overflowX: 'hidden',
});

const openedMixin = (theme: Theme, width?: number | string): CSSObject => ({
  ...baseMixin,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width,
});

const closedMixin = (theme: Theme): CSSObject => ({
  ...baseMixin,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const ExpandableDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{width?: number | string}>(({ theme, open, width = 200 }) => ({
  width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme, width),
    '& .MuiDrawer-paper': openedMixin(theme, width),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default ExpandableDrawer;
