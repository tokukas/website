import Link from '@/Components/Link';
import { Category } from '@/Entities/Category';
import { Publisher } from '@/Entities/Publisher';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Language from '@/Utils/Language';
import HelpIcon from '@mui/icons-material/Help';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
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

export default function AddBook({ publishers, categories }: TPropsAddBook) {
  const [dayjsValue, setDayjs] = React.useState<Dayjs | null>();

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
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            sm: '1fr',
            md: 'repeat(2, 1fr)',
          },
          gap: 3.2,
          mt: 2,
        }}
      >
        <TextField
          label="Title"
          name="title"
          required
          placeholder='e.g. "The Lord of the Rings"'
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
              name="publisher"
              required
              placeholder="Select a publisher"
            />
          )}
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
              name="language"
              required
              placeholder="Select a language"
            />
          )}
        />

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
              name="category"
              required
              placeholder="Select a category"
            />
          )}
        />

        <DatePicker
          label="Year Published"
          views={['year']}
          value={dayjsValue}
          maxDate={dayjs()}
          onChange={(newValue) => setDayjs(newValue)}
          renderInput={(props) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
              helperText="The year this book was published"
            />
          )}
        />

        <TextField
          type="number"
          label="Weight"
          name="weight"
          required
          placeholder="0.0"
          helperText="The weight of the book in grams"
          InputProps={{
            endAdornment: <InputAdornment position="end">gr</InputAdornment>,
            inputProps: {
              min: 0,
              step: 0.25,
            },
          }}
        />

        <TextField
          type="number"
          label="Width"
          name="width"
          required
          placeholder="0.0"
          helperText="The width of the book in centimeters"
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            inputProps: {
              min: 0,
              step: 0.25,
            },
          }}
        />

        <TextField
          type="number"
          label="Height"
          name="height"
          required
          placeholder="0.0"
          helperText="The height of the book in centimeters"
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            inputProps: {
              min: 0,
              step: 0.25,
            },
          }}
        />

        <TextField
          type="number"
          label="Number of Pages"
          name="num_of_pages"
          required
          placeholder="0"
          helperText="Counts from front cover to back cover"
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
          label="ISBN"
          name="isbn"
          required
          placeholder='e.g. "978-3-16-148410-0"'
          helperText="International Standard Book Number"
        />

        <TextField
          label="Description"
          name="description"
          required
          multiline
          minRows={2}
          maxRows={6}
        />
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
