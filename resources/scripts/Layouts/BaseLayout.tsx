import AuthContext, { AuthContextType } from '@/Utils/AuthContext';
import { usePage } from '@inertiajs/inertia-react';
import React from 'react';

type TPropsBaseLayout = {
  children?: React.ReactNode;
}

export default function BaseLayout({ children }: TPropsBaseLayout) {
  return (
    <AuthContext.Provider
      value={usePage().props.auth as AuthContextType}
    >
      {children}
    </AuthContext.Provider>
  );
}

BaseLayout.defaultProps = {
  children: null,
};
