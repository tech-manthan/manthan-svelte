<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Check, Minus } from '@manthan/icons';
  import { checkbox, type Tone } from '@manthan/base';
  import { fieldAttrs, fieldContext } from '../context';
  import Icon from './Icon.svelte';

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'type'> {
    label?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    tone?: Tone;
  }
  let {
    label,
    description,
    size,
    tone,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    id,
    disabled,
    required,
    children,
    ...rest
  }: Props = $props();
  const field = fieldContext.get();
  const s = $derived(checkbox({ size, tone }));
  const hasText = $derived(!!(label || description || children));
</script>

<svelte:element this={hasText ? 'label' : 'span'} class={s.label(className as string)}>
  <span class={s.root()}>
    <input
      type="checkbox"
      bind:checked
      bind:indeterminate
      {...fieldAttrs(field, { id, disabled, required })}
      aria-checked={indeterminate ? 'mixed' : undefined}
      class={s.input()}
      {...rest}
    />
    <span class={s.control()}>
      <Icon icon={Check} strokeWidth={3} class={s.check()} />
      <Icon icon={Minus} strokeWidth={3} class={s.minus()} />
    </span>
  </span>
  {#if hasText}
    <span class={s.text()}>
      {#if children}{@render children()}{:else}{label}{/if}
      {#if description}<span class={s.description()}>{description}</span>{/if}
    </span>
  {/if}
</svelte:element>
