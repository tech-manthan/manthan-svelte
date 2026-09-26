import ButtonDemo from './ButtonDemo.svelte';
import InputDemo from './InputDemo.svelte';
import DialogDemo from './DialogDemo.svelte';
import DataTableDemo from './DataTableDemo.svelte';
import ChartDemo from './ChartDemo.svelte';

export const demos = { button: ButtonDemo, input: InputDemo, dialog: DialogDemo, 'data-table': DataTableDemo, chart: ChartDemo } as const;
