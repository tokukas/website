import { PaletteMode } from '@mui/material';
import { createContext } from 'react';

type ColorModeContextType = {
  colorMode: PaletteMode;
  toggleColorMode: () => void;
}

/**
 * The color mode context is used to share the color mode between the
 * layout and the button.
 */
const ColorModeContext = createContext({} as ColorModeContextType);

export default ColorModeContext;
