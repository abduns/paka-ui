import fieldwork from '@/examples/fieldwork.json';
import gather from '@/examples/gather.json';

export const examples = {
    gather: {
        name: 'Gather',
        category: 'A calmer way to work',
        config: gather,
    },
    fieldwork: {
        name: 'Fieldwork',
        category: 'A slower kind of stay',
        config: fieldwork,
    },
} as const;

export function isExample(name: string): name is keyof typeof examples {
    return Object.hasOwn(examples, name);
}
