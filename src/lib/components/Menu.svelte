<script lang="ts">
  import type { Snippet } from 'svelte';
  import { menu, type Placement } from '@manthan/base';
  import { createMenu } from '@manthan/base/dom';
  import { menuContext } from '../context';

  interface Props {
    placement?: Placement;
    onOpenChange?: (open: boolean) => void;
    class?: string;
    trigger: Snippet;
    children?: Snippet;
  }
  let { placement, onOpenChange, class: className, trigger, children }: Props = $props();
  const slots = menu();
  menuContext.set({ slots });
  let wrap: HTMLElement;
  let content: HTMLElement;

  $effect(() => {
    const el = wrap.firstElementChild as HTMLElement | null;
    if (!el) return;
    return createMenu({ trigger: el, content, placement, onOpenChange }).destroy;
  });
</script>

<span bind:this={wrap} style="display: contents">{@render trigger()}</span>
<div bind:this={content} popover="auto" role="menu" tabindex="-1" class={slots.content(className)}>{@render children?.()}</div>
