<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { card } from '@manthan/base';
  import { cardContext } from '../context';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: 'surface' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
  }
  let { variant, size, interactive, class: className, children, ...rest }: Props = $props();
  const slots = $derived(card({ variant, size, interactive }));
  cardContext.set({
    get slots() {
      return slots;
    },
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class={slots.root(className as string)} tabindex={interactive ? 0 : undefined} {...rest}>{@render children?.()}</div>
