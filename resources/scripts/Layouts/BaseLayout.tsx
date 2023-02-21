import AuthContext, { AuthContextType } from '@/Utils/AuthContext';
import { usePage } from '@inertiajs/inertia-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';

type TPropsBaseLayout = {
  children?: React.ReactNode;
}

export default function BaseLayout({ children }: TPropsBaseLayout) {
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
