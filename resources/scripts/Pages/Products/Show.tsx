import AppHead from '@/Components/AppHead';
import DismissSnackbarAction from '@/Components/DismissSnackbarAction';
import Link from '@/Components/Link';
import VerticalTable from '@/Components/VerticalTable';
import { Image } from '@/Entities/Image';
import { Product } from '@/Entities/Product';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { router } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
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

  const [openDeleteDialog,
    setOpenDeleteDialog] = React.useState<boolean>(false);

  const isPhotosExists = React.useMemo<boolean>(() => (
    !!product?.photos && !!product.photos.length
  ), [product]);

  const { enqueueSnackbar } = useSnackbar();

  const deletePhoto = (event: React.MouseEvent) => {
    event.preventDefault();

    if (photoBackdrop) {
      router.post(route('images.destroy', photoBackdrop), {
        _method: 'delete',
      }, {
        onFinish: () => {
          setOpenDeleteDialog(false);
          setAnchorElOptions(null);
          setPhotoBackdrop(null);
        },
        onError: () => {
          enqueueSnackbar('Failed to delete the photo.', {
            variant: 'error',
            action: DismissSnackbarAction,
            preventDuplicate: true,
          });
        },
        onSuccess: () => {
          enqueueSnackbar('Photo deleted successfully.', {
            variant: 'success',
            action: DismissSnackbarAction,
            preventDuplicate: true,
          });
        },
      });
    }
  };

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
          mt: {
            xs: 0,
            ...(isPhotosExists && {
              xs: 3,
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
            { label: 'Stock', disabledDataStyle: true, value: product.stock },
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
              open={!!anchorElOptions}
              onClose={() => setAnchorElOptions(null)}
              MenuListProps={{
                'aria-labelledby': 'options-menu',
              }}
            >
              <MenuItem
                onClick={() => {
                  setOpenDeleteDialog(true);
                  setAnchorElOptions(null);
                }}
              >
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

      {photoBackdrop && (
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="alertDialogDeleteTitle"
          aria-describedby="alertDialogDeleteDesc"
        >
          <DialogTitle id="alertDialogDeleteTitle">
            Delete this photo?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alertDialogDeleteDesc">
              Are you sure you want to delete this photo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={deletePhoto}
            >
              Yes, Delete It
            </Button>
          </DialogActions>
        </Dialog>
      )}

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
