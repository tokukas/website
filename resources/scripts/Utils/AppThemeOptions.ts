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
      }
      : {
        // palette values for dark mode
      }
    ),
  },
});

export default AppThemeOptions;
