import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled, Theme } from '@mui/material/styles';

const baseMixin = (
  theme: Theme,
  top?: number | string,
): CSSObject => ({
  top,
  height: `calc(100% - ${top ?? 0})`,
  overflowX: 'hidden',
});

const openedMixin = (
  theme: Theme,
  width?: number | string,
  top?: number | string,
): CSSObject => ({
  ...baseMixin(theme, top),
  width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme, top?: number | string): CSSObject => ({
  ...baseMixin(theme, top),
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export type ExpandableDrawerProps = {
  /**
   * The drawer width when expanded.
   *
   * @default 200
   */
  width?: string | number;

  /**
   * The drawer top position.
   *
   * @default 0
   */
  top?: string | number;
};

const ExpandableDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<ExpandableDrawerProps>(({
  theme, open, width = 200, top = 0,
}) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme, width, top),
    '& .MuiDrawer-paper': openedMixin(theme, width, top),
  }),
  ...(!open && {
    ...closedMixin(theme, top),
    '& .MuiDrawer-paper': closedMixin(theme, top),
  }),
}));

export default ExpandableDrawer;
