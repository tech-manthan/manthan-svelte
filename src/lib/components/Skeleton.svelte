<script lang="ts">
  import { skeleton } from '@manthan/base';
  let { shape, class: className }: { shape?: 'text' | 'rect' | 'circle'; class?: string } = $props();
</script>

<span aria-hidden="true" class={skeleton({ shape, class: className })}></span>
