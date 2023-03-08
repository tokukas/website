import Link from '@/Components/Link';
import { Product } from '@/Entities/Product';
import DashboardLayout from '@/Layouts/DashboardLayout';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import route from 'ziggy-js';

export type TPropsProducts = {
  products: readonly Product[];
}

type TProductColumns = Omit<Product, 'book_id'>;

export default function Products({ products }: TPropsProducts) {
  const productColumns: GridColDef<TProductColumns>[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'sku', headerName: 'SKU', width: 80 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Link
          href={route('products.show', params.id)}
          underline="hover"
          color="inherit"
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: 'book_title',
      headerName: 'Book Title',
      width: 200,
      valueGetter: (params) => params.row.book.title,
    },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' },
  ];

  return (
    <>
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
      <Paper sx={{ height: 380, width: '100%' }}>
        <DataGrid
          columns={productColumns}
          rows={products}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </>
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
