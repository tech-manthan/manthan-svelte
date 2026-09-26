<script lang="ts">
  import { spinner, type Tone } from '@manthan/base';
  interface Props {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    tone?: Tone | 'current';
    label?: string;
    class?: string;
  }
  let { size, tone, label = 'Loading', class: className }: Props = $props();
</script>

<span role="status" aria-label={label} class={spinner({ size, tone, class: className })}></span>
