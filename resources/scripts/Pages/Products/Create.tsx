import AutocompleteAddOption from '@/Components/AutocompleteAddOption';
import FieldSection from '@/Components/FieldSection';
import Link from '@/Components/Link';
import { Book } from '@/Entities/Book';
import { Product } from '@/Entities/Product';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { router, useForm } from '@inertiajs/react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import route from 'ziggy-js';

export type TPropsAddProduct = {
  books: readonly Book[];
}

type AddProductFields = Omit<Product,
  'id' | 'created_at' | 'updated_at' | 'book'
>;

export default function CreateProduct({ books }: TPropsAddProduct) {
  const {
    clearErrors, errors, post, processing, setData,
  } = useForm<AddProductFields>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors(event.target.name as keyof AddProductFields);
    setData(
      event.target.name as keyof AddProductFields,
      event.target.value,
    );
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('products.store'));
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          href={route('products.index')}
          underline="hover"
          color="inherit"
        >
          Products
        </Link>
        <Typography color="text.primary">Add Product</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        Add Product
      </Typography>

      <Box
        component="form"
        onSubmit={submitForm}
      >
        <FieldSection>
          <AutocompleteAddOption
            labelKey="title"
            dataKey="id"
            options={books}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                name="book_id"
                label="Book"
                placeholder="Select Book"
                error={Boolean(errors.book_id)}
                helperText={errors.book_id}
              />
            )}
            renderOption={(props, option) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <li {...props}>
                {option.inputValue ? option.title : (
                  `${option.title} (${option.year_published})`
                )}
              </li>
            )}
            setData={(id) => {
              clearErrors('book_id');
              setData('book_id', id ?? '');
            }}
            onSelectAddOption={(title) => {
              router.get(route('books.create'), { title });
            }}
          />

          <TextField
            name="name"
            label="Name"
            placeholder='e.g. "The Lord of the Rings"'
            error={Boolean(errors.name)}
            helperText={errors.name ?? 'Max. 70 characters'}
            onChange={handleInputChange}
          />

          <TextField
            name="sku"
            label="SKU"
            placeholder='e.g. "LOTR-001"'
            error={Boolean(errors.sku)}
            helperText={errors.sku ?? 'Stock Keeping Unit'}
            onChange={handleInputChange}
          />

          <TextField
            name="price"
            label="Price"
            type="number"
            placeholder="0"
            error={Boolean(errors.price)}
            helperText={errors.price}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">IDR</InputAdornment>
              ),
              inputProps: {
                min: 0,
                step: 1,
              },
            }}
          />

          <TextField
            name="description"
            label="Description (optional)"
            error={Boolean(errors.description)}
            helperText={errors.description}
            onChange={handleInputChange}
            multiline
            minRows={2}
          />
        </FieldSection>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            type="submit"
            startIcon={<AddIcon />}
            disabled={processing}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>
    </>
  );
}

/**
 * Set the parent layout for this page.
 *
 * @see https://inertiajs.com/pages#persistent-layouts
 */
CreateProduct.layout = (children: React.ReactNode) => (
  <DashboardLayout
    title="Create Product"
    description="Tokukas's Product Data"
    activeSidebarKey="products"
  >
    {children}
  </DashboardLayout>
);
