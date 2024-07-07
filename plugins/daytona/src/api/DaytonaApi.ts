import { createApiRef } from "@backstage/core-plugin-api";
import { GitContext, WorkspaceList } from "../types";


/** 
 * An API service to use Github Codespaces within Backstage
 * 
 * @public
 *  */
export const daytonaApiRef = createApiRef<DaytonaApi>({
    id: 'plugin.daytona.service',
});

/** 
 * A client object for fetching information about Github Codespaces
 * 
 * @public */
export type DaytonaApi = {

    createGitRepositoryContext: (repoUrl: string) => Promise<GitContext>

    getWorkspacesForTeam: (teamId: string) => Promise<WorkspaceList>

    getWorkspacesForTeamInRepo: (teamId: string, repoUrl: string) => Promise<WorkspaceList>

}