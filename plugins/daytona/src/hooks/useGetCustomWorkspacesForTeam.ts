import { useApi } from "@backstage/core-plugin-api";
import { CustomWorkspaceList } from "../types";
import { daytonaApiRef } from "../api";
import useAsync from "react-use/esm/useAsync";

export function useGetCustomWorkspacesForTeam(teamId: string): {
    value?: CustomWorkspaceList;
    loading: boolean;
    error?: Error;
} {
    const api = useApi(daytonaApiRef);

    const { value, loading, error } = useAsync(() => {
        return api.getCustomWorkspacesForTeam(teamId);
    }, [api]);

    return {
        value,
        loading,
        error,
    };

}