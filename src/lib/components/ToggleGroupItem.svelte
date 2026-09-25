<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { toggleGroupContext } from '../context';

  let { value, disabled, class: className, children, ...rest }: HTMLButtonAttributes & { value: string } = $props();
  const ctx = toggleGroupContext.get()!;
</script>

<button
  type="button"
  aria-pressed={ctx.isPressed(value)}
  disabled={disabled ?? ctx.disabled}
  class={[ctx.itemClass, className]}
  onclick={() => ctx.toggle(value)}
  {...rest}>{@render children?.()}</button
>
