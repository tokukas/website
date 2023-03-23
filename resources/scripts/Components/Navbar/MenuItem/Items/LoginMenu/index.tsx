import { TPropsNavMenuItem } from '@/Components/Navbar/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import * as React from 'react';
import route from 'ziggy-js';

const LoginMenu: TPropsNavMenuItem = {
  name: 'Login',
  href: route('login'),
  icon: <LoginIcon fontSize="small" />,
};

export default LoginMenu;
