import { useApi } from "@backstage/core-plugin-api";
import { CustomWorkspaceList } from "../types";
import { daytonaApiRef } from "../api";
import useAsync from "react-use/esm/useAsync";

export function useGetAllCustomWorkspaces(): {
    workspaceList?: CustomWorkspaceList;
    loading: boolean;
    error?: Error;
} {
    const api = useApi(daytonaApiRef);
    const { value, loading, error } = useAsync(() => {
        return api.getAllCustomWorkspaces();
    }, [api]);

    const workspaces = value?.flatMap(workspaceList => {
        return workspaceList.items;
    });

    const workspaceList: CustomWorkspaceList = {
        items: workspaces!,
        total: workspaces?.length!,
    }

    return {
        workspaceList,
        loading,
        error,
    };
}