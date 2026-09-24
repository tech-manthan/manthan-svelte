<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { createTabs } from '@manthan/base/dom';
  import { tabsContext } from '../context';

  let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
  const ctx = tabsContext.get()!;
  let el: HTMLDivElement;
  $effect(() => createTabs(el, { orientation: ctx.orientation, activation: ctx.activation }).destroy);
</script>

<div bind:this={el} role="tablist" aria-orientation={ctx.orientation} class={ctx.slots.list(className as string)} {...rest}>
  {@render children?.()}
</div>
