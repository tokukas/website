import AutocompleteAddOption, {
  TOption,
} from '@/Components/AutocompleteAddOption';
import FieldSection from '@/Components/FieldSection';
import FormDialog from '@/Components/FormDialog';
import Link from '@/Components/Link';
import { Author } from '@/Entities/Author';
import { Book } from '@/Entities/Book';
import { Category } from '@/Entities/Category';
import { Publisher } from '@/Entities/Publisher';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Language from '@/Utils/Language';
import { useForm } from '@inertiajs/react';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
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
  authors: readonly Author[];
  categories: readonly Category[];
  data: Record<keyof Book, unknown>;
  publishers: readonly Publisher[];
}

type AddBookFields = Omit<Book,
  'id' | 'created_at' | 'updated_at' | 'publisher'
> & {
  author_ids: string[];
};

type AuthorOptionType = TOption<Author, 'name'>;
type CategoryOptionType = TOption<Category, 'name'>;
type PublisherOptionType = TOption<Publisher, 'name'>;

export default function AddBook({
  authors,
  categories,
  data,
  publishers,
}: TPropsAddBook) {
  const [dayjsValue, setDayjs] = React.useState<Dayjs | null>(null);

  const {
    clearErrors, errors, post, processing, setData,
  } = useForm<AddBookFields>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors(event.target.name as keyof AddBookFields);
    setData(
      event.target.name as keyof AddBookFields,
      event.target.value,
    );
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('books.store'));
  };

  const [optionDialog, setOptionDialog] = React.useState<
    'publisher' | 'category' | 'author' | null>(null);

  const [categoryDialogValue, setCategoryDialogValue] = React.useState<
    Pick<Category, 'name'> | null>(null);

  const [publisherDialogValue, setPublisherDialogValue] = React.useState<
    Pick<Partial<Publisher>, 'name' | 'slug'> | null>(null);

  const [authorDialogValue, setAuthorDialogValue] = React.useState<
    Pick<Author, 'name'> | null>(null);

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
            autoFocus
            label="Title"
            name="title"
            defaultValue={data.title}
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
                placeholder="Select a language"
                error={Boolean(errors.language_code)}
                helperText={errors.language_code}
              />
            )}
            onChange={(event, newValue) => {
              clearErrors('language_code');
              setData('language_code', newValue?.code ?? '');
            }}
          />

          <AutocompleteAddOption
            options={publishers as readonly PublisherOptionType[]}
            dataKey="id"
            labelKey="name"
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Publisher (optional)"
                name="publisher_id"
                placeholder="Select a publisher"
                error={Boolean(errors.publisher_id)}
                helperText={errors.publisher_id ?? 'The publisher of the book'}
              />
            )}
            setData={(value) => {
              clearErrors('publisher_id');
              setData('publisher_id', value ?? '');
            }}
            onSelectAddOption={(inputValue) => {
              setOptionDialog('publisher');
              setPublisherDialogValue({ name: inputValue });
            }}
          />

          <DatePicker
            label="Year Published"
            views={['year']}
            openTo="year"
            value={dayjsValue}
            maxDate={dayjs()}
            onChange={(newValue) => {
              clearErrors('year_published');
              setDayjs(newValue);
              setData('year_published', newValue?.year() ?? 0);
            }}
            renderInput={(props) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                name="year_published"
                error={Boolean(errors.year_published)}
                helperText={errors.year_published
                  ?? 'The year this book was published'}
              />
            )}
          />

          <TextField
            label="ISBN (optional)"
            name="isbn"
            placeholder='e.g. "978-3-16-148410-0"'
            error={Boolean(errors.isbn)}
            helperText={errors.isbn ?? 'International Standard Book Number'}
            onChange={handleInputChange}
          />

          <AutocompleteAddOption
            multiple
            options={authors as readonly AuthorOptionType[]}
            dataKey="id"
            labelKey="name"
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Authors (optional)"
                name="authors"
                placeholder="Select authors"
                error={Boolean(errors.author_ids)}
                helperText={errors.author_ids ?? 'The authors of the book'}
              />
            )}
            setData={(values) => {
              clearErrors('author_ids');
              setData('author_ids', values);
            }}
            onSelectAddOption={(inputValue) => {
              setOptionDialog('author');
              setAuthorDialogValue({ name: inputValue });
            }}
          />

        </FieldSection>

        <FieldSection title="Physical Information">
          <TextField
            type="number"
            label="Number of Pages"
            name="num_of_pages"
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
            placeholder="0.00"
            error={Boolean(errors.weight)}
            helperText={errors.weight ?? 'The weight of the book in grams'}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">gr</InputAdornment>,
              inputProps: {
                min: 0,
                step: 0.01,
              },
            }}
          />

          <TextField
            type="number"
            label="Width"
            name="width"
            placeholder="0.00"
            error={Boolean(errors.width)}
            helperText={errors.width ?? 'The width of the book in centimeters'}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              inputProps: {
                min: 0,
                step: 0.01,
              },
            }}
          />

          <TextField
            type="number"
            label="Height"
            name="height"
            placeholder="0.00"
            error={Boolean(errors.height)}
            helperText={errors.height
              ?? 'The height of the book in centimeters'}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              inputProps: {
                min: 0,
                step: 0.01,
              },
            }}
          />
        </FieldSection>

        <FieldSection title="Additional Information">
          <AutocompleteAddOption
            options={categories as readonly CategoryOptionType[]}
            dataKey="id"
            labelKey="name"
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Category (optional)"
                name="category_id"
                placeholder="Select a category"
                error={Boolean(errors.category_id)}
                helperText={errors.category_id ?? 'What kind of book is this?'}
              />
            )}
            setData={(value) => {
              clearErrors('category_id');
              setData('category_id', value ?? '');
            }}
            onSelectAddOption={(inputValue) => {
              setOptionDialog('category');
              setCategoryDialogValue({ name: inputValue });
            }}
          />

          <TextField
            label="Description (optional)"
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
            disabled={processing}
            sx={{
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Add Book
          </Button>
        </Box>
      </Box>

      {optionDialog === 'publisher' && (
        <FormDialog
          open
          title="Add Publisher"
          values={publisherDialogValue}
          method="post"
          route={route('publishers.store')}
          formFields={[{
            name: 'name',
            validationKey: 'slug',
            label: 'Publisher Name',
            placeholder: 'e.g. "Oxford University Press"',
          }]}
          onClose={() => {
            setOptionDialog(null);
            setPublisherDialogValue(null);
            setData('publisher_id', '');
          }}
          submitButtonName="Add"
          messageOnSuccess="Publisher successfully added"
          description="Fill this form to add a new publisher.
            Please don't add the publisher that already exist."
        />
      )}

      {optionDialog === 'category' && (
        <FormDialog
          open
          title="Add Category"
          values={categoryDialogValue}
          method="post"
          route={route('categories.store')}
          formFields={[{
            name: 'name',
            label: 'Category Name',
            placeholder: 'e.g. "Science Fiction"',
          }]}
          onClose={() => {
            setOptionDialog(null);
            setCategoryDialogValue(null);
            setData('category_id', '');
          }}
          submitButtonName="Add"
          messageOnSuccess="Category successfully added"
          description="Fill this form to add a new category.
            Please don't add the category that already exist."
        />
      )}

      {optionDialog === 'author' && (
        <FormDialog
          open
          title="Add Author"
          values={authorDialogValue}
          method="post"
          route={route('authors.store')}
          formFields={[{
            name: 'name',
            label: 'Author Name',
            placeholder: 'e.g. "John Doe"',
          }]}
          onClose={() => {
            setOptionDialog(null);
            setAuthorDialogValue(null);
          }}
          submitButtonName="Add"
          messageOnSuccess="Author successfully added"
          description="Fill this form to add a new author.
            Please don't add the author that already exist."
        />
      )}
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
