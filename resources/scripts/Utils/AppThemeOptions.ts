import { PaletteMode, ThemeOptions } from '@mui/material';

/**
 * The app theme options. Defines the theme for the app.
 * @param colorMode The color mode. Either 'light' or 'dark'.
 * @returns The theme options.
 */
const AppThemeOptions = (colorMode: PaletteMode): ThemeOptions => ({
  palette: {
    mode: colorMode,
    ...(colorMode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: '#0066cc',
          light: '#5c93ff',
          dark: '#003d9a',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#0000cc',
          light: '#633aff',
          dark: '#000099',
          contrastText: '#ffffff',
        },
      }
      : {
        // palette values for dark mode
        primary: {
          main: '#0098ff',
          light: '#69c8ff',
          dark: '#006bcb',
          contrastText: '#000000',
        },
        secondary: {
          main: '#6128e2',
          light: '#9a59ff',
          dark: '#1400af',
          contrastText: '#ffffff',
        },
      }
    ),
  },
});

export default AppThemeOptions;
