import { DashboardSquare01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PendingInvitationsModal from '@/components/pending-invitations-modal';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import type { DashboardInvitation } from '@/types';

type Props = {
    pendingInvitations?: DashboardInvitation[];
};

export default function Dashboard({ pendingInvitations = [] }: Props) {
    const { auth } = usePage().props;
    const [showInvitations, setShowInvitations] = useState(
        pendingInvitations.length > 0,
    );

    return (
        <>
            <Head title="Dashboard" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />

            <div className="flex flex-1 flex-col gap-6">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Good to see you, {firstName(auth.user.name)}
                </h1>

                <Empty className="min-h-64 rounded-xl border border-dashed">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <HugeiconsIcon icon={DashboardSquare01Icon} />
                        </EmptyMedia>
                        <EmptyTitle>Your workspace is ready</EmptyTitle>
                        <EmptyDescription>
                            This is intentionally a calm starting point. Add
                            product-specific tools and navigation as your next
                            project needs them.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </div>
        </>
    );
}

function firstName(fullName: string): string {
    return fullName.trim().split(/\s+/)[0] ?? fullName;
}
