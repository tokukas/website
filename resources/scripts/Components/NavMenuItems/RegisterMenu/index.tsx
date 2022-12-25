import { TPropsNavMenuItem } from '@/Components/NavMenuItem';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import * as React from 'react';
import route from 'ziggy-js';

const RegisterMenu: TPropsNavMenuItem = {
  name: 'Register',
  href: route('register'),
  icon: <AppRegistrationIcon fontSize="small" />,
};

export default RegisterMenu;
