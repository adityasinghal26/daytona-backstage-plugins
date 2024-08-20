import React, { useEffect } from "react";
import { useGetAllCustomWorkspaces } from "../../hooks";
import { CustomWorkspaceListTable } from "./CustomWorkspaceListTable";
import { configApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import { Box, Card, CardContent, CardHeader, Divider, IconButton, Tooltip } from "@material-ui/core";
import { GitHubIcon } from "@backstage/core-components";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import SyncIcon from '@material-ui/icons/Sync';

export const WorkspaceListComponent = () => {
    const errorApi = useApi(errorApiRef);
    const { workspaceList, loading, error, retry } = useGetAllCustomWorkspaces();

    useEffect(() => {
        if(error) {
            errorApi.post(error);
        }
    },[error, errorApi]);

    const config = useApi(configApiRef);
    const daytonaHost = config.getString('daytona.domain');
    const createUrl = `https://${daytonaHost}/new`;

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
                            <GitHubIcon/> 
                            <Box mr={1} width={2}/>
                            Recent Workspaces
                        </Box>  
                    </>
                }
                subheader="List of all the workspaces across All Teams"
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
                <CustomWorkspaceListTable retry={retry} data={workspaceList} loading={loading} error={error} />
            </CardContent>
        </Card>
    );
}