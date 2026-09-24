<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { tabsContext } from '../context';

  let { value, class: className, children, ...rest }: HTMLButtonAttributes & { value: string } = $props();
  const ctx = tabsContext.get()!;
  const selected = $derived(ctx.value === value);
</script>

<button
  type="button"
  role="tab"
  id="{ctx.baseId}-tab-{value}"
  aria-controls="{ctx.baseId}-panel-{value}"
  aria-selected={selected}
  tabindex={selected ? 0 : -1}
  class={ctx.slots.trigger(className as string)}
  onclick={() => ctx.select(value)}
  {...rest}
>
  {@render children?.()}
</button>
