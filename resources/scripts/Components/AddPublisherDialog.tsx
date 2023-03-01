import { Publisher } from '@/Entities/Publisher';
import { OptionalExceptFor } from '@/Utils/Types';
import { useSnackbar } from 'notistack';
import React from 'react';
import route from 'ziggy-js';
import DismissSnackbarAction from './DismissSnackbarAction';
import BaseFormDialog, { TPropsFormDialog } from './FormDialog';

type AddPublisherFields = Partial<Omit<
  Publisher,
  'id' | 'created_at' | 'updated_at'
>>;

type TPropsAddPublisherDialog = OptionalExceptFor<
  TPropsFormDialog<AddPublisherFields>,
  'open' | 'onClose'
>;

const FormDialog = BaseFormDialog<AddPublisherFields>;

export default function AddPublisherDialog({
  onSuccess, ...props
}: TPropsAddPublisherDialog) {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <FormDialog
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      title="Add Publisher"
      method="post"
      route={route('publishers.store')}
      formFields={[
        {
          name: 'name',
          validationKey: 'slug',
          label: 'Publisher Name',
          required: true,
          placeholder: 'e.g. "Oxford University Press"',
        },
      ]}
      description="Fill this form to add a new publisher.
        Please don't add the publisher that already exist."
      submitButtonName="Add"
      onSuccess={() => {
        enqueueSnackbar('Publisher successfully added', {
          variant: 'success',
          action: DismissSnackbarAction,
          preventDuplicate: true,
        });
        onSuccess?.();
      }}
    />
  );
}
