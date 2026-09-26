<?php

namespace App\Actions\Workspaces;

use App\Enums\WorkspaceRole;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class CreateWorkspace
{
    /**
     * Create a new workspace and add the user as owner.
     */
    public function handle(User $user, string $name, ?UploadedFile $logo = null, bool $isPersonal = false): Workspace
    {
        return DB::transaction(function () use ($user, $name, $logo, $isPersonal) {
            $workspace = Workspace::create([
                'name' => $name,
                'is_personal' => $isPersonal,
            ]);

            if ($logo) {
                $storedPath = $logo->store('workspace-logos', 'public');

                if ($storedPath === false) {
                    throw new RuntimeException('Unable to store the uploaded workspace logo.');
                }

                $workspace->logo_path = $storedPath;
                $workspace->save();
            }

            $membership = $workspace->memberships()->create([
                'user_id' => $user->id,
                'role' => WorkspaceRole::Owner,
            ]);

            $user->switchWorkspace($workspace);

            return $workspace;
        });
    }
}
