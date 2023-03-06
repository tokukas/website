import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

type DataProps = {
  /**
   * Implements style for empty data.
   */
  empty?: boolean;
}

/**
 * A styled [`Typography`](https://mui.com/material-ui/react-typography/) component for data in `VerticalTable` component.
 */
const Data = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'empty',
})<DataProps>(({
  theme, empty,
}) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
  ...(empty && {
    fontStyle: 'italic',
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
  }),
}));

export default Data;
