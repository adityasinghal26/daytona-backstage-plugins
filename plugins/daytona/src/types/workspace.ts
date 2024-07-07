export enum ClassName {
    "small",
    "medium",
    "large"
}

export enum State {
    "none",
    "initializing",
    "pendingArchive",
    "archiving",
    "archived",
    "pendingCreate",
    "creating",
    "created",
    "pendingRestore",
    "restoring",
    "restored",
    "pendingStop",
    "stopping",
    "stopped",
    "pendingStart",
    "starting",
    "started",
    "pendingDestroy",
    "destroying",
    "destroyed",
    "error"
}

export type WorkspaceInstance = {

    className: ClassName;

    clusterId: string;

    createdAt: string;

    id: string;

    lastKeepAliveSignal: string;

    state: State;

    token: string;

    updatedAt: string;

    version: number;

}

export type Workspace = {

    createdAt: string;

    createdFromTemplate: boolean;

    destroyed: boolean;

    id: string;

    pinned: boolean;

    shared: boolean;

    teamId: string;

    updatedAt: string;

    userId: string;

    version: number;

    workspaceInstance: WorkspaceInstance;

}

export type WorkspaceList = {

    items: Workspace[];

    total: number;
}