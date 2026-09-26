import Button from '../src/lib/components/Button.svelte';
import Input from '../src/lib/components/Input.svelte';
import DialogDemo from './DialogDemo.svelte';
import DataTableDemo from './DataTableDemo.svelte';
import ChartDemo from './ChartDemo.svelte';

export const demos = { button: Button, input: Input, dialog: DialogDemo, 'data-table': DataTableDemo, chart: ChartDemo } as const;
export const demoProps: Record<keyof typeof demos, Record<string, unknown>> = {
  button: { variant: 'soft', tone: 'primary' },
  input: { placeholder: 'you@example.com' },
  dialog: {},
  'data-table': {},
  chart: {},
};
