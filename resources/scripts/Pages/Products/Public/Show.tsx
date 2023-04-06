import AppHead from '@/Components/AppHead';
import { Image } from '@/Entities/Image';
import { Product } from '@/Entities/Product';
import DefaultLayout from '@/Layouts/DefaultLayout';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Stack from '@mui/material/Stack';
import VerticalTable from '@/Components/VerticalTable';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Language from '@/Utils/Language';
import Data from '@/Components/VerticalTable/Data';

type TPropsShowProduct = {
  product: Product;
}

export default function ShowProductPublic({ product }: TPropsShowProduct) {
  const isPhotosExists = React.useMemo<boolean>(() => (
    !!product?.photos && !!product.photos.length
  ), [product]);

  const [photoBackdrop, setPhotoBackdrop] = React.useState<Image | null>(null);

  return (
    <>
      <AppHead title={product.name} />

      <Box
        sx={{
          width: '100vw',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            ...(isPhotosExists && {
              sm: '1fr 1fr',
              md: '1fr 2fr',
            }),
          },
          gap: {
            xs: 2,
            md: 4,
          },
        }}
      >
        {isPhotosExists && (
          <Carousel
            animation="slide"
            autoPlay={!photoBackdrop}
          >
            {product.photos?.map((photo) => (
              <Box
                key={photo.id}
                onClick={() => setPhotoBackdrop(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                  }}
                  title="Click to open full screen"
                />
              </Box>
            ))}
          </Carousel>
        )}

        <Box>
          <Typography variant="h5" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            color="primary"
            fontWeight={(theme) => theme.typography.fontWeightMedium}
          >
            Rp
            {product.price}
          </Typography>

          <Typography
            gutterBottom
            color={(theme) => (product.stock
              ? theme.palette.text.primary
              : theme.palette.error.main)}
            fontWeight={(theme) => theme.typography.fontWeightBold}
          >
            {product.stock ? `${product.stock} tersisa` : 'Stok habis'}
          </Typography>

          <Divider sx={{ mt: 2 }} />

          <VerticalTable
            placeholder="-"
            data={[
              { label: 'Judul', value: product.book.title },
              {
                label: 'Penulis',
                disabledDataStyle: true,
                value: product.book.authors?.length
                  ? product.book.authors?.map((author) => (
                    <Chip
                      key={author.id}
                      label={author.name}
                      size="small"
                      variant="outlined"
                    />
                  )) : (
                    <Data empty>-</Data>
                  ),
              },
              { label: 'Penerbit', value: product.book.publisher?.name },
              { label: 'Tahun Terbit', value: product.book.year_published },
              {
                label: 'Bahasa',
                value: Language.getLanguageByCode(product.book.language_code)
                  ?.native,
              },
              { label: 'Jumlah Halaman', value: `${product.book.num_of_pages} halaman` },
              { label: 'Dimensi', value: `${product.book.width} cm X ${product.book.height} cm` },
              { label: 'Berat', value: `${product.book.weight} gram` },
              { label: 'ISBN', value: product.book.isbn },
              { label: 'Deskripsi', value: product.book.description },
            ]}
          />
        </Box>
      </Box>

      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
        open={!!photoBackdrop}
      >
        {photoBackdrop && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={photoBackdrop.url}
              alt={photoBackdrop.caption}
              loading="lazy"
              style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'contain',
              }}
            />

            <Stack
              direction="row"
              spacing={2}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
              }}
            >
              <Tooltip title="Close" arrow>
                <IconButton
                  aria-label="close"
                  onClick={() => setPhotoBackdrop(null)}
                  sx={{
                    color: (theme) => theme.palette.grey[300],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        )}
      </Backdrop>
    </>
  );
}

/**
 * Set the parent layout for this page.
 *
 * @see https://inertiajs.com/pages#persistent-layouts
 */
ShowProductPublic.layout = (children: React.ReactNode) => (
  <DefaultLayout>
    {children}
  </DefaultLayout>
);
