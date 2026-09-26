<script lang="ts">
  import { separator } from '@manthan/base';
  interface Props {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
    class?: string;
  }
  let { orientation = 'horizontal', decorative = true, class: className }: Props = $props();
</script>

<div
  role={decorative ? 'none' : 'separator'}
  aria-orientation={decorative ? undefined : orientation}
  class={separator({ orientation, class: className })}
></div>
