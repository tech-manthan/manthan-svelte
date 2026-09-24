<script lang="ts">
  import { progressCircle, valueToPercent, type Tone } from '@manthan/base';

  interface Props {
    value?: number;
    max?: number;
    indeterminate?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    tone?: Tone;
    showValue?: boolean;
    thickness?: number;
    class?: string;
  }
  let { value = 0, max = 100, indeterminate = false, size = 'md', tone, showValue, thickness = 4, class: className }: Props = $props();
  const s = $derived(progressCircle({ size, tone, indeterminate }));
  const r = $derived(20 - thickness / 2);
  const c = $derived(2 * Math.PI * r);
  const percent = $derived(indeterminate ? 25 : valueToPercent(value, 0, max));
</script>

<div role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={indeterminate ? undefined : value} class={s.root(className)}>
  <svg viewBox="0 0 40 40" class={s.svg()} aria-hidden="true">
    <circle cx="20" cy="20" {r} stroke-width={thickness} class={s.track()} />
    <circle cx="20" cy="20" {r} stroke-width={thickness} stroke-dasharray={c} stroke-dashoffset={c * (1 - percent / 100)} class={s.indicator()} />
  </svg>
  {#if (showValue ?? size !== 'sm') && !indeterminate}<span class={s.label()}>{Math.round(percent)}%</span>{/if}
</div>
