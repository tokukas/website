import { Publisher } from '@/Entities/Publisher';
import { useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import route from 'ziggy-js';

type AddPublisherFields = Omit<Publisher,
  'id' | 'created_at' | 'updated_at'
>;

// Create component Drawer to adding new publisher
export default function AddPublisherDrawer({
  open, onClose, sx, ...props
}: DrawerProps) {
  const {
    post, setData, errors, processing, wasSuccessful, reset,
  } = useForm<AddPublisherFields>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      event.target.name as keyof AddPublisherFields,
      event.target.value,
    );
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('publishers.store'));
  };

  React.useEffect(() => {
    if (wasSuccessful) {
      onClose?.({}, 'escapeKeyDown');
      reset();
    }
  }, [wasSuccessful]);

  return (
    <Drawer
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{
        ...sx,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          padding: '1.5rem',
          width: {
            xs: '86vw',
            sm: '70vw',
            md: '50vw',
            lg: '40vw',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Add Publisher
        </Typography>
        <IconButton
          onClick={() => {
            onClose?.({}, 'escapeKeyDown');
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        component="form"
        onSubmit={submitForm}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Name"
          name="name"
          required
          placeholder='e.g. "Oxford University Press"'
          onChange={handleInputChange}
          error={Boolean(errors.name || errors.slug)}
          helperText={errors.name || errors.slug}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  arrow
                  placement="left"
                  title="You can't add the publisher that already exist"
                >
                  <InfoIcon color="warning" />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={processing}
          sx={{ mt: 1 }}
        >
          Add Publisher
        </Button>
      </Box>
    </Drawer>
  );
}
