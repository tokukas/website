import AppHead, { TPropsAppHead } from '@/Components/AppHead';
import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box';
import * as React from 'react';
import route from 'ziggy-js';
import BaseLayout from './BaseLayout';

export type TPropsDashboardLayout = Omit<TPropsAppHead, 'children'> & {
  children: React.ReactNode;
}

export default function DashboardLayout({
  title, description, children,
}: TPropsDashboardLayout) {
  return (
    <BaseLayout>
      <AppHead title={title} description={description} />
      <Navbar withoutNavItems />
      <Box sx={{ display: 'flex', mt: '70px' }}>
        <Sidebar
          width={240}
          top={70}
          sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
          items={[
            {
              name: 'Dashboard',
              icon: <DashboardIcon />,
              href: route('dashboard'),
            },
          ]}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </BaseLayout>
  );
}
