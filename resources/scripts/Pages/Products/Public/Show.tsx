import ShopeeLogo from '@/Components/Logo/Shopee';
import TokopediaLogo from '@/Components/Logo/Tokopedia';
import VerticalTable from '@/Components/VerticalTable';
import Data from '@/Components/VerticalTable/Data';
import { Image } from '@/Entities/Image';
import { Product } from '@/Entities/Product';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { getImageUrl } from '@/Utils/Helpers/Images';
import useTranslator from '@/Utils/Hooks/useTranslator';
import Language from '@/Utils/Language';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

type TPropsShowProduct = {
  product: Product;
}

export default function ShowProductPublic({ product }: TPropsShowProduct) {
  const { __ } = useTranslator([
    { key: ':amount left', replace: { amount: product.stock } },
    { key: ':amount pages', replace: { amount: product.book.num_of_pages } },
    'Click to open full screen',
    'Close',
    'Out of stock',
    'Order Via',
    'validation.attributes.author',
    'validation.attributes.description',
    'validation.attributes.dimension',
    'validation.attributes.isbn',
    'validation.attributes.language',
    'validation.attributes.num_of_pages',
    'validation.attributes.publisher',
    'validation.attributes.title',
    'validation.attributes.weight',
    'validation.attributes.year_published',
  ]);

  const isPhotosExists = React.useMemo<boolean>(() => (
    !!product?.photos && !!product.photos.length
  ), [product]);

  const [photoBackdrop, setPhotoBackdrop] = React.useState<Image | null>(null);

  return (
    <DefaultLayout title={product.name}>
      <Box
        sx={{
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
          py: 3,
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
                  src={getImageUrl(photo, {
                    width: 400,
                    type: 'webp',
                  })}
                  alt={photo.caption}
                  loading="lazy"
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                  }}
                  title={__('Click to open full screen')}
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
            {product.stock
              ? __(':amount left', { amount: product.stock })
              : __('Out of stock')}
          </Typography>

          <Box
            sx={{
              display: product.link_shopee || product.link_tokopedia
                ? 'grid' : 'none',
              gridTemplateColumns: {
                sm: '1fr',
                md: 'repeat(2, 1fr)',
              },
              gap: 1.5,
              mt: 2,
            }}
          >
            {product.link_shopee && (
              <Button
                variant="contained"
                color="shopee"
                href={product.link_shopee}
                target="_blank"
                endIcon={<ShopeeLogo className="w-14" variant="white" />}
              >
                {__('Order Via')}
              </Button>
            )}

            {product.link_tokopedia && (
              <Button
                variant="contained"
                color="tokopedia"
                href={product.link_tokopedia}
                target="_blank"
                endIcon={<TokopediaLogo className="w-20" variant="white" />}
              >
                {__('Order Via')}
              </Button>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          <VerticalTable
            placeholder="-"
            data={[
              {
                label: __('validation.attributes.title'),
                value: product.book.title,
              },
              {
                label: __('validation.attributes.author'),
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
              {
                label: __('validation.attributes.publisher'),
                value: product.book.publisher?.name,
              },
              {
                label: __('validation.attributes.year_published'),
                value: product.book.year_published,
              },
              {
                label: __('validation.attributes.language'),
                value: Language.getLanguageByCode(product.book.language_code)
                  ?.native,
              },
              {
                label: __('validation.attributes.num_of_pages'),
                value: __(':amount pages', {
                  amount: product.book.num_of_pages,
                }),
              },
              {
                label: __('validation.attributes.dimension'),
                value: `${product.book.width} cm X ${product.book.height} cm`,
              },
              {
                label: __('validation.attributes.weight'),
                value: `${product.book.weight} gram`,
              },
              {
                label: __('validation.attributes.isbn'),
                value: product.book.isbn,
              },
              {
                label: __('validation.attributes.description'),
                value: product.book.description,
              },
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
              <Tooltip title={__('Close')} arrow>
                <IconButton
                  aria-label={__('Close')}
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
    </DefaultLayout>
  );
}
