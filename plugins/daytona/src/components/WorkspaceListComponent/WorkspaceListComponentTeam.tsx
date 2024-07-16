import React, { useEffect } from "react";
import { useGetCustomWorkspacesForTeam, useGetTeam } from "../../hooks";
import { CustomWorkspaceListTable } from "./CustomWorkspaceListTable";
import { errorApiRef, useApi } from "@backstage/core-plugin-api";

export const WorkspaceListComponentTeam = () => {
    const teamId: string = '50970272-29c4-4f8b-8e75-3af6c26a3ce1';
    const team = useGetTeam(teamId);
    const errorApi = useApi(errorApiRef);
    const { value, loading, error } = useGetCustomWorkspacesForTeam(teamId);

    useEffect(() => {
        if(error) {
            errorApi.post(error);
        }
    },[error, errorApi]);

    return <CustomWorkspaceListTable team={team.value?.name} data={value} loading={loading} error={error} />;
}