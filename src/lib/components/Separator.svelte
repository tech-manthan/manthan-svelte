<script lang="ts">
  import { separator } from '@manthan/base';
  let {
    orientation = 'horizontal',
    decorative = true,
    class: className,
  }: { orientation?: 'horizontal' | 'vertical'; decorative?: boolean; class?: string } = $props();
</script>

<div
  role={decorative ? 'none' : 'separator'}
  aria-orientation={decorative ? undefined : orientation}
  class={separator({ orientation, class: className })}
></div>
