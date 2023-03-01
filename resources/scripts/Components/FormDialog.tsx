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
import * as React from 'react';

type TFormDialogFieldProps<
  Fields extends Record<string, unknown>
> = TextFieldProps & {
  /**
   * The name of field.
   */
  name: keyof Fields;
  /**
   * The custom key to get validation message.
   */
  validationKey?: keyof Fields;
};

export type TPropsFormDialog<
  Fields extends Record<string, unknown>
> = RequiredFor<DialogProps, 'onClose' | 'title'> & {
  /**
   * The description of form dialog.
   */
  description?: string;
  /**
   * Define the form fields with [TextFieldProps](https://mui.com/material-ui/api/text-field/#props).
   */
  formFields: readonly TFormDialogFieldProps<Fields>[];
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
  values?: Fields;
};

/**
 * The component to create form as a [Dialog](https://mui.com/material-ui/react-dialog/).
 *
 * The props in inherit to [MUI DialogProps](https://mui.com/material-ui/api/dialog/#props).
 */
export default function FormDialog<Fields extends Record<string, unknown>>({
  children,
  description,
  formFields,
  method = 'get',
  onClose,
  onSuccess,
  route,
  submitButtonName,
  title,
  values,
  ...props
}: TPropsFormDialog<Fields>) {
  const {
    clearErrors, data, errors, processing, reset, setData, wasSuccessful,
    ...inertiaForm
  } = useForm<Fields>(values);

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
    if (wasSuccessful) {
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
                    event.target.name as keyof Fields,
                    event.target.value as Fields[keyof Fields],
                  );
                }}
                value={data[name] ?? ''}
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
  method: 'get',
  onSuccess: undefined,
  submitButtonName: undefined,
  values: undefined,
};
