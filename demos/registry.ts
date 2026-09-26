import Button from '../src/lib/components/Button.svelte';

export const demos = { button: Button } as const;
export const demoProps: Record<keyof typeof demos, Record<string, unknown>> = {
  button: { variant: 'soft', tone: 'primary' },
};
