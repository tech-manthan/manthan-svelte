<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { input, inputGroup } from '@manthan/base';
  import { fieldAttrs, fieldContext } from '../context';

  interface Props extends Omit<HTMLInputAttributes, 'size'> {
    size?: 'sm' | 'md' | 'lg';
    start?: Snippet;
    end?: Snippet;
    ref?: HTMLInputElement;
  }
  let {
    size,
    start,
    end,
    value = $bindable(),
    ref = $bindable(),
    class: className,
    id,
    disabled,
    required,
    ...rest
  }: Props = $props();
  const field = fieldContext.get();
  const g = inputGroup();
</script>

{#if start || end}
  <div class={g.root(className as string)}>
    {#if start}<span class={g.start()}>{@render start()}</span>{/if}
    <input bind:this={ref} bind:value {...fieldAttrs(field, { id, disabled, required })} class={input({ size, withStart: !!start, withEnd: !!end })} {...rest} />
    {#if end}<span class={g.end()}>{@render end()}</span>{/if}
  </div>
{:else}
  <input bind:this={ref} bind:value {...fieldAttrs(field, { id, disabled, required })} class={input({ size, class: className as string })} {...rest} />
{/if}
