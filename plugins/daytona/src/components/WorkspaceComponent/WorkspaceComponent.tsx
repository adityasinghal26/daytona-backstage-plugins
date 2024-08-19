import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
} from '@backstage/core-components';
import { WorkspaceListComponent } from '../WorkspaceListComponent';

export const WorkspaceComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to Daytona!">
      <HeaderLabel label="Owner" value="Daytona" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Daytona Workspaces" />
      <Grid container spacing={3} direction="column">
        <Grid item>
          <WorkspaceListComponent />
          {/* <WorkspaceListComponentTeam /> */}
        </Grid>
      </Grid>
    </Content>
  </Page>
);
