import AppHead from '@/Components/AppHead';
import Link from '@/Components/Link';
import VerticalTable from '@/Components/VerticalTable';
import { Book } from '@/Entities/Book';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Language from '@/Utils/Language';
import EditIcon from '@mui/icons-material/Edit';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React from 'react';
import route from 'ziggy-js';

type TPropsShowBook = {
  book: Book;
}

export default function ShowBook({ book }: TPropsShowBook) {
  return (
    <>
      <AppHead title={book.title} />

      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          href={route('books.index')}
          underline="hover"
          color="inherit"
        >
          Books
        </Link>
        <Typography color="text.primary">{book.title}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        {book.title}
      </Typography>

      {!!book.authors?.length && (
        <Stack
          direction="row"
          rowGap={0.5}
          columnGap={1}
          flexWrap="wrap"
          mb={2.5}
        >
          <Typography>By:</Typography>
          {book.authors?.map((author) => (
            <Chip
              key={author.id}
              label={author.name}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>
      )}

      <VerticalTable
        data={[
          { label: 'Year', value: book.year_published },
          { label: 'Publisher', value: book.publisher?.name },
          {
            label: 'Language',
            value: Language.getLanguageByCode(book.language_code)?.name,
          },
          { label: 'Width', value: `${book.width.toFixed(2)} cm` },
          { label: 'Height', value: `${book.height.toFixed(2)} cm` },
          { label: 'Weight', value: `${book.weight.toFixed(2)} gram` },
          { label: 'Number of Pages', value: book.num_of_pages },
          { label: 'ISBN', value: book.isbn },
          { label: 'Category', value: book.category?.name },
          { label: 'Description', value: book.description },
          { label: 'Date Creation', value: dayjs(book.created_at).toString() },
          { label: 'Last Update', value: dayjs(book.updated_at).toString() },
        ]}
      />

      <Link
        href={route('books.edit', { book: book.id })}
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
ShowBook.layout = (children: React.ReactNode) => (
  <DashboardLayout activeSidebarKey="books">
    {children}
  </DashboardLayout>
);
