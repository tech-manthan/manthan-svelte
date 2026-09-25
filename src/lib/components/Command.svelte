<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Search } from '@manthan/icons';
  import { command, filterOptions, formatHotkey, groupOptions, type ListOption } from '@manthan/base';
  import { createCombobox } from '@manthan/base/dom';
  import Icon from './Icon.svelte';

  interface Props {
    options: ListOption[];
    onSelect?: (value: string) => void;
    placeholder?: string;
    emptyText?: string;
    /** Keyboard hints under the list. */
    footer?: boolean;
    /** Current search text (bindable, e.g. to reset it). */
    query?: string;
    icon?: Snippet<[ListOption]>;
    class?: string;
  }
  let {
    options,
    onSelect,
    placeholder = 'Type a command or search…',
    emptyText = 'No results found.',
    footer = true,
    query = $bindable(''),
    icon,
    class: className,
  }: Props = $props();
  const s = command();
  let input: HTMLInputElement;
  let list: HTMLElement;
  const visible = $derived(filterOptions(options, query));
  $effect(() => createCombobox({ input, listbox: list, inline: true, onSelect: (v) => onSelect?.(v) }).destroy);
</script>

<div class={s.root(className)}>
  <div class={s.inputWrap()}>
    <Icon icon={Search} />
    <input bind:this={input} bind:value={query} aria-label={placeholder} {placeholder} class={s.input()} />
  </div>
  <div bind:this={list} class={s.list()}>
    {#each groupOptions(visible) as g (g.group)}
      <div role={g.group ? 'group' : undefined} aria-label={g.group || undefined}>
        {#if g.group}<div class={s.groupLabel()} aria-hidden="true">{g.group}</div>{/if}
        {#each g.options as o (o.value)}
          <div role="option" tabindex="-1" aria-selected="false" data-value={o.value} aria-disabled={o.disabled || undefined} class={s.item()}>
            {@render icon?.(o)}
            <span class="flex min-w-0 flex-col">
              {o.label}
              {#if o.description}<span class={s.itemDescription()}>{o.description}</span>{/if}
            </span>
            {#if o.shortcut}<span class={s.shortcut()}>{formatHotkey(o.shortcut)}</span>{/if}
          </div>
        {/each}
      </div>
    {/each}
    {#if visible.length === 0}<div class={s.empty()}>{emptyText}</div>{/if}
  </div>
  {#if footer}<div class={s.footer()}><span>↑↓ navigate</span><span>↵ select</span><span>esc close</span></div>{/if}
</div>
