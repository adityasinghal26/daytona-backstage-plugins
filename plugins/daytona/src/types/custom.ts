import { Workspace } from "./workspace";

export type CustomWorkspace = {

    workspace: Workspace;

    teamName: string;
}

export type CustomWorkspaceList = {

    items: CustomWorkspace[];

    total: number;
}