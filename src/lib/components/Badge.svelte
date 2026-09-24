<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { badge, type Tone } from '@manthan/base';
  interface Props extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'solid' | 'soft' | 'surface' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    tone?: Tone;
  }
  let { variant, size, tone, class: className, children, ...rest }: Props = $props();
</script>

<span class={badge({ variant, size, tone, class: className as string })} {...rest}>{@render children?.()}</span>
