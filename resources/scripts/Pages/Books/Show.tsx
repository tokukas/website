import AppHead from '@/Components/AppHead';
import Link from '@/Components/Link';
import { Book } from '@/Entities/Book';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Language from '@/Utils/Language';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import React from 'react';
import route from 'ziggy-js';
import VerticalTable from '@/Components/VerticalTable';

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
          { label: 'Description', value: book.description },
        ]}
      />
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
