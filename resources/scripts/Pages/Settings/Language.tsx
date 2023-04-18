import SettingLayout from '@/Layouts/SettingLayout';
import useTranslator from '@/Utils/Hooks/useTranslator';
import Language from '@/Utils/Language';
import { router, usePage } from '@inertiajs/react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import route from 'ziggy-js';

export type LanguageSettingsProps = {
  languages: string[];
}

export default function LanguageSettings({ languages }: LanguageSettingsProps) {
  const { __ } = useTranslator([
    'Change the app language',
  ]);

  const locale = usePage().props.locale as string;

  return (
    <SettingLayout activeSidebarKey="language">
      <Typography variant="h5" gutterBottom>
        {__('Change the app language')}
      </Typography>

      <TextField
        id="language"
        select
        value={locale}
        fullWidth
        onChange={(e) => {
          router.post(route('settings.language.set'), {
            language: e.target.value,
          });
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang} value={lang}>
            {Language.getLanguageByCode(lang)?.native}
          </MenuItem>
        ))}
      </TextField>

    </SettingLayout>
  );
}
