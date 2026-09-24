<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { avatarGroup } from '@manthan/base';
  let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={avatarGroup({ class: className as string })} {...rest}>{@render children?.()}</div>
