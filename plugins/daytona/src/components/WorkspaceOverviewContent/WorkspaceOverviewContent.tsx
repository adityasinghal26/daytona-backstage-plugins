import React from "react";
import { useGetWorkspacesForTeamInRepo } from "../../hooks";
import { WorkspacesOverviewTable } from "./WorkspacesOverviewTable";
import { useEntity } from '@backstage/plugin-catalog-react';


export const WorkspaceOverviewContent = () => {
    const { entity } = useEntity();
    const { value, loading, error } = useGetWorkspacesForTeamInRepo(entity);

    return <WorkspacesOverviewTable data={value} loading={loading} error={error} />;
}