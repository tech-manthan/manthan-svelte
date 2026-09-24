<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { heading } from '@manthan/base';
  interface Props extends HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    size?: 1 | 2 | 3 | 4 | 5 | 6;
  }
  let { level = 2, size, class: className, children, ...rest }: Props = $props();
</script>

<svelte:element this={`h${level}`} class={heading({ size: size ?? level, class: className as string })} {...rest}>
  {@render children?.()}
</svelte:element>
