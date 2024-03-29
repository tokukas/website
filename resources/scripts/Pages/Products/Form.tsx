import AppHead from '@/Components/AppHead';
import AutocompleteAddOption from '@/Components/Autocomplete/AddOption';
import FieldSection from '@/Components/Form/FieldSection';
import FileInput from '@/Components/Form/FileInput';
import Link from '@/Components/Link';
import { Book } from '@/Entities/Book';
import { Product } from '@/Entities/Product';
import DashboardLayout from '@/Layouts/DashboardLayout';
import FileValidator from '@/Utils/FileValidator';
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

export type TPropsFormProduct = {
  books: readonly Book[];
  productToEdit?: Product;
}

type ProductFields = Omit<Partial<Product>,
  'id' | 'created_at' | 'updated_at' | 'book' | 'photos'
> & {
  _method?: string;
  photos: File[];
};

export default function FormProduct({
  books,
  productToEdit,
}: TPropsFormProduct) {
  const pageTitle = `${productToEdit ? 'Edit' : 'Add'} Product`;

  const initialValues: ProductFields = {
    _method: productToEdit ? 'patch' : undefined,
    book_id: productToEdit?.book_id,
    name: productToEdit?.name,
    sku: productToEdit?.sku,
    stock: productToEdit?.stock,
    photos: [],
    price: productToEdit?.price,
    description: productToEdit?.description,
  };

  const {
    clearErrors, data, errors, post, processing, setData,
  } = useForm<ProductFields>(initialValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors(event.target.name as keyof ProductFields);
    setData(
      event.target.name as keyof ProductFields,
      event.target.value,
    );
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (productToEdit) {
      post(route('products.update', productToEdit), { replace: true });
    } else {
      post(route('products.store'));
    }
  };

  const photosValidator = new FileValidator<true>({
    maxSize: 5 * 1024 * 1024, // 5 MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
  });

  const [photosError, setPhotosError] = React.useState<{
    error?: string | null;
    key: string;
  } | undefined>(undefined);

  React.useEffect(() => {
    if (errors.photos) {
      setPhotosError({ error: errors.photos, key: 'photos' });
      return;
    }

    // Get photos.* error if exists (photos.0, photos.1, etc.)
    setPhotosError(Object.keys(errors)
      .filter((key) => key.startsWith('photos.'))
      .map((key) => ({ key, error: errors[key as keyof ProductFields] }))
      .at(0));
  }, [errors]);

  return (
    <>
      <AppHead
        title={pageTitle}
        description={productToEdit
          ? `Edit product "${productToEdit.name}"`
          : 'Add new product'}
      />

      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          href={route('products.index')}
          underline="hover"
          color="inherit"
        >
          Products
        </Link>
        <Typography color="text.primary">{pageTitle}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        {pageTitle}
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
            defaultValue={productToEdit?.book}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                name="book_id"
                label="Book"
                placeholder="Select Book"
                error={!!errors.book_id}
                helperText={errors.book_id}
              />
            )}
            renderOption={(props, option) => (
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
              router.get(route('books.create'), {
                title,
                to: 'products.create',
              }, {
                replace: true,
              });
            }}
          />

          <TextField
            name="name"
            label="Name"
            defaultValue={productToEdit?.name}
            placeholder='e.g. "The Lord of the Rings"'
            error={!!errors.name}
            helperText={errors.name ?? 'Max. 70 characters'}
            onChange={handleInputChange}
          />

          <TextField
            name="sku"
            label="SKU"
            defaultValue={productToEdit?.sku}
            placeholder='e.g. "LOTR-001"'
            error={!!errors.sku}
            helperText={errors.sku ?? 'Stock Keeping Unit'}
            onChange={handleInputChange}
          />

          <TextField
            name="stock"
            label="Stock"
            type="number"
            defaultValue={productToEdit?.stock}
            placeholder="0"
            error={!!errors.stock}
            helperText={errors.stock}
            onChange={handleInputChange}
            InputProps={{
              inputProps: {
                min: 0,
                step: 1,
              },
            }}
          />

          <TextField
            name="price"
            label="Price"
            type="number"
            defaultValue={productToEdit?.price}
            placeholder="0"
            error={!!errors.price}
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
            defaultValue={productToEdit?.description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={handleInputChange}
            multiline
            minRows={2}
          />

          <FileInput
            multiple
            label={`Photos${productToEdit ? ' (optional)' : ''}`}
            value={data.photos}
            placeholder="Select product photo(s)"
            error={!!photosError?.error}
            helperText={photosError?.error
              ?? 'Max. 5 photos with max. 5 MB each'}
            onChange={(newPhotos) => {
              if (photosValidator.validate(newPhotos)) {
                if (photosError) {
                  clearErrors(photosError.key as keyof ProductFields);
                }
                setData('photos', newPhotos);
              } else {
                setPhotosError({
                  key: 'photos',
                  error: photosValidator.getError(),
                });
              }
            }}
            InputProps={{
              inputProps: {
                accept: 'image/*',
              },
            }}
          />
        </FieldSection>

        <FieldSection title="Links">
          <TextField
            name="link_shopee"
            label="Link Shopee (optional)"
            defaultValue={productToEdit?.link_shopee}
            placeholder="https://shopee.co.id/..."
            error={!!errors.link_shopee}
            helperText={errors.link_shopee}
            onChange={handleInputChange}
          />

          <TextField
            name="link_tokopedia"
            label="Link Tokopedia (optional)"
            defaultValue={productToEdit?.link_tokopedia}
            placeholder="https://www.tokopedia.com/..."
            error={!!errors.link_tokopedia}
            helperText={errors.link_tokopedia}
            onChange={handleInputChange}
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
            {pageTitle}
          </Button>
        </Box>
      </Box>
    </>
  );
}

FormProduct.defaultProps = {
  productToEdit: undefined,
};

/**
 * Set the parent layout for this page.
 *
 * @see https://inertiajs.com/pages#persistent-layouts
 */
FormProduct.layout = (children: React.ReactNode) => (
  <DashboardLayout activeSidebarKey="products">
    {children}
  </DashboardLayout>
);
