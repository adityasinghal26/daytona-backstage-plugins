import React from "react";
import { useGetWorkspacesForTeam } from "../../hooks";
import { WorkspacesListTable } from "./WorkspacesListTable";

export const WorkspacesListComponent = () => {
    const { value, loading, error } = useGetWorkspacesForTeam();

    return <WorkspacesListTable data={value} loading={loading} error={error} />;
}