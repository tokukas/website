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
  books: Book[];
}

type TBookColumns = Omit<Book,
  'language_code' | 'publisher'
> & {
  language: string;
  publisher_name: string;
};

export default function Books({ books }: TPropsBooks) {
  const bookColumns: GridColDef<TBookColumns>[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Title', width: 240 },
    { field: 'publisher_name', headerName: 'Publisher', width: 160 },
    { field: 'year_published', headerName: 'Year Published', width: 80 },
    { field: 'language', headerName: 'Language', width: 120 },
    { field: 'width', headerName: 'Width', width: 80 },
    { field: 'height', headerName: 'Height', width: 80 },
    { field: 'weight', headerName: 'Weight', width: 80 },
    { field: 'num_of_pages', headerName: 'Pages', width: 80 },
    { field: 'isbn', headerName: 'ISBN' },
    { field: 'description', headerName: 'Description' },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' },
  ];

  const bookRows = books.map(({
    language_code: langCode, publisher, ...book
  }) => ({
    ...book,
    language: Language.getLanguageByCode(langCode)?.name,
    publisher_name: publisher?.name,
  } as TBookColumns));

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
          rows={bookRows}
          pageSize={5}
          rowsPerPageOptions={[5]}
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
