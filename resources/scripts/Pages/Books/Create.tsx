import AutocompleteAddOption, {
  TOption,
} from '@/Components/AutocompleteAddOption';
import FieldSection from '@/Components/FieldSection';
import FormDialog from '@/Components/FormDialog';
import Link from '@/Components/Link';
import { Book } from '@/Entities/Book';
import { Category } from '@/Entities/Category';
import { Publisher } from '@/Entities/Publisher';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Language from '@/Utils/Language';
import { OptionalExceptFor } from '@/Utils/Types';
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
  publishers: readonly Publisher[];
  categories: readonly Category[];
}

type AddBookFields = Omit<Book,
  'id' | 'created_at' | 'updated_at' | 'publisher'
>;

type PublisherOptionType = OptionalExceptFor<Publisher, 'name'>;
type CategoryOptionType = OptionalExceptFor<Category, 'name'>;

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

  const [openDialog, setOpenDialog] = React.useState<
    'publisher' | 'category' | null>(null);

  const [dialogValues, setDialogValue] = React.useState<TOption | null>(null);

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

          <AutocompleteAddOption
            options={publishers as readonly PublisherOptionType[]}
            dataKey="id"
            labelKey="name"
            value={dialogValues}
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
            setData={(key, value) => setData('publisher_id', value ?? '')}
            setValue={setDialogValue}
            onSelectAddOption={() => setOpenDialog('publisher')}
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
          <AutocompleteAddOption
            options={categories as readonly CategoryOptionType[]}
            dataKey="id"
            labelKey="name"
            value={dialogValues}
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
            setData={(key, value) => setData('category_id', value ?? '')}
            setValue={setDialogValue}
            onSelectAddOption={() => setOpenDialog('category')}
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

      <FormDialog
        open={openDialog !== null}
        method="post"
        values={dialogValues}
        submitButtonName="Add"
        title="Add Publisher"
        route={route('publishers.store')}
        formFields={[{
          name: 'name',
          validationKey: 'slug',
          label: 'Publisher Name',
          required: true,
          placeholder: 'e.g. "Oxford University Press"',
        }]}
        onClose={() => {
          setOpenDialog(null);
          setDialogValue(null);
          setData(openDialog === 'category'
            ? 'category_id' : 'publisher_id', '');
        }}
        messageOnSuccess="Publisher successfully added"
        description={`
          Fill this form to add a new ${openDialog ?? 'publisher'}. 
          Please don't add the ${openDialog ?? 'publisher'} that already exist.
        `}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(openDialog === 'category' && {
          title: 'Add Category',
          route: '/',
          formFields: [{
            name: 'name',
            validationKey: 'name',
            label: 'Category Name',
            required: true,
            placeholder: 'e.g. "Fiction"',
          }],
          messageOnSuccess: 'Category successfully added',
        })}
      />
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
