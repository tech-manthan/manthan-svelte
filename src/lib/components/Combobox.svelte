<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Check, ChevronsUpDown } from '@manthan/icons';
  import { combobox, filterOptions, groupOptions, input as inputRecipe, normalizeOption, type OptionInput, type Placement } from '@manthan/base';
  import { createCombobox } from '@manthan/base/dom';
  import { fieldAttrs, fieldContext } from '../context';
  import Icon from './Icon.svelte';

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'value'> {
    options: OptionInput[];
    value?: string | null;
    size?: 'sm' | 'md' | 'lg';
    emptyText?: string;
    /** Open the list on focus. */
    openOnFocus?: boolean;
    placement?: Placement;
    onValueChange?: (value: string) => void;
  }
  let {
    options,
    value = $bindable(null),
    size,
    emptyText = 'No results',
    openOnFocus = true,
    placement,
    onValueChange,
    class: className,
    id,
    disabled,
    required,
    ...rest
  }: Props = $props();
  const field = fieldContext.get();
  const s = combobox();
  const listId = $props.id();
  let root: HTMLElement;
  let input: HTMLInputElement;
  let listbox: HTMLElement;
  let query = $state<string | null>(null);
  const normalized = $derived(options.map(normalizeOption));
  const selectedLabel = $derived(normalized.find((o) => o.value === value)?.label ?? '');
  const visible = $derived(query ? filterOptions(normalized, query) : normalized);

  $effect(() =>
    createCombobox({
      input,
      listbox,
      anchor: root,
      openOnFocus,
      placement,
      onSelect: (next) => {
        value = next;
        query = null;
        onValueChange?.(next);
      },
      onOpenChange: (open) => {
        if (!open) query = null;
      },
    }).destroy,
  );
</script>

<div bind:this={root} class={s.root(className as string)}>
  <input
    bind:this={input}
    {...fieldAttrs(field, { id, disabled, required })}
    class={inputRecipe({ size, withEnd: true })}
    value={query ?? selectedLabel}
    oninput={(e) => (query = e.currentTarget.value)}
    {...rest}
  />
  <span class={s.trigger('pointer-events-none')} aria-hidden="true"><Icon icon={ChevronsUpDown} /></span>
  <div bind:this={listbox} id="mn-combobox-{listId}" popover="manual" class={s.listbox()}>
    {#each groupOptions(visible) as g (g.group)}
      <div role={g.group ? 'group' : undefined} aria-label={g.group || undefined} class={s.group()}>
        {#if g.group}<div class={s.groupLabel()} aria-hidden="true">{g.group}</div>{/if}
        {#each g.options as o (o.value)}
          <div role="option" tabindex="-1" data-value={o.value} aria-selected={o.value === value} aria-disabled={o.disabled || undefined} class={s.option()}>
            {o.label}
            <Icon icon={Check} class={s.check()} />
          </div>
        {/each}
      </div>
    {/each}
    {#if visible.length === 0}<div class={s.empty()}>{emptyText}</div>{/if}
  </div>
</div>
