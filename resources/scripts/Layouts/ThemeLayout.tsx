import AppThemeOptions from '@/Utils/AppThemeOptions';
import ColorModeContext from '@/Utils/ColorModeContext';
import {
  createTheme, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery,
} from '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface Palette {
    shopee: Palette['primary'];
    tokopedia: Palette['primary'];
  }

  interface PaletteOptions {
    shopee: PaletteOptions['primary'];
    tokopedia: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    shopee: true;
    tokopedia: true;
  }
}

type TPropsThemeLayout = {
  children?: React.ReactNode;
}

export default function ThemeLayout({ children }: TPropsThemeLayout) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [colorMode, setColorMode] = React.useState<PaletteMode>(
    prefersDarkMode ? 'dark' : 'light',
  );

  const colorModeContext = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setColorMode((prevMode) => (
          prevMode === 'light' ? 'dark' : 'light'
        ));
      },
      // The current color modes
      colorMode,
    }),
    [colorMode],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme(AppThemeOptions(colorMode)),
    [colorMode],
  );

  return (
    <ColorModeContext.Provider value={colorModeContext}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

ThemeLayout.defaultProps = {
  children: null,
};
