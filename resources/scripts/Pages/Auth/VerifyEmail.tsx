import AppHead from '@/Components/AppHead';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/inertia-react';
import Close from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SnackbarKey, useSnackbar } from 'notistack';
import * as React from 'react';
import route from 'ziggy-js';

type TPropsVerifyEmail = {
  status: string;
}

export default function VerifyEmail({ status }: TPropsVerifyEmail) {
  const { post, processing } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dismissSnackbarAction = (id: SnackbarKey) => (
    <Tooltip title="Dismiss" arrow>
      <IconButton
        color="inherit"
        size="small"
        onClick={() => closeSnackbar(id)}
      >
        <Close fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  // Display a notification to the user if the resend verification email was successful.
  React.useEffect(() => {
    if (status === 'verification-link-sent') {
      enqueueSnackbar(
        `A new verification link has been sent to the email address you
          provided during registration.`,
        {
          variant: 'success',
          action: dismissSnackbarAction,
          preventDuplicate: true,
        },
      );
    }
  }, [status]);

  return (
    <GuestLayout>
      <AppHead
        title="Verifikasi Email"
        description="Kami telah mengirimkan email verifikasi ke alamat
          email Anda. Silakan cek email Anda untuk melanjutkan."
      />

      <Typography
        variant="h5"
        component="h1"
        sx={{ textAlign: 'center', mb: 3.2 }}
      >
        Thanks for signing up!
      </Typography>

      <Typography>
        Before getting started, could you verify your email address by clicking
        on the link we just emailed to you? If you didn&apos;t receive the
        email, we will gladly send you another.
      </Typography>

      <Box
        sx={{
          mt: 4,
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          onClick={() => post(route('verification.send'))}
          disabled={processing}
          sx={{ flexGrow: 1 }}
        >
          Resend Verification Email
        </Button>

        <Button
          variant="outlined"
          onClick={() => post(route('logout'))}
          sx={{ flexGrow: 1 }}
        >
          Log Out
        </Button>
      </Box>
    </GuestLayout>
  );
}
