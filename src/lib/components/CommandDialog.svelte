<script lang="ts">
  import type { Snippet } from 'svelte';
  import { commandDialog, type ListOption } from '@manthan/base';
  import { createDialog, onHotkey, type DialogController } from '@manthan/base/dom';
  import Command from './Command.svelte';

  interface Props {
    options: ListOption[];
    open?: boolean;
    onSelect?: (value: string) => void;
    placeholder?: string;
    emptyText?: string;
    /** Global shortcut that opens the palette; `false` disables it. */
    hotkey?: string | false;
    icon?: Snippet<[ListOption]>;
  }
  let { options, open = $bindable(false), onSelect, placeholder, emptyText, hotkey = 'mod+k', icon }: Props = $props();
  let el: HTMLDialogElement;
  let controller: DialogController | undefined;
  let query = $state('');

  $effect(() => {
    controller = createDialog(el, {
      onOpenChange: (next) => {
        open = next;
        if (!next) setTimeout(() => (query = ''), 200);
      },
    });
    return () => controller?.destroy();
  });
  $effect(() => (hotkey ? onHotkey(hotkey, () => (open = true)) : undefined));
  $effect(() => {
    if (open) controller?.open();
    else controller?.close();
  });
</script>

<dialog bind:this={el} aria-label="Command palette" class={commandDialog()}>
  <Command
    {options}
    {placeholder}
    {emptyText}
    {icon}
    bind:query
    onSelect={(v) => {
      open = false;
      onSelect?.(v);
    }}
  />
</dialog>
