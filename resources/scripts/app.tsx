import '@fontsource/quicksand/300.css';
import '@fontsource/quicksand/400.css';
import '@fontsource/quicksand/500.css';
import '@fontsource/quicksand/700.css';
import { createInertiaApp } from '@inertiajs/react';
import { StyledEngineProvider } from '@mui/material';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import '../styles/app.css';
import AppConfig from './Config/App';
import ThemeLayout from './Layouts/ThemeLayout';
import './bootstrap';

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
              <CookiesProvider>
                <ThemeLayout>
                  <App {...props} />
                </ThemeLayout>
              </CookiesProvider>
            </SnackbarProvider>
          </StyledEngineProvider>
        </React.StrictMode>,
      );
    },
    progress: {
      color: '#4B5563',
    },
  });
})();
