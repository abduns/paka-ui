export type OnboardingStepKey = 'workspace' | 'member' | 'profile';

export type OnboardingStep = {
    key: OnboardingStepKey;
    completed: boolean;
};

export type OnboardingChecklist = {
    completed: number;
    total: number;
    steps: OnboardingStep[];
};
