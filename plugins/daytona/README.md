# daytona

Welcome to the daytona plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/daytona](http://localhost:3000/daytona).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

## CORS Configuration for connecting Daytona APIs with Backstage

Below configurations need to be added in the 'watkins' ingress YAML which allows CORS connectivity. It allows Daytona URL along with Backstage URL for CORS policy.

```yaml
    nginx.ingress.kubernetes.io/cors-allow-credentials: "true"
    nginx.ingress.kubernetes.io/cors-allow-headers: Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, Content-Type, Accept, X-Requested-With
    nginx.ingress.kubernetes.io/cors-allow-methods: PUT, GET, POST, OPTIONS, DELETE
    nginx.ingress.kubernetes.io/cors-allow-origin: https://zany-barnacle-977476vgq4pcp59p-8000.app.github.dev, https://daytona.adisinghal.com
    nginx.ingress.kubernetes.io/enable-cors: "true"
```

## Setup Auth with Backstage

Backstage shall be registered as a Keycloak client in the default realm. Once the client is created, client ID and secret can be configured in the Backstage instance.

1. Create Keycloak client in the `default` realm using [`backstage.json`](./backstage.json) file.
2. Register the newly created client for authentication in backstage.

   ```yaml
   auth:
    environment: production
    providers:
      daytona:
        production:
          clientId: <daytona-client-id>
          clientSecret: <daytona-client-secret>
          metadataUrl: https://id.<daytona-domain-url>/realms/default/.well-known/openid-configuration
          prompt: auto
   ```
