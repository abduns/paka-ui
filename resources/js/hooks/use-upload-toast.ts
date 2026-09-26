import { useCallback, useRef } from 'react';
import { toast } from '@/components/ui/toast';

type UploadToastMessage = {
    title: string;
    description?: string;
};

/**
 * Return the most useful validation message from an Inertia upload response.
 */
export function firstUploadErrorMessage(
    errors: Record<string, unknown>,
    fallback: string,
    preferredField?: string,
): string {
    const preferredMessage = preferredField ? errors[preferredField] : null;
    const message =
        typeof preferredMessage === 'string'
            ? preferredMessage
            : Object.values(errors).find((value) => typeof value === 'string');

    return typeof message === 'string' ? message : fallback;
}

/**
 * Keep a single upload outcome visible while an Inertia form is processing.
 */
export function useUploadToast() {
    const toastId = useRef<string | null>(null);

    const begin = useCallback((message: UploadToastMessage): void => {
        if (toastId.current) {
            toast.close(toastId.current);
        }

        toastId.current = toast.add({
            type: 'loading',
            title: message.title,
            description: message.description,
            timeout: 0,
        });
    }, []);

    const setProgress: (event?: unknown) => void = useCallback(() => {}, []);

    const dismiss = useCallback((): void => {
        if (!toastId.current) {
            return;
        }

        toast.close(toastId.current);
        toastId.current = null;
    }, []);

    const fail = useCallback((message: UploadToastMessage): void => {
        if (!toastId.current) {
            toast.add({ type: 'error', ...message });

            return;
        }

        toast.update(toastId.current, {
            type: 'error',
            title: message.title,
            description: message.description,
            timeout: 5000,
        });
        toastId.current = null;
    }, []);

    return { begin, dismiss, fail, setProgress };
}
