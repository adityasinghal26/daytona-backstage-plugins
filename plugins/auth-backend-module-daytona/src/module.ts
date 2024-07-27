import { createBackendModule } from '@backstage/backend-plugin-api';
import { authProvidersExtensionPoint, createOAuthProviderFactory } from '@backstage/plugin-auth-node';
import { oidcAuthenticator } from '@backstage/plugin-auth-backend-module-oidc-provider';

export const authModuleDaytona = createBackendModule({
    pluginId: 'auth',
    moduleId: 'daytona',
    register(reg) {
      reg.registerInit({
        deps: { providers: authProvidersExtensionPoint },
        async init({ providers }) {
          providers.registerProvider({
            providerId: 'daytona',
            factory: createOAuthProviderFactory({
              authenticator: oidcAuthenticator,
            }),
          });
        },
      });
    },
  });