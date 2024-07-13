import React from "react";
import { useGetAllCustomWorkspaces } from "../../hooks";
import { CustomWorkspaceListTable } from "./CustomWorkspaceListTable";

export const WorkspaceListComponent = () => {
    const { workspaceList, loading, error } = useGetAllCustomWorkspaces();

    return <CustomWorkspaceListTable team="All" data={workspaceList} loading={loading} error={error} />;
}