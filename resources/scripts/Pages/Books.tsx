import { Book } from '@/Entities/Book';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

export type TPropsBooks = {
  books: Book[];
}

export default function Books({ books }: TPropsBooks) {
  const bookColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Title', width: 240 },
    { field: 'publisher', headerName: 'Publisher', width: 160 },
    { field: 'year_published', headerName: 'Year Published', width: 80 },
    { field: 'language_code', headerName: 'Language', width: 80 },
    { field: 'width', headerName: 'Width', width: 80 },
    { field: 'height', headerName: 'Height', width: 80 },
    { field: 'weight', headerName: 'Weight', width: 80 },
    { field: 'num_of_pages', headerName: 'Pages', width: 80 },
    { field: 'isbn', headerName: 'ISBN' },
    { field: 'description', headerName: 'Description' },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' },
  ];

  const bookRows = books.map((book) => ({
    ...book,
    publisher: book.publisher?.name,
  }));

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Books
      </Typography>

      <Paper sx={{ height: 380, width: '100%' }}>
        <DataGrid
          columns={bookColumns}
          rows={bookRows}
          pageSize={5}
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
Books.layout = (children: React.ReactNode) => (
  <DashboardLayout
    title="Books"
    description="Tokukas's Books Data"
    activeSidebarKey="books"
  >
    {children}
  </DashboardLayout>
);
