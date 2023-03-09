import AppHead from '@/Components/AppHead';
import Link from '@/Components/Link';
import VerticalTable from '@/Components/VerticalTable';
import { Product } from '@/Entities/Product';
import DashboardLayout from '@/Layouts/DashboardLayout';
import EditIcon from '@mui/icons-material/Edit';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React from 'react';
import route from 'ziggy-js';

type TPropsShowProduct = {
  product: Product;
}

export default function ShowProduct({ product }: TPropsShowProduct) {
  return (
    <>
      <AppHead title={product.name} />

      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          href={route('products.index')}
          underline="hover"
          color="inherit"
        >
          Products
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        {product.name}
      </Typography>

      <VerticalTable
        data={[
          {
            label: 'Book',
            disabledDataStyle: true,
            value: (
              <Link
                href={route('books.show', { book: product.book_id })}
                fontWeight="bold"
              >
                {`${product.book.title} (${product.book.year_published})`}
              </Link>
            ),
          },
          { label: 'SKU', value: product.sku },
          { label: 'Price', value: `Rp${product.price}` },
          { label: 'Description', value: product.description },
          {
            label: 'Date Creation',
            value: dayjs(product.created_at).toString(),
          },
          {
            label: 'Last Update',
            value: dayjs(product.updated_at).toString(),
          },
        ]}
      />

      <Link
        href={route('products.edit', { product })}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <Fab
          aria-label="Edit"
          color="primary"
        >
          <EditIcon />
        </Fab>
      </Link>
    </>
  );
}

/**
 * Set the parent layout for this page.
 *
 * @see https://inertiajs.com/pages#persistent-layouts
 */
ShowProduct.layout = (children: React.ReactNode) => (
  <DashboardLayout activeSidebarKey="products">
    {children}
  </DashboardLayout>
);
