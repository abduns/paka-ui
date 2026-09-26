import type { Auth } from '@/types/auth';
import type { OnboardingChecklist } from '@/types/onboarding';
import type { Workspace } from '@/types/workspaces';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            registrationOpen: boolean;
            sidebarOpen: boolean;
            currentWorkspace: Workspace | null;
            workspaces: Workspace[];
            onboarding: OnboardingChecklist | null;
            [key: string]: unknown;
        };
    }
}
