import SettingLayout from '@/Layouts/SettingLayout';
import ColorModeContext from '@/Utils/ColorModeContext';
import useTranslator from '@/Utils/Hooks/useTranslator';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function AppearanceSettings() {
  const { __ } = useTranslator([
    'Change the app appearance',
    'Dark Mode',
    'Light Mode',
  ]);

  const { colorMode, toggleColorMode } = React.useContext(ColorModeContext);

  const buttons = [
    {
      key: 'dark',
      name: 'Dark Mode',
      icon: <Brightness4Icon />,
    },
    {
      key: 'light',
      name: 'Light Mode',
      icon: <Brightness7Icon />,
    },
  ];

  return (
    <SettingLayout activeSidebarKey="appearance">
      <Typography variant="h5" gutterBottom>
        {__('Change the app appearance')}
      </Typography>

      <ButtonGroup>
        {buttons.map((button) => (
          <Button
            key={button.key}
            variant={colorMode === button.key ? 'contained' : 'outlined'}
            startIcon={button.icon}
            onClick={() => toggleColorMode()}
          >
            {__(button.name)}
          </Button>
        ))}
      </ButtonGroup>
    </SettingLayout>
  );
}
