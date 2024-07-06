import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const daytonaPlugin = createPlugin({
  id: 'daytona',
  routes: {
    root: rootRouteRef,
  },
});

export const DaytonaPage = daytonaPlugin.provide(
  createRoutableExtension({
    name: 'DaytonaPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
