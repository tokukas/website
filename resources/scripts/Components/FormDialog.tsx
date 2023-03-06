import { RequiredFor } from '@/Utils/Types';
import { useForm } from '@inertiajs/react';
import { ModalProps } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import React from 'react';
import DismissSnackbarAction from './DismissSnackbarAction';

export type TField = Record<string, string | number>;

type TFormDialogFieldProps<Field extends TField> = TextFieldProps & {
  /**
   * The name of field.
   */
  name: keyof Field;
  /**
   * The custom key to get validation message.
   */
  validationKey?: keyof Field;
};

export type TPropsFormDialog<Field extends TField> = RequiredFor<
  DialogProps, 'onClose' | 'title'
> & {
  /**
   * The description of form dialog.
   */
  description?: string;
  /**
   * Define the form fields with [TextFieldProps](https://mui.com/material-ui/api/text-field/#props).
   */
  formFields: readonly TFormDialogFieldProps<Field>[];
  /**
   * If present, will show the message on successfull form submit using `Snackbar` component.
   */
  messageOnSuccess?: string;
  /**
   * The form method.
   *
   * @default 'get'
   */
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  /**
   * Handle action after successfull form submit.
   *
   * The dialog will be closed automatically.
   */
  onSuccess?: () => void;
  /**
   * The form route destination.
   */
  route: string;
  /**
   * The name for submit button.
   *
   * @default Will follow the `title` prop.
   */
  submitButtonName?: string;
  /**
   * Set the default value.
   */
  values?: Field | null;
};

/**
 * The component to create form as a [Dialog](https://mui.com/material-ui/react-dialog/).
 *
 * The props in inherit to [MUI DialogProps](https://mui.com/material-ui/api/dialog/#props).
 */
export default function FormDialog<Field extends TField>({
  children,
  description,
  formFields,
  messageOnSuccess,
  method = 'get',
  onClose,
  onSuccess,
  route,
  submitButtonName,
  title,
  values,
  ...props
}: TPropsFormDialog<Field>) {
  const { enqueueSnackbar } = useSnackbar();

  const {
    clearErrors, data, errors, processing, reset, setData, wasSuccessful,
    ...inertiaForm
  } = useForm<Field>();

  const handleClose: ModalProps['onClose'] = (event, reason) => {
    clearErrors();
    reset();
    onClose(event, reason);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    inertiaForm[method](route);
  };

  React.useEffect(() => {
    if (values) {
      setData(values);
    } else {
      reset();
    }
  }, [values]);

  React.useEffect(() => {
    if (wasSuccessful) {
      if (messageOnSuccess) {
        enqueueSnackbar(messageOnSuccess, {
          variant: 'success',
          action: DismissSnackbarAction,
          preventDuplicate: true,
        });
      }
      onSuccess?.();
      handleClose({}, 'backdropClick');
    }
  }, [wasSuccessful]);

  return (
    <Dialog
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
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
            {formFields.map(({
              id, name, validationKey, ...fieldProps
            }) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...fieldProps}
                id={id}
                key={id ?? name}
                name={name}
                onChange={(event) => {
                  setData(
                    event.target.name,
                    event.target.value as Field[keyof Field],
                  );
                }}
                value={data[name] ?? values?.[name] ?? ''}
                error={Boolean(errors[validationKey ?? name])}
                helperText={errors[validationKey ?? name]}
              />
            ))}
          </Box>

          {children}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(event) => handleClose(event, 'backdropClick')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={processing}
          >
            {submitButtonName ?? title}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

FormDialog.defaultProps = {
  description: undefined,
  messageOnSuccess: undefined,
  method: 'get',
  onSuccess: undefined,
  submitButtonName: undefined,
  values: undefined,
};
