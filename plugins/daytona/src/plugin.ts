import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { DaytonaApiClient, daytonaApiRef } from './api';
import { daytonaAuthApiRef } from '@daytona/daytona-web';

export const daytonaPlugin = createPlugin({
  id: 'daytona',
  apis: [
    createApiFactory({
      api: daytonaApiRef,
      deps: { configApi: configApiRef , daytonaAuthApi: daytonaAuthApiRef },
      factory: ({ configApi, daytonaAuthApi }) => new DaytonaApiClient({configApi, daytonaAuthApi})
    })
  ],
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
