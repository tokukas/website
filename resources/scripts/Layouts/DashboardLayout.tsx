import AppHead, { TPropsAppHead } from '@/Components/AppHead';
import Sidebar from '@/Components/Drawer/Sidebar';
import { TPropsSidebarItem } from '@/Components/Drawer/Sidebar/Item';
import Navbar from '@/Components/Navbar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SellIcon from '@mui/icons-material/Sell';
import Box from '@mui/material/Box';
import * as React from 'react';
import route from 'ziggy-js';
import BaseLayout from './BaseLayout';

export type TPropsDashboardLayout = Omit<TPropsAppHead, 'children'> & {
  activeSidebarKey?: string;
  children: React.ReactNode;
}

export const dashboardSidebarItems: TPropsSidebarItem[] = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: <DashboardIcon />,
    href: route('dashboard'),
  },
  {
    key: 'books',
    name: 'Books',
    icon: <LibraryBooksIcon />,
    href: route('books.index'),
  },
  {
    key: 'products',
    name: 'Products',
    icon: <SellIcon />,
    href: route('products.index'),
  },
];

export default function DashboardLayout({
  title, description, activeSidebarKey, children,
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
          items={dashboardSidebarItems}
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
          {children}
        </Box>
      </Box>
    </BaseLayout>
  );
}

DashboardLayout.defaultProps = {
  activeSidebarKey: undefined,
};
