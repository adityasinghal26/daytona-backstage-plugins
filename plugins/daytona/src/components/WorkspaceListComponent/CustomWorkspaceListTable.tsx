import React from "react";
import { GitHubIcon, ResponseErrorPanel, Table, TableColumn } from "@backstage/core-components";
import { CustomWorkspace, CustomWorkspaceList } from "../../types";
import { Box } from "@material-ui/core";
import { getGitStatusView, getRepoUrl, getWorkspaceState, getWorkspaceUrl } from "../../utils";

const columns: TableColumn[] = [
    {
        title: 'Workspace',
        field: 'id',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => getWorkspaceUrl({
            name: row.workspace?.id,
            url: `https://${row.workspace?.id}.daytona.adisinghal.com`,
        })
    },
    {
        title: 'Team',
        field: 'team',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => row.teamName,
    },
    {
        title: 'Repository',
        field: 'branch',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => getRepoUrl({
            repo: row.workspace?.gitContext?.repo,
            webUrl: row.workspace?.gitContext?.webUrl,
        })
    },
    {
        title: 'Current Branch',
        field: 'cuurentBranch',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => row.workspace?.gitStatus?.current,
    },
    {
        title: 'Ahead/Behind',
        field: 'gitStatus',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => getGitStatusView({
            ahead: row.workspace?.gitStatus?.ahead,
            behind: row.workspace?.gitStatus?.behind,
        })
    },
    {
        title: 'State',
        field: 'state',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => getWorkspaceState({
            status: row.workspace?.workspaceInstance?.state,
        }),
    },
];

type CustomWorkspaceListTableProps = {

    /**
     * Team Details for the title
     */
    team?: string;

    /**
     * List of filtered Workspaces with all the details
     */
    data?: CustomWorkspaceList;

    /**
     * Loading status of the React Hook
     */
    loading: boolean;

    /**
     * Error details of the React Hook
     */
    error?: Error;
}

export const CustomWorkspaceListTable = ({ team, data, loading, error}: CustomWorkspaceListTableProps) => {
    if (error) {
        return (
            <div>
                <ResponseErrorPanel error={error}/>
            </div>
        );
    }

    return (
        <Table
            isLoading={loading}
            columns={columns}
            options={{
                search: true,
                paging: true,
                pageSize: 5,
                showEmptyDataSourceMessage: !loading,
            }}
            title={
                <Box display="flex" alignItems="center">
                    <GitHubIcon/>
                    <Box mr={1} />
                    Workspaces for Team '{team}' - List ({data?.total})
                </Box>
            }
            data={data?.items ?? []}
        />
    );
};