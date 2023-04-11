import AppHead from '@/Components/AppHead';
import Link from '@/Components/Link';
import Navbar from '@/Components/Navbar';
import DashboardMenu from '@/Components/Navbar/MenuItem/Items/DashboardMenu';
import LoginMenu from '@/Components/Navbar/MenuItem/Items/LoginMenu';
import RegisterMenu from '@/Components/Navbar/MenuItem/Items/RegisterMenu';
import SettingsMenu from '@/Components/Navbar/MenuItem/Items/SettingsMenu';
import { Product } from '@/Entities/Product';
import BaseLayout from '@/Layouts/BaseLayout';
import useTranslator from '@/Utils/Hooks/useTranslator';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import route from 'ziggy-js';

export type TPropsWelcome = {
  photoPlaceholder: string;
  products: readonly Product[];
}

export default function Welcome({ photoPlaceholder, products }: TPropsWelcome) {
  const { __ } = useTranslator([
    'Dashboard',
    'Login',
    'Register',
    'Settings',
  ]);

  return (
    <>
      <AppHead
        title="Tokukas - Toko Buku Bekas"
        description="Tokukas adalah tempat jual beli buku bekas berkualitas
          dengan harga terjangkau. #YangBekasPastiLebihMurah"
      />
      <Navbar
        setMainUserMenus={(isUserAuthenticated) => (isUserAuthenticated
          ? [
            DashboardMenu,
            SettingsMenu,
          ] : [
            LoginMenu,
            RegisterMenu,
          ]
        )}
      />

      <Container
        sx={{
          paddingTop: '72px',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 160px)',
            rowGap: 3,
            columnGap: 2,
            justifyContent: 'center',
            mt: 4,
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{ width: 160 }}
              elevation={3}
            >
              <CardActionArea
                LinkComponent={Link}
                href={route('products.show', product)}
                sx={{ height: '100%' }}
              >
                <CardMedia
                  sx={{ width: 160, height: 160 }}
                  image={product.photos?.at(0)?.url ?? photoPlaceholder}
                  title={product.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </Typography>
                  <Typography color="text.primary" fontWeight="bold">
                    {`Rp${product.price}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
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
