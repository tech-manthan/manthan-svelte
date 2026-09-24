<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import { textarea } from '@manthan/base';
  import { fieldAttrs, fieldContext } from '../context';

  interface Props extends HTMLTextareaAttributes {
    resize?: 'none' | 'vertical' | 'auto';
  }
  let { resize, value = $bindable(), class: className, id, disabled, required, ...rest }: Props = $props();
  const field = fieldContext.get();
</script>

<textarea bind:value {...fieldAttrs(field, { id, disabled, required })} class={textarea({ resize, class: className as string })} {...rest}></textarea>
