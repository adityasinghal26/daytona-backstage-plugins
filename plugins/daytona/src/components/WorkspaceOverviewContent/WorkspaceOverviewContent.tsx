import React from "react";
import { useGetAllCustomWorkspacesInRepo } from "../../hooks";
import { useEntity } from '@backstage/plugin-catalog-react';
import { CustomWorkspaceListTable } from "../WorkspaceListComponent/CustomWorkspaceListTable";


export const WorkspaceOverviewContent = () => {
    const { entity } = useEntity();
    const { value, loading, error } = useGetAllCustomWorkspacesInRepo(entity);

    return <CustomWorkspaceListTable data={value} loading={loading} error={error} />;
}