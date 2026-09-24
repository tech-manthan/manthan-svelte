<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { table } from '@manthan/base';
  import { tableContext } from '../context';
  let { class: className, children, ...rest }: HTMLAttributes<HTMLElement> = $props();
  const ctx = tableContext.get();
</script>

<tr class={(ctx?.slots ?? table()).row(className as string)} {...rest}>{@render children?.()}</tr>
