import AppHead from '@/Components/AppHead';
import DismissSnackbarAction from '@/Components/Snackbar/Action/Dismiss';
import GuestLayout from '@/Layouts/GuestLayout';
import useTranslator from '@/Utils/Hooks/useTranslator';
import { useForm } from '@inertiajs/react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import route from 'ziggy-js';

type TPropsForgotPassword = {
  status: string;
}

export default function ForgotPassword({ status }: TPropsForgotPassword) {
  const { __ } = useTranslator([
    'Email',
    'Forgot your password?',
    'No problem',
    'view.auth.forgot_password.button_send',
    'view.auth.forgot_password.description',
  ]);

  const {
    data, setData, post, processing, errors,
  } = useForm({
    email: '',
  });

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData('email', event.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('password.email'));
  };

  const { enqueueSnackbar } = useSnackbar();

  // Display a notification if the reset password email has been sent.
  React.useEffect(() => {
    if (status) {
      enqueueSnackbar(status, {
        variant: 'success',
        action: DismissSnackbarAction,
        preventDuplicate: true,
      });
    }
  }, [status]);

  return (
    <GuestLayout>
      <AppHead
        title={__('Forgot your password?')}
        description={`${__('Forgot your password?')} ${__('view.auth.forgot_password.description')}`}
      />

      <Typography
        variant="h5"
        component="h1"
        sx={{ textAlign: 'center', mb: 3.2 }}
      >
        {__('Forgot your password?')}
        <br />
        {__('No problem')}
      </Typography>

      <Typography>
        {__('view.auth.forgot_password.description')}
      </Typography>

      <form onSubmit={submit}>
        <TextField
          id="email"
          label={__('Email')}
          variant="outlined"
          name="email"
          value={data.email}
          onChange={onHandleChange}
          fullWidth
          autoFocus
          autoComplete="email"
          required
          error={!!errors.email}
          helperText={errors.email}
          sx={{ my: 3.2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={processing}
          fullWidth
        >
          {__('view.auth.forgot_password.button_send')}
        </Button>
      </form>
    </GuestLayout>
  );
}
