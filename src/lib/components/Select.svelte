<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import { ChevronDown } from '@manthan/icons';
  import { select } from '@manthan/base';
  import { fieldAttrs, fieldContext } from '../context';
  import Icon from './Icon.svelte';

  type Option = string | { value: string; label?: string; disabled?: boolean };
  interface Props extends Omit<HTMLSelectAttributes, 'size'> {
    size?: 'sm' | 'md' | 'lg';
    options?: Option[];
    placeholder?: string;
  }
  let {
    size,
    options = [],
    placeholder,
    value = $bindable(''),
    class: className,
    id,
    disabled,
    required,
    children,
    ...rest
  }: Props = $props();
  const field = fieldContext.get();
  const s = $derived(select({ size }));
  const normalized = $derived(options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o)));
</script>

<div class={s.root(className as string)}>
  <select bind:value {...fieldAttrs(field, { id, disabled, required })} class={s.select()} {...rest}>
    {#if placeholder}<option value="" disabled>{placeholder}</option>{/if}
    {#each normalized as o (o.value)}
      <option value={o.value} disabled={o.disabled}>{o.label ?? o.value}</option>
    {/each}
    {@render children?.()}
  </select>
  <Icon icon={ChevronDown} class={s.icon()} />
</div>
