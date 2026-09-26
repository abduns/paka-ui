import {
    Camera01Icon,
    Copy01Icon,
    NewOfficeIcon,
    UserAdd01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Form, Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import DeleteWorkspaceModal from '@/components/delete-workspace-modal';
import LeaveWorkspaceModal from '@/components/leave-workspace-modal';
import { SettingsPageHeader } from '@/components/settings-page-header';
import { SettingsPanel } from '@/components/settings-panel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/components/ui/toast';
import { UnsavedChangesGuard } from '@/hooks/use-unsaved-changes';
import {
    firstUploadErrorMessage,
    useUploadToast,
} from '@/hooks/use-upload-toast';
import { focusFirstInvalidField } from '@/lib/focus-first-invalid';
import { update } from '@/routes/workspaces';
import { index as members } from '@/routes/workspaces/members';
import type { Workspace, WorkspacePermissions } from '@/types';

type Props = {
    workspace: Workspace;
    permissions: WorkspacePermissions;
};

export default function WorkspaceEdit({ workspace, permissions }: Props) {
    const logoInput = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | undefined>();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const uploadToast = useUploadToast();

    const displayedLogo = logoPreview ?? workspace.logo;

    useEffect(() => {
        return () => {
            if (logoPreview) {
                URL.revokeObjectURL(logoPreview);
            }
        };
    }, [logoPreview]);

    const pageTitle = useMemo(
        () =>
            permissions.canUpdateWorkspace
                ? `Edit ${workspace.name}`
                : `View ${workspace.name}`,
        [permissions.canUpdateWorkspace, workspace.name],
    );

    const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setLogoPreview((current) => {
            if (current) {
                URL.revokeObjectURL(current);
            }

            return URL.createObjectURL(file);
        });
    };

    const clearLogoPreview = () => {
        if (logoInput.current) {
            logoInput.current.value = '';
        }

        setLogoPreview((current) => {
            if (current) {
                URL.revokeObjectURL(current);
            }

            return undefined;
        });
    };

    const copyWorkspaceId = async () => {
        if (!navigator.clipboard) {
            return;
        }

        try {
            await navigator.clipboard.writeText(workspace.uuid);
            setIsCopied(true);
            window.setTimeout(() => setIsCopied(false), 1600);
        } catch {
            return;
        }
    };

    return (
        <>
            <Head title={pageTitle} />

            <div className="flex flex-col gap-8">
                <SettingsPageHeader title="Workspace settings" />
                <SettingsPanel
                    variant="inset"
                    title="Workspace settings"
                    description="Update your workspace name and identity."
                >
                    {permissions.canUpdateWorkspace ? (
                        <Form
                            {...update(workspace.slug)}
                            encType="multipart/form-data"
                            options={{
                                preserveScroll: true,
                            }}
                            setDefaultsOnSuccess
                            onStart={() => {
                                if (logoPreview) {
                                    uploadToast.begin({
                                        title: 'Uploading workspace logo…',
                                    });
                                }
                            }}
                            onProgress={(event) =>
                                uploadToast.setProgress(event)
                            }
                            onSuccess={() => {
                                uploadToast.dismiss();
                                setLogoPreview(undefined);
                                toast.add({
                                    type: 'success',
                                    title: 'Changes saved.',
                                });
                            }}
                            onError={(errors) => {
                                uploadToast.fail({
                                    title: firstUploadErrorMessage(
                                        errors,
                                        'Failed to upload workspace logo.',
                                        'logo',
                                    ),
                                });
                                focusFirstInvalidField();
                            }}
                            onHttpException={() => {
                                uploadToast.fail({
                                    title: 'Failed to upload workspace logo.',
                                });
                            }}
                            onNetworkError={() => {
                                uploadToast.fail({
                                    title: 'Failed to upload workspace logo.',
                                });
                            }}
                            onCancel={() =>
                                uploadToast.fail({ title: 'Upload cancelled.' })
                            }
                        >
                            {({ errors, processing, isDirty }) => (
                                <FieldGroup className="gap-0 divide-y divide-border">
                                    <UnsavedChangesGuard isDirty={isDirty} />
                                    <Field
                                        orientation="responsive"
                                        data-invalid={Boolean(errors.logo)}
                                        className="gap-4 px-6 py-5 sm:px-7 @md/field-group:justify-between"
                                    >
                                        <FieldContent>
                                            <FieldLabel htmlFor="logo">
                                                Workspace logo
                                            </FieldLabel>
                                            <FieldDescription className="text-xs">
                                                JPG, PNG, or WEBP up to 2 MB.
                                            </FieldDescription>
                                            <FieldError>
                                                {errors.logo}
                                            </FieldError>
                                        </FieldContent>
                                        <div className="flex items-center gap-3">
                                            <label
                                                htmlFor="logo"
                                                className="group/logo-upload relative block cursor-pointer rounded-full focus-within:ring-2 focus-within:ring-ring/50"
                                            >
                                                <input
                                                    id="logo"
                                                    ref={logoInput}
                                                    name="logo"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    className="sr-only"
                                                    onChange={handleLogoChange}
                                                />
                                                <Avatar className="size-10 rounded-full">
                                                    {displayedLogo ? (
                                                        <AvatarImage
                                                            src={displayedLogo}
                                                            alt={workspace.name}
                                                        />
                                                    ) : null}
                                                    <AvatarFallback className="rounded-full">
                                                        <HugeiconsIcon
                                                            icon={NewOfficeIcon}
                                                            className="size-4 text-muted-foreground"
                                                        />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-foreground/50 text-background opacity-0 transition-opacity group-focus-within/logo-upload:opacity-100 group-hover/logo-upload:opacity-100">
                                                    <HugeiconsIcon
                                                        icon={Camera01Icon}
                                                        className="size-3.5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </label>
                                            {logoPreview ? (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={clearLogoPreview}
                                                >
                                                    Reset
                                                </Button>
                                            ) : null}
                                        </div>
                                    </Field>

                                    <Field
                                        orientation="responsive"
                                        data-invalid={Boolean(errors.name)}
                                        className="gap-4 px-6 py-5 sm:px-7 @md/field-group:justify-between"
                                    >
                                        <FieldContent>
                                            <FieldLabel htmlFor="name">
                                                Workspace name
                                            </FieldLabel>
                                            <FieldDescription className="text-xs">
                                                Shown throughout this
                                                application wherever the
                                                workspace appears.
                                            </FieldDescription>
                                        </FieldContent>
                                        <div className="flex w-full flex-col gap-2 @md/field-group:max-w-xs">
                                            <Input
                                                id="name"
                                                name="name"
                                                data-test="workspace-name-input"
                                                defaultValue={workspace.name}
                                                placeholder="Acme"
                                                required
                                                aria-invalid={Boolean(
                                                    errors.name,
                                                )}
                                            />
                                            <FieldError>
                                                {errors.name}
                                            </FieldError>
                                        </div>
                                    </Field>

                                    <Field
                                        orientation="responsive"
                                        className="gap-4 px-6 py-5 sm:px-7 @md/field-group:justify-between"
                                    >
                                        <FieldContent>
                                            <FieldLabel>
                                                Workspace ID
                                            </FieldLabel>
                                            <FieldDescription className="font-mono text-xs break-all">
                                                {workspace.uuid}
                                            </FieldDescription>
                                        </FieldContent>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={copyWorkspaceId}
                                            aria-live="polite"
                                        >
                                            <HugeiconsIcon
                                                icon={Copy01Icon}
                                                data-icon="inline-start"
                                            />
                                            {isCopied ? 'Copied' : 'Copy ID'}
                                        </Button>
                                    </Field>

                                    <div className="flex items-center justify-end px-6 py-5 sm:px-7">
                                        <Button
                                            type="submit"
                                            data-test="workspace-save-button"
                                            disabled={processing || !isDirty}
                                            className="w-full sm:w-auto"
                                        >
                                            {processing && (
                                                <Spinner data-icon="inline-start" />
                                            )}
                                            Save changes
                                        </Button>
                                    </div>
                                </FieldGroup>
                            )}
                        </Form>
                    ) : (
                        <div className="flex items-center gap-4 px-6 py-5 sm:px-7">
                            <Avatar className="size-10 rounded-md">
                                {workspace.logo ? (
                                    <AvatarImage
                                        src={workspace.logo}
                                        alt={workspace.name}
                                    />
                                ) : null}
                                <AvatarFallback className="rounded-md">
                                    <HugeiconsIcon
                                        icon={NewOfficeIcon}
                                        className="size-4 text-muted-foreground"
                                    />
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="font-medium">{workspace.name}</p>
                                <p className="font-mono text-xs break-all text-muted-foreground">
                                    Workspace ID: {workspace.uuid}
                                </p>
                            </div>
                        </div>
                    )}
                </SettingsPanel>

                <SettingsPanel
                    variant="inset"
                    title="Workspace members"
                    description="People who can access this workspace."
                >
                    <div className="flex w-full flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-7">
                        <p className="text-sm text-muted-foreground">
                            {permissions.canCreateInvitation
                                ? 'Invite members, change roles, and review pending invitations.'
                                : 'Review who belongs to this workspace.'}
                        </p>
                        <Button
                            variant="outline"
                            data-test="manage-members-button"
                            className="shrink-0"
                            nativeButton={false}
                            render={
                                <Link href={members(workspace.slug)} prefetch />
                            }
                        >
                            <HugeiconsIcon
                                icon={UserAdd01Icon}
                                data-icon="inline-start"
                            />
                            Manage members
                        </Button>
                    </div>
                </SettingsPanel>

                {permissions.canLeaveWorkspace ? (
                    <SettingsPanel
                        variant="inset"
                        title="Leave workspace"
                        description="Remove yourself from this workspace."
                    >
                        <div className="flex w-full flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-7">
                            <p className="text-sm text-muted-foreground">
                                You will lose access to this workspace until
                                someone invites you again.
                            </p>
                            <Button
                                variant="destructive"
                                data-test="leave-workspace-button"
                                className="shrink-0"
                                onClick={() => setLeaveDialogOpen(true)}
                            >
                                Leave workspace
                            </Button>
                        </div>
                    </SettingsPanel>
                ) : null}

                {permissions.canDeleteWorkspace && !workspace.isPersonal ? (
                    <SettingsPanel
                        variant="inset"
                        title="Delete workspace"
                        description="Permanently delete your workspace."
                    >
                        <div className="flex w-full flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-7">
                            <p className="text-sm text-muted-foreground">
                                This action is permanent and cannot be undone.
                                All workspace data will be removed.
                            </p>
                            <Button
                                variant="destructive"
                                data-test="delete-workspace-button"
                                className="shrink-0"
                                onClick={() => setDeleteDialogOpen(true)}
                            >
                                Delete workspace
                            </Button>
                        </div>
                    </SettingsPanel>
                ) : null}
            </div>

            {permissions.canLeaveWorkspace ? (
                <LeaveWorkspaceModal
                    workspace={workspace}
                    open={leaveDialogOpen}
                    onOpenChange={setLeaveDialogOpen}
                />
            ) : null}

            {permissions.canDeleteWorkspace && !workspace.isPersonal ? (
                <DeleteWorkspaceModal
                    workspace={workspace}
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                />
            ) : null}
        </>
    );
}
