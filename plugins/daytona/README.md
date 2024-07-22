# daytona

Welcome to the daytona plugin!

_This plugin was created through the Backstage CLI_

## Description

The Daytona plugin provides frontend components to connect to the Daytona API backend and view the workspaces for the authenticated user. You can create new Daytona workspaces directly from Backstage.

### Features

- Authenticate the user with Daytona Keycloak
- List all the workspaces for the authenticated user
- List workspaces of a specific repository for the authenticated user with appropriate annotations
- Create a new workspace by navigating to the Daytona instance

## Installation

The package shall be installed in the Backstage root directory as below.

```sh
yarn --cwd packages/app add @adityasinghal26/backstage-plugin-daytona
```

## Setup

### Standalone App requirements

1. Install the plugin dependency in your Backstage app package:

    ```bash
    # From your Backstage root directory
    yarn add --cwd packages/app @adityasinghal26/backstage-plugin-daytona
    ```

2. Add to the app `EntityPage` component:

    ```tsx
    import { DaytonaOverviewContent } from '@adityasinghal26/backstage-plugin-daytona';

    // Add the DaytonaOverviewContent to show the workspaces for that entity
    const overviewContent = (
      <Grid container spacing={3} alignItems="stretch">
        {/* other grid items here*/}

        <Grid item md={12} xs={12}>
          <DaytonaOverviewContent />
        </Grid>
      </Grid>
    );
    ```

3. Annotate your component with a correct Git repository. This will list the workspaces specific to the repository.

   The annotation key is `daytona.io/repo-url`.

   Example:

   ```yaml
   apiVersion: backstage.io/v1alpha1
   kind: Component
   metadata:
     name: backstage
     description: backstage.io
     annotations:
       daytona.io/repo-url: https://github.com/daytonaio-templates/go
   spec:
     type: website
     lifecycle: production
     owner: user:guest
   ```

### App Menu requirements

Ensure that the package is installed as mentioned in the Installation section.

1. Add to the app `App.tsx` component:

    ```tsx

    // In packages/app/src/App.tsx
    import { DaytonaPage } from '@adityasinghal26/backstage-plugin-daytona';

    // Add the route to the App path routes
    const routes = (
      <FlatRoutes>
      {/* other routes here */}
          <Route path="/daytona" element={<DaytonaPage />} />
      </FlatRoutes>
    );
    ```

2. Add to the app `Root.tsx` component:

    ```tsx
    // In packages/app/src/components/Root/App.tsx
    import MapIcon from '@material-ui/icons/MyLocation';

    // Add the menu to the Root menu sidebar
    export const Root = ({ children }: PropsWithChildren<{}>) => (
      <SidebarPage>
        <Sidebar>
        {/* other sidebar items here */}
        {/* add inside "Menu" SidebarGroup */}
          <SidebarItem icon={MapIcon} to="daytona" text="Daytona" />
        {/* other sidebar items here */}
        </Sidebar>
        {children}
      </SidebarPage>
    );
    ```

## Configuration

This plugin requires the domain URL for your Daytona instance. This can be configured in `app-config.yaml` file as per below snippet.

```yaml
daytona:
  domain: daytona.domain.com
```

### CORS Configuration for connecting Daytona APIs with Backstage

Below configurations need to be added in the 'watkins' ingress YAML which allows CORS connectivity. It allows Daytona URL along with Backstage URL for CORS policy.

```yaml
    nginx.ingress.kubernetes.io/cors-allow-credentials: "true"
    nginx.ingress.kubernetes.io/cors-allow-headers: Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, Content-Type, Accept, X-Requested-With
    nginx.ingress.kubernetes.io/cors-allow-methods: PUT, GET, POST, OPTIONS, DELETE
    nginx.ingress.kubernetes.io/cors-allow-origin: https://<backstage-app-url>, https://<daytona-domain-url>
    nginx.ingress.kubernetes.io/enable-cors: "true"
```

## Setup Backstage Auth with Keycloak

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
