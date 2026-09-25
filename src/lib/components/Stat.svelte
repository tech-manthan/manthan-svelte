<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ArrowDownRight, ArrowUpRight } from '@manthan/icons';
  import { deltaDirection, stat, type ChartSeries } from '@manthan/base';
  import Chart from './Chart.svelte';
  import Icon from './Icon.svelte';

  /** Stat tile: label, headline value, delta and an optional sparkline. */
  interface Props {
    label: string;
    value: string | number;
    /** Signed change, e.g. "+12.4%". Its sign picks the arrow. */
    delta?: string | number;
    /** Whether the change is good; colours the delta. */
    sentiment?: 'positive' | 'negative' | 'neutral';
    /** Comparison period, e.g. "vs last month". */
    caption?: string;
    /** Recent values, drawn as a sparkline. */
    trend?: number[];
    class?: string;
    children?: Snippet;
  }
  let { label, value, delta, sentiment = 'neutral', caption, trend, class: className, children }: Props = $props();
  const s = $derived(stat({ sentiment }));
  const direction = $derived(deltaDirection(delta));
  const points = $derived(trend?.map((v, i) => ({ i, v })) ?? []);
  const sparkSeries: ChartSeries[] = [{ key: 'v', color: 'accent' }];
</script>

<div class={s.root(className)}>
  <span class={s.label()}>{label}</span>
  <span class={s.value()}>{#if children}{@render children()}{:else}{value}{/if}</span>
  {#if delta !== undefined || caption}
    <span class={s.footer()}>
      {#if delta !== undefined}
        <span class={s.delta()}>
          {#if direction !== 'flat'}<Icon icon={direction === 'up' ? ArrowUpRight : ArrowDownRight} aria-hidden="true" />{/if}{delta}
        </span>
      {/if}
      {caption ?? ''}
    </span>
  {/if}
  {#if points.length > 1}
    <Chart class={s.trend()} type="area" sparkline height={40} x="i" title={`${label} trend`} data={points} series={sparkSeries} />
  {/if}
</div>
