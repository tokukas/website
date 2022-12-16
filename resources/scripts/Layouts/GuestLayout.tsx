import BrandLogo from '@/Components/BrandLogo';
import Link from '@/Components/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React from 'react';
import BaseLayout from './BaseLayout';

type TPropsGuestLayout = {
  children: React.ReactNode;
}

export default function Guest({ children }: TPropsGuestLayout) {
  return (
    <BaseLayout>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: {
            sm: 'start',
            md: 'center',
          },
          alignItems: 'center',
        }}
      >
        <Paper
          className="w-full max-w-md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: 6,
            py: 4,
            overflow: 'hidden',
          }}
        >
          <Link href="/" sx={{ mb: 4 }}>
            <BrandLogo className="w-24" />
          </Link>
          {children}
        </Paper>
      </Box>
    </BaseLayout>
  );
}
