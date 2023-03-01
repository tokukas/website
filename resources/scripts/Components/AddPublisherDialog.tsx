import { Publisher } from '@/Entities/Publisher';
import { OptionalExceptFor } from '@/Utils/Types';
import { useForm } from '@inertiajs/react';
import TextField from '@mui/material/TextField';
import React from 'react';
import route from 'ziggy-js';
import FormDialog, { TPropsFormDialog } from './FormDialog';

type AddPublisherFields = Partial<Omit<
  Publisher,
  'id' | 'created_at' | 'updated_at'
>>;

type TPropsAddPublisherDialog = OptionalExceptFor<
  TPropsFormDialog<AddPublisherFields>,
  'open' | 'onClose'
>;

export default function AddPublisherDialog({
  onClose, values, ...props
}: TPropsAddPublisherDialog) {
  const {
    post, setData, data, errors, clearErrors, processing, reset, wasSuccessful,
  } = useForm<AddPublisherFields>(values);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      event.target.name as keyof AddPublisherFields,
      event.target.value,
    );
  };

  return (
    <FormDialog
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      title="Add Publisher"
      onSubmit={(e) => {
        e.preventDefault();
        post(route('publishers.store'));
        reset();
      }}
      onClose={(e, r) => {
        clearErrors();
        onClose?.(e, r);
      }}
      description="Fill this form to add a new publisher.
        Please don't add the publisher that already exist."
      submitButtonName="Add"
      processing={processing}
      wasSuccessful={wasSuccessful}
    >
      <TextField
        label="Publisher Name"
        name="name"
        required
        value={data.name}
        placeholder='e.g. "Oxford University Press"'
        onChange={handleInputChange}
        error={Boolean(errors.name || errors.slug)}
        helperText={errors.name || errors.slug}
      />
    </FormDialog>
  );
}
