import AppHead from '@/Components/AppHead';
import Navbar from '@/Components/Navbar';
import BaseLayout from '@/Layouts/BaseLayout';
import * as React from 'react';

export default function Welcome() {
  return (
    <>
      <AppHead
        title="Tokukas - Toko Buku Bekas"
        description="Tokukas adalah tempat jual beli buku bekas berkualitas
          dengan harga terjangkau. #YangBekasPastiLebihMurah"
      />
      <Navbar />
    </>
  );
}

/**
 * Set the parent layout for this page.
 *
 * @see https://inertiajs.com/pages#persistent-layouts
 */
Welcome.layout = (children: React.ReactNode) => (
  <BaseLayout>{children}</BaseLayout>
);
