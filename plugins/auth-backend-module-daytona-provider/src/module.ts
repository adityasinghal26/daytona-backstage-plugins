import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { authProvidersExtensionPoint, createOAuthProviderFactory } from '@backstage/plugin-auth-node';
import { oidcAuthenticator } from '@backstage/plugin-auth-backend-module-oidc-provider';

export const authModuleDaytonaProvider = createBackendModule({
  pluginId: 'auth',
  moduleId: 'daytona',
  register(reg) {
    reg.registerInit({
      deps: {
        providers: authProvidersExtensionPoint,
        logger: coreServices.logger,
      },
      async init({ providers, logger }) {
        logger.info('Registering daytona OAuth Provider!');
        providers.registerProvider({
          providerId: 'daytona',
          factory: createOAuthProviderFactory({
            authenticator: oidcAuthenticator,
          })
        })
      },
    });
  },
});
