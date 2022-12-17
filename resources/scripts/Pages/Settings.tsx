import AppHead from '@/Components/AppHead';
import Navbar from '@/Components/Navbar';
import BaseLayout from '@/Layouts/BaseLayout';
import * as React from 'react';

export default function Settings() {
  return (
    <BaseLayout>
      <AppHead
        title="Settings"
        description="Tokukas App Settings"
      />
      <Navbar />
    </BaseLayout>
  );
}
