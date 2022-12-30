import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';
import Box from '@mui/material/Box';
import * as React from 'react';
import BaseLayout from './BaseLayout';

export type TPropsDashboardLayout = {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: TPropsDashboardLayout) {
  const [open, setOpen] = React.useState(false);

  return (
    <BaseLayout>
      <Navbar withoutNavItems />
      <Box sx={{ display: 'flex', mt: '70px' }}>
        <Sidebar
          open={open}
          width={240}
          top={70}
          sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
          setOpen={setOpen}
          menuItems={[
            //
          ]}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </BaseLayout>
  );
}
