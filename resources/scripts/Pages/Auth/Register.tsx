import AppHead from '@/Components/AppHead';
import Link from '@/Components/Link';
import GuestLayout from '@/Layouts/GuestLayout';
import useTranslator from '@/Utils/Hooks/useTranslator';
import { useForm } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import route from 'ziggy-js';

export default function Register() {
  const { __ } = useTranslator([
    'Already registered?',
    'Confirm Password',
    'Create your Tokukas account now to start transacting.',
    'Email',
    'Name',
    'Password',
    'Register',
  ]);

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
        title={__('Register')}
        description={__(
          'Create your Tokukas account now to start transacting.',
        )}
      />

      <form onSubmit={submit}>
        <TextField
          id="name"
          label={__('Name')}
          variant="outlined"
          name="name"
          value={data.name}
          onChange={onHandleChange}
          fullWidth
          autoFocus
          autoComplete="name"
          required
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          id="email"
          label={__('Email')}
          variant="outlined"
          name="email"
          value={data.email}
          onChange={onHandleChange}
          fullWidth
          autoComplete="email"
          required
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mt: 2.4 }}
        />

        <TextField
          id="password"
          label={__('Password')}
          variant="outlined"
          name="password"
          value={data.password}
          onChange={onHandleChange}
          fullWidth
          type="password"
          autoComplete="new-password"
          required
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mt: 2.4 }}
        />

        <TextField
          id="password_confirmation"
          label={__('Confirm Password')}
          variant="outlined"
          name="password_confirmation"
          value={data.password_confirmation}
          onChange={onHandleChange}
          fullWidth
          type="password"
          autoComplete="new-password"
          required
          error={!!errors.password_confirmation}
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
            {__('Register')}
          </Button>
          <Link href={route('login')}>
            {__('Already registered?')}
          </Link>
        </Box>
      </form>
    </GuestLayout>
  );
}
