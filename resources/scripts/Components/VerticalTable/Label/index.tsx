import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

/**
 * A styled [`Typography`](https://mui.com/material-ui/react-typography/) component for label in `VerticalTable` component.
 */
const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.fontSize,
  textTransform: 'capitalize',
}));

export default Label;
