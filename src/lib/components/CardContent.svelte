<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { card } from '@manthan/base';
  import { cardContext } from '../context';
  let { class: className, children, ...rest }: HTMLAttributes<HTMLElement> = $props();
  const ctx = cardContext.get();
</script>

<div class={(ctx?.slots ?? card()).content(className as string)} {...rest}>{@render children?.()}</div>
