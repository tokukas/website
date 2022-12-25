import Navbar from '@/Components/Navbar';
import SettingsMenu from '@/Components/NavMenuItems/SettingsMenu';
import * as React from 'react';
import BaseLayout from './BaseLayout';

export type TPropsDashboardLayout = {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: TPropsDashboardLayout) {
  return (
    <BaseLayout>
      <Navbar
        withoutNavItems
        setMainUserMenus={() => [
          SettingsMenu,
        ]}
      />
      <main>{children}</main>
    </BaseLayout>
  );
}
