<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { tabs } from '@manthan/base';
  import { tabsContext } from '../context';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    variant?: 'line' | 'pills' | 'segmented';
    orientation?: 'horizontal' | 'vertical';
    size?: 'sm' | 'md' | 'lg';
    /** `automatic` selects on focus, `manual` on Enter/Space. */
    activation?: 'automatic' | 'manual';
    onValueChange?: (value: string) => void;
  }
  let {
    value = $bindable(),
    variant,
    orientation = 'horizontal',
    size,
    activation = 'automatic',
    onValueChange,
    class: className,
    children,
    ...rest
  }: Props = $props();
  const baseId = $props.id();
  const slots = $derived(tabs({ variant, orientation, size }));
  tabsContext.set({
    get value() {
      return value;
    },
    select(next) {
      value = next;
      onValueChange?.(next);
    },
    baseId,
    get slots() {
      return slots;
    },
    get orientation() {
      return orientation;
    },
    get activation() {
      return activation;
    },
  });
</script>

<div class={slots.root(className as string)} data-orientation={orientation} {...rest}>{@render children?.()}</div>
