import AppHead from '@/Components/AppHead';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/inertia-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import route from 'ziggy-js';

type TPropsResetPassword = {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: TPropsResetPassword) {
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
        title="Atur Ulang Kata Sandi"
        description="Buat kata sandi baru untuk akun Anda.
          Pastikan kata sandi Anda kuat dan mudah diingat."
      />

      <form onSubmit={submit}>
        <TextField
          id="email"
          label="Email"
          name="email"
          value={data.email}
          autoComplete="email"
          onChange={onHandleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
          variant="outlined"
          fullWidth
          disabled={Boolean(data.email)}
        />

        <TextField
          id="password"
          label="New Password"
          name="password"
          type="password"
          value={data.password}
          autoComplete="new-password"
          onChange={onHandleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          required
          variant="outlined"
          fullWidth
          autoFocus
          sx={{ mt: 2.4 }}
        />

        <TextField
          id="password_confirmation"
          label="Confirm New Password"
          name="password_confirmation"
          type="password"
          value={data.password_confirmation}
          autoComplete="new-password"
          onChange={onHandleChange}
          error={Boolean(errors.password_confirmation)}
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
          Reset Password
        </Button>
      </form>
    </GuestLayout>
  );
}
