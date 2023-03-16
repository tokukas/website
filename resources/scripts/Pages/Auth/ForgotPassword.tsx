import AppHead from '@/Components/AppHead';
import DismissSnackbarAction from '@/Components/DismissSnackbarAction';
import GuestLayout from '@/Layouts/GuestLayout';
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
        title="Lupa Kata Sandi"
        description="Lupa kata sandi? Tidak masalah. Masukkan alamat email
          Anda di bawah ini dan kami akan mengirimkan tautan untuk mengatur
          ulang kata sandi Anda."
      />

      <Typography
        variant="h5"
        component="h1"
        sx={{ textAlign: 'center', mb: 3.2 }}
      >
        Forgot your password?
        <br />
        No problem.
      </Typography>

      <Typography>
        Just let us know your email address and we will email you a password
        reset link that will allow you to choose a new one.
      </Typography>

      <form onSubmit={submit}>
        <TextField
          id="email"
          label="Email"
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
          Email Password Reset Link
        </Button>
      </form>
    </GuestLayout>
  );
}
