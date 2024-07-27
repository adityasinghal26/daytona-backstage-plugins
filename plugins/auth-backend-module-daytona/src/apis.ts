import { ApiRef, BackstageIdentityApi, OpenIdConnectApi, ProfileInfoApi, SessionApi, createApiRef } from "@backstage/core-plugin-api";

export const daytonaAuthApiRef: ApiRef<
  OpenIdConnectApi & ProfileInfoApi & BackstageIdentityApi & SessionApi
> = createApiRef({
  id: 'auth.daytona.oidc',
});