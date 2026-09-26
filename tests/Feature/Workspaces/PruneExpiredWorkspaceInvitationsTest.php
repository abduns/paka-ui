<?php

use App\Enums\WorkspaceRole;
use App\Models\User;
use App\Models\Workspace;
use App\Models\WorkspaceInvitation;
use Illuminate\Console\Scheduling\CallbackEvent;
use Illuminate\Console\Scheduling\Event;
use Illuminate\Console\Scheduling\Schedule;

test('expired invitations are deleted by the scheduled cleanup', function () {
    $this->travelTo(now()->startOfDay());

    $owner = User::factory()->create();
    $workspace = Workspace::factory()->create();

    $workspace->members()->attach($owner, ['role' => WorkspaceRole::Owner->value]);

    $expiredInvitation = WorkspaceInvitation::factory()->expired()->create([
        'workspace_id' => $workspace->id,
        'invited_by' => $owner->id,
    ]);

    $unexpiredInvitation = WorkspaceInvitation::factory()->expiresIn(1)->create([
        'workspace_id' => $workspace->id,
        'invited_by' => $owner->id,
    ]);

    $invitationWithoutExpiration = WorkspaceInvitation::factory()->create([
        'workspace_id' => $workspace->id,
        'invited_by' => $owner->id,
    ]);

    $cleanup = collect(app(Schedule::class)->events())
        ->first(fn (Event $event): bool => $event->description === 'Delete expired workspace invitations');

    expect($cleanup)->toBeInstanceOf(CallbackEvent::class);
    $cleanup?->run(app());

    $this->assertDatabaseMissing('workspace_invitations', [
        'id' => $expiredInvitation->id,
    ]);

    $this->assertDatabaseHas('workspace_invitations', [
        'id' => $unexpiredInvitation->id,
    ]);

    $this->assertDatabaseHas('workspace_invitations', [
        'id' => $invitationWithoutExpiration->id,
    ]);
});
