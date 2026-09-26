import { useSyncExternalStore } from 'react';
import {
    decodePreset,
    defaultPreset,
    encodePreset,
    isPresetValue,
    isSamePreset,
    PRESET_KEYS,
} from '@/themes/preset';
import type { Preset } from '@/themes/preset';
import { resolveTheme, themeStylesheet } from '@/themes/resolve';

/**
 * Preset persistence. `STORAGE_KEY` holds the encoded code; `CSS_KEY` holds
 * the last generated stylesheet so the inline bootstrap script in
 * app.blade.php can paint the right theme before React loads.
 */
export const STORAGE_KEY = 'paka:preset';
export const CSS_KEY = 'paka:preset-css';
export const STYLE_ELEMENT_ID = 'paka-preset';
const FONT_LINK_ID = 'paka-preset-fonts';

const listeners = new Set<() => void>();
let currentPreset: Preset = defaultPreset;
let initialized = false;

function readStoredPreset(): Preset | null {
    try {
        const code = window.localStorage.getItem(STORAGE_KEY);

        return code ? decodePreset(code) : null;
    } catch {
        return null;
    }
}

function readUrlPreset(): Preset | null {
    const code = new URLSearchParams(window.location.search).get('preset');

    return code ? decodePreset(code) : null;
}

function writeStoredPreset(preset: Preset, css: string): void {
    try {
        window.localStorage.setItem(STORAGE_KEY, encodePreset(preset));
        window.localStorage.setItem(CSS_KEY, css);
    } catch {
        // Storage can be unavailable (private mode); the theme still applies.
    }
}

function applyToDocument(preset: Preset): string {
    const css = themeStylesheet(preset);
    const root = document.documentElement;
    let styleElement = document.getElementById(STYLE_ELEMENT_ID);

    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = STYLE_ELEMENT_ID;
        document.head.append(styleElement);
    }

    styleElement.textContent = css;
    root.dataset.style = preset.style;

    const fontsUrl = resolveTheme(preset).fontsUrl;
    const fontLink = document.getElementById(FONT_LINK_ID);

    if (fontsUrl) {
        if (fontLink instanceof HTMLLinkElement) {
            if (fontLink.href !== fontsUrl) {
                fontLink.href = fontsUrl;
            }
        } else {
            const link = document.createElement('link');
            link.id = FONT_LINK_ID;
            link.rel = 'stylesheet';
            link.href = fontsUrl;
            document.head.append(link);
        }
    } else {
        fontLink?.remove();
    }

    return css;
}

function notify(): void {
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
    listeners.add(listener);

    return () => listeners.delete(listener);
}

/** Load the persisted preset (a `?preset=` query wins) and paint it. */
export function initializePreset(): void {
    if (typeof window === 'undefined' || initialized) {
        return;
    }

    initialized = true;
    currentPreset = readUrlPreset() ?? readStoredPreset() ?? defaultPreset;
    writeStoredPreset(currentPreset, applyToDocument(currentPreset));
}

export function setPreset(preset: Preset): void {
    if (isSamePreset(preset, currentPreset)) {
        return;
    }

    currentPreset = preset;

    if (typeof document !== 'undefined') {
        writeStoredPreset(preset, applyToDocument(preset));
    }

    notify();
}

export function updatePreset<K extends keyof Preset>(
    key: K,
    value: Preset[K],
): void {
    if (!isPresetValue(key, value)) {
        return;
    }

    setPreset({ ...currentPreset, [key]: value });
}

export function resetPreset(): void {
    setPreset(defaultPreset);
}

export function isDefaultPreset(preset: Preset): boolean {
    return PRESET_KEYS.every((key) => preset[key] === defaultPreset[key]);
}

export function usePreset(): Preset {
    return useSyncExternalStore(
        subscribe,
        () => currentPreset,
        () => defaultPreset,
    );
}
