import AppHead from '@/Components/AppHead';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';

export default function Dashboard() {
  return (
    <>
      <AppHead title="Dashboard" description="Dashboard Tokukas Anda." />
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
  <DashboardLayout>{children}</DashboardLayout>
);
