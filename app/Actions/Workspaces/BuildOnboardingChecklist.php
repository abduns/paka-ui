<?php

namespace App\Actions\Workspaces;

use App\Models\User;
use App\Models\Workspace;

class BuildOnboardingChecklist
{
    /** @var list<string> */
    public const STEPS = [
        'workspace',
        'member',
        'profile',
    ];

    /**
     * @return array{completed: int, total: int, steps: list<array{key: string, completed: bool}>}
     */
    public function handle(Workspace $workspace, User $user): array
    {
        $flags = Workspace::query()
            ->whereKey($workspace->getKey())
            ->withCount('members')
            ->withExists('invitations as has_invitations')
            ->firstOrFail();

        $completedByKey = [
            'workspace' => filled($workspace->name),
            'member' => $flags->members_count > 1 || (bool) $flags->getAttribute('has_invitations'),
            'profile' => filled($user->avatar_path),
        ];

        return [
            'completed' => count(array_filter($completedByKey)),
            'total' => count(self::STEPS),
            'steps' => array_map(
                fn (string $key): array => ['key' => $key, 'completed' => $completedByKey[$key]],
                self::STEPS,
            ),
        ];
    }
}
