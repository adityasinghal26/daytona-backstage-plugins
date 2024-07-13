import React from "react";
import { useGetWorkspacesForTeam } from "../../hooks";
import { WorkspacesListTable } from "./WorkspacesListTable";

export const WorkspacesListComponentTeam = () => {
    const teamId: string = '50970272-29c4-4f8b-8e75-3af6c26a3ce1';
    const { value, loading, error } = useGetWorkspacesForTeam(teamId);

    return <WorkspacesListTable team={teamId} data={value} loading={loading} error={error} />;
}