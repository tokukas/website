import Footer from '@/Components/Footer';
import Link from '@/Components/Link';
import { Image } from '@/Entities/Image';
import { Product } from '@/Entities/Product';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { getImageUrl } from '@/Utils/Helpers/Images';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import route from 'ziggy-js';

export type TPropsWelcome = {
  photoPlaceholder: string;
  products: readonly Product[];
}

export default function Welcome({ photoPlaceholder, products }: TPropsWelcome) {
  /**
   * Get product photo or use placeholder if not available.
   */
  const getPhoto = (photos?: Image[], index = 0) => {
    const photo = photos?.at(index);
    return photo ? getImageUrl(photo, {
      width: 160,
      type: 'webp',
    }) : photoPlaceholder;
  };

  return (
    <DefaultLayout
      title="Tokukas - Toko Buku Bekas"
      description="Tokukas adalah tempat jual beli buku bekas berkualitas
        dengan harga terjangkau. #YangBekasPastiLebihMurah"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 160px)',
          rowGap: 3,
          columnGap: 2,
          justifyContent: 'center',
          mt: 2,
          py: 4,
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
                image={getPhoto(product.photos)}
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

      <Footer />
    </DefaultLayout>
  );
}
