<script lang="ts">
  import { progress, valueToPercent, type Tone } from '@manthan/base';

  interface Props {
    value?: number;
    max?: number;
    indeterminate?: boolean;
    size?: 'sm' | 'md' | 'lg';
    tone?: Tone;
    class?: string;
    'aria-label'?: string;
  }
  let { value = 0, max = 100, indeterminate = false, size, tone, class: className, ...rest }: Props = $props();
  const s = $derived(progress({ size, tone, indeterminate }));
  const percent = $derived(valueToPercent(value, 0, max));
</script>

<div role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={indeterminate ? undefined : value} class={s.root(className)} {...rest}>
  <div class={s.indicator()} style:translate={indeterminate ? undefined : `-${100 - percent}% 0`}></div>
</div>
