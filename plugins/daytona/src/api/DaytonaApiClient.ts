import { DaytonaApi } from "./DaytonaApi";
import { GitContext, Options, Team, User, WorkspaceList } from "../types";
import { DaytonaSdkClient } from "./DaytonaSdkClient";

/**
 * An API client for fetching information about
 * Github Codespaces implementing githubCodespacesApiRef
 * 
 * @public
 */
export class DaytonaApiClient implements DaytonaApi {

    private readonly client: DaytonaSdkClient;

    constructor(options: Options) {
        this.client = new DaytonaSdkClient(options);
    }

    private async getDaytona<T = any>(apiEndpoint: string, init?: RequestInit): Promise<T> {
        const daytonaClient = this.client.fetch<T>(`${apiEndpoint}`, init);
        return daytonaClient;

    }

    async createGitRepositoryContext(repoUrl: string): Promise<GitContext> {
        const data = {
            gitRepositoryUrl: repoUrl,
        }
        const requestInit = {
            method: "POST",
            body: JSON.stringify(data),
        }
        const gitContext = await this.getDaytona<GitContext>(`/workspace/git-context`, requestInit);
        return gitContext;
    }

    async getWorkspacesForTeam(teamId: string): Promise<WorkspaceList> {
        const workspaceList = await this.getDaytona<WorkspaceList>(`/workspace?teamId=${teamId}`);
        return workspaceList;
    }

    async getAllWorkspaces(): Promise<WorkspaceList[]> {
        const teams = await this.getTeams();
        const teamIDs = teams.map(team => team.id);
        const allWorkspaceLists = teamIDs.map(teamId => 
            this.getWorkspacesForTeam(teamId)
        )
        return Promise.all(allWorkspaceLists);
    }

    async getWorkspacesForTeamInRepo(teamId: string, repoUrl: string): Promise<WorkspaceList> {
        const workspaceList = await this.getDaytona<WorkspaceList>(`/workspace?teamId=${teamId}`);
        const filteredWorkspaces = workspaceList.items.filter((workspace) => {
            return (workspace.gitContext.webUrl === repoUrl);
        });
        const filteredWorkspaceList = {
            items: filteredWorkspaces,
            total: filteredWorkspaces.length,
        }
        return filteredWorkspaceList;
    }

    async getTeams(): Promise<Team[]> {
        const teams = await this.getDaytona<Team[]>(`/team`);
        return teams;
    }

    async getUser(): Promise<User> {
        const user = await this.getDaytona<User>(`/user`);
        return user;
    }


}