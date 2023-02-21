import AppHead from '@/Components/AppHead';
import Link from '@/Components/Link';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import route from 'ziggy-js';

export default function Register() {
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  React.useEffect(() => () => {
    reset('password', 'password_confirmation');
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      event.target.name as (
        'name' | 'email' | 'password' | 'password_confirmation'
      ),
      event.target.value,
    );
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <GuestLayout>
      <AppHead
        title="Daftar"
        description="Buat akun Tokukas Anda sekarang untuk mulai bertransaksi."
      />

      <form onSubmit={submit}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          name="name"
          value={data.name}
          onChange={onHandleChange}
          fullWidth
          autoFocus
          autoComplete="name"
          required
          error={Boolean(errors.name)}
          helperText={errors.name}
        />

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          value={data.email}
          onChange={onHandleChange}
          fullWidth
          autoComplete="email"
          required
          error={Boolean(errors.email)}
          helperText={errors.email}
          sx={{ mt: 2.4 }}
        />

        <TextField
          id="password"
          label="Password"
          variant="outlined"
          name="password"
          value={data.password}
          onChange={onHandleChange}
          fullWidth
          type="password"
          autoComplete="new-password"
          required
          error={Boolean(errors.password)}
          helperText={errors.password}
          sx={{ mt: 2.4 }}
        />

        <TextField
          id="password_confirmation"
          label="Confirm Password"
          variant="outlined"
          name="password_confirmation"
          value={data.password_confirmation}
          onChange={onHandleChange}
          fullWidth
          type="password"
          autoComplete="new-password"
          required
          error={Boolean(errors.password_confirmation)}
          helperText={errors.password_confirmation}
          sx={{ mt: 2.4 }}
          disabled={!data.password}
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
            mt: 4,
            gap: 2.4,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={processing}
          >
            Register
          </Button>
          <Link href={route('login')}>
            Already registered?
          </Link>
        </Box>
      </form>
    </GuestLayout>
  );
}
