<script lang="ts">
  import type { HTMLTableAttributes } from 'svelte/elements';
  import { table } from '@manthan/base';
  import { tableContext } from '../context';

  interface Props extends HTMLTableAttributes {
    striped?: boolean;
    size?: 'sm' | 'md';
    containerClass?: string;
  }
  let { striped, size, containerClass, class: className, children, ...rest }: Props = $props();
  const slots = $derived(table({ striped, size }));
  tableContext.set({
    get slots() {
      return slots;
    },
  });
</script>

<div class={slots.root(containerClass)}>
  <table class={slots.table(className as string)} {...rest}>{@render children?.()}</table>
</div>
