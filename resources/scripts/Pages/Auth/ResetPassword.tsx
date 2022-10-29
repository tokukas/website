import AppHead from '@/Components/AppHead';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';
import route from 'ziggy-js';

type TPropsResetPassword = {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: TPropsResetPassword) {
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => () => {
    reset('password', 'password_confirmation');
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('password.update'));
  };

  return (
    <GuestLayout>
      <AppHead
        title="Atur Ulang Kata Sandi"
        description="Buat kata sandi baru untuk akun Anda.
          Pastikan kata sandi Anda kuat dan mudah diingat."
      />

      <form onSubmit={submit}>
        <div>
          <InputLabel forInput="email" value="Email" />

          <TextInput
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            handleChange={onHandleChange}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel forInput="password" value="Password" />

          <TextInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            isFocused
            handleChange={onHandleChange}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            forInput="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            handleChange={onHandleChange}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" processing={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
