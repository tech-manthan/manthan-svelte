<script lang="ts">
  import { skeleton } from '@manthan/base';
  interface Props {
    shape?: 'text' | 'rect' | 'circle';
    class?: string;
  }
  let { shape, class: className }: Props = $props();
</script>

<span aria-hidden="true" class={skeleton({ shape, class: className })}></span>
