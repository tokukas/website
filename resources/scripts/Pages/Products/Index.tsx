import Link from '@/Components/Link';
import DashboardLayout from '@/Layouts/DashboardLayout';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import route from 'ziggy-js';

export default function Products() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 2,
      mb: 2,
    }}
    >
      <Typography variant="h4" component="h1">
        Products
      </Typography>
      <Tooltip title="Add Product">
        <IconButton
          component={Link}
          href={route('products.create')}
          size="large"
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

/**
 * Set the parent layout for this page.
 *
 * @see https://inertiajs.com/pages#persistent-layouts
 */
Products.layout = (children: React.ReactNode) => (
  <DashboardLayout
    title="Products"
    description="Tokukas's Products Data"
    activeSidebarKey="products"
  >
    {children}
  </DashboardLayout>
);
