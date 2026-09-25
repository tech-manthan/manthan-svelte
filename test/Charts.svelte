<script lang="ts">
  import { Chart, Stat } from '../src/lib/index';
  const data = [
    { m: 'Jan', a: 3, b: 1 },
    { m: 'Feb', a: 5, b: 2 },
  ];
  const series = [
    { key: 'a', label: 'Alpha' },
    { key: 'b', label: 'Beta' },
  ];
  let hidden = $state<string[]>([]);
  let type = $state<'bar' | 'line'>('bar');
</script>

<div data-testid="chart"><Chart {type} title="Sales" {data} x="m" {series} bind:hidden /></div>
<output data-testid="hidden">{JSON.stringify(hidden)}</output>
<button onclick={() => (type = 'line')}>Line</button>
<Stat label="Revenue" value="$4.2K" delta="-3%" sentiment="negative" caption="vs last week" trend={[1, 3, 2]} />
