import { Entity } from '@backstage/catalog-model';
import { useApi } from "@backstage/core-plugin-api";
import { WorkspaceList } from "../types";
import { daytonaApiRef } from "../api";
import { getRepoUrlFromAnnotations } from "../utils";
import useAsync from "react-use/esm/useAsync";

export function useGetWorkspacesForTeamInRepo(
    entity: Entity,
): {
    value?: WorkspaceList;
    loading: boolean;
    error?: Error;
} {
    const api = useApi(daytonaApiRef);
    const repoUrl: string = getRepoUrlFromAnnotations(entity);
    const teamId: string = '50970272-29c4-4f8b-8e75-3af6c26a3ce1';

    const { value, loading, error } = useAsync(() => {
        return api.getWorkspacesForTeamInRepo(teamId, repoUrl);
    }, [api]);

    return {
        value,
        loading,
        error,
    };

}