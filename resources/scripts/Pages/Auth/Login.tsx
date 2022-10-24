/* eslint-disable max-len */
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';
import route from 'ziggy-js';

type TPropsLogin = {
  status: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: TPropsLogin) {
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    email: '',
    password: '',
    remember: '',
  });

  useEffect(() => () => {
    reset('password');
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <div>
          <InputLabel forInput="email" value="Email" />

          <TextInput
            type="text"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused
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
            autoComplete="current-password"
            handleChange={onHandleChange}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="block mt-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="flex items-center">
            <Checkbox id="remember" name="remember" value={data.remember} handleChange={onHandleChange} />

            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Forgot your password?
            </Link>
          )}

          <PrimaryButton className="ml-4" processing={processing}>
            Log in
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
