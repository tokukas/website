import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';

export default function Dashboard() {
  return (
    <>
      Dashboard
    </>
  );
}

/**
 * Set the parent layout for this page.
 *
 * @see https://inertiajs.com/pages#persistent-layouts
 */
Dashboard.layout = (children: React.ReactNode) => (
  <DashboardLayout
    title="Dashboard"
    description="Dashboard Tokukas Anda"
    activeSidebarKey="dashboard"
  >
    {children}
  </DashboardLayout>
);
