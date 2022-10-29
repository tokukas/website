import './bootstrap';
import '../styles/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
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

    // eslint-disable-next-line react/jsx-props-no-spreading
    root.render(<App {...props} />);
  },
});

InertiaProgress.init({ color: '#4B5563' });
