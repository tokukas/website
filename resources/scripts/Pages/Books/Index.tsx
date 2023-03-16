import Link from '@/Components/Link';
import { Book } from '@/Entities/Book';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Language from '@/Utils/Language';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import route from 'ziggy-js';

export type TPropsBooks = {
  books: readonly Book[];
}

type TBookColumns = Omit<Book, 'publisher_id' | 'category_id'>;

export default function Books({ books }: TPropsBooks) {
  const bookColumns: GridColDef<TBookColumns>[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'title',
      headerName: 'Title',
      width: 240,
      renderCell: (params) => (
        <Link
          href={route('books.show', params.id)}
          underline="hover"
          color="inherit"
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      width: 160,
      valueGetter: ({ row }) => row.publisher?.name,
    },
    { field: 'year_published', headerName: 'Year Published', width: 80 },
    {
      field: 'language',
      headerName: 'Language',
      width: 120,
      valueGetter: ({ row }) => Language
        .getLanguageByCode(row.language_code)?.name,
    },
    { field: 'width', headerName: 'Width', width: 80 },
    { field: 'height', headerName: 'Height', width: 80 },
    { field: 'weight', headerName: 'Weight', width: 80 },
    { field: 'num_of_pages', headerName: 'Pages', width: 80 },
    { field: 'isbn', headerName: 'ISBN' },
    { field: 'description', headerName: 'Description' },
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
          Books
        </Typography>
        <Tooltip title="Add Book">
          <IconButton
            component={Link}
            href={route('books.create')}
            size="large"
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>

      <Paper sx={{ height: 380, width: '100%' }}>
        <DataGrid
          columns={bookColumns}
          rows={books}
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
Books.layout = (children: React.ReactNode) => (
  <DashboardLayout
    title="Books"
    description="Tokukas's Books Data"
    activeSidebarKey="books"
  >
    {children}
  </DashboardLayout>
);
