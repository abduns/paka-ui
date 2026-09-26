import { createRequire } from 'node:module';
import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig, loadEnv } from 'vite';

const require = createRequire(import.meta.url);

const hugeiconsIconPackages = {
    'free-stroke-rounded': '@hugeicons/core-free-icons',
    'pro-stroke-rounded': '@hugeicons-pro/core-stroke-rounded',
    'pro-stroke-standard': '@hugeicons-pro/core-stroke-standard',
    'pro-solid-rounded': '@hugeicons-pro/core-solid-rounded',
    'pro-solid-standard': '@hugeicons-pro/core-solid-standard',
} as const;

const hugeiconsSolidRoundedPackage = '@hugeicons-pro/core-solid-rounded';

function resolveHugeiconsIconPackage(iconStyle: string): string {
    const iconPackage =
        hugeiconsIconPackages[iconStyle as keyof typeof hugeiconsIconPackages];

    if (!iconPackage) {
        throw new Error(
            `Unsupported HUGEICONS_ICON_STYLE "${iconStyle}". Choose one of: ${Object.keys(hugeiconsIconPackages).join(', ')}.`,
        );
    }

    return iconPackage;
}

function resolveOptionalPackage(name: string, fallback: string): string {
    try {
        require.resolve(`${name}/package.json`);

        return name;
    } catch {
        return fallback;
    }
}

export default defineConfig(({ mode }) => {
    const { HUGEICONS_ICON_STYLE: iconStyle = 'free-stroke-rounded' } = loadEnv(
        mode,
        process.cwd(),
        'HUGEICONS_ICON_',
    );
    const iconPackage = resolveHugeiconsIconPackage(iconStyle);
    const solidRoundedPackage = resolveOptionalPackage(
        hugeiconsSolidRoundedPackage,
        iconPackage,
    );

    return {
        build: {
            /**
             * Keep flag-icons SVGs as standalone assets so a campaign report
             * downloads only the flags it renders instead of inlining a few
             * hundred base64 flags into the bundle.
             */
            assetsInlineLimit: (filePath: string) =>
                filePath.includes('flag-icons/flags/') ? false : undefined,
        },
        resolve: {
            alias: [
                {
                    find: /^@hugeicons\/core-free-icons$/,
                    replacement: iconPackage,
                },
                {
                    find: /^@hugeicons\/core-solid-rounded$/,
                    replacement: solidRoundedPackage,
                },
            ],
        },
        ssr: {
            noExternal: [
                '@hugeicons/core-free-icons',
                '@hugeicons/core-solid-rounded',
                iconPackage,
                solidRoundedPackage,
            ],
        },
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                refresh: true,
                fonts: [
                    bunny('Instrument Sans', {
                        weights: [400, 500, 600],
                    }),
                ],
            }),
            inertia(),
            react({
                babel: {
                    plugins: [
                        [
                            'babel-plugin-react-compiler',
                            {
                                sources: (filename: string) =>
                                    !filename.includes('/email-builder/'),
                            },
                        ],
                    ],
                },
            }),
            tailwindcss(),
            wayfinder({
                formVariants: true,
            }),
        ],
    };
});
