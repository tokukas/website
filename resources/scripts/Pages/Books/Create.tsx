import Link from '@/Components/Link';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Language from '@/Utils/Language';
import HelpIcon from '@mui/icons-material/Help';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import route from 'ziggy-js';

export default function AddBook() {
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

        <TextField
          select
          label="Publisher"
          name="publisher_id"
          required
          defaultValue=""
        >
          {/* TODO: Get data from server */}
          <MenuItem value="id1">Publisher 1</MenuItem>
          <MenuItem value="id2">Publisher 2</MenuItem>
          <MenuItem value="id3">Publisher 3</MenuItem>
        </TextField>

        <TextField
          select
          label="Language"
          name="language_code"
          required
          defaultValue="en"
          SelectProps={{
            MenuProps: {
              MenuListProps: {
                sx: {
                  maxHeight: 300,
                },
              },
            },
          }}
        >
          {Language.getAllLanguages().map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {`${lang.name} - ${lang.native}`}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Category"
          name="category_id"
          required
          defaultValue=""
        >
          {/* TODO: Get data from server */}
          <MenuItem value="id1">Category 1</MenuItem>
          <MenuItem value="id2">Category 2</MenuItem>
          <MenuItem value="id3">Category 3</MenuItem>
        </TextField>

        {/* TODO: Add Year Published field */}

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
