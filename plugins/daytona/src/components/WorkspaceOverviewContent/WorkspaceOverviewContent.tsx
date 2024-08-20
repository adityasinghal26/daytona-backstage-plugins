import React from "react";
import { useGetAllCustomWorkspacesInRepo } from "../../hooks";
import { useEntity } from '@backstage/plugin-catalog-react';
import { CustomWorkspaceOverviewTable } from "./CustomWorkspaceOverviewTable";
import { configApiRef, useApi } from "@backstage/core-plugin-api";
import { Box, Card, CardContent, CardHeader, Divider, IconButton, Tooltip } from "@material-ui/core";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import SyncIcon from '@material-ui/icons/Sync';
import DaytonaIcon from "../../assets/DaytonaIcon";

export const WorkspaceOverviewContent = () => {
    const { entity } = useEntity();
    const { repoUrl, value, loading, error, retry } = useGetAllCustomWorkspacesInRepo(entity);

    const config = useApi(configApiRef);
    const daytonaHost = config.getString('daytona.domain');
    const createUrl = `https://${daytonaHost}/#${repoUrl}`;

    const openInNewTab = (url: string): void => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <Card>
            <CardHeader 
                title={
                    <>
                        <Box display="flex" alignItems="center" >
                            <DaytonaIcon/> 
                            <Box mr={1} width={2}/>
                            Daytona Workspaces
                        </Box>  
                    </>
                }
                action={
                <>
                    <Tooltip title="Create Workspace">
                        <IconButton
                            aria-label="Create"
                            onClick={() => openInNewTab(`${createUrl}`)}
                        >
                            <AddCircleOutline />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Sync Workspaces">
                        <IconButton
                            aria-label="Refresh"
                            onClick={retry}
                        >
                            <SyncIcon />
                        </IconButton>
                    </Tooltip>
                </>
                }/>
            <Divider />
            <CardContent style={{ padding: 0 }}>
                <CustomWorkspaceOverviewTable retry={retry} repo={repoUrl} data={value} loading={loading} error={error} />
            </CardContent>
        </Card>
    );
}