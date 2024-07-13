import React from 'react';
import { Typography, Grid, Link } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { WorkspaceListComponent, WorkspaceListComponentTeam } from '../WorkspaceListComponent';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

export const WorkspaceComponent = () => (
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
              The plugin lists all the workspaces for the teams associated with the user.
            </Typography>
            <Link
              href='https://daytona.adisinghal.com/new'
              target="_blank"
              rel="noopener">
              <AddCircleOutline />
            </Link>
          </InfoCard>
        </Grid>
        <Grid item>
          <WorkspaceListComponent />
          <WorkspaceListComponentTeam />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
