<?php

test('delete account copy reflects workspace handover instead of wiping every workspace', function () {
    $source = file_get_contents(dirname(__DIR__, 2).'/resources/js/components/delete-user.tsx');
    $copy = preg_replace('/\s+/', ' ', (string) $source);

    expect($copy)->toBeString()
        ->toContain('Workspaces you own will pass to another admin or member.')
        ->toContain('longest-standing admin or member')
        ->toContain('your personal workspace will be permanently removed')
        ->not->toContain('all of its resources and data will also be permanently deleted');
});

test('settings forms toast on save, guard unsaved changes, and focus the first invalid field', function () {
    $root = dirname(__DIR__, 2);

    foreach (['settings/profile', 'workspaces/edit'] as $page) {
        $source = file_get_contents($root."/resources/js/pages/{$page}.tsx");

        expect($source)->toBeString()
            ->toContain('UnsavedChangesGuard')
            ->toContain("title: 'Changes saved.'")
            ->toContain('focusFirstInvalidField')
            ->toContain('Save changes')
            ->toContain('w-full sm:w-auto');
    }
});

test('security settings drop the page heading and title the 2FA and passkeys panels', function () {
    $security = file_get_contents(dirname(__DIR__, 2).'/resources/js/pages/settings/security.tsx');
    $twoFactor = file_get_contents(dirname(__DIR__, 2).'/resources/js/components/manage-two-factor.tsx');
    $passkeys = file_get_contents(dirname(__DIR__, 2).'/resources/js/components/manage-passkeys.tsx');

    expect($security)->toBeString()
        ->not->toContain("from '@/components/heading'")
        ->toContain('title="Two-factor authentication"')
        ->toContain('title="Passkeys"')
        ->toContain('gap-8');

    expect($twoFactor)->toBeString()
        ->not->toContain("from '@/components/heading'");

    expect($passkeys)->toBeString()
        ->toContain("from '@/components/ui/empty'")
        ->toContain('AuthorizedIcon')
        ->not->toContain('Key01Icon')
        ->not->toContain("from '@/components/heading'");
});

test('member actions keep role editing in a dialog and group password recovery tools', function () {
    $source = file_get_contents(dirname(__DIR__, 2).'/resources/js/pages/workspaces/members.tsx');
    $editMemberModal = file_get_contents(dirname(__DIR__, 2).'/resources/js/components/edit-member-modal.tsx');

    expect($source)->toBeString()
        ->toContain('data-test="member-role-badge"')
        ->toContain('data-test="member-actions"')
        ->toContain('<DropdownMenuContent align="end" className="w-max">')
        ->toContain('data-test="edit-member-button"')
        ->toContain('data-test="member-reset-password-button"')
        ->toContain('data-test="member-generate-password-button"')
        ->toContain('data-test="member-send-reset-email-button"')
        ->toContain("from '@/components/ui/button-group'")
        ->toContain('data-test="delete-member-button"')
        ->toContain('data-test="invitation-cancel-button"')
        ->toContain('Reset password')
        ->toContain('Send reset email')
        ->toContain('<DialogContent className="w-fit">')
        ->toContain('<ButtonGroup aria-label="Password reset actions">')
        ->toContain('variant="outline"')
        ->toContain('ResetPasswordIcon')
        ->toContain('size="icon"')
        ->toContain('aria-label="Generate new password"')
        ->toContain('Generate a new password?')
        ->toContain('This password is shown only once')
        ->toContain('data-test="member-copy-generated-password-button"')
        ->toContain("router.on('flash'")
        ->toContain('variant="secondary"')
        ->toContain('MoreHorizontalIcon')
        ->toContain('text-muted-foreground')
        ->not->toContain('DropdownMenuRadioGroup')
        ->not->toContain('member-role-trigger')
        ->not->toContain('updateMemberRole')
        ->not->toContain('Cancel01Icon')
        ->not->toContain('Copy01Icon')
        ->not->toContain('Copy password')
        ->not->toContain('<ButtonGroupSeparator />')
        ->not->toContain('TooltipProvider')
        ->not->toContain('text-muted-foreground/70');

    expect($editMemberModal)->toBeString()
        ->toContain('Edit workspace member')
        ->toContain('SelectGroup')
        ->toContain('role === member.role')
        ->toContain('updateMember([workspace.slug, member.id])');
});
