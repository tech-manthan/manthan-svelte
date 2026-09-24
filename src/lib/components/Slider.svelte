<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { slider, valueToPercent, type Tone } from '@manthan/base';
  import { fieldAttrs, fieldContext } from '../context';

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'type' | 'value' | 'min' | 'max'> {
    value?: number;
    min?: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    tone?: Tone;
  }
  let { value = $bindable(50), min = 0, max = 100, size, tone, class: className, id, disabled, required, ...rest }: Props = $props();
  const field = fieldContext.get();
</script>

<input
  type="range"
  bind:value
  {min}
  {max}
  {...fieldAttrs(field, { id, disabled, required })}
  class={slider({ size, tone, class: className as string })}
  style:--mn-fill="{valueToPercent(value, min, max)}%"
  {...rest}
/>
