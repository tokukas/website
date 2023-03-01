import { RequiredFor } from '@/Utils/Types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import DismissSnackbarAction from './DismissSnackbarAction';

export type TPropsFormDialog<
  Fields extends Record<string, unknown>
> = RequiredFor<
  Omit<DialogProps, 'onSubmit'>,
  'children' | 'onClose' | 'title'
> & {
  /**
   * The description of form dialog.
   */
  description?: string;
  /**
   * Handle action after successfull form submit.
   *
   * The dialog will be closed automatically.
   */
  onSuccess?: () => void;
  /**
   * Handle form submit action.
   */
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  /**
   * Determine if the form is being submitted.
   *
   * @default false
   */
  processing?: boolean;
  /**
   * The name for submit button.
   *
   * @default Will follow the `title` prop.
   */
  submitButtonName?: string;
  /**
   * Determine if the form was successfully submitted.
   *
   * @default false
   */
  wasSuccessful?: boolean;
  /**
   * Set the default value.
   */
  values?: Fields;
};

/**
 * The component to create form as a [Dialog](https://mui.com/material-ui/react-dialog/).
 *
 * How to use:
 * - Put the form title in `title` prop.
 * - Put the form fields that will be displayed in `children` prop.
 * - Handle action to close the dialog in `onClose` prop.
 * - Handle action to submit the form in `onSubmit` prop.
 * - Handle action after the form sucessfully submitted in `onSuccess` prop.
 *
 * The props in inherit to [MUI DialogProps](https://mui.com/material-ui/api/dialog/#props).
 */
export default function FormDialog<Fields extends Record<string, unknown>>({
  children,
  description,
  onClose,
  onSubmit,
  onSuccess,
  processing,
  submitButtonName,
  title,
  wasSuccessful,
  ...props
}: TPropsFormDialog<Fields>) {
  const handleClose = () => {
    onClose?.({}, 'backdropClick');
  };

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (wasSuccessful) {
      enqueueSnackbar('Publisher successfully added', {
        variant: 'success',
        action: DismissSnackbarAction,
        preventDuplicate: true,
      });

      onSuccess?.();
      handleClose();
    }
  }, [wasSuccessful]);

  return (
    <Dialog
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onClose={onClose}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {description && (
            <DialogContentText sx={{ mb: 3 }}>
              {description}
            </DialogContentText>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {children}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={processing}>
            {submitButtonName ?? title}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

FormDialog.defaultProps = {
  description: undefined,
  onSuccess: undefined,
  processing: false,
  submitButtonName: undefined,
  wasSuccessful: false,
  values: undefined,
};
