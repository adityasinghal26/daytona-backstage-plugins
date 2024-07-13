import React from "react";
import { useGetAllWorkspaces } from "../../hooks/useGetAllWorkspaces";
import { WorkspacesListTable } from "./WorkspacesListTable";

export const WorkspacesListComponent = () => {
    const { workspaceList, loading, error } = useGetAllWorkspaces();

    return <WorkspacesListTable team="All" data={workspaceList} loading={loading} error={error} />;
}