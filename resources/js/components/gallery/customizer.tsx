import {
    ArrowUpRight01Icon,
    Copy01Icon,
    Moon02Icon,
    RefreshIcon,
    ShuffleIcon,
    Sun03Icon,
    Tick02Icon,
    UnfoldMoreIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useAppearance } from '@/hooks/use-appearance';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';
import { fontDefinition, fonts } from '@/themes/fonts';
import { baseColors, hues } from '@/themes/palettes';
import {
    encodePreset,
    presetOptions,
    presetUrl,
    randomPreset,
} from '@/themes/preset';
import type { Preset } from '@/themes/preset';
import { exportableThemeCss } from '@/themes/resolve';
import {
    isDefaultPreset,
    resetPreset,
    setPreset,
    updatePreset,
    usePreset,
} from '@/themes/store';
import { styles } from '@/themes/styles';

const RADIUS_LABELS: Record<Preset['radius'], string> = {
    none: 'None',
    small: 'Small',
    default: 'Default',
    medium: 'Medium',
    large: 'Large',
};

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function swatchColor(name: string): string {
    if (Object.hasOwn(hues, name)) {
        return hues[name as keyof typeof hues][5];
    }

    if (Object.hasOwn(baseColors, name)) {
        return baseColors[name as keyof typeof baseColors].light.primary;
    }

    return 'var(--primary)';
}

function Swatch({ name }: { name: string }) {
    return (
        <span
            aria-hidden="true"
            className="size-3.5 shrink-0 rounded-full ring-1 ring-foreground/10 ring-inset"
            style={{ backgroundColor: swatchColor(name) }}
        />
    );
}

function RadiusGlyph({ radius }: { radius: Preset['radius'] }) {
    const px = { none: 0, small: 3, default: 5, medium: 5, large: 8 }[radius];

    return (
        <span
            aria-hidden="true"
            className="block size-3.5 border-t-2 border-l-2 border-current"
            style={{ borderTopLeftRadius: px }}
        />
    );
}

type FieldProps<K extends keyof Preset> = {
    label: string;
    field: K;
    options: readonly Preset[K][];
    valueLabel: (value: Preset[K]) => string;
    leading?: (value: Preset[K]) => ReactNode;
    itemStyle?: (value: Preset[K]) => React.CSSProperties | undefined;
    group?: (value: Preset[K]) => string;
};

/**
 * One row of the customizer: a labelled trigger that opens a radio menu of
 * the available values, mirroring the shadcn/create panel.
 */
