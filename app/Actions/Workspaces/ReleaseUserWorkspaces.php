<?php

namespace App\Actions\Workspaces;

use App\Enums\WorkspaceRole;
use App\Models\Membership;
use App\Models\User;
use App\Models\Workspace;

class ReleaseUserWorkspaces
{
    /**
     * Detach a departing user from every workspace before their account is deleted.
     *
     * The workspace_members foreign key cascades in the database, which would drop
     * the pivot rows without firing Membership's deleted event and leave the
     * user's Spatie role assignments behind. Worse, a workspace whose only owner
     * disappears is unmanageable: admins hold neither DeleteWorkspace nor the member
     * permissions. So memberships are removed through the model, and an owner
     * hands the workspace to someone who can still run it.
     */
    public function handle(User $user): void
    {
        $user->loadMissing('workspaceMemberships');

        foreach ($user->workspaceMemberships as $membership) {
            // A soft deleted workspace is invisible to the relation, so read past the
            // scope: its memberships still have to be cleaned up.
            $workspace = $membership->workspace()->withTrashed()->first();

            if ($workspace === null || $workspace->trashed() || $membership->role !== WorkspaceRole::Owner) {
                $membership->delete();

                continue;
            }

            $successor = $this->successor($workspace, $user);
            $successor?->update(['role' => WorkspaceRole::Owner]);

            $membership->delete();

            // Nobody is left to inherit it, which is always the case for the
            // user's personal workspace, so the workspace goes with the account.
            if ($successor === null) {
                $workspace->delete();
            }
        }
    }

    /**
     * The longest standing admin, falling back to the longest standing member.
     */
    private function successor(Workspace $workspace, User $user): ?Membership
    {
        $candidates = $workspace->memberships()
            ->where('user_id', '!=', $user->id)
            ->oldest()
            ->get();

        return $candidates->firstWhere('role', WorkspaceRole::Admin) ?? $candidates->first();
    }
}
