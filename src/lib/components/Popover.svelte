<script lang="ts">
  import type { Snippet } from 'svelte';
  import { popover, type Placement } from '@manthan/base';
  import { createPopover, type PopoverController } from '@manthan/base/dom';

  interface Props {
    open?: boolean;
    placement?: Placement;
    offset?: number;
    title?: string;
    description?: string;
    onOpenChange?: (open: boolean) => void;
    class?: string;
    trigger: Snippet;
    children?: Snippet;
  }
  let { open = $bindable(), placement, offset, title, description, onOpenChange, class: className, trigger, children }: Props = $props();
  const s = popover();
  let wrap: HTMLElement;
  let content: HTMLElement;
  let controller: PopoverController | undefined;

  $effect(() => {
    const el = wrap.firstElementChild as HTMLElement | null;
    if (!el) return;
    controller = createPopover({
      trigger: el,
      content,
      placement,
      offset,
      onOpenChange: (next) => {
        open = next;
        onOpenChange?.(next);
      },
    });
    return () => controller?.destroy();
  });
  $effect(() => {
    if (open === undefined) return;
    if (open) controller?.open();
    else controller?.close();
  });
</script>

<span bind:this={wrap} style="display: contents">{@render trigger()}</span>
<div bind:this={content} popover="auto" class={s.content(className)}>
  {#if title}<h3 class={s.title()}>{title}</h3>{/if}
  {#if description}<p class={s.description()}>{description}</p>{/if}
  {@render children?.()}
</div>
