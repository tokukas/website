import AppHead, { TPropsAppHead } from '@/Components/AppHead';
import Navbar from '@/Components/Navbar';
import LoginMenu from '@/Components/Navbar/MenuItem/Items/LoginMenu';
import RegisterMenu from '@/Components/Navbar/MenuItem/Items/RegisterMenu';
import Box from '@mui/material/Box';
import * as React from 'react';
import BaseLayout from './BaseLayout';

export type TPropsDefaultLayout = Omit<TPropsAppHead, 'children'> & {
  children: React.ReactNode;
}

export default function DefaultLayout({
  title, description, children,
}: TPropsDefaultLayout) {
  return (
    <BaseLayout>
      <AppHead title={title} description={description} />

      <Navbar
        setMainUserMenus={() => [
          LoginMenu,
          RegisterMenu,
        ]}
      />

      <Box sx={{ display: 'flex', mt: '70px', p: 3 }}>
        {children}
      </Box>
    </BaseLayout>
  );
}
