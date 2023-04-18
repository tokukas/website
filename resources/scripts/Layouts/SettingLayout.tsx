import AppHead from '@/Components/AppHead';
import Sidebar from '@/Components/Drawer/Sidebar';
import { TPropsSidebarItem } from '@/Components/Drawer/Sidebar/Item';
import Navbar from '@/Components/Navbar';
import BaseLayout from '@/Layouts/BaseLayout';
import useTranslator from '@/Utils/Hooks/useTranslator';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TranslateIcon from '@mui/icons-material/Translate';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import route from 'ziggy-js';

const sidebarItems: TPropsSidebarItem[] = [
  {
    key: 'language',
    name: 'Language',
    icon: <TranslateIcon />,
    href: route('settings.language'),
  },
  {
    key: 'appearance',
    name: 'Appearance',
    icon: <DarkModeIcon />,
    href: route('settings.appearance'),
  },
];

export type SettingLayoutProps = {
  activeSidebarKey?: string;
  children?: React.ReactNode;
}

export default function SettingLayout({
  activeSidebarKey,
  children,
}: SettingLayoutProps) {
  const { __ } = useTranslator([
    'Appearance',
    'Language',
    'Settings',
  ]);

  const currentItem = React.useMemo(() => (
    sidebarItems.find((i) => i.key === activeSidebarKey)
    ?? sidebarItems[0]
  ), [activeSidebarKey]);

  return (
    <BaseLayout>
      <AppHead
        title={`${__('Settings')} - ${__(currentItem.name)}`}
        description=""
      />
      <Navbar maxWidth="xl" />
      <Box sx={{ display: 'flex', mt: '70px' }}>
        <Sidebar
          width={240}
          top={70}
          sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
          items={sidebarItems.map((item) => ({
            ...item,
            name: __(item.name),
          }))}
          selectedItem={activeSidebarKey}
        />
        <Box
          component="main"
          sx={{
            p: 3,
            flexGrow: 1,
            maxWidth: 'calc(100vw - 64px)',
          }}
        >
          <Breadcrumbs sx={{ mb: 2 }}>
            <Typography component="h1">
              {__('Settings')}
            </Typography>
            <Typography component="h2" color="text.primary">
              {__(currentItem.name)}
            </Typography>
          </Breadcrumbs>

          {children}
        </Box>
      </Box>
    </BaseLayout>
  );
}

SettingLayout.defaultProps = {
  activeSidebarKey: undefined,
  children: undefined,
};
