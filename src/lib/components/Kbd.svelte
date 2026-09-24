<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { kbd } from '@manthan/base';
  let { size, class: className, children, ...rest }: HTMLAttributes<HTMLElement> & { size?: 'sm' | 'md' } = $props();
</script>

<kbd class={kbd({ size, class: className as string })} {...rest}>{@render children?.()}</kbd>
