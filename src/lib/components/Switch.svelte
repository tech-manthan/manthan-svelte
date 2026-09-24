<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { switchRecipe, type Tone } from '@manthan/base';
  import { fieldAttrs, fieldContext } from '../context';

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'type'> {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    tone?: Tone;
  }
  let { label, size, tone, checked = $bindable(false), class: className, id, disabled, required, children, ...rest }: Props = $props();
  const field = fieldContext.get();
  const s = $derived(switchRecipe({ size, tone }));
</script>

<svelte:element this={label || children ? 'label' : 'span'} class={s.label(className as string)}>
  <span class={s.root()}>
    <input type="checkbox" role="switch" bind:checked {...fieldAttrs(field, { id, disabled, required })} class={s.input()} {...rest} />
    <span class={s.track()}><span class={s.thumb()}></span></span>
  </span>
  {#if children}{@render children()}{:else}{label}{/if}
</svelte:element>
