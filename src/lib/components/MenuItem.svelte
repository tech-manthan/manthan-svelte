<script lang="ts">
  import type { Snippet } from 'svelte';
  import { menu, type Tone } from '@manthan/base';
  import { menuContext } from '../context';

  interface Props {
    tone?: Tone;
    shortcut?: string;
    disabled?: boolean;
    keepOpen?: boolean;
    onSelect?: () => void;
    class?: string;
    icon?: Snippet;
    children?: Snippet;
  }
  let { tone, shortcut, disabled, keepOpen, onSelect, class: className, icon, children }: Props = $props();
  const ctx = menuContext.get();
  const s = $derived(tone ? menu({ tone }) : (ctx?.slots ?? menu()));
</script>

<button
  type="button"
  role="menuitem"
  tabindex="-1"
  aria-disabled={disabled || undefined}
  data-keep-open={keepOpen || undefined}
  class={s.item([tone && 'text-accent-11', className])}
  onclick={() => !disabled && onSelect?.()}
>
  {@render icon?.()}
  {@render children?.()}
  {#if shortcut}<span class={s.shortcut()}>{shortcut}</span>{/if}
</button>
