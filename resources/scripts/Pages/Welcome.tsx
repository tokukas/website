import AppHead from '@/Components/AppHead';
import ColorModeContext from '@/Utils/ColorModeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import React from 'react';

export default function Welcome() {
  const { colorMode, toggleColorMode } = React.useContext(ColorModeContext);
  return (
    <>
      <AppHead
        title="Tokukas - Toko Buku Bekas"
        description="Tokukas adalah tempat jual beli buku bekas berkualitas
          dengan harga terjangkau. #YangBekasPastiLebihMurah"
      />
      <IconButton
        sx={{ ml: 1 }}
        onClick={toggleColorMode}
        color="inherit"
      >
        {colorMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
}
