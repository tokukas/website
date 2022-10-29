/* eslint-disable max-len */
import AppHead from '@/Components/AppHead';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import route from 'ziggy-js';

type TPropsForgotPassword = {
  status: string;
}

export default function ForgotPassword({ status }: TPropsForgotPassword) {
  const {
    data, setData, post, processing, errors,
  } = useForm({
    email: '',
  });

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData('email', event.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <AppHead
        title="Lupa Kata Sandi"
        description="Lupa kata sandi? Tidak masalah. Masukkan alamat email
          Anda di bawah ini dan kami akan mengirimkan tautan untuk mengatur
          ulang kata sandi Anda."
      />

      <div className="mb-4 text-sm text-gray-500 leading-normal">
        Forgot your password? No problem. Just let us know your email address and we will email you a password
        reset link that will allow you to choose a new one.
      </div>

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <TextInput
          type="text"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          isFocused
          handleChange={onHandleChange}
        />

        <InputError message={errors.email} className="mt-2" />

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" processing={processing}>
            Email Password Reset Link
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
