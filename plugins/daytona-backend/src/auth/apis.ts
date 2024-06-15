import { OAuth2 } from "@backstage/core-app-api";
import { ApiRef, BackstageIdentityApi, OpenIdConnectApi, ProfileInfoApi, SessionApi, configApiRef, createApiFactory, createApiRef, discoveryApiRef, oauthRequestApiRef } from "@backstage/core-plugin-api";

export const daytonaAuthApiRef: ApiRef<
  OpenIdConnectApi & ProfileInfoApi & BackstageIdentityApi & SessionApi
> = createApiRef({
  id: 'auth.daytona.oidc',
});

export const daytonaApiFactory = createApiFactory({
api: daytonaAuthApiRef,
deps: {
    discoveryApi: discoveryApiRef,
    oauthRequestApi: oauthRequestApiRef,
    configApi: configApiRef,
},
factory: ({ discoveryApi, oauthRequestApi, configApi }) =>
    OAuth2.create({
        configApi,
        discoveryApi,
        oauthRequestApi,
        provider: {
            id: 'daytona',
            title: 'Daytona Keycloak auth provider',
            icon: () => null,
        },
        environment: configApi.getOptionalString('auth.environment'),
        defaultScopes: ['openid', 'profile', 'email'],
        popupOptions: {
            // optional, used to customize login in popup size
            size: {
            fullscreen: false,
            },
            /**
             * or specify popup width and height
             * size: {
                 width: 1000,
                height: 1000,
            }
            */
        },
    }),
});