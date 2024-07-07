import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { WorkspacesListComponent } from '../WorkspaceListComponent';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to Daytona!">
      <HeaderLabel label="Owner" value="Aditya Singhal" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Daytona Workspaces">
        <SupportButton>List of Daytona Workspaces.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Information card">
            <Typography variant="body1">
              The plugin lists all the Daytona Workspaces for the team.
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item>
          <WorkspacesListComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
