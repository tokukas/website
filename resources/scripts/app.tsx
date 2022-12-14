import '@fontsource/quicksand/300.css';
import '@fontsource/quicksand/400.css';
import '@fontsource/quicksand/500.css';
import '@fontsource/quicksand/700.css';
import '../styles/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { StyledEngineProvider } from '@mui/material';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import AppConfig from './Config/App';
import ThemeLayout from './Layouts/ThemeLayout';

const appName = AppConfig.name;

(async () => {
  await createInertiaApp({
    title: (title) => (title.toLowerCase().includes(appName.toLowerCase())
      ? title : `${title} - ${appName}`
    ),
    resolve: (name) => (
      resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob('./Pages/**/*.tsx'),
      )
    ),
    setup({ el, App, props }) {
      const root = createRoot(el);

      root.render(
        <React.StrictMode>
          <StyledEngineProvider injectFirst>
            <SnackbarProvider>
              <ThemeLayout>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <App {...props} />
              </ThemeLayout>
            </SnackbarProvider>
          </StyledEngineProvider>
        </React.StrictMode>,
      );
    },
  });
})();

InertiaProgress.init({ color: '#4B5563' });
