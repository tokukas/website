import AppHead from '@/Components/AppHead';
import DashboardMenu from '@/Components/NavMenuItems/DashboardMenu';
import Navbar from '@/Components/Navbar';
import BaseLayout from '@/Layouts/BaseLayout';
import * as React from 'react';

export default function Settings() {
  return (
    <>
      <AppHead
        title="Settings"
        description="Tokukas App Settings"
      />
      <Navbar
        setMainUserMenus={() => [
          DashboardMenu,
        ]}
      />
    </>
  );
}

/**
 * Set the parent layout for this page.
 *
 * @see https://inertiajs.com/pages#persistent-layouts
 */
Settings.layout = (children: React.ReactNode) => (
  <BaseLayout>{children}</BaseLayout>
);
