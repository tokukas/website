import AppHead from '@/Components/AppHead';
import Navbar from '@/Components/Navbar';
import BaseLayout from '@/Layouts/BaseLayout';
import { Typography } from '@mui/material';
import * as React from 'react';

export default function Settings() {
  return (
    <BaseLayout>
      <AppHead
        title="Settings"
        description="Tokukas App Settings"
      />
      <Navbar />
      <Typography>Settings</Typography>
    </BaseLayout>
  );
}
