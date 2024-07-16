import React from "react";
import { useGetWorkspacesForTeamInRepo } from "../../hooks";
import { WorkspacesOverviewTable } from "./WorkspacesOverviewTable";
import { useEntity } from '@backstage/plugin-catalog-react';


export const WorkspaceOverviewContent = () => {
    const { entity } = useEntity();
    const teamId: string = '5c2aaeeb-5088-4e79-9ab1-5d4324968a60';
    const { value, loading, error } = useGetWorkspacesForTeamInRepo(entity, teamId);

    return <WorkspacesOverviewTable data={value} loading={loading} error={error} />;
}