import { useApi } from "@backstage/core-plugin-api";
import { CustomWorkspaceList } from "../types";
import { daytonaApiRef } from "../api";
import useAsync from "react-use/esm/useAsync";
import { Entity } from "@backstage/catalog-model";
import { getRepoUrlFromAnnotations } from "../utils";

export function useGetAllCustomWorkspacesInRepo(
    entity: Entity,
): {
    value?: CustomWorkspaceList;
    loading: boolean;
    error?: Error;
} {
    const api = useApi(daytonaApiRef);
    const repoUrl: string = getRepoUrlFromAnnotations(entity);

    const { value, loading, error } = useAsync(() => {
        return api.getAllCustomWorkspacesInRepo(repoUrl);
    }, [api]);

    const workspaces = value?.flatMap(workspaceList => {
        return workspaceList.items;
    });

    const workspaceList: CustomWorkspaceList = {
        items: workspaces!,
        total: workspaces?.length!,
    }

    return {
        value: workspaceList,
        loading,
        error,
    };

}