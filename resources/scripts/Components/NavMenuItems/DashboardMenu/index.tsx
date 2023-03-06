import { TPropsNavMenuItem } from '@/Components/NavMenuItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import * as React from 'react';
import route from 'ziggy-js';

const DashboardMenu: TPropsNavMenuItem = {
  name: 'Dashboard',
  href: route('dashboard'),
  icon: <DashboardIcon fontSize="small" />,
};

export default DashboardMenu;
