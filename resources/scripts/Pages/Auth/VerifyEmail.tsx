import AppHead from '@/Components/AppHead';
import DismissSnackbarAction from '@/Components/Snackbar/Action/Dismiss';
import GuestLayout from '@/Layouts/GuestLayout';
import useTranslator from '@/Utils/Hooks/useTranslator';
import { useForm } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import route from 'ziggy-js';

type TPropsVerifyEmail = {
  status: string;
}

export default function VerifyEmail({ status }: TPropsVerifyEmail) {
  const { __ } = useTranslator([
    'Logout',
    'Resend Verification Email',
    'Verify Email Address',
    'view.auth.verify_email.confirm_verification',
    'view.auth.verify_email.thank_you_note',
    'view.auth.verify_email.notif_message',
    'We have sent a verification email to your email address.',
  ]);

  const { post, processing } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  // Display a notification to the user if the resend verification email was successful.
  React.useEffect(() => {
    if (status === 'verification-link-sent') {
      enqueueSnackbar(
        __('view.auth.verify_email.notif_message'),
        {
          variant: 'success',
          action: DismissSnackbarAction,
          preventDuplicate: true,
        },
      );
    }
  }, [status]);

  return (
    <GuestLayout>
      <AppHead
        title={__('Verify Email Address')}
        description={__(
          'We have sent a verification email to your email address.',
        )}
      />

      <Typography
        variant="h5"
        component="h1"
        sx={{ textAlign: 'center', mb: 3.2 }}
      >
        {__('view.auth.verify_email.thank_you_note')}
      </Typography>

      <Typography>
        {__('view.auth.verify_email.confirm_verification')}
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
          {__('Resend Verification Email')}
        </Button>

        <Button
          variant="outlined"
          onClick={() => post(route('logout'))}
          sx={{ flexGrow: 1 }}
        >
          {__('Logout')}
        </Button>
      </Box>
    </GuestLayout>
  );
}
