export type WorkspaceRole = 'owner' | 'admin' | 'member';

export type Workspace = {
    id: number;
    uuid: string;
    name: string;
    slug: string;
    logo: string;
    isPersonal: boolean;
    role?: WorkspaceRole;
    roleLabel?: string;
    isCurrent?: boolean;
};

export type WorkspaceMember = {
    id: number;
    uuid: string;
    name: string;
    email: string;
    avatar?: string | null;
    role: WorkspaceRole;
    role_label: string;
};

export type WorkspaceInvitation = {
    code: string;
    email: string;
    role: WorkspaceRole;
    role_label: string;
    created_at: string;
};

export type WorkspaceInvitationContext = {
    code: string;
    workspaceName: string;
};

export type DashboardInvitation = {
    code: string;
    inviterName: string;
    workspace: {
        name: string;
        slug: string;
    };
};

export type WorkspacePermissions = {
    canUpdateWorkspace: boolean;
    canDeleteWorkspace: boolean;
    canAddMember: boolean;
    canUpdateMember: boolean;
    canRemoveMember: boolean;
    canCreateInvitation: boolean;
    canCancelInvitation: boolean;
    canLeaveWorkspace: boolean;
};

export type RoleOption = {
    value: WorkspaceRole;
    label: string;
};
