import '../styles/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { StyledEngineProvider } from '@mui/material';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppConfig from './Config/App';

const appName = AppConfig.name;

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
      <StyledEngineProvider injectFirst>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <App {...props} />
      </StyledEngineProvider>,
    );
  },
});

InertiaProgress.init({ color: '#4B5563' });
