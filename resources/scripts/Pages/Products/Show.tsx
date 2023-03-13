import AppHead from '@/Components/AppHead';
import Link from '@/Components/Link';
import VerticalTable from '@/Components/VerticalTable';
import { Image } from '@/Entities/Image';
import { Product } from '@/Entities/Product';
import DashboardLayout from '@/Layouts/DashboardLayout';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import route from 'ziggy-js';

type TPropsShowProduct = {
  product: Product;
}

export default function ShowProduct({ product }: TPropsShowProduct) {
  const [photoBackdrop, setPhotoBackdrop] = React.useState<Image | null>(null);

  const [anchorElOptions,
    setAnchorElOptions] = React.useState<null | HTMLElement>(null);

  const isPhotosExists = React.useMemo<boolean>(() => {
    if (!product?.photos) {
      return false;
    }

    return !!product.photos.length;
  }, [product]);

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
            xs: 0,
            ...(isPhotosExists && {
              sm: 3,
              md: 4,
            }),
          },
        }}
      >
        {isPhotosExists && (
          <Carousel
            animation="slide"
            indicators={false}
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
      </Box>

      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
        open={Boolean(photoBackdrop)}
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
              {/* Option Menu */}
              <Tooltip title="Options" arrow>
                <IconButton
                  aria-label="options"
                  onClick={(event) => setAnchorElOptions(event.currentTarget)}
                  sx={{
                    color: (theme) => theme.palette.grey[300],
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>

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

            <Menu
              id="options-menu"
              anchorEl={anchorElOptions}
              open={Boolean(anchorElOptions)}
              onClose={() => setAnchorElOptions(null)}
              MenuListProps={{
                'aria-labelledby': 'options-menu',
              }}
            >
              {/* TODO: handle delete action */}
              <MenuItem>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">
                  Delete Photo
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Backdrop>

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
