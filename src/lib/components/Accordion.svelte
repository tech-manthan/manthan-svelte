<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { accordion } from '@manthan/base';
  import { accordionContext } from '../context';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** `single` keeps at most one item open (native `<details name>`). */
    type?: 'single' | 'multiple';
    variant?: 'plain' | 'contained' | 'separated';
  }
  let { type = 'single', variant, class: className, children, ...rest }: Props = $props();
  const id = $props.id();
  const slots = $derived(accordion({ variant }));
  accordionContext.set({
    get slots() {
      return slots;
    },
    get name() {
      return type === 'single' ? `accordion-${id}` : undefined;
    },
  });
</script>

<div class={slots.root(className as string)} {...rest}>{@render children?.()}</div>
