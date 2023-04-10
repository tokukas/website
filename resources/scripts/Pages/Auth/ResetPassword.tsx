import AppHead from '@/Components/AppHead';
import GuestLayout from '@/Layouts/GuestLayout';
import useTranslator from '@/Utils/Hooks/useTranslator';
import { useForm } from '@inertiajs/react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import route from 'ziggy-js';

type TPropsResetPassword = {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: TPropsResetPassword) {
  const { __ } = useTranslator([
    'Confirm Password',
    'Create a new password for your account.',
    'Email',
    'New Password',
    'Reset Password',
  ]);

  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  React.useEffect(() => () => {
    reset('password', 'password_confirmation');
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      event.target.name as (
        'email' | 'password' | 'password_confirmation' | 'token'
      ),
      event.target.value,
    );
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('password.update'));
  };

  return (
    <GuestLayout>
      <AppHead
        title={__('Reset Password')}
        description={__('Create a new password for your account.')}
      />

      <form onSubmit={submit}>
        <TextField
          id="email"
          label={__('Email')}
          name="email"
          value={data.email}
          autoComplete="email"
          onChange={onHandleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          variant="outlined"
          fullWidth
          disabled={!!data.email}
        />

        <TextField
          id="password"
          label={__('New Password')}
          name="password"
          type="password"
          value={data.password}
          autoComplete="new-password"
          onChange={onHandleChange}
          error={!!errors.password}
          helperText={errors.password}
          required
          variant="outlined"
          fullWidth
          autoFocus
          sx={{ mt: 2.4 }}
        />

        <TextField
          id="password_confirmation"
          label={__('Confirm Password')}
          name="password_confirmation"
          type="password"
          value={data.password_confirmation}
          autoComplete="new-password"
          onChange={onHandleChange}
          error={!!errors.password_confirmation}
          helperText={errors.password_confirmation}
          disabled={!data.password}
          required
          variant="outlined"
          fullWidth
          sx={{ mt: 2.4 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={processing}
          sx={{ mt: 3.2 }}
          fullWidth
        >
          {__('Reset Password')}
        </Button>
      </form>
    </GuestLayout>
  );
}
