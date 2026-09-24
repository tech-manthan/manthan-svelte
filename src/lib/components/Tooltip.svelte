<script lang="ts">
  import type { Snippet } from 'svelte';
  import { tooltip, type Placement } from '@manthan/base';
  import { createTooltip } from '@manthan/base/dom';

  interface Props {
    content: string | Snippet;
    placement?: Placement;
    openDelay?: number;
    closeDelay?: number;
    class?: string;
    children: Snippet;
  }
  let { content, placement, openDelay, closeDelay, class: className, children }: Props = $props();
  let wrap: HTMLElement;
  let tip: HTMLElement;

  $effect(() => {
    const el = wrap.firstElementChild as HTMLElement | null;
    if (!el) return;
    return createTooltip({ trigger: el, content: tip, placement, openDelay, closeDelay }).destroy;
  });
</script>

<span bind:this={wrap} style="display: contents">{@render children()}</span>
<div bind:this={tip} popover="manual" role="tooltip" class={tooltip({ class: className })}>
  {#if typeof content === 'function'}{@render content()}{:else}{content}{/if}
</div>
