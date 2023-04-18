import SettingLayout from '@/Layouts/SettingLayout';
import useTranslator from '@/Utils/Hooks/useTranslator';
import Language from '@/Utils/Language';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export type LanguageSettingsProps = {
  /**
   * List of available language.
   */
  languages: string[];
}

export default function LanguageSettings({ languages }: LanguageSettingsProps) {
  const { __, changeLanguage, lang } = useTranslator([
    'Change the app language',
  ]);

  return (
    <SettingLayout activeSidebarKey="language">
      <Typography variant="h5" gutterBottom>
        {__('Change the app language')}
      </Typography>

      <TextField
        id="language"
        select
        value={lang}
        fullWidth
        onChange={(e) => {
          changeLanguage(e.target.value);
        }}
      >
        {languages.map((l) => (
          <MenuItem key={l} value={l}>
            {Language.getLanguageByCode(l)?.native}
          </MenuItem>
        ))}
      </TextField>

    </SettingLayout>
  );
}
