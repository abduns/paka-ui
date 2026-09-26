import { useId } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { blockRegistry } from '@/registry';
import { validatePage } from '@/renderer/validate-page';
import { themeStyle } from '@/themes/default';

export function PageRenderer({ config }: { config: unknown }) {
    const mainId = useId();
    const result = validatePage(config);

    if (!result.success) {
        return (
            <div
                className="paka-page min-h-64 p-6 sm:p-10"
                style={themeStyle()}
            >
                <Alert variant="destructive" className="mx-auto max-w-4xl">
                    <AlertTitle>Unable to render this page</AlertTitle>
                    <AlertDescription>
                        <p>
                            Fix the following configuration errors and try
                            again.
                        </p>
                        <ul className="flex list-disc flex-col gap-3 pl-5">
                            {result.issues.map((issue, index) => (
                                <li key={index}>
                                    <code className="font-semibold">
                                        {issue.path}
                                    </code>
                                    : {issue.message}
                                </li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const { sections, themeTokens } = result.data;
    const first =
        sections[0]?.type === 'navbar.simple' ? sections[0] : undefined;
    const last =
        sections.at(-1)?.type === 'footer.simple' ? sections.at(-1) : undefined;
    const content = sections.filter(
        (section) => section !== first && section !== last,
    );
    const renderSection = (section: (typeof sections)[number]) => (
        <div
            id={section.id}
            key={section.id}
            data-block={section.type}
            className="scroll-mt-6"
        >
            {blockRegistry[section.type].render(section.props)}
        </div>
    );

    return (
        <div className="paka-page min-h-full" style={themeStyle(themeTokens)}>
            <a href={`#${mainId}`} className="paka-skip-link">
                Skip to content
            </a>
            {first && renderSection(first)}
            <main id={mainId} tabIndex={-1}>
                {content.map(renderSection)}
            </main>
            {last && renderSection(last)}
        </div>
    );
}
