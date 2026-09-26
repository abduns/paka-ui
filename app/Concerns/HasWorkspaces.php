<?php

namespace App\Concerns;

use App\Data\UserWorkspace;
use App\Data\WorkspacePermissions;
use App\Enums\WorkspacePermission;
use App\Enums\WorkspaceRole;
use App\Models\Membership;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\URL;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

trait HasWorkspaces
{
    /** @return BelongsToMany<Workspace, $this> */
    public function workspaces(): BelongsToMany
    {
        return $this->belongsToMany(Workspace::class, 'workspace_members', 'user_id', 'workspace_id')
            ->withPivot(['role'])
            ->withTimestamps();
    }

    /** @return HasManyThrough<Workspace, Membership, $this> */
    public function ownedWorkspaces(): HasManyThrough
    {
        return $this->hasManyThrough(
            Workspace::class,
            Membership::class,
            'user_id',
            'id',
            'id',
            'workspace_id',
        )->where('workspace_members.role', WorkspaceRole::Owner->value);
    }

    /** @return HasMany<Membership, $this> */
    public function workspaceMemberships(): HasMany
    {
        return $this->hasMany(Membership::class, 'user_id');
    }

    /** @return BelongsTo<Workspace, $this> */
    public function currentWorkspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class, 'current_workspace_id');
    }

    public function personalWorkspace(): ?Workspace
    {
        return $this->workspaces()
            ->where('is_personal', true)
            ->first();
    }

    public function switchWorkspace(Workspace $workspace): bool
    {
        if (! $this->belongsToWorkspace($workspace)) {
            return false;
        }

        $this->update(['current_workspace_id' => $workspace->id]);
        $this->setRelation('currentWorkspace', $workspace);
        setPermissionsTeamId($workspace->getKey());

        URL::defaults(['current_workspace' => $workspace->slug]);

        return true;
    }

    public function belongsToWorkspace(Workspace $workspace): bool
    {
        return $this->workspaces()->where('workspaces.id', $workspace->id)->exists();
    }

    public function isCurrentWorkspace(Workspace $workspace): bool
    {
        return $this->current_workspace_id === $workspace->id;
    }

    public function ownsWorkspace(Workspace $workspace): bool
    {
        return $this->workspaceRole($workspace) === WorkspaceRole::Owner;
    }

    public function workspaceRole(Workspace $workspace): ?WorkspaceRole
    {
        return $this->workspaceMemberships()
            ->where('workspace_id', $workspace->id)
            ->first()
            ?->role;
    }

    /** @return Collection<int, UserWorkspace> */
    public function toUserWorkspaces(bool $includeCurrent = false): Collection
    {
        return $this->workspaces()
            ->get()
            ->map(fn (Workspace $workspace) => ! $includeCurrent && $this->isCurrentWorkspace($workspace) ? null : $this->toUserWorkspace($workspace))
            ->filter()
            ->values();
    }

    public function toUserWorkspace(Workspace $workspace): UserWorkspace
    {
        $role = $this->workspaceRole($workspace);

        return new UserWorkspace(
            id: $workspace->id,
            uuid: $workspace->uuid,
            name: $workspace->name,
            slug: $workspace->slug,
            logo: $workspace->logo,
            isPersonal: $workspace->is_personal,
            role: $role?->value,
            roleLabel: $role?->label(),
            isCurrent: $this->isCurrentWorkspace($workspace),
        );
    }

    public function toWorkspacePermissions(Workspace $workspace): WorkspacePermissions
    {
        return new WorkspacePermissions(
            canUpdateWorkspace: $this->hasWorkspacePermission($workspace, WorkspacePermission::UpdateWorkspace),
            canDeleteWorkspace: $this->hasWorkspacePermission($workspace, WorkspacePermission::DeleteWorkspace),
            canAddMember: $this->hasWorkspacePermission($workspace, WorkspacePermission::AddMember),
            canUpdateMember: $this->hasWorkspacePermission($workspace, WorkspacePermission::UpdateMember),
            canRemoveMember: $this->hasWorkspacePermission($workspace, WorkspacePermission::RemoveMember),
            canCreateInvitation: $this->hasWorkspacePermission($workspace, WorkspacePermission::CreateInvitation),
            canCancelInvitation: $this->hasWorkspacePermission($workspace, WorkspacePermission::CancelInvitation),
            canLeaveWorkspace: $this->can('leave', $workspace),
        );
    }

    public function fallbackWorkspace(?Workspace $excluding = null): ?Workspace
    {
        return $this->workspaces()
            ->when($excluding, fn ($query) => $query->where('workspaces.id', '!=', $excluding->id))
            ->orderByRaw('LOWER(workspaces.name)')
            ->first();
    }

    public function hasWorkspacePermission(Workspace $workspace, WorkspacePermission $permission): bool
    {
        if (! $this->belongsToWorkspace($workspace)) {
            return false;
        }

        setPermissionsTeamId($workspace->getKey());
        $this->unsetRelation('roles')->unsetRelation('permissions');

        return $this->checkPermissionTo($permission);
    }

    public function syncWorkspaceRole(Workspace $workspace, WorkspaceRole $role): void
    {
        setPermissionsTeamId($workspace->getKey());

        $permissions = collect($role->permissions())
            ->map(fn (WorkspacePermission $permission) => Permission::findOrCreate($permission->value, 'web'))
            ->all();

        /** @var Role $workspaceRole */
        $workspaceRole = Role::findOrCreate($role->value, 'web');
        $workspaceRole->syncPermissions($permissions);

        $this->syncRoles($workspaceRole);
        $this->unsetRelation('roles')->unsetRelation('permissions');
    }

    public function removeWorkspaceRole(Workspace $workspace): void
    {
        setPermissionsTeamId($workspace->getKey());

        $this->syncRoles([]);
        $this->unsetRelation('roles')->unsetRelation('permissions');
    }
}
