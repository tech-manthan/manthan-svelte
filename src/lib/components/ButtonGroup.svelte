<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { buttonGroup } from '@manthan/base';
  let { attached, class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> & { attached?: boolean } = $props();
</script>

<div role="group" class={buttonGroup({ attached, class: className as string })} {...rest}>{@render children?.()}</div>
