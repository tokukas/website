import Link from '@/Components/Link';
import { Book } from '@/Entities/Book';
import { Category } from '@/Entities/Category';
import { Publisher } from '@/Entities/Publisher';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Language from '@/Utils/Language';
import { useForm } from '@inertiajs/react';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import Autocomplete from '@mui/material/Autocomplete';
import Box, { BoxProps } from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import route from 'ziggy-js';

export type TPropsAddBook = {
  publishers: Publisher[];
  categories: Category[];
}

type AddBookFields = Omit<Book,
  'id' | 'created_at' | 'updated_at' | 'publisher'
>;

function FieldSection({ title, sx, children }: BoxProps) {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Box
        sx={{
          ...sx,
          display: 'grid',
          gridTemplateColumns: {
            sm: '1fr',
            md: 'repeat(2, 1fr)',
          },
          gap: 3.2,
          mt: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function AddBook({ publishers, categories }: TPropsAddBook) {
  const [dayjsValue, setDayjs] = React.useState<Dayjs | null>(null);

  const { post, setData, errors } = useForm<AddBookFields>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      event.target.name as keyof AddBookFields,
      event.target.value,
    );
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('books.store'));
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          href={route('books.index')}
          underline="hover"
          color="inherit"
        >
          Books
        </Link>
        <Typography color="text.primary">Add Book</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        Add Book
      </Typography>

      <Box
        component="form"
        onSubmit={submitForm}
      >
        <FieldSection title="Basic Information">
          <TextField
            label="Title"
            name="title"
            required
            placeholder='e.g. "The Lord of the Rings"'
            onChange={handleInputChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />

          <Autocomplete
            id="language"
            options={Language.getAllLanguages()}
            getOptionLabel={(option) => `${option.name} - ${option.native}`}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Language"
                name="language_code"
                required
                placeholder="Select a language"
                error={Boolean(errors.language_code)}
                helperText={errors.language_code}
              />
            )}
            onChange={(event, newValue) => {
              setData('language_code', newValue?.code ?? '');
            }}
          />

          <Autocomplete
            id="publisher"
            options={publishers}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Publisher"
                name="publisher_id"
                placeholder="Select a publisher"
                error={Boolean(errors.publisher_id)}
                helperText={errors.publisher_id ?? 'The publisher of the book'}
              />
            )}
            onChange={(event, newValue) => {
              setData('publisher_id', newValue?.id ?? '');
            }}
          />

          <DatePicker
            label="Year Published"
            views={['year']}
            openTo="year"
            value={dayjsValue}
            maxDate={dayjs()}
            onChange={(newValue) => {
              setDayjs(newValue);
              setData('year_published', newValue?.year() ?? 0);
            }}
            renderInput={(props) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                required
                name="year_published"
                error={Boolean(errors.year_published)}
                helperText={errors.year_published
                  ?? 'The year this book was published'}
              />
            )}
          />

          <TextField
            label="ISBN"
            name="isbn"
            placeholder='e.g. "978-3-16-148410-0"'
            error={Boolean(errors.isbn)}
            helperText={errors.isbn ?? 'International Standard Book Number'}
            onChange={handleInputChange}
          />
        </FieldSection>

        <FieldSection title="Physical Information">
          <TextField
            type="number"
            label="Number of Pages"
            name="num_of_pages"
            required
            placeholder="0"
            error={Boolean(errors.num_of_pages)}
            helperText={errors.num_of_pages
              ?? 'Counts from front cover to back cover'}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="See how to count the pages" arrow>
                    <Link
                      href="/" // TODO: Change the link
                      sx={{ display: 'flex' }}
                      color="inherit"
                    >
                      <HelpIcon color="primary" />
                    </Link>
                  </Tooltip>
                </InputAdornment>
              ),
              inputProps: {
                min: 0,
                step: 1,
              },
            }}
          />

          <TextField
            type="number"
            label="Weight"
            name="weight"
            required
            placeholder="0.0"
            error={Boolean(errors.weight)}
            helperText={errors.weight ?? 'The weight of the book in grams'}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">gr</InputAdornment>,
              inputProps: {
                min: 0,
                step: 0.1,
              },
            }}
          />

          <TextField
            type="number"
            label="Width"
            name="width"
            required
            placeholder="0.0"
            error={Boolean(errors.width)}
            helperText={errors.width ?? 'The width of the book in centimeters'}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              inputProps: {
                min: 0,
                step: 0.1,
              },
            }}
          />

          <TextField
            type="number"
            label="Height"
            name="height"
            required
            placeholder="0.0"
            error={Boolean(errors.height)}
            helperText={errors.height
              ?? 'The height of the book in centimeters'}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              inputProps: {
                min: 0,
                step: 0.1,
              },
            }}
          />
        </FieldSection>

        <FieldSection title="Additional Information">
          <Autocomplete
            id="category"
            options={categories}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Category"
                name="category_id"
                placeholder="Select a category"
                error={Boolean(errors.category_id)}
                helperText={errors.category_id ?? 'What kind of book is this?'}
              />
            )}
            onChange={(event, newValue) => {
              setData('category_id', newValue?.id ?? '');
            }}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            minRows={2}
            maxRows={6}
            onChange={handleInputChange}
            placeholder="Write a short description of the book..."
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
        </FieldSection>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            type="submit"
            startIcon={<AddIcon />}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Add Book
          </Button>
        </Box>
      </Box>
    </>
  );
}

/**
 * Set the parent layout for this page.
 *
 * @see https://inertiajs.com/pages#persistent-layouts
 */
AddBook.layout = (children: React.ReactNode) => (
  <DashboardLayout
    title="Add Book"
    description="Tokukas's Books Data"
    activeSidebarKey="books"
  >
    {children}
  </DashboardLayout>
);
