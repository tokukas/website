/* eslint-disable max-len */
import AppHead from '@/Components/AppHead';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';

type TPropsDashboard = {
  auth: {
    user: {
      name: string;
      email: string;
    };
  };
}

export default function Dashboard({ auth }: TPropsDashboard) {
  return (
    <AuthenticatedLayout
      auth={auth}
      // errors={errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <AppHead title="Dashboard" description="Dashboard Tokukas Anda." />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">You&apos;re logged in!</div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
