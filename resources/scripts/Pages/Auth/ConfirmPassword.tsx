/* eslint-disable max-len */
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';
import route from 'ziggy-js';

export default function ConfirmPassword() {
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    password: '',
  });

  useEffect(() => () => {
    reset('password');
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData('password', event.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('password.confirm'));
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <form onSubmit={submit}>
        <div className="mt-4">
          <InputLabel forInput="password" value="Password" />

          <TextInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            isFocused
            handleChange={onHandleChange}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" processing={processing}>
            Confirm
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
