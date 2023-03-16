import AppHead from '@/Components/AppHead';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import route from 'ziggy-js';

export default function ConfirmPassword() {
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    password: '',
  });

  React.useEffect(() => () => {
    reset('password');
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData('password', event.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('password.confirm'));
  };

  return (
    <GuestLayout>
      <AppHead
        title="Konfirmasi Kata Sandi"
        description="Silakan masukkan kata sandi Anda untuk melanjutkan."
      />

      <Typography sx={{ mb: 4 }}>
        This is a secure area of the application. Please confirm your
        password before continuing.
      </Typography>

      <form onSubmit={submit}>
        <TextField
          id="password"
          label="Password"
          name="password"
          value={data.password}
          autoComplete="current-password"
          onChange={onHandleChange}
          error={!!errors.password}
          helperText={errors.password}
          required
          autoFocus
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={processing}
          sx={{ mt: 3.2 }}
          fullWidth
        >
          Confirm
        </Button>
      </form>
    </GuestLayout>
  );
}
