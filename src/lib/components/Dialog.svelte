<script lang="ts">
  import type { Snippet } from 'svelte';
  import { X } from '@manthan/icons';
  import { closeButton, dialog } from '@manthan/base';
  import { createDialog, type DialogController } from '@manthan/base/dom';
  import Icon from './Icon.svelte';

  interface Props {
    open?: boolean;
    title?: string;
    description?: string;
    placement?: 'center' | 'left' | 'right' | 'top' | 'bottom';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showClose?: boolean;
    onOpenChange?: (open: boolean) => void;
    class?: string;
    /** Receives `open()`; render the element that opens the dialog. */
    trigger?: Snippet<[() => void]>;
    /** Receives `close()`. */
    children?: Snippet<[() => void]>;
    footer?: Snippet<[() => void]>;
  }
  let {
    open = $bindable(false),
    title,
    description,
    placement,
    size,
    closeOnBackdrop = true,
    closeOnEscape = true,
    showClose = true,
    onOpenChange,
    class: className,
    trigger,
    children,
    footer,
  }: Props = $props();
  const id = $props.id();
  const s = $derived(dialog({ placement, size }));
  let el: HTMLDialogElement;
  let controller: DialogController | undefined;

  const setOpen = (next: boolean) => {
    if (open === next) return;
    open = next;
    onOpenChange?.(next);
  };
  const show = () => setOpen(true);
  const close = () => setOpen(false);

  $effect(() => {
    controller = createDialog(el, { closeOnBackdrop, closeOnEscape, onOpenChange: setOpen });
    return () => controller?.destroy();
  });
  $effect(() => {
    if (open) controller?.open();
    else controller?.close();
  });
</script>

{@render trigger?.(show)}
<dialog
  bind:this={el}
  aria-labelledby={title ? `${id}-title` : undefined}
  aria-describedby={description ? `${id}-description` : undefined}
  class={s.content(className)}
>
  {#if title || description}
    <div class={s.header()}>
      {#if title}<h2 id="{id}-title" class={s.title()}>{title}</h2>{/if}
      {#if description}<p id="{id}-description" class={s.description()}>{description}</p>{/if}
    </div>
  {/if}
  <div class={s.body()}>{@render children?.(close)}</div>
  {#if footer}<div class={s.footer()}>{@render footer(close)}</div>{/if}
  {#if showClose}
    <button type="button" aria-label="Close" class={closeButton({ class: s.close() })} onclick={close}><Icon icon={X} /></button>
  {/if}
</dialog>