function PresetField<K extends keyof Preset>({
    label,
    field,
    options,
    valueLabel,
    leading,
    itemStyle,
    group,
}: FieldProps<K>) {
    const preset = usePreset();
    const value = preset[field];
    const groups = group
        ? [...new Set(options.map((option) => group(option)))]
        : [''];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="flex h-12 w-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 text-left transition-colors outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring/50 aria-expanded:bg-muted/60"
                aria-label={`${label}: ${valueLabel(value)}`}
            >
                <span className="flex min-w-0 flex-col">
                    <span className="text-[0.6875rem] leading-4 text-muted-foreground">
                        {label}
                    </span>
                    <span className="truncate text-sm leading-5 font-medium">
                        {valueLabel(value)}
                    </span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
                    {leading?.(value)}
                    <HugeiconsIcon
                        icon={UnfoldMoreIcon}
                        className="size-3.5"
                        aria-hidden="true"
                    />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                side="right"
                sideOffset={8}
                className="max-h-[70vh] w-56 overflow-y-auto"
            >
                <DropdownMenuRadioGroup
                    value={value}
                    onValueChange={(next) =>
                        updatePreset(field, next as Preset[K])
                    }
                >
                    {groups.map((name, groupIndex) => (
                        <div key={name || 'all'}>
                            {name && (
                                <>
                                    {groupIndex > 0 && (
                                        <DropdownMenuSeparator />
                                    )}
                                    <DropdownMenuLabel>
                                        {name}
                                    </DropdownMenuLabel>
                                </>
                            )}
                            {options
                                .filter(
                                    (option) =>
                                        !group || group(option) === name,
                                )
                                .map((option) => (
                                    <DropdownMenuRadioItem
                                        key={String(option)}
                                        value={String(option)}
                                        style={itemStyle?.(option)}
                                    >
                                        {leading?.(option)}
                                        {valueLabel(option)}
                                    </DropdownMenuRadioItem>
                                ))}
                        </div>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function ModeField() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className="flex h-12 items-center justify-between gap-3 rounded-lg border border-border bg-card px-3">
            <span className="flex flex-col">
                <span className="text-[0.6875rem] leading-4 text-muted-foreground">
                    Mode
                </span>
                <span className="text-sm leading-5 font-medium">
                    {capitalize(appearance)}
                </span>
            </span>
            <ToggleGroup
                aria-label="Color mode"
                size="sm"
                variant="outline"
                spacing={0}
                value={[appearance]}
                onValueChange={(values) => {
                    const next = values[0];

                    if (
                        next === 'light' ||
                        next === 'dark' ||
                        next === 'system'
                    ) {
                        updateAppearance(next);
                    }
                }}
            >
                <ToggleGroupItem value="light" aria-label="Light">
                    <HugeiconsIcon icon={Sun03Icon} aria-hidden="true" />
                </ToggleGroupItem>
                <ToggleGroupItem value="dark" aria-label="Dark">
                    <HugeiconsIcon icon={Moon02Icon} aria-hidden="true" />
                </ToggleGroupItem>
                <ToggleGroupItem value="system" aria-label="System">
                    Auto
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}

export function Customizer({ className }: { className?: string }) {
    const preset = usePreset();
    const code = encodePreset(preset);
    const [copiedText, copy] = useClipboard();
    const copied = copiedText === code;

    const copyCode = async () => {
        await copy(code);
        toast.success('Preset code copied', {
            description: `--preset ${code}`,
        });
    };

    const copyCss = async () => {
        await copy(exportableThemeCss(preset));
        toast.success('Theme CSS copied', {
            description: 'Paste it into your globals.css.',
        });
    };

    return (
        <div className={cn('flex flex-col gap-3', className)}>
            <PresetField
                label="Style"
                field="style"
                options={presetOptions.style}
                valueLabel={(value) =>
                    styles.find((style) => style.name === value)?.label ??
                    capitalize(value)
                }
            />
            <p className="px-1 text-xs text-muted-foreground">
                {styles.find((style) => style.name === preset.style)?.tagline}
            </p>
            <Separator />
            <PresetField
                label="Base Color"
                field="baseColor"
                options={presetOptions.baseColor}
                valueLabel={capitalize}
                leading={(value) => <Swatch name={value} />}
            />
            <PresetField
                label="Theme"
                field="theme"
                options={presetOptions.theme}
                valueLabel={capitalize}
                leading={(value) => <Swatch name={value} />}
                group={(value) =>
                    Object.hasOwn(baseColors, value) ? 'Neutrals' : 'Colors'
                }
            />
            <PresetField
                label="Chart Color"
                field="chartColor"
                options={presetOptions.chartColor}
                valueLabel={capitalize}
                leading={(value) => <Swatch name={value} />}
                group={(value) =>
                    Object.hasOwn(baseColors, value) ? 'Neutrals' : 'Colors'
                }
            />
            <Separator />
            <PresetField
                label="Heading"
                field="fontHeading"
                options={presetOptions.fontHeading}
                valueLabel={(value) =>
                    value === 'inherit'
                        ? 'Same as body'
                        : fontDefinition(value).label
                }
                itemStyle={(value) =>
                    value === 'inherit'
                        ? undefined
                        : { fontFamily: fontDefinition(value).family }
                }
                group={(value) =>
                    value === 'inherit'
                        ? 'Default'
                        : capitalize(fontDefinition(value).category)
                }
            />
            <PresetField
                label="Font"
                field="font"
                options={presetOptions.font}
                valueLabel={(value) => fontDefinition(value).label}
                itemStyle={(value) => ({
                    fontFamily: fontDefinition(value).family,
                })}
                group={(value) => capitalize(fontDefinition(value).category)}
            />
            <Separator />
            <PresetField
                label="Radius"
                field="radius"
                options={presetOptions.radius}
                valueLabel={(value) => RADIUS_LABELS[value]}
                leading={(value) => <RadiusGlyph radius={value} />}
            />
            <ModeField />
            <Separator />
            <div className="flex flex-col gap-2">
                <Button
                    variant="outline"
                    className="justify-between font-mono"
                    onClick={copyCode}
                    aria-label={`Copy preset code ${code}`}
                >
                    --preset {code}
                    <HugeiconsIcon
                        icon={copied ? Tick02Icon : Copy01Icon}
                        data-icon="inline-end"
                        aria-hidden="true"
                    />
                </Button>
                <Button
                    variant="outline"
                    nativeButton={false}
                    render={
                        <a
                            href={presetUrl(preset)}
                            target="_blank"
                            rel="noreferrer"
                        />
                    }
                >
                    Open in shadcn/create
                    <HugeiconsIcon
                        icon={ArrowUpRight01Icon}
                        data-icon="inline-end"
                        aria-hidden="true"
                    />
                </Button>
                <Button variant="outline" onClick={copyCss}>
                    Copy theme CSS
                    <HugeiconsIcon
                        icon={Copy01Icon}
                        data-icon="inline-end"
                        aria-hidden="true"
                    />
                </Button>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => setPreset(randomPreset())}
                    >
                        <HugeiconsIcon
                            icon={ShuffleIcon}
                            data-icon="inline-start"
                            aria-hidden="true"
                        />
                        Shuffle
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={resetPreset}
                        disabled={isDefaultPreset(preset)}
                    >
                        <HugeiconsIcon
                            icon={RefreshIcon}
                            data-icon="inline-start"
                            aria-hidden="true"
                        />
                        Reset
                    </Button>
                </div>
            </div>
            <p className="px-1 text-xs leading-relaxed text-muted-foreground">
                Presets use the same codes as{' '}
                <a
                    href="https://ui.shadcn.com/create"
                    className="underline underline-offset-4 hover:text-foreground"
                    target="_blank"
                    rel="noreferrer"
                >
                    shadcn/create
                </a>
                , so a code from here works with{' '}
                <code className="font-mono">shadcn init --preset</code>. Fonts
                other than {fonts[0].label} load from Google Fonts.
            </p>
        </div>
    );
}
