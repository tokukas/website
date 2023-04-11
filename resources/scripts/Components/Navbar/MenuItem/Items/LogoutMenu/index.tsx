import { TPropsNavMenuItem } from '@/Components/Navbar/MenuItem';
import { router } from '@inertiajs/react';
import LogoutIcon from '@mui/icons-material/Logout';
import * as React from 'react';
import route from 'ziggy-js';

const LogoutMenu: TPropsNavMenuItem = {
  name: 'Logout',
  icon: <LogoutIcon fontSize="small" />,
  onClick: (e) => {
    e.preventDefault();
    router.post(route('logout'));
  },
};

export default LogoutMenu;
