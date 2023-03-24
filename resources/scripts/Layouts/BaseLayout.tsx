import DismissSnackbarAction from '@/Components/Snackbar/Action/Dismiss';
import AuthContext, { AuthContextType } from '@/Utils/AuthContext';
import { usePage } from '@inertiajs/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSnackbar } from 'notistack';
import React from 'react';

type TPropsBaseLayout = {
  children?: React.ReactNode;
}

type TPropsFlash = {
  message: string | null;
  status: 'success' | 'error' | 'warning' | null;
}

export default function BaseLayout({ children }: TPropsBaseLayout) {
  const { enqueueSnackbar } = useSnackbar();
  const flash = usePage().props.flash as TPropsFlash;

  React.useEffect(() => {
    if (flash.status) {
      enqueueSnackbar(flash.message ?? flash.status, {
        variant: flash.status,
        action: DismissSnackbarAction,
        preventDuplicate: true,
      });
    }
  }, [flash]);

  return (
    <AuthContext.Provider
      value={usePage().props.auth as AuthContextType}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </AuthContext.Provider>
  );
}

BaseLayout.defaultProps = {
  children: null,
};
