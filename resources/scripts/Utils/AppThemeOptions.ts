import { PaletteMode, ThemeOptions } from '@mui/material';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-date-pickers/themeAugmentation';

/**
 * The app theme options. Defines the theme for the app.
 * @param colorMode The color mode. Either 'light' or 'dark'.
 * @returns The theme options.
 */
const AppThemeOptions = (colorMode: PaletteMode): ThemeOptions => ({
  typography: {
    fontFamily: 'Quicksand, sans-serif',
  },
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
        shopee: {
          main: '#ee4d2d',
          contrastText: '#ffffff',
        },
        tokopedia: {
          main: '#03ac0e',
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
        shopee: {
          main: '#ee4d2d',
          contrastText: '#ffffff',
        },
        tokopedia: {
          main: '#03ac0e',
          contrastText: '#ffffff',
        },
      }
    ),
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        // style overrides for the data grid.
        // ...
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        // style overrides for the date picker.
        // ...
      },
    },
  },
});

export default AppThemeOptions;
