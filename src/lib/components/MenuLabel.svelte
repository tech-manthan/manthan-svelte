<script lang="ts">
  import type { Snippet } from 'svelte';
  import { menu } from '@manthan/base';
  import { menuContext } from '../context';
  let { class: className, children }: { class?: string; children?: Snippet } = $props();
  const s = menuContext.get()?.slots ?? menu();
</script>

<div class={s.label(className)}>{@render children?.()}</div>
