<script lang="ts">
  import { spinner, type Tone } from '@manthan/base';
  let {
    size,
    tone,
    label = 'Loading',
    class: className,
  }: { size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; tone?: Tone | 'current'; label?: string; class?: string } = $props();
</script>

<span role="status" aria-label={label} class={spinner({ size, tone, class: className })}></span>
