import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { authProvidersExtensionPoint, commonSignInResolvers, createOAuthProviderFactory } from '@backstage/plugin-auth-node';
import { oidcAuthenticator } from '@backstage/plugin-auth-backend-module-oidc-provider';
import { stringifyEntityRef, DEFAULT_NAMESPACE } from '@backstage/catalog-model';

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
            signInResolverFactories: {
              ...commonSignInResolvers
            },
            async signInResolver({ profile }, ctx) {
              if (!profile.email) {
                throw new Error(
                  'Login failed, user profile does not contain an email',
                );
              }
              // Split the email into the local part and the domain.
              const [localPart, domain] = profile.email.split('@');
            
              // Next we verify the email domain. It is recommended to include this
              // kind of check if you don't look up the user in an external service.
              if (domain !== 'gmail.com') {
                throw new Error(
                  `Login failed, '${profile.email}' does not belong to the expected domain`,
                );
              }
            
              // By using `stringifyEntityRef` we ensure that the reference is formatted correctly
              const userEntity = stringifyEntityRef({
                kind: 'User',
                name: localPart,
                namespace: DEFAULT_NAMESPACE,
              });
              return ctx.issueToken({
                claims: {
                  sub: userEntity,
                  ent: [userEntity],
                },
              });
            }
          })
        })
      },
    });
  },
});
