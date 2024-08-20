import React from "react";
import { GitHubIcon, ResponseErrorPanel, Table, TableColumn } from "@backstage/core-components";
import { CustomWorkspace, CustomWorkspaceList } from "../../types";
import { LinearProgress, Typography } from "@material-ui/core";
import { getGitStatusView, getWorkspaceState, getWorkspaceUrl } from "../../utils";

const columns: TableColumn[] = [
    {
        title: 'Workspace',
        field: 'id',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => getWorkspaceUrl({
            name: row.workspace?.id,
            domain: row.domain,
        })
    },
    {
        title: 'Team',
        field: 'team',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => row.teamName,
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
        width: '20%',
        render: (row: Partial<CustomWorkspace>) => getWorkspaceState({
            status: row.workspace?.workspaceInstance?.state,
        }),
    },
];

type CustomWorkspaceOverviewTableProps = {

    /**
     * Repository for the component
     */
    repo?: string;

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

    /**
     * Retry mechanism for the React Hook
     * @returns void
     */
    retry: () => void;
}

export const CustomWorkspaceOverviewTable = ({ repo, data, loading, error }: CustomWorkspaceOverviewTableProps) => {

    if (error) {
        return (
            <div>
                <ResponseErrorPanel title={error.message} error={error} />
            </div>
        );
    }

    if(loading) {
        return (
            <div>
                <LinearProgress />
            </div>
        )
    }

    return (
        <>
            {!data?.total ? (
                <div style={{ display: 'block', textAlign: 'center', padding: '16%' }}>
                    <GitHubIcon />
                    <Typography variant="body1" style={{ display: 'block', wordWrap: "break-word" }}>
                        <span style={{ display: 'block', textAlign: 'center' }}>
                            No workspaces found for repo
                            <code style={{display: 'block', fontSize: '90%'}}>{repo}</code>
                        </span>
                        {/* No workspace found for repository
                        <span style={{display: 'block'}}>{repo}</span> */}
                    </Typography>
                </div>
            ) : (
            <Table
                isLoading={loading}
                columns={columns}
                options={{
                    search: true,
                    paging: true,
                    pageSize: 5,
                    showTitle: true,
                }}
                title={
                    <>List ({data?.total})</>
                }
                data={data?.items ?? []}
            />
            )}
        </>
    );
};