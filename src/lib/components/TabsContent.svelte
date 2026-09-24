<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { tabsContext } from '../context';

  let { value, class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> & { value: string } = $props();
  const ctx = tabsContext.get()!;
</script>

<div
  role="tabpanel"
  id="{ctx.baseId}-panel-{value}"
  aria-labelledby="{ctx.baseId}-tab-{value}"
  hidden={ctx.value !== value}
  tabindex="0"
  class={ctx.slots.panel(className as string)}
  {...rest}
>
  {@render children?.()}
</div>
