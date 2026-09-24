<script lang="ts">
  import { menu } from '@manthan/base';
  import { menuContext } from '../context';
  let { class: className }: { class?: string } = $props();
  const s = menuContext.get()?.slots ?? menu();
</script>

<div role="separator" class={s.separator(className)}></div>
