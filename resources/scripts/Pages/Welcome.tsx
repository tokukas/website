import AppHead from '@/Components/AppHead';
import ColorModeContext from '@/Utils/ColorModeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Button, IconButton } from '@mui/material';
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
      <div className="flex gap-1 flex-wrap">
        <Button variant="contained">Primary</Button>
        <Button variant="outlined">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="outlined" color="secondary">Secondary</Button>
        <Button variant="contained" color="info">Info</Button>
        <Button variant="outlined" color="info">Info</Button>
        <Button variant="contained" color="success">Success</Button>
        <Button variant="outlined" color="success">Success</Button>
        <Button variant="contained" color="warning">Warning</Button>
        <Button variant="outlined" color="warning">Warning</Button>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="outlined" color="error">Error</Button>
      </div>
    </>
  );
}
