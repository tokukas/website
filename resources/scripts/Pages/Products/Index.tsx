import SplitButton from '@/Components/Button/Split';
import BasicDialog from '@/Components/Dialog/Basic';
import Link from '@/Components/Link';
import DismissSnackbarAction from '@/Components/Snackbar/Action/Dismiss';
import { Product } from '@/Entities/Product';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm } from '@inertiajs/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import React from 'react';
import route from 'ziggy-js';

export type TPropsProducts = {
  products: readonly Product[];
}

type TProductColumns = Omit<Product, 'book_id'>;
type ExportTemplate = 'default' | 'mass-upload-shopee'
  | 'mass-upload-tokopedia';
type FormExportData = {
  ids: string[];
  template: ExportTemplate;
};

export default function Products({ products }: TPropsProducts) {
  const {
    data, errors, post, processing, setData,
  } = useForm<FormExportData>({
    ids: [],
    template: 'default',
  });

  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (Object.keys(errors).length) {
      enqueueSnackbar(
        errors.ids ?? errors.template ?? 'Some product id is invalid',
        {
          variant: 'error',
          action: DismissSnackbarAction,
        },
      );
    }
  }, [errors]);

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
      field: 'book',
      headerName: 'Book',
      width: 200,
      valueGetter: ({ row }) => (
        `${row.book.title} (${row.book.year_published})`
      ),
      renderCell: (params) => (
        <Link
          href={route('books.show', params.row.book.id)}
          underline="hover"
          color="inherit"
        >
          {params.value}
        </Link>
      ),
    },
    { field: 'stock', headerName: 'Stock', width: 80 },
    { field: 'price', headerName: 'Price', width: 120 },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 200,
      valueGetter: (params) => dayjs(params.row.created_at),
    },
    {
      field: 'updated_at',
      headerName: 'Updated At',
      width: 200,
      valueGetter: (params) => dayjs(params.row.updated_at),
    },
  ];

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        mb: 2,
        flexWrap: 'wrap',
      }}
      >
        <Typography variant="h4" component="h1">
          Products
        </Typography>

        <SplitButton
          defaultProp={{
            size: 'small',
            disabled: processing,
          }}
          buttons={[
            {
              label: 'Add',
              startIcon: <AddIcon />,
              LinkComponent: Link,
              href: route('products.create'),
            },
            {
              label: 'Export',
              startIcon: <PublishIcon />,
              disabled: !data.ids.length,
              onClick: () => setOpenDialog(true),
            },
            {
              label: 'Delete',
              startIcon: <DeleteIcon />,
              disabled: !data.ids.length,
              // TODO: deleting onClicked
            },
          ]}
        />
      </Box>

      <Paper sx={{ height: 380, width: '100%' }}>
        <DataGrid
          columns={productColumns}
          rows={products}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(rows) => {
            setData('ids', rows.map((row) => row.toString()));
          }}
        />
      </Paper>

      <BasicDialog
        open={openDialog}
        title="Export to Excel"
        description="Select one of the Excel template below!"
        onClose={() => setOpenDialog(false)}
        content={(
          <FormControl fullWidth sx={{ width: 360, mt: 3 }}>
            <InputLabel id="select-template-label">Template</InputLabel>
            <Select
              labelId="select-template-label"
              id="select-template"
              label="Template"
              value={data.template}
              onChange={(e) => {
                setData('template', e.target.value as ExportTemplate);
              }}
            >
              <MenuItem value="default" selected>Default</MenuItem>
              <MenuItem value="mass-upload-shopee">Mass Upload Shopee</MenuItem>
              <MenuItem value="mass-upload-tokopedia">
                Mass Upload Tokopedia
              </MenuItem>
            </Select>
          </FormControl>
        )}
        actions={(
          <>
            <Button onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              disabled={!data.template}
              onClick={() => {
                post(route('products.export'));
                setOpenDialog(false);
              }}
            >
              Export
            </Button>
          </>
        )}
      />
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
