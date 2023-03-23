import { TPropsNavMenuItem } from '@/Components/Navbar/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import * as React from 'react';
import route from 'ziggy-js';

const SettingsMenu: TPropsNavMenuItem = {
  name: 'Settings',
  href: route('settings'),
  icon: <SettingsIcon fontSize="small" />,
};

export default SettingsMenu;
