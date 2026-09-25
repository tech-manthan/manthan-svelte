<script lang="ts">
  import { Calendar as CalendarIcon } from '@manthan/icons';
  import { datePicker, formatDate, type ISODate, type Placement } from '@manthan/base';
  import { createPopover, type PopoverController } from '@manthan/base/dom';
  import { fieldAttrs, fieldContext } from '../context';
  import Calendar from './Calendar.svelte';
  import Icon from './Icon.svelte';

  interface Props {
    value?: ISODate | null;
    onValueChange?: (value: ISODate) => void;
    placeholder?: string;
    /** Form field name; a hidden input carries the ISO value. */
    name?: string;
    min?: ISODate;
    max?: ISODate;
    isDateDisabled?: (date: ISODate) => boolean;
    locale?: string;
    weekStartsOn?: number;
    format?: Intl.DateTimeFormatOptions;
    placement?: Placement;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    disabled?: boolean;
    required?: boolean;
    class?: string;
  }
  let {
    value = $bindable(null),
    onValueChange,
    placeholder = 'Pick a date',
    name,
    min,
    max,
    isDateDisabled,
    locale,
    weekStartsOn,
    format,
    placement = 'bottom-start',
    size,
    id,
    disabled,
    required,
    class: className,
  }: Props = $props();
  const field = fieldContext.get();
  const s = $derived(datePicker({ size }));
  let trigger: HTMLButtonElement;
  let content: HTMLElement;
  let open = $state(false);
  let controller: PopoverController | undefined;

  $effect(() => {
    controller = createPopover({ trigger, content, placement, autoFocus: false, onOpenChange: (next) => (open = next) });
    return () => controller?.destroy();
  });
  const choose = (next: ISODate) => {
    value = next;
    onValueChange?.(next);
    controller?.close();
  };
</script>

<button bind:this={trigger} type="button" {...fieldAttrs(field, { id, disabled, required })} class={s.trigger(className)}>
  <Icon icon={CalendarIcon} />
  <span class={value ? s.value() : s.placeholder()}>{value ? formatDate(value, locale, format) : placeholder}</span>
</button>
<div bind:this={content} popover="auto" aria-label="Choose date" class={s.content()}>
  {#if open}
    <Calendar autoFocus {value} {min} {max} {isDateDisabled} {locale} {weekStartsOn} onValueChange={choose} />
  {/if}
</div>
{#if name}<input type="hidden" {name} value={value ?? ''} />{/if}
