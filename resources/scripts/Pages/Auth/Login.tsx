import AppHead from '@/Components/AppHead';
import DismissSnackbarAction from '@/Components/DismissSnackbarAction';
import Link from '@/Components/Link';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/inertia-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import route from 'ziggy-js';

type TPropsLogin = {
  status: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: TPropsLogin) {
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  React.useEffect(() => () => {
    reset('password');
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      event.target.name as 'email' | 'password' | 'remember',
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value,
    );
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('login'));
  };

  const { enqueueSnackbar } = useSnackbar();

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
        title="Masuk"
        description="Masuk ke akun Tokukas Anda untuk mulai bertransaksi."
      />

      <form onSubmit={submit}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          value={data.email}
          fullWidth
          autoFocus
          autoComplete="email"
          onChange={onHandleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <TextField
          id="password"
          label="Password"
          variant="outlined"
          name="password"
          value={data.password}
          fullWidth
          type="password"
          autoComplete="current-password"
          onChange={onHandleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          sx={{ mt: 2.4 }}
        />

        <FormControlLabel
          label="Remember me"
          control={(
            <Checkbox
              id="remember"
              name="remember"
              checked={data.remember}
              onChange={onHandleChange}
            />
          )}
          sx={{ mt: 2.4 }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: {
              xs: 'center',
              sm: 'flex-start',
            },
            alignItems: 'center',
            flexWrap: 'wrap',
            mt: 2.4,
            gap: 2.4,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={processing}
          >
            Log in
          </Button>

          {canResetPassword && (
            <Link href={route('password.request')}>
              Forgot your password?
            </Link>
          )}
        </Box>
      </form>
    </GuestLayout>
  );
}
