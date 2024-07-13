import React from "react";
import { useGetCustomWorkspacesForTeam, useGetTeam } from "../../hooks";
import { CustomWorkspaceListTable } from "./CustomWorkspaceListTable";

export const WorkspaceListComponentTeam = () => {
    const teamId: string = '50970272-29c4-4f8b-8e75-3af6c26a3ce1';
    const team = useGetTeam(teamId);
    const { value, loading, error } = useGetCustomWorkspacesForTeam(teamId);

    return <CustomWorkspaceListTable team={team.value?.name} data={value} loading={loading} error={error} />;
}