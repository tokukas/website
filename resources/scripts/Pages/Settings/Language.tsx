import SettingLayout from '@/Layouts/SettingLayout';
import useTranslator from '@/Utils/Hooks/useTranslator';
import Language from '@/Utils/Language';
import { router } from '@inertiajs/react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import route from 'ziggy-js';

export type LanguageSettingsProps = {
  /**
   * List of available language.
   */
  languages: string[];
}

export default function LanguageSettings({ languages }: LanguageSettingsProps) {
  const { __, lang } = useTranslator([
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
          router.post(route('settings.language.set'), {
            language: e.target.value,
          }, {
            onSuccess: () => window.location.reload(),
          });
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
