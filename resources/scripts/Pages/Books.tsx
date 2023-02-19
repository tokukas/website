import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';

export default function Books() {
  return (
    <>
      Books
    </>
  );
}

/**
 * Set the parent layout for this page.
 *
 * @see https://inertiajs.com/pages#persistent-layouts
 */
Books.layout = (children: React.ReactNode) => (
  <DashboardLayout
    title="Books"
    description="Tokukas's Books Data"
    activeSidebarKey="books"
  >
    {children}
  </DashboardLayout>
);
