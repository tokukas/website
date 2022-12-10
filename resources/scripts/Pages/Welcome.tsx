import AppHead from '@/Components/AppHead';
import Navbar from '@/Components/Navbar';
import BaseLayout from '@/Layouts/BaseLayout';
import * as React from 'react';

export default function Welcome() {
  return (
    <BaseLayout>
      <AppHead
        title="Tokukas - Toko Buku Bekas"
        description="Tokukas adalah tempat jual beli buku bekas berkualitas
          dengan harga terjangkau. #YangBekasPastiLebihMurah"
      />
      <Navbar />
    </BaseLayout>
  );
}
