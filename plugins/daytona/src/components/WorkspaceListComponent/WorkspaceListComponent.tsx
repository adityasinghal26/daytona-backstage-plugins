import React, { useEffect } from "react";
import { useGetAllCustomWorkspaces } from "../../hooks";
import { CustomWorkspaceListTable } from "./CustomWorkspaceListTable";
import { errorApiRef, useApi } from "@backstage/core-plugin-api";

export const WorkspaceListComponent = () => {
    const errorApi = useApi(errorApiRef);
    const { workspaceList, loading, error } = useGetAllCustomWorkspaces();

    useEffect(() => {
        if(error) {
            errorApi.post(error);
        }
    },[error, errorApi]);

    return <CustomWorkspaceListTable data={workspaceList} loading={loading} error={error} />;
}