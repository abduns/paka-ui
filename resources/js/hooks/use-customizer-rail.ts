import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'paka:customizing';
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
    listeners.add(listener);

    return () => listeners.delete(listener);
}

function getSnapshot(): boolean {
    try {
        return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
        return false;
    }
}

function getServerSnapshot(): boolean {
    return false;
}

/**
 * Whether the gallery rail shows the customizer instead of the category
 * list. Kept in session storage so a reload (or Vite HMR) does not close it.
 */
export function useCustomizerRail(): readonly [
    boolean,
    (open: boolean) => void,
] {
    const open = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );

    const setOpen = (next: boolean): void => {
        try {
            sessionStorage.setItem(STORAGE_KEY, next ? '1' : '0');
        } catch {
            // Session storage is a convenience only.
        }

        listeners.forEach((listener) => listener());
    };

    return [open, setOpen] as const;
}
