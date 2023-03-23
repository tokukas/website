import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { SnackbarKey, useSnackbar } from 'notistack';
import * as React from 'react';

export default function DismissSnackbarAction(key?: SnackbarKey) {
  const { closeSnackbar } = useSnackbar();

  return (
    <Tooltip title="Dismiss" arrow>
      <IconButton
        color="inherit"
        size="small"
        onClick={() => closeSnackbar(key)}
      >
        <Close fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
