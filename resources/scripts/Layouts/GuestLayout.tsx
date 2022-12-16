import BrandLogo from '@/Components/BrandLogo';
import Link from '@/Components/Link';
import ColorModeContext from '@/Utils/ColorModeContext';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import * as React from 'react';
import BaseLayout from './BaseLayout';

type TPropsGuestLayout = {
  children: React.ReactNode;
}

export default function Guest({ children }: TPropsGuestLayout) {
  const { colorMode, toggleColorMode } = React.useContext(ColorModeContext);

  return (
    <BaseLayout>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: {
            sm: 'start',
            md: 'center',
          },
          alignItems: 'center',
        }}
      >
        <Tooltip
          title={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          placement="left"
        >
          <Zoom in>
            <Fab
              color="primary"
              aria-label="Theme Toggle"
              size="small"
              sx={{
                position: 'fixed',
                top: 16,
                right: 16,
              }}
              onClick={toggleColorMode}
            >
              {colorMode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </Fab>
          </Zoom>
        </Tooltip>
        <Paper
          className="w-full max-w-md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: 6,
            py: 4,
            overflow: 'hidden',
          }}
        >
          <Link href="/" sx={{ mb: 4 }}>
            <BrandLogo className="w-24" />
          </Link>
          {children}
        </Paper>
      </Box>
    </BaseLayout>
  );
}
